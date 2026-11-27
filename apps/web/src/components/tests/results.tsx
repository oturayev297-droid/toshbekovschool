"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type Column, DataTable, MobileRow } from "@/components/ui/data-table";
import { Select } from "@/components/ui/form";
import { type ResultLevel, scoreLevel, testAttempts, topicStats } from "@/mock/tests";

const levelBadge: Record<ResultLevel, { label: string; variant: "success" | "info" | "danger" }> = {
  alo: { label: "A'lo", variant: "success" },
  yaxshi: { label: "Yaxshi", variant: "info" },
  past: { label: "Past", variant: "danger" },
};

type Attempt = (typeof testAttempts)[number];

function ScoreBadge({ score }: { score: number }) {
  const l = levelBadge[scoreLevel(score)];
  return (
    <span className="inline-flex items-center gap-2">
      <span className="font-bold tabular-nums">{score}</span>
      <Badge variant={l.variant}>{l.label}</Badge>
    </span>
  );
}

const columns: Column<Attempt>[] = [
  {
    key: "n",
    header: "O'quvchi",
    cell: (a) => (
      <Link href={`/oquvchilar/${a.studentId}`} className="font-semibold hover:text-accent">
        {a.fullName}
      </Link>
    ),
  },
  { key: "g", header: "Sinf", cell: (a) => a.grade },
  { key: "s", header: "Fan", cell: (a) => <Badge variant="accent">{a.subject}</Badge> },
  { key: "t", header: "Mavzu", hideOnMobile: true, cell: (a) => a.topic },
  {
    key: "c",
    header: "To'g'ri",
    align: "right",
    hideOnMobile: true,
    cell: (a) => `${a.correct}/${a.total}`,
  },
  { key: "m", header: "Vaqt", align: "right", hideOnMobile: true, cell: (a) => `${a.minutes} daq` },
  { key: "d", header: "Sana", hideOnMobile: true, cell: (a) => a.date },
  { key: "b", header: "Ball", cell: (a) => <ScoreBadge score={a.score} /> },
];

/** Natijalar jadvali — fan bo'yicha filtr */
export function ResultsTable() {
  const [subject, setSubject] = useState("");
  const rows = subject ? testAttempts.filter((a) => a.subject === subject) : testAttempts;
  const subjectsInData = [...new Set(testAttempts.map((a) => a.subject))].sort();
  const avg = rows.length ? Math.round(rows.reduce((s, a) => s + a.score, 0) / rows.length) : 0;

  return (
    <Card>
      <CardHeader
        title="Oxirgi natijalar"
        description={`${rows.length} ta topshiriq · o'rtacha ${avg} ball`}
        action={
          <Select
            aria-label="Fan bo'yicha filtr"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-44"
          >
            <option value="">Barcha fanlar</option>
            {subjectsInData.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        }
      />
      <CardContent className="px-0 pb-2">
        <DataTable
          columns={columns}
          rows={rows}
          mobileCard={(a) => (
            <MobileRow
              href={`/oquvchilar/${a.studentId}`}
              title={a.fullName}
              subtitle={`${a.grade} · ${a.subject} · ${a.topic}`}
              trailing={<ScoreBadge score={a.score} />}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

type StatSubject = keyof typeof topicStats;
const WEAK = 70;

/** Mavzu bo'yicha statistika: o'rtacha ball (bitta qator → bir rangli gorizontal bar, saralangan) + jadval */
export function TopicStats() {
  const [subject, setSubject] = useState<StatSubject>("English");
  const rows = [...topicStats[subject]].sort((a, b) => b.avg - a.avg);

  return (
    <Card>
      <CardHeader
        title="Mavzu bo'yicha o'rtacha ball"
        description={`${WEAK} balldan past mavzular — qo'shimcha dars va AI mentor mashqlari uchun`}
        action={
          <Select
            aria-label="Fan"
            value={subject}
            onChange={(e) => setSubject(e.target.value as StatSubject)}
            className="w-44"
          >
            {Object.keys(topicStats).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
        }
      />
      <CardContent>
        <ul className="space-y-4" aria-label={`${subject}: mavzular bo'yicha o'rtacha ball`}>
          {rows.map((r) => {
            const weak = r.avg < WEAK;
            return (
              <li
                key={r.topic}
                title={`${r.topic}: o'rtacha ${r.avg} ball, ${r.attempts} topshiriq`}
              >
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-medium">{r.topic}</span>
                    {weak && (
                      <Badge variant="danger">
                        <AlertTriangle className="size-3" aria-hidden /> Zaif
                      </Badge>
                    )}
                  </span>
                  <span className="shrink-0 font-bold tabular-nums">{r.avg}</span>
                </div>
                <div className="relative mt-1.5 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${r.avg}%` }} />
                  {/* 70 ball chegarasi */}
                  <span
                    aria-hidden
                    className="absolute -top-0.5 h-3 w-px bg-muted-foreground/60"
                    style={{ left: `${WEAK}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span aria-hidden className="inline-block h-3 w-px bg-muted-foreground/60" /> {WEAK} ball
          chegarasi
        </p>
      </CardContent>

      {/* Jadval ko'rinishi */}
      <div className="overflow-x-auto border-t">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="px-5 py-3 font-semibold">
                Mavzu
              </th>
              <th scope="col" className="hidden px-3 py-3 text-right font-semibold sm:table-cell">
                Testlar
              </th>
              <th scope="col" className="px-3 py-3 text-right font-semibold">
                Topshirdi
              </th>
              <th scope="col" className="px-5 py-3 font-semibold">
                Ko&apos;p xato qilingan
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.topic} className="border-b last:border-0">
                <td className="px-5 py-2.5 font-medium">{r.topic}</td>
                <td className="hidden px-3 py-2.5 text-right tabular-nums sm:table-cell">
                  {r.tests}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">{r.attempts}</td>
                <td className="px-5 py-2.5 text-muted-foreground">{r.hardest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
