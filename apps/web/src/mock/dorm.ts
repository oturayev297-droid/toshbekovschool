// Bosqich 1: Yotoqxona mock ma'lumoti. Ismlar to'qima.
import { type AlertLevel, type DormStatus, students } from "./data";

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
  /** Ota-onaga xabar yuborilgan vaqt (belgilangan bo'lsa) */
  notifiedAt?: string;
};

const sleepTimes = ["21:55", "22:05", "22:10", "22:20", "22:00", "22:15", "23:20", "22:05"];
const rooms = ["101", "101", "102", "102", "103", "103", "104", "104", "105", "105"];

/** Bugungi kechki smena: yotoqxonadagi o'quvchilar */
export const dormStudents: DormStudent[] = students
  .filter((s) => s.dorm)
  .map((s, i) => {
    const status: DormStatus =
      i === 1 || i === 9 || i === 14 ? "uxlamadi" : i % 7 === 4 ? "belgilanmagan" : "uxladi";
    return {
      id: s.id,
      parent: s.parent.fullName,
      fullName: s.fullName,
      grade: s.grade,
      room: rooms[i % rooms.length],
      sleep: status === "uxladi" ? sleepTimes[i % sleepTimes.length] : "",
      wake: status === "uxladi" ? "06:30" : "",
      lesson: status === "uxladi" ? (i % 6 === 5 ? "08:20" : "08:00") : "",
      status,
      notifiedAt: status === "belgilanmagan" ? undefined : `22:${String(10 + i).padStart(2, "0")}`,
    };
  });

export const shift = {
  name: "Tungi smena",
  hours: "20:00 – 08:00",
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

const notesNotSlept = [
  "Tarbiyachi izohi: tish og'rig'i, tibbiyot xonasiga olib borildi.",
  "Ketma-ket 2-kecha. Psixolog suhbati tavsiya etiladi.",
  "Tarbiyachi izohi: imtihondan xavotirda, suhbatlashildi.",
];

/** Direktor ko'rinishi: bugungi muammolar — smena ro'yxatidan hisoblanadi */
export const dormProblems: {
  id: string;
  level: ProblemLevel;
  who: string;
  room: string;
  title: string;
  detail: string;
}[] = [
  ...dormStudents
    .filter((d) => d.status === "uxlamadi")
    .map((d, i) => ({
      id: `p-${d.id}`,
      level: "yuqori" as const,
      who: d.fullName,
      room: d.room,
      title: "Kechasi uxlamadi",
      detail: `${notesNotSlept[i % notesNotSlept.length]} Ota-onaga ${d.notifiedAt} da xabar yuborildi.`,
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
  .sort((a, b) => b.time.localeCompare(a.time))
  .slice(0, 8);

/** Oxirgi 7 kecha: uxlaganlar ulushi, % */
export const dormWeek = [
  { day: "Ju", foiz: 97 },
  { day: "Sh", foiz: 98 },
  { day: "Ya", foiz: 96 },
  { day: "Du", foiz: 97 },
  { day: "Se", foiz: 95 },
  { day: "Ch", foiz: 96 },
  { day: "Pa", foiz: 95 },
];
