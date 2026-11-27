// Bosqich 1b: Dars jadvali mock'i — o'qituvchilar ro'yxatidan (guruhlari) hisoblanadi.
// Qoida: bir o'qituvchi (va uning xonasi) bir vaqtda faqat bitta sinfda bo'ladi.
import { students } from "./data";
import { teachers } from "./people";

export const lessonTimes = [
  { n: 1, start: "08:00", end: "08:45" },
  { n: 2, start: "08:55", end: "09:40" },
  { n: 3, start: "09:50", end: "10:35" },
  { n: 4, start: "10:55", end: "11:40" },
  { n: 5, start: "11:50", end: "12:35" },
];

export const weekDays = [
  { short: "Du", name: "Dushanba" },
  { short: "Se", name: "Seshanba" },
  { short: "Ch", name: "Chorshanba" },
  { short: "Pa", name: "Payshanba" },
  { short: "Ju", name: "Juma" },
  { short: "Sh", name: "Shanba" },
];

/** Fan → xona (har fan o'z xonasida) */
const roomBySubject: Record<string, string> = {
  English: "201",
  IT: "302",
  Matematika: "105",
  SAT: "204",
  Kimyo: "Lab-1",
  Biologiya: "Lab-2",
  "Rus tili": "206",
  "Nemis tili": "207",
};

export type Lesson = {
  id: string;
  grade: string;
  /** 0 = Dushanba … 5 = Shanba */
  day: number;
  /** 1…5 */
  lesson: number;
  subject: string;
  teacher: string;
  room: string;
};

export const scheduleGrades = [...new Set(teachers.flatMap((t) => t.groups))].sort(
  (a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b),
);

/** Haftalik jadval: har sinfga kuniga 4 tagacha yo'nalish darsi, to'qnashuvsiz */
export const timetable: Lesson[] = (() => {
  const out: Lesson[] = [];
  const busy = new Set<string>(); // `${teacher}|${day}|${lesson}`
  weekDays.forEach((_, day) => {
    lessonTimes.slice(0, 4).forEach(({ n: lesson }) => {
      scheduleGrades.forEach((grade, gi) => {
        const own = teachers.filter((t) => t.groups.includes(grade));
        for (let k = 0; k < own.length; k++) {
          const t = own[(day + lesson + gi + k) % own.length];
          const key = `${t.fullName}|${day}|${lesson}`;
          if (busy.has(key)) continue;
          busy.add(key);
          out.push({
            id: `${grade}-${day}-${lesson}`,
            grade,
            day,
            lesson,
            subject: t.subject,
            teacher: t.fullName,
            room: roomBySubject[t.subject] ?? "—",
          });
          break;
        }
      });
    });
  });
  return out;
})();

export const scheduleTeachers = [...new Set(timetable.map((l) => l.teacher))].sort();
export const scheduleRooms = [...new Set(timetable.map((l) => l.room))].sort();

/** Sinf / guruh o'quvchilari: sinf + shu fanni tanlaganlar (davomat uchun) */
export const groupStudents = (grade: string, subject: string) =>
  students.filter((s) => s.grade === grade && (s.subjects as string[]).includes(subject));

/** Zavuch: bugungi davomat sinflar bo'yicha (%), mock */
export const attendanceByGrade = scheduleGrades.map((g, i) => ({
  grade: g,
  percent: [97, 94, 91, 96, 88, 95, 93, 98, 90, 94, 96][i % 11],
  late: i % 4,
}));
