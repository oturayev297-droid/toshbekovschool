import { CheckCircle2, Download, FileText, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ChatPreview } from "@/components/messages/chat-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alertBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import { aiReports, type ReportPeriod } from "@/mock/ai";

export const metadata = { title: "AI Xodim hisobotlari" };

const periods: { key: ReportPeriod; label: string; schedule: string }[] = [
  { key: "kunlik", label: "Kunlik", schedule: "Har kuni 08:00" },
  { key: "haftalik", label: "Haftalik", schedule: "Yakshanba 21:00" },
  { key: "oylik", label: "Oylik", schedule: "Har oy 1-sanasi 09:00" },
  { key: "yillik", label: "Yillik", schedule: "1-iyul" },
];

export default function AiStaffReportsPage() {
  return (
    <>
      <PageHeader
        title="AI Xodim hisobotlari"
        description="To'lovlar, qarzdorlik, oyliklar, davomat va yotoqxona nazorati · saytda va Telegramda"
        actions={
          <Button variant="outline">
            <Download /> PDF yuklab olish
          </Button>
        }
      />

      <Tabs defaultValue="kunlik">
        <TabsList aria-label="Hisobot davri">
          {periods.map((p) => (
            <TabsTrigger key={p.key} value={p.key}>
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {periods.map((p) => {
          const r = aiReports[p.key];
          return (
            <TabsContent key={p.key} value={p.key}>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
                <div className="min-w-0 space-y-6">
                  <Card>
                    <CardHeader
                      title={r.title}
                      description={`Tayyorlandi: ${r.generatedAt} · jadval: ${p.schedule}`}
                      action={
                        <Badge variant="success">
                          <CheckCircle2 className="size-3" aria-hidden /> Telegramga yuborildi ·{" "}
                          {r.sentAt}
                        </Badge>
                      }
                    />
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {r.metrics.map((m) => (
                          <div key={m.label} className="rounded-md bg-muted/60 p-3">
                            <dt className="text-xs text-muted-foreground">{m.label}</dt>
                            <dd className="mt-0.5 text-lg font-bold whitespace-nowrap tabular-nums">
                              {m.value}
                            </dd>
                            {m.delta && (
                              <dd
                                className={cn(
                                  "text-xs font-medium",
                                  m.tone === "up" && "text-success",
                                  m.tone === "down" && "text-destructive",
                                  (!m.tone || m.tone === "muted") && "text-muted-foreground",
                                )}
                              >
                                {m.delta}
                              </dd>
                            )}
                          </div>
                        ))}
                      </dl>
                      <p className="mt-5 text-sm leading-relaxed">{r.summary}</p>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                      <CardHeader title="Anomaliyalar" description="Muhimlari tepada" />
                      <CardContent>
                        <ul className="space-y-3">
                          {r.anomalies.map((a) => (
                            <li key={a.text} className="flex items-start gap-3 text-sm">
                              <Badge variant={alertBadge[a.level].variant} className="mt-0.5">
                                {alertBadge[a.level].label}
                              </Badge>
                              <span>{a.text}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader title="Tavsiyalar" description="AI Xodim taklifi — qaror sizda" />
                      <CardContent>
                        <ul className="space-y-3">
                          {r.actions.map((a) => (
                            <li key={a} className="flex items-start gap-2.5 text-sm">
                              <Lightbulb
                                className="mt-0.5 size-4 shrink-0 text-accent"
                                aria-hidden
                              />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader
                      title="Arxiv"
                      description={`Oldingi ${p.label.toLowerCase()} hisobotlar`}
                    />
                    <CardContent className="px-0 pb-2">
                      <ul className="divide-y">
                        {r.archive.map((a) => (
                          <li
                            key={a.id}
                            className="flex items-center justify-between gap-3 px-5 py-3"
                          >
                            <span className="flex min-w-0 items-center gap-2.5 text-sm">
                              <FileText
                                className="size-4 shrink-0 text-muted-foreground"
                                aria-hidden
                              />
                              <span className="truncate font-medium">{a.title}</span>
                            </span>
                            <span className="text-xs whitespace-nowrap text-muted-foreground">
                              {a.sentAt}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <section
                  aria-label="Telegram namunasi"
                  className="xl:sticky xl:top-[4.5rem] xl:self-start"
                >
                  <h2 className="mb-1 text-base font-semibold">Direktor Telegramida</h2>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Qisqa xulosa + to&apos;liq hisobot havolasi
                  </p>
                  <ChatPreview
                    label={`${p.label} hisobot Telegram namunasi`}
                    items={[
                      { kind: "date", label: r.title.split(" · ")[1] ?? p.label },
                      {
                        kind: "bot",
                        time: r.sentAt,
                        text: r.telegram,
                        buttons: [["To'liq hisobot (sayt)"], ["PDF"]],
                      },
                    ]}
                  />
                </section>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
