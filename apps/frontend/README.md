# 🎨 UptimeCheck Frontend

The Next.js 15 web application for UptimeCheck. Features a real-time monitoring dashboard, full landing page, and a **no-login demo mode** that simulates the entire system without any backend.

## ⚡ Features

- **📊 Real-time Dashboard** — Live status, uptime %, and latency for each monitored website
- **🎭 Demo Mode** — Try `/demo/dashboard` with no account or backend required
- **🌙 Dark Mode** — Dark-only UI with accent theming
- **🔒 Clerk Auth** — Enterprise authentication with JWT token handoff to the API
- **⚡ Next.js 15** — App Router with Turbopack for instant dev rebuilds
- **🎨 Beautiful UI** — Shadcn/ui + Tailwind CSS v4 + Framer Motion animations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and Bun 1.2+
- Clerk account for authentication
- API service running on port 4000 (or use `/demo/dashboard` — no backend needed)

```bash
# Install dependencies (from monorepo root)
bun install

# Set up environment variables
cp apps/frontend/.env.example apps/frontend/.env.local
# Edit .env.local with your Clerk keys

# Start development server
bun run dev --filter=frontend
# or from this directory:
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) — or go straight to [http://localhost:3000/demo/dashboard](http://localhost:3000/demo/dashboard) to try the demo.

### Environment Variables

Create `apps/frontend/.env.local`:

```bash
# Clerk Authentication (https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-clerk-key"
CLERK_SECRET_KEY="sk_test_your-clerk-secret"

# Backend API URL
NEXT_PUBLIC_BACKEND_URL="http://localhost:4000"
```

> `NEXT_PUBLIC_BACKEND_URL` is only required for the authenticated dashboard. The demo at `/demo/dashboard` works without it.

---

## 🎭 Demo Mode

The `/demo/dashboard` route runs a full frontend-only simulation — no login, no backend, no database.

- **`DemoContext`** simulates 3 validator nodes (US-East-1, EU-Central-1, AP-South-1) firing every 3 seconds
- **`SimulatedTerminal`** shows live cryptographic signing logs as if validators were running
- Add/delete websites works without any API calls
- Navigate to individual monitor detail pages per site

Access it at: `/demo/dashboard`

---

## 📁 Directory Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (Hero, Features, etc.)
│   ├── layout.tsx                  # Root layout + Clerk provider
│   ├── globals.css
│   ├── not-found.tsx
│   ├── about/page.tsx
│   ├── changelog/page.tsx
│   ├── pricing/page.tsx
│   ├── status/page.tsx
│   └── (routes)/
│       ├── dashboard/              # Protected dashboard (Clerk auth required)
│       │   ├── page.tsx
│       │   ├── layout.tsx
│       │   ├── loading.tsx
│       │   ├── error.tsx
│       │   ├── alerts/page.tsx
│       │   ├── settings/page.tsx
│       │   └── monitor/[id]/page.tsx
│       └── demo/                   # Demo dashboard (no auth, no backend)
│           └── dashboard/
│               ├── page.tsx
│               ├── layout.tsx
│               └── monitor/[id]/page.tsx
├── components/
│   ├── Appbar.tsx
│   ├── Dashboard/
│   │   ├── DashboardOverview.tsx   # Main grid view (supports isDemo prop)
│   │   ├── DashboardSidebar.tsx    # Navigation (supports basePath + isDemo)
│   │   ├── AddWebsiteDialog.tsx    # Modal for adding sites
│   │   ├── SimulatedTerminal.tsx   # Floating terminal for demo logs
│   │   ├── DashboardSkeleton.tsx
│   │   ├── EmptyState.tsx
│   │   ├── WebsiteNavigation.tsx
│   │   ├── WebsiteSidebar.tsx
│   │   ├── dash.tsx                # Real dashboard (uses useWebsite hook)
│   │   ├── mockData.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── landing/                    # Landing page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── SocialProof.tsx
│   │   ├── PricingTeaser.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── ui/                         # Shadcn/ui components
├── context/
│   └── DemoContext.tsx             # Simulated monitoring state for demo
├── actions/
│   └── website.ts                  # Server action: fetch + aggregate tick data
├── hooks/
│   └── useWebsite.tsx              # Client hook: poll API every 60s
└── middleware.ts                   # Clerk auth middleware for dashboard routes
```

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `15.2+` | App Router + Turbopack |
| **React** | `19.0+` | Concurrent features |
| **TypeScript** | `5.8+` | Type safety |
| **Tailwind CSS** | `4.1+` | Utility-first styling |
| **Shadcn/ui** | Latest | Component library |
| **Radix UI** | Latest | Accessible primitives |
| **Framer Motion** | `12.6+` | Animations |
| **Clerk** | `6.12+` | Authentication |
| **Axios** | `1.8+` | API requests |
| **Sonner** | `2.0+` | Toast notifications |

---

## 🚀 Deployment (Vercel)

This app is **fully self-contained** — `apps/frontend/package.json` has zero workspace references, so it deploys cleanly on Vercel.

In Vercel project settings:
- **Root Directory**: `apps/frontend`
- **Build Command**: `bun run build` *(auto-detected from vercel.json)*
- **Install Command**: `bun install` *(auto-detected from vercel.json)*

**Required environment variables in Vercel:**
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_BACKEND_URL=https://your-api-domain.com
```

---

## 🔗 Related Services

| Service | Purpose | Documentation |
|---------|---------|---------------|
| **🔌 API** | REST backend | [API README](../api/README.md) |
| **🎯 Hub** | WebSocket coordinator | [Hub README](../hub/README.md) |
| **🗄️ Database** | Prisma + PostgreSQL | [DB README](../../packages/db/README.md) |
| **📝 Common** | Shared types | [Common README](../../packages/common/README.md) |
