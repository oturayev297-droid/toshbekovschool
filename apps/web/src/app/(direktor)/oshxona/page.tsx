import Link from "next/link";
import { CalendarClock, CheckCircle2, MessageSquareText, Send } from "lucide-react";
import { MenuForm } from "@/components/kitchen/menu-form";
import { WeekMenuView } from "@/components/kitchen/week-menu";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentWeek, menuArchive, nextWeekDraft } from "@/mock/kitchen";

export const metadata = { title: "Oshxona" };

export default function KitchenPage() {
  return (
    <>
      <PageHeader
        title="Oshxona"
        description="Haftalik menyu: nonushta, tushlik, tushki va kechki ovqat"
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/xabar-namunalari#menyu">
                <MessageSquareText /> Xabar namunasi
              </Link>
            </Button>
            <Button>
              <Send /> Ota-onalarga yuborish
            </Button>
          </>
        }
      />

      {/* Yuborish holati */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="flex items-start gap-3 p-4">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
          <div className="text-sm">
            <p className="font-semibold">Joriy hafta yuborilgan</p>
            <p className="text-muted-foreground">
              {currentWeek.sentAt} · {currentWeek.sentTo} ta ota-onaga
            </p>
          </div>
        </Card>
        <Card className="flex items-start gap-3 p-4">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-warning" aria-hidden />
          <div className="text-sm">
            <p className="font-semibold">Keyingi hafta: qoralama</p>
            <p className="text-muted-foreground">
              {nextWeekDraft.range} · yakshanba 20:00 da avtomatik yuboriladi
            </p>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="joriy" className="mt-6">
        <TabsList aria-label="Oshxona bo'limlari">
          <TabsTrigger value="joriy">Joriy hafta</TabsTrigger>
          <TabsTrigger value="kiritish">
            Menyu kiritish <Badge variant="warning">qoralama</Badge>
          </TabsTrigger>
          <TabsTrigger value="arxiv">Arxiv</TabsTrigger>
        </TabsList>

        <TabsContent value="joriy">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-base font-semibold">{currentWeek.range}</h2>
            <p className="text-xs text-muted-foreground">Kiritdi: {currentWeek.author}</p>
          </div>
          <WeekMenuView week={currentWeek} />
        </TabsContent>

        <TabsContent value="kiritish">
          <MenuForm draft={nextWeekDraft} />
        </TabsContent>

        <TabsContent value="arxiv">
          <ul className="space-y-3">
            {menuArchive.map((w) => (
              <li key={w.id}>
                <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold">{w.range}</p>
                    <p className="text-sm text-muted-foreground">{w.highlight}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Kiritdi: {w.author} · Yuborildi: {w.sentAt} · {w.sentTo} ta ota-ona
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm">
                      Ko&apos;rish
                    </Button>
                    <Button variant="ghost" size="sm">
                      Nusxa olish
                    </Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </>
  );
}
