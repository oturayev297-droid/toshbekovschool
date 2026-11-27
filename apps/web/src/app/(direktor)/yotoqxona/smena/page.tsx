import Link from "next/link";
import { ArrowLeft, ClipboardCheck } from "lucide-react";
import { ShiftSchedule } from "@/components/dorm/shift-schedule";
import { TutorShift } from "@/components/dorm/tutor-shift";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { dormStudents, shift } from "@/mock/dorm";

export const metadata = { title: "Smena — tarbiyachi" };

export default function TutorShiftPage() {
  return (
    <>
      <Link
        href="/yotoqxona"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden /> Direktor ko&apos;rinishi
      </Link>
      <PageHeader
        title={shift.name}
        description={`${shift.date} · ${shift.hours} · Tarbiyachi: ${shift.tutor}`}
        actions={
          <Button variant="outline">
            <ClipboardCheck /> Smenani topshirish
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <TutorShift initial={dormStudents} />
        <div className="xl:sticky xl:top-[4.5rem] xl:self-start">
          <ShiftSchedule todayDate="26.11" highlight={shift.tutor} />
        </div>
      </div>
    </>
  );
}
