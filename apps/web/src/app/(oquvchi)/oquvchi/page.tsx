import { StudentCabinet } from "@/components/role/student-cabinet";
import { t } from "@/i18n";

export const metadata = { title: t.nav.items.studentCabinet };

export default function StudentCabinetPage() {
  return <StudentCabinet />;
}
