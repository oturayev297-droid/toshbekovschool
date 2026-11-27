// Bosqich 1: faqat mock ma'lumot (backend'siz). Ismlar to'qima.

export const subjects = [
  "English",
  "Matematika",
  "IT",
  "SAT",
  "Kimyo",
  "Biologiya",
  "Rus tili",
  "Nemis tili",
] as const;
export type Subject = (typeof subjects)[number];

export type PaymentStatus = "tolangan" | "qisman" | "qarz";
export type DormStatus = "uxladi" | "uxlamadi" | "belgilanmagan";

export type Student = {
  id: string;
  fullName: string;
  grade: string;
  subjects: [Subject, Subject];
  parent: { fullName: string; phone: string; telegramLinked: boolean };
  dorm: boolean;
  monthlyFee: number;
  paid: number;
  paymentStatus: PaymentStatus;
  lastNight: DormStatus;
  avgScore: number;
  birthDate: string;
  enrolledAt: string;
};

const featuredStudents: Student[] = [
  {
    id: "s-001",
    fullName: "Aziza Karimova",
    grade: "9-A",
    subjects: ["English", "IT"],
    parent: { fullName: "Dilnoza Karimova", phone: "+998 90 123 45 67", telegramLinked: true },
    dorm: true,
    monthlyFee: 1_800_000,
    paid: 1_800_000,
    paymentStatus: "tolangan",
    lastNight: "uxladi",
    avgScore: 87,
    birthDate: "2011-03-14",
    enrolledAt: "2024-09-02",
  },
  {
    id: "s-002",
    fullName: "Jasur Rahimov",
    grade: "10-B",
    subjects: ["Matematika", "SAT"],
    parent: { fullName: "Bahodir Rahimov", phone: "+998 93 222 10 08", telegramLinked: true },
    dorm: true,
    monthlyFee: 2_000_000,
    paid: 1_000_000,
    paymentStatus: "qisman",
    lastNight: "uxlamadi",
    avgScore: 74,
    birthDate: "2010-07-22",
    enrolledAt: "2023-09-04",
  },
  {
    id: "s-003",
    fullName: "Madina Yusupova",
    grade: "8-A",
    subjects: ["Kimyo", "Biologiya"],
    parent: { fullName: "Nodira Yusupova", phone: "+998 97 555 31 90", telegramLinked: false },
    dorm: false,
    monthlyFee: 1_700_000,
    paid: 0,
    paymentStatus: "qarz",
    lastNight: "belgilanmagan",
    avgScore: 91,
    birthDate: "2012-01-09",
    enrolledAt: "2025-01-15",
  },
  {
    id: "s-004",
    fullName: "Sardor Toshmatov",
    grade: "11-A",
    subjects: ["SAT", "English"],
    parent: { fullName: "Akmal Toshmatov", phone: "+998 99 870 44 12", telegramLinked: true },
    dorm: true,
    monthlyFee: 2_100_000,
    paid: 2_100_000,
    paymentStatus: "tolangan",
    lastNight: "uxladi",
    avgScore: 82,
    birthDate: "2009-11-30",
    enrolledAt: "2022-09-01",
  },
  {
    id: "s-005",
    fullName: "Zarina Abdullayeva",
    grade: "7-B",
    subjects: ["Rus tili", "Matematika"],
    parent: { fullName: "Gulnora Abdullayeva", phone: "+998 91 404 77 21", telegramLinked: true },
    dorm: false,
    monthlyFee: 1_600_000,
    paid: 1_600_000,
    paymentStatus: "tolangan",
    lastNight: "belgilanmagan",
    avgScore: 68,
    birthDate: "2013-05-18",
    enrolledAt: "2024-09-02",
  },
  {
    id: "s-006",
    fullName: "Bekzod Ergashev",
    grade: "10-A",
    subjects: ["IT", "Nemis tili"],
    parent: { fullName: "Shoxrux Ergashev", phone: "+998 94 610 02 55", telegramLinked: false },
    dorm: true,
    monthlyFee: 1_900_000,
    paid: 0,
    paymentStatus: "qarz",
    lastNight: "uxladi",
    avgScore: 79,
    birthDate: "2010-02-03",
    enrolledAt: "2023-09-04",
  },
];

export const dashboard = {
  studentsTotal: 248,
  studentsDelta: "+12 bu oy",
  attendanceToday: 94.2,
  attendanceDelta: "-1,3% kechagidan",
  revenueMonth: 412_600_000,
  revenueDelta: "+8% o'tgan oydan",
  staffTotal: 46,
  teachersTotal: 31,
};

