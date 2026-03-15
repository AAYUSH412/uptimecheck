"use client";

import { motion } from "motion/react";
import { Globe2, BellRing, Activity, LayoutTemplate, LineChart } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Global Monitoring Network",
    description: "Distributed validator nodes check your endpoints from multiple global regions every 60 seconds.",
    icon: <Globe2 className="h-5 w-5 text-[#4F6EF7]" />,
    className: "md:col-span-2 md:row-span-2",
    visual: (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(79,110,247,0.1)_0%,transparent_50%)] pointer-events-none">
        {/* Abstract map representation */}
        <div className="absolute bottom-4 right-4 text-[#4F6EF7]/20">
          <Globe2 className="w-48 h-48 sm:w-64 sm:h-64 stroke-[0.5]" />
        </div>
      </div>
    ),
  },
  {
    title: "Zero-Delay Alerting",
    description: "Multi-channel alerts via Slack, Email, and SMS within 60s of failure.",
    icon: <BellRing className="h-5 w-5 text-[#00C48C]" />,
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="absolute top-4 right-4 bg-[#00C48C]/10 border border-[#00C48C]/20 rounded-full px-3 py-1 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#00C48C] animate-pulse" />
        <span className="text-[#00C48C] text-xs font-mono">Alert Sent</span>
      </div>
    ),
  },
  {
    title: "Advanced API Checks",
    description: "Assert status codes, JSON response bodies, and headers natively.",
    icon: <Activity className="h-5 w-5 text-[#F59E0B]" />,
    className: "md:col-span-1 md:row-span-1",
    visual: (
      <div className="absolute -bottom-4 -right-4 bg-[#111118] border border-white/10 rounded-xl p-4 w-48 shadow-xl opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="text-xs font-mono text-[#8888A8]">POST /api/v1/health</div>
        <div className="text-xs font-mono text-[#00C48C] mt-1">{"{"} &quot;status&quot;: &quot;ok&quot; {"}"}</div>
      </div>
    ),
  },
  {
    title: "Beautiful Status Pages",
    description: "Keep your customers informed with branded, real-time public status pages.",
    icon: <LayoutTemplate className="h-5 w-5 text-[#4F6EF7]" />,
    className: "md:col-span-1 md:row-span-2",
    visual: (
      <div className="absolute -bottom-10 right-4 w-40 h-48 bg-[#1A1A24] border border-white/10 rounded-t-xl shadow-2xl p-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="w-full h-2 rounded bg-white/10 mb-2" />
        <div className="w-full h-8 rounded bg-[#00C48C]/20 border border-[#00C48C]/30 mb-2" />
        <div className="w-3/4 h-2 rounded bg-white/5 mb-1" />
        <div className="w-1/2 h-2 rounded bg-white/5" />
      </div>
    ),
  },
  {
    title: "Detailed Analytics",
    description: "Track response times, uptime percentage streaks, and incident history.",
    icon: <LineChart className="h-5 w-5 text-[#A78BFA]" />,
    className: "md:col-span-2 md:row-span-1",
    visual: (
      <div className="absolute bottom-0 right-0 left-0 h-16 bg-gradient-to-t from-[#A78BFA]/10 to-transparent flex items-end px-6 overflow-hidden">
        {/* Fake sparkline bars */}
        <div className="flex items-end gap-1 w-full h-full opacity-30 group-hover:opacity-60 transition-opacity">
          {[40, 50, 30, 60, 45, 70, 55, 80, 65, 90, 75, 100].map((h, i) => (
            <div key={i} className="w-full bg-[#A78BFA] rounded-t-sm" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#0A0A0F] relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Everything you need,<br/>
            <span className="text-[#8888A8]">nothing you don&apos;t.</span>
          </motion.h2>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl glass-card border-white/5 hover:border-[#4F6EF7]/30 transition-colors duration-300 p-8 flex flex-col",
                feature.className
              )}
            >
              {/* Feature Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="bg-[#1A1A24] w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#8888A8] text-sm leading-relaxed max-w-[280px]">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Visual component */}
              {feature.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}