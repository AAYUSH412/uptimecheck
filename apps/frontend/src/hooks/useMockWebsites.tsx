"use client";

import { useState, useEffect } from "react";

// Reuse your existing interfaces
interface AggregatedTick {
  timestamp: string;
  status: "up" | "down" | "unknown";
  windowStart: Date;
  windowEnd: Date;
  upCount: number;
  downCount: number;
  unknownCount: number;
  total: number;
  uptime: number;
}

interface ProcessedWebsite {
  id: string;
  url: string;
  name: string;
  status: "up" | "down" | "unknown";
  uptime: string;
  responseTime: string;
  lastChecked: string;
  uptimeHistory: AggregatedTick[];
  latency?: number;
}

// Generate realistic demo data
const generateMockWebsites = (): ProcessedWebsite[] => {
  // Current time to generate realistic timestamps
  const now = new Date();
  
  // Generate 10 history points for each website (3 minute intervals)
  const generateHistory = (upProbability: number = 0.9): AggregatedTick[] => {
    const history: AggregatedTick[] = [];
    
    for (let i = 0; i < 10; i++) {
      const windowEnd = new Date(now);
      windowEnd.setMinutes(now.getMinutes() - (i * 3));
      
      const windowStart = new Date(windowEnd);
      windowStart.setMinutes(windowEnd.getMinutes() - 3);
      
      // Determine status based on probability
      const isUp = Math.random() < upProbability;
      const isDown = !isUp && Math.random() < 0.8; // If not up, 80% chance of down vs unknown
      
      const status: "up" | "down" | "unknown" = 
        isUp ? "up" : (isDown ? "down" : "unknown");
      
      const upCount = status === "up" ? Math.floor(Math.random() * 3) + 3 : Math.floor(Math.random() * 2);
      const downCount = status === "down" ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 2);
      const unknownCount = status === "unknown" ? Math.floor(Math.random() * 2) + 1 : 0;
      const total = upCount + downCount + unknownCount;
      const uptime = (upCount / total) * 100;

      history.push({
        timestamp: windowStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status,
        windowStart,
        windowEnd,
        upCount,
        downCount,
        unknownCount,
        total,
        uptime
      });
    }
    
    // Reverse to get chronological order
    return history.reverse();
  };
  
  // Demo websites with varying statistics
  return [
    {
      id: "1",
      url: "example.com",
      name: "Example Website",
      status: "up",
      uptime: "99.98%",
      responseTime: "187ms",
      lastChecked: "2 minutes ago",
      uptimeHistory: generateHistory(0.95),
      latency: 187
    },
    {
      id: "2",
      url: "api.example.com",
      name: "API Service",
      status: "up",
      uptime: "99.95%",
      responseTime: "210ms",
      lastChecked: "1 minute ago",
      uptimeHistory: generateHistory(0.92),
      latency: 210
    },
    {
      id: "3",
      url: "portal.example.com",
      name: "Customer Portal",
      status: "down",
      uptime: "98.72%",
      responseTime: "543ms",
      lastChecked: "3 minutes ago",
      uptimeHistory: generateHistory(0.7),
      latency: 543
    },
    {
      id: "4",
      url: "docs.example.com",
      name: "Documentation",
      status: "up",
      uptime: "99.99%",
      responseTime: "156ms",
      lastChecked: "2 minutes ago",
      uptimeHistory: generateHistory(0.99),
      latency: 156
    },
    {
      id: "5",
      url: "store.example.com",
      name: "E-commerce Store",
      status: "up",
      uptime: "99.87%",
      responseTime: "312ms",
      lastChecked: "1 minute ago",
      uptimeHistory: generateHistory(0.9),
      latency: 312
    }
  ];
};

// Replace your useWebsite hook with this mock implementation
export function useWebsite() {
  const [websites, setWebsites] = useState<ProcessedWebsite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const refreshWebsites = () => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setWebsites(generateMockWebsites());
      setIsLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    refreshWebsites();
    
    // Set up polling to simulate real-time updates
    const interval = setInterval(() => {
      refreshWebsites();
    }, 60000); // 1 minute interval
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    websites,
    isLoading,
    error: null,
    authError: null,
    isAuthenticated: true, // Always authenticated in demo mode
    refreshWebsites
  };
}