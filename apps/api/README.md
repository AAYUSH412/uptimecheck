# 🔌 API Service

<div align="center">
  <img src="https://img.shields.io/badge/Express.js-4.18+-black.svg" alt="Express.js"/>
  <img src="https://img.shields.io/badge/Bun-1.2+-orange.svg" alt="Bun Runtime"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8+-blue.svg" alt="TypeScript"/>
  
  <h3>🚀 High-Performance REST API</h3>
  <p><em>Express.js backend service with Bun runtime for UptimeCheck platform</em></p>
</div>

---

## 🌟 Overview

The UptimeCheck API service is a robust, high-performance REST backend built with Express.js and powered by Bun runtime. It provides secure endpoints for website management, user authentication, monitoring data access, and real-time analytics.

### ✨ **Key Features**
- **⚡ Bun Runtime** - Ultra-fast JavaScript execution
- **🔒 JWT Authentication** - Secure token-based access
- **🌐 CORS Support** - Cross-origin resource sharing
- **📊 Real-time Data** - Live monitoring statistics
- **🔄 Auto-reload** - Development hot reload
- **📈 Performance Optimized** - Efficient database queries

---

## 🚀 Getting Started

### 📋 **Prerequisites**
- Bun 1.0+ runtime
- PostgreSQL database running
- Database migrations completed

### ⚡ **Quick Start**

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server (auto-reload)
bun run dev

# Start production server
bun run start
```

The API server will start on **http://localhost:4000**

### 🔧 **Environment Configuration**

Create `.env` file in the API directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"

# JWT Authentication
JWT_SECRET="your-super-secret-jwt-key-here"

# Clerk Integration (optional)
CLERK_SECRET_KEY="sk_test_your-clerk-secret-key"

# Server Configuration
PORT=4000
NODE_ENV=development

# CORS Origins
CORS_ORIGINS="http://localhost:3000,http://localhost:4000"
```

---

## 🏗️ Architecture

### 🎯 **Core Components**

| Component | File | Purpose |
|-----------|------|---------|
| **🚀 Server** | `index.ts` | Express app setup and configuration |
| **🛣️ Routes** | `routes/apiRoute.ts` | API endpoint definitions |
| **🎮 Controllers** | `controller/apicontroller.ts` | Business logic implementation |
| **🔒 Middleware** | `middleware.ts` | Authentication and request processing |
| **⚙️ Config** | `config/jwt.ts` | JWT configuration and utilities |

### 📊 **Service Architecture**

```mermaid
graph TB
    Frontend[🎨 Frontend] --> API[🔌 API Service]
    API --> Auth[🔒 Auth Middleware]
    Auth --> Controller[🎮 Controllers]
    Controller --> Database[(🗄️ PostgreSQL)]
    
    API --> CORS[🌐 CORS Handler]
    API --> BodyParser[📄 Body Parser]
    API --> ErrorHandler[❌ Error Handler]
```

---

## �️ API Endpoints

### 🔑 **Authentication**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/auth/login` | User login | ❌ |
| `POST` | `/api/v1/auth/register` | User registration | ❌ |
| `POST` | `/api/v1/auth/refresh` | Refresh JWT token | ✅ |
| `DELETE` | `/api/v1/auth/logout` | User logout | ✅ |

### 🌐 **Website Management**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/websites` | Get user's websites | ✅ |
| `POST` | `/api/v1/websites` | Add new website | ✅ |
| `GET` | `/api/v1/websites/:id` | Get website details | ✅ |
| `PUT` | `/api/v1/websites/:id` | Update website | ✅ |
| `DELETE` | `/api/v1/websites/:id` | Delete website | ✅ |
| `POST` | `/api/v1/websites/:id/toggle` | Enable/disable monitoring | ✅ |

### 📊 **Monitoring Data**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/websites/:id/status` | Current website status | ✅ |
| `GET` | `/api/v1/websites/:id/ticks` | Monitoring history | ✅ |
| `GET` | `/api/v1/websites/:id/analytics` | Uptime analytics | ✅ |
| `GET` | `/api/v1/websites/:id/performance` | Performance metrics | ✅ |

