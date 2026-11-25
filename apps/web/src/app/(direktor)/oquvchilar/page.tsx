import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { students } from "@/mock/data";

export const metadata = { title: "O'quvchilar" };

// Vaqtinchalik: to'liq ro'yxat (qidiruv/filtr) keyingi qadamda.
export default function StudentsPlaceholder() {
  return (
    <>
      <PageHeader title="O'quvchilar" />
      <EmptyState
        icon={GraduationCap}
        title="O'quvchilar ro'yxati maketi keyingi qadamda"
        description="Hozircha namunaviy profilni ko'rishingiz mumkin."
        action={
          <Button asChild>
            <Link href={`/oquvchilar/${students[0].id}`}>Namunaviy profilni ochish</Link>
          </Button>
        }
      />
    </>
  );
}
