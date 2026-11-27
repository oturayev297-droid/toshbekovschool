// Bosqich 1: AI Markaz, AI Mentor va AI Xodim uchun mock. Haqiqiy tahlil 9–11-bosqichlarda Claude API bilan.
import { mentorActivity, type Student, type Subject, students } from "./data";
import { dormStudents } from "./dorm";
import { topicsBySubject } from "./tests";

const clamp = (n: number) => Math.max(35, Math.min(98, n));

export type Mastery = "ozlashtirilgan" | "jarayonda" | "zaif";
export const masteryOf = (p: number): Mastery =>
  p >= 80 ? "ozlashtirilgan" : p >= 65 ? "jarayonda" : "zaif";

const levelBySubject: Partial<Record<Subject, (avg: number) => string>> = {
  English: (a) => (a >= 85 ? "B2" : a >= 72 ? "B1 → B2" : "A2 → B1"),
  "Nemis tili": (a) => (a >= 85 ? "B1" : a >= 72 ? "A2 → B1" : "A1 → A2"),
  "Rus tili": (a) => (a >= 85 ? "B2" : a >= 72 ? "B1" : "A2"),
  SAT: (a) => `≈ ${Math.round(900 + a * 6)} ball`,
};
const levelOf = (subject: Subject, avg: number) =>
  levelBySubject[subject]?.(avg) ?? (avg >= 85 ? "Yuqori" : avg >= 72 ? "O'rta+" : "O'rta");

const goalBySubject: Partial<Record<Subject, string>> = {
  English: "IELTS 6.5",
  SAT: "SAT 1350+",
  Matematika: "DTM matematika 80%+",
  IT: "Python asoslari sertifikati",
  Kimyo: "Olimpiada (viloyat) bosqichi",
  Biologiya: "Tibbiyot OTM testi 75%+",
  "Rus tili": "TORFL B2",
  "Nemis tili": "Goethe B1",
};

/** Har fanga bitta namunaviy xato (xatolar tahlili uchun) */
const mistakeBank: Record<
  Subject,
  { question: string; answer: string; correct: string; why: string; fix: string }
> = {
  English: {
    question: "She ___ in London since 2019.",
    answer: "lived",
    correct: "has lived",
    why: "“since” bilan o'tmishda boshlanib hozirgacha davom etayotgan holat — Present Perfect.",
    fix: "since/for so'zlarini ko'rsangiz, avval Present Perfect'ni tekshiring. 10 ta mashq tayyorlandi.",
  },
  Matematika: {
    question: "x² − 4x + 5 = 0 tenglamaning ildizlari?",
    answer: "x = 1; x = 5",
    correct: "Haqiqiy ildiz yo'q (D < 0)",
    why: "Diskriminant hisoblanmasdan ko'paytuvchilarga ajratishga urinilgan.",
    fix: "Har doim avval D = b² − 4ac ni hisoblang. D < 0 bo'lgan 6 ta misol berildi.",
  },
  IT: {
    question: "for i in range(1, 5): print(i) — nechta son chiqadi?",
    answer: "5",
    correct: "4 (1, 2, 3, 4)",
    why: "range() ning oxirgi qiymati kirmasligi esdan chiqqan.",
    fix: "range(a, b) — a dan b−1 gacha. Vizual jadval bilan 8 ta mashq.",
  },
  SAT: {
    question: "Reading: muallifning asosiy da'vosini tasdiqlovchi dalil?",
    answer: "B qator (misol)",
    correct: "D qator (xulosa)",
    why: "Misol dalil sifatida tanlangan, lekin u da'voni to'g'ridan-to'g'ri tasdiqlamaydi.",
    fix: "Avval da'voni o'z so'zingiz bilan yozing, keyin uni aynan tasdiqlovchi qatorni qidiring.",
  },
  Kimyo: {
    question: "2 mol H₂O massasi?",
    answer: "18 g",
    correct: "36 g",
    why: "Molyar massa mol soniga ko'paytirilmagan.",
    fix: "m = n · M formulasini yozib, birliklar bilan hisoblang. 5 ta masala.",
  },
  Biologiya: {
    question: "Fotosintezning yorug'lik bosqichi qayerda boradi?",
    answer: "Stromada",
    correct: "Tilakoid membranasida",
    why: "Yorug'lik va qorong'ilik bosqichlari joylari almashtirilgan.",
    fix: "Xloroplast sxemasini chizib, har bosqich joyini belgilang.",
  },
  "Rus tili": {
    question: "Я иду ___ школу.",
    answer: "на",
    correct: "в",
    why: "Bino/muassasa uchun «в», tadbir uchun «на» ishlatiladi.",
    fix: "«в/на» juftliklari ro'yxati va 12 ta gap.",
  },
  "Nemis tili": {
    question: "Ich ___ gestern ins Kino gegangen.",
    answer: "habe",
    correct: "bin",
    why: "Harakat fe'llari (gehen) Perfekt'da «sein» bilan.",
    fix: "Bewegungsverben ro'yxati va 10 ta gap.",
  },
};