### 👤 **User Management**
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/v1/user/profile` | Get user profile | ✅ |
| `PUT` | `/api/v1/user/profile` | Update profile | ✅ |
| `GET` | `/api/v1/user/preferences` | Get user preferences | ✅ |
| `PUT` | `/api/v1/user/preferences` | Update preferences | ✅ |

---

## 🔧 Development

### 🛠️ **Available Scripts**

```bash
# Development
bun run dev          # Start with auto-reload (recommended)
bun run start        # Start production server

# Build & Deploy
bun run build        # Build TypeScript to JavaScript
bun run production   # Start optimized production build

# Code Quality
bun run lint         # ESLint code checking
bun run check-types  # TypeScript validation
bun run format       # Prettier code formatting

# Database
bun run db:generate  # Generate Prisma client
bun run db:migrate   # Run database migrations
bun run db:studio    # Open Prisma Studio
```

### 🎮 **Controller Pattern**

```typescript
// Example controller implementation
export const getWebsites = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    
    const websites = await prismaclient.website.findMany({
      where: { userId },
      include: {
        ticks: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
    
    const websitesWithStatus = websites.map(website => ({
      ...website,
      currentStatus: website.ticks[0]?.status || 'UNKNOWN',
      lastChecked: website.ticks[0]?.createdAt || null
    }));
    
    res.json({
      success: true,
      data: websitesWithStatus,
      count: websites.length
    });
  } catch (error) {
    console.error('Error fetching websites:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};
```

### � **Authentication Middleware**

```typescript
// JWT authentication middleware
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};
```

### 📊 **Database Integration**

```typescript
// Example database operation
export const createWebsite = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { url, name } = req.body;
    const userId = req.user.id;
    
    // Validate URL format
    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      });
    }
    
    const website = await prismaclient.website.create({
      data: {
        url,
        name,
        userId,
        disabled: false
      }
    });
    
    res.status(201).json({
      success: true,
      data: website,
      message: 'Website added successfully'
    });
  } catch (error) {
    console.error('Error creating website:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create website'
    });
  }
};
```

---

## 🔒 Security Features

### 🛡️ **Authentication & Authorization**
- **JWT Tokens** - Secure, stateless authentication
- **Token Expiration** - Automatic token refresh mechanism
- **User Isolation** - Users can only access their own data
- **Input Validation** - Request data sanitization and validation

### 🌐 **CORS Configuration**
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
```

### 🔐 **Security Best Practices**
- **Environment Variables** - Sensitive data in env files
- **SQL Injection Protection** - Prisma ORM query safety
- **Rate Limiting** - API request throttling
- **Error Handling** - Secure error message sanitization

---

## 📊 Performance & Monitoring

### ⚡ **Performance Features**
- **Bun Runtime** - 3x faster than Node.js for I/O operations
- **Connection Pooling** - Efficient database connections
- **Query Optimization** - Indexed database queries
- **Response Caching** - Intelligent caching strategies

### 📈 **Monitoring & Logging**
```typescript
// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});
```

---

## 🚀 Deployment

### 🐳 **Docker Deployment**

```dockerfile
FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
RUN bun install

# Copy source code
COPY . .

# Build application
RUN bun run build

# Expose port
EXPOSE 4000

# Start application
CMD ["bun", "run", "start"]
```

### ☁️ **Cloud Deployment**

```bash
# Railway deployment
railway login
railway link
railway up

# Heroku deployment
heroku create uptimecheck-api
git push heroku main

# Environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set JWT_SECRET="your-secret"
```

---

## 🔗 Related Services

| Service | Communication | Documentation |
|---------|---------------|---------------|
| **🎨 Frontend** | HTTP REST calls | [Frontend README](../frontend/README.md) |
| **🎯 Hub** | Shared database | [Hub README](../hub/README.md) |
| **🗄️ Database** | Prisma ORM | [Database README](../../packages/db/README.md) |
| **📝 Common** | Type definitions | [Common README](../../packages/common/README.md) |

