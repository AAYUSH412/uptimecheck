# UptimeCheck — Project Improvement Plan

> **Runtime / Package Manager: Bun only** (no switching to npm/pnpm/yarn)
> **Stack snapshot:** Bun · Next.js 15 · Express 4 · Prisma · PostgreSQL · Bun WebSocket · Solana web3.js · Clerk · Tailwind CSS v4 · Turbo

> **Legend:** ✅ Already implemented · ❌ Still to do

---

## 📊 Project Overview

UptimeCheck is a **web uptime monitoring platform** built as a Bun-powered Turborepo monorepo. Users add website URLs through a Next.js dashboard; a central **Hub** distributes ping tasks to connected **Validators** over WebSocket; Validators cryptographically sign results using a Solana keypair; the **API** serves user-facing CRUD operations guarded by Clerk JWT tokens; and all data lands in a PostgreSQL database via Prisma.

```
uptimecheck/
├── apps/
│   ├── api          → Express REST API (port 4000)
│   ├── frontend     → Next.js 15 dashboard (Clerk auth)
│   ├── hub          → Bun WebSocket hub (port 4001) — dispatches pings
│   └── validator    → Bun WebSocket client — performs pings & signs results
└── packages/
    ├── db           → Prisma + PostgreSQL (shared client)
    └── common       → Shared TypeScript types, Zod schemas, constants
```

---

## 1. `apps/api` — REST API (Express 4)

### Current State
- Actual routes: `POST /api/v1/website`, `GET /api/v1/website`, `DELETE /api/v1/website`
- Auth via Clerk JWT (`middleware.ts`)
- ✅ Rate limiter per user (`middleware/rateLimiter.ts`)
- ✅ Global async error handling via `asyncHandler.ts` + error middleware
- ✅ CORS configured from `ALLOWED_ORIGINS` env var (`config/cors.ts`)
- ✅ Request logger (`requestLogger` middleware)
- ✅ `GET /healthz` health check (returns `{ status, uptime, db }`)

### Remaining Improvements

#### 🔴 Critical
| # | Issue | Fix |
|---|-------|-----|
| 1 | No Zod input validation on `POST /website` | Use schema from `common/schemas.ts` — validate `url` is a valid URL string |
| 2 | `DELETE /website` has no 404/ownership guard | Check website exists and belongs to `userId` before setting `disabled: true` |

#### 🟡 Important
| # | Issue | Fix |
|---|-------|-----|
| 3 | `getWebsite` fetches all ticks without limit | Add `take: 100` to Prisma query to avoid large payloads on active monitors |
| 4 | Auth middleware doesn't distinguish expired vs invalid JWT | Return `401` for expired, `403` for invalid — cleaner client-side error handling |

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 5 | Still on Express v4 | v5 propagates async errors automatically — removes need for `asyncHandler` wrapper |

---

## 2. `apps/frontend` — Next.js 15 Dashboard

### Current State
- ✅ Demo mode at `/demo/dashboard` — fully frontend-only, no backend required
- ✅ `DashboardSkeleton.tsx` loading skeleton
- ✅ `EmptyState.tsx` for zero websites
- ✅ `AlertDialog` for delete confirmation
- ✅ Next.js error boundary (`error.tsx`)
- ✅ `NEXT_PUBLIC_BACKEND_URL` has dev fallback (`|| 'http://localhost:4000'` in dev)
- ✅ Only `framer-motion` dep (no duplicate `motion` package)
- Real dashboard polls the API every 60s via `useWebsite.tsx`

### Remaining Improvements

#### 🔴 Critical
| # | Issue | Fix |
|---|-------|-----|
| 1 | ✅ | Metadata claimed "50+ locations every 30 seconds" — misleading | Fixed in `Features.tsx`, `HowItWorks.tsx`, `Hero.tsx`, `about/page.tsx`, `Dashboard.tsx` |

#### 🟡 Important
| # | Issue | Fix |
|---|-------|-----|
| 2 | Dashboard polls every 60s — not truly real-time | Consider SSE endpoint on API to push updates when hub stores a new tick |
| 3 | All ticks fetched and processed client-side (unbounded) | Pass `?limit=100` in the API request |

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 4 | No accessibility audit | Run Lighthouse; fix contrast, missing ARIA labels |
| 5 | Dark-mode only (`forcedTheme="dark"`) | Consider light mode with a toggle |

---

## 3. `apps/hub` — WebSocket Hub

### Current State
- ✅ Refactored into separate modules: `callbacks.ts`, `validators.ts`, `logger.ts`
- ✅ Round-robin `pickValidator()` — one validator per website per cycle
- ✅ Structured logger (`logger.ts`)
- ✅ `GET /status` endpoint showing connected validators + pending callbacks
- ✅ Auth timeout guard — unauthenticated connections killed quickly

### Remaining Improvements

#### 🔴 Critical
| # | Issue | Fix |
|---|-------|-----|
| 1 | `CALLBACKS` map grows if validators don't respond | Add a TTL: delete unresolved callbacks after 30s and log a warning |

