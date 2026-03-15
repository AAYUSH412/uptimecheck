"use client"

import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { DashboardOverview } from "./DashboardOverview"
import { useWebsite } from "@/hooks/useWebsite"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter();
  const { websites, isLoading, refreshWebsites, authError } = useWebsite()

  const compatibleWebsites = websites.map(site => ({
    ...site,
    id: String(site.id),
    uptimeHistory: site.uptimeHistory.map(tick => ({
      timestamp: tick.timestamp,
      status: tick.status
    }))
  }))

  const handleAddWebsite = () => {
    setTimeout(() => {
      refreshWebsites();
    }, 500);
  }

  if (authError) {
    return (
      <motion.div 
        className="flex h-screen items-center justify-center bg-linear-to-br from-[#0A0A0F] to-[#111118]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
          <div className="text-center max-w-md p-8 border border-white/5 bg-white/2 backdrop-blur-3xl rounded-3xl shrink-0">
          <div className="w-16 h-16 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Authentication Required</h2>
          <p className="text-[#8888A8] mb-6">{authError}</p>
          <p className="text-sm text-[#8888A8] italic">Please sign in to monitor your stack.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <DashboardOverview 
          websites={compatibleWebsites} 
          onSelectWebsite={(website) => router.push(`/dashboard/monitor/${website.id}`)} 
          onAddWebsite={handleAddWebsite}
          isLoading={isLoading}
          onRefresh={refreshWebsites}
        />
      </motion.div>
    </div>
  );
}