# Hub Service

The Hub service is the central coordinator of the UptimeCheck monitoring platform. It manages validator registration, distributes monitoring tasks, and aggregates results using WebSocket communication. Built with Bun's native WebSocket support, it handles real-time communication between validators and stores monitoring data.

## 📋 Overview

The Hub acts as the orchestration layer that:
- Manages validator registrations and authentication
- Distributes website monitoring tasks to available validators
- Receives and stores uptime check results
- Handles cryptographic verification of validator messages
- Manages validator payouts and rewards

## 🚀 Getting Started

### Prerequisites
- Bun runtime installed
- PostgreSQL database running
- Database migrations completed
- Solana validator keys configured

### Setup & Installation
```bash
# Install dependencies
bun install

# Start the Hub service
bun index.ts
```

The Hub WebSocket server will start on **ws://localhost:4001**

## 🏗️ Architecture

### **Core Components**

#### **WebSocket Server**
- Handles real-time bidirectional communication
- Manages persistent connections with validators
- Processes incoming and outgoing messages
- Maintains connection state and health

#### **Validator Management**
- Maintains registry of available validators
- Handles validator signup and authentication
- Distributes monitoring tasks based on availability
- Tracks validator performance and reliability

#### **Cryptographic Security**
- Validates Solana keypair signatures
- Ensures message authenticity and integrity
- Prevents unauthorized validator registration
- Secures all communication channels

#### **Task Distribution**
- Intelligently assigns monitoring tasks
- Balances load across available validators
- Handles validator failures and retries
- Optimizes for geographic distribution

## 🔐 Security & Authentication

### **Solana Keypair Verification**
```typescript
// Validator registration requires cryptographic proof
const publicKey = new PublicKey(data.data.publicKey);
const signedMessage = naclUtil.decodeBase64(data.data.signedMessage);
const messageBytes = new TextEncoder().encode(message);

const isValid = nacl.sign.detached.verify(
    messageBytes,
    signedMessage,
    publicKey.toBytes()
);
```

### **Message Signing**
All validator communications must be cryptographically signed:
- **Registration**: Validators prove ownership of private key
- **Status Reports**: Each monitoring result is signed
- **Authentication**: Continuous verification of validator identity

## 📡 WebSocket Communication

### **Message Types**

#### **Incoming Messages (from Validators)**

**Validator Signup**
```typescript
{
  type: "signup",
  data: {
    ip: string,           // Validator's IP address
    publicKey: string,    // Solana public key
    signedMessage: string, // Cryptographic signature
    callbackId: string    // Request identifier
  }
}
```

**Monitoring Results**
```typescript
{
  type: "validate",
  data: {
    callbackId: string,    // Request identifier
    signedMessage: string, // Cryptographic signature
    status: "UP" | "DOWN", // Website status
    latency: number,       // Response time in ms
    websiteId: string,     // Monitored website ID
    validatorId: string    // Reporting validator ID
  }
}
```

#### **Outgoing Messages (to Validators)**

**Registration Confirmation**
```typescript
{
  type: "signup",
  data: {
    validatorId: string,  // Assigned validator ID
    callbackId: string    // Original request ID
  }
}
```

**Monitoring Requests**
```typescript
{
  type: "validate",
  data: {
    url: string,          // URL to monitor
    callbackId: string,   // Request identifier
    websiteId: string     // Website ID in database
  }
}
```

## 💾 Database Integration

### **Validator Registration**
```typescript
// Store new validator in database
const validator = await prismaclient.validator.create({
  data: {
    publickey: publicKey,
    location: location,
    ip: ipAddress,
    pendingPayout: 0
  }
});
```

### **Monitoring Data Storage**
```typescript
// Store validation results
const tick = await prismaclient.websiteTick.create({
  data: {
    websiteId: data.websiteId,
    validatorId: data.validatorId,
    status: data.status,
    latency: data.latency,
    createdAt: new Date()
  }
});
```

## 🎯 Key Features

### **Real-time Coordination**
- Instant validator registration and task assignment
- Live monitoring result aggregation
- Real-time validator health monitoring
- Dynamic load balancing and failover

### **Validator Rewards System**
- Track validator performance metrics
- Calculate earnings based on successful validations
- Manage pending payouts in Solana lamports
- Incentivize reliable monitoring participation

### **Geographic Distribution**
- Support for validators across multiple regions
- Location-aware task distribution
- Global monitoring coverage
- Regional failover capabilities

### **High Availability**
- Automatic validator reconnection handling
- Graceful degradation during failures
- Message queuing and retry mechanisms
- Connection state management

## 🔄 Monitoring Workflow

1. **Validator Registration**
   - Validator connects to Hub WebSocket
   - Provides cryptographic proof of identity
   - Hub stores validator in database
   - Confirmation sent to validator

2. **Task Distribution**
   - Hub queries websites needing monitoring
   - Selects available validators based on criteria
   - Sends monitoring requests with website details
   - Tracks pending validations

3. **Result Processing**
   - Receives signed monitoring results from validators
   - Verifies cryptographic signatures
   - Stores results in database
   - Updates validator performance metrics

4. **Reward Calculation**
   - Track successful validations
   - Calculate earnings (100 lamports per validation)
   - Update validator pending payouts
   - Process payment distributions

## 🛠️ Configuration

### **Environment Variables**
```bash
# Database connection (shared with other services)
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"

# Optional: Custom port configuration
HUB_PORT=4001
```

### **Constants**
```typescript
const COST_PER_VALIDATION = 100; // Lamports per successful check
const MAX_VALIDATORS = 1000;     // Maximum concurrent validators
const VALIDATION_TIMEOUT = 30;   // Seconds before timeout
```

## 🔧 Development

### **Adding New Message Types**
1. Define interfaces in `common` package
2. Add message handlers in WebSocket event listener
3. Implement validation and business logic
4. Update database operations if needed

### **Testing WebSocket Connection**
```bash
# Test validator connection
wscat -c ws://localhost:4001

# Send test signup message
{"type":"signup","data":{"ip":"127.0.0.1","publicKey":"...","signedMessage":"...","callbackId":"test-123"}}
```

### **Monitoring Hub Health**
```bash
# Check active connections
curl http://localhost:4001/health

# View validator registry
curl http://localhost:4001/validators
```

## 📊 Performance Metrics

### **Scalability**
- Supports thousands of concurrent validator connections
- Handles high-frequency monitoring requests
- Efficient message routing and processing
- Optimized database operations

### **Reliability**
- Automatic connection recovery
- Message delivery guarantees
- Transaction consistency
- Error handling and logging

## 🔗 Related Services

- [`validator`](../validator/README.md) - Distributed workers that connect to this hub
- [`api`](../api/README.md) - REST API that reads monitoring data stored by hub
- [`db`](../../packages/db/README.md) - Database where hub stores all monitoring results
- [`common`](../../packages/common/README.md) - Shared message types and interfaces

## 🚀 Production Deployment

### **Scaling Considerations**
- Load balancing across multiple hub instances
- Redis for shared validator state
- Message queue for reliable delivery
- Database connection pooling

### **Monitoring & Observability**
- WebSocket connection metrics
- Validator performance tracking
- Database operation monitoring
- Error rate and latency alerts
