// Bosqich 1: Ota-ona kabineti mock'i. Ota-ona faqat o'z farzandlarini ko'radi (RBAC — 2–3-bosqichlarda API'da).
import {
  type DormStatus,
  type PaymentStatus,
  paymentHistory,
  type Student,
  students,
  testList,
  testResults,
  weeklyAiReport,
} from "./data";
import { dormStudents } from "./dorm";

export const parentAccount = {
  fullName: "Dilnoza Karimova",
  childIds: ["s-001", "s-031"],
};

export type ChildBundle = {
  student: Student;
  weekly: { week: string; summary: string; strengths: string[]; focus: string[] };
  weeklyArchive: { week: string; headline: string }[];
  payments: { id: string; month: string; amount: number; date: string; status: PaymentStatus }[];
  dueDate: string;
  tests: { id: string; subject: string; topic: string; score: number; date: string }[];
  trend: Record<string, string | number>[];
  /** Yotoqxona: bugun kechasi + oxirgi kechalar (faqat neytral ma'lumot) */
  dorm: {
    tonight?: { status: DormStatus; sleep: string; wake: string; lesson: string };
    nights: { date: string; status: DormStatus; sleep: string; wake: string }[];
  } | null;
};

const aziza = students.find((s) => s.id === "s-001")!;
const kamron = students.find((s) => s.id === "s-031")!;
const azizaTonight = dormStudents.find((d) => d.id === "s-001");

export const children: ChildBundle[] = [
  {
    student: aziza,
    weekly: weeklyAiReport,
    weeklyArchive: [
      {
        week: "11–17 noyabr",
        headline: "English bo'yicha barqaror o'sish, IT'da yangi mavzu boshlandi",
      },
      { week: "4–10 noyabr", headline: "Darslarga to'liq qatnashdi, mentor bilan faol ishladi" },
    ],
    payments: paymentHistory,
    dueDate: "5-dekabr",
    tests: testList,
    trend: testResults,
    dorm: {
      tonight: azizaTonight && {
        status: azizaTonight.status,
        sleep: azizaTonight.sleep,
        wake: azizaTonight.wake,
        lesson: azizaTonight.lesson,
      },
      nights: [
        { date: "25.11", status: "uxladi", sleep: "22:10", wake: "06:30" },
        { date: "24.11", status: "uxladi", sleep: "22:05", wake: "06:30" },
        { date: "23.11", status: "uxladi", sleep: "22:20", wake: "06:35" },
        { date: "22.11", status: "uxladi", sleep: "23:10", wake: "06:40" },
      ],
    },
  },
  {
    student: kamron,
    weekly: {
      week: "18–24 noyabr 2026",
      summary:
        "Kamron bu hafta Matematika bo'yicha mantiqiy masalalarda yaxshi natija ko'rsatdi (90 ball). English'da yangi so'zlarni yodlash ustida ishlash foydali bo'ladi.",
      strengths: ["Mantiqiy masalalarni tez yechadi", "Darslarga 100% qatnashdi"],
      focus: ["English: kundalik 10 ta yangi so'z", "Matematika: kasrlar bilan amallar"],
    },
    weeklyArchive: [
      { week: "11–17 noyabr", headline: "Matematika olimpiadasiga tayyorgarlik boshlandi" },
    ],
    payments: [
      { id: "k1", month: "Noyabr 2026", amount: 1_700_000, date: "04.11.2026", status: "tolangan" },
      { id: "k2", month: "Oktabr 2026", amount: 1_700_000, date: "03.10.2026", status: "tolangan" },
    ],
    dueDate: "5-dekabr",
    tests: [
      { id: "kt1", subject: "Matematika", topic: "Mantiqiy masalalar", score: 90, date: "24.11" },
      { id: "kt2", subject: "English", topic: "Animals — vocabulary", score: 78, date: "20.11" },
    ],
    trend: [
      { week: "1-hf", Matematika: 80, English: 72 },
      { week: "2-hf", Matematika: 84, English: 75 },
      { week: "3-hf", Matematika: 86, English: 74 },
      { week: "4-hf", Matematika: 90, English: 78 },
    ],
    dorm: null,
  },
];
