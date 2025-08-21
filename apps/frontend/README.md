# 🎨 Frontend Application

<div align="center">
  <img src="./public/next.svg" alt="Next.js Logo" width="100"/>
  <h3>Modern React Dashboard for UptimeCheck</h3>
  <p><em>Built with Next.js 15, React 19, and cutting-edge web technologies</em></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2+-black.svg)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0+-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1+-38bdf8.svg)](https://tailwindcss.com/)
</div>

---

## 🌟 Overview

The UptimeCheck frontend is a state-of-the-art web application that provides an intuitive, responsive dashboard for monitoring website uptime and performance. Built with the latest web technologies, it offers real-time updates, beautiful animations, and a seamless user experience.

### ✨ **Key Highlights**
- **⚡ Lightning Fast** - Next.js 15 with Turbopack for instant development
- **🎨 Beautiful UI** - Modern design with Shadcn/ui components
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile
- **🌙 Dark Mode** - Built-in theme switching with system preference detection
- **🔒 Secure Auth** - Enterprise-grade authentication with Clerk
- **📊 Real-time Data** - Live dashboard updates via WebSocket integration

---

## 🚀 Getting Started

### 📋 **Prerequisites**
- Node.js 18+ and Bun 1.0+
- API service running on port 4000
- Clerk account for authentication

### ⚡ **Quick Start**

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Clerk keys

# Start development server with Turbopack
bun run dev

# Build for production
bun run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 🔧 **Environment Configuration**

Create `.env.local` in the frontend directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your-clerk-key"
CLERK_SECRET_KEY="sk_test_your-clerk-secret"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

---

## ⚙️ Technology Stack

### 🔥 **Core Framework**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | `15.2+` | React framework with App Router |
| **React** | `19.0+` | UI library with concurrent features |
| **TypeScript** | `5.0+` | Type-safe development |
| **Turbopack** | `Latest` | Ultra-fast bundler for development |

### 🎨 **Styling & UI Framework**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | `4.1+` | Utility-first CSS framework |
| **Shadcn/ui** | `Latest` | Beautiful component library |
| **Radix UI** | `Latest` | Accessible primitive components |
| **Framer Motion** | `12.6+` | Smooth animations and micro-interactions |
| **Lucide React** | `Latest` | Consistent icon system |

### 🔒 **Authentication & Data**
| Technology | Purpose |
|------------|---------|
| **Clerk** | Enterprise authentication service |
| **Axios** | HTTP client for API communication |
| **Next Themes** | Dark/light mode management |

---

## 🏗️ Project Architecture

### 📁 **Directory Structure**

```
📦 src/
├── 📱 app/                    # Next.js App Router
│   ├── 🏠 page.tsx           # Landing page
│   ├── 🎨 layout.tsx         # Root layout
│   ├── 🌈 globals.css        # Global styles
│   ├── 🔍 not-found.tsx      # 404 page
│   └── 📂 (routes)/
│       └── 📊 dashboard/      # Protected dashboard routes
├── 🧩 components/
│   ├── 🧭 Appbar.tsx         # Navigation header
│   ├── 🏠 Home.tsx           # Landing components
│   ├── 🌙 ThemeProvider.tsx   # Theme management
│   ├── 📊 Dashboard/         # Dashboard components
│   │   ├── ➕ AddWebsiteDialog.tsx
│   │   ├── 📈 DashboardOverview.tsx
│   │   ├── 🌐 WebsiteDetail.tsx
│   │   ├── 🧭 WebsiteNavigation.tsx
│   │   └── 📋 WebsiteSidebar.tsx
│   ├── 🎯 landing/           # Landing page sections
│   │   ├── 📢 CTA.tsx
│   │   ├── ⭐ Features.tsx
│   │   ├── 🦸 Hero.tsx
│   │   └── 🔗 Footer.tsx
│   └── 🎛️ ui/                # Reusable UI components
│       ├── 🔘 button.tsx
│       ├── 🃏 card.tsx
│       ├── 💬 dialog.tsx
│       └── ... (more components)
├── 🪝 hooks/
│   └── 🌐 useWebsite.tsx     # Custom data fetching hooks
└── 📚 lib/
    └── 🛠️ utils.ts           # Utility functions
```

### 🎯 **Key Components**

#### **🏠 Landing Page**
- **Hero Section** - Compelling introduction with animations
- **Features Showcase** - Interactive feature highlights
- **Call-to-Action** - Clear conversion paths
- **Footer** - Links and social media integration

#### **📊 Dashboard System**
- **Overview Grid** - Visual website status cards
- **Real-time Updates** - Live status indicators
- **Add Website Flow** - Streamlined website addition
- **Analytics Views** - Detailed performance metrics
- **Sidebar Navigation** - Intuitive navigation system

#### **🎨 UI Components**
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant components
- **Theme Support** - System/manual dark mode
- **Loading States** - Smooth loading experiences

---

## 🎯 Core Features

### 📊 **Monitoring Dashboard**
```typescript
// Real-time website status monitoring
const WebsiteCard = ({ website }) => {
  const { status, latency, uptime } = useRealTimeStatus(website.id);
  
  return (
    <Card className={status === 'UP' ? 'border-green-500' : 'border-red-500'}>
      <StatusIndicator status={status} />
      <LatencyChart data={latency} />
      <UptimePercentage value={uptime} />
    </Card>
  );
};
```

### 🔔 **Smart Notifications**
- Real-time downtime alerts
- Performance degradation warnings
- Custom notification preferences
- Integration with external services

### 📈 **Advanced Analytics**
- Historical uptime trends
- Response time analysis
- Performance benchmarking
- Custom date range filtering

### 🎨 **User Experience**
- Intuitive navigation patterns
- Keyboard shortcuts support
- Progressive loading
- Offline state handling

---

## 🔧 Development

### 🛠️ **Available Scripts**

```bash
# Development
bun run dev          # Start with Turbopack (recommended)
bun run dev:legacy   # Start with Webpack

# Production
bun run build        # Build for production
bun run start        # Start production server

# Quality Assurance
bun run lint         # ESLint code checking
bun run check-types  # TypeScript type checking
bun run clean        # Clean build artifacts

# Analysis
bun run analyze      # Bundle analyzer
```

### 🎨 **Adding New Components**

```bash
# Generate new UI component with Shadcn
bunx shadcn@latest add [component-name]

# Create custom component
mkdir src/components/NewFeature
touch src/components/NewFeature/index.tsx
```

### 🔌 **API Integration Pattern**

```typescript
// Custom hook for data fetching
export const useWebsites = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  
  const fetchWebsites = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/v1/websites', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWebsites(response.data);
    } catch (error) {
      console.error('Failed to fetch websites:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken]);
  
  useEffect(() => {
    fetchWebsites();
  }, [fetchWebsites]);
  
  return { websites, loading, refetch: fetchWebsites };
};
```

### 🔒 **Authentication Flow**

```typescript
// Protected route example
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <SignedIn>
        <div className="dashboard-layout">
          <Sidebar />
          <main>{children}</main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}
```

---

## 🚀 Deployment

### 🌐 **Vercel Deployment (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### **Environment Variables for Vercel**
```bash
# Production environment
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### 🐳 **Docker Deployment**

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install -g bun && bun install

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### ⚡ **Performance Optimization**

- **Image Optimization** - Next.js Image component with lazy loading
- **Code Splitting** - Automatic route-based splitting
- **Bundle Analysis** - Regular bundle size monitoring
- **CDN Integration** - Static asset optimization

---

## 🔗 Related Services

| Service | Purpose | Documentation |
|---------|---------|---------------|
| **🔌 API** | Backend REST endpoints | [API README](../api/README.md) |
| **🎯 Hub** | WebSocket coordination | [Hub README](../hub/README.md) |
| **🗄️ Database** | Data persistence | [DB README](../../packages/db/README.md) |
| **📝 Common** | Shared type definitions | [Common README](../../packages/common/README.md) |

---

<div align="center">
  <h3>🎨 Beautiful, Fast, and Intuitive</h3>
  <p>The UptimeCheck frontend delivers a world-class monitoring experience</p>
  
  **Built with ❤️ using Next.js 15 and React 19**
</div>
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   └── (routes)/
│       └── dashboard/     # Dashboard pages
├── components/
│   ├── Appbar.tsx        # Navigation header
│   ├── Home.tsx          # Landing page component
│   ├── ThemeProvider.tsx # Dark/light theme
│   ├── Dashboard/        # Dashboard components
│   │   ├── AddWebsiteDialog.tsx
│   │   ├── dash.tsx
│   │   ├── DashboardOverview.tsx
│   │   ├── WebsiteDetail.tsx
│   │   ├── WebsiteNavigation.tsx
│   │   └── WebsiteSidebar.tsx
│   ├── landing/          # Landing page sections
│   │   ├── CTA.tsx
│   │   ├── Features.tsx
│   │   ├── Hero.tsx
│   │   └── Footer.tsx
│   └── ui/               # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
├── hooks/
│   └── useWebsite.tsx    # Custom hooks for data fetching
└── lib/
    └── utils.ts          # Utility functions
```

## 🎨 Key Features

### **Landing Page**
- **Hero Section** - Compelling introduction to UptimeCheck
- **Features Showcase** - Highlighting key monitoring capabilities
- **Call-to-Action** - Clear path to get started
- **Footer** - Links and company information

### **Dashboard**
- **Website Overview** - Grid view of all monitored websites
- **Real-time Status** - Live uptime status indicators
- **Add Website Dialog** - Easy website addition workflow
- **Website Details** - Detailed analytics for each site
- **Sidebar Navigation** - Quick access to different views

### **Analytics & Monitoring**
- **Uptime Charts** - Visual representation of website health
- **Response Time Graphs** - Performance metrics over time
- **Status History** - Historical uptime/downtime data
- **Alert Notifications** - Real-time downtime alerts

### **User Experience**
- **Dark/Light Theme** - User preference theming
- **Responsive Design** - Works on all device sizes
- **Loading States** - Smooth loading experiences
- **Error Boundaries** - Graceful error handling

## 🔧 Configuration

### **Environment Variables**
```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### **API Integration**
```typescript
// Example API call
const response = await axios.get(
  `${process.env.NEXT_PUBLIC_API_URL}/api/v1/websites`,
  {
    headers: {
      Authorization: `Bearer ${await getToken()}`
    }
  }
);
```

## 🎯 Component Architecture

### **Layout Components**
- **RootLayout** - App-wide layout with providers
- **Appbar** - Navigation with authentication
- **ThemeProvider** - Dark mode support

### **Dashboard Components**
- **DashboardOverview** - Main dashboard view
- **WebsiteNavigation** - Website list and filtering
- **WebsiteDetail** - Individual website analytics
- **AddWebsiteDialog** - Modal for adding new sites

### **UI Components** (Shadcn/ui)
- **Button** - Styled button variants
- **Card** - Content containers
- **Dialog** - Modal dialogs
- **Input** - Form inputs with validation
- **Tabs** - Tabbed navigation

## 🚀 Performance Features

- **Turbopack** - Fast development builds
- **Next.js Image** - Optimized image loading
- **Font Optimization** - Automatic font optimization with Geist
- **Code Splitting** - Automatic bundle optimization
- **Static Generation** - Pre-rendered pages where possible

## 🔐 Authentication Flow

1. **Clerk Integration** - Seamless sign-up/sign-in
2. **JWT Tokens** - Secure API authentication
3. **Route Protection** - Protected dashboard routes
4. **User Context** - Global user state management

## 📱 Responsive Design

- **Mobile-First** - Optimized for mobile devices
- **Tablet Support** - Enhanced tablet layouts
- **Desktop Experience** - Full-featured desktop UI
- **Touch-Friendly** - Accessible touch interactions

## 🛠️ Development

### **Adding New Pages**
```bash
# Create new page in app directory
touch src/app/(routes)/settings/page.tsx
```

### **Creating Components**
```bash
# Generate new UI component with Shadcn
bunx shadcn@latest add [component-name]
```

### **API Integration**
```typescript
// Custom hook example
export const useWebsites = () => {
  const [websites, setWebsites] = useState([]);
  const { getToken } = useAuth();
  
  // Fetch and manage website data
};
```

## 📊 State Management

- **React Hooks** - Local component state
- **Custom Hooks** - Shared business logic
- **Clerk Context** - Authentication state
- **URL State** - Navigation and filtering

## 🔗 Related Services

- [`api`](../api/README.md) - Backend API consumed by this frontend
- [`hub`](../hub/README.md) - WebSocket service for real-time updates
- [`db`](../../packages/db/README.md) - Database that stores displayed data
- [`common`](../../packages/common/README.md) - Shared TypeScript types

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
vercel

# Or connect GitHub repository for automatic deployments
```

### **Build Optimization**
```bash
# Analyze bundle size
bun run build

# Check build output
ls -la .next/
```

The application is optimized for deployment on Vercel with automatic builds, edge functions, and global CDN distribution.
