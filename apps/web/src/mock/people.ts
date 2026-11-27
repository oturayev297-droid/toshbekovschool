// Bosqich 1: O'qituvchilar, xodimlar va moliya uchun mock ma'lumot. Ismlar to'qima.
import type { Subject } from "./data";
import { students } from "./data";

export type SalaryStatus = "tolandi" | "kutilmoqda" | "kechikdi";

export type Teacher = {
  id: string;
  fullName: string;
  subject: Subject | "Tanqidiy fikrlash" | "Mantiqiy fikrlash";
  groups: string[];
  studentsCount: number;
  hoursPerWeek: number;
  salary: number;
  salaryStatus: SalaryStatus;
  phone: string;
  rating: number;
};

export const teachers: Teacher[] = [
  {
    id: "t-01",
    fullName: "Nilufar Hasanova",
    subject: "English",
    groups: ["9-A", "9-B", "10-A"],
    studentsCount: 42,
    hoursPerWeek: 24,
    salary: 9_500_000,
    salaryStatus: "tolandi",
    phone: "+998 90 311 22 41",
    rating: 4.8,
  },
  {
    id: "t-02",
    fullName: "Otabek Qodirov",
    subject: "IT",
    groups: ["8-A", "9-A", "10-A", "11-A"],
    studentsCount: 36,
    hoursPerWeek: 22,
    salary: 9_000_000,
    salaryStatus: "tolandi",
    phone: "+998 93 640 18 05",
    rating: 4.6,
  },
  {
    id: "t-03",
    fullName: "Farhod Rasulov",
    subject: "Matematika",
    groups: ["7-A", "7-B", "10-B"],
    studentsCount: 48,
    hoursPerWeek: 26,
    salary: 10_200_000,
    salaryStatus: "kutilmoqda",
    phone: "+998 97 102 77 63",
    rating: 4.9,
  },
  {
    id: "t-04",
    fullName: "Gulshan Ahmedova",
    subject: "SAT",
    groups: ["10-B", "11-A"],
    studentsCount: 24,
    hoursPerWeek: 16,
    salary: 8_400_000,
    salaryStatus: "tolandi",
    phone: "+998 99 455 30 12",
    rating: 4.7,
  },
  {
    id: "t-05",
    fullName: "Dilshod Karimov",
    subject: "Kimyo",
    groups: ["8-A", "8-B", "9-A"],
    studentsCount: 30,
    hoursPerWeek: 18,
    salary: 7_800_000,
    salaryStatus: "kechikdi",
    phone: "+998 91 220 64 90",
    rating: 4.4,
  },
  {
    id: "t-06",
    fullName: "Zuhra Normatova",
    subject: "Biologiya",
    groups: ["8-B", "9-B"],
    studentsCount: 26,
    hoursPerWeek: 16,
    salary: 7_400_000,
    salaryStatus: "tolandi",
    phone: "+998 94 718 03 37",
    rating: 4.5,
  },
  {
    id: "t-07",
    fullName: "Elena Petrova",
    subject: "Rus tili",
    groups: ["6-A", "7-B"],
    studentsCount: 22,
    hoursPerWeek: 14,
    salary: 6_900_000,
    salaryStatus: "kutilmoqda",
    phone: "+998 90 905 41 26",
    rating: 4.6,
  },
  {
    id: "t-08",
    fullName: "Kamola Yo'ldosheva",
    subject: "Nemis tili",
    groups: ["9-B", "10-A"],
    studentsCount: 18,
    hoursPerWeek: 12,
    salary: 6_600_000,
    salaryStatus: "tolandi",
    phone: "+998 93 377 59 84",
    rating: 4.3,
  },
];

export type StaffMember = {
  id: string;
  fullName: string;
  position: string;
  department: "Ma'muriyat" | "Moliya" | "Yotoqxona" | "Oshxona" | "Xo'jalik";
  shift?: string;
  salary: number;
  salaryStatus: SalaryStatus;
  phone: string;
};

