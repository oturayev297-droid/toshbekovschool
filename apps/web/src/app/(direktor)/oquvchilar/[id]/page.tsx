import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  BookOpen,
  Bot,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { ScoreChart } from "@/components/charts/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Column, DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatSom, initials } from "@/lib/format";
import { dormBadge, paymentBadge } from "@/lib/status";
import {
  dormLogs,
  mentorActivity,
  paymentHistory,
  students,
  subjectDetails,
  testList,
  testResults,
  weeklyAiReport,
} from "@/mock/data";

export function generateStaticParams() {
  return students.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = students.find((x) => x.id === id);
  return { title: s ? s.fullName : "O'quvchi" };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{children}</dd>
    </div>
  );
}

const tabs = [
  { value: "umumiy", label: "Umumiy", icon: User },
  { value: "hisobot", label: "Hisobot (AI)", icon: FileText },
  { value: "moliya", label: "Moliya", icon: Wallet },
  { value: "fanlar", label: "Fanlar", icon: BookOpen },
  { value: "yotoqxona", label: "Yotoqxona", icon: BedDouble },
  { value: "testlar", label: "Test natijalari", icon: ClipboardList },
  { value: "mentorlar", label: "AI mentorlar", icon: Bot },
  { value: "ota-ona", label: "Ota-ona profili", icon: ShieldCheck },
];

type Log = (typeof dormLogs)[number] & { id: string };
const dormColumns: Column<Log>[] = [
  { key: "date", header: "Sana", cell: (r) => r.date },
  { key: "sleep", header: "Uxlash", cell: (r) => r.sleep },
  { key: "wake", header: "Turish", cell: (r) => r.wake },
  { key: "lesson", header: "Darsga", cell: (r) => r.lesson, hideOnMobile: true },
  {
    key: "status",
    header: "Holat",
    cell: (r) => <Badge variant={dormBadge[r.status].variant}>{dormBadge[r.status].label}</Badge>,
  },
  { key: "by", header: "Tarbiyachi", cell: (r) => r.by, hideOnMobile: true },
];

