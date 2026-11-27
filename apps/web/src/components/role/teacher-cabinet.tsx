"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, ClipboardCheck, Home, NotebookPen, Plus, Users, Wallet } from "lucide-react";
import { SalaryHistory } from "@/components/people/salary-history";
import { Timetable } from "@/components/schedule/timetable";
import { TestBuilder } from "@/components/tests/test-builder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { Select } from "@/components/ui/form";
import { t } from "@/i18n";
import { formatSom, initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { salaryBadge, teachers } from "@/mock/people";
import { groupStudents, lessonTimes, timetable } from "@/mock/schedule";
import { testAttempts } from "@/mock/tests";
import { CabinetShell } from "./cabinet-shell";

const me = teachers[0]; // Nilufar Hasanova, English
const myLessons = timetable.filter((l) => l.teacher === me.fullName);

type Mark = "present" | "absent" | "late";
const markStyle: Record<Mark, string> = {
  present: "border-success bg-success text-white",
  absent: "border-destructive bg-destructive text-white",
  late: "border-warning bg-warning text-white",
};

/** Qisqa javobli savollar — o'qituvchi qo'lda baholaydi (mock) */
const toGrade = [
  {
    id: "g1",
    student: "Aziza Karimova",
    question: "Qaysi zamon: «I have finished…»?",
    answer: "Present Perfect",
  },
  {
    id: "g2",
    student: "Sardor Toshmatov",
    question: "Qaysi zamon: «I have finished…»?",
    answer: "Past Simple",
  },
  {
    id: "g3",
    student: "Diyora Nazarova",
    question: "«since» va «for» farqi?",
    answer: "since — boshlanish, for — davomiylik",
  },
];

function useTodayIdx() {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => {
    const w = new Date(Date.now() + 5 * 3600 * 1000).getUTCDay();
    setD(w === 0 ? 0 : w - 1);
  }, []);
  return d;
}