/**
 * Profilida aniq ma'lumot bor o'quvchilar (s-001: subjectDetails, testList, mentor suhbati).
 * Mavzular tartibi topicsBySubject bilan bir xil.
 */
const knownSubjects: Record<
  string,
  Partial<Record<Subject, { avg: number; level: string; topics: number[] }>>
> = {
  "s-001": {
    // English: Present Perfect 84, Vocabulary — Unit 6 88 (testList)
    English: { avg: 84, level: "B1 → B2", topics: [84, 88, 76, 62] },
    // IT: Sikllar 67 (testList), profilda "Boshlang'ich"
    IT: { avg: 64, level: "Boshlang'ich", topics: [67, 74, 58, 55] },
  },
};

/** Haftalik mentor vaqti: s-001 uchun profildagi mentorActivity yig'indisi (130 + 70 = 200 daq) */
function mentorMinutes(id: string, seed: number) {
  const total =
    id === "s-001"
      ? mentorActivity.reduce((a, m) => a + m.minutes, 0)
      : 120 + (seed % 3) * 60 + 10 * (seed % 6);
  return `${Math.floor(total / 60)} soat ${total % 60} daq / hafta`;
}

/** O'quvchi uchun AI tahlil profili (deterministik, o'quvchi ma'lumotidan) */
export function aiProfile(s: Student) {
  const seed = parseInt(s.id.slice(2), 10);
  const dorm = dormStudents.find((d) => d.id === s.id);

  const subjects = s.subjects.map((subject, si) => {
    // Profil va test natijalari bor o'quvchida o'sha raqamlar ishlatiladi
    const known = knownSubjects[s.id]?.[subject];
    const avg = known?.avg ?? clamp(s.avgScore + (si === 0 ? 2 : -8) + (seed % 3));
    const topics = topicsBySubject[subject].map((topic, ti) => {
      const p = known?.topics[ti] ?? clamp(avg + [5, -4, 3, -14][ti % 4] + ((seed + ti) % 5));
      return { topic, percent: p, mastery: masteryOf(p) };
    });
    return {
      subject,
      avg,
      level: known?.level ?? levelOf(subject, avg),
      goal: goalBySubject[subject] ?? "Yillik dastur",
      // Maqsad muddati: o'rtacha ball qancha past bo'lsa, shuncha uzoq (taxminiy)
      goalMonths: [
        Math.max(3, Math.round((92 - avg) / 3)),
        Math.max(5, Math.round((92 - avg) / 3) + 3),
      ] as const,
      topics,
    };
  });

  const allTopics = subjects.flatMap((x) => x.topics.map((t) => ({ ...t, subject: x.subject })));
  const sorted = [...allTopics].sort((a, b) => b.percent - a.percent);
  const weak = sorted
    .filter((t) => t.mastery !== "ozlashtirilgan")
    .slice(-3)
    .reverse();

  const sleptNights = dorm ? (dorm.status === "uxlamadi" ? 5 : 7 - (seed % 2)) : null;

  return {
    subjects,
    strengths: [
      ...sorted
        .slice(0, 2)
        .map((t) => `${t.subject}: «${t.topic}» mavzusini yaxshi o'zlashtirgan (${t.percent}%)`),
      seed % 2 ? "Testlarni vaqtidan oldin, xotirjam yakunlaydi" : "Darslarga muntazam qatnashadi",
      "AI mentor bilan mustaqil ishlashga qiziqishi bor",
    ],
    growth: weak.map(
      (t) => `${t.subject}: «${t.topic}» — ${t.percent}%, qo'shimcha mashq tavsiya etiladi`,
    ),
    behavior: [
      {
        label: "Uyqu tartibi",
        value: sleptNights === null ? "Yotoqxonada emas" : `${sleptNights}/7 kecha o'z vaqtida`,
        tone: sleptNights === null || sleptNights >= 6 ? ("good" as const) : ("watch" as const),
      },
      { label: "Davomat", value: `${96 - (seed % 4)}%`, tone: "good" as const },
      {
        label: "Test faolligi",
        value: `${8 - (seed % 3)}/9 topshirildi`,
        tone: seed % 3 === 2 ? ("watch" as const) : ("good" as const),
      },
      {
        label: "AI mentor",
        value: mentorMinutes(s.id, seed),
        tone: "good" as const,
      },
    ],
    behaviorSummary:
      sleptNights !== null && sleptNights < 6
        ? "Bu hafta uyqu tartibi biroz buzilgan — bu test natijalariga ta'sir qilishi mumkin. Tarbiyachi bilan birga kechki tartibni yengillashtirish tavsiya etiladi."
        : "Kun tartibi barqaror, darslarga va testlarga faol qatnashmoqda. Hozirgi ritmni saqlash tavsiya etiladi.",
    // IQ — psixometrik baho, qat'iy hukm emas (PLAN 3.6). Oraliq sifatida ko'rsatiladi.
    iqRange: [100 + (seed % 4) * 3, 112 + (seed % 4) * 3] as const,
    plan: ["Du", "Se", "Ch", "Pa", "Ju", "Sh"].map((day, i) => {
      const t = weak[i % Math.max(1, weak.length)] ?? allTopics[i % allTopics.length];
      const kinds = [
        "Video dars + 10 ta mashq",
        "AI mentor bilan suhbat",
        "Moslashgan mini-test",
        "Xatolar ustida ishlash",
        "Takrorlash kartochkalari",
        "Haftalik nazorat testi",
      ];
      return {
        day,
        subject: t.subject,
        topic: t.topic,
        task: kinds[i],
        minutes: [30, 25, 20, 30, 15, 40][i],
      };
    }),
    adaptiveTest: {
      subject: weak[0]?.subject ?? s.subjects[0],
      topic: weak[0]?.topic ?? topicsBySubject[s.subjects[0]][0],
      level: weak[0] && weak[0].percent < 65 ? "1-daraja (asos)" : "2-daraja (mustahkamlash)",
      mix: { oson: 6, orta: 8, qiyin: 3 },
      minutes: 20,
    },
    mistakes: s.subjects.map((subject) => ({ subject, ...mistakeBank[subject] })),
  };
}

