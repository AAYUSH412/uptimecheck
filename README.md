# UptimeCheck

<div align="center">
  <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyZTZkZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtYWN0aXZpdHktaWNvbiBsdWNpZGUtc3F1YXJlLWFjdGl2aXR5Ij48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIi8+PHBhdGggZD0iTTE3IDEyaC0ybC0yIDUtMi0xMC0yIDVINyIvPjwvc3ZnPg==" alt="UptimeCheck Logo" width="150"/>
  <p><em>Website and API monitoring platform with real-time uptime tracking</em></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#development">Development</a> •
  </p>
</div>

## Overview

UptimeCheck is a comprehensive monitoring solution that tracks and reports the uptime status of your websites and APIs. The platform provides real-time monitoring, detailed analytics, and instant alerts when your services experience downtime, ensuring you're always aware of your application's health.

<div align="center">
  <img src="https://ik.imagekit.io/r9naagwrj/Github/Screenshot%202025-04-01%20at%204.55.55%E2%80%AFPM.png?updatedAt=1743506875112" alt="UptimeCheck Dashboard Preview" width="800"/>
</div>

## Features

- **24/7 Real-time Monitoring**: Continuous monitoring of websites and APIs with validators that check availability and response time
- **Intuitive Dashboard**: Clear visualization of all your monitored services with status indicators and performance metrics
- **Instant Alerts**: Get notified immediately when issues arise
- **Detailed Analytics**: Track response time, uptime percentage, and historical data with timeline and graph views
- **Distributed Architecture**: Validators can be deployed across multiple regions for global monitoring
- **WebSocket Communication**: Real-time updates between validators and the central hub ensure immediate issue detection

## Tech Stack

### Frontend
- **Next.js 14** with React 19
- **TailwindCSS** for styling
- **Framer Motion** for smooth animations and transitions
- **Clerk** for authentication
- **ShadcnUI** components

### Backend
- **Bun** JavaScript runtime
- **Express** for the API server
- **Prisma** for database access
- **PostgreSQL** database
- **WebSockets** for real-time communication

## Architecture

UptimeCheck is built with a microservices architecture consisting of the following components:

```
uptimecheck/
├── apps/
│   ├── api/           # REST API service for client operations
│   ├── frontend/      # Next.js web application
│   ├── hub/           # Central hub for validators and data collection
│   └── validator/     # Service that performs actual uptime checks
└── packages/
    ├── common/        # Shared types and utilities
    ├── db/            # Database client and schema
    ├── eslint-config/ # Shared ESLint configurations
    └── typescript-config/ # Shared TypeScript configurations
```

## Getting Started

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

## Development

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


## Roadmap

- [ ] Mobile app for on-the-go monitoring
- [ ] Integration with more notification channels (PagerDuty, OpsGenie)
- [ ] Advanced SSL certificate monitoring
- [ ] Custom webhook support
- [ ] User roles and team collaboration
- [ ] API documentation with Swagger

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See our [contributing guidelines](CONTRIBUTING.md) for more details.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) for the frontend framework
- [Clerk](https://clerk.dev/) for authentication
- [Prisma](https://www.prisma.io/) for database access
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Bun](https://bun.sh/) for the JavaScript runtime
