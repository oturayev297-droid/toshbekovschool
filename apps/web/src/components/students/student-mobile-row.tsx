import { Badge } from "@/components/ui/badge";
import { MobileRow } from "@/components/ui/data-table";
import { initials } from "@/lib/format";
import { paymentBadge } from "@/lib/status";
import type { Student } from "@/mock/data";

/** Mobil (<640px) o'quvchi kartasi: ism, sinf, to'lov belgisi */
export function StudentMobileRow({ student: s }: { student: Student }) {
  const pay = paymentBadge[s.paymentStatus];
  return (
    <MobileRow
      href={`/oquvchilar/${s.id}`}
      leading={
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-soft text-xs font-bold text-primary">
          {initials(s.fullName)}
        </span>
      }
      title={s.fullName}
      subtitle={`${s.grade} sinf · ${s.subjects.join(" + ")}`}
      trailing={<Badge variant={pay.variant}>{pay.label}</Badge>}
    />
  );
}
