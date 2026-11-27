import { BadgeDollarSign, BedDouble, GraduationCap, UserCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StudentsExplorer } from "@/components/students/students-explorer";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { grades, students } from "@/mock/data";

export const metadata = { title: "O'quvchilar" };

export default function StudentsPage() {
  const debtors = students.filter((s) => s.paymentStatus !== "tolangan").length;
  const inDorm = students.filter((s) => s.dorm).length;
  const linked = students.filter((s) => s.parent.telegramLinked).length;

  return (
    <>
      <PageHeader
        title="O'quvchilar"
        description="Ro'yxat, qidiruv va filtrlar. Profilni ochish uchun ismni bosing."
        actions={
          <>
            <Button variant="outline">Excel&apos;ga eksport</Button>
            <Button>+ O&apos;quvchi qo&apos;shish</Button>
          </>
        }
      />
      <section
        aria-label="Qisqa ko'rsatkichlar"
        className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard label="Jami" value={String(students.length)} icon={GraduationCap} />
        <StatCard label="Yotoqxonada" value={String(inDorm)} icon={BedDouble} tone="accent" />
        <StatCard
          label="To'lamagan / qisman"
          value={String(debtors)}
          icon={BadgeDollarSign}
          tone="warning"
        />
        <StatCard
          label="Telegram ulangan"
          value={`${linked}/${students.length}`}
          icon={UserCheck}
          tone="success"
        />
      </section>
      <StudentsExplorer students={students} grades={grades} />
    </>
  );
}
