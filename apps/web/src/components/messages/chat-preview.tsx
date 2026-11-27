import type { ReactNode } from "react";
import { ChevronLeft, Paperclip, SendHorizontal } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

export type ChatItem =
  | { kind: "date"; label: string }
  | { kind: "bot"; text: ReactNode; time: string; buttons?: string[][] };

/**
 * Telegram bot suhbatining maketi (ota-ona telefonida ko'rinishi).
 * Faqat dizayn uchun — haqiqiy xabarlar 6–8-bosqichlarda bot orqali yuboriladi.
 */
export function ChatPreview({ items, label }: { items: ChatItem[]; label: string }) {
  return (
    <figure
      aria-label={label}
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] border-[6px] border-foreground/85 bg-card shadow-lg"
    >
      {/* Sarlavha */}
      <div className="flex items-center gap-2.5 bg-primary px-3 py-2.5 text-primary-foreground">
        <ChevronLeft className="size-5 opacity-80" aria-hidden />
        <span className="grid size-9 place-items-center rounded-full bg-white">
          <Logo withText={false} size={24} />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">ToshbekovSchool</p>
          <p className="text-xs opacity-75">bot</p>
        </div>
      </div>

      {/* Xabarlar */}
      <div className="space-y-3 bg-surface-soft/45 px-3 py-4">
        {items.map((it, i) =>
          it.kind === "date" ? (
            <p key={i} className="flex justify-center">
              <span className="rounded-full bg-foreground/15 px-2.5 py-0.5 text-[11px] font-medium text-foreground/80">
                {it.label}
              </span>
            </p>
          ) : (
            <div key={i} className="max-w-[90%]">
              <div className="rounded-2xl rounded-bl-md bg-card px-3 py-2 text-[13px] leading-relaxed shadow-sm">
                <div className="whitespace-pre-line">{it.text}</div>
                <p className="mt-0.5 text-right text-[10px] text-muted-foreground">{it.time}</p>
              </div>
              {it.buttons && (
                <div className="mt-1 space-y-1">
                  {it.buttons.map((row, ri) => (
                    <div key={ri} className={cn("grid gap-1", row.length > 1 && "grid-cols-2")}>
                      {row.map((b) => (
                        <span
                          key={b}
                          className="rounded-lg bg-primary/75 px-2 py-1.5 text-center text-xs font-medium text-primary-foreground"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>

      {/* Kiritish qatori (faqat ko'rinish) */}
      <div
        aria-hidden
        className="flex items-center gap-2 border-t px-3 py-2.5 text-muted-foreground"
      >
        <Paperclip className="size-4" />
        <span className="flex-1 text-sm">Xabar</span>
        <SendHorizontal className="size-4" />
      </div>
    </figure>
  );
}