export const revenueByMonth = [
  { month: "Iyun", tushum: 352, chiqim: 268 },
  { month: "Iyul", tushum: 318, chiqim: 255 },
  { month: "Avg", tushum: 341, chiqim: 262 },
  { month: "Sen", tushum: 389, chiqim: 281 },
  { month: "Okt", tushum: 396, chiqim: 279 },
  { month: "Noy", tushum: 413, chiqim: 290 },
];

export const attendanceWeek = [
  { day: "Du", foiz: 96 },
  { day: "Se", foiz: 95 },
  { day: "Ch", foiz: 93 },
  { day: "Pa", foiz: 95 },
  { day: "Ju", foiz: 94 },
  { day: "Sh", foiz: 91 },
];

export type AlertLevel = "yuqori" | "orta" | "past";
export const aiAlerts: { id: string; level: AlertLevel; title: string; detail: string }[] = [
  {
    id: "a1",
    level: "yuqori",
    title: "12 ta o'quvchida qarzdorlik",
    detail: "Jami 24,7 mln so'm. 4 tasi 2 oydan beri to'lamagan.",
  },
  {
    id: "a2",
    level: "orta",
    title: "Yotoqxona: 3 o'quvchi kechasi uxlamagan",
    detail: "Ota-onalarga Telegram xabari yuborildi.",
  },
  {
    id: "a3",
    level: "orta",
    title: "10-B sinfda Matematika natijasi pasaydi",
    detail: "Oxirgi 2 testda o'rtacha ball 81 → 69.",
  },
  {
    id: "a4",
    level: "past",
    title: "Oshxona menyusi kiritildi",
    detail: "Keyingi hafta menyusi yakshanba kechqurun yuboriladi.",
  },
];

export const dormToday = {
  total: 132,
  slept: 126,
  notSlept: 3,
  unmarked: 3,
  onDuty: "Malika Sobirova",
};

export const recentPayments = [
  { id: "p1", student: "Sardor Toshmatov", amount: 2_100_000, date: "25.11.2026", method: "Click" },
  { id: "p2", student: "Aziza Karimova", amount: 1_800_000, date: "24.11.2026", method: "Naqd" },
  { id: "p3", student: "Jasur Rahimov", amount: 1_000_000, date: "24.11.2026", method: "Payme" },
  {
    id: "p4",
    student: "Zarina Abdullayeva",
    amount: 1_600_000,
    date: "22.11.2026",
    method: "Bank",
  },
];

// --- O'quvchi profili uchun (s-001 misolida) ---

export const weeklyAiReport = {
  week: "18–24 noyabr 2026",
  sentToParent: true,
  summary:
    "Aziza bu hafta English bo'yicha barqaror o'sishni ko'rsatdi: so'z boyligi testida 88 ball. IT fanida algoritmlar mavzusida biroz qiyinchilik bor — qo'shimcha mashqlar tavsiya etiladi.",
  strengths: [
    "Reading tezligi oshdi",
    "Darslarga muntazam qatnashdi",
    "AI mentor bilan 3 soat 20 daqiqa ishladi",
  ],
  focus: ["IT: sikllar va shartlar", "English: Present Perfect zamoni"],
};

export const paymentHistory = [
  {
    id: "ph1",
    month: "Noyabr 2026",
    amount: 1_800_000,
    date: "24.11.2026",
    status: "tolangan" as PaymentStatus,
  },
  {
    id: "ph2",
    month: "Oktabr 2026",
    amount: 1_800_000,
    date: "03.10.2026",
    status: "tolangan" as PaymentStatus,
  },
  {
    id: "ph3",
    month: "Sentabr 2026",
    amount: 1_800_000,
    date: "05.09.2026",
    status: "tolangan" as PaymentStatus,
  },
];

export const subjectDetails = [
  {
    subject: "English" as Subject,
    teacher: "Nilufar Hasanova",
    level: "B1 → B2",
    progress: 72,
    price: 900_000,
  },
  {
    subject: "IT" as Subject,
    teacher: "Otabek Qodirov",
    level: "Boshlang'ich",
    progress: 54,
    price: 900_000,
  },
];

export const dormLogs = [
  {
    date: "24.11",
    sleep: "22:05",
    wake: "06:30",
    lesson: "08:00",
    status: "uxladi" as DormStatus,
    by: "M. Sobirova",
  },
  {
    date: "23.11",
    sleep: "22:20",
    wake: "06:35",
    lesson: "08:00",
    status: "uxladi" as DormStatus,
    by: "M. Sobirova",
  },
  {
    date: "22.11",
    sleep: "23:10",
    wake: "06:40",
    lesson: "08:05",
    status: "uxladi" as DormStatus,
    by: "F. Aliyeva",
  },
  {
    date: "21.11",
    sleep: "—",
    wake: "06:30",
    lesson: "08:00",
    status: "uxlamadi" as DormStatus,
    by: "F. Aliyeva",
  },
];