export default async function StudentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = students.find((x) => x.id === id);
  if (!s) notFound();

  const debt = s.monthlyFee - s.paid;
  const pay = paymentBadge[s.paymentStatus];

  return (
    <>
      <Link
        href="/oquvchilar"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" /> O&apos;quvchilar
      </Link>

      {/* Profil sarlavhasi */}
      <Card className="overflow-hidden">
        <div className="h-20 bg-[linear-gradient(110deg,var(--brand-primary)_0%,var(--brand-primary)_55%,var(--brand-accent)_100%)]" />
        <div className="flex flex-col gap-4 px-5 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="-mt-10 grid size-20 shrink-0 place-items-center rounded-xl border-4 border-card bg-surface-soft text-2xl font-extrabold text-primary">
              {initials(s.fullName)}
            </div>
            <div className="min-w-0 pt-3">
              <h1 className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
                {s.fullName}
              </h1>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <Badge variant="info">{s.grade} sinf</Badge>
                {s.subjects.map((sub) => (
                  <Badge key={sub} variant="accent">
                    {sub}
                  </Badge>
                ))}
                <Badge variant={pay.variant}>{pay.label}</Badge>
                {s.dorm && <Badge>Yotoqxonada</Badge>}
              </div>
            </div>
          </div>
          <div className="flex gap-2 sm:pt-3">
            <Button variant="outline" size="sm">
              <Send /> Ota-onaga xabar
            </Button>
            <Button size="sm">Tahrirlash</Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="umumiy" className="mt-6">
        <TabsList aria-label="O'quvchi profili bo'limlari">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value}>
              <Icon className="size-4" aria-hidden /> {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 1. Umumiy */}
        <TabsContent value="umumiy">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader title="Shaxsiy ma'lumotlar" />
              <CardContent>
                <dl className="grid gap-5 sm:grid-cols-2">
                  <Field label="To'liq ism">{s.fullName}</Field>
                  <Field label="Sinf">{s.grade}</Field>
                  <Field label="Tug'ilgan sana">{s.birthDate.split("-").reverse().join(".")}</Field>
                  <Field label="Qabul qilingan">
                    {s.enrolledAt.split("-").reverse().join(".")}
                  </Field>
                  <Field label="Tanlangan fanlar (2 ta)">{s.subjects.join(" + ")}</Field>
                  <Field label="Yotoqxona">{s.dorm ? "Ha, yotoqxonada yashaydi" : "Yo'q"}</Field>
                </dl>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Ota-ona" />
              <CardContent className="space-y-3">
                <p className="font-semibold">{s.parent.fullName}</p>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" /> {s.parent.phone}
                </p>
                {s.parent.telegramLinked ? (
                  <Badge variant="success">
                    <CheckCircle2 className="size-3.5" /> Telegram ulangan
                  </Badge>
                ) : (
                  <Badge variant="warning">Telegram ulanmagan</Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 2. Hisobot (AI haftalik tahlil) */}
        <TabsContent value="hisobot">
          <Card>
            <CardHeader
              title="AI haftalik tahlil"
              description={weeklyAiReport.week}
              action={
                weeklyAiReport.sentToParent ? (
                  <Badge variant="success">Ota-onaga yuborildi</Badge>
                ) : (
                  <Badge variant="warning">Yuborilmagan</Badge>
                )
              }
            />
            <CardContent className="space-y-5">
              <p className="rounded-md bg-surface-soft/50 p-4 text-sm leading-relaxed">
                {weeklyAiReport.summary}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-success">Yutuqlar</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    {weeklyAiReport.strengths.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-accent">Keyingi hafta e&apos;tibor</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                    {weeklyAiReport.focus.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Tahlil taxminiy ko&apos;rsatkich sifatida tayyorlanadi va muloyim, konstruktiv tilda
                yoziladi.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Moliya */}
        <TabsContent value="moliya">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Oylik to&apos;lov</p>
              <p className="mt-1 text-xl font-bold tabular-nums">{formatSom(s.monthlyFee)}</p>
              <p className="mt-1 text-xs text-muted-foreground">2 ta fan bo&apos;yicha</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">Bu oy to&apos;langan</p>
              <p className="mt-1 text-xl font-bold text-success tabular-nums">
                {formatSom(s.paid)}
              </p>
            </Card>
            <Card className={debt > 0 ? "border-destructive/40 bg-destructive-soft/40 p-5" : "p-5"}>
              <p className="text-sm text-muted-foreground">Qarz</p>
              <p
                className={`mt-1 text-xl font-bold tabular-nums ${debt > 0 ? "text-destructive" : ""}`}
              >
                {formatSom(debt)}
              </p>
              {debt > 0 && (
                <Badge variant="danger" className="mt-2">
                  Qarzdor
                </Badge>
              )}
            </Card>
          </div>
          <Card className="mt-6">
            <CardHeader title="To'lov tarixi" />
            <CardContent className="px-0 pb-2">
              <DataTable
                rows={paymentHistory}
                columns={[
                  { key: "m", header: "Oy", cell: (r) => r.month },
                  { key: "d", header: "Sana", cell: (r) => r.date, hideOnMobile: true },
                  {
                    key: "s",
                    header: "Holat",
                    cell: (r) => (
                      <Badge variant={paymentBadge[r.status].variant}>
                        {paymentBadge[r.status].label}
                      </Badge>
                    ),
                  },
                  { key: "a", header: "Summa", align: "right", cell: (r) => formatSom(r.amount) },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Fanlar */}
        <TabsContent value="fanlar">
          <p className="mb-4 text-sm text-muted-foreground">
            Har bir o&apos;quvchi <strong className="text-foreground">aniq 2 ta fan</strong>{" "}
            tanlaydi.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {subjectDetails.map((d) => (
              <Card key={d.subject} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary">{d.subject}</h3>
                    <p className="text-sm text-muted-foreground">O&apos;qituvchi: {d.teacher}</p>
                  </div>
                  <Badge variant="accent">{d.level}</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Dastur bo&apos;yicha</span>
                    <span>{d.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-accent"
                      style={{ width: `${d.progress}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 text-sm">
                  Narx: <span className="font-semibold">{formatSom(d.price)}</span> / oy
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 5. Yotoqxona */}
        <TabsContent value="yotoqxona">
          <Card>
            <CardHeader
              title="Kechki holat jurnali"
              description="Tarbiyachi belgilagan har bir holat ota-onaga darhol Telegram orqali yuboriladi"
            />
            <CardContent className="px-0 pb-2">
              <DataTable columns={dormColumns} rows={dormLogs.map((l) => ({ ...l, id: l.date }))} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Test natijalari */}
        <TabsContent value="testlar">
          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader title="Fanlar bo'yicha natijalar" description="Haftalik o'rtacha ball" />
              <CardContent className="pt-3">
                <ScoreChart
                  data={testResults}
                  keys={[...s.subjects].filter((k) => k in testResults[0])}
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader title="Oxirgi testlar" />
              <CardContent className="pt-3">
                <ul className="divide-y">
                  {testList.map((t) => (
                    <li key={t.id} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{t.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          {t.subject} · {t.date}
                        </p>
                      </div>
                      <Badge
                        variant={t.score >= 80 ? "success" : t.score >= 60 ? "warning" : "danger"}
                      >
                        {t.score} ball
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 7. AI mentorlar */}
        <TabsContent value="mentorlar">
          <p className="mb-4 text-sm text-muted-foreground">
            Faqat tanlangan 2 ta fan mentori ochiq.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {mentorActivity.map((m) => (
              <Card key={m.subject} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary">{m.subject} mentori</h3>
                    <p className="text-xs text-muted-foreground">Oxirgi mavzu: {m.lastTopic}</p>
                  </div>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-md bg-muted/60 p-3">
                    <dt className="text-xs text-muted-foreground">Bu hafta</dt>
                    <dd className="text-lg font-bold tabular-nums">{m.minutes} daq</dd>
                  </div>
                  <div className="rounded-md bg-muted/60 p-3">
                    <dt className="text-xs text-muted-foreground">Suhbatlar</dt>
                    <dd className="text-lg font-bold tabular-nums">{m.sessions}</dd>
                  </div>
                </dl>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/mentor">
                    <MessageCircle /> Suhbatni ochish
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 8. Ota-ona profili */}
        <TabsContent value="ota-ona">
          <Card>
            <CardHeader
              title="Ota-ona ko'rinishi"
              description="Ota-ona tizimga kirganda faqat shu farzandining ma'lumotlarini ko'radi"
            />
            <CardContent>
              <dl className="grid gap-5 sm:grid-cols-3">
                <Field label="Ota-ona">{s.parent.fullName}</Field>
                <Field label="Telefon">{s.parent.phone}</Field>
                <Field label="Telegram">
                  {s.parent.telegramLinked ? "Ulangan" : "Ulanmagan — bir martalik kod kerak"}
                </Field>
              </dl>
              <div className="mt-6 rounded-md border border-dashed p-4">
                <h3 className="text-sm font-semibold">Ota-onaga ochiq bo&apos;limlar</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    "Haftalik AI hisobot",
                    "To'lovlar",
                    "Test natijalari",
                    "Yotoqxona",
                    "Oshxona menyusi",
                  ].map((x) => (
                    <Badge key={x} variant="info">
                      {x}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/ota-ona">Ota-ona kabinetini ko&apos;rish (maket)</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
