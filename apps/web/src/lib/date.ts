// O'zbekcha sana formatlash. Vaqt mintaqasi: Toshkent (UTC+5, yozgi vaqt yo'q).

const WEEKDAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
const MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

const TASHKENT_OFFSET_MS = 5 * 60 * 60 * 1000;

/** Toshkent vaqti bo'yicha kalendar qismlari */
function tashkentParts(date: Date) {
  const t = new Date(date.getTime() + TASHKENT_OFFSET_MS);
  return {
    weekday: t.getUTCDay(),
    day: t.getUTCDate(),
    month: t.getUTCMonth(),
    year: t.getUTCFullYear(),
  };
}

/** "Chorshanba, 25-noyabr 2026" */
export function formatUzDate(date: Date): string {
  const p = tashkentParts(date);
  return `${WEEKDAYS[p.weekday]}, ${p.day}-${MONTHS[p.month]} ${p.year}`;
}

/** Toshkent vaqti bo'yicha "YYYY-MM-DD" */
export function tashkentISODate(date: Date): string {
  const p = tashkentParts(date);
  return `${p.year}-${String(p.month + 1).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

/** Toshkent vaqti bo'yicha "HH:MM" */
export function tashkentTime(date: Date): string {
  const t = new Date(date.getTime() + TASHKENT_OFFSET_MS);
  return `${String(t.getUTCHours()).padStart(2, "0")}:${String(t.getUTCMinutes()).padStart(2, "0")}`;
}
