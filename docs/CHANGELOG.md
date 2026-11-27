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
