"use client";

import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export default function PricingTeaser() {
  return (
    <section className="py-24 bg-[#0A0A0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8888A8] max-w-2xl mx-auto text-lg"
          >
            Start free. Upgrade when you need more checks or rapid 30-second ping cycles.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-[#111118] border border-white/10 p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-white mb-2">Hobby</h3>
            <div className="text-[#8888A8] text-sm mb-6">Perfect for personal projects & portfolios</div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-[#8888A8]">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "10 Website Monitors",
                "3-minute check interval",
                "Email Alerts",
                "1 Status Page",
                "30-day data retention"
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-[#F0F0FF]">
                  <Check className="h-4 w-4 text-[#00C48C] mr-3 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <SignUpButton mode="modal">
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl h-12">
                Get Started Free
              </Button>
            </SignUpButton>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-gradient-to-b from-[#4F6EF7]/20 to-[#111118] border border-[#4F6EF7]/30 p-8 flex flex-col relative overflow-hidden"
          >
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-[#4F6EF7] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>

            <h3 className="text-xl font-semibold text-[#4F6EF7] mb-2">Pro</h3>
            <div className="text-[#8888A8] text-sm mb-6">For production applications & teams</div>
            <div className="mb-8">
              <span className="text-5xl font-extrabold text-white">$15</span>
              <span className="text-[#8888A8]">/month</span>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "50 Website Monitors",
                "30-second check interval",
                "SMS & Slack Alerts",
                "Unlimited Status Pages",
                "1-year data retention",
                "API Access"
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-[#F0F0FF]">
                  <Check className="h-4 w-4 text-[#4F6EF7] mr-3 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <SignUpButton mode="modal">
              <Button className="w-full bg-[#4F6EF7] hover:bg-[#3A58E0] text-white rounded-xl h-12 shadow-[0_0_15px_rgba(79,110,247,0.3)] hover:shadow-[0_0_20px_rgba(79,110,247,0.5)] transition-all">
                Start Pro Trial
              </Button>
            </SignUpButton>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/pricing" className="inline-flex items-center text-[#4F6EF7] hover:text-[#818CF8] font-medium text-sm transition-colors group">
            View all features and enterprise plans
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
