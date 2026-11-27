import { BadgeDollarSign, Banknote, Send, TrendingDown, Wallet } from "lucide-react";
import { RevenueChart } from "@/components/charts/charts";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Column, DataTable, MobileRow } from "@/components/ui/data-table";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatMln, formatSom } from "@/lib/format";
import { paymentBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import { recentPayments, revenueByMonth } from "@/mock/data";
import {
  debtors,
  debtTotals,
  expenseBreakdown,
  financeSummary as f,
  type MonthCell,
  paymentSchedule,
  scheduleMonths,
} from "@/mock/people";

export const metadata = { title: "Moliya" };

const cellStyle: Record<MonthCell, { label: string; cls: string }> = {
  tolangan: { label: "To'langan", cls: "bg-success-soft text-success" },
  qisman: { label: "Qisman", cls: "bg-warning-soft text-warning" },
  qarz: { label: "Qarz", cls: "bg-destructive-soft text-destructive" },
  kutilmoqda: { label: "Kutilmoqda", cls: "bg-muted text-muted-foreground" },
};

type Debtor = (typeof debtors)[number];
const debtorColumns: Column<Debtor>[] = [
  {
    key: "n",
    header: "O'quvchi",
    cell: (d) => <span className="font-semibold">{d.fullName}</span>,
  },
  { key: "g", header: "Sinf", cell: (d) => d.grade },
  { key: "p", header: "Ota-ona telefoni", hideOnMobile: true, cell: (d) => d.parentPhone },
  { key: "m", header: "Muddati", cell: (d) => `${d.months} oy` },
  {
    key: "s",
    header: "Holat",
    hideOnMobile: true,
    cell: (d) => (
      <Badge variant={paymentBadge[d.status].variant}>{paymentBadge[d.status].label}</Badge>
    ),
  },
  {
    key: "d",
    header: "Qarz",
    align: "right",
    cell: (d) => <span className="font-bold text-destructive">{formatSom(d.debt)}</span>,
  },
];

type Row = (typeof paymentSchedule)[number];
const scheduleColumns: Column<Row>[] = [
  {
    key: "n",
    header: "O'quvchi",
    cell: (r) => <span className="font-semibold">{r.fullName}</span>,
  },
  { key: "g", header: "Sinf", cell: (r) => r.grade },
  { key: "f", header: "Oylik", align: "right", cell: (r) => formatSom(r.fee) },
  ...scheduleMonths.map((m, i): Column<Row> => ({
    key: m,
    header: m,
    cell: (r) => (
      <span
        className={cn(
          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
          cellStyle[r.cells[i]].cls,
        )}
      >
        {cellStyle[r.cells[i]].label}
      </span>
    ),
  })),
];

export default function FinancePage() {
  const collectedPct = Math.round((f.revenue / f.expected) * 100);
  const totalExpense = expenseBreakdown.reduce((a, e) => a + e.amount, 0);

  return (
    <>
      <PageHeader
        title="Moliya"
        description={`${f.month} · tushum, chiqim, qarzdorlik va oylik to'lovlar`}
        actions={
          <>
            <Button variant="outline">Hisobot (PDF)</Button>
            <Button>+ To&apos;lov kiritish</Button>
          </>
        }
      />

      <section
        aria-label="Moliya ko'rsatkichlari"
        className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard
          label="Tushum (oy)"
          value={formatMln(f.revenue)}
          hint={`Rejadan ${collectedPct}%`}
          hintTone="up"
          icon={Wallet}
          tone="success"
        />
        <StatCard
          label="Chiqim (oy)"
          value={formatMln(f.expenses)}
          hint={`Oylik fondi ${formatMln(f.salaryFund)}`}
          icon={TrendingDown}
          tone="accent"
        />
        <StatCard
          label="Sof foyda"
          value={formatMln(f.revenue - f.expenses)}
          hint="Tushum − chiqim"
          icon={Banknote}
        />
        <StatCard
          label="Qarzdorlik"
          value={formatMln(debtTotals.debt)}
          hint={`${debtTotals.debtors} ta o'quvchi`}
          hintTone="down"
          icon={BadgeDollarSign}
          tone="danger"
        />
      </section>

      <Tabs defaultValue="umumiy" className="mt-6">
        <TabsList aria-label="Moliya bo'limlari">
          <TabsTrigger value="umumiy">Tushum va chiqim</TabsTrigger>
          <TabsTrigger value="qarzdorlar">
            Qarzdorlar <Badge variant="danger">{debtors.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="jadval">Oylik to&apos;lovlar jadvali</TabsTrigger>
        </TabsList>

        <TabsContent value="umumiy">
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader title="Tushum va chiqim" description="Oxirgi 6 oy, mln so'm" />
              <CardContent className="pt-3">
                <RevenueChart data={revenueByMonth} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Chiqim tarkibi" description={f.month} />
              <CardContent>
                <ul className="space-y-4">
                  {expenseBreakdown.map((e) => {
                    const pct = Math.round((e.amount / totalExpense) * 100);
                    return (
                      <li key={e.id}>
                        <div className="flex justify-between gap-3 text-sm">
                          <span>{e.category}</span>
                          <span className="font-semibold whitespace-nowrap tabular-nums">
                            {formatMln(e.amount)}
                          </span>
                        </div>
                        <div
                          className="mt-1.5 h-2 rounded-full bg-muted"
                          role="img"
                          aria-label={`${pct}%`}
                        >
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader title="Oxirgi to'lovlar" />
            <CardContent className="px-0 pb-2">
              <DataTable
                rows={recentPayments}
                mobileCard={(p) => (
                  <MobileRow
                    title={p.student}
                    subtitle={`${p.date} · ${p.method}`}
                    trailing={
                      <span className="text-sm font-bold text-success">+{formatSom(p.amount)}</span>
                    }
                  />
                )}
                columns={[
                  {
                    key: "s",
                    header: "O'quvchi",
                    cell: (p) => <span className="font-semibold">{p.student}</span>,
                  },
                  { key: "d", header: "Sana", cell: (p) => p.date },
                  { key: "m", header: "Usul", cell: (p) => p.method },
                  {
                    key: "a",
                    header: "Summa",
                    align: "right",
                    cell: (p) => (
                      <span className="font-semibold text-success">+{formatSom(p.amount)}</span>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qarzdorlar">
          <Card>
            <CardHeader
              title="Qarzdorlar ro'yxati"
              description="Qarz miqdori bo'yicha kamayish tartibida"
              action={
                <Button variant="outline" size="sm">
                  <Send /> Eslatma yuborish
                </Button>
              }
            />
            <CardContent className="px-0 pb-2">
              <DataTable
                columns={debtorColumns}
                rows={debtors}
                mobileCard={(d) => (
                  <MobileRow
                    href={`/oquvchilar/${d.id}`}
                    title={d.fullName}
                    subtitle={`${d.grade} sinf · ${d.months} oy`}
                    trailing={
                      <span className="text-sm font-bold text-destructive">
                        {formatSom(d.debt)}
                      </span>
                    }
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jadval">
          <Card>
            <CardHeader
              title="Oylik to'lovlar jadvali"
              description="To'lov muddati — har oyning 5-sanasi"
            />
            <CardContent className="px-0 pb-2">
              <DataTable
                columns={scheduleColumns}
                rows={paymentSchedule}
                mobileCard={(r) => (
                  <div className="px-5 py-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-semibold">{r.fullName}</p>
                      <p className="text-xs whitespace-nowrap text-muted-foreground">
                        {formatSom(r.fee)}
                      </p>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      {scheduleMonths.map((m, i) => (
                        <div
                          key={m}
                          className={cn(
                            "rounded-md px-1 py-1 text-center text-[11px] font-semibold",
                            cellStyle[r.cells[i]].cls,
                          )}
                        >
                          <span className="block opacity-80">{m}</span>
                          {cellStyle[r.cells[i]].label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
