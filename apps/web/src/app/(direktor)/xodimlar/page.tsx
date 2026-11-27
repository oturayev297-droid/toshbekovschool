import { BriefcaseBusiness, Clock, TriangleAlert, Wallet } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { SalaryHistory } from "@/components/people/salary-history";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { type Column, DataTable, MobileRow } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { formatMln, formatSom, initials } from "@/lib/format";
import { salaryBadge, type StaffMember, staff } from "@/mock/people";

export const metadata = { title: "Xodimlar" };

const columns: Column<StaffMember>[] = [
  {
    key: "n",
    header: "Xodim",
    cell: (x) => (
      <div className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-soft text-xs font-bold text-primary">
          {initials(x.fullName)}
        </span>
        <div>
          <p className="font-semibold">{x.fullName}</p>
          <p className="text-xs text-muted-foreground">{x.phone}</p>
        </div>
      </div>
    ),
  },
  { key: "p", header: "Lavozim", cell: (x) => x.position },
  {
    key: "d",
    header: "Bo'lim",
    hideOnMobile: true,
    cell: (x) => <Badge variant="info">{x.department}</Badge>,
  },
  {
    key: "s",
    header: "Smena",
    hideOnMobile: true,
    cell: (x) => x.shift ?? <span className="text-muted-foreground">—</span>,
  },
  { key: "o", header: "Oylik", align: "right", cell: (x) => formatSom(x.salary) },
  {
    key: "st",
    header: "Noyabr",
    cell: (x) => (
      <Badge variant={salaryBadge[x.salaryStatus].variant}>
        {salaryBadge[x.salaryStatus].label}
      </Badge>
    ),
  },
];

const history = [
  { month: "Noyabr 2026", amount: 70_200_000, paidOn: "Muddat: 30.11.2026", done: false },
  { month: "Oktabr 2026", amount: 69_800_000, paidOn: "To'landi: 31.10.2026", done: true },
  { month: "Sentabr 2026", amount: 68_500_000, paidOn: "To'landi: 30.09.2026", done: true },
];

export default function StaffPage() {
  const fund = staff.reduce((a, x) => a + x.salary, 0);
  const shifts = staff.filter((x) => x.shift).length;
  const late = staff.filter((x) => x.salaryStatus === "kechikdi").length;
  const departments = [...new Set(staff.map((x) => x.department))];

  return (
    <>
      <PageHeader
        title="Xodimlar"
        description="Ishchi xodimlar: lavozim, oylik va to'lov tarixi"
        actions={<Button>+ Xodim qo&apos;shish</Button>}
      />
      <section
        aria-label="Ko'rsatkichlar"
        className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard
          label="Xodimlar"
          value={String(staff.length)}
          hint={`${departments.length} ta bo'lim`}
          icon={BriefcaseBusiness}
        />
        <StatCard label="Smenada ishlaydi" value={String(shifts)} icon={Clock} tone="accent" />
        <StatCard
          label="Oylik fondi"
          value={formatMln(fund)}
          hint="Ko'rsatilganlar bo'yicha"
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Oyligi kechikkan"
          value={String(late)}
          icon={TriangleAlert}
          tone="danger"
        />
      </section>

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="min-w-0">
          <CardHeader title="Ro'yxat" description={departments.join(" · ")} />
          <div className="pt-3 pb-2">
            <DataTable
              columns={columns}
              rows={staff}
              mobileCard={(x) => (
                <MobileRow
                  leading={
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-soft text-xs font-bold text-primary">
                      {initials(x.fullName)}
                    </span>
                  }
                  title={x.fullName}
                  subtitle={`${x.position} · ${formatSom(x.salary)}`}
                  trailing={
                    <Badge variant={salaryBadge[x.salaryStatus].variant}>
                      {salaryBadge[x.salaryStatus].label}
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