---

<div align="center">
  <h3>🔌 Robust, Secure, and Lightning Fast</h3>
  <p>The UptimeCheck API delivers enterprise-grade backend performance</p>
  
  **Powered by Bun runtime and Express.js**
</div>

## 🛣️ API Endpoints

### Base URL: `http://localhost:4000/api/v1/`

#### **Website Management**
- `GET /websites` - Get all websites for authenticated user
- `POST /websites` - Add a new website to monitor
- `PUT /websites/:id` - Update website configuration
- `DELETE /websites/:id` - Remove website from monitoring
- `GET /websites/:id/status` - Get current status of a website

#### **Monitoring Data**
- `GET /websites/:id/ticks` - Get monitoring history for a website
- `GET /websites/:id/analytics` - Get uptime analytics and metrics
- `GET /websites/:id/performance` - Get response time trends

#### **Authentication**
- Integration with Clerk for user management
- JWT token validation middleware
- User session handling

## 🏗️ Architecture

### **Core Components**

#### **Express Server** (`index.ts`)
- Main application setup
- CORS configuration
- Route registration
- Database connection initialization

#### **Routes** (`routes/apiRoute.ts`)
- API endpoint definitions
- Request routing and middleware
- Response formatting

#### **Controllers** (`controller/apicontroller.ts`)
- Business logic implementation
- Database operations
- Error handling and validation

#### **Middleware** (`middleware.ts`)
- Authentication verification
- Request logging
- Error handling

#### **JWT Configuration** (`config/jwt.ts`)
- Token generation and validation
- Clerk integration setup
- Security configurations

## 💾 Database Integration

### **Website Operations**
```typescript
// Example: Get user's websites
const websites = await prismaclient.website.findMany({
  where: { userId: req.user.id },
  include: {
    ticks: {
      orderBy: { createdAt: 'desc' },
      take: 1
    }
  }
});
```

### **Monitoring Data**
```typescript
// Example: Get website analytics
const analytics = await prismaclient.websiteTick.groupBy({
  by: ['status'],
  where: { websiteId: websiteId },
  _count: { status: true }
});
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **User Isolation**: Users can only access their own websites
- **Input Validation**: Request data validation and sanitization
- **CORS Protection**: Controlled cross-origin access

## 📊 Key Features

### **Real-time Data**
- Provides latest monitoring status for websites
- Aggregates data from multiple validators
- Calculates uptime percentages and averages

### **User Management**
- Integration with Clerk authentication service
- User-specific website management
- Session handling and token validation

### **Data Analytics**
- Historical monitoring data access
- Performance metrics calculation
- Uptime trend analysis

## 🔗 Service Communication

### **With Database**
- Uses `db` package for all database operations
- Prisma client for type-safe database queries
- Transaction support for data consistency

### **With Frontend**
- RESTful API endpoints for React components
- JSON response format
- Error handling with proper HTTP status codes

### **With Hub Service**
- Indirectly connected through shared database
- Hub stores validation results that API serves
- Coordinated through database triggers and events

## 🛠️ Development

### **Adding New Endpoints**
1. Define route in `routes/apiRoute.ts`
2. Implement controller logic in `controller/apicontroller.ts`
3. Add authentication middleware if needed
4. Update API documentation

### **Database Operations**
```bash
# After schema changes
cd ../packages/db
bunx prisma generate
bunx prisma migrate dev
```

### **Testing**
```bash
# Test API endpoints
curl http://localhost:4000/api/v1/websites

# Check server status
curl http://localhost:4000/
```

## 🔗 Related Services

- [`frontend`](../frontend/README.md) - Next.js app that consumes this API
- [`hub`](../hub/README.md) - WebSocket service that stores monitoring data
- [`db`](../../packages/db/README.md) - Database package used by this service
- [`common`](../../packages/common/README.md) - Shared types and interfaces
