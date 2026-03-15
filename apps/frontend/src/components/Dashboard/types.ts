export interface Website {
  id: string | number;
  name: string;
  url: string;
  status: string;
  uptime: string;
  responseTime: string;
  lastChecked: string;
  uptimeHistory: {
    timestamp: string;
    status: string;
  }[];
}
