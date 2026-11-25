import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Tone = "primary" | "accent" | "warning" | "success";

const toneStyles: Record<Tone, string> = {
  primary: "bg-surface-soft text-primary",
  accent: "bg-accent-soft text-accent",
  warning: "bg-warning-soft text-warning",
  success: "bg-success-soft text-success",
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "primary",
  hintTone = "muted",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
  hintTone?: "muted" | "up" | "down";
}) {
  return (
    <Card className="flex items-start gap-4 p-5">
      <div className={cn("grid size-11 shrink-0 place-items-center rounded-md", toneStyles[tone])}>
        <Icon className="size-5" aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight tabular-nums">{value}</p>
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
    </Card>
  );
}