#### 🟡 Important
| # | Issue | Fix |
|---|-------|-----|
| 2 | Confirm `HUB_COST_PER_VALIDATION` is read from env | Verify `index.ts` uses `process.env.HUB_COST_PER_VALIDATION` not a hardcoded `100` |

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 3 | `setInterval` drift not corrected | Use self-correcting scheduler for precise 60s cycles |

---

## 4. `apps/validator` — Validator Node

### Current State
- ✅ `HUB_URL` read from env
- ✅ Public IP and location detected via `ipapi.co` on startup
- ✅ `axios` removed from dependencies
- ✅ Exponential backoff reconnect (5s base → 60s max)
- ✅ Graceful shutdown on `SIGTERM`/`SIGINT`
- ✅ WS-level ping every 30s

### Remaining Improvements

#### 🟡 Important
| # | Issue | Fix |
|---|-------|-----|
| 1 | `latency` may be sent as `1000` on request error | Should be `null` (matches `Float?` in schema) — avoids misleading data |
| 2 | Confirm WS ping sends an actual `ws.ping()` frame | A log-only heartbeat doesn't let the hub detect dead connections |

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 3 | No metrics exposure | Expose `GET /metrics` (Prometheus-style) for infrastructure monitoring |

---

## 5. `packages/db` — Prisma + PostgreSQL

### Current State
All previously identified critical and important improvements are implemented ✅:
- ✅ `@@index([websiteId, createdAt])` on `WebsiteTick`
- ✅ `@@index([userId])` on `Website`
- ✅ `@@index([publickey])` on `Validator`
- ✅ `name String?` on `Website`
- ✅ `checkIntervalSeconds Int @default(60)` on `Website`
- ✅ `createdAt DateTime @default(now())` on `User`
- ✅ `@@unique([userId, url])` on `Website`

### Remaining Improvements

#### 🟡 Important
| # | Issue | Fix |
|---|-------|-----|
| 1 | `WebsiteTick` rows are never pruned | Add a scheduled job or Prisma script to delete ticks older than 30 days |

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 2 | Only `UP` / `DOWN` statuses | Add `DEGRADED` / `TIMEOUT` to `WebsiteStatus` enum for richer reporting |
| 3 | No Prisma soft-delete extension | Auto-filter `disabled: false` without repeating the `where` clause |

---

## 6. `packages/common` — Shared Types

### Current State
All previously identified improvements are implemented ✅:
- ✅ `constants.ts` — `COST_PER_VALIDATION`, timeouts, intervals
- ✅ `schemas.ts` — Zod validation schemas
- ✅ `errors.ts` — shared error codes and messages

### Remaining Improvements

#### 🟢 Nice to Have
| # | Issue | Fix |
|---|-------|-----|
| 1 | Types are flat in `index.ts` | Organize into `types/messages.ts`, `types/api.ts` for clarity at scale |
| 2 | No JSDoc on types | Add documentation for IDE inline hints across all apps |

---

## 🏗️ Cross-Cutting / Monorepo Level

| # | Status | Issue | Fix |
|---|--------|-------|-----|
| 1 | ✅ | Root `package.json` had `next`, `react`, `react-dom` as root-level deps | Removed — they belong only in `apps/frontend/package.json` |
| 2 | ✅ | No CI/CD pipeline | Added `.github/workflows/ci.yml`: `bun install` → `db:generate` → `check-types` → `lint` → `build` |
| 3 | ❌ | No test suite | Add Bun's built-in `bun test`: unit tests for `common` schemas, integration tests for API routes |
| 4 | ❌ | `turbo.json` has no `env` key | Add `env` fields so Turbo cache is invalidated on env changes |
| 5 | ✅ | `.env` committed risk | `.gitignore` correctly ignores all `.env` and `.env.local` variants |

---

## 📅 Remaining Priority Order

```
Phase 1 — Correctness ✅ DONE
  ├── ✅ API: Zod validation on POST /website (already implemented)
  ├── ✅ API: Ownership/404 check on DELETE /website (already implemented)
  ├── ✅ Hub: CALLBACKS TTL/timeout (already implemented)
  └── ✅ Frontend: Fix misleading metadata copy (fixed in 5 files)

Phase 2 — Reliability ✅ DONE
  ├── ✅ Validator: null latency on error (already implemented)
  ├── DB: Add WebsiteTick data retention cron (future — needs cron infra)
  └── ✅ Monorepo: Removed next/react from root package.json

Phase 3 — Developer Experience (Partially Done)
  ├── ✅ CI/CD: GitHub Actions pipeline (.github/workflows/ci.yml)
  ├── Tests: Bun test suite for common + API (future)
  └── Frontend: SSE / WebSocket push updates (future — replace 60s poll)

Phase 4 — Polish (Future)
  ├── Frontend: Accessibility audit (Lighthouse)
  ├── DB: DEGRADED/TIMEOUT status enum
  └── Validator: Prometheus metrics endpoint
```

---

*Last updated: 2026-03-15. Reflects codebase state as of latest commits.*
