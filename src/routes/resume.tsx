import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AlertTriangle, Award, Check, FileText, Printer, ShieldCheck } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { QUALITY_MULTIPLIER, confidenceBand, scoreBand } from "@/lib/scoring";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "My Financial Resume — TrustPulse" },
      {
        name: "description",
        content:
          "A shareable Financial Resume built from your own evidence, ending in a standardized Financial Decision Card.",
      },
      { property: "og:title", content: "My Financial Resume — TrustPulse" },
      {
        property: "og:description",
        content: "Your evidence, summarized into a credible financial profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const { t } = useI18n();
  const { profile, evidence, trust } = useStore();
  const [cardOpen, setCardOpen] = useState(false);

  const strongest = useMemo(
    () =>
      [...evidence]
        .filter((e) => QUALITY_MULTIPLIER[e.verificationStatus] > 0)
        .sort((a, b) => b.signalScore - a.signalScore)
        .slice(0, 4),
    [evidence],
  );

  const gaps = [
    (trust.dimensions.find((d) => d.key === "income")?.score ?? 0) < 80 && t("gap.income"),
    (trust.counts.lowQuality > 0 || trust.counts.unreadable > 0) && t("gap.quality"),
    trust.counts.duplicates > 0 && t("gap.duplicate"),
  ].filter(Boolean) as string[];

  const positives = trust.dimensions
    .filter((d) => d.items > 0 && d.score >= 70)
    .map((d) => t(`sig.pos.${d.key}`));

  const concerns = [
    (trust.dimensions.find((d) => d.key === "income")?.score ?? 0) < 80 && t("sig.con.income"),
    trust.counts.underReview > 0 && t("sig.con.review"),
    trust.counts.duplicates > 0 && t("sig.con.duplicate"),
    trust.coverageRatio < 1 && t("sig.con.coverage"),
  ].filter(Boolean) as string[];

  const strength =
    trust.confidence >= 75 ? "high" : trust.confidence >= 50 ? "moderate" : "emerging";

  const dash = (v: string) => (v.trim() ? v : "—");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{t("resume.title")}</h1>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary"
        >
          <Printer className="size-4" aria-hidden />
          {t("common.print")}
        </button>
      </div>

      <article className="tp-card tp-rise mt-6 overflow-hidden">
        <header className="bg-primary px-6 py-8 text-primary-foreground sm:px-10">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-80">
            {t("brand.name")} · {t("resume.title")}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">{dash(profile.fullName)}</h2>
          <p className="mt-1 text-sm opacity-90">
            {[profile.occupation, profile.location].filter((v) => v.trim()).join(" · ") || "—"}
          </p>
        </header>

        <div className="grid gap-6 p-6 sm:p-10 md:grid-cols-3">
          <section className="md:col-span-1">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("resume.identity")}
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label={t("identity.field.occupation")} value={dash(profile.occupation)} />
              <Row
                label={t("resume.yearsInBusiness")}
                value={profile.yearsInBusiness.trim() ? `${profile.yearsInBusiness} ${t("identity.years.suffix")}` : "—"}
              />
              <Row label={t("identity.field.location")} value={dash(profile.location)} />
            </dl>
          </section>

          <section className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("resume.trust")}
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface p-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase">{t("trust.score")}</p>
                <p className="font-display text-3xl font-semibold tabular-nums">{trust.trustScore}</p>
                <p className="text-sm text-muted-foreground">{t(`band.${scoreBand(trust.trustScore)}`)}</p>
              </div>
              <div className="rounded-2xl bg-gold-soft p-4">
                <p className="text-xs font-semibold text-brown uppercase">{t("trust.confidence")}</p>
                <p className="font-display text-3xl font-semibold text-brown tabular-nums">{trust.confidence}</p>
                <p className="text-sm text-brown">{t(`conf.${confidenceBand(trust.confidence)}`)}</p>
              </div>
            </div>
          </section>

          <section className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("resume.signals")}
            </h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {trust.dimensions.map((d) => (
                <li key={d.key} className="rounded-2xl border border-border p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold">{t(`dim.${d.key}`)}</span>
                    <span className="font-display text-lg font-semibold tabular-nums">{d.score}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${d.score}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("resume.strongest")}
            </h3>
            <ul className="mt-3 space-y-2">
              {strongest.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface px-4 py-3"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <FileText className="size-4 text-muted-foreground" aria-hidden />
                    {e.label}
                  </span>
                  <StatusBadge status={e.verificationStatus} />
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
              {t("resume.gaps")}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {(gaps.length > 0 ? gaps : [t("gap.none")]).map((g) => (
                <li key={g} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
                  {g}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              {trust.counts.total} {t("card.total")}
            </p>
          </section>

          <section className="md:col-span-3 rounded-2xl bg-brown-soft p-5">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-widest text-brown uppercase">
              <Award className="size-4" aria-hidden />
              {t("resume.insight")}
            </h3>
            <p className="mt-2 text-sm text-brown">{t("insight.text")}</p>
          </section>
        </div>

        <footer className="border-t border-border px-6 py-5 text-xs text-muted-foreground sm:px-10">
          {t("resume.generated")} · {t("common.prototype")}
        </footer>
      </article>

      <div className="no-print mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setCardOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:brightness-110"
        >
          <ShieldCheck className="size-4" aria-hidden />
          {t("resume.viewCard")}
        </button>
        <Link to="/trust" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          {t("common.back")}
        </Link>
      </div>

      <section className="no-print tp-card mt-8 p-6 sm:p-8">
        <h2 className="font-display text-lg font-semibold">{t("future.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("future.desc")}</p>
      </section>

      {cardOpen && (
        <div
          className="no-print fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t("card.title")}
          onClick={() => setCardOpen(false)}
        >
          <div
            className="my-8 w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold">{t("card.title")}</h2>
                <p className="mt-1 text-xs text-muted-foreground">{t("card.disclaimer")}</p>
              </div>
              <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                {t(`card.strength.${strength}`)}
              </span>
            </div>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <Row label={t("card.applicant")} value={dash(profile.fullName)} />
              <Row label={t("card.occupation")} value={dash(profile.occupation)} />
              <Row label={t("trust.score")} value={String(trust.trustScore)} />
              <Row label={t("trust.confidence")} value={String(trust.confidence)} />
              <Row label={t("card.strength")} value={t(`card.strength.${strength}`)} />
              <Row
                label={t("card.integrity")}
                value={`${trust.counts.total} ${t("card.total")}`}
              />
            </dl>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-success uppercase">
                  {t("card.positives")}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {positives.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-widest text-warn uppercase">
                  {t("card.concerns")}
                </h3>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {concerns.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-surface p-4">
              <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {t("card.assessment")}
              </h3>
              <p className="mt-2 text-sm">{t("assessment.text")}</p>
              <p className="mt-3 text-sm font-semibold">
                {t("card.next")}: <span className="font-normal">{t("card.next.value")}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Printer className="size-4" aria-hidden />
                {t("common.print")}
              </button>
              <button
                type="button"
                onClick={() => setCardOpen(false)}
                className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-secondary"
              >
                {t("common.close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface px-4 py-3">
      <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
    </div>
  );
}