export const testResults = [
  { week: "1-hf", English: 78, IT: 61 },
  { week: "2-hf", English: 81, IT: 64 },
  { week: "3-hf", English: 84, IT: 60 },
  { week: "4-hf", English: 88, IT: 67 },
];

export const testList = [
  { id: "t1", subject: "English", topic: "Vocabulary — Unit 6", score: 88, date: "23.11" },
  { id: "t2", subject: "IT", topic: "Sikllar (for, while)", score: 67, date: "21.11" },
  { id: "t3", subject: "English", topic: "Present Perfect", score: 84, date: "16.11" },
];

export const mentorActivity = [
  { subject: "English" as Subject, minutes: 130, lastTopic: "Present Perfect", sessions: 9 },
  { subject: "IT" as Subject, minutes: 70, lastTopic: "Sikllar", sessions: 5 },
];

// --- Qolgan o'quvchilar (deterministik generator, jami 30 ta) ---

// [ism, qiz bolami]
const FIRST: [string, boolean][] = [
  ["Diyora", true],
  ["Otabek", false],
  ["Malika", true],
  ["Bobur", false],
  ["Sevara", true],
  ["Ulug'bek", false],
  ["Nilufar", true],
  ["Javohir", false],
  ["Shahzoda", true],
  ["Islom", false],
  ["Mohira", true],
  ["Temur", false],
];
const LAST = [
  "Nazarov",
  "Saidova",
  "Qodirov",
  "Mirzayeva",
  "Xolmatov",
  "Usmonova",
  "Aliyev",
  "Sobirova",
  "Ismoilov",
  "Tursunova",
  "Jo'rayev",
  "Hamidova",
];
const PARENT_FIRST = ["Rustam", "Feruza", "Anvar", "Lola", "Sherali", "Mavluda"];
const GRADES = [
  "5-A",
  "6-A",
  "6-B",
  "7-A",
  "7-B",
  "8-A",
  "8-B",
  "9-A",
  "9-B",
  "10-A",
  "10-B",
  "11-A",
];
const PAIRS: [Subject, Subject][] = [
  ["English", "Matematika"],
  ["IT", "English"],
  ["SAT", "Matematika"],
  ["Kimyo", "Biologiya"],
  ["Rus tili", "English"],
  ["Nemis tili", "IT"],
  ["Matematika", "Kimyo"],
  ["Biologiya", "English"],
];
const STATUS: PaymentStatus[] = ["tolangan", "tolangan", "qisman", "tolangan", "qarz"];
const NIGHT: DormStatus[] = ["uxladi", "uxladi", "uxladi", "uxlamadi", "belgilanmagan"];

function generateStudents(count: number): Student[] {
  return Array.from({ length: count }, (_, i) => {
    const [first, female] = FIRST[i % FIRST.length];
    // Har 12 tadan keyin familiya siljiydi — bir xil ism-familiya takrorlanmaydi
    const lastBase = LAST[(i * 5 + Math.floor(i / FIRST.length)) % LAST.length].replace(/a$/, "");
    // Familiya: qizlarda "-a" qo'shimchasi (Nazarov -> Nazarova)
    const last = female ? `${lastBase}a` : lastBase;
    const fee = 1_600_000 + (i % 5) * 100_000;
    const status = STATUS[i % STATUS.length];
    const dorm = i % 3 !== 0;
    return {
      id: `s-${String(i + 7).padStart(3, "0")}`,
      fullName: `${first} ${last}`,
      grade: GRADES[(i * 7) % GRADES.length],
      subjects: PAIRS[i % PAIRS.length],
      parent: {
        fullName: `${PARENT_FIRST[i % PARENT_FIRST.length]} ${lastBase}${i % 2 ? "a" : ""}`,
        phone: `+998 9${i % 10} ${String(100 + ((i * 37) % 900))} ${String(10 + ((i * 13) % 90))} ${String(10 + ((i * 29) % 90))}`,
        telegramLinked: i % 4 !== 0,
      },
      dorm,
      monthlyFee: fee,
      paid: status === "tolangan" ? fee : status === "qisman" ? fee / 2 : 0,
      paymentStatus: status,
      lastNight: dorm ? NIGHT[i % NIGHT.length] : "belgilanmagan",
      avgScore: 58 + ((i * 17) % 40),
      birthDate: `${2009 + (i % 6)}-${String(1 + (i % 12)).padStart(2, "0")}-${String(3 + (i % 25)).padStart(2, "0")}`,
      enrolledAt: `${2022 + (i % 4)}-09-0${1 + (i % 5)}`,
    };
  });
}

export const students: Student[] = [...featuredStudents, ...generateStudents(24)];
export const grades = [...new Set(students.map((s) => s.grade))].sort(
  (a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b),
);