export type AiProfile = ReturnType<typeof aiProfile>;

// --- AI Mentor ---

export const primaryMentors = ["Matematika", "English", "Tanqidiy fikrlash", "Mantiqiy fikrlash"];

export const mentorChat: Record<
  string,
  { from: "mentor" | "student"; text: string; time: string }[]
> = {
  English: [
    {
      from: "mentor",
      time: "18:02",
      text: "Salom, Aziza! Present Perfect testida 84 ball oldingiz — yaxshi natija. Bugun «since» va «for» farqini mustahkamlaymizmi?",
    },
    { from: "student", time: "18:03", text: "Ha. Qachon «since», qachon «for» ishlatiladi?" },
    {
      from: "mentor",
      time: "18:03",
      text: "«for» — davomiylik: for 3 years.\n«since» — boshlanish nuqtasi: since 2019.\n\nSinab ko'ring: I have studied English ___ two years.",
    },
    { from: "student", time: "18:05", text: "for" },
    {
      from: "mentor",
      time: "18:05",
      text: "To'g'ri! 👏 Endi qiyinroq: She has been here ___ Monday.",
    },
  ],
  IT: [
    {
      from: "mentor",
      time: "17:40",
      text: "Salom! Sikllar mavzusida 67 ball — keling, range() ni birga ko'rib chiqamiz.",
    },
    { from: "student", time: "17:41", text: "range(1, 5) nega 5 ni chiqarmaydi?" },
    {
      from: "mentor",
      time: "17:42",
      text: "range(a, b) — a dan boshlab b gacha, lekin b kirmaydi. Shuning uchun 1, 2, 3, 4.\n\nrange(0, 10, 2) nimani beradi?",
    },
  ],
};

