"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Globe, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemo } from "@/context/DemoContext";

export default function DemoMonitorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { websites } = useDemo();

  const website = websites.find((site) => String(site.id) === id);

  if (!website) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Demo Monitor Not Found</h2>
        <p className="text-[#8888A8] mb-8">This monitor may have been removed from demo mode.</p>
        <Button onClick={() => router.push('/demo/dashboard')} className="bg-[#4F6EF7] hover:bg-[#3A58E0] text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Demo Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 lg:p-4 max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <Button
          variant="ghost"
          onClick={() => router.push('/demo/dashboard')}
          className="text-[#8888A8] hover:text-white hover:bg-white/5 -ml-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Demo Overview
        </Button>
        <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#8888A8]">Demo Mode</span>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-white">{website.name}</h1>
            <a
              href={website.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#8888A8] hover:text-[#4F6EF7] transition-colors font-mono text-sm inline-flex"
            >
              {website.url}
            </a>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono text-[#8888A8]">LAST CHECKED</div>
            <div className="text-white text-sm mt-1 font-mono bg-white/5 py-1 px-3 rounded-md border border-white/5">
              {website.lastChecked}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-8 py-6 border-y border-white/10">
          <div className="space-y-1">
            <div className="text-sm text-[#8888A8] flex items-center gap-1.5"><Activity className="h-4 w-4 text-emerald-500" /> UPTIME</div>
            <div className="text-3xl font-light text-white font-mono tracking-tight">{website.uptime}</div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <div className="text-sm text-[#8888A8] flex items-center gap-1.5"><Globe className="h-4 w-4 text-amber-500" /> LATENCY</div>
            <div className="text-3xl font-light text-white font-mono tracking-tight">{website.responseTime}</div>
          </div>
          <div className="h-12 w-px bg-white/10 hidden md:block" />
          <div className="space-y-1">
            <div className="text-sm text-[#8888A8] flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#4F6EF7]" /> STATUS</div>
            <div className="text-3xl font-light text-white capitalize tracking-tight">{website.status}</div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-6 pt-4">
        <h4 className="text-sm font-medium text-[#8888A8] uppercase tracking-wider">Recent Checks</h4>
        <div className="space-y-3 font-mono text-sm max-h-96 overflow-y-auto pr-2">
          {[...website.uptimeHistory].reverse().map((tick, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/10 group hover:bg-white/5 px-2 -mx-2 transition-colors rounded">
              <div className="flex items-center gap-4">
                <span className="text-[#8888A8] w-20">{tick.timestamp}</span>
                <span className="flex items-center gap-2">
                  {tick.status === "up" ? (
                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  ) : tick.status === "down" ? (
                    <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                  )}
                  <span className={tick.status === "up" ? "text-emerald-400" : tick.status === "down" ? "text-red-400" : "text-gray-400"}>
                    {tick.status === "up" ? "Operating normally" : tick.status === "down" ? "Downtime detected" : "Status unknown"}
                  </span>
                </span>
              </div>
              <div className="text-right text-[#8888A8] text-xs space-x-3">
                <span>Successful: <span className="text-white">{tick.upCount}</span></span>
                <span>Failed: <span className="text-white">{tick.downCount}</span></span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
