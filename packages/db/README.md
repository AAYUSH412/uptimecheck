# 🗄 @uptime/db

Centralized PostgreSQL database layer for UptimeCheck using Prisma ORM. Manages schema, migrations, and data access for all services.

## 🎯 Purpose

The `db` package provides:
- **Unified Schema**: Single source of truth for data structure
- **Type-safe Client**: Auto-generated Prisma Client
- **Migrations**: Version-controlled database changes
- **Seeding**: Initial data population for development
- **Studio**: GUI for data exploration and manipulation

All other services import from this package to access the database.

## 🗂 Data Model

### User
Represents a platform user (managed by Clerk, not a local auth table).

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### Website
A URL that is being monitored.

```prisma
model Website {
  id                   String       @id @default(uuid())
  name                 String?      // Optional friendly name
  url                  String       // The URL to monitor
  userId               String       // Clerk user ID
  disabled             Boolean      @default(false)
  checkIntervalSeconds Int          @default(60)
  ticks                WebsiteTick[] // Associated check results
  
  @@unique([userId, url]) // User can't monitor same URL twice
  @@index([userId])
}
```

### Validator
A distributed worker node performing uptime checks globally.

```prisma
model Validator {
  id            String       @id @default(uuid())
  publickey     String       // Ed25519 public key (Solana style)
  location      String       // City/Country where it runs
  ip            String       // Public IP address
  pendingPayout Int          @default(0)
  ticks         WebsiteTick[] // Results submitted by this validator
  
  @@index([publickey])
}
```

### WebsiteTick
Individual check result (UP/DOWN + latency).

```prisma
model WebsiteTick {
  id          String        @id @default(uuid())
  websiteId   String
  validatorId String
  createdAt   DateTime      @default(now())
  status      WebsiteStatus // UP or DOWN
  latency     Float?        // Response time in ms (null if timeout)
  website     Website       @relation(...)
  validator   Validator     @relation(...)
  
  @@index([websiteId, createdAt])
}

enum WebsiteStatus {
  UP
  DOWN
}
```

## 📊 Relationships

```mermaid
erDiagram
    USER ||--o{ WEBSITE : manages
    WEBSITE ||--o{ WEBSITETICK : "has history"
    VALIDATOR ||--o{ WEBSITETICK : "performs"
    
    USER {
        string id
        string email
        datetime createdAt
    }
    
    WEBSITE {
        string id
        string name
        string url
        string userId
        boolean disabled
        int checkIntervalSeconds
    }
    
    VALIDATOR {
        string id
        string publickey
        string location
        string ip
        int pendingPayout
    }
    
    WEBSITETICK {
        string id
        string websiteId
        string validatorId
        datetime createdAt
        enum status
        float latency
    }
```

## 🔧 Setup

### 1. Environment Variables

Create `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/uptimecheck"
```

### 2. Generate Prisma Client

```bash
bun run db:generate
```

This creates `node_modules/.prisma/client` with TypeScript types.

### 3. Create/Update Schema

**For Development** (quick prototyping):
```bash
bun run db:push
```
Applies schema changes directly (⚠️ may lose data).

**For Production** (safe migrations):
```bash
bun run db:migrate
```
Creates proper migration files in `prisma/migrations/`.

### 4. Seed Initial Data

```bash
bun run db:seed
```

Runs `seed.ts` to populate test data.

## 💻 Usage in Other Services

### Import Prisma Client

```typescript
import { prismaclient } from 'db/client';

// Query
const websites = await prismaclient.website.findMany({
  where: { userId: 'clerk-user-123' }
});

// Create
const newWebsite = await prismaclient.website.create({
  data: {
    url: 'https://example.com',
    userId: 'clerk-user-123',
    checkIntervalSeconds: 60
  }
});

// Update
await prismaclient.website.update({
  where: { id: 'web-123' },
  data: { disabled: true }
});

// Delete
await prismaclient.website.delete({
  where: { id: 'web-123' }
});
```

### Transaction Support

```typescript
await prismaclient.$transaction(async (tx) => {
  const website = await tx.website.create({...});
  const tick = await tx.websiteTick.create({...});
  return { website, tick };
});
```

## 🖥 Database Studio

Open interactive GUI:

```bash
bun run db:studio
```

Opens `http://localhost:5555` for:
- Browsing tables
- Editing records
- Running queries
- Monitoring performance

## 📜 Migration History

```
prisma/migrations/
├── 20250325092309_init/           # Initial schema
├── 20250325101504_add_disabled/   # Added disabled field
└── 20250331064059_add_payout/     # Added pendingPayout
```

View migration status:
```bash
bun run db:status
```

## 🧪 Testing

Reset database for testing:

```bash
bun run db:reset
```

This:
1. Drops all tables
2. Recreates from schema
3. Runs seed.ts

⚠️ **Destructive** — only use in development!

## 📊 Common Queries

### Get Uptime Percentage

```typescript
const ticks = await prismaclient.websiteTick.findMany({
  where: {
    websiteId: 'web-123',
    createdAt: {
      gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
    }
  }
});

const uptime = (ticks.filter(t => t.status === 'UP').length / ticks.length) * 100;
```

### Get Average Latency

```typescript
const ticks = await prismaclient.websiteTick.findMany({
  where: { websiteId: 'web-123' }
});

const avgLatency = ticks.reduce((sum, t) => sum + (t.latency || 0), 0) / ticks.length;
```

### Get Top Validators

```typescript
const topValidators = await prismaclient.validator.findMany({
  include: {
    _count: { select: { ticks: true } }
  },
  orderBy: { _count: { ticks: 'desc' } },
  take: 10
});
```

## 🚨 Troubleshooting

### Migration Failed
```bash
bun run db:migrate:dev --name fix_schema
```

### Can't Connect to DB
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
bun run db:push --force
```

### Lost Type Information
```bash
bun run db:generate
```

Re-generates Prisma Client types.

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs)
- [SQL Query Optimization](https://www.postgresql.org/docs/current/performance.html)

## 🤝 Contributing

When modifying schema:
1. Make changes in `schema.prisma`
2. Create migration: `bun run db:migrate:dev --name <name>`
3. Update seed if needed
4. Update documentation
5. Test with `bun run db:reset`

## 📄 License

MIT
