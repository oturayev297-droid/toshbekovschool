"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  Info,
  Lightbulb,
  ListChecks,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { aiProfile, type Mastery } from "@/mock/ai";
import type { Student } from "@/mock/data";

const masteryBadge: Record<Mastery, { label: string; variant: "success" | "info" | "warning" }> = {
  ozlashtirilgan: { label: "O'zlashtirilgan", variant: "success" },
  jarayonda: { label: "Jarayonda", variant: "info" },
  zaif: { label: "Ko'proq mashq", variant: "warning" },
};

/** "Taxminiy ko'rsatkich" belgisi — IQ va muddat bahosi qat'iy hukm emas */
function Estimate() {
  return (
    <Badge variant="warning" className="whitespace-normal">
      <Info className="size-3 shrink-0" aria-hidden /> Taxminiy ko&apos;rsatkich
    </Badge>
  );
}

export function AiCenter({ students }: { students: Student[] }) {
  const [id, setId] = useState(students[0].id);
  const s = students.find((x) => x.id === id) ?? students[0];
  const p = useMemo(() => aiProfile(s), [s]);

  return (
    <>
      {/* O'quvchi tanlash + qisqa xulosa */}
      <Card className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-soft text-sm font-bold text-primary">
              {initials(s.fullName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold">{s.fullName}</p>
              <p className="text-sm text-muted-foreground">
                {s.grade} sinf · {s.subjects.join(" + ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select
              aria-label="O'quvchini tanlash"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="sm:w-64"
            >
              {students.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.fullName} · {x.grade}
                </option>
              ))}
            </Select>
            <Button variant="outline" asChild>
              <Link href={`/oquvchilar/${s.id}`}>Profil</Link>
            </Button>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {p.subjects.map((x) => (
            <div key={x.subject} className="rounded-md bg-muted/60 p-3">
              <dt className="text-xs text-muted-foreground">{x.subject} darajasi</dt>
              <dd className="mt-0.5 text-lg font-bold">{x.level}</dd>
            </div>
          ))}
          <div className="rounded-md bg-muted/60 p-3">
            <dt className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              Maqsad muddati
            </dt>
            <dd className="mt-0.5 text-sm font-bold">
              {p.subjects[0].goal}: {p.subjects[0].goalMonths[0]}–{p.subjects[0].goalMonths[1]} oy
            </dd>
            <dd className="mt-1">
              <Estimate />
            </dd>
          </div>
          <div className="rounded-md border border-dashed border-warning/50 bg-warning-soft/30 p-3">
            <dt className="text-xs text-muted-foreground">IQ (psixometrik baho)</dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums">
              {p.iqRange[0]}–{p.iqRange[1]}
            </dd>
            <dd className="mt-1">
              <Estimate />
            </dd>
          </div>
        </dl>
        <p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          IQ va muddat — qat&apos;iy hukm emas, taxminiy ko&apos;rsatkich. Ota-onaga faqat muloyim
          va konstruktiv tilda ko&apos;rsatiladi, bolaga salbiy yorliq qo&apos;yilmaydi.
        </p>
      </Card>

      <Tabs defaultValue="diagnostika" className="mt-6">
        <TabsList aria-label="AI Markaz bo'limlari">
          <TabsTrigger value="diagnostika">
            <BrainCircuit className="size-4" /> Diagnostika
          </TabsTrigger>
          <TabsTrigger value="tomonlar">
            <TrendingUp className="size-4" /> Kuchli / zaif
          </TabsTrigger>
          <TabsTrigger value="xulq">
            <Activity className="size-4" /> Xulq-atvor
          </TabsTrigger>
          <TabsTrigger value="reja">
            <CalendarDays className="size-4" /> O&apos;quv rejasi
          </TabsTrigger>
          <TabsTrigger value="test">
            <Target className="size-4" /> Moslashgan test
          </TabsTrigger>
          <TabsTrigger value="xatolar">
            <ListChecks className="size-4" /> Xatolar tahlili
          </TabsTrigger>
        </TabsList>

        {/* 1. Bilim darajasi diagnostikasi */}
        <TabsContent value="diagnostika">
          <div className="grid gap-6 lg:grid-cols-2">
            {p.subjects.map((x) => (
              <Card key={x.subject}>
                <CardHeader
                  title={`${x.subject} · ${x.level}`}
                  description={`O'rtacha ${x.avg} ball · mavzular o'zlashtirilishi`}
                />
                <CardContent>
                  <ul className="space-y-4">
                    {x.topics.map((t) => (
                      <li key={t.topic}>
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="min-w-0 truncate font-medium">{t.topic}</span>
                          <span className="flex shrink-0 items-center gap-2">
                            <Badge variant={masteryBadge[t.mastery].variant}>
                              {masteryBadge[t.mastery].label}
                            </Badge>
                            <span className="w-9 text-right font-bold tabular-nums">
                              {t.percent}%
                            </span>
                          </span>
                        </div>
                        <div className="mt-1.5 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${t.percent}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 2. Kuchli / zaif tomonlar */}
        <TabsContent value="tomonlar">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader title="Kuchli tomonlar" description="Testlar va mentor suhbatlaridan" />
              <CardContent>
                <ul className="space-y-3">
                  {p.strengths.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader
                title="O'sish nuqtalari"
                description="Savol-javob orqali aniqlangan, ko'proq e'tibor kerak"
              />
              <CardContent>
                <ul className="space-y-3">
                  {p.growth.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3. Xulq-atvor tahlili */}
        <TabsContent value="xulq">
          <Card>
            <CardHeader
              title="Xulq-atvor tahlili"
              description="Yotoqxona, davomat, test va mentor faolligi ma'lumotlaridan · oxirgi 7 kun"
            />
            <CardContent>
              <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {p.behavior.map((b) => (
                  <div key={b.label} className="rounded-md bg-muted/60 p-3">
                    <dt className="text-xs text-muted-foreground">{b.label}</dt>
                    <dd className="mt-1 flex items-center gap-1.5 text-sm font-bold">
                      {b.tone === "good" ? (
                        <CheckCircle2
                          className="size-4 shrink-0 text-success"
                          aria-label="yaxshi"
                        />
                      ) : (
                        <AlertCircle
                          className="size-4 shrink-0 text-warning"
                          aria-label="e'tibor"
                        />
                      )}
                      {b.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-start gap-3 rounded-md border bg-surface-soft/30 p-4 text-sm">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <p>{p.behaviorSummary}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Shaxsiy o'quv rejasi */}
        <TabsContent value="reja">
          <Card>
            <CardHeader
              title="Haftalik shaxsiy o'quv rejasi"
              description="30 noyabr – 5 dekabr · zaif mavzularga moslab tuzilgan"
              action={
                <Button variant="outline" size="sm">
                  <Send /> O&apos;quvchi va ota-onaga
                </Button>
              }
            />
            <CardContent>
              <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {p.plan.map((d) => (
                  <li key={d.day} className="rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="grid size-8 place-items-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                        {d.day}
                      </span>
                      <span className="text-xs text-muted-foreground">{d.minutes} daq</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold">{d.task}</p>
                    <p className="text-xs text-muted-foreground">
                      {d.subject} · {d.topic}
                    </p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5. Moslashgan test */}
        <TabsContent value="test">
          <Card>
            <CardHeader
              title={`Moslashgan test · ${p.adaptiveTest.subject}`}
              description={`«${p.adaptiveTest.topic}» · ${p.adaptiveTest.level} · ${p.adaptiveTest.minutes} daqiqa`}
              action={
                <Button size="sm">
                  <Send /> O&apos;quvchiga yuborish
                </Button>
              }
            />
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Savollar o&apos;quvchining hozirgi darajasiga moslab tanlanadi: to&apos;g&apos;ri
                javoblardan keyin qiyinlashadi, xatodan keyin osonlashadi.
              </p>
              <dl className="mt-4 grid grid-cols-3 gap-3">
                {(
                  [
                    ["Oson", p.adaptiveTest.mix.oson],
                    ["O'rta", p.adaptiveTest.mix.orta],
                    ["Qiyin", p.adaptiveTest.mix.qiyin],
                  ] as const
                ).map(([l, n]) => (
                  <div key={l} className="rounded-md bg-muted/60 p-3 text-center">
                    <dt className="text-xs text-muted-foreground">{l}</dt>
                    <dd className="text-xl font-bold tabular-nums">{n}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Xatolar tahlili */}
        <TabsContent value="xatolar">
          <div className="grid gap-6 lg:grid-cols-2">
            {p.mistakes.map((m) => (
              <Card key={m.subject} className="p-4 sm:p-5">
                <Badge variant="accent">{m.subject}</Badge>
                <p className="mt-3 text-sm font-semibold">{m.question}</p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="rounded-md bg-destructive-soft/50 p-2.5">
                    <dt className="text-xs text-muted-foreground">O&apos;quvchi javobi</dt>
                    <dd className="font-semibold text-destructive">{m.answer}</dd>
                  </div>
                  <div className="rounded-md bg-success-soft/50 p-2.5">
                    <dt className="text-xs text-muted-foreground">To&apos;g&apos;ri javob</dt>
                    <dd className="font-semibold text-success">{m.correct}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-sm">
                  <span className="font-semibold">Nega xato: </span>
                  {m.why}
                </p>
                <p
                  className={cn(
                    "mt-2 flex items-start gap-2 rounded-md bg-surface-soft/40 p-2.5 text-sm",
                  )}
                >
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {m.fix}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
