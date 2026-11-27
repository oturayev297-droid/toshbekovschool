// Bosqich 1: Yotoqxona mock ma'lumoti. Ismlar to'qima.
// Smena vaqti va bekor qilish oynasi — config/school.ts dan (kodga qotirilmaydi).
import { type DormGroup, schoolConfig, shiftHours } from "@/config/school";
import { t } from "@/i18n";
import { type AlertLevel, type DormStatus, students } from "./data";

/** "Uxlamadi" sababi — tez tanlash tugmalari (matnlari i18n'da) */
export const notSleptReasons = ["tish", "uyqusizlik", "salomatlik", "boshqa"] as const;
export type NotSleptReason = (typeof notSleptReasons)[number];

export type DormStudent = {
  id: string;
  fullName: string;
  parent: string;
  grade: string;
  /** Qizlar / o'g'il bolalar — alohida qavat, smena va tarbiyachi */
  group: DormGroup;
  room: string;
  sleep: string;
  wake: string;
  lesson: string;
  status: DormStatus;
  /** "Uxlamadi" belgilangan (tekshirilgan) vaqt */
  checkedAt?: string;
  /** Sabab va izoh — salomatlik ma'lumoti: faqat direktor va tarbiyachi ko'radi, ota-onaga ketmaydi */
  reason?: NotSleptReason;
  reasonNote?: string;
  /** Ota-onaga xabar yuborilgan vaqt (bekor qilish oynasidan keyin) */
  notifiedAt?: string;
};

/** "HH:MM" ga daqiqa qo'shish (yarim tundan o'tishni hisobga oladi) */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const v = (h * 60 + m + minutes + 24 * 60) % (24 * 60);
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
}

/** Tungi smena ichida tartiblash kaliti: kechqurun (22:00–23:59), keyin tun/tong (00:00–…) */
export const nightOrder = (time: string) => (time < "12:00" ? `1${time}` : `0${time}`);

const sleepTimes = ["22:25", "22:05", "22:10", "22:20", "22:00", "22:15", "23:20", "22:05"];
const notSlept: Record<number, Pick<DormStudent, "checkedAt" | "reason" | "reasonNote">> = {
  1: {
    checkedAt: "00:40",
    reason: "tish",
    reasonNote: "Tibbiyot xonasiga olib borildi, og'riq qoldiruvchi berildi.",
  },
  9: {
    checkedAt: "01:15",
    reason: "uyqusizlik",
    reasonNote: "Ketma-ket 2-kecha. Psixolog suhbati tavsiya etiladi.",
  },
  14: {
    checkedAt: "02:05",
    reason: "uyqusizlik",
    reasonNote: "Imtihondan xavotirda, suhbatlashildi.",
  },
};

const floorOf = (g: DormGroup) => schoolConfig.dorm.groups.find((x) => x.key === g)!.floor;

/** Bugungi tungi smena: yotoqxonadagi o'quvchilar (ikkala guruh) */
export const dormStudents: DormStudent[] = (() => {
  const perGroup: Record<DormGroup, number> = { qiz: 0, ogil: 0 };
  return students
    .filter((s) => s.dorm)
    .map((s, i) => {
      const group: DormGroup = s.gender;
      const n = perGroup[group]++;
      const status: DormStatus = notSlept[i]
        ? "uxlamadi"
        : i % 7 === 4
          ? "belgilanmagan"
          : "uxladi";
      const sleep = status === "uxladi" ? sleepTimes[i % sleepTimes.length] : "";
      return {
        id: s.id,
        parent: s.parent.fullName,
        fullName: s.fullName,
        grade: s.grade,
        group,
        // Har xonada 2 kishi: 2-qavat qizlar (201…), 1-qavat o'g'il bolalar (101…)
        room: String(floorOf(group) * 100 + 1 + Math.floor(n / 2)),
        sleep,
        wake: status === "uxladi" ? "06:30" : "",
        lesson: status === "uxladi" ? (i % 6 === 5 ? "08:20" : "08:00") : "",
        status,
        ...notSlept[i],
        // Xabar 5 soniyalik bekor qilish oynasidan keyin, o'sha daqiqada ketadi
        notifiedAt:
          status === "uxladi" ? sleep : status === "uxlamadi" ? notSlept[i].checkedAt : undefined,
      };
    });
})();

