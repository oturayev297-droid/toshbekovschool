import { Clock, Star, Users, Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SalaryHistory } from "@/components/people/salary-history";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { type Column, DataTable, MobileRow } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { formatMln, formatSom, initials } from "@/lib/format";
import { salaryBadge, type Teacher, teachers } from "@/mock/people";

export const metadata = { title: "O'qituvchilar" };

const columns: Column<Teacher>[] = [
  {
    key: "n",
    header: "O'qituvchi",
    cell: (t) => (
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
          {initials(t.fullName)}
        </span>
        <div>
          <p className="font-semibold">{t.fullName}</p>
          <p className="text-xs text-muted-foreground">{t.phone}</p>
        </div>
      </div>
    ),
  },
  {
    key: "s",
    header: "Fan",
    cell: (t) => (
      <div className="flex flex-col items-start gap-1">
        <Badge variant="accent">{t.subject}</Badge>
        <span className="text-xs text-muted-foreground">★ {t.rating} reyting</span>
      </div>
    ),
  },
  {
    key: "g",
    header: "Guruhlar",
    hideOnMobile: true,
    cell: (t) => (
      <div>
        <p>{t.groups.join(", ")}</p>
        <p className="text-xs text-muted-foreground">{t.studentsCount} ta o&apos;quvchi</p>
      </div>
    ),
  },
  { key: "h", header: "Soat/hafta", align: "right", cell: (t) => t.hoursPerWeek },
  { key: "o", header: "Oylik", align: "right", cell: (t) => formatSom(t.salary) },
  {
    key: "st",
    header: "Noyabr",
    cell: (t) => (
      <Badge variant={salaryBadge[t.salaryStatus].variant}>
        {salaryBadge[t.salaryStatus].label}
      </Badge>
    ),
  },
];

const history = [
  { month: "Noyabr 2026", amount: 165_800_000, paidOn: "Muddat: 30.11.2026", done: false },
  { month: "Oktabr 2026", amount: 163_200_000, paidOn: "To'landi: 31.10.2026", done: true },
  { month: "Sentabr 2026", amount: 158_900_000, paidOn: "To'landi: 30.09.2026", done: true },
  { month: "Avgust 2026", amount: 121_400_000, paidOn: "To'landi: 31.08.2026", done: true },
];

export default function TeachersPage() {
  const fund = teachers.reduce((a, t) => a + t.salary, 0);
  const hours = teachers.reduce((a, t) => a + t.hoursPerWeek, 0);
  const avgRating = (teachers.reduce((a, t) => a + t.rating, 0) / teachers.length).toFixed(1);

  return (
    <>
      <PageHeader
        title="O'qituvchilar"
        description="Fanlar, guruhlar, ish soati va oyliklar"
        actions={<Button>+ O&apos;qituvchi qo&apos;shish</Button>}
      />
      <section
        aria-label="Ko'rsatkichlar"
        className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard label="O'qituvchilar" value={String(teachers.length)} icon={Users} />
        <StatCard label="Ish soati / hafta" value={String(hours)} icon={Clock} tone="accent" />
        <StatCard
          label="Oylik fondi"
          value={formatMln(fund)}
          hint="Ko'rsatilganlar bo'yicha"
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="O'rtacha reyting"
          value={`★ ${avgRating.replace(".", ",")}`}
          icon={Star}
          tone="warning"
        />
      </section>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="min-w-0">
          <CardHeader title="Ro'yxat" description={`${teachers.length} ta o'qituvchi`} />
          <div className="pt-3 pb-2">
            <DataTable
              columns={columns}
              rows={teachers}
              mobileCard={(t) => (
                <MobileRow
                  leading={
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                      {initials(t.fullName)}
                    </span>
                  }
                  title={t.fullName}
                  subtitle={`${t.subject} · ${t.hoursPerWeek} soat · ${formatSom(t.salary)}`}
                  trailing={
                    <Badge variant={salaryBadge[t.salaryStatus].variant}>
                      {salaryBadge[t.salaryStatus].label}
                    </Badge>
                  }
                />
              )}
            />
          </div>
        </Card>
        <SalaryHistory rows={history} />
      </div>
    </>
  );
}
