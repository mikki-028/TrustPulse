import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Check, Lightbulb } from "lucide-react";
import { ScoreDial } from "@/components/ScoreDial";
import { Stepper } from "@/components/Stepper";
import { RequireProfile } from "@/components/RequireProfile";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { confidenceBand, scoreBand } from "@/lib/scoring";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "My Trust Profile — TrustPulse" },
      {
        name: "description",
        content:
          "See your Trust Score, Confidence Score and dimension breakdown, plus how to strengthen your evidence.",
      },
      { property: "og:title", content: "My Trust Profile — TrustPulse" },
      {
        property: "og:description",
        content: "Two honest numbers: what the evidence suggests, and how strongly it is supported.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrustPage,
});

function TrustPage() {
  return (
    <RequireProfile>
      <TrustContent />
    </RequireProfile>
  );
}

function TrustContent() {
  const { t } = useI18n();
  const { trust, recommendations } = useStore();
  const navigate = useNavigate();

  const warnings = [
    trust.counts.underReview > 0 && `${trust.counts.underReview} ${t("warn.review")}`,
    trust.counts.lowQuality > 0 && `${trust.counts.lowQuality} ${t("warn.low")}`,
    trust.counts.duplicates > 0 && `${trust.counts.duplicates} ${t("warn.duplicate")}`,
    trust.counts.unreadable > 0 && `${trust.counts.unreadable} ${t("warn.unreadable")}`,
  ].filter(Boolean) as string[];

  const positives = trust.dimensions
    .filter((d) => d.items > 0 && d.score >= 70)
    .map((d) => t(`why.${d.key === "income" ? "tax" : d.key}`));

  const uncertain = [
    trust.dimensions.find((d) => d.key === "income" && d.score < 80) && t("why.uncertain.income"),
    (trust.counts.lowQuality > 0 || trust.counts.unreadable > 0) && t("why.uncertain.quality"),
    trust.coverageRatio < 1 && t("why.uncertain.coverage"),
  ].filter(Boolean) as string[];

  const quality = [
    { key: "status.verified", value: trust.counts.verified },
    { key: "status.documented", value: trust.counts.documented },
    { key: "status.self_declared", value: trust.counts.selfDeclared },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <Stepper current={4} />

      <h1 className="mt-10 font-display text-3xl font-semibold sm:text-4xl">{t("trust.title")}</h1>

      <section className="tp-card tp-rise mt-6 grid gap-8 p-6 sm:p-8 md:grid-cols-2">
        <div className="flex flex-col items-center gap-3">
          <ScoreDial
            value={trust.trustScore}
            label={t("trust.score")}
            band={t(`band.${scoreBand(trust.trustScore)}`)}
            caption={t("trust.trustQ")}
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <ScoreDial
            value={trust.confidence}
            tone="gold"
            label={t("trust.confidence")}
            band={t(`conf.${confidenceBand(trust.confidence)}`)}
            caption={t("trust.confQ")}
          />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="tp-card p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">{t("trust.breakdown")}</h2>
          <ul className="mt-5 space-y-5">
            {trust.dimensions.map((d) => (
              <li key={d.key}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-semibold">{t(`dim.${d.key}`)}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {d.score} · {Math.round(d.weight * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-700"
                    style={{ width: `${d.score}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {d.items} {t("trust.evidenceItems")}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="tp-card p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">{t("trust.quality")}</h2>
          <ul className="mt-5 space-y-3">
            {quality.map((q) => (
              <li key={q.key} className="flex items-center justify-between rounded-xl bg-surface px-4 py-3">
                <span className="text-sm font-semibold">{t(q.key)}</span>
                <span className="font-display text-lg font-semibold tabular-nums">{q.value}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-7 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {t("trust.warnings")}
          </h3>
          {warnings.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {warnings.map((w) => (
                <li key={w} className="flex items-start gap-2 text-sm text-warn">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {w}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">{t("warn.none")}</p>
          )}
        </section>
      </div>

      <section className="tp-card mt-6 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">{t("trust.why")}</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-success uppercase">
              {t("trust.positive")}
            </h3>
            <ul className="mt-3 space-y-2">
              {positives.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-warn uppercase">
              {t("trust.uncertain")}
            </h3>
            <ul className="mt-3 space-y-2">
              {uncertain.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warn" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-6 rounded-xl bg-gold-soft px-4 py-3 text-sm font-medium text-brown">
          {t("why.encourage")}
        </p>
      </section>

      <section className="tp-card mt-6 p-6 sm:p-8">
        <h2 className="font-display text-xl font-semibold">{t("rec.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("rec.subtitle")}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {recommendations.map((r) => (
            <li key={r.id} className="rounded-2xl border border-border bg-surface p-4">
              <Lightbulb className="size-5 text-gold" aria-hidden />
              <p className="mt-2 text-sm font-semibold">{t(r.titleKey)}</p>
              <p className="mt-1 text-xs font-medium text-primary">{t(r.impactKey)}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/resume" })}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition hover:brightness-110"
        >
          {t("trust.viewResume")}
          <ArrowRight className="size-4" aria-hidden />
        </button>
        <Link to="/evidence" className="text-sm font-semibold text-muted-foreground hover:text-foreground">
          {t("trust.addMore")}
        </Link>
      </div>
    </div>
  );
}
