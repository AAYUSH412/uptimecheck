"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import ShimmerText from "@/components/kokonutui/shimmer-text";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-[#0A0A0F] pt-24 pb-16 md:pt-32">
      {/* Background radial gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(79,110,247,0.1)_0%,transparent_60%)]" />
      
      {/* Dot Grid Background overlay */}
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-30 dot-grid-fade pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Text & CTA (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 lg:pr-8 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex mb-6 bg-white/5 border border-white/10 rounded-full px-1 py-0.5">
              <ShimmerText 
                text="UptimeCheck 2.0 is live" 
                className="text-xs font-medium px-3 py-1 bg-transparent text-accent-foreground"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
              Know when your site goes down,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#4F6EF7] to-[#818CF8]">
                before your users do.
              </span>
            </h1>
            
            <p className="text-lg text-[#8888A8] mb-8 max-w-2xl leading-relaxed">
              Distributed uptime monitoring via a global validator network. Real-time alerts via Email, Slack, and SMS within 60 seconds of any failure. Free for developers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <SignedOut>
                <SignUpButton mode="modal">
                  <Button 
                    size="lg" 
                    className="h-12 px-8 rounded-full bg-[#4F6EF7] hover:bg-[#3A58E0] text-white font-semibold text-base transition-all shadow-[0_0_20px_rgba(79,110,247,0.3)] hover:shadow-[0_0_30px_rgba(79,110,247,0.5)] group"
                  >
                    Start Monitoring Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button 
                  size="lg" 
                  className="h-12 px-8 rounded-full bg-[#4F6EF7] hover:bg-[#3A58E0] text-white font-semibold text-base transition-all shadow-[0_0_20px_rgba(79,110,247,0.3)] hover:shadow-[0_0_30px_rgba(79,110,247,0.5)] group"
                  asChild
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </SignedIn>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium group"
                asChild
              >
                <Link href="/demo/dashboard">
                  <Terminal className="mr-2 h-4 w-4 transition-colors group-hover:text-[#4F6EF7]" />
                  Try Live Demo
                </Link>
              </Button>
            </div>
            
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-[#8888A8]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#00C48C]" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Mockup Widget (Magic UI Glow effect) (6 cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative mt-12 lg:mt-0 perspective-1000 hidden md:block"
          >
            {/* The Magic UI widget effect */}
            <div 
              className="relative w-full max-w-lg mx-auto rounded-2xl bg-[#111118] border border-white/10 overflow-hidden shadow-2xl hero-widget-glow z-10"
              style={{
                transform: "rotateX(4deg) rotateY(-4deg)",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Fake Mac window header */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#1A1A24]">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <div className="ml-2 text-xs font-mono text-[#8888A8] flex items-center gap-2">
                  <Terminal className="h-3 w-3" />
                  uptime_status
                </div>
              </div>

              {/* Widget Content */}
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-sm font-semibold text-white">Production Services</span>
                  <div className="flex items-center gap-2 bg-[#00C48C]/10 text-[#00C48C] px-2.5 py-1 rounded-full text-xs font-medium border border-[#00C48C]/20">
                    <div className="status-dot-up w-1.5 h-1.5" />
                    All Systems Operational
                  </div>
                </div>

                {/* Status Rows */}
                <div className="space-y-3">
                  {[
                    { name: 'App Frontend', url: 'https://app.acme.com', status: 'up', time: '124ms' },
                    { name: 'Marketing Site', url: 'https://acme.com', status: 'up', time: '82ms' },
                    { name: 'Core API Layer', url: 'api.acme.com/v1', status: 'up', time: '215ms' },
                  ].map((site, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/2 border border-white/5 group hover:bg-white/4 transition-colors">
                      <div>
                        <div className="text-sm font-medium text-white mb-1">{site.name}</div>
                        <div className="text-xs font-mono text-[#8888A8] truncate max-w-45">{site.url}</div>
                      </div>
                      <div className="flex items-center gap-4 text-right">
                        <span className="text-xs font-mono text-[#8888A8]">{site.time}</span>
                        <div className="status-dot-up" />
                      </div>
                    </div>
                  ))}

                  {/* Down status example */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#FF4D6A]/5 border border-[#FF4D6A]/20">
                    <div>
                      <div className="text-sm font-medium text-white mb-1">Payment Webhook</div>
                      <div className="text-xs font-mono text-[#8888A8]">webhooks/stripe</div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-xs font-mono text-[#FF4D6A]">Timeout</span>
                      <div className="status-dot-down" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing orb behind widget */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-r from-[#4F6EF7]/20 to-purple-500/20 blur-[100px] -z-10 rounded-full pointer-events-none" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
