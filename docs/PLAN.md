# ToshbekovSchool — Maktab avtomatlashtirish platformasi
> Claude Code uchun loyiha rejasi (v1). Til: o'zbek. Birinchi bosqich: dizayn + bo'limlar + funksiyalar. Registratsiya/auth keyin.

## 0. Claude Code uchun qoidalar
- Bitta bosqichni tugatib, ko'rsatib, tasdiq olgach keyingisiga o't.
- Barcha UI matnlari o'zbek tilida (lotin). Kod, o'zgaruvchi nomlari — inglizcha.
- Maktab logotipi `apps/web/public/logo.png` da turadi (foydalanuvchi beradi). Logo har sahifada: sidebar tepasida, login sahifada, PDF hisobotlarda.
- Brend nomi: **ToshbekovSchool**. Ranglar logotipdan olingan va yagona tokens faylida (`apps/web/src/styles/tokens.css`): primary `#03265C`, accent `#7F0B92`, accent-soft `#E0C1E3`, surface-soft `#BBDEFA`.
- Secretlar (API kalitlar, bot token) faqat env o'zgaruvchilarda. Hech qachon repoga yozilmaydi.
- Bolalar ma'lumotlari sezgir: har bir so'rovda rol bo'yicha ruxsat tekshiruvi (RBAC) majburiy.

## 1. Texnologiya steki
| Qatlam | Tanlov | Deploy |
|---|---|---|
| Frontend | Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Recharts | Vercel |
| Backend | Fastify + TypeScript + Prisma + Zod | Railway |
| DB | PostgreSQL | Railway |
| Navbat / rejalar | Redis + BullMQ (darhol xabarlar), node-cron (kunlik/haftalik hisobotlar) | Railway |
| Telegram bot | grammY (alohida servis, webhook) | Railway |
| AI | Claude API (har bir AI uchun alohida system prompt) | — |
| Fayl saqlash | S3 mos (Cloudflare R2) | — |
| Repo | GitHub monorepo; deploy qoidasi — 7-bo'lim | — |

Monorepo tuzilmasi:
```
toshbekovschool/
  apps/
    web/            # Next.js
    api/            # Fastify + Prisma
    bot/            # Telegram bot
  packages/         # umumiy tiplar (ixtiyoriy)
  docs/PLAN.md
  CLAUDE.md
```

## 2. Rollar (RBAC)
| Rol | Nima ko'radi |
|---|---|
| Direktor / Platforma rahbari | Hamma narsa, hisobotlar, AI Xodim, sozlamalar |
| Zavuch (o'quv ishlari bo'yicha) | Dars jadvali, davomat nazorati, o'qituvchilar sifati, testlar nazorati, o'quvchilar akademik holati, AI Markaz (IQ'siz), xulq-atvor (umumiy: davomat, intizom, test faolligi). IQ, salomatlik izohlari, psixolog yozuvlari, moliya va oyliklarni ko'rmaydi |
| Admin / Buxgalter | Moliya, o'quvchi/xodim ro'yxati |
| O'qituvchi | O'qituvchi kabineti: guruhlarim, davomat, test yaratish/baholash, natijalar, dars jadvali, o'z oyligim |
| Tarbiyachi (smena) | Yotoqxona bo'limi |
| Psixolog | IQ va xulq-atvor tahlili, salomatlik izohlari, o'quvchilar ro'yxati — faqat ko'rish; psixolog yozuvlari (o'zi yuritadi). Moliya va xodimlarni ko'rmaydi |
| Oshpaz/Menejer | Oshxona menyusi |
| Ota-ona | Faqat o'z farzandi(lari): hisobot, to'lov, test, menyu |
| O'quvchi | O'quvchi kabineti: 2 ta fan, 2 ta AI mentor, testlar, natijalar, o'quv rejasi, dars jadvali, menyu |

## 3. Bo'limlar (sahifalar xaritasi)

### 3.1 Direktor paneli (Platforma rahbari)
- **Bosh sahifa (Dashboard)**: o'quvchilar soni, bugungi davomat, oylik tushum, qarzdorlik, xodimlar soni, AI Xodim ogohlantirishlari.
- **O'quvchilar** (3.2)
- **O'qituvchilar**: ro'yxat, fan, ish soati, oylik, to'lov tarixi.
- **Ishchi xodimlar**: lavozim, oylik, to'lov tarixi.
- **Moliya**: tushum/chiqim, qarzdorlar, oylik to'lovlar jadvali.
- **Yotoqxona nazorati** (3.3)
- **Oshxona** (3.4)
- **Testlar va natijalar** (3.5)
- **AI Markaz** (3.6)
- **AI Xodim hisobotlari**: kunlik / haftalik / oylik / yillik, saytda + Telegramda.
- **Sozlamalar**: yo'nalishlar (fanlar) ro'yxati, narxlar, Telegram, foydalanuvchilar.

