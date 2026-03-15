"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0A0A0F]">
      {/* Abstract radial gradient behind CTA */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#4F6EF7]/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Noise overlay */}
      <div className="absolute inset-0 z-0 noise-overlay opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
        >
          Ready to stop worrying about downtime?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#8888A8] mb-10 max-w-2xl mx-auto"
        >
          Join thousands of developers using UptimeCheck to monitor their infrastructure. Setup takes less than 2 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <SignedOut>
            <SignUpButton mode="modal">
              <Button 
                size="lg" 
                className="h-14 px-10 rounded-full bg-white text-[#0A0A0F] hover:bg-gray-100 font-bold text-lg transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 group"
              >
                Start Monitoring For Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Button 
              size="lg" 
              className="h-14 px-10 rounded-full bg-white text-[#0A0A0F] hover:bg-gray-100 font-bold text-lg transition-all shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 group"
              asChild
            >
              <Link href="/dashboard">
                Go to your Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </SignedIn>
          <p className="text-sm font-mono text-[#4F6EF7]">
            No credit card required &bull; Forever free tier available
          </p>
        </motion.div>
      </div>
    </section>
  );
}