import type {
  Dimension,
  Evidence,
  Recommendation,
  TrustProfile,
  VerificationStatus,
} from "./types";

export const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  repayment: 0.3,
  discipline: 0.25,
  continuity: 0.25,
  income: 0.2,
};

export const QUALITY_MULTIPLIER: Record<VerificationStatus, number> = {
  verified: 1.0,
  documented: 0.6,
  self_declared: 0.2,
  under_review: 0.3,
  not_verified: 0.2,
  low_quality: 0.15,
  unreadable: 0,
  duplicate: 0,
  contradictory: 0,
};

/** Deterministic reference date so the prototype is reproducible. */
export const REFERENCE_DATE = new Date("2026-08-01T00:00:00Z");

export function daysAgo(documentDate: string): number {
  const d = new Date(documentDate + "T00:00:00Z").getTime();
  return Math.max(0, Math.round((REFERENCE_DATE.getTime() - d) / 86400000));
}

export function recencyFactor(documentDate: string): number {
  const days = daysAgo(documentDate);
  if (days < 90) return 1.0;
  if (days <= 180) return 0.8;
  if (days <= 365) return 0.5;
  return 0.2;
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

export function computeTrustProfile(evidence: Evidence[]): TrustProfile {
  const dimensions = (Object.keys(DIMENSION_WEIGHTS) as Dimension[]).map((key) => {
    const items = evidence.filter((e) => e.dimension === key);
    let num = 0;
    let den = 0;
    let counted = 0;
    for (const e of items) {
      const q = QUALITY_MULTIPLIER[e.verificationStatus];
      const t = recencyFactor(e.documentDate);
      const w = q * t;
      if (w <= 0) continue;
      num += e.signalScore * w;
      den += w;
      counted += 1;
    }
    return {
      key,
      score: den > 0 ? Math.round(num / den) : 0,
      weight: DIMENSION_WEIGHTS[key],
      items: counted,
    };
  });

  const activeDims = dimensions.filter((d) => d.items > 0);
  const usedWeight = activeDims.reduce((s, d) => s + d.weight, 0);
  const trustScore =
    usedWeight > 0
      ? clamp(Math.round(activeDims.reduce((s, d) => s + d.score * d.weight, 0) / usedWeight))
      : 0;

  const counts = {
    total: evidence.length,
    verified: evidence.filter((e) => e.qualityLevel === "verified").length,
    documented: evidence.filter((e) => e.qualityLevel === "documented").length,
    selfDeclared: evidence.filter((e) => e.qualityLevel === "self_declared").length,
    underReview: evidence.filter((e) => e.verificationStatus === "under_review").length,
    lowQuality: evidence.filter((e) => e.verificationStatus === "low_quality").length,
    duplicates: evidence.filter((e) => e.verificationStatus === "duplicate").length,
    unreadable: evidence.filter((e) => e.verificationStatus === "unreadable").length,
  };

  const averageQuality =
    evidence.length > 0
      ? evidence.reduce((s, e) => s + QUALITY_MULTIPLIER[e.verificationStatus], 0) / evidence.length
      : 0;

  const coverageRatio = activeDims.length / 4;

  // Triangulation: independent categories corroborating sustained business activity.
  const continuityCats = new Set(
    evidence
      .filter(
        (e) =>
          QUALITY_MULTIPLIER[e.verificationStatus] > 0 &&
          ["business", "payment", "asset", "tax"].includes(e.category),
      )
      .map((e) => e.category),
  );
  const triangulationSources = Array.from(continuityCats);
  const triangulationBonus = continuityCats.size >= 3 ? 1 : 0;

  const anomalyCount = evidence.filter(
    (e) =>
      e.verificationStatus === "duplicate" ||
      e.verificationStatus === "contradictory" ||
      e.anomalyFlags.length > 0,
  ).length;
  const anomalyPenalty = anomalyCount * 15;

  const confidence = clamp(
    Math.round(
      40 * averageQuality + 30 * coverageRatio + 30 * triangulationBonus - anomalyPenalty,
    ),
  );

  return {
    trustScore,
    confidence,
    dimensions,
    counts,
    averageQuality,
    coverageRatio,
    triangulationBonus,
    anomalyPenalty,
    triangulationSources,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as TrustProfile;
}

export function scoreBand(score: number): "strong" | "good" | "building" | "early" {
  if (score >= 85) return "strong";
  if (score >= 70) return "good";
  if (score >= 50) return "building";
  return "early";
}

export function confidenceBand(score: number): "high" | "moderate" | "limited" {
  if (score >= 75) return "high";
  if (score >= 50) return "moderate";
  return "limited";
}

export function buildRecommendations(
  profile: TrustProfile,
  evidence: Evidence[],
): Recommendation[] {
  const recs: Recommendation[] = [];
  const sorted = [...profile.dimensions].sort((a, b) => a.score - b.score);

  for (const d of sorted) {
    if (d.score >= 80 && d.items > 0) continue;
    recs.push({ id: `dim-${d.key}`, titleKey: `rec.${d.key}.title`, impactKey: `rec.${d.key}.impact` });
    if (recs.length >= 3) break;
  }

  const weak = evidence.filter((e) =>
    ["low_quality", "unreadable", "not_verified"].includes(e.verificationStatus),
  );
  if (weak.length > 0) {
    recs.push({ id: "quality", titleKey: "rec.quality.title", impactKey: "rec.quality.impact" });
  }
  if (profile.counts.duplicates > 0) {
    recs.push({ id: "duplicate", titleKey: "rec.duplicate.title", impactKey: "rec.duplicate.impact" });
  }
  if (profile.triangulationBonus === 0) {
    recs.push({
      id: "triangulate",
      titleKey: "rec.triangulate.title",
      impactKey: "rec.triangulate.impact",
    });
  }
  return recs.slice(0, 5);
}
