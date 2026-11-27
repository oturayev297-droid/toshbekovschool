"use client";

import { useState } from "react";
import { CheckCircle2, Circle, GripVertical, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { type Subject, subjects } from "@/mock/data";
import { topicsBySubject } from "@/mock/tests";

type QType = "single" | "short";
type Question = {
  id: number;
  text: string;
  type: QType;
  options: string[];
  correct: number;
  answer: string;
};

const typeLabel: Record<QType, string> = { single: "Bir javobli", short: "Qisqa javob" };

let nextId = 3;
const blank = (): Question => ({
  id: nextId++,
  text: "",
  type: "single",
  options: ["", "", "", ""],
  correct: 0,
  answer: "",
});

const initialQuestions: Question[] = [
  {
    id: 1,
    text: "She ___ in London since 2019.",
    type: "single",
    options: ["lives", "has lived", "is living", "lived"],
    correct: 1,
    answer: "",
  },
  {
    id: 2,
    text: "“I have finished my homework” gapida qaysi zamon ishlatilgan?",
    type: "short",
    options: ["", "", "", ""],
    correct: 0,
    answer: "Present Perfect",
  },
];

function Step({ n, title, done }: { n: number; title: string; done: boolean }) {
  return (
    <p className="flex items-center gap-2 text-sm font-semibold">
      <span
        className={cn(
          "grid size-6 place-items-center rounded-full text-xs",
          done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        {n}
      </span>
      {title}
    </p>
  );
}

/** O'qituvchi uchun test yaratish: fan → mavzu → sozlamalar → savollar. Maket — saqlash yo'q. */
export function TestBuilder() {
  const [subject, setSubject] = useState<Subject>("English");
  const [topic, setTopic] = useState(topicsBySubject.English[0]);
  const [minutes, setMinutes] = useState("25");
  const [questions, setQuestions] = useState(initialQuestions);

  const patch = (id: number, p: Partial<Question>) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...p } : q)));

  const ready = questions.length > 0 && questions.every((q) => q.text.trim());

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
      {/* 1–3: fan, mavzu, sozlamalar */}
      <Card className="space-y-5 p-4 sm:p-5 xl:sticky xl:top-[4.5rem] xl:self-start">
        <div className="space-y-2">
          <Step n={1} title="Fan" done />
          <Select
            aria-label="Fan"
            value={subject}
            onChange={(e) => {
              const s = e.target.value as Subject;
              setSubject(s);
              setTopic(topicsBySubject[s][0]);
            }}
          >
            {subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        </div>
        <div className="space-y-2">
          <Step n={2} title="Mavzu" done={!!topic} />
          <Select aria-label="Mavzu" value={topic} onChange={(e) => setTopic(e.target.value)}>
            {topicsBySubject[subject].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Button variant="ghost" size="sm" className="px-0 text-accent hover:bg-transparent">
            <Plus /> Yangi mavzu qo&apos;shish
          </Button>
        </div>
        <div className="space-y-3">
          <Step n={3} title="Sozlamalar" done />
          <div>
            <Label htmlFor="t-title">Test nomi</Label>
            <Input
              id="t-title"
              className="mt-1"
              defaultValue={`${topic} — haftalik test`}
              key={topic}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="t-min">Vaqt (daqiqa)</Label>
              <Input
                id="t-min"
                type="number"
                min={5}
                className="mt-1"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="t-group">Guruh</Label>
              <Select id="t-group" className="mt-1" defaultValue="9-A">
                <option>9-A</option>
                <option>9-B</option>
                <option>10-A</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-secondary p-3 text-sm">
          <p className="font-semibold">
            {questions.length} ta savol · {minutes || 0} daqiqa
          </p>
          <p className="text-xs text-muted-foreground">
            Natija avtomatik baholanadi va o&apos;quvchi, ota-ona hamda direktorga ko&apos;rinadi.
          </p>
        </div>
      </Card>

      {/* 4: savollar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Step n={4} title="Savollar" done={ready} />
          <Badge variant="accent">
            {subject} · {topic}
          </Badge>
        </div>

        {questions.map((q, qi) => (
          <Card key={q.id} className="p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <GripVertical className="size-4 text-muted-foreground" aria-hidden />
              <p className="text-sm font-semibold">{qi + 1}-savol</p>
              <Select
                aria-label={`${qi + 1}-savol turi`}
                value={q.type}
                onChange={(e) => patch(q.id, { type: e.target.value as QType })}
                className="ml-auto w-40"
              >
                {Object.entries(typeLabel).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </Select>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${qi + 1}-savolni o'chirish`}
                onClick={() => setQuestions((qs) => qs.filter((x) => x.id !== q.id))}
              >
                <Trash2 />
              </Button>
            </div>

            <Label htmlFor={`q-${q.id}`} className="sr-only">
              Savol matni
            </Label>
            <textarea
              id={`q-${q.id}`}
              value={q.text}
              onChange={(e) => patch(q.id, { text: e.target.value })}
              placeholder="Savol matnini kiriting…"
              rows={2}
              className="mt-3 w-full resize-y rounded-md border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none"
            />

            {q.type === "single" ? (
              <fieldset className="mt-3">
                <legend className="text-xs font-semibold text-muted-foreground">
                  Variantlar — to&apos;g&apos;ri javobni belgilang
                </legend>
                <div role="radiogroup" className="mt-2 grid gap-2 sm:grid-cols-2">
                  {q.options.map((opt, oi) => {
                    const isCorrect = q.correct === oi;
                    return (
                      <div
                        key={oi}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-2",
                          isCorrect && "border-success bg-success-soft/50",
                        )}
                      >
                        <button
                          type="button"
                          role="radio"
                          aria-checked={isCorrect}
                          aria-label={`${String.fromCharCode(65 + oi)} variantini to'g'ri deb belgilash`}
                          onClick={() => patch(q.id, { correct: oi })}
                          className="grid size-8 shrink-0 place-items-center rounded-full focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="size-5 text-success" />
                          ) : (
                            <Circle className="size-5 text-muted-foreground" />
                          )}
                        </button>
                        <span className="text-sm font-semibold text-muted-foreground">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <input
                          value={opt}
                          aria-label={`${String.fromCharCode(65 + oi)} variant`}
                          onChange={(e) =>
                            patch(q.id, {
                              options: q.options.map((o, i) => (i === oi ? e.target.value : o)),
                            })
                          }
                          placeholder="Variant"
                          className="h-10 min-w-0 flex-1 bg-transparent text-sm focus-visible:outline-none"
                        />
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ) : (
              <div className="mt-3">
                <Label htmlFor={`a-${q.id}`}>To&apos;g&apos;ri javob</Label>
                <Input
                  id={`a-${q.id}`}
                  className="mt-1"
                  value={q.answer}
                  onChange={(e) => patch(q.id, { answer: e.target.value })}
                  placeholder="Kutilgan javob"
                />
              </div>
            )}
          </Card>
        ))}

        <Button
          variant="outline"
          className="h-12 w-full border-dashed"
          onClick={() => setQuestions((qs) => [...qs, blank()])}
        >
          <Plus /> Savol qo&apos;shish
        </Button>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" size="lg">
            Qoralamani saqlash
          </Button>
          <Button size="lg" disabled={!ready}>
            E&apos;lon qilish
          </Button>
        </div>
      </div>
    </div>
  );
}
