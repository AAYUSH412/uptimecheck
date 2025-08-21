# Validator Service

The Validator service is a distributed worker that performs actual website monitoring for the UptimeCheck platform. Validators connect to the Hub via WebSocket, receive monitoring tasks, check website availability, and report results back with cryptographic signatures for authenticity.

## 📋 Overview

Validators are the distributed workforce of UptimeCheck that:
- Connect to the Hub service for task coordination
- Perform HTTP requests to check website availability
- Measure response times and detect outages
- Report results with cryptographic signatures
- Earn rewards for successful monitoring participation

## 🚀 Getting Started

### Prerequisites
- Bun runtime installed
- Hub service running on port 4001
- Solana keypair generated for authentication
- Network connectivity to monitored websites

### Setup & Installation

#### 1. Generate Validator Keys
```bash
# Install dependencies
bun install

# Generate a new Solana keypair
bun generate-key.ts
```

This will output:
```
Public Key: AbCdEf123...
Private Key (for .env file): [1,2,3,...]
```

#### 2. Configure Environment
```bash
# Create .env file with your private key
echo 'PRIVATE_KEY=[1,2,3,4,5,...]' > .env
```

#### 3. Start Validator
```bash
# Connect to hub and start monitoring
bun index.ts
```

The validator will connect to **ws://localhost:4001** and begin receiving monitoring tasks.

## 🏗️ Architecture

### **Core Components**

#### **WebSocket Client**
- Maintains persistent connection to Hub
- Handles reconnection on failures
- Processes incoming monitoring requests
- Sends signed monitoring results

#### **HTTP Monitor**
- Performs actual website availability checks
- Measures response times and status codes
- Handles various HTTP scenarios (timeouts, errors, redirects)
- Supports different monitoring protocols

#### **Cryptographic Authentication**
- Uses Solana keypairs for identity verification
- Signs all messages sent to Hub
- Proves validator authenticity and prevents spoofing
- Ensures data integrity and non-repudiation

#### **Task Processing**
- Receives monitoring tasks from Hub
- Executes website checks asynchronously
- Formats and signs results
- Handles monitoring failures gracefully

## 🔐 Security & Authentication

### **Solana Keypair Authentication**
```typescript
const keypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.PRIVATE_KEY!))
);

// Sign monitoring results for authenticity
const message = JSON.stringify({
    websiteId,
    status,
    latency,
    timestamp: Date.now()
});

const signature = nacl.sign.detached(
    new TextEncoder().encode(message),
    keypair.secretKey
);
```

### **Message Integrity**
All communications with the Hub are cryptographically signed:
- **Registration**: Proves validator owns the private key
- **Results**: Ensures monitoring data hasn't been tampered with
- **Authentication**: Continuous verification of validator identity

## 📡 WebSocket Communication

### **Outgoing Messages (to Hub)**

#### **Validator Registration**
```typescript
{
  type: "signup",
  data: {
    ip: "192.168.1.100",      // Validator's IP address
    publicKey: "AbCdEf123...", // Solana public key
    signedMessage: "xyz789...", // Cryptographic signature
    callbackId: "unique-id"    // Request identifier
  }
}
```

#### **Monitoring Results**
```typescript
{
  type: "validate",
  data: {
    callbackId: "task-123",    // Original task identifier
    signedMessage: "abc456...", // Signed result data
    status: "UP" | "DOWN",     // Website availability
    latency: 145.67,           // Response time in milliseconds
    websiteId: "site-uuid",    // Monitored website ID
    validatorId: "val-uuid"    // This validator's ID
  }
}
```

### **Incoming Messages (from Hub)**

#### **Registration Confirmation**
```typescript
{
  type: "signup",
  data: {
    validatorId: "validator-uuid", // Assigned validator ID
    callbackId: "signup-request"   // Original request ID
  }
}
```

#### **Monitoring Tasks**
```typescript
{
  type: "validate",
  data: {
    url: "https://example.com",   // Website URL to check
    callbackId: "task-456",       // Task identifier
    websiteId: "website-uuid"     // Website ID in database
  }
}
```

## 🔍 Monitoring Process

### **Website Validation Workflow**

1. **Receive Task**
   - Hub sends monitoring request with URL
   - Validator extracts website details and task ID
   - Begins monitoring process

2. **HTTP Request**
   - Performs HTTP/HTTPS request to target URL
   - Measures response time with high precision
   - Handles various response scenarios (success, error, timeout)

3. **Result Analysis**
   - Determines website status (UP/DOWN)
   - Calculates accurate response latency
   - Handles edge cases (redirects, SSL issues)

4. **Signed Response**
   - Creates result payload with monitoring data
   - Signs message with validator's private key
   - Sends to Hub with original callback ID

