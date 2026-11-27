import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Yopiq ma'lumot belgisi (salomatlik izohlari, IQ): ota-onaga yuborilmaydi va faqat
 * ko'rsatilgan rollarga ko'rinadi (RBAC — 2-bosqichda API darajasida).
 */
export function PrivateBadge({
  className,
  label = "Faqat direktor va tarbiyachi",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-dashed border-accent/50 bg-accent-soft/40 px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-accent",
        className,
      )}
    >
      <Lock className="size-3" aria-hidden />
      {label}
    </span>
  );
}