export function TeacherCabinet() {
  const today = useTodayIdx();
  const todays = myLessons.filter((l) => l.day === today).sort((a, b) => a.lesson - b.lesson);
  const pendingCount = toGrade.length;
  const [group, setGroup] = useState(me.groups[0]);
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [saved, setSaved] = useState<string | null>(null);
  const [graded, setGraded] = useState<Record<string, boolean>>({});
  const [builder, setBuilder] = useState(false);

  const roster = useMemo(() => groupStudents(group, me.subject), [group]);
  const myResults = testAttempts.filter((a) => a.subject === me.subject);

  const nav = [
    { key: "home" as const, label: t.cabinet.teacherNav.home, icon: Home },
    { key: "groups" as const, label: t.cabinet.teacherNav.groups, icon: Users },
    { key: "attendance" as const, label: t.cabinet.teacherNav.attendance, icon: ClipboardCheck },
    { key: "tests" as const, label: t.cabinet.teacherNav.tests, icon: NotebookPen },
    { key: "schedule" as const, label: t.cabinet.teacherNav.schedule, icon: CalendarDays },
  ];

  return (
    <CabinetShell role={t.cabinet.roles.teacher(me.fullName)} nav={nav}>
      {(active, go) => (
        <>
          {active === "home" && (
            <div className="space-y-4">
              <h1 className="text-xl font-bold text-primary">
                {me.fullName} · {me.subject}
              </h1>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  [t.cabinet.myGroups, String(me.groups.length)],
                  ["O'quvchilar", String(me.studentsCount)],
                  [t.cabinet.todayLessons, String(todays.length)],
                  [t.cabinet.toGrade, String(pendingCount - Object.keys(graded).length)],
                ].map(([l, v]) => (
                  <Card key={l} className="p-4">
                    <p className="text-xs text-muted-foreground">{l}</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">{v}</p>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader title={t.cabinet.todayLessons} />
                <CardContent className="px-0 pb-2">
                  {todays.length ? (
                    <ul className="divide-y">
                      {todays.map((l) => {
                        const lt = lessonTimes.find((x) => x.n === l.lesson)!;
                        return (
                          <li
                            key={l.id}
                            className="flex items-center justify-between gap-3 px-5 py-3"
                          >
                            <div className="min-w-0">
                              <p className="text-sm font-semibold">
                                {t.schedule.lesson(l.lesson)} · {l.grade}
                              </p>
                              <p className="text-xs text-muted-foreground tabular-nums">
                                {lt.start}–{lt.end} · {t.schedule.room(l.room)}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setGroup(l.grade);
                                setSaved(null);
                                go("attendance");
                              }}
                            >
                              <ClipboardCheck /> {t.cabinet.markAttendance}
                            </Button>
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
              <Card className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <Wallet className="size-4 text-accent" aria-hidden /> {t.cabinet.mySalary} ·
                      Noyabr
                    </p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">{formatSom(me.salary)}</p>
                  </div>
                  <Badge variant={salaryBadge[me.salaryStatus].variant}>
                    {salaryBadge[me.salaryStatus].label}
                  </Badge>
                </div>
              </Card>
              <SalaryHistory
                rows={[
                  {
                    month: "Oktabr 2026",
                    amount: me.salary,
                    paidOn: "To'landi: 31.10.2026",
                    done: true,
                  },
                  {
                    month: "Sentabr 2026",
                    amount: me.salary,
                    paidOn: "To'landi: 30.09.2026",
                    done: true,
                  },
                ]}
              />
            </div>
          )}

          {active === "groups" && (
            <div className="grid gap-4 md:grid-cols-3">
              {me.groups.map((g) => {
                const st = groupStudents(g, me.subject);
                const lessons = myLessons.filter((l) => l.grade === g).length;
                return (
                  <Card key={g} className="p-4">
                    <p className="text-lg font-bold">{g}</p>
                    <p className="text-xs text-muted-foreground">
                      {me.subject} · {t.schedule.lessonsWeek(lessons)}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {st.length ? (
                        st.map((s) => (
                          <li key={s.id} className="flex items-center gap-2.5 text-sm">
                            <span className="grid size-7 place-items-center rounded-full bg-surface-soft text-[11px] font-bold text-primary">
                              {initials(s.fullName)}
                            </span>
                            <Link
                              href={`/oquvchilar/${s.id}`}
                              className="min-w-0 flex-1 truncate hover:text-accent"
                            >
                              {s.fullName}
                            </Link>
                            <span className="text-xs font-semibold tabular-nums">{s.avgScore}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">—</li>
                      )}
                    </ul>
                  </Card>
                );
              })}
            </div>
          )}

          {active === "attendance" && (
            <Card>
              <CardHeader
                title={t.cabinet.markAttendance}
                description={`${me.subject} · ${group}`}
                action={
                  <Select
                    aria-label={t.cabinet.myGroups}
                    value={group}
                    onChange={(e) => {
                      setGroup(e.target.value);
                      setSaved(null);
                    }}
                    className="w-32"
                  >
                    {me.groups.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </Select>
                }
              />
              <CardContent>
                {roster.length ? (
                  <>
                    <ul className="divide-y">
                      {roster.map((s) => {
                        const m = marks[s.id] ?? "present";
                        return (
                          <li
                            key={s.id}
                            className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                          >
                            <p className="text-sm font-semibold">{s.fullName}</p>
                            <div
                              role="radiogroup"
                              aria-label={s.fullName}
                              className="grid grid-cols-3 gap-1.5 sm:w-80"
                            >
                              {(["present", "late", "absent"] as Mark[]).map((k) => (
                                <button
                                  key={k}
                                  type="button"
                                  role="radio"
                                  aria-checked={m === k}
                                  onClick={() => {
                                    setMarks((x) => ({ ...x, [s.id]: k }));
                                    setSaved(null);
                                  }}
                                  className={cn(
                                    "h-10 rounded-md border text-sm font-medium transition-colors",
                                    "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                                    m === k ? markStyle[k] : "bg-card hover:bg-secondary",
                                  )}
                                >
                                  {t.cabinet.attendance[k]}
                                </button>
                              ))}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                      <p className="text-sm text-success" role="status">
                        {saved}
                      </p>
                      <Button
                        size="lg"
                        onClick={() =>
                          setSaved(
                            t.cabinet.attendanceSaved(
                              roster.filter((s) => (marks[s.id] ?? "present") !== "absent").length,
                              roster.length,
                            ),
                          )
                        }
                      >
                        {t.cabinet.saveAttendance}
                      </Button>
                    </div>
                  </>
                ) : (
                  <EmptyState
                    icon={Users}
                    title={`${group}: ${me.subject} o'quvchilari yo'q (maket)`}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {active === "tests" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-base font-semibold">{t.cabinet.myTests}</h1>
                <Button
                  onClick={() => setBuilder((b) => !b)}
                  variant={builder ? "outline" : "default"}
                >
                  <Plus /> {t.cabinet.newTest}
                </Button>
              </div>
              {builder && <TestBuilder />}
              <Card>
                <CardHeader title={t.cabinet.toGrade} description="Qisqa javobli savollar" />
                <CardContent className="px-0 pb-2">
                  <ul className="divide-y">
                    {toGrade.map((g) => (
                      <li
                        key={g.id}
                        className="flex flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold">{g.student}</p>
                          <p className="text-xs text-muted-foreground">{g.question}</p>
                          <p className="mt-1 text-sm">«{g.answer}»</p>
                        </div>
                        <div className="grid shrink-0 grid-cols-2 gap-1.5 sm:w-56">
                          {([true, false] as const).map((v) => (
                            <button
                              key={String(v)}
                              type="button"
                              aria-pressed={graded[g.id] === v}
                              onClick={() => setGraded((x) => ({ ...x, [g.id]: v }))}
                              className={cn(
                                "h-10 rounded-md border text-sm font-medium",
                                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                                graded[g.id] === v
                                  ? v
                                    ? markStyle.present
                                    : markStyle.absent
                                  : "bg-card hover:bg-secondary",
                              )}
                            >
                              {v ? t.cabinet.correct : t.cabinet.wrong}
                            </button>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader
                  title={t.cabinet.results}
                  description={`${me.subject} · ${myResults.length} ta topshiriq`}
                />
                <CardContent className="px-0 pb-2">
                  <ul className="divide-y">
                    {myResults.map((a) => (
                      <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{a.fullName}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {a.grade} · {a.topic} · {a.date}
                          </p>
                        </div>
                        <span className="font-bold tabular-nums">{a.score}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {active === "schedule" && (
            <Timetable
              lessons={myLessons}
              detail={(l) => `${l.grade} · ${t.schedule.room(l.room)}`}
            />
          )}
        </>
      )}
    </CabinetShell>
  );
}