export const staff: StaffMember[] = [
  {
    id: "x-01",
    fullName: "Shoira Xudoyberdiyeva",
    position: "Bosh buxgalter",
    department: "Moliya",
    salary: 8_000_000,
    salaryStatus: "tolandi",
    phone: "+998 90 140 52 77",
  },
  {
    id: "x-02",
    fullName: "Akbar Mahmudov",
    position: "Administrator",
    department: "Ma'muriyat",
    salary: 6_000_000,
    salaryStatus: "tolandi",
    phone: "+998 93 286 91 03",
  },
  {
    id: "x-03",
    fullName: "Malika Sobirova",
    position: "Tarbiyachi",
    department: "Yotoqxona",
    shift: "Tungi, jadval bo'yicha",
    salary: 5_200_000,
    salaryStatus: "kutilmoqda",
    phone: "+998 97 533 20 48",
  },
  {
    id: "x-04",
    fullName: "Feruza Aliyeva",
    position: "Tarbiyachi",
    department: "Yotoqxona",
    shift: "Tungi, jadval bo'yicha",
    salary: 5_400_000,
    salaryStatus: "tolandi",
    phone: "+998 99 610 72 15",
  },
  {
    id: "x-05",
    fullName: "Rahmatullo Ergashev",
    position: "Bosh oshpaz",
    department: "Oshxona",
    salary: 6_500_000,
    salaryStatus: "tolandi",
    phone: "+998 91 404 38 69",
  },
  {
    id: "x-06",
    fullName: "Nodira Qosimova",
    position: "Oshpaz yordamchisi",
    department: "Oshxona",
    salary: 4_200_000,
    salaryStatus: "kechikdi",
    phone: "+998 94 152 87 30",
  },
  {
    id: "x-07",
    fullName: "Jamshid To'xtayev",
    position: "Xo'jalik mudiri",
    department: "Xo'jalik",
    salary: 5_000_000,
    salaryStatus: "tolandi",
    phone: "+998 90 771 09 54",
  },
  {
    id: "x-08",
    fullName: "Sanjar Boboyev",
    position: "Qorovul",
    department: "Xo'jalik",
    shift: "Tungi smena",
    salary: 3_800_000,
    salaryStatus: "kutilmoqda",
    phone: "+998 93 822 46 11",
  },
];

// --- Moliya ---

export const expenseBreakdown = [
  { id: "e1", category: "O'qituvchilar oyligi", amount: 165_800_000 },
  { id: "e2", category: "Xodimlar oyligi", amount: 70_200_000 },
  { id: "e3", category: "Oshxona mahsulotlari", amount: 31_400_000 },
  { id: "e4", category: "Kommunal xizmatlar", amount: 12_600_000 },
  { id: "e5", category: "Xo'jalik va ta'mirlash", amount: 10_000_000 },
];

/**
 * Oylik moliya xulosasi. Chiqim va oylik fondi chiqim tarkibidan hisoblanadi,
 * sof foyda = tushum − chiqim — kartalardagi raqamlar bir-biriga aniq mos keladi
 * (413 − 290 = 123 mln).
 */
const expensesTotal = expenseBreakdown.reduce((a, e) => a + e.amount, 0);
export const financeSummary = {
  month: "Noyabr 2026",
  revenue: 413_000_000,
  expected: 451_000_000,
  expenses: expensesTotal,
  salaryFund: expenseBreakdown[0].amount + expenseBreakdown[1].amount,
  profit: 413_000_000 - expensesTotal,
};

/** Qarzdorlar — o'quvchilar ro'yxatidan hisoblanadi */
export const debtors = students
  .filter((s) => s.paymentStatus !== "tolangan")
  .map((s, i) => ({
    id: s.id,
    fullName: s.fullName,
    grade: s.grade,
    parentPhone: s.parent.phone,
    debt: s.monthlyFee - s.paid + (i % 3 === 0 ? s.monthlyFee : 0),
    months: i % 3 === 0 ? 2 : 1,
    status: s.paymentStatus,
  }))
  .sort((a, b) => b.debt - a.debt);

/** Qarz ko'rsatkichlari qarzdorlar ro'yxatidan hisoblanadi (KPI va jadval bir xil bo'lishi uchun) */
export const debtTotals = {
  debt: debtors.reduce((a, d) => a + d.debt, 0),
  debtors: debtors.length,
};

export type MonthCell = "tolangan" | "qisman" | "qarz" | "kutilmoqda";
export const scheduleMonths = ["Sen", "Okt", "Noy", "Dek"];

/** Oylik to'lovlar jadvali: o'quvchi × oy */
export const paymentSchedule = students.slice(0, 12).map((s, i) => ({
  id: s.id,
  fullName: s.fullName,
  grade: s.grade,
  fee: s.monthlyFee,
  dueDay: 5,
  cells: [
    (i % 7 === 4 ? "qisman" : "tolangan") as MonthCell,
    (i % 5 === 4 ? "qarz" : "tolangan") as MonthCell,
    s.paymentStatus as MonthCell,
    "kutilmoqda" as MonthCell,
  ],
}));

export const salaryBadge: Record<
  SalaryStatus,
  { label: string; variant: "success" | "warning" | "danger" }
> = {
  tolandi: { label: "To'landi", variant: "success" },
  kutilmoqda: { label: "Kutilmoqda", variant: "warning" },
  kechikdi: { label: "Kechikdi", variant: "danger" },
};
