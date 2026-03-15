# 📦 @uptime/common

Shared utilities, type definitions, and constants used across the UptimeCheck monorepo. This package ensures consistency between the API, Hub, Validator, and Frontend services through centralized type safety.

## 🎯 Purpose

The `common` package serves as the **single source of truth** for:
- Type definitions for WebSocket communication
- Validation schemas using Zod
- Shared constants and configuration defaults
- Common error handling utilities

This prevents type mismatches between different services and ensures all components can communicate reliably.

## 📁 Contents

```
packages/common/
├── index.ts           # Main type exports
├── constants.ts       # Shared constants (timeouts, intervals, etc.)
├── schemas.ts         # Zod validation schemas
├── errors.ts          # Common error types
├── package.json
├── tsconfig.json
└── README.md
```

## 🔤 Type Definitions

### Message Types

#### `SignupIncomingMessage` (Validator → Hub)
Validator sends this when connecting to the Hub:

```typescript
interface SignupIncomingMessage {
  ip: string;                    // Validator's public IP
  publicKey: string;             // Ed25519 public key (hex)
  signedMessage: string;         // Signed challenge
  callbackId: string;            // Unique request ID
  location?: string;             // Geographic location
}
```

#### `ValidateIncomingMessage` (Validator → Hub)
Validator reports a check result:

```typescript
interface ValidateIncomingMessage {
  callbackId: string;            // Task ID
  signedMessage: string;         // Signed result
  status: 'UP' | 'DOWN';         // Website status
  latency: number | null;        // Response time in ms
  websiteId: string;             // What was checked
  validatorId: string;           // Who checked it
}
```

#### `ValidateOutgoingMessage` (Hub → Validator)
Hub assigns a check task:

```typescript
interface ValidateOutgoingMessage {
  url: string;                   // Website URL to check
  callbackId: string;            // Task ID
  websiteId: string;             // Database ID
  timeout?: number;              // Override default timeout
}
```

## 📚 Constants

| Constant | Value | Purpose |
| :--- | :--- | :--- |
| `PING_TIMEOUT_MS` | 10000 | Max time waiting for validation result |
| `DEFAULT_CHECK_INTERVAL` | 60000 | Default check frequency (milliseconds) |
| `RECONNECT_MAX_ATTEMPTS` | 5 | Max reconnection retries |

See `constants.ts` for the complete list.

## ✅ Validation Schemas

All payloads are validated using Zod schemas:

```typescript
import { schemas } from 'common/schemas';

const result = schemas.validateMessage.parse(incomingData);
```

This ensures:
- Type safety at runtime
- Early error detection
- Consistent error messages

## 🛠 Usage

### Import Types

```typescript
import type { 
  SignupIncomingMessage, 
  ValidateOutgoingMessage 
} from 'common/types';

import { PING_TIMEOUT_MS } from 'common/constants';
```

### Validate Data

```typescript
import { schemas } from 'common/schemas';

try {
  const parsed = schemas.validateMessage.parse(data);
  // Data is now type-safe
} catch (error) {
  console.error('Invalid message:', error.issues);
}
```

## 📦 Build & Test

```bash
# Install dependencies
bun install

# Type check
bun run check-types

# Build (compile TypeScript)
bun run build

# Lint
bun run lint
```

## 🧪 Integration

This package is used by:
- **API**: Response types
- **Hub**: Message parsing
- **Validator**: Task and result types  
- **Frontend**: API response types

Any changes here require updates across all dependent services.

## 🤝 Contributing

When adding new message types:
1. Define the interface in `index.ts`
2. Create a Zod schema in `schemas.ts`
3. Add constants to `constants.ts`
4. Export from both files
5. Test integration across services

## 📄 License

MIT
