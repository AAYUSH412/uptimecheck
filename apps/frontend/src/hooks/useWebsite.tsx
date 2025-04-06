"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface Tick {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  latency?: number; // Add latency property
}

interface ApiWebsite {
  id: string;
  url: string;
  ticks: Tick[];
}

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
  latency?: number; // Optional property for latency
}

export function useWebsite() {
  const { getToken, isSignedIn } = useAuth();
  const [websites, setWebsites] = useState<ProcessedWebsite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const processWebsiteData = (data: ApiWebsite[]): ProcessedWebsite[] => {
    return data.map(website => {
      const allTicks = website.ticks;
      // Normalize status to lowercase
      const normalizedTicks = allTicks.map(tick => ({
        ...tick,
        status: tick.status.toLowerCase() // Convert status to lowercase
      }));

      const sortedTicks = [...normalizedTicks].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      
      // Calculate average latency from ticks with positive latency
      const latencyValues = sortedTicks
        .filter(tick => tick.latency !== undefined && tick.latency > 0)
        .map(tick => tick.latency as number); // Type assertion since we've filtered out undefined values
      
      const avgLatency = latencyValues.length > 0
        ? latencyValues.reduce((sum, val) => sum + val, 0) / latencyValues.length
        : 0;
      
      // Group ticks in 3-minute windows
      const aggregatedTicks: AggregatedTick[] = [];
      if (sortedTicks.length > 0) {
        let startTime = new Date(sortedTicks[0].createdAt);
        let endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + 3);
        
        let currentWindow: Tick[] = [];
        
        for (const tick of sortedTicks) {
          const tickTime = new Date(tick.createdAt);
          
          if (tickTime <= endTime) {
            currentWindow.push(tick);
          } else {
            // Process the current window
            if (currentWindow.length > 0) {
              const upCount = currentWindow.filter(t => t.status === "up").length;
              const downCount = currentWindow.filter(t => t.status === "down").length;
              const unknownCount = currentWindow.filter(t => t.status === "unknown").length;
              const total = currentWindow.length;
              const windowStatus = upCount > downCount ? "up" : downCount > upCount ? "down" : "unknown";
              const uptime = (upCount / total) * 100;
              
              aggregatedTicks.push({
                timestamp: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: windowStatus,
                windowStart: new Date(startTime),
                windowEnd: new Date(endTime),
                upCount,
                downCount,
                unknownCount,
                total,
                uptime
              });
            }
            
            // Start a new window
            startTime = new Date(tickTime);
            endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + 3);
            currentWindow = [tick];
          }
        }
        
        // Process the last window
        if (currentWindow.length > 0) {
          const upCount = currentWindow.filter(t => t.status === "up").length;
          const downCount = currentWindow.filter(t => t.status === "down").length;
          const unknownCount = currentWindow.filter(t => t.status === "unknown").length;
          const total = currentWindow.length;
          const windowStatus = upCount > downCount ? "up" : downCount > upCount ? "down" : "unknown";
          const uptime = (upCount / total) * 100;
          
          aggregatedTicks.push({
            timestamp: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: windowStatus,
            windowStart: new Date(startTime),
            windowEnd: new Date(endTime),
            upCount,
            downCount,
            unknownCount,
            total,
            uptime
          });
        }
      }
      
      // Get overall status and uptime
      const upTicks = normalizedTicks.filter(tick => tick.status === "up").length;
      const uptimePercentage = normalizedTicks.length > 0 
        ? ((upTicks / normalizedTicks.length) * 100).toFixed(2) 
        : "0.00";
      
      const lastTick = sortedTicks.length > 0 ? sortedTicks[sortedTicks.length - 1] : null;
      const currentStatus = lastTick ? lastTick.status as "up" | "down" | "unknown" : "unknown";
      
      return {
        id: website.id,
        url: website.url,
        name: website.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0], // Extract domain name
        status: currentStatus,
        uptime: `${uptimePercentage}%`,
        latency: avgLatency, // Use the calculated average latency
        responseTime: avgLatency > 0 ? `${Math.round(avgLatency)}ms` : "0ms",
        lastChecked: lastTick ? new Date(lastTick.createdAt).toLocaleString() : "Never",
        uptimeHistory: aggregatedTicks.slice(-10), // Keep the last 10 aggregated windows
      };
    });
  };

  const refreshWebsites = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAuthError(null);
    
    try {
      const token = await getToken();
      if (!token) {
        setAuthError("Authentication required to access monitoring features");
        setWebsites([]);
        return;
      }
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/website`, {
        headers: {
          Authorization: token,
        },
      });
      
      const processedData = processWebsiteData(response.data);
      setWebsites(processedData);
    } catch (err: unknown) {
      console.error("Error fetching websites:", err);
      
      // Specifically handle auth errors
      const errorObject = err as { response?: { status?: number } };
      if (errorObject.response && 
          (errorObject.response.status === 401 || errorObject.response.status === 403)) {
        setAuthError("Authentication failed. Please sign in again.");
      } else {
        setError("Failed to fetch website data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [getToken]); // Remove isSignedIn from dependencies

  useEffect(() => {
    refreshWebsites();
    
    // Only set up polling if the user is signed in
    if (isSignedIn) {
      const interval = setInterval(() => {
        refreshWebsites();
      }, 60000); // 1 minute interval
      
      return () => clearInterval(interval);
    }
  }, [refreshWebsites, isSignedIn]);

  return {
    websites,
    isLoading,
    error,
    authError,
    isAuthenticated: !!isSignedIn,
    refreshWebsites
  };
}