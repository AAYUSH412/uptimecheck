import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";

export default function DemoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F]">
      <DashboardSidebar basePath="/demo/dashboard" isDemo />
      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#111118]">
          <span className="font-bold text-white tracking-tight">UptimeCheck Demo</span>
          <span className="text-xs text-[#8888A8]">No login required</span>
        </div>

        <div className="p-4 md:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
