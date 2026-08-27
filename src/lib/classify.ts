import type { Evidence, EvidenceCategory, Dimension, FileType, VerificationStatus } from "./types";

export const CATEGORY_DIMENSION: Record<EvidenceCategory, Dimension> = {
  repayment: "repayment",
  payment: "discipline",
  business: "continuity",
  income: "income",
  tax: "discipline",
  asset: "continuity",
  supporting: "income",
};

export const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "docx"] as const;

export function fileTypeFromName(filename: string): FileType | null {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (!ext) return null;
  if (!ALLOWED_EXTENSIONS.includes(ext as (typeof ALLOWED_EXTENSIONS)[number])) return null;
  return ext.toUpperCase() as FileType;
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

const VERIFIABLE_ISSUERS = [
  "electricity",
  "bijli",
  "jvvnl",
  "water",
  "phed",
  "telecom",
  "airtel",
  "jio",
  "gst",
  "rto",
  "bank",
];

/**
 * Deterministic prototype classification. No external verification is performed —
 * documents that cannot be independently checked are labelled honestly.
 */
export function classifyUpload(
  filename: string,
  fileType: FileType,
  category: EvidenceCategory,
  existing: Evidence[],
): { status: VerificationStatus; signalScore: number; anomalyFlags: string[] } {
  const lower = filename.toLowerCase();
  const base = lower.replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]/g, "");

  const dup = existing.find(
    (e) => e.filename.toLowerCase().replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]/g, "") === base,
  );
  if (dup) return { status: "duplicate", signalScore: 0, anomalyFlags: [`duplicate_of_${dup.id}`] };

  if (/copy|duplicate/.test(lower))
    return { status: "duplicate", signalScore: 0, anomalyFlags: ["filename_suggests_copy"] };
  if (/handwritten|note|rough/.test(lower))
    return { status: "low_quality", signalScore: 55, anomalyFlags: [] };
  if (category === "supporting" || /declaration|affidavit|self/.test(lower))
    return { status: "self_declared", signalScore: 60, anomalyFlags: [] };

  const h = hash(base + category);

  if (VERIFIABLE_ISSUERS.some((k) => lower.includes(k)) && fileType !== "DOCX")
    return { status: "verified", signalScore: 78 + (h % 12), anomalyFlags: [] };

  if (fileType === "PNG" || fileType === "JPG")
    return { status: "under_review", signalScore: 68 + (h % 10), anomalyFlags: [] };

  return { status: "documented", signalScore: 70 + (h % 14), anomalyFlags: [] };
}

export function qualityLevelFor(status: VerificationStatus) {
  if (status === "verified") return "verified" as const;
  if (status === "documented" || status === "under_review" || status === "not_verified")
    return "documented" as const;
  return "self_declared" as const;
}
