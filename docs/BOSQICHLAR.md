# Bosqichlar

## B. Ish qoidalari (har bosqichda bir xil)

- Har bosqich = alohida branch: `bosqich-N-nomi`. `main` ga tegilmaydi.
- Bosqich tugagach Claude Code Chrome'da o'zi sinaydi, natijani (skrinshot + ro'yxat) ko'rsatadi.
- O'z branch'iga commit va push qiladi. Merge faqat egasining "merge qil" buyrug'i bilan, avval zaxira (tag) olingandan keyin.
- Deploy ham faqat egasi aytganda.
- Bir vaqtda faqat bitta bosqich. Oldingisi qabul qilinmaguncha keyingisi boshlanmaydi.
- Har bosqich oxirida `docs/CHANGELOG.md` ga 3–5 qator yoziladi.
- Sezgir ma'lumot (bolalar, to'lovlar): hech qachon konsolga/logga chiqarilmaydi; secretlar faqat env'da.

## C. Bosqichlar

### 0 — Poydevor

**Ish:** monorepo, `packages/shared`, ESLint/Prettier, `.env.example`, Prisma ulanish, `/health` endpoint, web'da bo'sh sahifa. Vercel va Railway'ga "salom" deploy.

**Qabul:** web ochiladi, API `/health` → ok, DB ulangan, `CLAUDE.md` yozilgan.

### 1 — Dizayn tizimi va barcha bo'limlar maketi ← egasi ko'rib chiqadi

**Ish:**

- Logo va brend tokenlari (ranglar logodan), shrift Inter/Manrope, radius, soya, spacing; light tema (+ dark tayyor).
- Umumiy komponentlar: Sidebar, Topbar, Card, StatCard, DataTable, Badge, Tabs, Modal, Form, EmptyState, Chart, Toast.
- Direktor shell (sidebar tartibi `PLAN.md` 5-bo'lim) va ota-ona mobil shell (pastki navigatsiya).
- Mock ma'lumot bilan statik sahifalar: Dashboard, O'quvchilar (ro'yxat + profil 8 tab), O'qituvchilar, Xodimlar, Moliya, Yotoqxona (tarbiyachi smena ko'rinishi + direktor ko'rinishi), Oshxona, Testlar, AI Markaz, AI Mentor chat oynasi, AI Xodim hisobotlari, Sozlamalar.
- Responsive: 375 / 768 / 1280 px.

**Qabul:** barcha sahifa havolalari ishlaydi, mock ma'lumotli, mobilda buzilmaydi, logo hamma joyda, kontrast yaxshi.

**Egasining tekshiruvi:** joylashuv, ranglar, bo'lim tartibi, funksiyalar ro'yxati. O'zgarish bo'lsa shu bosqichda tuzatiladi — keyin qimmatroq.

## Holat

| Bosqich           | Branch               | Holat      |
| ----------------- | -------------------- | ---------- |
| 0 — Poydevor      | `bosqich-0-poydevor` | jarayonda  |
| 1 — Dizayn tizimi | —                    | kutilmoqda |
