// Bosqich 1: Sozlamalar mock ma'lumoti.
import { students } from "./data";
import { teachers } from "./people";

/** Yo'nalishlar va narxlar. Oylik to'lov = tanlangan 2 ta fan narxi (masalan English + IT = 1 800 000). */
export const subjectSettings = [
  { subject: "English", group: "Asosiy", price: 900_000, active: true },
  { subject: "Matematika", group: "Asosiy", price: 800_000, active: true },
  { subject: "IT", group: "Asosiy", price: 900_000, active: true },
  { subject: "SAT", group: "Asosiy", price: 1_200_000, active: true },
  { subject: "Kimyo", group: "Asosiy", price: 850_000, active: true },
  { subject: "Biologiya", group: "Asosiy", price: 850_000, active: true },
  { subject: "Rus tili", group: "Asosiy", price: 800_000, active: true },
  { subject: "Nemis tili", group: "Asosiy", price: 1_000_000, active: true },
].map((x) => ({
  ...x,
  teachers: teachers.filter((t) => t.subject === x.subject).length,
  students: students.filter((s) => (s.subjects as string[]).includes(x.subject)).length,
}));

export const primaryPackage = {
  name: "Prezident maktabiga tayyorlov",
  subjects: ["Matematika", "English", "Tanqidiy fikrlash", "Mantiqiy fikrlash"],
  price: 1_500_000,
};

export const telegramSettings = {
  botConnected: true,
  webhook: "Faol · oxirgi tekshiruv 08:00",
  directorLinked: true,
  parentsLinked: students.filter((s) => s.parent.telegramLinked).length,
  parentsTotal: students.length,
  notifications: [
    { key: "dorm", label: "Yotoqxona xabari", when: "Darhol (belgilanganda)", on: true },
    { key: "menu", label: "Haftalik menyu", when: "Yakshanba, 20:00", on: true },
    { key: "test", label: "Test natijasi", when: "Baholangach darhol", on: true },
    { key: "pay", label: "To'lov eslatmasi", when: "Har oy 3-sanada, 10:00", on: true },
    { key: "ai", label: "Haftalik AI tahlil", when: "Shanba, 18:00", on: true },
    {
      key: "director",
      label: "AI Xodim hisobotlari (direktorga)",
      when: "Kunlik 08:00 · haftalik yakshanba 21:00",
      on: true,
    },
  ],
};

export type Role =
  "direktor" | "admin" | "oqituvchi" | "tarbiyachi" | "oshpaz" | "otaona" | "oquvchi";

export const roles: { key: Role; label: string }[] = [
  { key: "direktor", label: "Direktor" },
  { key: "admin", label: "Admin / Buxgalter" },
  { key: "oqituvchi", label: "O'qituvchi" },
  { key: "tarbiyachi", label: "Tarbiyachi" },
  { key: "oshpaz", label: "Oshpaz" },
  { key: "otaona", label: "Ota-ona" },
  { key: "oquvchi", label: "O'quvchi" },
];

export const users: {
  id: string;
  fullName: string;
  role: Role;
  login: string;
  lastSeen: string;
  active: boolean;
}[] = [
  {
    id: "u1",
    fullName: "Maktab direktori",
    role: "direktor",
    login: "Login: direktor",
    lastSeen: "Hozir",
    active: true,
  },
  {
    id: "u2",
    fullName: "Shoira Xudoyberdiyeva",
    role: "admin",
    login: "+998 90 140 52 77",
    lastSeen: "Bugun, 09:12",
    active: true,
  },
  {
    id: "u3",
    fullName: "Nilufar Hasanova",
    role: "oqituvchi",
    login: "+998 90 311 22 41",
    lastSeen: "Bugun, 08:47",
    active: true,
  },
  {
    id: "u4",
    fullName: "Farhod Rasulov",
    role: "oqituvchi",
    login: "+998 97 102 77 63",
    lastSeen: "Kecha, 19:30",
    active: true,
  },
  {
    id: "u5",
    fullName: "Malika Sobirova",
    role: "tarbiyachi",
    login: "+998 97 533 20 48",
    lastSeen: "Bugun, 07:58",
    active: true,
  },
  {
    id: "u6",
    fullName: "Rahmatullo Ergashev",
    role: "oshpaz",
    login: "+998 99 610 72 15",
    lastSeen: "22.11, 20:00",
    active: true,
  },
  {
    id: "u7",
    fullName: "Dilnoza Karimova",
    role: "otaona",
    login: "Telegram orqali",
    lastSeen: "Bugun, 08:03",
    active: true,
  },
  {
    id: "u8",
    fullName: "Aziza Karimova",
    role: "oquvchi",
    login: "Login: aziza.k",
    lastSeen: "Kecha, 18:05",
    active: true,
  },
  {
    id: "u9",
    fullName: "Gulnora Saidova",
    role: "tarbiyachi",
    login: "+998 93 410 18 66",
    lastSeen: "—",
    active: false,
  },
];

/** Ruxsatlar matritsasi (PLAN 2-bo'lim). "own" — faqat o'ziga tegishli ma'lumot */
export type Access = "full" | "own" | "none";
export const permissions: { section: string; access: Record<Role, Access> }[] = [
  {
    section: "Dashboard va hisobotlar",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "none",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "none",
      oquvchi: "none",
    },
  },
  {
    section: "O'quvchilar ro'yxati",
    access: {
      direktor: "full",
      admin: "full",
      oqituvchi: "own",
      tarbiyachi: "own",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "none",
    },
  },
  {
    section: "Moliya",
    access: {
      direktor: "full",
      admin: "full",
      oqituvchi: "none",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "none",
    },
  },
  {
    section: "Xodimlar va oyliklar",
    access: {
      direktor: "full",
      admin: "full",
      oqituvchi: "own",
      tarbiyachi: "own",
      oshpaz: "own",
      otaona: "none",
      oquvchi: "none",
    },
  },
  {
    section: "Yotoqxona",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "none",
      tarbiyachi: "full",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "none",
    },
  },
  {
    section: "IQ (psixometrik baho)",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "none",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "none",
      oquvchi: "none",
    },
  },
  {
    section: "Salomatlik izohlari",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "none",
      tarbiyachi: "full",
      oshpaz: "none",
      otaona: "none",
      oquvchi: "none",
    },
  },
  {
    section: "Oshxona menyusi",
    access: {
      direktor: "full",
      admin: "full",
      oqituvchi: "none",
      tarbiyachi: "none",
      oshpaz: "full",
      otaona: "own",
      oquvchi: "own",
    },
  },
  {
    section: "Testlar",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "own",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "own",
    },
  },
  // Ota-ona: o'z farzandining o'rganish uslubi va tavsiyalari (IQsiz)
  {
    section: "AI Markaz",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "own",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "own",
    },
  },
  {
    section: "AI mentorlar",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "own",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "own",
      oquvchi: "own",
    },
  },
  {
    section: "Sozlamalar",
    access: {
      direktor: "full",
      admin: "none",
      oqituvchi: "none",
      tarbiyachi: "none",
      oshpaz: "none",
      otaona: "none",
      oquvchi: "none",
    },
  },
];
