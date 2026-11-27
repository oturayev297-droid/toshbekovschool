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
import { StatCard } from "@/components/ui/stat-card";
import { alertBadge, deliveryBadge } from "@/lib/status";
import { dormToday } from "@/mock/data";
import { dormMessageLog, dormProblems, shift } from "@/mock/dorm";

export const metadata = { title: "Yotoqxona" };

type LogRow = (typeof dormMessageLog)[number];

function DeliveryCell({ r }: { r: LogRow }) {
  const b = deliveryBadge[r.status];
  return (
    <span className="inline-flex flex-col items-start gap-0.5">
      <Badge variant={b.variant}>{b.label}</Badge>
      {r.status !== "yetkazildi" && (
        <span className="text-xs text-muted-foreground">{r.attempts}/3 urinish</span>
      )}
    </span>
  );
}

const logColumns: Column<LogRow>[] = [
  { key: "t", header: "Vaqt", cell: (r) => <span className="tabular-nums">{r.time}</span> },
  { key: "s", header: "O'quvchi", cell: (r) => <span className="font-semibold">{r.student}</span> },
  { key: "p", header: "Ota-ona", hideOnMobile: true, cell: (r) => r.parent },
  {
    key: "e",
    header: "Hodisa",
    cell: (r) => <Badge variant={r.event === "Uxladi" ? "info" : "danger"}>{r.event}</Badge>,
  },
  { key: "d", header: "Holat", cell: (r) => <DeliveryCell r={r} /> },
  {
    key: "a",
    header: "",
    align: "right",
    cell: (r) =>
      r.status === "xato" ? (
        <Button variant="outline" size="sm">
          <RotateCw /> Qayta yuborish
        </Button>
      ) : null,
  },
];

export default function DormDirectorPage() {
  const sleptPct = Math.round((dormToday.slept / dormToday.total) * 100);
  const failed = dormMessageLog.filter((m) => m.status !== "yetkazildi").length;

  return (
    <>
      <PageHeader
        title="Yotoqxona"
        description={`Tungi smena ${shift.date} · navbatchi: ${shift.tutor}`}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/xabar-namunalari">
                <MessageSquareText /> Ota-ona nimani ko&apos;radi
              </Link>
            </Button>
            <Button asChild>
              <Link href="/yotoqxona/smena">
                <Smartphone /> Tarbiyachi ko&apos;rinishi
              </Link>
            </Button>
          </>
        }
      />

      <section
        aria-label="Bugungi holat"
        className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard label="Yotoqxonada" value={String(dormToday.total)} icon={BedDouble} />
        <StatCard
          label="Uxladi"
          value={String(dormToday.slept)}
          hint={`${sleptPct}% · kecha 96%`}
          icon={Moon}
          tone="success"
        />
        <StatCard
          label="Uxlamadi"
          value={String(dormToday.notSlept)}
          hint="Ota-onalarga xabar ketdi"
          icon={MoonStar}
          tone="danger"
        />
        <StatCard
          label="Belgilanmagan"
          value={String(dormToday.unmarked)}
          hint="Tarbiyachiga eslatildi"
          icon={CircleHelp}
          tone="warning"
        />
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader
              title={
                <span className="flex items-center gap-2">
                  <AlertTriangle className="size-4 text-accent" aria-hidden /> Muammolar
                </span>
              }
              description="Bugungi kecha bo'yicha, muhimlari tepada"
            />
            <CardContent>
              <ul className="space-y-3">
                {dormProblems.map((p) => (
                  <li key={p.id} className="rounded-md border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{p.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.who} · {p.room}-xona
                        </p>
                      </div>
                      <Badge variant={alertBadge[p.level].variant}>
                        {alertBadge[p.level].label}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">{p.detail}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Xabarlar jurnali"
              description={`Ota-onalarga Telegram xabarlari · ${failed} tasi yetkazilmagan yoki qayta urinilmoqda`}
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
          <ShiftSchedule todayDate="26.11" highlight={shift.tutor} />
        </div>
      </div>
    </>
  );
}
