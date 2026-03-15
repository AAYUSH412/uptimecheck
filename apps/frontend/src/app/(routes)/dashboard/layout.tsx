import { UserButton } from "@clerk/nextjs";
import { DashboardSidebar } from "@/components/Dashboard/DashboardSidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0F]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (Shows only on small screens) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#111118]">
          <span className="font-bold text-white tracking-tight">UptimeCheck</span>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        <div className="p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
