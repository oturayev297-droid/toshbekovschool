"use client";

import { type ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  BedDouble,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Lightbulb,
  Moon,
  NotebookPen,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { ScoreChart } from "@/components/charts/charts";
import { WeekMenuView } from "@/components/kitchen/week-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { tashkentISODate } from "@/lib/date";
import { formatSom } from "@/lib/format";
import { paymentBadge } from "@/lib/status";
import { cn } from "@/lib/utils";
import type { DormStatus } from "@/mock/data";
import { currentWeek, meals } from "@/mock/kitchen";
import { scoreLevel } from "@/mock/tests";
import { subjectSettings } from "@/mock/settings";
import { useChild } from "./parent-shell";

/** Ota-onaga yotoqxona holati — faqat neytral matn, salomatlik tafsilotlarisiz */
const dormText: Record<DormStatus, { label: string; variant: "info" | "warning" | "default" }> = {
  uxladi: { label: "Uxladi", variant: "info" },
  uxlamadi: { label: "Yaxshi uxlay olmadi", variant: "warning" },
  belgilanmagan: { label: "Hali belgilanmagan", variant: "default" },
};

const levelBadge = {
  alo: { label: "A'lo", variant: "success" as const },
  yaxshi: { label: "Yaxshi", variant: "info" as const },
  past: { label: "Ko'proq mashq", variant: "warning" as const },
};

function Tile({
  href,
  icon: Icon,
  title,
  children,
}: {
  href?: string;
  icon: typeof Moon;
  title: string;
  children: ReactNode;
}) {
  const body = (
    <Card className={cn("h-full p-4", href && "transition-colors hover:bg-secondary/50")}>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="size-4 text-accent" aria-hidden />
        <span className="flex-1">{title}</span>
        {href && <ChevronRight className="size-4 text-muted-foreground" aria-hidden />}
      </p>
      <div className="mt-2 text-sm">{children}</div>
    </Card>
  );
  return href ? (
    <Link
      href={href}
      className="block rounded-lg focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
    >
      {body}
    </Link>
  ) : (
    body
  );
}

function useToday() {
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(tashkentISODate(new Date())), []);
  return today;
}

