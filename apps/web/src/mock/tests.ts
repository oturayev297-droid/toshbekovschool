// Bosqich 1: Testlar mock ma'lumoti. Ismlar to'qima.
import { type Subject, students, testList } from "./data";

/** Fan → mavzular (test yaratish formasi uchun) */
export const topicsBySubject: Record<Subject, string[]> = {
  English: ["Present Perfect", "Vocabulary — Unit 6", "Reading: main idea", "Conditionals"],
  Matematika: ["Kvadrat tenglamalar", "Funksiyalar", "Trigonometriya asoslari", "Progressiyalar"],
  IT: ["Sikllar (for, while)", "Shartlar (if/else)", "Massivlar", "Funksiyalar"],
  SAT: ["Reading — Evidence", "Math — Algebra", "Writing — Grammar"],
  Kimyo: ["Mol tushunchasi", "Kimyoviy bog'lanish", "Oksidlanish-qaytarilish"],
  Biologiya: ["Hujayra tuzilishi", "Genetika asoslari", "Fotosintez"],
  "Rus tili": ["Падежи", "Глаголы движения", "Причастие"],
  "Nemis tili": ["Perfekt", "Artikel und Kasus", "Modalverben"],
};

export type ResultLevel = "alo" | "yaxshi" | "past";
export function scoreLevel(score: number): ResultLevel {
  return score >= 85 ? "alo" : score >= 70 ? "yaxshi" : "past";
}

/** Oxirgi topshirilgan testlar natijalari (yangisi tepada) */
export const testAttempts = students
  .slice(0, 14)
  .map((s, i) => {
    const subject = s.subjects[i % 2];
    const topic = topicsBySubject[subject][i % topicsBySubject[subject].length];
    const score = [88, 67, 92, 74, 81, 58, 95, 72, 63, 86, 79, 90, 69, 84][i];
    const total = 25;
    return {
      id: `a-${s.id}`,
      studentId: s.id,
      fullName: s.fullName,
      grade: s.grade,
      subject,
      topic,
      score,
      correct: Math.round((score / 100) * total),
      total,
      minutes: [18, 24, 15, 22, 20, 25, 14, 21, 25, 17, 19, 16, 23, 18][i],
      date: [
        "27.11",
        "27.11",
        "26.11",
        "26.11",
        "26.11",
        "25.11",
        "25.11",
        "25.11",
        "24.11",
        "24.11",
        "23.11",
        "23.11",
        "23.11",
        "22.11",
      ][i],
    };
  })
  // s-001 profilidagi oxirgi test bilan bir xil bo'lsin (profil, xabar namunasi)
  .map((a) =>
    a.studentId === students[0].id
      ? {
          ...a,
          topic: testList[0].topic,
          score: testList[0].score,
          correct: 22,
          date: testList[0].date,
        }
      : a,
  )
  .sort((a, b) => b.date.localeCompare(a.date));

/** Mavzu bo'yicha statistika (fan → mavzular) */
export const topicStats: Record<
  "English" | "Matematika" | "IT",
  { topic: string; tests: number; attempts: number; avg: number; hardest: string }[]
> = {
  English: [
    { topic: "Present Perfect", tests: 3, attempts: 86, avg: 78, hardest: "have been vs. went" },
    {
      topic: "Vocabulary — Unit 6",
      tests: 2,
      attempts: 74,
      avg: 84,
      hardest: "“reluctant” ma'nosi",
    },
    { topic: "Reading: main idea", tests: 2, attempts: 61, avg: 71, hardest: "3-matn, 4-savol" },
    { topic: "Conditionals", tests: 1, attempts: 39, avg: 62, hardest: "Third conditional" },
  ],
  Matematika: [
    {
      topic: "Kvadrat tenglamalar",
      tests: 3,
      attempts: 92,
      avg: 74,
      hardest: "Diskriminant < 0 holati",
    },
    { topic: "Funksiyalar", tests: 2, attempts: 70, avg: 81, hardest: "Aniqlanish sohasi" },
    {
      topic: "Trigonometriya asoslari",
      tests: 2,
      attempts: 55,
      avg: 64,
      hardest: "sin 150° qiymati",
    },
    { topic: "Progressiyalar", tests: 1, attempts: 41, avg: 86, hardest: "Geometrik yig'indi" },
  ],
  IT: [
    {
      topic: "Sikllar (for, while)",
      tests: 3,
      attempts: 64,
      avg: 66,
      hardest: "Cheksiz sikl sharti",
    },
    { topic: "Shartlar (if/else)", tests: 2, attempts: 58, avg: 82, hardest: "Ichma-ich shartlar" },
    { topic: "Massivlar", tests: 2, attempts: 47, avg: 73, hardest: "Indeks 0 dan boshlanishi" },
    { topic: "Funksiyalar", tests: 1, attempts: 30, avg: 69, hardest: "return va print farqi" },
  ],
};

export const testsSummary = {
  active: 12,
  attemptsWeek: 214,
  avgScore: 76,
  topics: 31,
};
