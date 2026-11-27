import Link from "next/link";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { ShiftSchedule } from "@/components/dorm/shift-schedule";
import { TutorShift } from "@/components/dorm/tutor-shift";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n";
import { dormStudents, shift } from "@/mock/dorm";

export const metadata = { title: `${t.dorm.shiftName} — ${t.dorm.tutor.toLowerCase()}` };

export default function TutorShiftPage() {
  return (
    <>
      <Link
        href="/yotoqxona"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden /> {t.dorm.directorView}
      </Link>
      <PageHeader
        title={t.dorm.shiftName}
        description={`${shift.date} · ${shift.hours}`}
        actions={
          <Button variant="outline">
            <ClipboardCheck /> {t.dorm.handOver}
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <TutorShift initial={dormStudents} />
        <div className="xl:sticky xl:top-[4.5rem] xl:self-start">
          <ShiftSchedule todayDate="26.11" />
        </div>
      </div>
    </>
  );
}
