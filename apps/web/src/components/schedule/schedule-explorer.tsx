"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Select } from "@/components/ui/form";
import { t } from "@/i18n";
import { cn } from "@/lib/utils";
import {
  type Lesson,
  scheduleGrades,
  scheduleRooms,
  scheduleTeachers,
  timetable,
} from "@/mock/schedule";
import { Timetable } from "./timetable";

type Mode = "grade" | "teacher" | "room";
const options: Record<Mode, string[]> = {
  grade: scheduleGrades,
  teacher: scheduleTeachers,
  room: scheduleRooms,
};
const detail: Record<Mode, (l: Lesson) => string> = {
  grade: (l) => `${l.teacher} · ${t.schedule.room(l.room)}`,
  teacher: (l) => `${l.grade} · ${t.schedule.room(l.room)}`,
  room: (l) => `${l.grade} · ${l.teacher}`,
};

/** Dars jadvali: sinf / o'qituvchi / xona bo'yicha ko'rinish */
export function ScheduleExplorer({ initialGrade = "9-A" }: { initialGrade?: string }) {
  const [mode, setMode] = useState<Mode>("grade");
  const [value, setValue] = useState(initialGrade);
  const lessons = timetable.filter((l) =>
    mode === "grade"
      ? l.grade === value
      : mode === "teacher"
        ? l.teacher === value
        : l.room === value,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="radiogroup"
          aria-label={t.schedule.view}
          className="grid grid-cols-3 gap-1 rounded-lg border bg-card p-1 sm:w-80"
        >
          {(Object.keys(options) as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={mode === m}
              onClick={() => {
                setMode(m);
                setValue(options[m][0]);
              }}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-semibold transition-colors",
                "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
                mode === m ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
              )}
            >
              {t.schedule.by[m]}
            </button>
          ))}
        </div>
        <Select
          aria-label={t.schedule.by[mode]}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="sm:w-64"
        >
          {options[mode].map((o) => (
            <option key={o} value={o}>
              {mode === "room" ? t.schedule.room(o) : o}
            </option>
          ))}
        </Select>
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="size-3.5 text-success" aria-hidden />
        {t.schedule.noConflicts} · {t.schedule.lessonsWeek(lessons.length)}
      </p>
      <Timetable lessons={lessons} detail={detail[mode]} />
    </div>
  );
}
