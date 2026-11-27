# Changelog

Har bosqich oxirida 3–5 qator qo'shiladi.

## Bosqich 0 — Poydevor (2026-11-25)

- pnpm monorepo: web (Next.js 15), api (Fastify + Prisma), bot (grammY), `packages/shared` (Zod).
- ESLint 9 + Prettier, `no-console` qoidasi va log redaktsiyasi sezgir ma'lumot uchun.
- API `GET /health` endpoint (DB'ni `SELECT 1` bilan tekshiradi), web'da bosh sahifa.
- `.env.example`, `CLAUDE.md`, ish qoidalari `docs/BOSQICHLAR.md` da.

### Bosqich 0 — tuzatishlar (2026-11-25)

- Web: Tailwind v4 + shadcn/ui (`components.json`, `Button`, brend placeholder tokenlari, dark tema o'zgaruvchilari).
- `.env.example` PLAN 7-bo'limga moslandi (`TELEGRAM_BOT_TOKEN`, `REDIS_URL`, `ANTHROPIC_API_KEY`, `SECRET_KEY`); bot `TELEGRAM_BOT_TOKEN` ni o'qiydi.
- `CLAUDE.md` to'ldirildi: PLAN 0-bo'lim qoidalari, to'liq stek (Redis/BullMQ, node-cron, Claude API, R2).
- `docs/PLAN.md` va `docs/BOSQICHLAR.md` egasining yangi versiyalari.
- Lokal PostgreSQL 17 ga ulandi (`prisma db push`), `/health` → `{"status":"ok","db":"ok"}`.

## Bosqich 1 — Dizayn tizimi (1-qism, 2026-11-25)

- Brend tokenlari logodan: `apps/web/src/styles/tokens.css` (primary `#03265C`, accent `#7F0B92`, accent-soft `#E0C1E3`, surface-soft `#BBDEFA`), light + dark, Manrope shrifti; favicon logodan.
- Komponentlar: Logo, Sidebar, Topbar (mobil menyu), Card, StatCard, Badge, Tabs, DataTable, EmptyState, grafiklar (Recharts).
- Direktor shell (sidebar tartibi PLAN 5-bo'lim) va Dashboard mock ma'lumot bilan.
- O'quvchi profili — 8 tab (PLAN 3.2); qolgan bo'limlar vaqtincha "keyingi qadamda" sahifasi.

## Bosqich 1 — Dizayn tizimi (2-qism: tuzatishlar + A guruh, 2026-11-27)

- Tuzatishlar: Dashboard sanasi joriy kundan (Toshkent vaqti, o'zbekcha hafta kuni); mobilda o'quvchilar jadvali kartalarga aylanadi (ism, sinf, to'lov belgisi); KPI 2 ustun, AI Xodim ogohlantirishlari KPI'dan keyin; profil tablarining chetlarida fade.
- O'quvchilar ro'yxati: qidiruv (o'quvchi/ota-ona ismi), sinf/fan/to'lov filtrlari, bo'sh holat, qisqa ko'rsatkichlar.
- Moliya: tushum/chiqim grafigi, chiqim tarkibi, qarzdorlar ro'yxati, oylik to'lovlar jadvali (o'quvchi × oy); qarzdorlik raqamlari Dashboard bilan bir xil manbadan.
- O'qituvchilar va Xodimlar: ro'yxat, fan/lavozim, ish soati/smena, oylik holati, oylik to'lov tarixi.
- Umumiy: `Form` (Input/Select/SearchInput), `MobileRow`, StatCard container query (tor kartada ikonka tepada), CardHeader tor ekranda o'raladi.

## Bosqich 1 — Dizayn tizimi (3-qism: B guruh, 2026-11-27)

- Yotoqxona: direktor ko'rinishi (bugungi holat, muammolar, Telegram xabarlar jurnali + qayta yuborish) va mobil-birinchi tarbiyachi smenasi (`/yotoqxona/smena`: katta "Uxladi/Uxlamadi" tugmalari, uxlash/turish/darsga vaqtlari, filtr, haftalik smena jadvali).
- Oshxona: haftalik menyu (kun × nonushta/tushlik/tushki/kechki, bugungi kun belgilanadi), menyu kiritish formasi (kun bo'yicha to'ldirish hisobi), arxiv, "Ota-onalarga yuborish".
- Testlar: natijalar jadvali (fan filtri), mavzu bo'yicha statistika (bar + jadval, 70 ball chegarasi), o'qituvchi uchun test yaratish (fan → mavzu → sozlamalar → savollar).
- "Xabar namunalari" (`/xabar-namunalari`, sidebar pastida "Maket"): ota-ona Telegram'da ko'radigan yotoqxona, menyu va test xabarlari chat ko'rinishida.
- Moliya mock raqamlari bitta manbadan: chiqim = chiqim tarkibi yig'indisi, sof foyda = tushum − chiqim (413 − 290 = 123 mln). `AGENTS.md` (Codex CLI nusxasi) `.gitignore` ga qo'shildi.

## Bosqich 1 — Dizayn tizimi (4-qism: tuzatishlar + C guruh, 2026-11-27)

- Yotoqxona: tungi smena 22:00–08:00; "Uxladi/Uxlamadi" bosilganda vaqt avtomatik "hozir" (tahrirlanadi), xabar 1 daqiqa ichida; "Uxlamadi" uchun tez sabablar (tish og'rig'i, uyqusizlik, sog'lig'i, boshqa). Salomatlik izohlari "Faqat direktor va tarbiyachi" belgisi bilan; ota-onaga faqat neytral qisqa matn.
- AI Markaz: o'quvchi tanlash, diagnostika, kuchli/zaif tomonlar, xulq-atvor, haftalik reja, moslashgan test, xatolar tahlili; IQ va muddat "Taxminiy ko'rsatkich". AI Mentor (`/mentor`): faqat tanlangan 2 fan ochiq, qolganlari qulflangan.
- AI Xodim hisobotlari: kunlik/haftalik/oylik/yillik, anomaliyalar, tavsiyalar, arxiv va direktor Telegram namunasi.
- Sozlamalar: yo'nalishlar va narxlar (2 fan narxi = oylik to'lov), Telegram ulanishi va xabar jadvali, foydalanuvchilar va rollar matritsasi (RBAC).
- Ota-ona kabineti (`/ota-ona`, mobil-birinchi, pastki navigatsiya): farzand tanlash, haftalik AI hisobot, to'lov/qarz, menyu, yotoqxona, testlar. Vaqtinchalik `[bolim]` sahifasi olib tashlandi — barcha bo'limlar tayyor.

### Bosqich 1 — C guruh tuzatishlari (2026-11-27)

- Ota-ona kabinetida IQ ko'rsatilmaydi: ota-onaga faqat `parentInsight` (o'rganish uslubi + tavsiyalar) beriladi; AI Markazda IQ "Faqat direktor va psixolog" belgisi bilan, rollar matritsasiga "IQ (psixometrik baho)" qatori.
- O'rganish uslubi va ota-onaga tavsiyalar: AI Markazda yangi tab, ota-ona "Hisobot" sahifasida va bosh sahifada.
- BOSQICHLAR.md 13-bosqich: "Maket" guruhi va mock ma'lumotlarni production'dan olib tashlash.

### Bosqich 1 — egasi qarorlari bo'yicha tuzatishlar (2026-11-27)

- Yotoqxona: smena 22:00–07:00, qizlar (2-qavat) va o'g'il bolalar (1-qavat) uchun alohida smena — navbatchi + yordamchi; smena jadvalida ikkala guruh. Smena vaqti, bekor qilish oynasi va guruhlar `config/school.ts` da (kodga qotirilmagan).
- "Uxladi/Uxlamadi" bosilgach 5 soniyalik "Bekor qilish" (teskari sanoq): bekor qilinsa avvalgi holat tiklanadi va hech narsa yuborilmaydi; jurnalda "5 soniya kutilmoqda" holati; muammolar matni jurnaldagi haqiqiy yetkazilish holatidan.
- UI matnlari uchun `src/i18n/uz.ts` (`t`): navigatsiya, holat belgilari, yotoqxona, ota-ona qobig'i va o'rganish uslubi bloklari ko'chirildi; qolgan sahifalar keyingi bosqichlarda o'zgartirilganda ko'chiriladi (CLAUDE.md qoidasi).
- BOSQICHLAR.md: 4-bosqichga oylik to'lov qoidasi va "oila chegirmasi — keyinroq"; 6-bosqich qabul sharti bekor qilish oynasiga moslandi (jami ≤ 10 s).

### Bosqich 1 — psixolog roli va umumiy qabul talablari (2026-11-27)

- Psixolog alohida rol (PLAN.md 2-bo'lim, rollar jadvali): o'quvchilar ro'yxati, IQ, xulq-atvor (AI Markaz) va salomatlik izohlari — faqat ko'rish; moliya va xodimlarni ko'rmaydi.
- BOSQICHLAR.md: "B2. Har bosqichning umumiy qabul talablari (2-bosqichdan boshlab)" (a–f); 6-bosqich qabul sharti — "belgilangandan 10 soniya ichida".

### Bosqich 1 — qabul qilindi (2026-11-27)

- Egasi 1-bosqichni qabul qildi. Ochiq qolgan maket ishlari BOSQICHLAR.md "1-bosqichdan ochiq qolganlar" bo'limida.

### Bosqich 1 — dd4a0fc sinovi (2026-11-27)

- Chrome'da sinaldi, konsolda xato yo'q: smena (Uxlamadi → sabab → Bekor qilish → "Bekor qilindi" yozuvi, 1280 va 375 px), Sozlamalar → Yotoqxona (22:00–07:00, 5 soniya, "Xona qo'shish"), AI Markaz → Xulq-atvor va IQ belgisi, ota-ona Hisobot (IQ va "psixometrik" yo'q), rollar jadvalidagi psixolog ustuni.

### Bosqich 1 — darsga tushish qarori (2026-11-27)

- BOSQICHLAR.md: 3-bosqichga davomat moduli (1-dars davomati → «darsga tushish» vaqti avtomatik); 6-bosqichga tungi tarbiyachi vazifalari (uxlash/turish, 07:00 da topshirish, darsga tushish — zaxira sifatida qo'lda) va ertalabgi birlashgan xabar (turdi + darsga tushdi).

### Bosqich 1 — qabul qilindi (2026-11-27)

- Egasi barcha tuzatishlardan keyin 1-bosqichni qabul qildi. `main` ga merge egasining "merge qil" buyrug'i bilan, avval zaxira tag olinadi.
