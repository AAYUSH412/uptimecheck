"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Sparkles,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

export default function CTA() {
  const benefits = [
    "14-day free trial",
    "No credit card required", 
    "Setup in 5 minutes",
    "Cancel anytime"
  ];

  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Midnight Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "black",
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />

      {/* Floating stars */}
      <div className="absolute inset-0 z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <Star 
              className="h-4 w-4 text-blue-300 fill-blue-300" 
              style={{ opacity: 0.7 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium text-blue-200">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
              </span>
              Join 10,000+ satisfied customers
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-white mb-2 block">Ready to Monitor</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              with Confidence?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Start monitoring your websites and APIs in minutes. 
            Professional uptime monitoring that scales with your business.
          </motion.p>

          {/* Benefits */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 border-0"
              >
                <Rocket className="mr-2 h-5 w-5" />
                <span className="flex items-center">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </SignUpButton>
            
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-gray-600 bg-black/50 backdrop-blur-md hover:bg-gray-900/70 text-gray-300 hover:text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link href="#features">
                <Zap className="mr-2 h-5 w-5" />
                View Features
              </Link>
            </Button>
          </motion.div>

          {/* Bottom stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "99.9%", label: "Uptime SLA", color: "text-green-400" },
              { number: "<30s", label: "Setup Time", color: "text-blue-400" },
              { number: "24/7", label: "Expert Support", color: "text-purple-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring" as const, stiffness: 400 }}
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}