"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Lock, SendHorizontal, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/form";
import { tashkentTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { aiProfile, mentorChat, primaryMentors } from "@/mock/ai";
import { type Student, subjects } from "@/mock/data";

type Msg = { from: "mentor" | "student"; text: string; time: string };
const DAILY_LIMIT = 40;

/**
 * O'quvchining AI mentor oynasi. Faqat tanlangan 2 ta fan mentori ochiq, qolganlari qulflangan.
 * Maket: javoblar namunaviy — 9-bosqichda har fan uchun alohida prompt bilan Claude API.
 */
export function MentorChat({ students }: { students: Student[] }) {
  const [studentId, setStudentId] = useState(students[0].id);
  const student = students.find((s) => s.id === studentId) ?? students[0];
  const unlocked = student.subjects as string[];
  const [active, setActive] = useState<string>(unlocked[0]);
  const [threads, setThreads] = useState<Record<string, Msg[]>>({});
  const [draft, setDraft] = useState("");
  const [used, setUsed] = useState(12);
  const listRef = useRef<HTMLDivElement>(null);
  const profile = useMemo(() => aiProfile(student), [student]);

  const isLocked = !unlocked.includes(active);
  const subjectInfo = profile.subjects.find((x) => x.subject === active);
  const weakTopic = subjectInfo?.topics.slice().sort((a, b) => a.percent - b.percent)[0]?.topic;

  const messages: Msg[] =
    threads[active] ??
    (student.id === "s-001" && mentorChat[active]
      ? mentorChat[active]
      : [
          {
            from: "mentor",
            time: "18:00",
            text: `Salom, ${student.fullName.split(" ")[0]}! Men ${active} mentoringizman. Bugun «${weakTopic}» mavzusini mustahkamlaymizmi?`,
          },
        ]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages.length, active]);

  const pickStudent = (id: string) => {
    const s = students.find((x) => x.id === id)!;
    setStudentId(id);
    setActive(s.subjects[0]);
    setThreads({});
  };

  const send = () => {
    const text = draft.trim();
    if (!text || used >= DAILY_LIMIT) return;
    const now = tashkentTime(new Date());
    setThreads((t) => ({
      ...t,
      [active]: [
        ...messages,
        { from: "student", text, time: now },
        {
          from: "mentor",
          time: now,
          text: "Yaxshi savol! Keling, bosqichma-bosqich ko'ramiz. (Maket: haqiqiy javob 9-bosqichda.)",
        },
      ],
    }));
    setUsed((u) => u + 1);
    setDraft("");
  };

  const MentorButton = ({ name, locked }: { name: string; locked: boolean }) => (
    <button
      type="button"
      onClick={() => setActive(name)}
      aria-current={active === name ? "true" : undefined}
      className={cn(
        "relative flex w-full shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors",
        "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none",
        active === name ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
        locked && active !== name && "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          locked ? "bg-muted" : active === name ? "bg-white/15" : "bg-accent-soft text-accent",
        )}
      >
        {locked ? (
          <Lock className="size-3.5" aria-hidden />
        ) : (
          <Bot className="size-4" aria-hidden />
        )}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium">{name}</span>
      {locked && <span className="sr-only">(qulflangan)</span>}
    </button>
  );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[17rem_minmax(0,1fr)]">
      {/* Mentorlar ro'yxati */}
      <Card className="p-3 lg:self-start">
        <label className="block px-1 pb-2 text-xs text-muted-foreground">
          Maket: o&apos;quvchi
          <Select value={studentId} onChange={(e) => pickStudent(e.target.value)} className="mt-1">
            {students.slice(0, 8).map((s) => (
              <option key={s.id} value={s.id}>
                {s.fullName} ({s.subjects.join(" + ")})
              </option>
            ))}
          </Select>
        </label>
        <p className="px-1 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase">
          Mening mentorlarim
        </p>
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible [&>*]:w-auto lg:[&>*]:w-full">
          {unlocked.map((n) => (
            <MentorButton key={n} name={n} locked={false} />
          ))}
        </div>
        <p className="px-1 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">
          Qulflangan
        </p>
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible [&>*]:w-auto lg:[&>*]:w-full">
          {subjects
            .filter((n) => !unlocked.includes(n))
            .map((n) => (
              <MentorButton key={n} name={n} locked />
            ))}
        </div>
        <p className="px-1 pt-3 pb-1 text-xs font-semibold text-muted-foreground uppercase">
          Boshlang&apos;ich · Prezident maktabi
        </p>
        <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-col lg:overflow-visible [&>*]:w-auto lg:[&>*]:w-full">
          {primaryMentors.map((n) => (
            <MentorButton key={`p-${n}`} name={`${n} (boshl.)`} locked />
          ))}
        </div>
      </Card>

      {/* Suhbat */}
      <Card className="flex min-h-[32rem] flex-col overflow-hidden lg:h-[calc(100vh-7.5rem)]">
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
            {isLocked ? <Lock className="size-4" /> : <Bot className="size-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{active} mentori</p>
            <p className="truncate text-xs text-muted-foreground">
              {isLocked ? "Qulflangan" : `Daraja: ${subjectInfo?.level} · zaif mavzu: ${weakTopic}`}
            </p>
          </div>
          {!isLocked && (
            <Badge variant={used >= DAILY_LIMIT - 5 ? "warning" : "info"} className="shrink-0">
              {used}/{DAILY_LIMIT} bugun
            </Badge>
          )}
        </div>

        {isLocked ? (
          <div className="grid flex-1 place-items-center p-6 text-center">
            <div className="max-w-sm">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
                <Lock className="size-6" aria-hidden />
              </span>
              <h2 className="mt-4 font-semibold">Bu mentor qulflangan</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {active.includes("(boshl.)")
                  ? "Boshlang'ich sinflar uchun — Prezident maktabiga tayyorlov dasturi."
                  : `Siz ${unlocked.join(" va ")} fanlarini tanlagansiz. Har o'quvchi aniq 2 ta fan mentoridan foydalanadi.`}
              </p>
              <Button variant="outline" className="mt-4" onClick={() => setActive(unlocked[0])}>
                {unlocked[0]} mentoriga qaytish
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-surface-soft/25 px-4 py-4"
            >
              <p className="mx-auto flex w-fit items-center gap-1.5 rounded-full bg-card px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
                <ShieldCheck className="size-3.5" aria-hidden /> Mentor faqat {active} mavzusida
                gaplashadi va shaxsiy ma&apos;lumot so&apos;ramaydi
              </p>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.from === "student" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-line shadow-sm",
                      m.from === "student"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-card",
                    )}
                  >
                    {m.text}
                    <span
                      className={cn(
                        "mt-0.5 block text-right text-[10px]",
                        m.from === "student" ? "opacity-70" : "text-muted-foreground",
                      )}
                    >
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto border-t px-3 pt-3 [scrollbar-width:none]">
              {[`«${weakTopic}» ni tushuntir`, "Menga 5 ta mashq ber", "Xatomni tekshir"].map(
                (q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setDraft(q)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs hover:bg-secondary"
                  >
                    <Sparkles className="size-3 text-accent" aria-hidden />
                    {q}
                  </button>
                ),
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2 p-3"
            >
              <label htmlFor="mentor-input" className="sr-only">
                Xabar
              </label>
              <textarea
                id="mentor-input"
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Savolingizni yozing…"
                className="max-h-32 min-h-11 flex-1 resize-none rounded-md border border-input bg-card px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none"
              />
              <Button
                type="submit"
                size="icon"
                className="size-11"
                aria-label="Yuborish"
                disabled={!draft.trim()}
              >
                <SendHorizontal className="size-5" />
              </Button>
            </form>
          </>
        )}
      </Card>
    </div>
  );
}
