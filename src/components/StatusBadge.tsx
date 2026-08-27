import { AlertTriangle, BadgeCheck, Copy, EyeOff, FileWarning, Search, ShieldQuestion, User } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { VerificationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STYLES: Record<VerificationStatus, string> = {
  verified: "bg-success-soft text-success border-success/25",
  documented: "bg-gold-soft text-brown border-gold/35",
  self_declared: "bg-brown-soft text-brown border-brown/25",
  under_review: "bg-warn-soft text-warn border-warn/30",
  not_verified: "bg-danger-soft text-danger border-danger/25",
  low_quality: "bg-warn-soft text-warn border-warn/30",
  unreadable: "bg-danger-soft text-danger border-danger/25",
  duplicate: "bg-danger-soft text-danger border-danger/25",
  contradictory: "bg-danger-soft text-danger border-danger/25",
};

const ICONS: Record<VerificationStatus, typeof BadgeCheck> = {
  verified: BadgeCheck,
  documented: FileWarning,
  self_declared: User,
  under_review: Search,
  not_verified: ShieldQuestion,
  low_quality: AlertTriangle,
  unreadable: EyeOff,
  duplicate: Copy,
  contradictory: AlertTriangle,
};

export function StatusBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const { t } = useI18n();
  const Icon = ICONS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase",
        STYLES[status],
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {t(`status.${status}`)}
    </span>
  );
}
