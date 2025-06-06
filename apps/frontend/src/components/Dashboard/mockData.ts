// Mock data for websites
export const mockWebsites = [
  {
    id: 1,
    name: "Main Website",
    url: "example.com",
    status: "up", // up or down
    uptime: "99.98%",
    responseTime: "187ms",
    lastChecked: "2 minutes ago",
    uptimeHistory: [
      { timestamp: "30 min ago", status: "up" },
      { timestamp: "27 min ago", status: "up" },
      { timestamp: "24 min ago", status: "up" },
      { timestamp: "21 min ago", status: "down" },
      { timestamp: "18 min ago", status: "up" },
      { timestamp: "15 min ago", status: "up" },
      { timestamp: "12 min ago", status: "up" },
      { timestamp: "9 min ago", status: "up" },
      { timestamp: "6 min ago", status: "up" },
      { timestamp: "3 min ago", status: "up" },
    ],
  },
  {
    id: 2,
    name: "API Service",
    url: "api.example.com",
    status: "up",
    uptime: "99.95%",
    responseTime: "210ms",
    lastChecked: "1 minute ago",
    uptimeHistory: [
      { timestamp: "30 min ago", status: "up" },
      { timestamp: "27 min ago", status: "up" },
      { timestamp: "24 min ago", status: "up" },
      { timestamp: "21 min ago", status: "up" },
      { timestamp: "18 min ago", status: "up" },
      { timestamp: "15 min ago", status: "up" },
      { timestamp: "12 min ago", status: "up" },
      { timestamp: "9 min ago", status: "up" },
      { timestamp: "6 min ago", status: "up" },
      { timestamp: "3 min ago", status: "up" },
    ],
  },
  {
    id: 3,
    name: "Customer Portal",
    url: "portal.example.com",
    status: "down",
    uptime: "98.72%",
    responseTime: "543ms",
    lastChecked: "3 minutes ago",
    uptimeHistory: [
      { timestamp: "30 min ago", status: "up" },
      { timestamp: "27 min ago", status: "up" },
      { timestamp: "24 min ago", status: "up" },
      { timestamp: "21 min ago", status: "up" },
      { timestamp: "18 min ago", status: "up" },
      { timestamp: "15 min ago", status: "down" },
      { timestamp: "12 min ago", status: "down" },
      { timestamp: "9 min ago", status: "down" },
      { timestamp: "6 min ago", status: "down" },
      { timestamp: "3 min ago", status: "down" },
    ],
  },
  {
    id: 4,
    name: "Documentation",
    url: "docs.example.com",
    status: "up",
    uptime: "99.99%",
    responseTime: "156ms",
    lastChecked: "2 minutes ago",
    uptimeHistory: [
      { timestamp: "30 min ago", status: "up" },
      { timestamp: "27 min ago", status: "up" },
      { timestamp: "24 min ago", status: "up" },
      { timestamp: "21 min ago", status: "up" },
      { timestamp: "18 min ago", status: "up" },
      { timestamp: "15 min ago", status: "up" },
      { timestamp: "12 min ago", status: "up" },
      { timestamp: "9 min ago", status: "up" },
      { timestamp: "6 min ago", status: "up" },
      { timestamp: "3 min ago", status: "up" },
    ],
  },
  {
    id: 5,
    name: "E-commerce Store",
    url: "store.example.com",
    status: "up",
    uptime: "99.87%",
    responseTime: "312ms",
    lastChecked: "1 minute ago",
    uptimeHistory: [
      { timestamp: "30 min ago", status: "up" },
      { timestamp: "27 min ago", status: "down" },
      { timestamp: "24 min ago", status: "up" },
      { timestamp: "21 min ago", status: "up" },
      { timestamp: "18 min ago", status: "up" },
      { timestamp: "15 min ago", status: "up" },
      { timestamp: "12 min ago", status: "up" },
      { timestamp: "9 min ago", status: "up" },
      { timestamp: "6 min ago", status: "up" },
      { timestamp: "3 min ago", status: "up" },
    ],
  },
]

export type Website = (typeof mockWebsites)[0]