// --- AI Xodim hisobotlari ---

export type ReportPeriod = "kunlik" | "haftalik" | "oylik" | "yillik";

export const aiReports: Record<
  ReportPeriod,
  {
    title: string;
    generatedAt: string;
    sentAt: string;
    metrics: { label: string; value: string; delta?: string; tone?: "up" | "down" | "muted" }[];
    summary: string;
    anomalies: { level: "yuqori" | "orta" | "past"; text: string }[];
    actions: string[];
    telegram: string;
    archive: { id: string; title: string; sentAt: string }[];
  }
> = {
  kunlik: {
    title: "Kunlik hisobot · 27-noyabr 2026, juma",
    generatedAt: "08:00",
    sentAt: "08:01",
    metrics: [
      { label: "Davomat", value: "94,2%", delta: "−1,3%", tone: "down" },
      { label: "Bugungi to'lovlar", value: "6,3 mln", delta: "4 ta to'lov", tone: "muted" },
      { label: "Yotoqxona", value: "126/132", delta: "3 uxlamadi", tone: "down" },
      { label: "Testlar", value: "38 ta", delta: "o'rtacha 77", tone: "muted" },
    ],
    summary:
      "Kun barqaror boshlandi. Davomat kechagidan biroz past (9-B sinfda 3 nafar sababli). Yotoqxonada 3 o'quvchi kechasi uxlamagan — ota-onalarga neytral xabar yuborilgan, tarbiyachi nazoratida.",
    anomalies: [
      {
        level: "yuqori",
        text: "12 ta o'quvchida qarzdorlik, jami 24,7 mln so'm (4 tasi 2 oydan beri).",
      },
      {
        level: "orta",
        text: "1 ta yotoqxona xabari 3 urinishda yetkazilmadi — ota-onaning Telegram ulanishini tekshirish kerak.",
      },
      { level: "past", text: "10-B sinfda Matematika o'rtachasi 81 → 69 ga tushgan." },
    ],
    actions: [
      "Qarzdorlarga eslatma yuborish (Moliya → Qarzdorlar)",
      "Yetkazilmagan xabar uchun ota-ona bilan qo'ng'iroq orqali bog'lanish",
    ],
    telegram:
      "📊 Kunlik hisobot · 27-noyabr\n\nDavomat: 94,2% (−1,3%)\nTushum bugun: 6,3 mln so'm\nYotoqxona: 126/132 uxladi\n\n⚠️ 12 ta qarzdor — 24,7 mln\n⚠️ 1 ta xabar yetkazilmadi",
    archive: [
      { id: "d26", title: "26-noyabr, payshanba", sentAt: "08:01" },
      { id: "d25", title: "25-noyabr, chorshanba", sentAt: "08:00" },
      { id: "d24", title: "24-noyabr, seshanba", sentAt: "08:02" },
    ],
  },
  haftalik: {
    title: "Haftalik hisobot · 16–22 noyabr 2026",
    generatedAt: "Yakshanba, 21:00",
    sentAt: "21:01",
    metrics: [
      { label: "O'rtacha davomat", value: "95,1%", delta: "+0,4%", tone: "up" },
      { label: "Haftalik tushum", value: "96,8 mln", delta: "+5%", tone: "up" },
      { label: "Uxlagan kechalar", value: "96%", delta: "barqaror", tone: "muted" },
      { label: "O'rtacha test bali", value: "76", delta: "+3", tone: "up" },
    ],
    summary:
      "Hafta ijobiy yakunlandi: test natijalari 3 ballga o'sdi, davomat barqaror. IT fanida «Sikllar» mavzusi ko'pchilik uchun qiyin bo'lmoqda — qo'shimcha dars tavsiya etiladi.",
    anomalies: [
      { level: "orta", text: "IT: «Sikllar» mavzusi o'rtachasi 66 — 3 ta guruhda 70 dan past." },
      { level: "past", text: "Oshxona xarajati rejadan 4% yuqori (meva narxi oshgan)." },
    ],
    actions: [
      "IT o'qituvchisi bilan qo'shimcha dars rejasini kelishish",
      "Oshxona menyusida mavsumiy mevalarga o'tish",
    ],
    telegram:
      "📈 Haftalik hisobot · 16–22 noyabr\n\nDavomat: 95,1% (+0,4%)\nTushum: 96,8 mln (+5%)\nTest o'rtachasi: 76 (+3)\n\n🔎 IT «Sikllar» — 66 ball\n💡 Qo'shimcha dars tavsiya etiladi",
    archive: [
      { id: "w46", title: "9–15 noyabr", sentAt: "15.11, 21:00" },
      { id: "w45", title: "2–8 noyabr", sentAt: "08.11, 21:00" },
    ],
  },
  oylik: {
    title: "Oylik hisobot · Oktabr 2026",
    generatedAt: "1-noyabr, 09:00",
    sentAt: "09:02",
    metrics: [
      { label: "Tushum", value: "396 mln", delta: "+2%", tone: "up" },
      { label: "Chiqim", value: "279 mln", delta: "−1%", tone: "up" },
      { label: "Sof foyda", value: "117 mln", delta: "+8%", tone: "up" },
      { label: "Qarzdorlik", value: "21,9 mln", delta: "11 ta", tone: "down" },
    ],
    summary:
      "Oktabr moliyaviy jihatdan barqaror: sof foyda 117 mln so'm. Oyliklar o'z vaqtida to'landi. Qarzdorlik sentabrga nisbatan kamaydi, lekin 3 oila 2 oydan beri to'lamagan.",
    anomalies: [
      { level: "orta", text: "3 oila 2 oydan beri to'lamagan — individual suhbat kerak." },
      { level: "past", text: "Kommunal xarajat +12% (isitish mavsumi boshlandi)." },
    ],
    actions: [
      "Qarzdor oilalar bilan uchrashuv belgilash",
      "Qishki kommunal byudjetini qayta ko'rib chiqish",
    ],
    telegram:
      "🗓 Oylik hisobot · Oktabr\n\nTushum: 396 mln (+2%)\nChiqim: 279 mln\nSof foyda: 117 mln (+8%)\nQarzdorlik: 21,9 mln · 11 ta\n\n⚠️ 3 oila 2 oydan beri to'lamagan",
    archive: [
      { id: "m09", title: "Sentabr 2026", sentAt: "01.10, 09:00" },
      { id: "m08", title: "Avgust 2026", sentAt: "01.09, 09:00" },
    ],
  },
  yillik: {
    title: "Yillik hisobot · 2025–2026 o'quv yili",
    generatedAt: "1-iyul 2026, 10:00",
    sentAt: "10:05",
    metrics: [
      { label: "O'quvchilar", value: "236 → 248", delta: "+5%", tone: "up" },
      { label: "Yillik tushum", value: "4,31 mlrd", delta: "+14%", tone: "up" },
      { label: "O'rtacha davomat", value: "94,6%", delta: "+1,1%", tone: "up" },
      { label: "Test o'rtachasi", value: "74", delta: "+6", tone: "up" },
    ],
    summary:
      "O'quv yili o'sish bilan yakunlandi: o'quvchilar soni 5% ga, tushum 14% ga oshdi. 18 nafar o'quvchi Prezident maktabi va ixtisoslashgan maktablarga kirdi. English va Matematika eng kuchli yo'nalishlar.",
    anomalies: [
      {
        level: "past",
        text: "Kimyo bo'yicha o'qituvchi yuklamasi me'yordan yuqori (haftasiga 26 soat).",
      },
    ],
    actions: [
      "Kimyo uchun qo'shimcha o'qituvchi qabul qilish",
      "Yangi o'quv yili uchun narxlarni ko'rib chiqish",
    ],
    telegram:
      "🏆 Yillik hisobot · 2025–2026\n\nO'quvchilar: 236 → 248 (+5%)\nTushum: 4,31 mlrd (+14%)\nTest o'rtachasi: 74 (+6)\n🎓 18 nafar bitiruvchi ixtisoslashgan maktablarga kirdi",
    archive: [{ id: "y25", title: "2024–2025 o'quv yili", sentAt: "01.07.2025" }],
  },
};

/** AI Markaz uchun tanlov ro'yxati (yotoqxonadagi va boshqalar) */
export const aiStudents = students;
