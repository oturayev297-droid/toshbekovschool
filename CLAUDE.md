# CLAUDE.md

Har sessiyada avval `docs/PLAN.md` va `docs/BOSQICHLAR.md` ni o'qing. Bosqichlar, qabul mezonlari va holat faqat `BOSQICHLAR.md` da.

## Stek

| Qatlam         | Tanlov                                                                    | Deploy  |
| -------------- | ------------------------------------------------------------------------- | ------- |
| Web            | Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Recharts | Vercel  |
| API            | Fastify 5 + TypeScript + Zod                                              | Railway |
| DB             | PostgreSQL + Prisma (`apps/api/prisma/schema.prisma`)                     | Railway |
| Navbat/rejalar | Redis + BullMQ (darhol xabarlar), node-cron (davriy hisobotlar)           | Railway |
| Telegram bot   | grammY (`apps/bot`, alohida servis)                                       | Railway |
| AI             | Claude API — har agent/mentor uchun alohida prompt fayli                  | —       |
| Fayl           | Cloudflare R2 (S3 mos)                                                    | —       |

Monorepo (pnpm workspaces):

- `apps/web` — Next.js. shadcn konfiguratsiyasi `components.json`, komponentlar `src/components/ui`, brend tokenlari `src/app/globals.css`.
- `apps/api` — Fastify + Prisma.
- `apps/bot` — grammY (`TELEGRAM_BOT_TOKEN` bo'lmasa ishga tushmaydi).
- `packages/shared` (`@toshbekov/shared`) — Zod sxemalar va umumiy tiplar. TS manba sifatida eksport qilinadi: web `transpilePackages`, api/bot `tsup` `noExternal` orqali oladi.

## Loyiha qoidalari (PLAN.md 0-bo'lim)

- Bitta bosqichni tugatib, ko'rsatib, tasdiq olgach keyingisiga o'tiladi.
- Barcha UI matnlari o'zbek tilida (lotin). Kod va o'zgaruvchi nomlari — inglizcha.
- Logo: `apps/web/public/logo.png` (egasi beradi). Har sahifada: sidebar tepasida, login sahifada, PDF hisobotlarda.
- Brend: **ToshbekovSchool**. Ranglar logodan olinadi; logo kelguncha placeholder: ko'k `#1E40AF`, oltin `#F59E0B`, to'q matn `#0F172A`.
- Secretlar (API kalitlar, bot token) faqat env'da, hech qachon repoga yozilmaydi.
- Bolalar ma'lumotlari sezgir: har bir so'rovda rol bo'yicha ruxsat tekshiruvi (RBAC) majburiy.
- Ma'lumot shakllari faqat `packages/shared` da Zod sxema sifatida; tiplar `z.infer` orqali.

## Ish qoidalari (BOSQICHLAR.md B bo'lim)

1. Har bosqich = alohida branch `bosqich-N-nomi`. `main` ga tegilmaydi.
2. Bosqich tugagach Chrome'da o'zi sinaydi, natijani (skrinshot + ro'yxat) ko'rsatadi.
3. Faqat o'z branch'iga commit va push. Merge faqat egasining "merge qil" buyrug'i bilan, avval zaxira tag (`zaxira-...`) olinadi.
4. Deploy faqat egasi aytganda (Vercel/Railway `main` ga ulangan, shuning uchun merge = deploy).
5. Bir vaqtda faqat bitta bosqich; oldingisi qabul qilinmaguncha keyingisi boshlanmaydi.
6. Har bosqich oxirida `docs/CHANGELOG.md` ga 3–5 qator.
7. Sezgir ma'lumot (bolalar, to'lovlar) hech qachon konsolga/logga chiqarilmaydi (`no-console` ESLint qoidasi, Fastify `redact`). Secretlar faqat env'da.

## Muhit o'zgaruvchilari

Namunasi `.env.example` da (faqat placeholder). Haqiqiy qiymatlar ildizdagi `.env` da — u git'ga tushmaydi.
`DATABASE_URL`, `REDIS_URL`, `ANTHROPIC_API_KEY`, `TELEGRAM_BOT_TOKEN`, `SECRET_KEY`, `NEXT_PUBLIC_API_URL` (+ `PORT`, `WEB_ORIGIN`).

## Buyruqlar

- `pnpm install` — bog'liqliklar (api uchun `prisma generate` avtomatik). Windows'da `EPERM symlink` xatosi chiqsa, qayta ishga tushiring.
- `pnpm dev` — hammasini dev rejimida (api/bot ildizdagi `.env` ni o'qiydi)
- `pnpm build` / `pnpm typecheck` / `pnpm lint` / `pnpm format`
- `pnpm --filter @toshbekov/api db:push` — Prisma sxemasini DB'ga qo'llash
- shadcn komponent qo'shish: `cd apps/web && pnpm dlx shadcn@latest add <nom>`
- API tekshiruv: `GET /health` → `{status, db, time}` (DB yo'q bo'lsa 503)
