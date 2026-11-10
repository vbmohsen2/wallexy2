# AGENTS.md

AdonisJS v5 (TypeScript) + Inertia.js + Vue 3 SSR storefront (`wallexy2`), Persian/RTL wallpaper shop. Single app, no monorepo. There is no README; this file is the onboarding source.

## Commands

- Install with `npm install`. Use npm: `package-lock.json` is tracked, `yarn.lock` is gitignored, and `.npmrc` sets `legacy-peer-deps=true`.
- Dev: `npm run dev` (`node ace serve --watch`; Adonis + Encore webpack dev middleware).
- SSR bundle: `npm run build:ssr` (or `node ace ssr:build` / `node ace ssr:watch`). Run once before `npm run dev` on a fresh clone: `inertia/` is gitignored and SSR is enabled for allow-listed pages, so those pages crash without `inertia/ssr/ssr.js`.
- Typecheck: `npx tsc --noEmit` (currently passes). No ESLint, Prettier, or CI config exists.
- Tests: no npm test script. Run `node -r @adonisjs/require-ts/build/register test.ts`; a single file with `--files tests/functional/foo.spec.ts`. Tests boot the full app (`AppProvider` runs DB jobs), so Postgres must be reachable. `tests/functional/hello_world.spec.ts` is stale and expects the old welcome page.
- DB: `node ace migration:run` / `migration:rollback` / `migration:fresh`. Routes: `node ace list:routes`. Database is Postgres (`DB_CONNECTION=pg`).
- Production: `npm run build`, then `node build/server.js` or `pm2 start ecosystem.config.js`. Do not use `npm start`; it points at a nonexistent root `server.js`.

## Architecture

- `start/routes.ts` defines all routes; `start/kernel.ts` registers global/named middleware (`auth`, `admin`). Admin routes require `auth` then `admin`; `Admin` returns 404 unless `user.type >= 1`.
- Auth is session-based with SMS OTP; the user identifier is `number`. Shared Inertia props (`errors`, `alert`, `authenticated`, `user`) live in `start/inertia.ts`.
- `pages/` holds Inertia page components, resolved as `pages/${name}` by `resources/js/app.js` and `resources/js/ssr.js`. Controllers call `inertia.render('product/show', props)`.
- `resources/` holds shared Vue components, layouts, CSS, JS entrypoints, and the webpack `@` alias (points to `resources`, not the repo root). Vuex lives in `store/`.
- `config/inertia.ts` `ssr.allowList` controls which components render server-side. Adding an SSR page requires adding its component name there and rebuilding the SSR bundle.
- `app/Helpers/Shared.ts` contains the category/product query logic and uses Postgres-specific SQL (`price::int`, `ilike`, `random()`). Do not switch database drivers casually.
- `providers/AppProvider.ts` runs in-process timers: `Order` every 10s, `Bank`/`Limit` every 30 min, `Sitemap`/`Category` weekly. Every server process runs them; there is no external queue or cron.
- Uploads use `App/Helpers/FileSystem.PATH` (`STATIC_PATH`, default `/var/server/static/wallexy`) and are served from `static.wallexy.ir`, not `public/`.
- SMS credentials are hardcoded in `app/Helpers/SMS.ts`; the `SMSIR_*` env vars are unused.

## Gotchas

- `.env` is gitignored and `.env.example` is stale (only PG vars). A working `.env` needs at least `APP_KEY`, `DB_CONNECTION=pg`, `PG_*`, `SESSION_DRIVER`, `DRIVE_DISK`, and `STATIC_PATH`.
- Generated/ignored paths: `build/`, `public/assets/`, `inertia/`, `node_modules/`. Never edit them; rebuild instead.
- Vue is pinned to `3.2.47` and `@types/node` to `18.11.19` for SSR build compatibility. Don't bump them without re-testing `npm run build`.
- UI copy is Persian and RTL; keep new user-facing strings Persian.
