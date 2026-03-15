"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from "react";
import { type ProcessedWebsite, type AggregatedTick } from "@/actions/website";

interface DemoContextType {
  websites: ProcessedWebsite[];
  isLoading: boolean;
  refreshWebsites: (silent?: boolean) => Promise<void>;
  addWebsite: (input: { name: string; url: string }) => Promise<ProcessedWebsite>;
  deleteWebsite: (id: string) => Promise<void>;
  terminalLogs: string[];
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const createMockTick = (date: Date, isUp: boolean): AggregatedTick => ({
  timestamp: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  status: isUp ? "up" : "down",
  windowStart: new Date(date.getTime() - 60000), // 1 min before
  windowEnd: date,
  upCount: isUp ? 1 : 0,
  downCount: isUp ? 0 : 1,
  unknownCount: 0,
  total: 1,
  uptime: isUp ? 100 : 0
});

const generateHistory = (isReliable: boolean) => {
  const history: AggregatedTick[] = [];
  const now = new Date();

  for (let i = 15; i >= 0; i--) {
    const tickDate = new Date(now.getTime() - i * 60000);
    const isUp = isReliable || Math.random() > 0.15; // 15% chance of down for unreliable
    history.push(createMockTick(tickDate, isUp));
  }
  return history;
};

const formatUptime = (history: AggregatedTick[]) => {
  if (history.length === 0) return "0.00%";
  const up = history.filter((tick) => tick.status === "up").length;
  return `${((up / history.length) * 100).toFixed(2)}%`;
};

const INITIAL_WEBSITES: ProcessedWebsite[] = [
  {
    id: "demo-id-1",
    name: "github.com",
    url: "https://github.com",
    status: "up",
    uptime: "100.00%",
    responseTime: "24ms",
    lastChecked: "Just now",
    latency: 24,
    uptimeHistory: generateHistory(true),
  },
  {
    id: "demo-id-2",
    name: "vercel.com",
    url: "https://vercel.com",
    status: "up",
    uptime: "99.98%",
    responseTime: "12ms",
    lastChecked: "Just now",
    latency: 12,
    uptimeHistory: generateHistory(true),
  },
  {
    id: "demo-id-3",
    name: "api.demo.com",
    url: "https://api.demo.com/health",
    status: "up",
    uptime: "94.50%",
    responseTime: "145ms",
    lastChecked: "Just now",
    latency: 145,
    uptimeHistory: generateHistory(false),
  }
];

export function DemoProvider({ children }: { children: ReactNode }) {
  const [websites, setWebsites] = useState<ProcessedWebsite[]>(INITIAL_WEBSITES);
  const [isLoading, setIsLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[boot] [Hub] Demo network is online.",
    "[boot] [Validator: US-East-1] Ready to process checks.",
  ]);
  const timeoutRefs = useRef<number[]>([]);

  const appendLog = useCallback((line: string, delay = 0) => {
    const timeoutId = window.setTimeout(() => {
      setTerminalLogs((prev) => [...prev, line].slice(-120));
    }, delay);
    timeoutRefs.current.push(timeoutId);
  }, []);

  const queueValidationLogs = useCallback((siteUrl: string, status: "up" | "down", latency: number, node: string) => {
    let host = siteUrl;
    try {
      host = new URL(siteUrl).hostname.replace(/^www\./, "");
    } catch {
      host = siteUrl;
    }

    appendLog(`[+0ms] [Hub] Dispatching check for ${host} to Node "${node}"`);
    if (status === "up") {
      appendLog(`[+12ms] [Validator: ${node}] Pinging ${host}... HTTP 200 OK (${latency}ms)`, 12);
    } else {
      appendLog(`[+12ms] [Validator: ${node}] Pinging ${host}... TIMEOUT`, 12);
    }
    appendLog(`[+20ms] [Validator: ${node}] Cryptographically signing result using Solana nacl...`, 20);
    appendLog(`[+28ms] [Hub] Signature verified. Dashboard state updated.`, 28);
  }, [appendLog]);

  useEffect(() => {
    const nodes = ["US-East-1", "EU-Central-1", "AP-South-1"];
    const interval = window.setInterval(() => {
      setWebsites((prev) => {
        const updated = prev.map((site, index) => {
          const isFlakySite = site.id === "demo-id-3" || site.url.includes("demo");
          const isUp = isFlakySite ? Math.random() > 0.1 : Math.random() > 0.02;
          const baseLatency = isFlakySite ? 120 : site.url.includes("vercel") ? 12 : 25;
          const latency = isUp ? baseLatency + Math.round(Math.random() * 50) : 0;

          const newTick = createMockTick(new Date(), isUp);
          const nextHistory = [...site.uptimeHistory, newTick].slice(-100);
          const nextStatus: ProcessedWebsite["status"] = isUp ? "up" : "down";

          queueValidationLogs(site.url, nextStatus, latency, nodes[index % nodes.length]);

          return {
            ...site,
            status: nextStatus,
            uptime: formatUptime(nextHistory),
            responseTime: isUp ? `${latency}ms` : "timeout",
            latency: isUp ? latency : undefined,
            lastChecked: "Just now",
            uptimeHistory: nextHistory,
          };
        });

        return updated;
      });
    }, 3000);

    return () => {
      window.clearInterval(interval);
      for (const timeoutId of timeoutRefs.current) {
        window.clearTimeout(timeoutId);
      }
      timeoutRefs.current = [];
    };
  }, [queueValidationLogs]);

  const refreshWebsites = async (silent = false) => {
    if (!silent) setIsLoading(true);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 600));
    setWebsites((prev) => [...prev]);
    appendLog("[manual] [Hub] Manual refresh requested from demo dashboard.");
    if (!silent) setIsLoading(false);
  };

  const addWebsite = async ({ name, url }: { name: string; url: string }) => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1500));
    
    const newSite: ProcessedWebsite = {
      id: `demo-id-${Date.now()}`,
      name: name || url.replace(/^https?:\/\//, "").replace(/\/$/, ""),
      url,
      status: "up",
      uptime: "100.00%",
      responseTime: "45ms",
      lastChecked: "Just now",
      latency: 45,
      uptimeHistory: generateHistory(true),
    };
    
    setWebsites(prev => [...prev, newSite]);
    appendLog(`[event] [Hub] New demo monitor added for ${newSite.name}.`);
    setIsLoading(false);
    return newSite;
  };

  const deleteWebsite = async (id: string) => {
    await new Promise((res) => setTimeout(res, 400));
    let removedName = "";
    setWebsites((prev) => {
      const target = prev.find((site) => site.id === id);
      removedName = target?.name ?? "";
      return prev.filter((site) => site.id !== id);
    });
    if (removedName) {
      appendLog(`[event] [Hub] Monitor removed for ${removedName}.`);
    }
  };

  return (
    <DemoContext.Provider value={{ websites, isLoading, refreshWebsites, addWebsite, deleteWebsite, terminalLogs }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within DemoProvider");
  return context;
}