### 3.2 O'quvchilar bo'limi
Ro'yxat → o'quvchi profili. Profil tablari:
1. **Umumiy**: ism, sinf, ota-ona, 2 ta tanlangan fan, yotoqxona holati.
2. **Hisobot (AI haftalik tahlil)**: har hafta AI tayyorlaydi, ota-onaga Telegramga yuboriladi.
3. **Moliya**: oylik to'lov (fanlarga qarab), to'langan/qarz, to'lov tarixi, qarzdorlik belgisi.
4. **Fanlar**: har bir o'quvchi **aniq 2 ta fan** tanlaydi (qoida 3.7).
5. **Yotoqxona**: kechasi holati (3.3).
6. **Test natijalari**: fanlar bo'yicha, grafik bilan.
7. **AI mentorlar**: faqat tanlangan fanlar mentori.
8. **Ota-ona profili**: ota-ona kirganda faqat shu farzandining ma'lumotlari.

### 3.3 Yotoqxona
- Tarbiyachi smenada o'quvchilarni belgilaydi: **uxlash vaqti, turish vaqti, darsga tushish vaqti, kechasi uxladimi/yo'qmi**.
- Qoida: tarbiyachi "uxlamadi" deb belgilasa **ham**, "uxladi" deb belgilasa **ham** — ota-onaga Telegram xabari **darhol** boradi (BullMQ vazifasi, kutishsiz).
- Smena jadvali: kim qaysi kuni navbatchi.
- Direktor ko'rinishi: bugungi yotoqxona umumiy holati, muammolar ro'yxati.

### 3.4 Oshxona
- Haftalik taomlar ro'yxati: kun → nonushta / tushlik / tushki / kechki.
- Har hafta yangisi kiritiladi (Oshpaz/Admin).
- Saqlanganda: ota-onalarga Telegram orqali yuboriladi (yakshanba kechqurun yoki "Yuborish" tugmasi bilan).
- Eski haftalar arxivi.

### 3.5 Testlar
- O'qituvchi fan → mavzu → test (savollar, variantlar, to'g'ri javob, vaqt) yaratadi.
- O'quvchi testni topshiradi → avtomatik baholanadi.
- Natija o'quvchiga, ota-onaga (profilda + Telegram) va direktorga ko'rinadi.
- Xatolar tahlili AI orqali (3.6, 3.7).

### 3.6 AI Markaz (eng asosiy AI)
Vazifalari:
1. Fanlar bo'yicha bilim darajasini tekshirish, mavzular o'zlashtirilishini aniqlash.
2. Xulq-atvor tahlili (yotoqxona, davomat, test faolligi ma'lumotlaridan).
3. Kuchli/zaif tomonlarni savol-javob orqali aniqlash.
4. IQ va harakat natijalarini hisobga olib, maqsadga erishish muddatini baholash va yo'nalish rejasi tuzish.
5. Bilim darajasiga mos testlar berish.
6. Xatolarni tahlil qilish va qanday tuzatishni tushuntirish.
7. Shaxsiy o'quv rejasi (haftalik) tuzish.
8. Keyinchalik qo'shiladigan vazifalar uchun kengaytiriladigan arxitektura (agent/tool pattern).

Muhim: IQ — psixometrik baho, qat'iy hukm emas. AI natijani "taxminiy ko'rsatkich" deb taqdim etadi, bola haqida salbiy yorliq yopishtirmaydi. Ota-onaga ko'rinadigan tahlil muloyim va konstruktiv tilda.

### 3.7 AI Mentorlar (har fanga alohida)
Yo'nalishlar: **English, Matematika, IT, SAT, Kimyo, Biologiya, Rus tili, Nemis tili**.
Boshlang'ich sinflar: **Prezident maktabiga tayyorlov** — Matematika, English, Tanqidiy fikrlash, Mantiqiy fikrlash.

Qoidalar:
- Har fan uchun alohida system prompt, alohida suhbat tarixi.
- **Har o'quvchi aniq 2 ta fan tanlaydi** (masalan English + IT). O'quvchi profilida faqat shu 2 ta mentor ochiq.
- Mentor o'quvchi darajasi, test natijalari va zaif mavzularini biladi.
- Har mentor suhbati saqlanadi; o'qituvchi/ota-ona uchun faollik statistikasi (necha daqiqa, qaysi mavzu).
- Xavfsizlik: bolalar uchun mos javoblar, mavzudan chiqmaslik, shaxsiy ma'lumot so'ramaslik.

### 3.8 AI Xodim (hisobotchi)
- Maktab ishini nazorat qiladi: to'lovlar, qarzdorlik, oyliklar, davomat, yotoqxona.
- Hisobotlar: **kunlik, haftalik, oylik, yillik** (node-cron jadvali).
- Chiqish: Telegram bot (direktorga) **va** saytda "Hisobotlar" sahifasi.
- Anomaliyalarni ko'rsatadi: katta qarz, kutilmagan xarajat, davomat pasayishi.

### 3.9 Telegram bot
- Direktor: AI Xodim hisobotlari.
- Ota-ona: haftalik AI tahlil, haftalik menyu, yotoqxona xabari (darhol), test natijasi, to'lov eslatmasi.
- Ota-ona ulanishi: profildan bir martalik kod → bot orqali bog'lanadi.
- Xabar yuborish jurnali (kimga, qachon, holat) — ishonchlilik uchun.

### 3.10 Dars jadvali
- Jadval: sinf × kun × dars (vaqt) × fan × o'qituvchi × xona.
- Ko'rinishlar: sinf bo'yicha, o'qituvchi bo'yicha, xona bo'yicha. To'qnashuv nazorati: bir o'qituvchi yoki xona bir vaqtda ikki joyda bo'lmaydi.
- Davomat dars jadvaliga bog'lanadi; 1-dars davomati yotoqxonadagi o'quvchining «darsga tushish» vaqti bo'ladi.

### 3.11 Kabinetlar (rol bo'yicha)
- **O'qituvchi:** guruhlarim, davomat, test yaratish/baholash, natijalar, dars jadvali, o'z oyligim.
- **O'quvchi:** 2 ta fan, 2 ta AI mentor, testlar, natijalar, o'quv rejasi, dars jadvali, menyu.
- **Zavuch:** dars jadvali, davomat nazorati, o'qituvchilar sifati, testlar nazorati, akademik holat, AI Markaz (IQ'siz).
- **Ota-ona:** 3.2 va 3.9 ga qarang.

