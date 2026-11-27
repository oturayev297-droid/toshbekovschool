// Bosqich 1: Oshxona mock ma'lumoti.

export const meals = [
  { key: "breakfast", label: "Nonushta", time: "07:15" },
  { key: "lunch", label: "Tushlik", time: "13:00" },
  { key: "snack", label: "Tushki", time: "16:30" },
  { key: "dinner", label: "Kechki", time: "19:00" },
] as const;
export type MealKey = (typeof meals)[number]["key"];

export type DayMenu = {
  day: string;
  short: string;
  /** ISO sana — "bugun" belgisi uchun */
  date: string;
} & Record<MealKey, string>;

export type WeekMenu = {
  id: string;
  range: string;
  author: string;
  sentAt?: string;
  sentTo?: number;
  days: DayMenu[];
};

export const currentWeek: WeekMenu = {
  id: "w48",
  range: "23–29 noyabr 2026",
  author: "Rahmatullo Ergashev (bosh oshpaz)",
  sentAt: "22.11.2026, 20:00",
  sentTo: 186,
  days: [
    {
      day: "Dushanba",
      short: "Du",
      date: "2026-11-23",
      breakfast: "Sutli guruch bo'tqa, non, choy",
      lunch: "Mastava, sabzavotli salat",
      snack: "Olma, pechenye",
      dinner: "Palov, achchiq-chuchuk",
    },
    {
      day: "Seshanba",
      short: "Se",
      date: "2026-11-24",
      breakfast: "Omlet, pishloq, non, choy",
      lunch: "Shovla, karam salati",
      snack: "Banan, kefir",
      dinner: "Manti, qatiq",
    },
    {
      day: "Chorshanba",
      short: "Ch",
      date: "2026-11-25",
      breakfast: "Suli bo'tqa, asal, choy",
      lunch: "Moshxo'rda, vinegret",
      snack: "Nok, yong'oqli bulochka",
      dinner: "Tovuq go'shti, grechka, salat",
    },
    {
      day: "Payshanba",
      short: "Pa",
      date: "2026-11-26",
      breakfast: "Tvorog, smetana, non, choy",
      lunch: "Lag'mon, sabzavotli salat",
      snack: "Mandarin, sut",
      dinner: "Dimlama, non",
    },
    {
      day: "Juma",
      short: "Ju",
      date: "2026-11-27",
      breakfast: "Manniy bo'tqa, mayiz, choy",
      lunch: "Sho'rva, tomat salati",
      snack: "Olma, qatiq",
      dinner: "Osh (to'y oshi), achchiq-chuchuk",
    },
    {
      day: "Shanba",
      short: "Sh",
      date: "2026-11-28",
      breakfast: "Quymoq, murabbo, choy",
      lunch: "Chuchvara sho'rva, salat",
      snack: "Uzum, pechenye",
      dinner: "Kabob (tovuq), kartoshka pyuresi",
    },
    {
      day: "Yakshanba",
      short: "Ya",
      date: "2026-11-29",
      breakfast: "Tuxum, pishloq, non, choy",
      lunch: "Norin, sabzavotli salat",
      snack: "Banan, kompot",
      dinner: "Qovurma lag'mon, salat",
    },
  ],
};

/** Kiritish formasi uchun: keyingi hafta qoralamasi (qisman to'ldirilgan) */
export const nextWeekDraft: WeekMenu = {
  id: "w49",
  range: "30 noyabr – 6 dekabr 2026",
  author: "Rahmatullo Ergashev (bosh oshpaz)",
  days: [
    {
      day: "Dushanba",
      short: "Du",
      date: "2026-11-30",
      breakfast: "Sutli guruch bo'tqa, non, choy",
      lunch: "Mastava, salat",
      snack: "Olma, pechenye",
      dinner: "Palov, achchiq-chuchuk",
    },
    {
      day: "Seshanba",
      short: "Se",
      date: "2026-12-01",
      breakfast: "Omlet, non, choy",
      lunch: "Moshxo'rda",
      snack: "Banan, kefir",
      dinner: "Manti, qatiq",
    },
    {
      day: "Chorshanba",
      short: "Ch",
      date: "2026-12-02",
      breakfast: "Suli bo'tqa, asal",
      lunch: "",
      snack: "",
      dinner: "",
    },
    {
      day: "Payshanba",
      short: "Pa",
      date: "2026-12-03",
      breakfast: "",
      lunch: "",
      snack: "",
      dinner: "",
    },
    {
      day: "Juma",
      short: "Ju",
      date: "2026-12-04",
      breakfast: "",
      lunch: "",
      snack: "",
      dinner: "",
    },
    {
      day: "Shanba",
      short: "Sh",
      date: "2026-12-05",
      breakfast: "",
      lunch: "",
      snack: "",
      dinner: "",
    },
    {
      day: "Yakshanba",
      short: "Ya",
      date: "2026-12-06",
      breakfast: "",
      lunch: "",
      snack: "",
      dinner: "",
    },
  ],
};

/** Eski haftalar arxivi (qisqa) */
export const menuArchive = [
  {
    id: "w47",
    range: "16–22 noyabr 2026",
    author: "R. Ergashev",
    sentAt: "15.11.2026, 20:00",
    sentTo: 184,
    highlight: "Palov, lag'mon, norin",
  },
  {
    id: "w46",
    range: "9–15 noyabr 2026",
    author: "R. Ergashev",
    sentAt: "08.11.2026, 20:00",
    sentTo: 184,
    highlight: "Mastava, dimlama, manti",
  },
  {
    id: "w45",
    range: "2–8 noyabr 2026",
    author: "N. Qosimova",
    sentAt: "01.11.2026, 20:05",
    sentTo: 181,
    highlight: "Shovla, chuchvara, kabob",
  },
  {
    id: "w44",
    range: "26 oktabr – 1 noyabr 2026",
    author: "R. Ergashev",
    sentAt: "25.10.2026, 20:00",
    sentTo: 180,
    highlight: "Sho'rva, palov, qovurma lag'mon",
  },
];
