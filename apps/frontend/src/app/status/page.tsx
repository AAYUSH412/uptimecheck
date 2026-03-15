"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Activity } from "lucide-react";
import Footer from "@/components/landing/Footer";

export default function StatusPage() {
  // Mock data for the status page
  const systems = [
    { name: "Website Frontend", status: "operational", uptime: "99.99%", latency: "124ms" },
    { name: "Core API", status: "operational", uptime: "99.99%", latency: "45ms" },
    { name: "Monitoring Workers (US-East)", status: "operational", uptime: "100%", latency: "12ms" },
    { name: "Monitoring Workers (EU-Central)", status: "operational", uptime: "99.98%", latency: "15ms" },
    { name: "Monitoring Workers (AP-South)", status: "operational", uptime: "100%", latency: "18ms" },
    { name: "Alerting Pipeline", status: "operational", uptime: "99.95%", latency: "32ms" },
  ];

  const pastIncidents = [
    {
      date: "Mar 10, 2026",
      title: "Elevated latency on US-East monitoring workers",
      status: "Resolved",
      description: "Between 14:00 UTC and 14:45 UTC, our monitoring workers in the US-East region experienced elevated latency due to a downstream network provider issue. All alerts were still processed but with a 1-2 minute delay. The issue has been fully resolved.",
    },
    {
      date: "Feb 22, 2026",
      title: "Brief API outage during database upgrade",
      status: "Resolved",
      description: "A planned database index rebuild caused unexpected locks on the main configuration tables, leading to a 4-minute API outage. No monitoring data was lost, but the dashboard was inaccessible during this window.",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] z-0 bg-[radial-gradient(ellipse_at_top,rgba(0,196,140,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            System Status
          </h1>
          <p className="text-[#8888A8]">
            Real-time operating status for all UptimeCheck services.
          </p>
        </div>

        {/* Global Status Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#00C48C]/10 border border-[#00C48C]/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-[0_0_30px_rgba(0,196,140,0.1)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00C48C]/20 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-[#00C48C]" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">All Systems Operational</h2>
              <p className="text-[#00C48C] text-sm font-medium">Last updated: Just now</p>
            </div>
          </div>
          <div className="bg-[#111118]/80 rounded-xl px-4 py-3 border border-white/5 flex items-center gap-8 backdrop-blur-md">
            <div>
              <p className="text-[#8888A8] text-xs font-semibold uppercase tracking-wider mb-1">Uptime (90d)</p>
              <p className="text-white font-mono text-lg text-center">99.99%</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[#8888A8] text-xs font-semibold uppercase tracking-wider mb-1">Avg Latency</p>
              <p className="text-white font-mono text-lg text-center">45ms</p>
            </div>
          </div>
        </motion.div>

        {/* Current Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-xl font-bold text-white mb-6">Current Services</h3>
          <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            {systems.map((system, idx) => (
              <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] transition-colors">
                <div className="font-medium text-white text-base">
                  {system.name}
                </div>
                <div className="flex items-center gap-6 justify-between sm:justify-end text-sm">
                  <div className="flex items-center gap-2 text-[#8888A8] font-mono hidden sm:flex">
                    <Activity className="h-3.5 w-3.5" />
                    {system.latency}
                  </div>
                  <div className="text-[#8888A8] font-mono w-16 text-right">
                    {system.uptime}
                  </div>
                  <div className="flex items-center gap-2 text-[#00C48C] font-medium min-w-[120px] justify-end">
                    <div className="status-dot-up w-2 h-2" />
                    Operational
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Past Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-6">Past Incidents</h3>
          <div className="space-y-6">
            {pastIncidents.map((incident, idx) => (
              <div key={idx} className="relative pl-8 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/10 pb-6 last:pb-0 last:before:hidden">
                <div className="absolute left-0 top-1.5 w-[23px] h-[23px] rounded-full bg-[#111118] border border-white/20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#8888A8]" />
                </div>
                <div className="bg-[#111118]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                    <h4 className="text-lg font-bold text-white">{incident.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-[#8888A8] whitespace-nowrap">
                      <Clock className="h-4 w-4" />
                      {incident.date}
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white mb-4">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gray-400" />
                    {incident.status}
                  </div>
                  <p className="text-[#8888A8] leading-relaxed text-sm">
                    {incident.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
      
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
