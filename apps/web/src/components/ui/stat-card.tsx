import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Tone = "primary" | "accent" | "warning" | "success" | "danger";

const toneStyles: Record<Tone, string> = {
  primary: "bg-surface-soft text-primary",
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
  danger: "bg-destructive-soft text-destructive",
};

/** Karta tor bo'lsa (mobil 2 ustun, dashboard 5 ustun) ikonka tepada, kengida yonma-yon — container query */
export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
  hintTone = "muted",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
  hintTone?: "muted" | "up" | "down";
  className?: string;
}) {
  return (
    <Card className={cn("@container p-4 sm:p-5", className)}>
      <div className="flex flex-col gap-3 @[9rem]:flex-row @[9rem]:items-start @[9rem]:gap-4">
        <div
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-md sm:size-11",
            toneStyles[tone],
          )}
        >
          <Icon className="size-[18px] sm:size-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">{label}</p>
          <p className="mt-0.5 text-xl font-bold tracking-tight whitespace-nowrap tabular-nums sm:mt-1 sm:text-2xl">
            {value}
          </p>
          {hint && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                hintTone === "up" && "text-success",
                hintTone === "down" && "text-destructive",
                hintTone === "muted" && "text-muted-foreground",
              )}
            >
              {hint}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
