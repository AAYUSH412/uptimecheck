"use server";

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");

interface Tick {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  latency?: number;
}

interface ApiWebsite {
  id: string;
  url: string;
  ticks: Tick[];
}

export interface AggregatedTick {
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

export interface ProcessedWebsite {
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

export async function fetchAndProcessWebsites(token: string): Promise<ProcessedWebsite[]> {
  try {
    // Note: If you want to use the current user's token natively in the server action, you can use:
    // const { getToken } = await auth();
    // const token = await getToken();
    
    if (!token) {
      throw new Error("Authentication required");
    }

    if (!BACKEND_URL) {
      throw new Error("Backend URL is not configured. Set NEXT_PUBLIC_BACKEND_URL or use /demo/dashboard for preview mode.");
    }

    const response = await axios.get(`${BACKEND_URL}/api/v1/website`, {
      headers: {
        Authorization: token,
      },
    });

    const data: ApiWebsite[] = response.data;

    return data.map((website) => {
      const allTicks = website.ticks;
      const normalizedTicks = allTicks.map((tick) => ({
        ...tick,
        status: tick.status.toLowerCase(),
      }));

      const sortedTicks = [...normalizedTicks].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const latencyValues = sortedTicks
        .filter((tick) => tick.latency !== undefined && tick.latency > 0)
        .map((tick) => tick.latency as number);

      const avgLatency =
        latencyValues.length > 0
          ? latencyValues.reduce((sum, val) => sum + val, 0) / latencyValues.length
          : 0;

      const aggregatedTicks: AggregatedTick[] = [];
      if (sortedTicks.length > 0) {
        let startTime = new Date(sortedTicks[0].createdAt);
        let endTime = new Date(startTime);
        // Changed from 3 minutes to 1 minute to reflect actual ping interval 
        endTime.setMinutes(endTime.getMinutes() + 1);

        let currentWindow: Tick[] = [];

        for (const tick of sortedTicks) {
          const tickTime = new Date(tick.createdAt);

          if (tickTime <= endTime) {
            currentWindow.push(tick);
          } else {
            if (currentWindow.length > 0) {
              const upCount = currentWindow.filter((t) => t.status === "up").length;
              const downCount = currentWindow.filter((t) => t.status === "down").length;
              const unknownCount = currentWindow.filter((t) => t.status === "unknown").length;
              const total = currentWindow.length;
              const windowStatus = upCount > downCount ? "up" : downCount > upCount ? "down" : "unknown";
              const uptime = (upCount / total) * 100;

              aggregatedTicks.push({
                timestamp: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: windowStatus,
                windowStart: new Date(startTime),
                windowEnd: new Date(endTime),
                upCount,
                downCount,
                unknownCount,
                total,
                uptime,
              });
            }

            startTime = new Date(tickTime);
            endTime = new Date(startTime);
            // Changed from 3 minutes to 1 minute to reflect actual ping interval 
            endTime.setMinutes(endTime.getMinutes() + 1);
            currentWindow = [tick];
          }
        }

        if (currentWindow.length > 0) {
          const upCount = currentWindow.filter((t) => t.status === "up").length;
          const downCount = currentWindow.filter((t) => t.status === "down").length;
          const unknownCount = currentWindow.filter((t) => t.status === "unknown").length;
          const total = currentWindow.length;
          const windowStatus = upCount > downCount ? "up" : downCount > upCount ? "down" : "unknown";
          const uptime = (upCount / total) * 100;

          aggregatedTicks.push({
            timestamp: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: windowStatus,
            windowStart: new Date(startTime),
            windowEnd: new Date(endTime),
            upCount,
            downCount,
            unknownCount,
            total,
            uptime,
          });
        }
      }

      const upTicks = normalizedTicks.filter((tick) => tick.status === "up").length;
      const uptimePercentage =
        normalizedTicks.length > 0
          ? ((upTicks / normalizedTicks.length) * 100).toFixed(2)
          : "0.00";

      const lastTick = sortedTicks.length > 0 ? sortedTicks[sortedTicks.length - 1] : null;
      const currentStatus = lastTick ? (lastTick.status as "up" | "down" | "unknown") : "unknown";

      return {
        id: website.id,
        url: website.url,
        name: website.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0],
        status: currentStatus,
        uptime: `${uptimePercentage}%`,
        latency: avgLatency,
        responseTime: avgLatency > 0 ? `${Math.round(avgLatency)}ms` : "0ms",
        lastChecked: lastTick ? new Date(lastTick.createdAt).toLocaleString() : "Never",
        uptimeHistory: aggregatedTicks.slice(-10),
      };
    });
  } catch (error) {
    console.error("Error in server action fetchAndProcessWebsites:", error);
    throw new Error("Failed to fetch or process websites data");
  }
}
