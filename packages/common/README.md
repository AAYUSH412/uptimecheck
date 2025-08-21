# Common Package

The `common` package contains shared TypeScript types and interfaces used across all UptimeCheck services. This package ensures type safety and consistency between the API, Hub, Validator, and Frontend services.

## 📋 Overview

This package defines the core message interfaces for WebSocket communication between the Hub and Validator services, providing a centralized location for shared types that maintain consistency across the distributed architecture.

## 🔧 Key Components

### Message Types

#### **SignupIncomingMessage**
Used when a validator registers with the hub:
```typescript
interface SignupIncomingMessage {
    ip: string;           // Validator's IP address
    publicKey: string;    // Validator's Solana public key
    signedMessage: string; // Cryptographically signed message for authentication
    callbackId: string;   // Unique identifier for the request
}
```

#### **ValidateIncomingMessage**
Used when a validator reports website status to the hub:
```typescript
interface ValidateIncomingMessage {
    callbackId: string;    // Unique identifier for the request
    signedMessage: string; // Cryptographically signed message
    status: 'UP' | 'DOWN'; // Website status
    latency: number;       // Response time in milliseconds
    websiteId: string;     // ID of the monitored website
    validatorId: string;   // ID of the reporting validator
}
```

#### **SignupOutgoingMessage**
Hub's response when a validator successfully registers:
```typescript
interface SignupOutgoingMessage {
    validatorId: string;   // Assigned validator ID
    callbackId: string;    // Original request callback ID
}
```

#### **ValidateOutgoingMessage**
Hub's request to validator to check a website:
```typescript
interface ValidateOutgoingMessage {
    url: string;          // URL to validate
    callbackId: string;   // Unique identifier for the request
    websiteId: string;    // ID of the website to check
}
```

## 🚀 Usage

### Installation
```bash
bun install
```

### Import in Other Services
```typescript
import { 
    IncomingMessage, 
    OutgoingMessage, 
    SignupIncomingMessage,
    ValidateIncomingMessage 
} from "common";
```

## 🏗️ Architecture Role

The common package serves as the communication contract between:
- **Hub Service**: Central coordinator that manages validators
- **Validator Service**: Distributed workers that perform uptime checks
- **API Service**: REST endpoints that interact with the database
- **Frontend**: Next.js application that displays monitoring data

## 📦 Dependencies

This package has minimal dependencies and serves as a pure TypeScript definitions package.

## 🔗 Related Services

- [`hub`](../apps/hub/README.md) - Central WebSocket hub
- [`validator`](../apps/validator/README.md) - Uptime check workers
- [`api`](../apps/api/README.md) - REST API service
- [`db`](../db/README.md) - Database client and schema