/** Bugungi smena (26–27 noyabr kechasi) — har guruhga navbatchi + yordamchi */
export const shift = {
  date: "26–27 noyabr",
  hours: shiftHours(),
  tutors: {
    qiz: { duty: "Malika Sobirova", assistant: "Feruza Aliyeva" },
    ogil: { duty: "Sherzod Nurmatov", assistant: "Ravshan Qosimov" },
  } satisfies Record<DormGroup, { duty: string; assistant: string }>,
};

type Pair = { duty: string; assistant: string };
const F = ["Malika Sobirova", "Feruza Aliyeva", "Gulnora Saidova"];
const M = ["Sherzod Nurmatov", "Ravshan Qosimov", "Dilmurod Xasanov"];
const pair = (list: string[], a: number, b: number): Pair => ({
  duty: list[a],
  assistant: list[b],
});

/** Haftalik smena jadvali: kun → qizlar va o'g'il bolalar guruhi tarbiyachilari */
export const shiftSchedule: { day: string; date: string; qiz: Pair; ogil: Pair }[] = [
  { day: "Dushanba", date: "23.11", qiz: pair(F, 0, 1), ogil: pair(M, 0, 1) },
  { day: "Seshanba", date: "24.11", qiz: pair(F, 1, 0), ogil: pair(M, 1, 2) },
  { day: "Chorshanba", date: "25.11", qiz: pair(F, 0, 2), ogil: pair(M, 2, 0) },
  { day: "Payshanba", date: "26.11", qiz: pair(F, 0, 1), ogil: pair(M, 0, 1) },
  { day: "Juma", date: "27.11", qiz: pair(F, 2, 0), ogil: pair(M, 1, 0) },
  { day: "Shanba", date: "28.11", qiz: pair(F, 1, 2), ogil: pair(M, 2, 1) },
  { day: "Yakshanba", date: "29.11", qiz: pair(F, 2, 1), ogil: pair(M, 0, 2) },
];
export const scheduleRange = "23–29 noyabr";

export type ProblemLevel = AlertLevel;

export const reasonLabel = (r?: NotSleptReason) => (r ? t.dorm.reasons[r] : "Sabab ko'rsatilmagan");

/** kutilmoqda — 5 soniyalik bekor qilish oynasi ichida (hali yuborilmagan) */
/** bekor — tarbiyachi oyna ichida bekor qildi, hech narsa yuborilmadi (jurnalda iz qoladi) */
export type DeliveryStatus = "kutilmoqda" | "yetkazildi" | "navbatda" | "xato" | "bekor";

const deliveries: { status: DeliveryStatus; attempts: number }[] = [
  { status: "yetkazildi", attempts: 1 },
  { status: "xato", attempts: 3 },
  { status: "navbatda", attempts: 2 },
];

/** Ota-onalarga yotoqxona xabarlari jurnali (eng yangisi tepada) */
export const dormMessageLog = dormStudents
  .filter((d) => d.notifiedAt)
  .map((d, i) => ({
    id: `m-${d.id}`,
    time: d.notifiedAt as string,
    student: d.fullName,
    parent: d.parent,
    event: d.status === "uxladi" ? t.dorm.markSlept : t.dorm.markNotSlept,
    ...(i % 5 === 3 ? deliveries[1] : i % 7 === 5 ? deliveries[2] : deliveries[0]),
  }))
  .sort((a, b) => nightOrder(b.time).localeCompare(nightOrder(a.time)))
  .slice(0, 8)
  // Eng yangi belgi hozirgina bosilgan: bekor qilish oynasi ichida, hali yuborilmagan
  .map((m, i) => (i === 0 ? { ...m, status: "kutilmoqda" as DeliveryStatus, attempts: 0 } : m))
  .flatMap((m, i) =>
    // Namuna: tarbiyachi avval xato "Uxlamadi" bosib, oyna ichida bekor qilgan, keyin "Uxladi" belgilagan
    i === 2 && m.event === t.dorm.markSlept
      ? [
          m,
          {
            ...m,
            id: `c-${m.id}`,
            event: t.dorm.markNotSlept,
            status: "bekor" as DeliveryStatus,
            attempts: 0,
          },
        ]
      : [m],
  );

