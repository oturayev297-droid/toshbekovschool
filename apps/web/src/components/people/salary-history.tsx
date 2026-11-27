import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatMln } from "@/lib/format";

/** Oylik to'lovlar tarixi (fond bo'yicha, oxirgi oylar) */
export function SalaryHistory({
  rows,
}: {
  rows: { month: string; amount: number; paidOn: string; done: boolean }[];
}) {
  return (
    <Card>
      <CardHeader title="Oylik to'lov tarixi" description="Fond bo'yicha, oxirgi oylar" />
      <CardContent className="pt-3">
        <ul className="divide-y">
          {rows.map((r) => (
            <li key={r.month} className="flex items-center justify-between gap-3 py-2.5">
              <div>
                <p className="text-sm font-semibold">{r.month}</p>
                <p className="text-xs text-muted-foreground">{r.paidOn}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums">{formatMln(r.amount)}</p>
                <Badge variant={r.done ? "success" : "warning"}>
                  {r.done ? "To'landi" : "Jarayonda"}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
