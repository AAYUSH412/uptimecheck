"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Shield, Zap, Heart } from "lucide-react";
import Footer from "@/components/landing/Footer";

export default function AboutPage() {
  const values = [
    {
      icon: <Globe className="h-6 w-6 text-[#4F6EF7]" />,
      title: "Built for the Modern Web",
      description: "We believe monitoring should be as fast and globally distributed as the applications you build. That's why we built our engine from the ground up for edge architectures.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: "Speed is a Feature",
      description: "Sub-minute monitoring isn't a premium feature—it's the baseline. Getting an alert 5 minutes after an outage is 5 minutes too late.",
    },
    {
      icon: <Shield className="h-6 w-6 text-[#00C48C]" />,
      title: "Developer First",
      description: "We don't hide our core functionality behind enterprise paywalls. Our free tier is designed to genuinely support individual developers.",
    },
    {
      icon: <Heart className="h-6 w-6 text-[#FF4D6A]" />,
      title: "Open Core Philosophy",
      description: "Transparency is critical for monitoring tools. We build in the open so you can trust the systems that watch your systems.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-[600px] z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(79,110,247,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 dot-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Our mission is to keep the internet running.
          </h1>
          <p className="text-lg text-[#8888A8] leading-relaxed">
            UptimeCheck started when we were tired of finding out our sites were down from angry tweets instead of our monitoring tools. We decided to build a better watchtower for the modern web.
          </p>
        </div>

        {/* The Story Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl font-bold text-white mb-6">The Story</h2>
            <div className="space-y-6 text-[#8888A8] leading-relaxed">
              <p>
                As developers, we've all been there: it's 3 AM, your phone blows up, and by the time you log in, your service has been quietly timing out for the last hour. Your current monitoring tool was pinging every 5 minutes from a single location that was routing incorrectly.
              </p>
              <p>
                We built UptimeCheck because we needed a tool that was <span className="text-white font-medium">ridiculously fast</span>, <span className="text-white font-medium">globally aware</span>, and didn't cost a fortune for basic features.
              </p>
              <p>
                Today, UptimeCheck is powered by an edge-first architecture with distributed validators that check your endpoints from multiple global regions every 60 seconds. If something blinks, you know before your users do.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 relative"
          >
            {/* Decorative "Server" graphic */}
            <div className="aspect-square rounded-3xl bg-[#111118] border border-white/10 overflow-hidden relative hero-widget-glow flex flex-col justify-center p-8 gap-4 shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#4F6EF7]/20 blur-[80px] rounded-full pointer-events-none" />
               
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-16 w-full rounded-xl bg-white/[0.03] border border-white/5 flex items-center px-6 gap-4 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4F6EF7] to-purple-500" />
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-[#00C48C]" />
                    </div>
                    <div className="h-2 flex-1 rounded-full bg-white/5" />
                    <div className="h-2 w-12 rounded-full bg-white/10" />
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">What we believe in</h2>
            <p className="text-[#8888A8]">The core principles that guide our product decisions.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-[#8888A8] leading-relaxed text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Builder Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#4F6EF7] to-purple-500 p-1 mb-6 flex items-center justify-center">
            {/* For now, just a placeholder avatar - you can swap with next/image later */}
            <div className="w-full h-full rounded-full bg-[#111118] border border-[#0A0A0F] flex items-center justify-center text-3xl font-bold text-white uppercase overflow-hidden">
               <span className="text-[#4F6EF7]">AV</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Built by Aayush Vaghela</h2>
          <p className="text-[#8888A8] mb-6 max-w-xl mx-auto">
            Full-stack developer obsessed with tools that make engineering teams faster and more resilient.
          </p>
          <a 
            href="https://aayush-vaghela.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#4F6EF7] hover:text-[#3A58E0] font-medium transition-colors"
          >
            Visit Portfolio <Globe className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

      </div>
      
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
}
