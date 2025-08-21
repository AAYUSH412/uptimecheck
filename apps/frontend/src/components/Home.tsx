"use client"

import React, { Suspense, Component, ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamic imports for better code splitting and performance
const Hero = dynamic(() => import("./landing/Hero"), {
  loading: () => <div className="h-screen bg-gradient-to-b from-background to-muted animate-pulse" />
});

const Features = dynamic(() => import("./landing/Features"), {
  loading: () => <div className="h-96 bg-muted animate-pulse" />
});

const Dashboard = dynamic(() => import("./landing/Dashboard"), {
  loading: () => <div className="h-96 bg-background animate-pulse" />
});

const CTA = dynamic(() => import("./landing/CTA"), {
  loading: () => <div className="h-64 bg-muted animate-pulse" />
});

const Footer = dynamic(() => import("./landing/Footer"), {
  loading: () => <div className="h-32 bg-background animate-pulse" />
});

// Custom Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Home page error:', error, errorInfo);
    // You can add error reporting service here (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4 max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
            <p className="text-muted-foreground">
              We encountered an error while loading the page. Please try refreshing.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="relative overflow-hidden">
        <Suspense fallback={<div className="h-screen bg-gradient-to-b from-background to-muted animate-pulse" />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-background animate-pulse" />}>
          <Dashboard />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-muted animate-pulse" />}>
          <Features />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
          <CTA />
        </Suspense>
        
        <Suspense fallback={<div className="h-32 bg-background animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}