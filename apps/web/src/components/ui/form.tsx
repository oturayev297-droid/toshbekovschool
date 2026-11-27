import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "h-10 w-full rounded-md border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none disabled:opacity-50";

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label className={cn("text-xs font-semibold text-muted-foreground", className)} {...props} />
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(fieldBase, "px-3", className)} {...props} />;
}

export function SearchInput({
  className,
  label = "Qidirish",
  ...props
}: React.ComponentProps<"input"> & { label?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span className="sr-only">{label}</span>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input type="search" aria-label={label} className={cn(fieldBase, "pr-3 pl-9")} {...props} />
    </div>
  );
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className={cn("relative", className)}>
      <select className={cn(fieldBase, "appearance-none pr-9 pl-3")} {...props}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  );
}
