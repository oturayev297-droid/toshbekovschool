"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Column, DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput, Select } from "@/components/ui/form";
import { formatSom, initials } from "@/lib/format";
import { dormBadge, paymentBadge } from "@/lib/status";
import { type PaymentStatus, type Student, subjects } from "@/mock/data";
import { StudentMobileRow } from "./student-mobile-row";

const columns: Column<Student>[] = [
  {
    key: "name",
    header: "O'quvchi",
    cell: (s) => (
      <Link
        href={`/oquvchilar/${s.id}`}
        className="flex items-center gap-3 font-semibold hover:text-accent"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-soft text-xs font-bold text-primary">
          {initials(s.fullName)}
        </span>
        {s.fullName}
      </Link>
    ),
  },
  { key: "grade", header: "Sinf", cell: (s) => s.grade },
  {
    key: "subjects",
    header: "Fanlar",
    hideOnMobile: true,
    cell: (s) => (
      <div className="flex gap-1.5">
        {s.subjects.map((sub) => (
          <Badge key={sub} variant="accent">
            {sub}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    key: "dorm",
    header: "Yotoqxona",
    hideOnMobile: true,
    cell: (s) =>
      s.dorm ? (
        <Badge variant={dormBadge[s.lastNight].variant}>{dormBadge[s.lastNight].label}</Badge>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "fee",
    header: "Oylik",
    align: "right",
    hideOnMobile: true,
    cell: (s) => formatSom(s.monthlyFee),
  },
  {
    key: "pay",
    header: "To'lov",
    cell: (s) => (
      <Badge variant={paymentBadge[s.paymentStatus].variant}>
        {paymentBadge[s.paymentStatus].label}
      </Badge>
    ),
  },
];

export function StudentsExplorer({ students, grades }: { students: Student[]; grades: string[] }) {
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [pay, setPay] = useState<"" | PaymentStatus>("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return students.filter(
      (s) =>
        (!needle ||
          s.fullName.toLowerCase().includes(needle) ||
          s.parent.fullName.toLowerCase().includes(needle)) &&
        (!grade || s.grade === grade) &&
        (!subject || (s.subjects as string[]).includes(subject)) &&
        (!pay || s.paymentStatus === pay),
    );
  }, [students, q, grade, subject, pay]);

  const hasFilter = q || grade || subject || pay;
  const reset = () => {
    setQ("");
    setGrade("");
    setSubject("");
    setPay("");
  };

  return (
    <Card>
      <div className="grid gap-3 border-b p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-[1fr_repeat(3,minmax(0,180px))]">
        <SearchInput
          label="O'quvchi yoki ota-ona ismi bo'yicha qidirish"
          placeholder="Ism yoki ota-ona ismi…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="sm:col-span-2 lg:col-span-1"
        />
        <Select aria-label="Sinf" value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">Barcha sinflar</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g} sinf
            </option>
          ))}
        </Select>
        <Select aria-label="Fan" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Barcha fanlar</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
        <Select
          aria-label="To'lov holati"
          value={pay}
          onChange={(e) => setPay(e.target.value as "" | PaymentStatus)}
          className="sm:col-span-2 lg:col-span-1"
        >
          <option value="">Barcha to&apos;lovlar</option>
          <option value="tolangan">To&apos;langan</option>
          <option value="qisman">Qisman</option>
          <option value="qarz">Qarzdor</option>
        </Select>
      </div>

      <div className="flex items-center justify-between px-5 py-3 text-sm">
        <p className="text-muted-foreground" aria-live="polite">
          <span className="font-semibold text-foreground">{filtered.length}</span> ta o&apos;quvchi
          {hasFilter ? ` (jami ${students.length})` : ""}
        </p>
        {hasFilter && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Filtrlarni tozalash
          </Button>
        )}
      </div>

      <div className="pb-2">
        <DataTable
          columns={columns}
          rows={filtered}
          mobileCard={(s) => <StudentMobileRow student={s} />}
          empty={
            <div className="px-5 pb-5">
              <EmptyState
                icon={SearchX}
                title="Hech narsa topilmadi"
                description="Qidiruv so'zini yoki filtrlarni o'zgartirib ko'ring."
                action={
                  <Button variant="outline" onClick={reset}>
                    Filtrlarni tozalash
                  </Button>
                }
              />
            </div>
          }
        />
      </div>
    </Card>
  );
}
