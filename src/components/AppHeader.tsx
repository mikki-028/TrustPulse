import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", key: "nav.identity" },
  { to: "/evidence", key: "nav.evidence" },
  { to: "/analysis", key: "nav.analysis" },
  { to: "/trust", key: "nav.trust" },
  { to: "/resume", key: "nav.resume" },
] as const;

export function AppHeader() {
  const { t, lang, setLang } = useI18n();
  const { reset } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Activity className="size-5" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold">{t("brand.name")}</span>
            <span className="hidden text-xs text-muted-foreground sm:block">{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav className="order-3 -mx-1 flex w-full items-center gap-1 overflow-x-auto md:order-none md:mx-0 md:w-auto">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            title={t("common.reset")}
            aria-label={t("common.reset")}
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="size-4" aria-hidden />
          </button>
          <div
            className="flex items-center rounded-full border border-border bg-card p-0.5"
            role="group"
            aria-label={t("nav.language")}
          >
            {(["en", "hi"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={cn(
                  "rounded-full px-3 py-1 text-sm font-semibold transition-colors",
                  lang === code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {code === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
