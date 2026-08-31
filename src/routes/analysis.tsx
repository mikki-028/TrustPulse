import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Loader2, Sparkles, Triangle } from "lucide-react";
import { Stepper } from "@/components/Stepper";
import { RequireProfile } from "@/components/RequireProfile";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { QUALITY_MULTIPLIER } from "@/lib/scoring";
import type { EvidenceCategory } from "@/lib/types";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "AI Evidence Analysis — TrustPulse" },
      {
        name: "description",
        content:
          "TrustPulse reads, classifies and triangulates your documents to turn them into financial signals.",
      },
      { property: "og:title", content: "AI Evidence Analysis — TrustPulse" },
      {
        property: "og:description",
        content: "We're turning your documents into meaningful financial signals.",
      },
    ],
  }),
  component: AnalysisPage,
});

const STAGES = [1, 2, 3, 4, 5, 6] as const;
const ORDER: EvidenceCategory[] = [
  "repayment",
  "payment",
  "business",
  "income",
  "tax",
  "asset",
  "supporting",
];

function AnalysisPage() {
  return (
    <RequireProfile>
      <AnalysisContent />
    </RequireProfile>
  );
}

function AnalysisContent() {
  const { t } = useI18n();
  const { evidence, trust, analyzed, setAnalyzed } = useStore();
  const navigate = useNavigate();
  const [stage, setStage] = useState(analyzed ? STAGES.length : 0);

  useEffect(() => {
    if (analyzed || evidence.length === 0) return;
    if (stage >= STAGES.length) {
      setAnalyzed(true);
      return;
    }
    const timer = setTimeout(() => setStage((s) => s + 1), 480);
    return () => clearTimeout(timer);
  }, [stage, analyzed, evidence.length, setAnalyzed]);

  const done = stage >= STAGES.length;

  const findings = useMemo(
    () =>
      ORDER.map((cat) => {
        const items = evidence.filter((e) => e.category === cat);
        const usable = items.filter((e) => QUALITY_MULTIPLIER[e.verificationStatus] > 0);
        if (items.length === 0) return null;
        const totals = usable.reduce(
          (acc, e) => {
            acc.installments += e.extractedData.installments ?? 0;
            acc.paid += e.extractedData.paid ?? 0;
            acc.late += e.extractedData.late ?? 0;
            acc.months = Math.max(acc.months, e.extractedData.months ?? 0);
            acc.amount += e.amount ?? 0;
            return acc;
          },
          { installments: 0, paid: 0, late: 0, months: 0, amount: 0 },
        );
        return { cat, count: usable.length, excluded: items.length - usable.length, totals };
      }).filter((x): x is NonNullable<typeof x> => x !== null),
    [evidence],
  );

  if (evidence.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">{t("analysis.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("analysis.empty")}</p>
        <Link
          to="/evidence"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
        >
          {t("vault.add")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Stepper current={3} />

      <div className="mt-10 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">{t("analysis.title")}</h1>
        <p className="mx-auto mt-2 max-w-xl text-lg text-muted-foreground">
          {t("analysis.subtitle")}
        </p>
      </div>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((n, i) => {
          const complete = i < stage;
          const active = i === stage && !done;
          return (
            <li
              key={n}
              className={
                "flex items-center gap-3 rounded-2xl border p-4 transition-colors " +
                (complete
                  ? "border-success/30 bg-success-soft"
                  : active
                    ? "border-primary/40 bg-card"
                    : "border-border bg-surface")
              }
            >
              <span
                className={
                  "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold " +
                  (complete
                    ? "bg-success text-success-foreground"
                    : active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground")
                }
              >
                {complete ? (
                  <Check className="size-4" aria-hidden />
                ) : active ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  `0${n}`
                )}
              </span>
              <span className="font-semibold">{t(`analysis.stage.${n}`)}</span>
            </li>
          );
        })}
      </ol>

      <p className="mt-4 text-center text-sm font-semibold text-muted-foreground">
        {done ? t("analysis.done") : `${t("analysis.running")}…`}
      </p>

      {done && (
        <>
          <section className="tp-rise mt-12">
            <h2 className="font-display text-2xl font-semibold">{t("analysis.findings")}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {findings.map((f) => (
                <article key={f.cat} className="tp-card p-5">
                  <h3 className="font-display text-lg font-semibold">{t(`find.${f.cat}.title`)}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>
                      {f.count} {t("find.items")}
                    </li>
                    {f.totals.installments > 0 && (
                      <li>
                        {f.totals.installments} installments · {f.totals.paid} paid · {f.totals.late}{" "}
                        late
                      </li>
                    )}
                    {f.totals.months > 0 && <li>{f.totals.months} months detected</li>}
                    {f.totals.amount > 0 && (
                      <li>₹{f.totals.amount.toLocaleString("en-IN")} documented</li>
                    )}
                    {f.excluded > 0 && (
                      <li className="text-warn">
                        {f.excluded} {t("find.excluded")}
                      </li>
                    )}
                  </ul>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-sm font-semibold text-success">
                    <Sparkles className="size-4" aria-hidden />
                    {t("analysis.signal")}: {t(`find.${f.cat}.signal`)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="tp-rise tp-card mt-10 overflow-hidden p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-gold-soft text-brown">
                <Triangle className="size-5" aria-hidden />
              </span>
              <h2 className="font-display text-2xl font-semibold">{t("tri.title")}</h2>
            </div>

            {trust.triangulationBonus === 1 ? (
              <>
                <p className="mt-3 text-lg">
                  {trust.triangulationSources.length} {t("tri.desc")}
                </p>
                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="flex flex-wrap justify-center gap-3">
                    {trust.triangulationSources.map((src) => (
                      <span
                        key={src}
                        className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-semibold"
                      >
                        {t(`cat.${src}`)}
                      </span>
                    ))}
                  </div>
                  <span className="h-8 w-px bg-border" aria-hidden />
                  <span className="rounded-xl bg-success px-5 py-3 font-display text-lg font-semibold text-success-foreground">
                    {t("tri.result")}
                  </span>
                </div>
              </>
            ) : (
              <p className="mt-3 text-muted-foreground">{t("tri.none")}</p>
            )}
            <p className="mt-6 text-sm text-muted-foreground">{t("tri.note")}</p>
          </section>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigate({ to: "/trust" })}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:brightness-110"
            >
              {t("analysis.viewTrust")}
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <Link
              to="/evidence"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              {t("common.back")}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
