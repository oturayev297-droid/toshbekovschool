"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  Home,
  Star,
} from "lucide-react";
import { AiCenter } from "@/components/ai/ai-center";
import { ScheduleExplorer } from "@/components/schedule/schedule-explorer";
import { TopicStats } from "@/components/tests/results";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import { dashboard, students } from "@/mock/data";
import { teachers } from "@/mock/people";
import { attendanceByGrade, timetable } from "@/mock/schedule";
import { testsSummary } from "@/mock/tests";
import { CabinetShell } from "./cabinet-shell";

const ZAVUCH = "Dilfuza Rahmonova";

/** O'qituvchilar sifati: jadvaldan haftalik darslar + mock ko'rsatkichlar */
const quality = teachers.map((tc, i) => ({
  name: tc.fullName,
  subject: tc.subject,
  rating: tc.rating,
  lessons: timetable.filter((l) => l.teacher === tc.fullName).length,
  attendanceMarked: [100, 96, 98, 92, 88, 100, 95, 97][i % 8],
  groupAvg: [82, 71, 78, 80, 69, 77, 74, 76][i % 8],
}));

const byGrade = [...new Set(students.map((s) => s.grade))]
  .map((g) => {
    const list = students.filter((s) => s.grade === g);
    return {
      grade: g,
      count: list.length,
      avg: Math.round(list.reduce((a, s) => a + s.avgScore, 0) / list.length),
    };
  })
  .sort((a, b) => parseInt(a.grade) - parseInt(b.grade) || a.grade.localeCompare(b.grade));
const atRisk = students.filter((s) => s.avgScore < 65).sort((a, b) => a.avgScore - b.avgScore);

