import { Pencil } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ScheduleExplorer } from "@/components/schedule/schedule-explorer";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n";

export const metadata = { title: t.schedule.title };

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        title={t.schedule.title}
        description={t.schedule.description}
        actions={
          <Button variant="outline">
            <Pencil /> {t.schedule.edit}
          </Button>
        }
      />
      <ScheduleExplorer />
      <p className="mt-6 text-xs text-muted-foreground">{t.cabinet.mockNote}</p>
    </>
  );
}