### **Monitoring Capabilities**
```typescript
async function checkWebsite(url: string): Promise<{
  status: 'UP' | 'DOWN';
  latency: number;
  error?: string;
}> {
  const startTime = performance.now();
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      timeout: 10000, // 10 second timeout
      redirect: 'follow'
    });
    
    const endTime = performance.now();
    const latency = endTime - startTime;
    
    return {
      status: response.ok ? 'UP' : 'DOWN',
      latency: latency
    };
  } catch (error) {
    return {
      status: 'DOWN',
      latency: performance.now() - startTime,
      error: error.message
    };
  }
}
```

## 🎯 Key Features

### **Distributed Monitoring**
- Can be deployed across multiple geographic regions
- Provides diverse network perspectives
- Reduces false positives from local network issues
- Enables global monitoring coverage

### **High Performance**
- Concurrent monitoring of multiple websites
- Efficient WebSocket communication
- Minimal resource footprint
- Fast HTTP request processing

### **Reliability & Resilience**
- Automatic reconnection to Hub on disconnection
- Graceful handling of monitoring failures
- Retry mechanisms for transient issues
- Comprehensive error logging

### **Reward System**
- Earns rewards for successful monitoring participation
- Cryptographic proof of work completion
- Transparent and verifiable contribution tracking
- Solana-based reward distribution

## ⚙️ Configuration

### **Environment Variables**
```bash
# Required: Validator's private key
PRIVATE_KEY=[1,2,3,4,5,...]

# Optional: Hub connection settings
HUB_URL=ws://localhost:4001
VALIDATOR_LOCATION=us-east-1
```

### **Monitoring Settings**
```typescript
const CONFIG = {
  TIMEOUT: 10000,           // Request timeout in milliseconds
  RETRY_ATTEMPTS: 3,        // Number of retry attempts
  RETRY_DELAY: 1000,        // Delay between retries
  MAX_CONCURRENT: 10        // Maximum concurrent checks
};
```

## 🛠️ Development

### **Generating New Keys**
```bash
# Generate a fresh keypair for testing
bun generate-key.ts

# Copy the private key to .env file
echo 'PRIVATE_KEY=[generated_key_array]' > .env
```

### **Testing Validator Connection**
```bash
# Start validator with debug logging
DEBUG=true bun index.ts

# Check connection status
curl ws://localhost:4001/validators
```

### **Local Development**
```bash
# Run validator against local hub
HUB_URL=ws://localhost:4001 bun index.ts

# Run validator against remote hub
HUB_URL=wss://hub.uptimecheck.com bun index.ts
```

## 📊 Performance Metrics

### **Monitoring Accuracy**
- Sub-second response time measurement
- Comprehensive error detection and categorization
- Handles various HTTP status codes and scenarios
- Robust SSL/TLS verification

### **Scalability**
- Supports monitoring hundreds of websites simultaneously
- Efficient memory and CPU usage
- Concurrent request processing
- Optimized WebSocket communication

### **Network Efficiency**
- Minimal bandwidth usage for coordination
- Efficient message compression
- Batch processing capabilities
- Smart retry mechanisms

## 🌍 Deployment Options

### **Geographic Distribution**
Deploy validators across different regions for comprehensive monitoring:

```bash
# US East Coast validator
VALIDATOR_LOCATION=us-east-1 bun index.ts

# European validator
VALIDATOR_LOCATION=eu-west-1 bun index.ts

# Asia Pacific validator
VALIDATOR_LOCATION=ap-southeast-1 bun index.ts
```

### **Cloud Deployment**
- **AWS EC2**: Deploy on various instance types
- **Google Cloud**: Use Compute Engine instances
- **DigitalOcean**: Lightweight droplets for cost efficiency
- **Kubernetes**: Container orchestration for scaling

### **Docker Deployment**
```dockerfile
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
CMD ["bun", "index.ts"]
```

## 🔗 Related Services

- [`hub`](../hub/README.md) - Central coordinator that this validator connects to
- [`api`](../api/README.md) - REST API that serves monitoring data collected by validators
- [`frontend`](../frontend/README.md) - Web interface displaying monitoring results
- [`common`](../../packages/common/README.md) - Shared message types and interfaces

## 💰 Rewards & Economics

### **Earning Mechanism**
- **100 lamports** per successful website validation
- Payments processed through Solana blockchain
- Transparent and verifiable reward tracking
- Automatic payout processing

### **Validator Economics**
- Low operational costs (minimal hardware requirements)
- Scalable earning potential based on monitoring volume
- Geographic distribution bonuses for global coverage
- Performance incentives for reliable validators
