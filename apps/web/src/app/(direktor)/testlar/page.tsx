import Link from "next/link";
import { BookOpenCheck, ClipboardCheck, MessageSquareText, Target, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ResultsTable, TopicStats } from "@/components/tests/results";
import { TestBuilder } from "@/components/tests/test-builder";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { testsSummary as t } from "@/mock/tests";

export const metadata = { title: "Testlar" };

export default function TestsPage() {
  return (
    <>
      <PageHeader
        title="Testlar va natijalar"
        description="Fan → mavzu → test. Natijalar avtomatik baholanadi."
        actions={
          <Button variant="outline" asChild>
            <Link href="/xabar-namunalari#test">
              <MessageSquareText /> Xabar namunasi
            </Link>
          </Button>
        }
      />

      <section
        aria-label="Test ko'rsatkichlari"
        className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4"
      >
        <StatCard label="Faol testlar" value={String(t.active)} icon={ClipboardCheck} />
        <StatCard
          label="Bu hafta topshirildi"
          value={String(t.attemptsWeek)}
          icon={Users}
          tone="accent"
        />
        <StatCard
          label="O'rtacha ball"
          value={String(t.avgScore)}
          hint="+3 o'tgan haftadan"
          hintTone="up"
          icon={Target}
          tone="success"
        />
        <StatCard label="Mavzular" value={String(t.topics)} icon={BookOpenCheck} tone="warning" />
      </section>

      <Tabs defaultValue="natijalar" className="mt-6">
        <TabsList aria-label="Testlar bo'limlari">
          <TabsTrigger value="natijalar">Natijalar</TabsTrigger>
          <TabsTrigger value="statistika">Mavzu statistikasi</TabsTrigger>
          <TabsTrigger value="yaratish">Test yaratish</TabsTrigger>
        </TabsList>
        <TabsContent value="natijalar">
          <ResultsTable />
        </TabsContent>
        <TabsContent value="statistika">
          <TopicStats />
        </TabsContent>
        <TabsContent value="yaratish">
          <TestBuilder />
        </TabsContent>
      </Tabs>
    </>
  );
}
