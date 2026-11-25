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
