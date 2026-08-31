import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useStore, isProfileComplete } from "@/lib/store";

/**
 * Route guard: blocks access to inner pages until the identity profile
 * is complete. Shows an inline warning on the page itself instead of
 * redirecting away.
 */
export function RequireProfile({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  const { profile, hydrated } = useStore();

  if (!hydrated) return null;
  if (!isProfileComplete(profile)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <div
          role="alert"
          className="tp-card tp-rise flex flex-col items-start gap-4 border-danger/40 p-6 sm:p-8"
        >
          <span className="flex size-11 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <AlertTriangle className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-danger">{t("gate.title")}</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">{t("gate.warning")}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
          >
            {t("gate.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
