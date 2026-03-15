# 🌐 UptimeCheck

**A distributed, high-performance website monitoring platform built with modern web technologies.**

UptimeCheck is a monorepo containing everything needed to run a scalable uptime monitoring service. It separates the **Control Plane** (API/Frontend) from the **Data Plane** (Hub/Validators), allowing for a globally distributed network of monitoring nodes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![CI](https://github.com/AAYUSH412/uptimecheck/actions/workflows/ci.yml/badge.svg)
![Runtime](https://img.shields.io/badge/runtime-bun-black?logo=bun)

<div align="center">
  <a href="https://uptimecheck.vercel.app/demo/dashboard">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Try_Without_Signup-4F6EF7?style=for-the-badge" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/AAYUSH412/uptimecheck">
    <img src="https://img.shields.io/badge/⭐_Star_on_GitHub-black?style=for-the-badge&logo=github" alt="Star on GitHub" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ik.imagekit.io/xh3awoalr/Portfolio/Dashboard.png" alt="UptimeCheck Dashboard Preview" width="800"/>
  <p><em>Modern, intuitive dashboard with real-time monitoring capabilities</em></p>
</div>

## � Features

### 🔍 **Monitoring Capabilities**
- **🔄 24/7 Real-time Monitoring** – Continuous website and API availability checks
- **⚡ Sub-second Response Times** – Precision latency measurement and tracking
- **🌍 Global Validator Network** – Distributed monitoring from multiple geographic regions
- **📈 Historical Analytics** – Long-term uptime trends and performance insights
- **🚨 Intelligent Alerting** – Smart notifications via email, Slack, and webhooks

### 🏗️ **Architecture & Performance**
- **� WebSocket Communication** – Real-time status updates between validators and hub
- **🛡️ Cryptographic Security** – Solana-based authentication and message signing
- **⚖️ Load Balancing** – Intelligent task distribution across validator network
- **📊 Advanced Dashboard** – Intuitive visualization with performance metrics
- **� Enterprise Authentication** – Seamless user management with Clerk integration

### 🔧 **Developer Experience**
- **🎨 Modern UI/UX** – Beautiful, responsive interface with dark/light themes
- **� Fast Development** – Hot reload, TypeScript, and modern tooling
- **📱 Mobile Responsive** – Optimized for all device sizes and touch interfaces
- **🔧 Easy Configuration** – Simple setup with environment variables and Docker

## ⚙️ Tech Stack

### 🎨 **Frontend Excellence**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `15.2+` | React framework with App Router |
| **React** | `19.0+` | UI library with concurrent features |
| **TypeScript** | `5.8+` | Type-safe development |
| **Tailwind CSS** | `4.1+` | Utility-first styling |
| **Shadcn/ui** | `Latest` | Beautiful component library |
| **Framer Motion** | `12.6+` | Smooth animations |
| **Clerk** | `6.12+` | Authentication service |

### 🔧 **Backend Infrastructure**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Bun** | `1.2+` | High-performance JavaScript runtime |
| **Express.js** | `4.18+` | Web application framework |
| **WebSockets** | `Native` | Real-time bidirectional communication |
| **Prisma** | `6.5+` | Next-generation ORM |
| **PostgreSQL** | `15+` | Robust relational database |
| **Solana Web3.js** | `1.87+` | Cryptographic authentication |

### 🛠️ **Development Tools**
| Tool | Purpose |
|------|---------|
| **Turbo** | Monorepo management and build system |
| **ESLint** | Code linting and quality enforcement |
| **Prettier** | Code formatting and style consistency |
| **Husky** | Git hooks for quality assurance |
| **Docker** | Containerization and deployment |

### 🔐 **Security & Authentication**
- **Solana Cryptography** - Ed25519 digital signatures
- **TweetNaCl** - Cryptographic library for message signing
- **JWT** - JSON Web Tokens for API authentication
- **Clerk** - Enterprise authentication provider

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <img src="https://ik.imagekit.io/xh3awoalr/Portfolio/Home.png" alt="Landing Page" width="100%"/>
        <br/><em>Landing Page</em>
      </td>
      <td align="center" width="50%">
        <img src="https://ik.imagekit.io/xh3awoalr/Portfolio/Dashboard.png" alt="Dashboard Overview" width="100%"/>
        <br/><em>Dashboard Overview</em>
      </td>
    </tr>
    <tr>
      <td align="center" width="50%">
        <img src="https://ik.imagekit.io/xh3awoalr/Portfolio/Dashboard_monitor_1.png" alt="Monitor Detail" width="100%"/>
        <br/><em>Monitor Detail View</em>
      </td>
      <td align="center" width="50%">
        <img src="https://ik.imagekit.io/xh3awoalr/Portfolio/Dashboard_monitor_2.png" alt="Monitor Analytics" width="100%"/>
        <br/><em>Monitor Analytics</em>
      </td>
    </tr>
  </table>
</div>

> **No backend? No problem.** Try the fully interactive demo at [`/demo/dashboard`](https://uptimecheck.vercel.app/demo/dashboard) — no login, no setup required.

---

## 🏗️ Architecture

UptimeCheck is built on a modern **microservices architecture** designed for scalability, reliability, and global distribution. The system consists of four main components connected through WebSocket communication and shared database access.

<div align="center">
  <img src="./apps/frontend/public/Diagram of full project structure.png" alt="UptimeCheck Architecture Diagram" width="800"/>
  <p><em>Complete system architecture showing microservices communication flow</em></p>
</div>

### 🔄 **Callback-Based Communication Flow**

<div align="center">
  <img src="./apps/frontend/public/callback based.png" alt="Callback Communication Flow" width="700"/>
  <p><em>WebSocket communication pattern with cryptographic validation</em></p>
</div>

### 🏢 **Core Components**

| Component | Port | Technology | Purpose |
|-----------|------|------------|---------|
| **🎨 Frontend** | `3000` | Next.js 15 + React 19 | User interface and dashboard |
| **🔌 API Server** | `4000` | Express.js + Bun | REST endpoints and business logic |
| **🎯 Hub Service** | `4001` | WebSocket + Bun | Validator coordination and task distribution |
| **⚡ Validators** | `Dynamic` | Bun + Solana Keys | Distributed monitoring workers |

### 📊 **Data Flow Architecture**

```mermaid
graph TB
    Frontend[🎨 Frontend App] --> API[🔌 API Server]
    API --> Database[(🗄️ PostgreSQL)]
    
    Hub[🎯 Hub Service] --> Database
    Hub <--> Validator1[⚡ Validator 1]
    Hub <--> Validator2[⚡ Validator 2]
    Hub <--> ValidatorN[⚡ Validator N]
    
    Validator1 --> Website1[🌐 Website 1]
    Validator2 --> Website2[🌐 Website 2]
    ValidatorN --> WebsiteN[🌐 Website N]
```

### 🔐 **Security & Authentication**
- **Solana Cryptography** - Ed25519 signatures for validator authentication
- **JWT Tokens** - Secure API access and session management
- **Clerk Integration** - Enterprise-grade user authentication
- **Message Signing** - All validator communications cryptographically verified

### 📁 **Project Structure**

```
📦 uptimecheck/
├── 🚀 apps/
│   ├── 🎨 frontend/         # Next.js 15 web application
│   ├── 🔌 api/              # Express.js REST API server
│   ├── 🎯 hub/              # WebSocket hub coordinator
│   └── ⚡ validator/        # Distributed monitoring workers
├── 📚 packages/
│   ├── 🔗 common/           # Shared TypeScript types
│   ├── 🗄️ db/               # Prisma database client
│   ├── 📋 eslint-config/    # Shared linting rules
│   └── 🔧 typescript-config/ # Shared TS configurations
├── 📄 docs/                 # Documentation files
├── 🔒 .env.example          # Environment variables template
├── 📜 LICENSE               # MIT License
└── 📖 README.md             # This file
```

## 🚀 Getting Started

> **Want to explore immediately?** Visit the [**Live Demo →**](https://uptimecheck.vercel.app/demo/dashboard) — no login, no setup, fully interactive.

### 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

| Requirement | Version | Download |
|-------------|---------|----------|
| **Node.js** | `18.0+` | [nodejs.org](https://nodejs.org/) |
| **Bun** | `1.0+` | [bun.sh](https://bun.sh/) |
| **Docker** | `Latest` | [docker.com](https://docker.com/) |
| **Git** | `Latest` | [git-scm.com](https://git-scm.com/) |

### ⚡ **Quick Start**

Get UptimeCheck running locally in under 5 minutes:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/AAYUSH412/uptimecheck.git
cd uptimecheck

# 2️⃣ Install dependencies
bun install

# 3️⃣ Start PostgreSQL database
docker run --name uptimecheck-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=uptimecheck \
  -p 5432:5432 \
  -d postgres:15

# 4️⃣ Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5️⃣ Initialize database
cd packages/db
bunx prisma generate
bunx prisma migrate dev
bun run seed
cd ../..

# 6️⃣ Start all services
bun run dev
```

### 🔧 **Detailed Setup**

#### **1. Environment Configuration**

Create environment files for each service:

```bash
# packages/db/.env
DATABASE_URL="postgresql://postgres:password@localhost:5432/uptimecheck"

# apps/validator/.env (generate keys first)
cd apps/validator
bun generate-key.ts
# Copy the generated private key to .env
PRIVATE_KEY=[your_generated_private_key_array]

# apps/frontend/.env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_key"
CLERK_SECRET_KEY="your_clerk_secret"
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

#### **2. Database Setup**

```bash
# Navigate to database package
cd packages/db

# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# (Optional) Seed with sample data
bun run seed

# (Optional) Open Prisma Studio
bunx prisma studio
```

#### **3. Service Startup**

Start each service in separate terminal windows:

```bash
# Terminal 1: API Server (Port 4000)
cd apps/api && bun run dev

# Terminal 2: Hub Service (Port 4001)
cd apps/hub && bun index.ts

# Terminal 3: Validator Service
cd apps/validator && bun index.ts

# Terminal 4: Frontend (Port 3000)
cd apps/frontend && bun run dev
```

#### **4. Verify Installation**

Once all services are running, verify the setup:

- **Frontend**: http://localhost:3000 (Web dashboard)
- **API**: http://localhost:4000 (REST endpoints)
- **Hub**: ws://localhost:4001 (WebSocket server)
- **Database**: Check with `docker ps` and Prisma Studio

### 🎯 **Quick Commands**

```bash
# Install all dependencies
bun install

# Start all services at once
bun run dev

# Build for production
bun run build

# Run linting
bun run lint

# Format code
bun run format

# Type checking
bun run check-types
```

## 🔨 Development

### 🏗️ **Development Environment**

UptimeCheck uses a modern development setup with hot reload, TypeScript, and comprehensive tooling.

#### **Service Overview**

| Service | Port | Command | Purpose |
|---------|------|---------|---------|
| **🎨 Frontend** | `3000` | `bun run dev` | Next.js web application |
| **🔌 API Server** | `4000` | `bun run dev` | Express.js REST API |
| **🎯 Hub Service** | `4001` | `bun index.ts` | WebSocket coordinator |
| **⚡ Validator** | `Dynamic` | `bun index.ts` | Monitoring workers |

#### **Running Individual Services**

```bash
# Frontend Development (with Turbopack)
cd apps/frontend && bun run dev

# API Server (with hot reload)
cd apps/api && bun run dev

# Hub Service (WebSocket server)
cd apps/hub && bun index.ts

# Validator Worker
cd apps/validator && bun index.ts
```

### 🛠️ **Development Workflow**

#### **Database Development**
```bash
# After schema changes
cd packages/db
bunx prisma generate
bunx prisma migrate dev --name your_migration_name

# Reset database (development only)
bunx prisma migrate reset

# View/edit data
bunx prisma studio
```

#### **Adding New Validators**
```bash
# Generate unique cryptographic keys
cd apps/validator
bun generate-key.ts

# Copy private key to .env
echo 'PRIVATE_KEY=[generated_key_array]' >> .env
```

#### **Code Quality**
```bash
# Lint all packages
bun run lint

# Format code
bun run format

# Type checking
bun run check-types

# Run all quality checks
bun run lint && bun run check-types
```

### 🧪 **Testing & Debugging**

#### **Service Health Checks**
```bash
# Test API endpoints
curl http://localhost:4000/

# Check WebSocket connection
wscat -c ws://localhost:4001

# Monitor database
docker exec -it uptimecheck-postgres psql -U postgres -d uptimecheck
```

#### **Common Development Tasks**

**Adding a New Website to Monitor:**
1. Start all services (API, Hub, Validator, Frontend)
2. Open dashboard at http://localhost:3000
3. Click "Add Website" and enter URL
4. Validators automatically begin monitoring

**Performance Monitoring:**
- Check service logs in terminal windows
- Use browser DevTools for frontend debugging
- Monitor database queries with Prisma Studio

### 🚨 **Troubleshooting**

<details>
<summary><strong>Database Connection Issues</strong></summary>

```bash
# Check PostgreSQL container
docker ps | grep uptimecheck-postgres

# Verify database connectivity
docker exec -it uptimecheck-postgres psql -U postgres -c "\l"

# Reset database if needed
cd packages/db && bunx prisma migrate reset
```
</details>

<details>
<summary><strong>Validator Connection Problems</strong></summary>

```bash
# Verify Hub service is running
curl -I http://localhost:4001

# Check validator private key format
cat apps/validator/.env

# Test WebSocket connection
wscat -c ws://localhost:4001
```
</details>

<details>
<summary><strong>Port Conflicts</strong></summary>

```bash
# Check what's using ports
lsof -i :3000  # Frontend
lsof -i :4000  # API
lsof -i :4001  # Hub

# Kill processes if needed
pkill -f "next dev"
pkill -f "bun.*api"
```
</details>

---

## 🚀 Deployment

### 🌐 **Production Deployment**

#### **Frontend (Vercel)**
```bash
# Build and deploy
bun run build
vercel deploy

# Environment variables for Vercel
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

#### **Backend Services (Docker)**
```dockerfile
# Dockerfile.api
FROM oven/bun:latest
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 4000
CMD ["bun", "run", "dev"]
```

#### **Database (PostgreSQL)**
```bash
# Production database setup
docker run -d \
  --name uptimecheck-prod \
  -e POSTGRES_USER=your_user \
  -e POSTGRES_PASSWORD=secure_password \
  -e POSTGRES_DB=uptimecheck_prod \
  -p 5432:5432 \
  postgres:15-alpine

# Run migrations
DATABASE_URL="postgresql://user:pass@host:5432/db" bunx prisma migrate deploy
```

### ☁️ **Cloud Deployment Options**

| Platform | Service | Recommendation |
|----------|---------|----------------|
| **Vercel** | Frontend | ⭐ Recommended for Next.js |
| **Railway** | Backend Services | ⭐ Easy deployment |
| **DigitalOcean** | Database | Managed PostgreSQL |
| **AWS** | Full Stack | Enterprise deployment |
| **Google Cloud** | Validators | Global distribution |

### 🔒 **Production Security**

- **Environment Variables**: Use secure secret management
- **SSL/TLS**: Enable HTTPS for all services
- **Database**: Use connection pooling and SSL
- **Authentication**: Production Clerk keys
- **Monitoring**: Set up logging and alerting

---

## 🛣️ Roadmap

### 🎯 **Current Version (v1.0)**
- ✅ **Core Monitoring** - Real-time website uptime tracking
- ✅ **Distributed Architecture** - Multi-service microservices setup
- ✅ **WebSocket Communication** - Real-time validator coordination
- ✅ **Modern UI** - Next.js 15 dashboard with dark/light themes
- ✅ **Cryptographic Security** - Solana-based validator authentication

### 🚀 **Next Release (v1.1)**
- 🔄 **SSL Certificate Monitoring** - Track certificate expiration
- 🔄 **Advanced Alerting** - Email, Slack, and webhook notifications
- 🔄 **Performance Analytics** - Enhanced response time tracking
- 🔄 **Mobile App** - iOS and Android monitoring applications
- 🔄 **API Documentation** - Interactive Swagger/OpenAPI docs

### 🌟 **Future Features (v2.0+)**
- 📱 **Mobile Applications** - Native iOS and Android apps
- � **Advanced Notifications** - PagerDuty, OpsGenie integrations
- � **Team Collaboration** - User roles and team management
- 🌍 **Global CDN Monitoring** - Edge location performance tracking
- 🤖 **AI-Powered Insights** - Predictive analytics and recommendations
- 📊 **Custom Dashboards** - Personalized monitoring views
- 🔗 **Third-party Integrations** - Zapier, IFTTT, and workflow automation

---

## 🤝 Contributing

We love contributions from the community! UptimeCheck is open source and welcomes developers of all skill levels.

### 🚀 **Quick Contribution Guide**

1. **🍴 Fork** the repository
2. **🌿 Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **💡 Make** your changes with tests
4. **✅ Commit** your changes: `git commit -m 'feat: add amazing feature'`
5. **🚀 Push** to the branch: `git push origin feature/amazing-feature`
6. **📝 Open** a Pull Request

### 🛠️ **Areas We Need Help**

| Area | Skills Needed | Difficulty |
|------|---------------|------------|
| **🎨 UI/UX Design** | React, Tailwind, Figma | Beginner-Intermediate |
| **🔧 Backend Features** | Node.js, Bun, TypeScript | Intermediate |
| **📱 Mobile Development** | React Native, Expo | Intermediate-Advanced |
| **🔒 Security Audits** | Cryptography, WebSockets | Advanced |
| **📖 Documentation** | Technical Writing | Beginner |
| **🧪 Testing** | Jest, Playwright, Cypress | Intermediate |

### 📋 **Contribution Guidelines**

- **Code Style**: Follow ESLint and Prettier configurations
- **Commits**: Use conventional commit messages (`feat:`, `fix:`, `docs:`)
- **Testing**: Add tests for new features and bug fixes
- **Documentation**: Update README files for significant changes

Read our detailed [Contributing Guide](CONTRIBUTING.md) for more information.

---

## 📞 Support & Community

### 🆘 **Getting Help**

- **📚 Documentation**: Check our comprehensive README files
- **🐛 Bug Reports**: Open an issue on GitHub
- **💡 Feature Requests**: Discuss in GitHub Discussions
- **📧 Direct Contact**: aayushvaghela412@gmail.com

### 🌟 **Show Your Support**

If you find UptimeCheck helpful, please consider:

- ⭐ **Star the repository** on GitHub
- � **Share on social media** and spread the word
- 🔗 **Contribute** to the codebase
- 📝 **Write about** your experience using UptimeCheck

---

## �📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Copyright © 2025 [Aayush Vaghela](https://aayush-vaghela.vercel.app/)**

---

## 🙌 Acknowledgements

### 🛠️ **Built With Amazing Technologies**

| Technology | Description | Website |
|------------|-------------|---------|
| **Next.js** | React framework for production | [nextjs.org](https://nextjs.org/) |
| **Bun** | Fast all-in-one JavaScript runtime | [bun.sh](https://bun.sh/) |
| **Prisma** | Next-generation Node.js and TypeScript ORM | [prisma.io](https://prisma.io/) |
| **Tailwind CSS** | Utility-first CSS framework | [tailwindcss.com](https://tailwindcss.com/) |
| **Clerk** | Authentication and user management | [clerk.dev](https://clerk.dev/) |
| **Solana** | High-performance blockchain for cryptography | [solana.com](https://solana.com/) |

### 🎯 **Special Recognition**

- **Open Source Community** - For the amazing tools and libraries
- **Early Contributors** - Helping shape the project direction
- **Beta Testers** - Providing valuable feedback and bug reports

---

<div align="center">
  <h3>🚀 Ready to monitor your websites like a pro?</h3>
  <p>
    <a href="#-getting-started">Get Started</a> •
    <a href="https://github.com/AAYUSH412/uptimecheck">View on GitHub</a> •
    <a href="https://aayush-vaghela.vercel.app/">Visit Developer</a>
  </p>
  
  **Made with ❤️ by [Aayush Vaghela](https://aayush-vaghela.vercel.app/)**
  
  _⭐ Star this repo if you find it helpful!_
</div>
