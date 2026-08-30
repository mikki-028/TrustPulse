import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Banknote,
  Boxes,
  FileText,
  Landmark,
  Receipt,
  RefreshCw,
  ScrollText,
  Trash2,
  Truck,
  UploadCloud,
  Wallet,
  X,
} from "lucide-react";
import { Stepper } from "@/components/Stepper";
import { CameraVerification } from "@/components/CameraVerification";
import { StatusBadge } from "@/components/StatusBadge";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { CATEGORY_DIMENSION, classifyUpload, fileTypeFromName, qualityLevelFor } from "@/lib/classify";
import { QUALITY_MULTIPLIER, recencyFactor } from "@/lib/scoring";
import type { Evidence, EvidenceCategory } from "@/lib/types";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence Vault — TrustPulse" },
      {
        name: "description",
        content:
          "Collect loan repayments, bills, invoices, income and tax records in one Evidence Vault.",
      },
      { property: "og:title", content: "Evidence Vault — TrustPulse" },
      {
        property: "og:description",
        content: "Bring together the evidence that tells your financial story.",
      },
    ],
  }),
  component: EvidencePage,
});

const CATEGORIES: { key: EvidenceCategory; icon: typeof Wallet }[] = [
  { key: "repayment", icon: Wallet },
  { key: "payment", icon: Receipt },
  { key: "business", icon: Truck },
  { key: "income", icon: Banknote },
  { key: "tax", icon: Landmark },
  { key: "asset", icon: Boxes },
  { key: "supporting", icon: ScrollText },
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function EvidencePage() {
  const { t } = useI18n();
  const { evidence, addEvidence, removeEvidence, setAnalyzed } = useStore();
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [presetCategory, setPresetCategory] = useState<EvidenceCategory>("repayment");
  const [detail, setDetail] = useState<Evidence | null>(null);

  const counts = (cat: EvidenceCategory) => evidence.filter((e) => e.category === cat).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Stepper current={2} />

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t("vault.title")}</h1>
          <p className="mt-2 max-w-xl text-lg text-muted-foreground">{t("vault.subtitle")}</p>
        </div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-base font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <UploadCloud className="size-5" aria-hidden />
          {t("vault.add")}
        </button>
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold">{t("vault.categories")}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ key, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setPresetCategory(key);
              setUploadOpen(true);
            }}
            className="tp-card group p-5 text-left transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-success-soft text-success">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                {counts(key)} {t("vault.items")}
              </span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">{t(`cat.${key}`)}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t(`cat.${key}.ex`)}</p>
          </button>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold">{t("vault.recent")}</h2>
        <span className="text-sm text-muted-foreground">
          {evidence.length} {t("vault.items")}
        </span>
      </div>

      {evidence.length === 0 ? (
        <div className="tp-card mt-4 flex flex-col items-center gap-4 p-12 text-center">
          <FileText className="size-10 text-muted-foreground" aria-hidden />
          <p className="max-w-sm text-muted-foreground">{t("vault.empty")}</p>
          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground"
          >
            {t("vault.add")}
          </button>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {evidence.map((e) => (
            <li key={e.id} className="tp-card flex flex-wrap items-center gap-4 p-4 sm:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold text-secondary-foreground">
                {e.fileType}
              </span>
              <div className="min-w-48 flex-1">
                <p className="font-semibold">{e.label}</p>
                <p className="truncate text-sm text-muted-foreground">{e.filename}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t(`cat.${e.category}`)} · {e.documentDate}
                </p>
              </div>
              <StatusBadge status={e.verificationStatus} />
              <div className="ml-auto flex items-center gap-1">
                <IconAction label={t("common.view")} onClick={() => setDetail(e)} icon={FileText} />
                <IconAction
                  label={t("common.reupload")}
                  onClick={() => {
                    setPresetCategory(e.category);
                    setUploadOpen(true);
                  }}
                  icon={RefreshCw}
                />
                <IconAction
                  label={t("common.remove")}
                  onClick={() => removeEvidence(e.id)}
                  icon={Trash2}
                  danger
                />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          disabled={evidence.length === 0}
          onClick={() => {
            setAnalyzed(false);
            navigate({ to: "/analysis" });
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("vault.analyze")}
        </button>
        <Link to="/" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          {t("common.back")}
        </Link>
        <p className="text-sm text-muted-foreground">{t("common.privacy")}</p>
      </div>

      {uploadOpen && (
        <UploadModal
          presetCategory={presetCategory}
          onClose={() => setUploadOpen(false)}
          onAdd={(ev) => {
            addEvidence(ev);
            setUploadOpen(false);
          }}
          existing={evidence}
        />
      )}
      {detail && <DetailModal evidence={detail} onClose={() => setDetail(null)} />}
      <CameraVerification />
    </div>
  );
}

function IconAction({
  label,
  onClick,
  icon: Icon,
  danger,
}: {
  label: string;
  onClick: () => void;
  icon: typeof FileText;
  danger?: boolean | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={
        "flex size-9 items-center justify-center rounded-lg border border-border transition hover:bg-secondary " +
        (danger ? "text-danger" : "text-muted-foreground")
      }
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="tp-rise max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card p-6 shadow-lift sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function UploadModal({
  presetCategory,
  onClose,
  onAdd,
  existing,
}: {
  presetCategory: EvidenceCategory;
  onClose: () => void;
  onAdd: (e: Evidence) => void;
  existing: Evidence[];
}) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<EvidenceCategory>(presetCategory);
  const [filename, setFilename] = useState("");
  const [label, setLabel] = useState("");
  const [docDate, setDocDate] = useState(todayISO());
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fileType = fileTypeFromName(filename);
    if (!filename || !fileType) {
      setError(t("upload.error.file"));
      return;
    }
    const cls = classifyUpload(filename, fileType, category, existing);
    onAdd({
      id: `ev-${Date.now()}`,
      category,
      dimension: CATEGORY_DIMENSION[category],
      label: label.trim() || filename.replace(/\.[a-z]+$/i, "").replace(/[_-]+/g, " "),
      filename,
      fileType,
      uploadDate: todayISO(),
      documentDate: docDate,
      extractedData: { documentType: category },
      qualityLevel: qualityLevelFor(cls.status),
      verificationStatus: cls.status,
      signalScore: cls.signalScore,
      anomalyFlags: cls.anomalyFlags,
    });
  };

  return (
    <Modal title={t("upload.title")} onClose={onClose}>
      <p className="mt-1 text-sm text-muted-foreground">{t("upload.formats")}</p>
      <form onSubmit={submit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="cat" className="block text-sm font-semibold">
            {t("upload.category")}
          </label>
          <select
            id="cat"
            value={category}
            onChange={(e) => setCategory(e.target.value as EvidenceCategory)}
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/12"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {t(`cat.${c.key}`)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="block text-sm font-semibold">{t("upload.file")}</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-surface px-4 py-8 text-center transition hover:border-primary/50"
          >
            <UploadCloud className="size-7 text-primary" aria-hidden />
            <span className="text-sm font-semibold">{filename || t("upload.choose")}</span>
            <span className="text-xs text-muted-foreground">{t("upload.formats")}</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setFilename(f.name);
              setError("");
            }}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="label" className="block text-sm font-semibold">
              {t("upload.name")}
            </label>
            <input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/12"
            />
          </div>
          <div>
            <label htmlFor="docdate" className="block text-sm font-semibold">
              {t("upload.date")}
            </label>
            <input
              id="docdate"
              type="date"
              value={docDate}
              onChange={(e) => setDocDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/12"
            />
          </div>
        </div>

        {error && <p className="text-sm font-medium text-danger">{error}</p>}
        <p className="rounded-xl bg-gold-soft p-3 text-xs text-brown">{t("upload.note")}</p>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("upload.submit")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-5 py-3 font-semibold text-muted-foreground hover:bg-secondary"
          >
            {t("common.cancel")}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function DetailModal({ evidence, onClose }: { evidence: Evidence; onClose: () => void }) {
  const { t } = useI18n();
  const rows: [string, string][] = [
    [t("detail.documentType"), evidence.extractedData.documentType],
    [t("detail.issuer"), evidence.extractedData.issuer ?? "—"],
    [t("detail.amount"), evidence.amount ? `₹${evidence.amount.toLocaleString("en-IN")}` : "—"],
    [t("detail.date"), evidence.documentDate],
    [t("detail.uploaded"), evidence.uploadDate],
    [t("detail.category"), t(`cat.${evidence.category}`)],
    [t("detail.quality"), `${QUALITY_MULTIPLIER[evidence.verificationStatus].toFixed(2)}×`],
    [t("detail.recency"), `${recencyFactor(evidence.documentDate).toFixed(1)}×`],
    [
      t("detail.anomaly"),
      evidence.anomalyFlags.length > 0 ? evidence.anomalyFlags.join(", ") : t("detail.none"),
    ],
  ];

  return (
    <Modal title={t("detail.title")} onClose={onClose}>
      <p className="mt-1 font-semibold">{evidence.label}</p>
      <p className="text-sm text-muted-foreground">{evidence.filename}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={evidence.verificationStatus} />
        <span className="text-sm text-muted-foreground">
          {t(`reason.${evidence.verificationStatus}`)}
        </span>
      </div>

      <h3 className="mt-6 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        {t("detail.extracted")}
      </h3>
      <dl className="mt-3 divide-y divide-border rounded-xl border border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-xl border border-border px-5 py-3 font-semibold hover:bg-secondary"
      >
        {t("common.close")}
      </button>
    </Modal>
  );
}