export function ParentHome() {
  const c = useChild();
  const today = useToday();
  const menuToday = currentWeek.days.find((d) => d.date === today);
  const lastPay = c.payments[0];
  const lastTest = c.tests[0];
  const name = c.student.fullName.split(" ")[0];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-primary">
        {name} · {c.student.grade} sinf
      </h1>

      <Card className="border-accent/30 bg-accent-soft/15 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="size-4 text-accent" aria-hidden /> Haftalik AI hisobot ·{" "}
          {c.weekly.week}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed">{c.weekly.summary}</p>
        <Button variant="outline" size="sm" className="mt-3" asChild>
          <Link href="/ota-ona/hisobot">To&apos;liq hisobot</Link>
        </Button>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Tile href="/ota-ona/yotoqxona" icon={BedDouble} title="Yotoqxona">
          {c.dorm?.tonight ? (
            <>
              <Badge variant={dormText[c.dorm.tonight.status].variant}>
                {dormText[c.dorm.tonight.status].label}
              </Badge>
              <p className="mt-1.5 text-muted-foreground">
                {c.dorm.tonight.sleep && `Uxladi ${c.dorm.tonight.sleep} · `}
                {c.dorm.tonight.wake &&
                  `turdi ${c.dorm.tonight.wake} · darsga ${c.dorm.tonight.lesson}`}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground">{name} yotoqxonada yashamaydi</p>
          )}
        </Tile>
        <Tile href="/ota-ona/tolov" icon={CreditCard} title="To'lov">
          <Badge variant={paymentBadge[c.student.paymentStatus].variant}>
            {paymentBadge[c.student.paymentStatus].label}
          </Badge>
          <p className="mt-1.5 text-muted-foreground">
            {lastPay.month}: {formatSom(lastPay.amount)} · keyingi: {c.dueDate}
          </p>
        </Tile>
        <Tile href="/ota-ona/testlar" icon={NotebookPen} title="Oxirgi test">
          <p className="font-semibold">
            {lastTest.subject} · {lastTest.score} ball{" "}
            <Badge variant={levelBadge[scoreLevel(lastTest.score)].variant}>
              {levelBadge[scoreLevel(lastTest.score)].label}
            </Badge>
          </p>
          <p className="mt-1 text-muted-foreground">
            {lastTest.topic} · {lastTest.date}
          </p>
        </Tile>
        <Tile href="/ota-ona/menyu" icon={UtensilsCrossed} title="Bugungi menyu">
          {menuToday ? (
            <dl className="grid grid-cols-[4.5rem_1fr] gap-x-2 gap-y-0.5">
              {meals.map((m) => (
                <div key={m.key} className="contents">
                  <dt className="text-muted-foreground">{m.label}</dt>
                  <dd className="truncate">{menuToday[m.key]}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-muted-foreground">Haftalik menyuni ko&apos;rish</p>
          )}
        </Tile>
      </div>
    </div>
  );
}

export function ParentReport() {
  const c = useChild();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader
          title={`Haftalik AI hisobot · ${c.weekly.week}`}
          description="AI tayyorlaydi, har shanba Telegramga ham yuboriladi"
        />
        <CardContent>
          <p className="text-sm leading-relaxed">{c.weekly.summary}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Yaxshi tomonlar</h3>
              <ul className="mt-2 space-y-2">
                {c.weekly.strengths.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Keyingi hafta e&apos;tibor</h3>
              <ul className="mt-2 space-y-2">
                {c.weekly.focus.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Oldingi hisobotlar" />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {c.weeklyArchive.map((w) => (
              <li key={w.week} className="flex items-start gap-3 px-5 py-3 text-sm">
                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <p className="font-semibold">{w.week}</p>
                  <p className="text-muted-foreground">{w.headline}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function ParentPayments() {
  const c = useChild();
  const s = c.student;
  const debt = s.monthlyFee - s.paid;
  const parts = s.subjects.map((sub) => ({
    subject: sub,
    price: subjectSettings.find((x) => x.subject === sub)?.price ?? 0,
  }));

  return (
    <div className="space-y-4">
      <Card className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Noyabr 2026 · oylik to&apos;lov</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{formatSom(s.monthlyFee)}</p>
          </div>
          <Badge variant={paymentBadge[s.paymentStatus].variant}>
            {paymentBadge[s.paymentStatus].label}
          </Badge>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-muted/60 p-3">
            <dt className="text-xs text-muted-foreground">To&apos;langan</dt>
            <dd className="font-bold tabular-nums">{formatSom(s.paid)}</dd>
          </div>
          <div
            className={cn("rounded-md p-3", debt > 0 ? "bg-destructive-soft/60" : "bg-muted/60")}
          >
            <dt className="text-xs text-muted-foreground">Qarz</dt>
            <dd className={cn("font-bold tabular-nums", debt > 0 && "text-destructive")}>
              {formatSom(debt)}
            </dd>
          </div>
        </dl>
        <ul className="mt-4 space-y-1 border-t pt-3 text-sm">
          {parts.map((p) => (
            <li key={p.subject} className="flex justify-between gap-3">
              <span className="text-muted-foreground">{p.subject}</span>
              <span className="tabular-nums">{formatSom(p.price)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Keyingi to&apos;lov muddati: {c.dueDate}
        </p>
        <Button className="mt-4 h-11 w-full" disabled>
          <CreditCard /> Onlayn to&apos;lash (4-bosqichda)
        </Button>
      </Card>
      <Card>
        <CardHeader title="To'lov tarixi" />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {c.payments.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <p className="font-semibold">{p.month}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold tabular-nums">{formatSom(p.amount)}</p>
                  <Badge variant={paymentBadge[p.status].variant}>
                    {paymentBadge[p.status].label}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function ParentMenu() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-base font-semibold">Haftalik menyu · {currentWeek.range}</h1>
        <p className="text-xs text-muted-foreground">
          Har yakshanba 20:00 da Telegramga ham keladi
        </p>
      </div>
      <WeekMenuView week={currentWeek} />
    </div>
  );
}

export function ParentTests() {
  const c = useChild();
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Natijalar dinamikasi" description="Fanlar bo'yicha, oxirgi 4 hafta" />
        <CardContent className="pt-3">
          <ScoreChart data={c.trend} keys={[...c.student.subjects]} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Oxirgi testlar" />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {c.tests.map((t) => {
              const l = levelBadge[scoreLevel(t.score)];
              return (
                <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.topic}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.subject} · {t.date}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="font-bold tabular-nums">{t.score}</span>
                    <Badge variant={l.variant}>{l.label}</Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export function ParentDorm() {
  const c = useChild();
  const name = c.student.fullName.split(" ")[0];
  if (!c.dorm) {
    return (
      <EmptyState
        icon={BedDouble}
        title={`${name} yotoqxonada yashamaydi`}
        description="Yotoqxona xabarlari faqat yotoqxonada yashovchi farzandlar uchun keladi."
        action={
          <Button variant="outline" asChild>
            <Link href="/ota-ona">Bosh sahifaga</Link>
          </Button>
        }
      />
    );
  }
  const t = c.dorm.tonight;
  return (
    <div className="space-y-4">
      {t && (
        <Card className="p-4 sm:p-5">
          <p className="text-sm text-muted-foreground">26–27 noyabr kechasi</p>
          <div className="mt-2 flex items-center gap-3">
            <Moon className="size-6 text-primary" aria-hidden />
            <Badge variant={dormText[t.status].variant} className="text-sm">
              {dormText[t.status].label}
            </Badge>
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            {(
              [
                ["Uxladi", t.sleep],
                ["Turdi", t.wake],
                ["Darsga", t.lesson],
              ] as const
            ).map(([l, v]) => (
              <div key={l} className="rounded-md bg-muted/60 p-2.5">
                <dt className="text-xs text-muted-foreground">{l}</dt>
                <dd className="text-lg font-bold tabular-nums">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">
            Tarbiyachi belgilashi bilan Telegramga darhol xabar keladi.
          </p>
        </Card>
      )}
      <Card>
        <CardHeader title="Oxirgi kechalar" />
        <CardContent className="px-0 pb-2">
          <ul className="divide-y">
            {c.dorm.nights.map((n) => (
              <li
                key={n.date}
                className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
              >
                <span className="font-semibold">{n.date}</span>
                <span className="text-muted-foreground tabular-nums">
                  {n.sleep} → {n.wake}
                </span>
                <Badge variant={dormText[n.status].variant}>{dormText[n.status].label}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
