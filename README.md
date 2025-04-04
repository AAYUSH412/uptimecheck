# UptimeCheck

<div align="center">
  <img src="https://ik.imagekit.io/r9naagwrj/Github/square-activity.svg?updatedAt=1743507227375" alt="UptimeCheck Logo" width="150"/>
  <p><em>Website and API monitoring platform with real-time uptime tracking</em></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#development">Development</a> •
    <a href="#roadmap">Roadmap</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

## 🚀 Overview

UptimeCheck is a robust monitoring solution that continuously tracks and reports the uptime status of websites and APIs. It provides real-time monitoring, detailed analytics, and instant alerts for downtime detection, ensuring seamless application health tracking.

<div align="center">
  <img src="https://ik.imagekit.io/r9naagwrj/Github/Screenshot%202025-04-01%20at%204.55.55%E2%80%AFPM.png?updatedAt=1743506875112" alt="UptimeCheck Dashboard Preview" width="800"/>
</div>

## 🌟 Features

- **🔄 24/7 Real-time Monitoring** – Continuously checks website and API availability
- **📊 Intuitive Dashboard** – Clear visualization of monitored services with performance metrics
- **🚨 Instant Alerts** – Get notified via email, Slack, or webhook integrations
- **📈 Advanced Analytics** – Track response time, uptime percentage, and historical trends
- **🌍 Distributed Architecture** – Deploy validators across multiple regions for global monitoring
- **🔌 WebSocket Communication** – Enables real-time status updates between validators and the hub
- **🔒 Secure Authentication** – Uses Clerk for seamless user management

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Next.js 14** with React 19
- **Tailwind CSS** for modern UI styling
- **Framer Motion** for animations and transitions
- **Shadcn UI** for beautiful components
- **Clerk** for authentication and user management

### 🔧 Backend
- **Bun** – High-performance JavaScript runtime
- **Express.js** – API server handling requests
- **Prisma** – Database ORM
- **PostgreSQL** – Scalable relational database
- **WebSockets** – Real-time communication between services

## 🏗️ Architecture

UptimeCheck follows a microservices architecture to ensure modularity and scalability.

```
uptimecheck/
├── apps/
│   ├── api/           # REST API service for client operations
│   ├── frontend/      # Next.js web application
│   ├── hub/           # Central hub for validators and data aggregation
│   └── validator/     # Service responsible for uptime checks
└── packages/
    ├── common/        # Shared types and utilities
    ├── db/            # Database client and schema
    ├── eslint-config/ # Shared ESLint configurations
    └── tsconfig/      # Shared TypeScript configurations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Bun 1.0+
- PostgreSQL database
- Clerk account for authentication

### Installation

```bash
# Clone the repository
git clone https://github.com/AAYUSH412/uptimecheck.git
cd uptimecheck

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Initialize the database
cd packages/db
bunx prisma migrate dev
bun run seed

# Start the development servers
cd ../..
bun run dev
```

Visit `http://localhost:3000` to view the application.

## 🔨 Development

### Running Individual Services

```bash
# Start the frontend
bun run dev --filter=frontend

# Start the API server
bun run dev --filter=api

# Start the validator
bun run dev --filter=validator

# Start the hub
bun run dev --filter=hub
```

### Adding a New Website to Monitor

1. Navigate to the Dashboard
2. Click the "Add Website" button
3. Enter the website URL and configuration details
4. Save to begin monitoring

## 🛣️ Roadmap

- ✅ Initial version with core features
- 🚧 Mobile app for on-the-go monitoring
- 🚧 Integration with more notification channels (Slack, PagerDuty, OpsGenie)
- 🚧 Advanced SSL certificate monitoring
- 🚧 Custom webhook support
- 🚧 User roles and team collaboration
- 🚧 API documentation with Swagger

## 🤝 Contributing

We welcome contributions! Follow these steps to contribute:

1. **Fork the repository**
2. **Create a new feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to your branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

See our [contributing guidelines](CONTRIBUTING.md) for details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

Special thanks to the following technologies that made this project possible:
- [Next.js](https://nextjs.org/) – React framework for web applications
- [Clerk](https://clerk.dev/) – Authentication as a service
- [Prisma](https://www.prisma.io/) – ORM for PostgreSQL
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS framework
- [Bun](https://bun.sh/) – JavaScript runtime for high-performance applications

---
_Thanks for checking out UptimeCheck! If you like this project, consider giving it a ⭐ on GitHub!_ 🚀
