# Use Bun runtime image
FROM oven/bun:1.2.18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
COPY apps/api/package.json ./apps/api/
COPY apps/frontend/package.json ./apps/frontend/
COPY apps/hub/package.json ./apps/hub/
COPY apps/validator/package.json ./apps/validator/
COPY packages/common/package.json ./packages/common/
COPY packages/db/package.json ./packages/db/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY turbo.json ./

# Install dependencies
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN cd packages/db && bun prisma generate

# Build all packages
RUN bun run build

# Production API image
FROM base AS api
WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 8080
CMD ["bun", "apps/api/dist/index.js"]

# Production Hub image
FROM base AS hub
WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/hub/dist ./apps/hub/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

CMD ["bun", "apps/hub/dist/index.js"]

# Production Validator image
FROM base AS validator
WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/validator/dist ./apps/validator/dist
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

CMD ["bun", "apps/validator/dist/index.js"]
