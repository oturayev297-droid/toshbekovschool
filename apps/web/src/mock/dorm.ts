// Bosqich 1: Yotoqxona mock ma'lumoti. Ismlar to'qima.
import { type AlertLevel, type DormStatus, students } from "./data";

/** "Uxlamadi" sababi — tez tanlash tugmalari */
export const notSleptReasons = [
  { value: "tish", label: "Tish og'rig'i" },
  { value: "uyqusizlik", label: "Uyqusizlik" },
  { value: "salomatlik", label: "Sog'lig'i" },
  { value: "boshqa", label: "Boshqa" },
] as const;
export type NotSleptReason = (typeof notSleptReasons)[number]["value"];

export type DormStudent = {
  id: string;
  fullName: string;
  parent: string;
  grade: string;
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
  /** Ota-onaga xabar yuborilgan vaqt (belgilangan bo'lsa) */
  notifiedAt?: string;
};

/** "HH:MM" ga daqiqa qo'shish (yarim tundan o'tishni hisobga oladi) */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(":").map(Number);
  const t = (h * 60 + m + minutes + 24 * 60) % (24 * 60);
  return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
}

/** Tungi smena ichida tartiblash kaliti: 22:00 → 23:59, keyin 00:00 → 08:00 */
export const nightOrder = (time: string) => (time < "12:00" ? `1${time}` : `0${time}`);

const sleepTimes = ["22:25", "22:05", "22:10", "22:20", "22:00", "22:15", "23:20", "22:05"];
const rooms = ["101", "101", "102", "102", "103", "103", "104", "104", "105", "105"];
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

/** Bugungi tungi smena: yotoqxonadagi o'quvchilar */
export const dormStudents: DormStudent[] = students
  .filter((s) => s.dorm)
  .map((s, i) => {
    const status: DormStatus = notSlept[i] ? "uxlamadi" : i % 7 === 4 ? "belgilanmagan" : "uxladi";
    const sleep = status === "uxladi" ? sleepTimes[i % sleepTimes.length] : "";
    return {
      id: s.id,
      parent: s.parent.fullName,
      fullName: s.fullName,
      grade: s.grade,
      room: rooms[i % rooms.length],
      sleep,
      wake: status === "uxladi" ? "06:30" : "",
      lesson: status === "uxladi" ? (i % 6 === 5 ? "08:20" : "08:00") : "",
      status,
      ...notSlept[i],
      // Xabar belgilangandan 1 daqiqa ichida ketadi
      notifiedAt:
        status === "uxladi"
          ? addMinutes(sleep, 1)
          : status === "uxlamadi"
            ? addMinutes(notSlept[i].checkedAt as string, 1)
            : undefined,
    };
  });

export const shift = {
  name: "Tungi smena",
  hours: "22:00 – 08:00",
  date: "26–27 noyabr",
  tutor: "Malika Sobirova",
};

/** Haftalik smena jadvali: kun × smena → tarbiyachi */
export const shiftSchedule = [
  { day: "Dushanba", date: "23.11", duty: "Malika Sobirova", assistant: "Feruza Aliyeva" },
  { day: "Seshanba", date: "24.11", duty: "Feruza Aliyeva", assistant: "Malika Sobirova" },
  { day: "Chorshanba", date: "25.11", duty: "Malika Sobirova", assistant: "Gulnora Saidova" },
  { day: "Payshanba", date: "26.11", duty: "Malika Sobirova", assistant: "Feruza Aliyeva" },
  { day: "Juma", date: "27.11", duty: "Gulnora Saidova", assistant: "Malika Sobirova" },
  { day: "Shanba", date: "28.11", duty: "Feruza Aliyeva", assistant: "Gulnora Saidova" },
  { day: "Yakshanba", date: "29.11", duty: "Gulnora Saidova", assistant: "Feruza Aliyeva" },
];

export type ProblemLevel = AlertLevel;

export const reasonLabel = (r?: NotSleptReason) =>
  notSleptReasons.find((x) => x.value === r)?.label ?? "Sabab ko'rsatilmagan";

/** Direktor ko'rinishi: bugungi muammolar — smena ro'yxatidan hisoblanadi */
export const dormProblems: {
  id: string;
  level: ProblemLevel;
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
      who: d.fullName,
      room: d.room,
      title: `Kechasi uxlamadi · ${d.checkedAt}`,
      detail: `Ota-onaga ${d.notifiedAt} da neytral xabar yuborildi.`,
      privateNote: `${reasonLabel(d.reason)}. ${d.reasonNote ?? ""}`.trim(),
    })),
  (() => {
    const un = dormStudents.filter((d) => d.status === "belgilanmagan");
    return {
      id: "p-unmarked",
      level: "orta" as const,
      who: `${un.length} ta o'quvchi`,
      room: [...new Set(un.map((d) => d.room))].join(", "),
      title: "Belgilanmagan",
      detail: "Smena tugashiga 1 soat qoldi — tarbiyachiga eslatma yuborildi.",
    };
  })(),
  ...dormStudents
    .filter((d) => d.sleep > "23:00")
    .map((d) => ({
      id: `l-${d.id}`,
      level: "past" as const,
      who: d.fullName,
      room: d.room,
      title: `Kech uxladi (${d.sleep})`,
      detail: "Haftada 3-marta 23:00 dan keyin.",
    })),
];

export type DeliveryStatus = "yetkazildi" | "navbatda" | "xato";

const deliveries: { status: DeliveryStatus; attempts: number }[] = [
  { status: "yetkazildi", attempts: 1 },
  { status: "xato", attempts: 3 },
  { status: "yetkazildi", attempts: 1 },
  { status: "navbatda", attempts: 2 },
];

/** Ota-onalarga yuborilgan yotoqxona xabarlari jurnali (eng yangisi tepada) */
export const dormMessageLog = dormStudents
  .filter((d) => d.notifiedAt)
  .map((d, i) => ({
    id: `m-${d.id}`,
    time: d.notifiedAt as string,
    student: d.fullName,
    parent: d.parent,
    event: d.status === "uxladi" ? "Uxladi" : "Uxlamadi",
    ...(i % 5 === 3 ? deliveries[1] : i % 7 === 5 ? deliveries[3] : deliveries[0]),
  }))
  .sort((a, b) => nightOrder(b.time).localeCompare(nightOrder(a.time)))
  .slice(0, 8);
