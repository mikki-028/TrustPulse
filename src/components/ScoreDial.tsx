export function ScoreDial({
  value,
  label,
  band,
  tone = "primary",
  caption,
}: {
  value: number;
  label: string;
  band: string;
  tone?: "primary" | "gold";
  caption?: string;
}) {
  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.max(0, Math.min(100, value)) / 100);
  const stroke = tone === "gold" ? "var(--gold)" : "var(--primary)";

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative size-40">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="12" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-5xl font-semibold tabular-nums">{value}</span>
          <span className="text-xs font-medium text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">{label}</p>
        <p className="font-display text-xl font-semibold text-foreground">{band}</p>
        {caption && <p className="mt-1 max-w-56 text-xs text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}