// Bekor qilish oynasidagi belgi hali yuborilmagan — ro'yxatda ham xabar vaqti yo'q
for (const m of dormMessageLog) {
  const d = dormStudents.find((x) => `m-${x.id}` === m.id);
  if (d && m.status === "kutilmoqda") d.notifiedAt = undefined;
}

/** Muammolar ro'yxatidagi xabar holati — jurnaldagi haqiqiy holatdan */
function deliveryNote(d: DormStudent) {
  const m = dormMessageLog.find((x) => x.id === `m-${d.id}`);
  switch (m?.status) {
    case "kutilmoqda":
      return `Bekor qilish oynasida (${schoolConfig.dorm.undoSeconds} soniya) — xabar hali yuborilmagan.`;
    case "xato":
      return `Ota-onaga neytral xabar yetkazilmadi (${m.attempts} urinish) — qo'ng'iroq qilish kerak.`;
    case "navbatda":
      return `Ota-onaga neytral xabar qayta yuborilmoqda (${m.attempts}/3).`;
    default:
      return `Ota-onaga ${d.notifiedAt} da neytral xabar yetkazildi.`;
  }
}

/** Direktor ko'rinishi: bugungi muammolar — smena ro'yxatidan hisoblanadi */
export const dormProblems: {
  id: string;
  level: ProblemLevel;
  group: DormGroup;
  who: string;
  room: string;
  title: string;
  detail: string;
  /** Salomatlik izohi — faqat direktor va tarbiyachi uchun */
  privateNote?: string;
}[] = [
  ...dormStudents
    .filter((d) => d.status === "uxlamadi")
    .map((d) => ({
      id: `p-${d.id}`,
      level: "yuqori" as const,
      group: d.group,
      who: d.fullName,
      room: d.room,
      title: `Kechasi uxlamadi · ${d.checkedAt}`,
      detail: deliveryNote(d),
      privateNote: `${reasonLabel(d.reason)}. ${d.reasonNote ?? ""}`.trim(),
    })),
  ...schoolConfig.dorm.groups.flatMap(({ key }) => {
    const un = dormStudents.filter((d) => d.status === "belgilanmagan" && d.group === key);
    return un.length
      ? [
          {
            id: `p-unmarked-${key}`,
            level: "orta" as const,
            group: key,
            who: `${un.length} ta o'quvchi`,
            room: [...new Set(un.map((d) => d.room))].join(", "),
            title: "Belgilanmagan",
            detail: `Smena ${schoolConfig.dorm.shiftEnd} da tugaydi — tarbiyachiga eslatma yuborildi.`,
          },
        ]
      : [];
  }),
  ...dormStudents
    .filter((d) => d.sleep > "23:00")
    .map((d) => ({
      id: `l-${d.id}`,
      level: "past" as const,
      group: d.group,
      who: d.fullName,
      room: d.room,
      title: `Kech uxladi (${d.sleep})`,
      detail: "Haftada 3-marta 23:00 dan keyin.",
    })),
];

/** Bugungi holat guruhlar bo'yicha — yig'indisi Dashboard'dagi dormToday bilan bir xil (132 / 126 / 3 / 3) */
export const dormTodayByGroup: Record<
  DormGroup,
  { total: number; slept: number; notSlept: number; unmarked: number }
> = {
  qiz: { total: 64, slept: 61, notSlept: 2, unmarked: 1 },
  ogil: { total: 68, slept: 65, notSlept: 1, unmarked: 2 },
};
