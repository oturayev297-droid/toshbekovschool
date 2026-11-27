import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { schoolConfig, shiftHours } from "@/config/school";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { scheduleRange, shiftSchedule } from "@/mock/dorm";

/**
 * Haftalik smena jadvali: har kun — qizlar va o'g'il bolalar guruhi uchun navbatchi + yordamchi.
 * `todayDate` — "26.11" kabi (joriy smena belgilanadi).
 */
export function ShiftSchedule({ todayDate }: { todayDate?: string }) {
  return (
    <Card>
      <CardHeader
        title={t.dorm.schedule}
        description={t.dorm.scheduleHint(scheduleRange, shiftHours())}
      />
      <CardContent className="px-0 pb-2">
        <ul className="divide-y">
          {shiftSchedule.map((s) => {
            const today = s.date === todayDate;
            return (
              <li key={s.day} className={cn("px-5 py-3 text-sm", today && "bg-surface-soft/40")}>
                <p className="flex items-baseline gap-2">
                  <span className="font-semibold">{s.day}</span>
                  <span className="text-xs text-muted-foreground">
                    {s.date}
                    {today && ` · ${t.dorm.currentShift}`}
                  </span>
                </p>
                <div className="mt-1.5 grid grid-cols-2 gap-3">
                  {schoolConfig.dorm.groups.map(({ key }) => (
                    <div key={key} className="min-w-0">
                      <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                        {t.dorm.groups[key]}
                      </p>
                      <p className={cn("truncate", today && "font-semibold text-accent")}>
                        {s[key].duty}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {t.dorm.assistant}: {s[key].assistant}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
