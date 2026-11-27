import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Maktab logotipi — apps/web/public/logo.png.
 * Ishlatiladi: sidebar tepasi, login sahifasi, PDF hisobotlar (PLAN.md 0-bo'lim).
 */
export function Logo({
  size = 36,
  withText = true,
  tone = "dark",
  className,
}: {
  size?: number;
  withText?: boolean;
  /** "light" — to'q fon ustida (sidebar) */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* To'q fonda qalqon ko'rinib turishi uchun oq plashka ichida */}
      <span
        className={cn(
          "inline-grid shrink-0 place-items-center",
          tone === "light" && "rounded-md bg-white p-1 shadow-sm",
        )}
      >
        <Image
          src="/logo.png"
          alt="ToshbekovSchool logotipi"
          width={Math.round(size * (358 / 419))}
          height={size}
          priority
        />
      </span>
      {withText && (
        <span
          className={cn(
            "text-[1.05rem] font-extrabold tracking-tight",
            tone === "light" ? "text-white" : "text-primary",
          )}
        >
          Toshbekov
          <span className={tone === "light" ? "text-accent-soft" : "text-accent"}>School</span>
        </span>
      )}
    </span>
  );
}
