import type { Evidence } from "./types";
import { QUALITY_MULTIPLIER, daysAgo } from "./scoring";

export interface FinancialSignal {
  id: string;
  labelKey: string;
  value: string;
  detailKey: string;
  detailVars?: Record<string, string | number>;
  /** confidence of the signal itself, 0-100 */
  strength: number;
}

export interface Inconsistency {
  id: string;
  titleKey: string;
  detailKey: string;
  vars: Record<string, string | number>;
  documents: string[];
}

const usable = (e: Evidence) => QUALITY_MULTIPLIER[e.verificationStatus] > 0;

export function formatMoney(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function monthsOf(e: Evidence): number {
  return e.extractedData.months && e.extractedData.months > 0 ? e.extractedData.months : 1;
}

export interface DerivedSignals {
  monthlySales: number;
  salesMonths: number;
  monthlyPurchases: number;
  purchaseMonths: number;
  installmentsTotal: number;
  installmentsPaid: number;
  lateInstallments: number;
  recurringMonths: number;
  recurringStreams: number;
  activeMonths: number;
  grossMarginPct: number | null;
  signals: FinancialSignal[];
}

export function deriveSignals(evidence: Evidence[]): DerivedSignals {
  const live = evidence.filter(usable);

  const incomeDocs = live.filter((e) => e.category === "income" && e.extractedData.amount);
  const salesTotal = incomeDocs.reduce((s, e) => s + (e.extractedData.amount ?? 0), 0);
  const salesMonths = incomeDocs.reduce((s, e) => s + monthsOf(e), 0);
  const monthlySales = salesMonths > 0 ? salesTotal / salesMonths : 0;

  const purchaseDocs = live.filter((e) => e.category === "business" && e.extractedData.amount);
  const purchaseTotal = purchaseDocs.reduce((s, e) => s + (e.extractedData.amount ?? 0), 0);
  const purchaseMonths = Math.max(
    purchaseDocs.reduce((s, e) => s + monthsOf(e), 0),
    purchaseDocs.length,
  );
  const monthlyPurchases = purchaseMonths > 0 ? purchaseTotal / purchaseMonths : 0;

  const repayDocs = live.filter((e) => (e.extractedData.installments ?? 0) > 0);
  const installmentsTotal = repayDocs.reduce((s, e) => s + (e.extractedData.installments ?? 0), 0);
  const installmentsPaid = repayDocs.reduce((s, e) => s + (e.extractedData.paid ?? 0), 0);
  const lateInstallments = repayDocs.reduce((s, e) => s + (e.extractedData.late ?? 0), 0);

  const recurringDocs = live.filter(
    (e) => e.category === "payment" && (e.extractedData.months ?? 0) > 0,
  );
  const recurringMonths = recurringDocs.reduce((s, e) => Math.max(s, monthsOf(e)), 0);
  const recurringStreams = recurringDocs.length;

  const continuityDocs = live.filter((e) => ["business", "tax", "asset"].includes(e.category));
  const activeMonths =
    continuityDocs.length > 0
      ? Math.round(Math.max(...continuityDocs.map((e) => daysAgo(e.documentDate))) / 30)
      : 0;

  const grossMarginPct =
    monthlySales > 0 && monthlyPurchases > 0
      ? ((monthlySales - monthlyPurchases) / monthlySales) * 100
      : null;

  const onTimePct =
    installmentsTotal > 0
      ? Math.round(((installmentsPaid - lateInstallments) / installmentsTotal) * 100)
      : 0;

  const avgStrength = (items: Evidence[]) =>
    items.length > 0
      ? Math.round(
          (items.reduce((s, e) => s + QUALITY_MULTIPLIER[e.verificationStatus], 0) / items.length) *
            100,
        )
      : 0;

  const signals: FinancialSignal[] = [];

  if (monthlySales > 0) {
    signals.push({
      id: "sig-income",
      labelKey: "fs.income.label",
      value: formatMoney(monthlySales) + " / " + "mo",
      detailKey: "fs.income.detail",
      detailVars: { months: salesMonths, docs: incomeDocs.length },
      strength: avgStrength(incomeDocs),
    });
  }
  if (monthlyPurchases > 0) {
    signals.push({
      id: "sig-revenue",
      labelKey: "fs.purchases.label",
      value: formatMoney(monthlyPurchases) + " / mo",
      detailKey: "fs.purchases.detail",
      detailVars: { docs: purchaseDocs.length },
      strength: avgStrength(purchaseDocs),
    });
  }
  if (installmentsTotal > 0) {
    signals.push({
      id: "sig-repayment",
      labelKey: "fs.repayment.label",
      value: `${onTimePct}%`,
      detailKey: "fs.repayment.detail",
      detailVars: { paid: installmentsPaid, total: installmentsTotal, late: lateInstallments },
      strength: avgStrength(repayDocs),
    });
  }
  if (recurringMonths > 0) {
    signals.push({
      id: "sig-consistency",
      labelKey: "fs.consistency.label",
      value: `${recurringMonths} mo`,
      detailKey: "fs.consistency.detail",
      detailVars: { streams: recurringStreams },
      strength: avgStrength(recurringDocs),
    });
  }
  if (activeMonths > 0) {
    signals.push({
      id: "sig-continuity",
      labelKey: "fs.continuity.label",
      value: `${activeMonths} mo`,
      detailKey: "fs.continuity.detail",
      detailVars: { docs: continuityDocs.length },
      strength: avgStrength(continuityDocs),
    });
  }

  return {
    monthlySales,
    salesMonths,
    monthlyPurchases,
    purchaseMonths,
    installmentsTotal,
    installmentsPaid,
    lateInstallments,
    recurringMonths,
    recurringStreams,
    activeMonths,
    grossMarginPct,
    signals,
  };
}

/** Deterministic AI-style cross-checks across independent documents. */
export function detectInconsistencies(evidence: Evidence[]): Inconsistency[] {
  const out: Inconsistency[] = [];

  // 1. Same issuer + same amount reported on two separate documents.
  const seen = new Map<string, Evidence>();
  for (const e of evidence) {
    const issuer = e.extractedData.issuer;
    const amount = e.extractedData.amount;
    if (!issuer || !amount) continue;
    const key = `${issuer.toLowerCase()}|${amount}`;
    const prev = seen.get(key);
    if (prev && prev.id !== e.id) {
      out.push({
        id: "inc-conflict",
        titleKey: "inc.conflict.title",
        detailKey: "inc.conflict.detail",
        vars: { issuer, amount: formatMoney(amount) },
        documents: [prev.label, e.label],
      });
      break;
    }
    seen.set(key, e);
  }

  // 2. Declared sales vs recorded purchases imply an unusual trading margin.
  const d = deriveSignals(evidence);
  if (d.grossMarginPct !== null && (d.grossMarginPct > 35 || d.grossMarginPct < 4)) {
    out.push({
      id: "inc-margin",
      titleKey: "inc.margin.title",
      detailKey: "inc.margin.detail",
      vars: {
        sales: formatMoney(d.monthlySales),
        purchases: formatMoney(d.monthlyPurchases),
        margin: Math.round(d.grossMarginPct),
      },
      documents: [],
    });
  }

  return out.slice(0, 2);
}
