"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bot,
  CalendarDays,
  Check,
  Home,
  ListChecks,
  NotebookPen,
  Play,
  UtensilsCrossed,
} from "lucide-react";
import { ScoreChart } from "@/components/charts/charts";
import { WeekMenuView } from "@/components/kitchen/week-menu";
import { Timetable } from "@/components/schedule/timetable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { t } from "@/i18n";
import { tashkentISODate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { aiProfile } from "@/mock/ai";
import { students, testList, testResults } from "@/mock/data";
import { currentWeek, meals } from "@/mock/kitchen";
import { lessonTimes, timetable } from "@/mock/schedule";
import { CabinetShell } from "./cabinet-shell";

const me = students.find((s) => s.id === "s-001")!; // Aziza Karimova, 9-A, English + IT
const profile = aiProfile(me);
// O'quvchi faqat o'zining 2 ta fani darslarini ko'radi
const myLessons = timetable.filter(
  (l) => l.grade === me.grade && (me.subjects as string[]).includes(l.subject),
);

export function StudentCabinet() {
  const [todayIso, setTodayIso] = useState<string>();
  const [dayIdx, setDayIdx] = useState<number | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({ Du: true });
  useEffect(() => {
    setTodayIso(tashkentISODate(new Date()));
    const w = new Date(Date.now() + 5 * 3600 * 1000).getUTCDay();
    setDayIdx(w === 0 ? null : w - 1);
  }, []);
  const todays = myLessons.filter((l) => l.day === dayIdx).sort((a, b) => a.lesson - b.lesson);
  const menuToday = currentWeek.days.find((d) => d.date === todayIso);
  const upcoming = [
    {
      id: "u1",
      title: `${profile.adaptiveTest.topic} — moslashgan test`,
      meta: `${profile.adaptiveTest.subject} · ${profile.adaptiveTest.minutes} daq · AI tavsiyasi`,
    },
    {
      id: "u2",
      title: "Present Perfect — haftalik test",
      meta: "English · 25 daq · muddat: 29.11",
    },
  ];

  const nav = [
    { key: "home" as const, label: t.cabinet.studentNav.home, icon: Home },
    { key: "tests" as const, label: t.cabinet.studentNav.tests, icon: NotebookPen },
    { key: "plan" as const, label: t.cabinet.studentNav.plan, icon: ListChecks },
    { key: "schedule" as const, label: t.cabinet.studentNav.schedule, icon: CalendarDays },
    { key: "menu" as const, label: t.cabinet.studentNav.menu, icon: UtensilsCrossed },
  ];

  return (
    <CabinetShell role={t.cabinet.roles.student(me.fullName)} nav={nav}>
      {(active, go) => (
        <>
          {active === "home" && (
            <div className="space-y-4">
              <h1 className="text-xl font-bold text-primary">
                {me.fullName.split(" ")[0]} · {me.grade} sinf
              </h1>

              <section aria-label={t.cabinet.mySubjects} className="grid gap-3 sm:grid-cols-2">
                {profile.subjects.map((x) => (
                  <Card key={x.subject} className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
                        <Bot className="size-5" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{x.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          Daraja: {x.level} · o&apos;rtacha {x.avg}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full" asChild>
                      <Link href="/mentor">
                        <Bot /> {x.subject} — {t.cabinet.openMentor}
                      </Link>
                    </Button>
                  </Card>
                ))}
              </section>

              <Card>
                <CardHeader title={t.cabinet.todayLessons} />
                <CardContent className="px-0 pb-2">
                  {todays.length ? (
                    <ul className="divide-y">
                      {todays.map((l) => {
                        const lt = lessonTimes.find((x) => x.n === l.lesson)!;
                        return (
                          <li key={l.id} className="flex items-center gap-3 px-5 py-3">
                            <span className="w-14 shrink-0 text-xs font-semibold tabular-nums">
                              {lt.start}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold">{l.subject}</p>
                              <p className="text-xs text-muted-foreground">
                                {l.teacher} · {t.schedule.room(l.room)}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="px-5 pb-4 text-sm text-muted-foreground">
                      {t.cabinet.noLessonsToday}
                    </p>
                  )}
                </CardContent>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                <Card className="p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <NotebookPen className="size-4 text-accent" aria-hidden />{" "}
                    {t.cabinet.upcomingTests}
                  </p>
                  <p className="mt-2 text-sm">{upcoming[0].title}</p>
                  <p className="text-xs text-muted-foreground">{upcoming[0].meta}</p>
                  <Button size="sm" className="mt-3" onClick={() => go("tests")}>
                    <Play /> {t.cabinet.start}
                  </Button>
                </Card>
                <Card className="p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <UtensilsCrossed className="size-4 text-accent" aria-hidden />{" "}
                    {t.cabinet.menuToday}
                  </p>
                  {menuToday ? (
                    <dl className="mt-2 grid grid-cols-[4.5rem_1fr] gap-x-2 gap-y-0.5 text-sm">
                      {meals.map((m) => (
                        <div key={m.key} className="contents">
                          <dt className="text-muted-foreground">{m.label}</dt>
                          <dd className="truncate">{menuToday[m.key]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <Button variant="link" className="px-0" onClick={() => go("menu")}>
                      Haftalik menyu
                    </Button>
                  )}
                </Card>
              </div>
            </div>
          )}

          {active === "tests" && (
            <div className="space-y-4">
              <Card>
                <CardHeader title={t.cabinet.upcomingTests} />
                <CardContent className="px-0 pb-2">
                  <ul className="divide-y">
                    {upcoming.map((u) => (
                      <li key={u.id} className="flex items-center justify-between gap-3 px-5 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{u.title}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.meta}</p>
                        </div>
                        <Button size="sm">
                          <Play /> {t.cabinet.start}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader title={t.cabinet.results} description="Oxirgi 4 hafta" />
                <CardContent className="pt-3">
                  <ScoreChart data={testResults} keys={[...me.subjects]} />
                  <ul className="mt-4 divide-y border-t">
                    {testList.map((x) => (
                      <li key={x.id} className="flex items-center justify-between gap-3 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{x.topic}</p>
                          <p className="text-xs text-muted-foreground">
                            {x.subject} · {x.date}
                          </p>
                        </div>
                        <Badge
                          variant={x.score >= 85 ? "success" : x.score >= 70 ? "info" : "warning"}
                        >
                          {x.score}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {active === "plan" && (
            <Card>
              <CardHeader title={t.cabinet.plan} description="AI tuzgan, zaif mavzularga moslab" />
              <CardContent>
                <ul className="space-y-2">
                  {profile.plan.map((d) => (
                    <li key={d.day}>
                      <button
                        type="button"
                        aria-pressed={!!done[d.day]}
                        onClick={() => setDone((x) => ({ ...x, [d.day]: !x[d.day] }))}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors",
                          "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                          done[d.day] ? "bg-success-soft/40" : "hover:bg-secondary",
                        )}
                      >
                        <span
                          className={cn(
                            "grid size-7 shrink-0 place-items-center rounded-full border-2",
                            done[d.day] ? "border-success bg-success text-white" : "border-input",
                          )}
                        >
                          {done[d.day] && <Check className="size-4" aria-hidden />}
                        </span>
                        <span className="w-7 shrink-0 text-xs font-bold">{d.day}</span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cn(
                              "block text-sm font-semibold",
                              done[d.day] && "line-through opacity-70",
                            )}
                          >
                            {d.task}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {d.subject} · {d.topic} · {d.minutes} daq
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {active === "schedule" && (
            <Timetable
              lessons={myLessons}
              detail={(l) => `${l.teacher} · ${t.schedule.room(l.room)}`}
            />
          )}

          {active === "menu" && <WeekMenuView week={currentWeek} />}
        </>
      )}
    </CabinetShell>
  );
}