function Bar({ value, warn }: { value: number; warn: boolean }) {
  return (
    <div className="h-2 rounded-full bg-muted">
      <div
        className={cn("h-2 rounded-full", warn ? "bg-warning" : "bg-primary")}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export function ZavuchCabinet() {
  const [academicTab, setAcademicTab] = useState<"classes" | "tests" | "ai">("classes");
  const lowAttendance = attendanceByGrade.filter((a) => a.percent < 92);

  const nav = [
    { key: "home" as const, label: t.cabinet.zavuchNav.home, icon: Home },
    { key: "schedule" as const, label: t.cabinet.zavuchNav.schedule, icon: CalendarDays },
    { key: "attendance" as const, label: t.cabinet.zavuchNav.attendance, icon: ClipboardCheck },
    { key: "quality" as const, label: t.cabinet.zavuchNav.quality, icon: Star },
    { key: "academic" as const, label: t.cabinet.zavuchNav.academic, icon: GraduationCap },
  ];

  return (
    <CabinetShell role={t.cabinet.roles.zavuch(ZAVUCH)} nav={nav}>
      {(active, go) => (
        <>
          {active === "home" && (
            <div className="space-y-4">
              <h1 className="text-xl font-bold text-primary">O&apos;quv ishlari</h1>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  ["Bugungi davomat", `${String(dashboard.attendanceToday).replace(".", ",")}%`],
                  ["Haftalik darslar", String(timetable.length)],
                  ["O'rtacha test bali", String(testsSummary.avgScore)],
                  [t.cabinet.atRisk, String(atRisk.length)],
                ].map(([l, v]) => (
                  <Card key={l} className="p-4">
                    <p className="text-xs text-muted-foreground">{l}</p>
                    <p className="mt-1 text-2xl font-bold tabular-nums">{v}</p>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                  <CardHeader
                    title={t.cabinet.attendanceControl}
                    description="Davomati 92% dan past sinflar"
                  />
                  <CardContent>
                    <ul className="space-y-3">
                      {lowAttendance.map((a) => (
                        <li key={a.grade}>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold">{a.grade}</span>
                            <span className="tabular-nums">{a.percent}%</span>
                          </div>
                          <div className="mt-1.5">
                            <Bar value={a.percent} warn />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => go("attendance")}
                      className="mt-4 text-sm font-medium text-accent hover:underline"
                    >
                      Barcha sinflar →
                    </button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title={t.cabinet.atRisk} description="Akademik yordam kerak" />
                  <CardContent className="px-0 pb-2">
                    <ul className="divide-y">
                      {atRisk.slice(0, 5).map((s) => (
                        <li
                          key={s.id}
                          className="flex items-center justify-between gap-3 px-5 py-2.5"
                        >
                          <Link
                            href={`/oquvchilar/${s.id}`}
                            className="min-w-0 truncate text-sm font-semibold hover:text-accent"
                          >
                            {s.fullName}
                          </Link>
                          <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                            {s.grade} · {s.subjects.join(" + ")}
                            <Badge variant="warning">{s.avgScore}</Badge>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {active === "schedule" && <ScheduleExplorer />}

          {active === "attendance" && (
            <Card>
              <CardHeader
                title={t.cabinet.attendanceControl}
                description="Bugun, sinflar bo'yicha · 1-dars davomati yotoqxonaga ham o'tadi"
              />
              <CardContent className="px-0 pb-2">
                <ul className="divide-y">
                  {attendanceByGrade.map((a) => (
                    <li
                      key={a.grade}
                      className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 px-5 py-3"
                    >
                      <span className="font-semibold">{a.grade}</span>
                      <Bar value={a.percent} warn={a.percent < 92} />
                      <span className="text-right text-sm tabular-nums">
                        {a.percent}%
                        <span className="block text-xs text-muted-foreground">
                          {a.late ? `${a.late} kechikdi` : "—"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {active === "quality" && (
            <Card>
              <CardHeader
                title={t.cabinet.teacherQuality}
                description="Reyting, haftalik darslar, davomat belgilash va guruh natijalari"
              />
              <CardContent className="px-0 pb-2">
                <ul className="divide-y">
                  {quality.map((q) => (
                    <li
                      key={q.name}
                      className="grid gap-2 px-5 py-3 sm:grid-cols-[1fr_repeat(4,6rem)] sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{q.name}</p>
                        <p className="text-xs text-muted-foreground">{q.subject}</p>
                      </div>
                      {[
                        ["Reyting", `★ ${q.rating}`, false],
                        ["Darslar", String(q.lessons), false],
                        ["Davomat", `${q.attendanceMarked}%`, q.attendanceMarked < 92],
                        ["Guruh o'rt.", String(q.groupAvg), q.groupAvg < 72],
                      ].map(([l, v, warn]) => (
                        <div
                          key={l as string}
                          className="flex items-baseline justify-between gap-2 sm:block sm:text-right"
                        >
                          <span className="text-xs text-muted-foreground sm:block">{l}</span>
                          <span
                            className={cn("text-sm font-bold tabular-nums", warn && "text-warning")}
                          >
                            {warn && (
                              <AlertTriangle
                                className="mr-1 inline size-3.5"
                                aria-label="e'tibor"
                              />
                            )}
                            {v}
                          </span>
                        </div>
                      ))}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {active === "academic" && (
            <div className="space-y-4">
              <div
                role="tablist"
                aria-label={t.cabinet.academic}
                className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]"
              >
                {(
                  [
                    ["classes", t.cabinet.academic],
                    ["tests", t.cabinet.testsControl],
                    ["ai", t.cabinet.aiNoIq],
                  ] as const
                ).map(([k, l]) => (
                  <button
                    key={k}
                    role="tab"
                    aria-selected={academicTab === k}
                    onClick={() => setAcademicTab(k)}
                    className={cn(
                      "relative h-9 shrink-0 rounded-full border px-3 text-sm font-medium",
                      "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                      academicTab === k
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-secondary",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {academicTab === "classes" && (
                <Card>
                  <CardHeader
                    title={t.cabinet.academic}
                    description="Sinflar bo'yicha o'rtacha ball"
                  />
                  <CardContent>
                    <ul className="space-y-3">
                      {byGrade.map((g) => (
                        <li key={g.grade}>
                          <div className="flex justify-between text-sm">
                            <span className="font-semibold">
                              {g.grade}{" "}
                              <span className="text-xs font-normal text-muted-foreground">
                                · {g.count} o&apos;quvchi
                              </span>
                            </span>
                            <span className="font-bold tabular-nums">{g.avg}</span>
                          </div>
                          <div className="mt-1.5">
                            <Bar value={g.avg} warn={g.avg < 70} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
              {academicTab === "tests" && <TopicStats />}
              {academicTab === "ai" && <AiCenter students={students} hideIq />}
            </div>
          )}
        </>
      )}
    </CabinetShell>
  );
}
