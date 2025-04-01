"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-background to-background" />

      {/* Animated beam effect in the background */}
      <div className="absolute inset-0 [--beam-size:300px] [--beam-color:rgba(59,130,246,0.3)] [--beam-strength:0.3]">
        <div className="absolute top-1/2 left-1/2 h-[length:var(--beam-size)] w-[length:var(--beam-size)] -translate-y-1/2 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,_var(--beam-color)_0%,_transparent_100%)] opacity-[var(--beam-strength)] blur-[calc(var(--beam-size)/5)] animate-[pulse_6s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Content container with proper centering */}
      <motion.div 
        className="container relative z-10 mx-auto max-w-[58rem] px-4 sm:px-6 lg:px-8 space-y-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Heading with animation */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to monitor with confidence?
          </h2>
          <p className="mx-auto max-w-[42rem] text-lg text-muted-foreground">
            Start monitoring your services in minutes. No credit card required for your 14-day trial.
          </p>
        </motion.div>

        {/* CTA Buttons with hover animations */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/20"
              asChild
            >
              <Link href="/register">
                Start free trial <Zap className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-8 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 backdrop-blur-md"
              asChild
            >
              <Link href="/contact">
                Schedule a demo <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Testimonial/social proof section */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            <span>2,000+ companies trust UptimeCheck</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            <span>99.9% uptime guarantee</span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            <span>24/7 expert support</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}