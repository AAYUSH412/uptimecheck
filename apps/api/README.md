# 🔌 UptimeCheck API

The REST API backbone of UptimeCheck. Handles user authentication, website management, and serves as the interface between the frontend dashboard and the PostgreSQL database.

## 🎯 Role in System

The API is the **primary entry point** for all data requests from the frontend. It enforces Clerk JWT authentication and delegates data access through the shared `db` package (Prisma).

---

## 🚀 Quick Start

### Prerequisites
- Bun runtime
- PostgreSQL database running
- Database migrations completed (`bun run db:migrate` from `packages/db`)

```bash
# Install dependencies (from monorepo root)
bun install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit .env with your values

# Start development server (auto-reload)
bun run dev
```

The API server starts on **http://localhost:4000**

---

## 🛣️ API Endpoints

### Base URL: `http://localhost:4000`

#### Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/healthz` | ❌ | Server health + DB connectivity check |

Returns: `{ status: "ok", uptime: <seconds>, db: "connected" }`

#### Website Management (`/api/v1/website`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/v1/website` | ✅ | Add a website to monitor |
| `GET` | `/api/v1/website` | ✅ | Get all websites for the authenticated user (includes ticks) |
| `DELETE` | `/api/v1/website?websiteid=<id>` | ✅ | Soft-delete a website (sets `disabled: true`) |

**Authentication**: Pass the Clerk JWT as `Authorization: Bearer <token>` — the middleware verifies it with Clerk's SDK.

**POST `/api/v1/website` body:**
```json
{ "url": "https://example.com", "name": "My Site" }
```

**GET `/api/v1/website` response:**
```json
[
  {
    "id": "uuid",
    "url": "https://example.com",
    "name": "My Site",
    "disabled": false,
    "ticks": [{ "status": "UP", "latency": 45, "createdAt": "..." }]
  }
]
```

---

## 🏗️ Architecture

| File | Purpose |
|------|---------|
| `index.ts` | Express app setup, CORS, logger, `/healthz`, global error handler |
| `routes/apiRoute.ts` | Route definitions (3 endpoints) |
| `controller/apicontroller.ts` | Business logic + Prisma queries |
| `middleware.ts` | Clerk JWT auth middleware |
| `middleware/rateLimiter.ts` | Per-user rate limiting |
| `config/cors.ts` | CORS options from `ALLOWED_ORIGINS` env |
| `config/jwt.ts` | JWT/Clerk configuration |
| `utils/asyncHandler.ts` | Wraps async controllers to forward errors |

---

## ⚙️ Environment Variables

Create `apps/api/.env` (copy from `.env.example`):

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"
JWT_SECRET="replace-with-strong-secret"
CLERK_SECRET_KEY="sk_test_replace_me"
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:4000"
PORT=4000
NODE_ENV=development
```

---

## 🔧 Development

```bash
bun run dev          # Start with auto-reload
bun run lint         # ESLint
bun run check-types  # TypeScript validation
```

After schema changes:
```bash
cd ../packages/db && bun prisma generate && bun prisma migrate dev
```

---

## 🚀 Deployment

### Docker
```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 4000
CMD ["bun", "run", "start"]
```

### Railway / Render
```bash
# Set environment variables on the platform, then deploy
railway variables set DATABASE_URL="postgresql://..."
railway variables set CLERK_SECRET_KEY="sk_live_..."
railway up
```

---

## 🔗 Related Services

| Service | Communication | Documentation |
|---------|---------------|---------------|
| **🎨 Frontend** | Calls this API via HTTP | [Frontend README](../frontend/README.md) |
| **🎯 Hub** | Shares the database (indirect) | [Hub README](../hub/README.md) |
| **🗄️ Database** | Prisma ORM | [Database README](../../packages/db/README.md) |
| **📝 Common** | Shared type definitions | [Common README](../../packages/common/README.md) |