## 4. Ma'lumotlar bazasi (asosiy jadvallar)
`users`, `roles`, `students`, `classes`, `rooms`, `timetable`, `attendance`, `parents`, `student_parent`, `teachers`, `staff`, `subjects`, `student_subjects` (aniq 2 ta cheklov), `payments`, `tuition_plans`, `salaries`, `dorm_logs`, `dorm_shifts`, `meal_menus`, `tests`, `questions`, `test_attempts`, `ai_conversations`, `ai_messages`, `ai_reports`, `telegram_links`, `notifications_log`.

## 5. Dizayn yo'nalishi
- Zamonaviy, toza, maktabga mos: iliq, ishonchli, bolalar uchun keraksiz "o'yinchoqlik"siz.
- Light tema asosiy, dark tema ixtiyoriy.
- Sidebar navigatsiya (logo tepada), mobilda pastki navigatsiya.
- Ota-ona ko'rinishi mobil-birinchi (ko'pchilik telefondan kiradi).
- Kartalar, aniq raqamli statistikalar, grafiklar (Recharts), bo'sh holat (empty state) matnlari.
- Shrift: Inter yoki Manrope (kirill/lotin uchun yaxshi).
- Kirish imkoniyati: kontrast, katta tugmalar, klaviatura navigatsiyasi.

Direktor sidebar tartibi:
```
[LOGO] ToshbekovSchool
 Bosh sahifa
 O'quvchilar
 O'qituvchilar
 Dars jadvali
 Xodimlar
 Moliya
 Yotoqxona
 Oshxona
 Testlar
 AI Markaz
 AI Xodim hisobotlari
 Sozlamalar
```

## 6. Bosqichlar
Bosqichlar ro'yxati, qabul mezonlari va tartibi **faqat `docs/BOSQICHLAR.md`** da (0–13). Bu yerda takrorlanmaydi.

## 7. Deploy
- Vercel (web) va Railway (api, bot, worker, redis, postgres) GitHub'ning **`main`** branch'iga ulanadi; boshqa branch'lar avtomatik deploy qilinmaydi.
- `main` ga merge faqat egasining "merge qil" buyrug'i bilan (avval zaxira tag). Demak deploy ham faqat egasi buyurgandan keyin bo'ladi. Claude Code o'zi deploy qilmaydi va merge qilmaydi.
- Muhit o'zgaruvchilari: `DATABASE_URL`, `REDIS_URL`, `ANTHROPIC_API_KEY`, `TELEGRAM_BOT_TOKEN`, `SECRET_KEY`, `NEXT_PUBLIC_API_URL`.
- Staging va production muhitlari alohida.

## 8. Ochiq savollar (foydalanuvchidan)
1. Maktab logotipi fayli (PNG/SVG).
2. Sinflar tuzilmasi (1–11 sinf?) va yotoqxonada nechta bola/tarbiyachi.
3. Oylik to'lov narxi: fan bo'yicami yoki sinf bo'yicami?
4. Ota-ona Telegram orqali bog'lanishi (kod bilan) yetarlimi?
5. Til: faqat o'zbekmi yoki rus/ingliz ham kerakmi?
