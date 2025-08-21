# Development Setup Guide

## Prerequisites

- [Bun](https://bun.sh/) 1.2.18+
- [Node.js](https://nodejs.org/) 18+
- [Docker](https://docker.com/) (optional)
- [PostgreSQL](https://postgresql.org/) 16+ (or use Docker)

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/AAYUSH412/uptimecheck.git
cd uptimecheck
bun install
```

### 2. Environment Setup

```bash
# Copy environment variables
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/frontend/.env.example apps/frontend/.env.local
cp packages/db/.env.example packages/db/.env
```

### 3. Database Setup

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL with Docker
docker-compose -f docker-compose.dev.yml up -d postgres-dev

# Initialize database
cd packages/db
bun prisma migrate dev
bun run seed
```

#### Option B: Local PostgreSQL
```bash
# Install PostgreSQL locally and create database
createdb uptimecheck

# Update .env files with your database URL
# DATABASE_URL="postgresql://username:password@localhost:5432/uptimecheck"

# Initialize database
cd packages/db
bun prisma migrate dev
bun run seed
```

### 4. Start Development Servers

```bash
# Start all services in development mode
bun run dev

# Or start individual services:
bun run dev --filter=frontend   # Next.js frontend on :3000
bun run dev --filter=api        # Express API on :8080
bun run dev --filter=hub        # WebSocket hub
bun run dev --filter=validator  # Uptime validator
```

## Project Structure

```
uptimecheck/
├── apps/
│   ├── api/           # REST API service (Express + Bun)
│   ├── frontend/      # Next.js web application
│   ├── hub/           # WebSocket hub for real-time communication
│   └── validator/     # Uptime monitoring service
├── packages/
│   ├── common/        # Shared TypeScript types and utilities
│   ├── db/           # Prisma database client and migrations
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── Dockerfile            # Multi-stage Docker build
```

## Available Scripts

### Root Level
- `bun run dev` - Start all services in development mode
- `bun run build` - Build all packages for production
- `bun run lint` - Lint all packages
- `bun run check-types` - Type check all packages
- `bun run format` - Format code with Prettier

### Database (packages/db)
- `bun run seed` - Seed database with initial data
- `bun run generate` - Generate Prisma client
- `bun run migrate` - Run database migrations
- `bun run studio` - Open Prisma Studio
- `bun run reset` - Reset database and run migrations

### Individual Apps
- `bun run dev --filter=<app-name>` - Start specific app in dev mode
- `bun run build --filter=<app-name>` - Build specific app

## Environment Variables

### Required Variables

#### Database (.env)
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"
```

#### API (apps/api/.env)
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=8080
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
```

#### Frontend (apps/frontend/.env.local)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_API_URL="http://localhost:8080"
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"
```

## Deployment

### Docker Production

```bash
# Build and start all services
docker-compose up -d

# Or build individual services
docker build --target api -t uptimecheck-api .
docker build --target hub -t uptimecheck-hub .
docker build --target validator -t uptimecheck-validator .
```

### Vercel (Frontend)

```bash
cd apps/frontend
vercel deploy
```

### Railway/Heroku (API)

```bash
# Set environment variables in your platform
# Deploy API service with DATABASE_URL and JWT_SECRET
```

## Database Migrations

```bash
# Create new migration
cd packages/db
bun prisma migrate dev --name migration-name

# Deploy migrations to production
bun prisma migrate deploy

# Reset database (development only)
bun prisma migrate reset
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Make sure ports 3000, 8080, and 5432 are available
2. **Database connection**: Verify PostgreSQL is running and credentials are correct
3. **Environment variables**: Ensure all required env vars are set
4. **Dependencies**: Run `bun install` if packages are missing

### Reset Everything

```bash
# Stop all services
docker-compose -f docker-compose.dev.yml down -v

# Clean install
rm -rf node_modules bun.lock
bun install

# Reset database
cd packages/db
bun prisma migrate reset --force

# Restart development
bun run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
