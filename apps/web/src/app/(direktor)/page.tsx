import Link from "next/link";
import {
  AlertTriangle,
  BadgeDollarSign,
  BriefcaseBusiness,
  CalendarCheck,
  ChevronRight,
  GraduationCap,
  Moon,
  Sparkles,
  Wallet,
} from "lucide-react";
import { AttendanceChart, RevenueChart } from "@/components/charts/charts";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Column, DataTable } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { formatMln, formatSom, initials } from "@/lib/format";
import { paymentBadge } from "@/lib/status";
import {
  type AlertLevel,
  aiAlerts,
  attendanceWeek,
  dashboard,
  dormToday,
  recentPayments,
  revenueByMonth,
  type Student,
  students,
} from "@/mock/data";

export const metadata = { title: "Bosh sahifa" };

const alertBadge: Record<AlertLevel, { label: string; variant: "danger" | "warning" | "info" }> = {
  yuqori: { label: "Muhim", variant: "danger" },
  orta: { label: "E'tibor", variant: "warning" },
  past: { label: "Ma'lumot", variant: "info" },
};

const studentColumns: Column<Student>[] = [
  {
    key: "name",
    header: "O'quvchi",
    cell: (s) => (
      <Link
        href={`/oquvchilar/${s.id}`}
        className="flex items-center gap-3 font-semibold hover:text-accent"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-soft text-xs font-bold text-primary">
          {initials(s.fullName)}
        </span>
        {s.fullName}
      </Link>
    ),
  },
  { key: "grade", header: "Sinf", cell: (s) => s.grade },
  {
    key: "subjects",
    header: "Fanlar",
    hideOnMobile: true,
    cell: (s) => (
      <div className="flex gap-1.5">
        {s.subjects.map((sub) => (
          <Badge key={sub} variant="accent">
            {sub}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "pay",
    header: "To'lov",
    cell: (s) => (
      <Badge variant={paymentBadge[s.paymentStatus].variant}>
        {paymentBadge[s.paymentStatus].label}
      </Badge>
    ),
  },
  {
    key: "score",
    header: "O'rt. ball",
    align: "right",
    hideOnMobile: true,
    cell: (s) => s.avgScore,
  },
];

export default function DashboardPage() {
  const sleptPct = Math.round((dormToday.slept / dormToday.total) * 100);

  return (
    <>
      <PageHeader
        title="Bosh sahifa"
        description="Seshanba, 25-noyabr 2026 · maktab bo'yicha bugungi holat"
        actions={
          <>
            <Button variant="outline">Hisobot yuklab olish</Button>
            <Button>+ O&apos;quvchi qo&apos;shish</Button>
          </>
        }
      />

      {/* Asosiy ko'rsatkichlar */}
      <section
        aria-label="Asosiy ko'rsatkichlar"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        <StatCard
          label="O'quvchilar"
          value={String(dashboard.studentsTotal)}
          hint={dashboard.studentsDelta}
          hintTone="up"
          icon={GraduationCap}
        />
        <StatCard
          label="Bugungi davomat"
          value={`${dashboard.attendanceToday.toString().replace(".", ",")}%`}
          hint={dashboard.attendanceDelta}
          hintTone="down"
          icon={CalendarCheck}
          tone="success"
        />
        <StatCard
          label="Oylik tushum"
          value={formatMln(dashboard.revenueMonth)}
          hint={dashboard.revenueDelta}
          hintTone="up"
          icon={Wallet}
          tone="accent"
        />
        <StatCard
          label="Qarzdorlik"
          value={formatMln(dashboard.debtTotal)}
          hint={`${dashboard.debtorsCount} ta o'quvchi`}
          icon={BadgeDollarSign}
          tone="warning"
        />
        <StatCard
          label="Xodimlar"
          value={String(dashboard.staffTotal)}
          hint={`shundan ${dashboard.teachersTotal} o'qituvchi`}
          icon={BriefcaseBusiness}
        />
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        {/* Moliya grafigi */}
        <Card className="xl:col-span-2">
          <CardHeader
            title="Tushum va chiqim"
            description="Oxirgi 6 oy, mln so'm"
            action={
              <Button variant="ghost" size="sm" asChild>
                <Link href="/moliya">
                  Moliya <ChevronRight />
                </Link>
              </Button>
            }
          />
          <CardContent className="pt-3">
            <RevenueChart data={revenueByMonth} />
          </CardContent>
        </Card>

        {/* AI Xodim ogohlantirishlari */}
        <Card className="flex flex-col">
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Sparkles className="size-4 text-accent" aria-hidden /> AI Xodim ogohlantirishlari
              </span>
            }
            description="Bugun 08:00 dagi tahlil"
          />
          <CardContent className="flex-1 pt-4">
            <ul className="space-y-3">
              {aiAlerts.map((a) => (
                <li key={a.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold">{a.title}</p>
                    <Badge variant={alertBadge[a.level].variant}>{alertBadge[a.level].label}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                </li>
              ))}
            </ul>
          </CardContent>
          <div className="border-t px-5 py-3">
            <Link href="/ai-xodim" className="text-sm font-semibold text-accent hover:underline">
              Barcha hisobotlar →
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Davomat */}
        <Card>
          <CardHeader title="Haftalik davomat" description="Kunlar bo'yicha, %" />
          <CardContent className="pt-3">
            <AttendanceChart data={attendanceWeek} />
          </CardContent>
        </Card>

        {/* Yotoqxona */}
        <Card>
          <CardHeader
            title={
              <span className="flex items-center gap-2">
                <Moon className="size-4 text-primary" aria-hidden /> Yotoqxona — bugun kechasi
              </span>
            }
            description={`Navbatchi tarbiyachi: ${dormToday.onDuty}`}
          />
          <CardContent>
            <div className="flex items-end gap-2">
              <p className="text-4xl font-extrabold text-primary tabular-nums">{sleptPct}%</p>
              <p className="pb-1 text-sm text-muted-foreground">
                {dormToday.slept} / {dormToday.total} uxladi
              </p>
            </div>
            <div
              className="mt-3 flex h-2.5 overflow-hidden rounded-full bg-muted"
              role="img"
              aria-label={`${dormToday.slept} uxladi, ${dormToday.notSlept} uxlamadi, ${dormToday.unmarked} belgilanmagan`}
            >
              <span
                className="bg-primary"
                style={{ width: `${(dormToday.slept / dormToday.total) * 100}%` }}
              />
              <span
                className="bg-destructive"
                style={{ width: `${(dormToday.notSlept / dormToday.total) * 100}%` }}
              />
              <span
                className="bg-warning"
                style={{ width: `${(dormToday.unmarked / dormToday.total) * 100}%` }}
              />
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                { label: "Uxladi", value: dormToday.slept, cls: "text-primary" },
                { label: "Uxlamadi", value: dormToday.notSlept, cls: "text-destructive" },
                { label: "Belgilanmagan", value: dormToday.unmarked, cls: "text-warning" },
              ].map((i) => (
                <div key={i.label} className="rounded-md bg-muted/60 p-2">
                  <dd className={`text-xl font-bold tabular-nums ${i.cls}`}>{i.value}</dd>
                  <dt className="text-xs text-muted-foreground">{i.label}</dt>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {/* Oxirgi to'lovlar */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader title="Oxirgi to'lovlar" description="Bugun va kecha" />
          <CardContent className="pt-3">
            <ul className="divide-y">
              {recentPayments.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.student}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.date} · {p.method}
                    </p>
                  </div>
                  <p className="text-sm font-bold whitespace-nowrap text-success tabular-nums">
                    +{formatSom(p.amount)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* O'quvchilar */}
      <Card className="mt-6">
        <CardHeader
          title="O'quvchilar"
          description="Profilni ochish uchun ismni bosing"
          action={
            <Button variant="outline" size="sm" asChild>
              <Link href="/oquvchilar">Hammasi</Link>
            </Button>
          }
        />
        <CardContent className="px-0 pb-2">
          <DataTable columns={studentColumns} rows={students} />
        </CardContent>
      </Card>

      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <AlertTriangle className="size-3.5" aria-hidden /> Maket: barcha raqamlar namunaviy (mock).
      </p>
    </>
  );
}
