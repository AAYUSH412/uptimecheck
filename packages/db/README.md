# Database Package

The `db` package provides database access and schema management for the UptimeCheck monitoring platform. Built with Prisma ORM and PostgreSQL, it handles all data persistence for websites, validators, users, and monitoring ticks.

## 📋 Overview

This package contains the Prisma schema, database client, migrations, and seeding functionality. It serves as the central data layer for all UptimeCheck services.

## 🗃️ Database Schema

### **User**
```prisma
model User {
  id    String @id @default(uuid())
  email String @unique
}
```

### **Website**
```prisma
model Website {
  id       String        @id @default(uuid())
  url      String        # Website URL to monitor
  userId   String        # Owner of the website
  ticks    WebsiteTick[] # Monitoring history
  disabled Boolean       @default(false)
}
```

### **Validator**
```prisma
model Validator {
  id            String        @id @default(uuid())
  publickey     String        # Solana public key for authentication
  location      String        # Geographic location
  ip            String        # IP address
  pendingPayout Int           @default(0) # Pending rewards in lamports
  ticks         WebsiteTick[] # Validation history
}
```

### **WebsiteTick**
```prisma
model WebsiteTick {
  id          String        @id @default(uuid())
  websiteId   String        # Reference to monitored website
  validatorId String        # Validator that performed the check
  createdAt   DateTime      # Timestamp of the check
  status      WebsiteStatus # UP or DOWN
  latency     Float         # Response time in milliseconds
  website     Website       @relation(fields: [websiteId], references: [id])
  validator   Validator     @relation(fields: [validatorId], references: [id])
}

enum WebsiteStatus {
  UP
  DOWN
}
```

## 🚀 Getting Started

### Prerequisites
- PostgreSQL database running
- Environment variables configured

### Setup
```bash
# Install dependencies
bun install

# Set up environment variables
echo 'DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"' > .env

# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# (Optional) Seed the database
bun run seed
```

## 🔧 Available Scripts

### **Database Migrations**
```bash
# Create and apply a new migration
bunx prisma migrate dev --name your_migration_name

# Reset database (⚠️ Development only)
bunx prisma migrate reset

# Check migration status
bunx prisma migrate status
```

### **Prisma Client**
```bash
# Regenerate client after schema changes
bunx prisma generate

# Open Prisma Studio for visual database management
bunx prisma studio
```

### **Database Seeding**
```bash
# Run the seed script
bun run seed
```

## 💻 Usage in Services

### Import Database Client
```typescript
import { prismaclient } from "db/client";

// Example: Create a new website
const website = await prismaclient.website.create({
  data: {
    url: "https://example.com",
    userId: "user-uuid",
    disabled: false
  }
});

// Example: Get website monitoring data
const ticks = await prismaclient.websiteTick.findMany({
  where: { websiteId: "website-uuid" },
  include: { validator: true },
  orderBy: { createdAt: 'desc' },
  take: 100
});
```

## 🏗️ Architecture Role

The database package serves as the data persistence layer for:
- **API Service**: CRUD operations for websites and users
- **Hub Service**: Validator registration and tick storage
- **Validator Service**: Reading website configurations
- **Frontend**: Displaying monitoring data and analytics

## 📊 Key Operations

### **Website Management**
- Add/remove websites to monitor
- Enable/disable monitoring for specific sites
- Track website ownership by users

### **Validator Operations**
- Register new validators with public keys
- Track validator performance and payouts
- Maintain validator location and IP information

### **Monitoring Data**
- Store uptime check results (ticks)
- Track response times and status changes
- Maintain historical monitoring data

## 🔒 Security Features

- **UUID Primary Keys**: All models use UUIDs for security
- **Cryptographic Authentication**: Validators use Solana keypairs
- **User Isolation**: Websites are tied to specific user accounts

## 🔗 Related Services

- [`api`](../apps/api/README.md) - REST API that uses this database client
- [`hub`](../apps/hub/README.md) - WebSocket hub that stores validation results
- [`common`](../common/README.md) - Shared types and interfaces
- [`frontend`](../apps/frontend/README.md) - UI that displays database data
