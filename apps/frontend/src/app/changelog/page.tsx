"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Sparkles, Bug, Rocket } from "lucide-react";
import Footer from "@/components/landing/Footer";

export default function ChangelogPage() {
  const logs = [
    {
      version: "v2.0.0",
      date: "March 12, 2026",
      title: "The Massive UI Overhaul & Next.js 15 Upgrade",
      type: "major",
      changes: [
        { type: "feature", label: "New Landing Page", desc: "Completely redesigned the marketing site with a modern, asymmetric layout and glassmorphism elements." },
        { type: "feature", label: "Framework Upgrade", desc: "Upgraded entirely to Next.js 15 App Router with Turbopack." },
        { type: "feature", label: "New Authentication", desc: "Migrated to Clerk for secure, seamless session management." },
        { type: "fix", label: "Performance", desc: "Re-architected the monitoring engines to utilize Edge workers, dropping latency by 40%." },
      ]
    },
    {
      version: "v1.4.2",
      date: "February 28, 2026",
      title: "Slack and SMS Alerts Beta",
      type: "minor",
      changes: [
        { type: "feature", label: "Integrations", desc: "Added native support for Slack Webhooks to route incident alerts to specific channels." },
        { type: "feature", label: "Integrations", desc: "Added Twilio integration for SMS alerts on critical failures." },
        { type: "fix", label: "Dashboard", desc: "Fixed an issue where the heatmap occasionally failed to render 30-day history." },
      ]
    },
    {
      version: "v1.3.0",
      date: "January 15, 2026",
      title: "Status Pages v1",
      type: "minor",
      changes: [
        { type: "feature", label: "Status Pages", desc: "Users can now generate public status pages mapping to their internal monitors." },
        { type: "feature", label: "Custom Domains", desc: "Support for mapping CNAME records to status pages." },
      ]
    },
    {
      version: "v1.0.0",
      date: "November 5, 2025",
      title: "Public Launch",
      type: "major",
      changes: [
        { type: "feature", label: "Launch", desc: "UptimeCheck v1 is officially live. Core HTTP/HTTPS monitoring is available across 3 US regions." },
        { type: "feature", label: "Alerting", desc: "Basic Email alerts utilizing Resend." },
      ]
    }
  ];

  const getBadgeStyle = (type: string) => {
    switch(type) {
      case "feature": return "bg-[#4F6EF7]/20 border-[#4F6EF7]/30 text-[#4F6EF7]";
      case "fix": return "bg-yellow-500/10 border-yellow-500/20 text-yellow-500";
      default: return "bg-white/10 border-white/20 text-white";
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case "feature": return <Sparkles className="h-3 w-3" />;
      case "fix": return <Bug className="h-3 w-3" />;
      default: return <GitCommit className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] z-0 bg-[radial-gradient(ellipse_at_top,rgba(79,110,247,0.1)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Changelog
          </h1>
          <p className="text-[#8888A8] text-lg">
            New updates, improvements, and fixes for UptimeCheck.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-16">
          {logs.map((log, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Desktop Timeline Line */}
              <div className="hidden md:block absolute left-[120px] top-6 bottom-[-64px] w-px bg-white/10 last:hidden" />
              
              {/* Mobile Timeline Line */}
              <div className="md:hidden absolute left-0 top-6 bottom-[-64px] w-px bg-white/10 last:hidden" />

              <div className="flex flex-col md:flex-row gap-4 md:gap-12 relative">
                
                {/* Date Side */}
                <div className="md:w-[100px] shrink-0 pt-1">
                  <div className="text-sm font-medium text-[#8888A8] md:text-right sticky top-24">
                    {log.date}
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-37px] md:left-[115px] top-[10px] w-3 h-3 rounded-full bg-[#111118] border-2 border-[#4F6EF7] z-10" />
                  
                  <div className="bg-[#111118]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.02] transition-colors shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      {log.type === 'major' && (
                        <span className="inline-flex items-center gap-1.5 bg-[#4F6EF7]/10 border border-[#4F6EF7]/20 text-[#4F6EF7] px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          <Rocket className="h-3 w-3" /> Major Release
                        </span>
                      )}
                      <span className="text-[#8888A8] font-mono text-sm">{log.version}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-6">
                      {log.title}
                    </h2>
                    
                    <div className="space-y-4">
                      {log.changes.map((change, cIdx) => (
                        <div key={cIdx} className="flex flex-col sm:flex-row sm:items-start gap-3">
                          <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 mt-0.5 w-fit ${getBadgeStyle(change.type)}`}>
                            {getIcon(change.type)}
                            {change.label}
                          </span>
                          <span className="text-[#8888A8] text-sm leading-relaxed">
                            {change.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
