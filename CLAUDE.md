# CLAUDE.md

## Loyiha tuzilmasi

pnpm workspaces asosidagi monorepo:

- `apps/web` — Next.js 15 (App Router), Vercel'ga deploy
- `apps/api` — Fastify 5 + Prisma (PostgreSQL), Railway'ga deploy. Sxema: `apps/api/prisma/schema.prisma`
- `apps/bot` — grammY Telegram bot (`BOT_TOKEN` bo'lmasa ishga tushmaydi)
- `packages/shared` (`@toshbekov/shared`) — Zod sxemalar va umumiy tiplar. TS manba sifatida eksport qilinadi: web `transpilePackages`, api/bot `tsup` `noExternal` orqali oladi.

## Ish qoidalari (to'liq: `docs/BOSQICHLAR.md` B bo'limi)

- Har bosqich = alohida branch `bosqich-N-nomi`. `main` ga to'g'ridan-to'g'ri commit qilinmaydi.
- Bir vaqtda faqat bitta bosqich; oldingisi qabul qilinmaguncha keyingisi boshlanmaydi.
- Bosqich oxirida: Chrome'da sinash (skrinshot + ro'yxat), `docs/CHANGELOG.md` ga 3–5 qator, o'z branch'iga commit + push.
- Merge faqat egasi "merge qil" desa, avval zaxira tag (`zaxira-...`) olinadi. Deploy ham faqat egasi aytganda.
- Sezgir ma'lumot (bolalar, to'lovlar) hech qachon konsolga/logga chiqarilmaydi (`no-console` ESLint qoidasi, Fastify `redact`). Secretlar faqat env'da; `.env` commit qilinmaydi, namunasi `.env.example`.
- Ma'lumot shakllari faqat `packages/shared` da Zod sxema sifatida aniqlanadi; tiplar `z.infer` orqali.

## Buyruqlar

- `pnpm install` — bog'liqliklar (api uchun `prisma generate` avtomatik)
- `pnpm dev` — hammasini dev rejimida (ildizdagi `.env` o'qiladi)
- `pnpm build` / `pnpm typecheck` / `pnpm lint` / `pnpm format`
- `pnpm --filter @toshbekov/api db:push` — Prisma sxemasini DB'ga qo'llash
- API tekshiruv: `GET /health` → `{status, db, time}` (DB yo'q bo'lsa 503)
