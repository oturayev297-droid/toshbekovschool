import Link from "next/link";
import {
  AlertTriangle,
  BedDouble,
  CircleHelp,
  MessageSquareText,
  Moon,
  MoonStar,
  RotateCw,
  Smartphone,
} from "lucide-react";
import { ShiftSchedule } from "@/components/dorm/shift-schedule";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Column, DataTable, MobileRow } from "@/components/ui/data-table";
import { PrivateBadge } from "@/components/ui/private-badge";
import { StatCard } from "@/components/ui/stat-card";
import { schoolConfig } from "@/config/school";
import { t } from "@/i18n";
import { alertBadge, deliveryBadge } from "@/lib/status";
import { dormToday } from "@/mock/data";
import { dormMessageLog, dormProblems, dormTodayByGroup, shift } from "@/mock/dorm";

export const metadata = { title: t.dorm.title };

type LogRow = (typeof dormMessageLog)[number];

function DeliveryCell({ r }: { r: LogRow }) {
  const b = deliveryBadge[r.status];
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <Badge variant={b.variant}>{b.label}</Badge>
      {(r.status === "navbatda" || r.status === "xato") && (
        <span className="text-xs text-muted-foreground">{t.dorm.attempts(r.attempts)}</span>
      )}
    </span>
  );
}

const logColumns: Column<LogRow>[] = [
  {
    key: "t",
    header: t.dorm.logCols.time,
    cell: (r) => <span className="tabular-nums">{r.time}</span>,
  },
  {
    key: "s",
    header: t.dorm.logCols.student,
    cell: (r) => <span className="font-semibold">{r.student}</span>,
  },
  { key: "p", header: t.dorm.logCols.parent, hideOnMobile: true, cell: (r) => r.parent },
  {
    key: "e",
    header: t.dorm.logCols.event,
    cell: (r) => (
      <Badge variant={r.event === t.dorm.markSlept ? "info" : "danger"}>{r.event}</Badge>
    ),
  },
  { key: "d", header: t.dorm.logCols.status, cell: (r) => <DeliveryCell r={r} /> },
  {
    key: "a",
    header: "",
    align: "right",
    cell: (r) =>
      r.status === "xato" ? (
        <Button variant="outline" size="sm">
          <RotateCw /> {t.dorm.resend}
        </Button>
      ) : null,
  },
];

export default function DormDirectorPage() {
  const s = t.dorm.stats;
  const sleptPct = Math.round((dormToday.slept / dormToday.total) * 100);
  const notDone = dormMessageLog.filter((m) => m.status !== "yetkazildi").length;

  return (
    <>
      <PageHeader
        title={t.dorm.title}
        description={t.dorm.pageDescription(shift.date, shift.hours)}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/xabar-namunalari">
                <MessageSquareText /> {t.dorm.parentSees}
              </Link>
            </Button>
            <Button asChild>
              <Link href="/yotoqxona/smena">
                <Smartphone /> {t.dorm.tutorView}
              </Link>
            </Button>
          </>
        }
      />

      <section aria-label={s.total} className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label={s.total} value={String(dormToday.total)} icon={BedDouble} />
        <StatCard
          label={s.slept}
          value={String(dormToday.slept)}
          hint={s.sleptHint(sleptPct)}
          icon={Moon}
          tone="success"
        />
        <StatCard
          label={s.notSlept}
          value={String(dormToday.notSlept)}
          hint={s.notSleptHint}
          icon={MoonStar}
          tone="danger"
        />
        <StatCard
          label={s.unmarked}
          value={String(dormToday.unmarked)}
          hint={s.unmarkedHint}
          icon={CircleHelp}
          tone="warning"
        />
      </section>

      {/* Guruhlar bo'yicha: qizlar va o'g'il bolalar alohida smena */}
      <section aria-label={t.dorm.byGroup} className="mt-4 grid gap-3 sm:grid-cols-2">
        {schoolConfig.dorm.groups.map(({ key, floor }) => {
          const g = dormTodayByGroup[key];
          const tu = shift.tutors[key];
          return (
            <Card key={key} className="p-4">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold">
                  {t.dorm.groups[key]}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    · {t.dorm.floor(floor)}
                  </span>
                </p>
                <p className="text-sm font-bold tabular-nums">
                  {g.slept}/{g.total}
                </p>
              </div>
              <div
                className="mt-2 flex h-2 overflow-hidden rounded-full bg-muted"
                role="img"
                aria-label={`${s.slept} ${g.slept}, ${s.notSlept} ${g.notSlept}, ${s.unmarked} ${g.unmarked}`}
              >
                <div className="bg-primary" style={{ width: `${(g.slept / g.total) * 100}%` }} />
                <div
                  className="bg-destructive"
                  style={{ width: `${(g.notSlept / g.total) * 100}%` }}
                />
                <div className="bg-warning" style={{ width: `${(g.unmarked / g.total) * 100}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {s.notSlept}: {g.notSlept} · {s.unmarked}: {g.unmarked}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {t.dorm.duty}: <span className="font-medium text-foreground">{tu.duty}</span> ·{" "}
                {t.dorm.assistant}:{" "}
                <span className="font-medium text-foreground">{tu.assistant}</span>
              </p>
            </Card>
          );
        })}
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader
              title={
                <span className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-accent" aria-hidden /> {t.dorm.problems}
                </span>
              }
              description={t.dorm.problemsHint}
            />
            <CardContent>
              <ul className="space-y-3">
                {dormProblems.map((p) => (
                  <li key={p.id} className="rounded-md border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.who} · {t.dorm.room(p.room)} · {t.dorm.groupShort[p.group]}
                        </p>
                      </div>
                      <Badge variant={alertBadge[p.level].variant}>
                        {alertBadge[p.level].label}
                      </Badge>
                    </div>
                    {p.privateNote && (
                      <div className="mt-2 rounded-md border border-dashed border-accent/40 bg-accent-soft/15 px-3 py-2">
                        <PrivateBadge label={t.privacy.directorTutor} />
                        <p className="mt-1 text-sm">{p.privateNote}</p>
                      </div>
                    )}
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.detail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title={t.dorm.log}
              description={t.dorm.logHint(notDone, schoolConfig.dorm.undoSeconds)}
            />
            <CardContent className="px-0 pb-2">
              <DataTable
                columns={logColumns}
                rows={dormMessageLog}
                mobileCard={(r) => (
                  <MobileRow
                    title={r.student}
                    subtitle={`${r.time} · ${r.event} · ${r.parent}`}
                    trailing={<DeliveryCell r={r} />}
                  />
                )}
              />
            </CardContent>
          </Card>
        </div>
        <div className="xl:sticky xl:top-[4.5rem] xl:self-start">
          <ShiftSchedule todayDate="26.11" />
        </div>
      </div>
    </>
  );
}
