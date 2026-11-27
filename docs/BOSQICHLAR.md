# ToshbekovSchool — bosqichma-bosqich ish rejasi (v2)
> PLAN.md ni to'ldiradi va uning **Stek** bo'limini almashtiradi. Claude Code har doim shu fayl + PLAN.md ni o'qiydi.

## A. Qaror: TypeScript monorepo (0-bosqichda Claude Code qurgan stek qabul qilindi)
Bitta til (TypeScript), bitta uslub. Django o'rniga Fastify ishlatiladi. Claude Code 0-bosqichda shu stekni qurdi; qayta qurish shart emas.

| Qatlam | Tanlov | Deploy |
|---|---|---|
| Web | Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui + Recharts | Vercel |
| API | Fastify + TypeScript + Zod (validatsiya) | Railway |
| DB | PostgreSQL + Prisma ORM | Railway |
| Navbat/rejalar | BullMQ (Redis) + node-cron | Railway |
| Telegram bot | grammY (API bilan bir monorepoda, alohida servis) | Railway |
| AI | Claude API, har agent uchun alohida prompt fayli | — |
| Fayl | Cloudflare R2 | — |

```
toshbekovschool/
  apps/web  apps/api  apps/bot
  packages/shared      # Zod sxemalar, umumiy tiplar
  docs/PLAN.md  docs/BOSQICHLAR.md
  CLAUDE.md
```

## B. Ish qoidalari (har bosqichda bir xil)
1. Har bosqich = alohida branch: `bosqich-N-nomi`. `main` ga **tegilmaydi**.
2. Bosqich tugagach Claude Code Chrome'da o'zi sinaydi, natijani (skrinshot + ro'yxat) ko'rsatadi.
3. O'z branch'iga commit va push qiladi. **Merge** faqat sizning "merge qil" buyrug'ingiz bilan, avval zaxira (tag) olingandan keyin.
4. Deploy ham faqat siz aytganda.
5. Bir vaqtda faqat bitta bosqich. Oldingisi qabul qilinmaguncha keyingisi boshlanmaydi.
6. Har bosqich oxirida `docs/CHANGELOG.md` ga 3–5 qator yoziladi.
7. Sezgir ma'lumot (bolalar, to'lovlar): hech qachon konsolga/logga chiqarilmaydi; secretlar faqat env'da.

## C. Bosqichlar

### 0 — Poydevor
**Ish:** monorepo, `packages/shared`, ESLint/Prettier, `.env.example`, Prisma ulanish, `/health` endpoint, web'da bo'sh sahifa. Deploy shu bosqichda **qilinmaydi** — egasi aytganda alohida qilinadi.
**Qabul:** web ochiladi (localhost), API `/health` → `ok`, DB ulangan, CLAUDE.md to'liq yozilgan.

