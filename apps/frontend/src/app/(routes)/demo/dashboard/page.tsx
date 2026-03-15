"use client";

import { DashboardOverview } from "@/components/Dashboard/DashboardOverview";
import { SimulatedTerminal } from "@/components/Dashboard/SimulatedTerminal";
import { Website } from "@/components/Dashboard/types";
import { useDemo } from "@/context/DemoContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DemoDashboardPage() {
  const router = useRouter();
  const {
    websites,
    isLoading,
    refreshWebsites,
    addWebsite,
    deleteWebsite,
    terminalLogs,
  } = useDemo();

  const compatibleWebsites: Website[] = websites.map((site) => ({
    ...site,
    id: String(site.id),
    uptimeHistory: site.uptimeHistory.map((tick) => ({
      timestamp: tick.timestamp,
      status: tick.status,
    })),
  }));

  return (
    <div className="w-full max-w-7xl mx-auto">
      <DashboardOverview
        websites={compatibleWebsites}
        onSelectWebsite={(website) => {
          router.push(`/demo/dashboard/monitor/${website.id}`);
        }}
        isLoading={isLoading}
        onRefresh={refreshWebsites}
        onSubmitWebsite={async ({ name, url }) => {
          const added = await addWebsite({ name, url });
          const mapped: Website = {
            ...added,
            id: String(added.id),
            uptimeHistory: added.uptimeHistory.map((tick) => ({
              timestamp: tick.timestamp,
              status: tick.status,
            })),
          };
          toast.success("Added in Demo Mode", {
            description: `${mapped.name} is now being simulated.`,
          });
          return mapped;
        }}
        onDeleteWebsite={async (website) => {
          await deleteWebsite(String(website.id));
          toast.success("Removed from Demo", {
            description: `${website.name} was removed from simulated monitors.`,
          });
        }}
        isDemo
      />
      <SimulatedTerminal logs={terminalLogs} />
    </div>
  );
}
