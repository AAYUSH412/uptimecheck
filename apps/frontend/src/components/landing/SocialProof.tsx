"use client";

import { motion } from "motion/react";
import { Server, Database, Cloud, FileCode2, Command } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="py-20 bg-[#0A0A0F] border-t border-b border-white/5 relative overflow-hidden">
      {/* Background glow behind logos */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#4F6EF7]/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <p className="text-center text-sm font-medium text-[#8888A8] mb-10 tracking-widest uppercase">
          Trusted by developers building modern applications
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-60">
          {[
            { name: "Serverless", icon: <Cloud className="h-6 w-6 mr-2" /> },
            { name: "Node.js", icon: <Server className="h-6 w-6 mr-2" /> },
            { name: "PostgreSQL", icon: <Database className="h-6 w-6 mr-2" /> },
            { name: "React", icon: <FileCode2 className="h-6 w-6 mr-2" /> },
            { name: "CLI Tools", icon: <Command className="h-6 w-6 mr-2" /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center text-[#8888A8] hover:text-white transition-colors duration-300 grayscale hover:grayscale-0"
            >
              {item.icon}
              <span className="text-xl font-bold font-sans tracking-tight">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
