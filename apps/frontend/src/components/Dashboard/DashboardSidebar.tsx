"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Settings, 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  className?: string;
  onNavigate?: () => void;
  basePath?: string;
  isDemo?: boolean;
}

export function DashboardSidebar({
  className,
  onNavigate,
  basePath = "/dashboard",
  isDemo = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  const navItems = isDemo
    ? [{ name: "Overview", href: basePath, icon: LayoutDashboard }]
    : [
        { name: "Overview", href: basePath, icon: LayoutDashboard },
        { name: "Settings", href: `${basePath}/settings`, icon: Settings },
      ];

  return (
    <div className={cn("flex h-full flex-col bg-[#0A0A0F] border-r border-[#1e2028]", className)}>
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="bg-[#4F6EF7]/10 p-1.5 rounded-lg border border-[#4F6EF7]/20 flex items-center justify-center">
            <Image src="/favicon/apple-touch-icon.png" alt="Logo" width={20} height={20} className="w-5 h-5 object-contain" />
          </div>
          <span className="font-semibold text-white tracking-tight">UptimeCheck</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-4 space-y-1 z-10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group overflow-hidden",
                isActive 
                  ? "bg-white/4 text-white" 
                  : "text-[#8888A8] hover:bg-white/2 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-4 bg-[#4F6EF7] rounded-r-full shadow-[0_0_10px_#4F6EF7]" />
              )}
              
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "h-4 w-4 transition-colors", 
                  isActive ? "text-[#4F6EF7]" : "text-[#8888A8] group-hover:text-white"
                )} />
                <span className={cn("tracking-tight", isActive ? "font-semibold" : "")}>{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 mt-auto z-10">
        {isDemo ? (
          <div className="bg-white/2 border border-white/5 rounded-xl p-3">
            <p className="text-xs text-[#8888A8]">Demo Session</p>
            <p className="text-sm text-white font-medium">Live simulated checks</p>
          </div>
        ) : (
          <div className="bg-white/2 border border-white/5 hover:bg-white/4 transition-colors rounded-xl p-2.5 flex items-center group">
            <div className="flex items-center w-full">
              <UserButton 
                afterSignOutUrl="/"
                showName 
                appearance={{
                  elements: {
                    userButtonBox: "flex-row-reverse w-full justify-between",
                    userButtonOuterIdentifier: "text-sm text-[#8888A8] group-hover:text-white font-medium pr-2 whitespace-nowrap overflow-hidden text-ellipsis transition-colors",
                    userButtonAvatarBox: "h-8 w-8 ring-1 ring-white/10 group-hover:ring-[#4F6EF7]/40 shadow-sm transition-all",
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
