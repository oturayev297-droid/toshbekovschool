# CLAUDE.md

## Loyiha tuzilmasi
pnpm workspaces asosidagi monorepo:
- `apps/web`, `apps/api`, `apps/bot` — ilovalar
- `packages/shared` (`@toshbekov/shared`) — Zod sxemalar va umumiy tiplar

## Qoidalar
- Ma'lumot shakllari faqat `packages/shared` da Zod sxema sifatida aniqlanadi; tiplar `z.infer` orqali olinadi. Ilovalarda sxemani takrorlamang.
- Reja: `docs/PLAN.md`; bosqichlar va holat: `docs/BOSQICHLAR.md`.

## Buyruqlar
- `pnpm install` — bog'liqliklarni o'rnatish
- `pnpm typecheck` — barcha paketlarni tekshirish
