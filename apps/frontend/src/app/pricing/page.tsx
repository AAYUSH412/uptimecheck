"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import Footer from "@/components/landing/Footer";
import ShimmerText from "@/components/kokonutui/shimmer-text";

const features = [
  { name: "Monitors", free: "Up to 5", pro: "Unlimited", info: "Number of websites or APIs you can check." },
  { name: "Check interval", free: "5 minutes", pro: "30 seconds", info: "How often we ping your services." },
  { name: "Email alerts", free: true, pro: true, info: "Receive alerts straight to your inbox." },
  { name: "Slack integration", free: false, pro: true, info: "Get notified in your team's Slack channels." },
  { name: "SMS alerts", free: false, pro: true, info: "Critical alerts sent directly to your phone." },
  { name: "Webhook endpoints", free: false, pro: true, info: "Trigger custom actions when a site goes down." },
  { name: "Global locations", free: "3 regions", pro: "50+ locations", info: "Check from multiple points around the world." },
  { name: "Data retention", free: "30 days", pro: "1 year", info: "How long we keep your historical uptime data." },
  { name: "Status pages", free: "1 page", pro: "Unlimited", info: "Public pages to inform your users about incidents." },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[500px] z-0 bg-[radial-gradient(ellipse_at_top,rgba(79,110,247,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ShimmerText 
            text="Pricing" 
            className="text-sm font-semibold tracking-wider uppercase mb-4"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Simple, transparent pricing.
          </h1>
          <p className="text-lg text-[#8888A8]">
            Start monitoring your services for free, and upgrade when you need faster intervals and team integrations.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#111118] border border-white/10 p-1 rounded-full flex items-center relative z-20">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !isAnnual ? "bg-white/10 text-white shadow-sm" : "text-[#8888A8] hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual ? "bg-white/10 text-white shadow-sm" : "text-[#8888A8] hover:text-white"
              }`}
            >
              Annually
              <span className="bg-[#4F6EF7]/20 text-[#4F6EF7] text-[10px] px-2 py-0.5 rounded-full font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col relative overflow-hidden group hover:border-white/20 transition-all"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Hobby</h3>
              <p className="text-[#8888A8] text-sm">For personal projects and small sites.</p>
            </div>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-[#8888A8]">/forever</span>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              {['5 Monitors', '5-minute checking interval', '3 Global locations', 'Email alerts', '1 Public Status Page', '30-day data retention'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#8888A8]">
                  <CheckCircle2 className="h-5 w-5 text-[#8888A8] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <SignUpButton mode="modal">
              <Button variant="outline" className="w-full rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white h-12">
                Start for free
              </Button>
            </SignUpButton>
          </motion.div>

          {/* Pro Tier (Popular) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111118]/80 backdrop-blur-xl border border-[#4F6EF7]/30 p-8 rounded-3xl flex flex-col relative overflow-hidden hero-widget-glow"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4F6EF7] to-purple-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#4F6EF7]/20 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                  Pro
                  <span className="bg-[#4F6EF7]/20 text-[#4F6EF7] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Most Popular</span>
                </h3>
                <p className="text-[#8888A8] text-sm">For businesses that need real-time alerts.</p>
              </div>
            </div>
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-white">
                ${isAnnual ? '24' : '29'}
              </span>
              <span className="text-[#8888A8]">/month</span>
            </div>
            
            <div className="space-y-4 mb-8 flex-1">
              {['Unlimited Monitors', '30-second checking interval', '50+ Global locations', 'Slack, SMS & Webhook alerts', 'Unlimited Status Pages', '1-year data retention'].map((feature, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#F0F0FF]">
                  <CheckCircle2 className="h-5 w-5 text-[#4F6EF7] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <SignUpButton mode="modal">
              <Button className="w-full rounded-xl bg-[#4F6EF7] hover:bg-[#3A58E0] text-white h-12 shadow-[0_0_20px_rgba(79,110,247,0.3)] hover:shadow-[0_0_25px_rgba(79,110,247,0.5)] transition-all group">
                Upgrade to Pro
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </SignUpButton>
          </motion.div>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Compare all features</h2>
            <p className="text-[#8888A8]">A detailed breakdown of what&apos;s included in each plan.</p>
          </div>
          
          <div className="bg-[#111118]/50 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="grid grid-cols-3 p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="font-semibold text-white">Features</div>
              <div className="font-semibold text-white text-center">Hobby</div>
              <div className="font-semibold text-[#4F6EF7] text-center">Pro</div>
            </div>
            
            <div className="divide-y divide-white/5">
              {features.map((item, idx) => (
                <div key={idx} className="grid grid-cols-3 p-6 items-center hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-2 text-sm text-[#F0F0FF]">
                    {item.name}
                    <div className="group relative hidden sm:block">
                      <HelpCircle className="h-3.5 w-3.5 text-[#8888A8] cursor-help" />
                      <div className="absolute left-1/2 -top-10 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-white/10 text-xs text-white px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-xl">
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm font-medium">
                    {typeof item.free === 'boolean' 
                      ? (item.free ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#8888A8]" /> : <span className="text-white/20">—</span>)
                      : <span className="text-[#8888A8]">{item.free}</span>
                    }
                  </div>
                  <div className="text-center text-sm font-medium">
                    {typeof item.pro === 'boolean' 
                      ? (item.pro ? <CheckCircle2 className="mx-auto h-5 w-5 text-[#4F6EF7]" /> : <span className="text-white/20">—</span>)
                      : <span className="text-white">{item.pro}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
