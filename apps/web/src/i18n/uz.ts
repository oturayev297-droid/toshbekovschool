/**
 * UI matnlari — yagona joy (i18n tayyorligi). Hozircha faqat o'zbek (lotin).
 * Yangi til qo'shilganda shu shakldagi `ru.ts` yoziladi (`Dict` tipiga mos).
 * Qoida: yangi yoki o'zgargan UI matni komponentga qotirilmaydi — shu yerga yoziladi.
 */
export const uz = {
  brand: "ToshbekovSchool",

  common: {
    back: "Orqaga",
    directorPanel: "Direktor paneli",
    panel: "Panel",
    home: "Bosh sahifa",
    save: "Saqlash",
    cancel: "Bekor qilish",
    estimate: "Taxminiy ko'rsatkich",
    seconds: (n: number) => `${n} soniya`,
  },

  nav: {
    main: "Asosiy menyu",
    design: "Maket sahifalari",
    designTitle: "Maket",
    items: {
      home: "Bosh sahifa",
      students: "O'quvchilar",
      teachers: "O'qituvchilar",
      staff: "Xodimlar",
      finance: "Moliya",
      dorm: "Yotoqxona",
      kitchen: "Oshxona",
      tests: "Testlar",
      aiCenter: "AI Markaz",
      aiStaff: "AI Xodim hisobotlari",
      settings: "Sozlamalar",
      messageSamples: "Xabar namunalari",
      parentCabinet: "Ota-ona kabineti",
      studentMentor: "AI Mentor (o'quvchi)",
    },
  },

  status: {
    payment: { tolangan: "To'langan", qisman: "Qisman", qarz: "Qarzdor" },
    dorm: { uxladi: "Uxladi", uxlamadi: "Uxlamadi", belgilanmagan: "Belgilanmagan" },
    alert: { yuqori: "Muhim", orta: "E'tibor", past: "Ma'lumot" },
    delivery: {
      kutilmoqda: (s: number) => `${s} soniya kutilmoqda`,
      yetkazildi: "Yetkazildi",
      navbatda: "Qayta urinilmoqda",
      xato: "Yetkazilmadi",
    },
  },

  privacy: {
    directorTutor: "Faqat direktor va tarbiyachi",
    directorPsychologist: "Faqat direktor va psixolog",
  },

  dorm: {
    title: "Yotoqxona",
    shiftName: "Tungi smena",
    groups: { qiz: "Qizlar", ogil: "O'g'il bolalar" },
    groupShort: { qiz: "Qizlar", ogil: "O'g'il" },
    floor: (n: number) => `${n}-qavat`,
    room: (r: string) => `${r}-xona`,
    grade: (g: string) => `${g} sinf`,
    duty: "Navbatchi",
    assistant: "Yordamchi",
    tutor: "Tarbiyachi",
    directorView: "Direktor ko'rinishi",
    tutorView: "Tarbiyachi ko'rinishi",
    parentSees: "Ota-ona nimani ko'radi",
    handOver: "Smenani topshirish",
    pageDescription: (date: string, hours: string) => `Tungi smena ${date} · ${hours}`,
    tutorDescription: (date: string, hours: string, tutor: string, assistant: string) =>
      `${date} · ${hours} · ${tutor} (navbatchi), ${assistant} (yordamchi)`,
    groupPicker: "Maket: guruh",
    marked: "Belgilandi",
    left: (n: number) => `${n} ta qoldi`,
    allMarked: "Hammasi belgilandi",
    progress: "Belgilash jarayoni",
    filter: "Filtr",
    filters: {
      all: "Hammasi",
      belgilanmagan: "Belgilanmagan",
      uxladi: "Uxladi",
      uxlamadi: "Uxlamadi",
    },
    markSlept: "Uxladi",
    markNotSlept: "Uxlamadi",
    times: { sleep: "Uxlash", checked: "Tekshirildi", wake: "Turish", lesson: "Darsga" },
    reason: "Sabab",
    reasonGroup: "Uxlamaslik sababi",
    reasons: {
      tish: "Tish og'rig'i",
      uyqusizlik: "Uyqusizlik",
      salomatlik: "Sog'lig'i",
      boshqa: "Boshqa",
    },
    reasonNote: "Izoh",
    reasonNotePlaceholder: "Qisqa izoh (ota-onaga ketmaydi)",
    undoPending: (s: number) => `Xabar ${s} soniyadan keyin ketadi`,
    undo: "Bekor qilish",
    notified: (time: string, neutral: boolean) =>
      `Ota-onaga ${neutral ? "neytral " : ""}xabar yuborildi · ${time}`,
    willNotify: (s: number) =>
      `Belgilangach ${s} soniyalik bekor qilish oynasidan keyin xabar ketadi`,
    stats: {
      total: "Yotoqxonada",
      slept: "Uxladi",
      notSlept: "Uxlamadi",
      unmarked: "Belgilanmagan",
      sleptHint: (pct: number) => `${pct}% · kecha 96%`,
      notSleptHint: "Ota-onalarga neytral xabar ketdi",
      unmarkedHint: "Tarbiyachiga eslatildi",
    },
    byGroup: "Guruhlar bo'yicha",
    problems: "Muammolar",
    problemsHint: "Bugungi kecha bo'yicha, muhimlari tepada",
    log: "Xabarlar jurnali",
    logHint: (n: number, s: number) =>
      `Ota-onalarga Telegram xabarlari · xabar ${s} soniyalik bekor qilish oynasidan keyin ketadi · ${n} tasi kutilmoqda yoki yetkazilmagan`,
    logCols: {
      time: "Vaqt",
      student: "O'quvchi",
      parent: "Ota-ona",
      event: "Hodisa",
      status: "Holat",
    },
    attempts: (n: number) => `${n}/3 urinish`,
    resend: "Qayta yuborish",
    schedule: "Smena jadvali",
    scheduleHint: (range: string, hours: string) => `${range} · har kecha ${hours}`,
    currentShift: "joriy smena",
  },

  parent: {
    role: (name: string) => `Ota-ona · ${name}`,
    child: "Farzand",
    sections: "Ota-ona bo'limlari",
    nav: { home: "Bosh", report: "Hisobot", payment: "To'lov", menu: "Menyu", tests: "Testlar" },
    weeklyReport: "Haftalik AI hisobot",
    learningStyle: "O'rganish uslubi",
    learningStyleHint:
      "AI kuzatuvi asosida (testlar, mentor suhbatlari) · taxminiy, vaqt o'tishi bilan o'zgarishi mumkin",
    tips: "Uyda qanday yordam berish mumkin",
    tipsHint: "Ota-ona uchun tavsiyalar",
    reportAndTips: "Hisobot va tavsiyalar",
  },
};

/** Boshqa til lug'atlari shu shaklga mos bo'lishi kerak */
export type Dict = typeof uz;
