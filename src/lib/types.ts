export type EvidenceCategory =
  | "repayment"
  | "payment"
  | "business"
  | "income"
  | "tax"
  | "asset"
  | "supporting";

export type Dimension = "repayment" | "discipline" | "continuity" | "income";

export type VerificationStatus =
  | "verified"
  | "documented"
  | "self_declared"
  | "under_review"
  | "not_verified"
  | "low_quality"
  | "unreadable"
  | "duplicate"
  | "contradictory";

export type QualityLevel = "verified" | "documented" | "self_declared";

export type FileType = "PDF" | "JPG" | "JPEG" | "PNG" | "DOCX";

export interface ExtractedData {
  documentType: string;
  issuer?: string;
  amount?: number;
  installments?: number;
  paid?: number;
  late?: number;
  months?: number;
  paymentStatus?: string;
}

export interface Evidence {
  id: string;
  category: EvidenceCategory;
  dimension: Dimension;
  label: string;
  filename: string;
  fileType: FileType;
  uploadDate: string;
  documentDate: string;
  amount?: number;
  extractedData: ExtractedData;
  qualityLevel: QualityLevel;
  verificationStatus: VerificationStatus;
  signalScore: number;
  anomalyFlags: string[];
}

export interface UserProfile {
  fullName: string;
  occupation: string;
  yearsInBusiness: string;
  location: string;
  aadhaar?: string;
  pan?: string;
  kycVerified?: boolean;
}

export interface DimensionResult {
  key: Dimension;
  score: number;
  weight: number;
  items: number;
}

export interface TrustProfile {
  trustScore: number;
  confidence: number;
  dimensions: DimensionResult[];
  counts: {
    total: number;
    verified: number;
    documented: number;
    selfDeclared: number;
    underReview: number;
    lowQuality: number;
    duplicates: number;
    unreadable: number;
  };
  averageQuality: number;
  coverageRatio: number;
  triangulationBonus: number;
  anomalyPenalty: number;
  triangulationSources: string[];
}

export interface Recommendation {
  id: string;
  titleKey: string;
  impactKey: string;
}
