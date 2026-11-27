import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { shiftSchedule } from "@/mock/dorm";

/** Haftalik smena jadvali: kim qaysi kuni navbatchi. `todayDate` — "27.11" kabi. */
export function ShiftSchedule({
  todayDate,
  highlight,
}: {
  todayDate?: string;
  highlight?: string;
}) {
  return (
    <Card className="@container">
      <CardHeader title="Smena jadvali" description="23–29 noyabr · har kecha 22:00–08:00" />
      <CardContent className="px-0 pb-2">
        <ul className="divide-y">
          {shiftSchedule.map((s) => {
            const today = s.date === todayDate;
            return (
              <li
                key={s.day}
                className={cn(
                  "grid grid-cols-[5.5rem_1fr] items-center gap-x-3 gap-y-1 px-5 py-2.5 text-sm @lg:grid-cols-[7rem_1fr_1fr]",
                  today && "bg-surface-soft/40",
                )}
              >
                <div className="row-span-2 @lg:row-span-1">
                  <p className="font-semibold">{s.day}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.date}
                    {today && " · joriy smena"}
                  </p>
                </div>
                {(
                  [
                    ["Navbatchi", s.duty],
                    ["Yordamchi", s.assistant],
                  ] as const
                ).map(([label, name]) => (
                  <p key={label} className="flex items-baseline gap-2">
                    <span className="w-16 shrink-0 text-xs text-muted-foreground">{label}</span>
                    <span className={cn(name === highlight && "font-semibold text-accent")}>
                      {name}
                    </span>
                  </p>
                ))}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