### 1 — Dizayn tizimi va barcha bo'limlar maketi ← siz ko'rib chiqasiz
**Ish:**
- Logo va brend tokenlari (ranglar logodan), shrift Inter/Manrope, radius, soya, spacing; light tema (+ dark tayyor).
- Umumiy komponentlar: Sidebar, Topbar, Card, StatCard, DataTable, Badge, Tabs, Modal, Form, EmptyState, Chart, Toast.
- Direktor shell (sidebar tartibi PLAN.md 5-bo'lim) va ota-ona mobil shell (pastki navigatsiya).
- **Mock ma'lumot bilan statik sahifalar:** Dashboard, O'quvchilar (ro'yxat + profil 8 tab), O'qituvchilar, Xodimlar, Moliya, Yotoqxona (tarbiyachi smena ko'rinishi + direktor ko'rinishi), Oshxona, Testlar, AI Markaz, AI Mentor chat oynasi, AI Xodim hisobotlari, Sozlamalar.
- Responsive: 375 / 768 / 1280 px.
**Qabul:** barcha sahifa havolalari ishlaydi, mock ma'lumotli, mobilda buzilmaydi, logo hamma joyda, kontrast yaxshi.
**Sizning tekshiruvingiz:** joylashuv, ranglar, bo'lim tartibi, funksiyalar ro'yxati. O'zgarish bo'lsa shu bosqichda tuzatiladi — keyin qimmatroq.

### 2 — Ma'lumotlar bazasi va API asosi
**Ish:** Prisma sxemasi (PLAN.md 4-bo'lim jadvallari), migratsiyalar, seed (30 o'quvchi, 8 o'qituvchi, fanlar), RBAC middleware, Zod validatsiya, xatolar formati. Auth hali yo'q — **faqat dev rejimida "rolni almashtirish"** tugmasi (productionda o'chiq).
**Qabul:** har endpoint rolga qarab ruxsat tekshiradi (ota-ona boshqa bolani ko'ra olmasligi testlanadi), seed ishlaydi.

### 3 — O'quvchilar va ota-ona profili
**Ish:** o'quvchi CRUD, qidiruv/filtr, profil tablari (Umumiy, Fanlar, Moliya, Yotoqxona, Testlar bo'sh holat bilan), ota-onani bog'lash, ota-ona ko'rinishi (faqat o'z farzandi).
**Qabul:** direktor hamma o'quvchini, ota-ona faqat o'zinikini ko'radi (avtotest).

### 4 — Fanlar (2 ta qoidasi) va moliya
**Ish:** fanlar/yo'nalishlar, `student_subjects` da **aniq 2 ta** cheklovi (DB va API darajasida), narx fan bo'yicha, oylik to'lov rejasi, to'lov kiritish, qarzdorlik hisobi, qarzdorlar ro'yxati.
**Qabul:** 3-fan qo'shib bo'lmaydi; qarz to'g'ri hisoblanadi (misol hisoblar bilan test).

### 5 — O'qituvchilar, xodimlar, oyliklar
**Ish:** ro'yxatlar, lavozim/fan, oylik belgilash, oylik to'lov tarixi, moliya hisobotiga qo'shilishi.

### 6 — Telegram bot va yotoqxona
**Ish:** bot, ota-ona bog'lash (bir martalik kod), tarbiyachi smena jadvali, yotoqxona belgilash (uxlash/turish/darsga tushish/uxladi-uxlamadi), BullMQ orqali **darhol** ota-onaga xabar, xabar jurnali, qayta urinish (xato bo'lsa).
**Qabul:** belgilangandan 5 soniya ichida xabar boradi; yuborilmasa jurnalda ko'rinadi va qayta uriniladi.

### 7 — Oshxona
**Ish:** haftalik menyu kiritish (kun × 4 ovqat), arxiv, ota-onalarga yuborish (rejali + qo'lda tugma), ota-ona profilida ko'rinish.

### 8 — Testlar
**Ish:** fan → mavzu → test, savol turlari, vaqt, avto-baholash, natija o'quvchi/ota-ona/direktorga, Telegram xabari, mavzu bo'yicha statistika.

### 9 — AI mentorlar
**Ish:** har fan uchun alohida prompt fayli (`apps/api/src/ai/mentors/*.md`), suhbat tarixi, o'quvchi konteksti (daraja, zaif mavzular), faqat tanlangan 2 fan mentori ochiq, boshlang'ich (Prezident maktabi) mentorlari, limit va xavfsizlik filtri, faollik statistikasi.
**Qabul:** o'quvchi tanlamagan fan mentoriga kira olmaydi; mentor mavzudan chiqmaydi.

### 10 — AI Markaz
**Ish:** bilim darajasi diagnostikasi, kuchli/zaif tomonlar, xulq-atvor tahlili (yotoqxona/davomat/test ma'lumotlaridan), IQ va maqsad muddati bahosi (taxminiy ko'rsatkich sifatida), moslashgan testlar, xatolar tahlili, haftalik shaxsiy o'quv rejasi. Ota-onaga ko'rinadigan matn muloyim va konstruktiv.

### 11 — AI Xodim va hisobotlar
**Ish:** kunlik/haftalik/oylik/yillik hisobotlar (node-cron), saytda "Hisobotlar" sahifasi, direktorga Telegram, anomaliya signallari, ota-onalarga haftalik AI tahlil yuborish.

### 12 — Registratsiya va autentifikatsiya
**Ish:** login, rollar, parol tiklash, sessiya xavfsizligi, dev "rolni almashtirish" olib tashlanadi, hisob yaratish oqimi (direktor ota-ona/o'qituvchi hisobi ochadi).

### 13 — Mustahkamlash va ishga tushirish
**Ish:** to'liq rol testlari, yuklama sinovi, zaxira (DB backup), xatolar monitoringi, domen, staging → production, 404/500 sahifalar.
**Yakun:** barcha bo'limlar qanday ishlashi haqida PDF qo'llanma.

## D. Claude Code'ga birinchi buyruq (0-bosqich)
```
docs/PLAN.md va docs/BOSQICHLAR.md ni to'liq o'qi.
Faqat 0-bosqichni bajar: branch `bosqich-0-poydevor`.
Monorepo (apps/web Next.js+TS+Tailwind+shadcn, apps/api Fastify+TS+Prisma, apps/bot grammY, packages/shared).
CLAUDE.md yoz: ish qoidalari (B bo'lim), stek, buyruqlar.
/health endpoint, .env.example, CHANGELOG.
Chrome'da sinab natijani ko'rsat. Commit/push faqat shu branch'ga. Merge va deploy qilma.
Tugagach 1-bosqichga o'tma — mening tasdig'imni kut.
```

## E. 1-bosqichga buyruq (0 qabul qilingach)
```
docs/BOSQICHLAR.md dagi 1-bosqichni bajar: branch `bosqich-1-dizayn`.
Logo: apps/web/public/logo.png. Barcha sahifalar mock ma'lumot bilan, backend'siz.
Avval faqat Dashboard + sidebar + o'quvchi profili sahifasini qil va skrinshot ko'rsat (375/1280px).
Men tasdiqlagach qolgan sahifalarni davom ettir.
```

## Holat

| Bosqich | Branch | Holat |
| --- | --- | --- |
| 0 — Poydevor | `bosqich-0-poydevor` | qabul qilindi (deploy keyinroq) |
| 1 — Dizayn tizimi | `bosqich-1-dizayn` | jarayonda (1-qism, A va B guruh tasdiqlandi; C guruh: AI Markaz, AI Mentor, AI Xodim, Sozlamalar, Ota-ona kabineti — ko'rib chiqishda) |
| 2 — DB va API asosi | — | kutilmoqda |
| 3–13 | — | kutilmoqda |
