"use client";

import { motion } from "framer-motion";
import { Globe2, BellRing, Activity } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add your endpoints",
    description: "Enter the URLs or API endpoints you want to monitor. Configure specific assertions like expected status codes or response times.",
    icon: <Activity className="h-6 w-6 text-[#4F6EF7]" />,
    delay: 0.1,
  },
  {
    number: "02",
    title: "We monitor 24/7 globally",
    description: "Our globally distributed validator network continuously pings your endpoints from multiple regions every 60 seconds.",
    icon: <Globe2 className="h-6 w-6 text-[#4F6EF7]" />,
    delay: 0.2,
  },
  {
    number: "03",
    title: "Get alerted instantly",
    description: "If an endpoint fails, we immediately verify it from multiple regions to prevent false positives, then instantly alert your team.",
    icon: <BellRing className="h-6 w-6 text-[#4F6EF7]" />,
    delay: 0.3,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#0A0A0F] relative overflow-hidden" id="how-it-works">
      {/* Background divider line */}
      <div className="absolute top-0 inset-x-0 section-divider" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            How UptimeCheck Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8888A8] max-w-2xl mx-auto text-lg"
          >
            Setup takes less than two minutes. We handle the complex globally distributed infrastructure.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#4F6EF7]/30 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, duration: 0.5 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-6 relative shadow-[0_0_15px_rgba(79,110,247,0.15)] group-hover:shadow-[0_0_25px_rgba(79,110,247,0.3)] transition-all duration-300">
                <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-[#4F6EF7]/50 transition-colors" />
                <span className="text-2xl font-mono font-bold gradient-text-accent">
                  {step.number}
                </span>
                
                {/* Icon badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#1A1A24] border border-white/10 flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>
              
              <p className="text-[#8888A8] text-sm leading-relaxed max-w-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
