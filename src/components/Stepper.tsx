import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const STEPS = ["step.01", "step.02", "step.03", "step.04"] as const;

export function Stepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  const { t } = useI18n();
  return (
    <ol className="no-print mx-auto flex w-full max-w-3xl items-center gap-2 sm:gap-4">
      {STEPS.map((key, i) => {
        const index = i + 1;
        const done = index < current;
        const active = index === current;
        return (
          <li key={key} className="flex flex-1 items-center gap-2 sm:gap-3">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors",
                done && "bg-success text-success-foreground",
                active && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                !done && !active && "bg-secondary text-muted-foreground",
              )}
            >
              {done ? <Check className="size-4" aria-hidden /> : `0${index}`}
            </span>
            <span
              className={cn(
                "hidden text-sm font-semibold sm:block",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {t(key)}
            </span>
            {index < STEPS.length && (
              <span
                className={cn(
                  "hidden h-0.5 flex-1 rounded-full sm:block",
                  done ? "bg-success/50" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
