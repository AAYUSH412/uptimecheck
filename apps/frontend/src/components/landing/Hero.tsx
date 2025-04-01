"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { Grid3D } from "@/components/ui/3d-grid";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";

export default function Hero() {
  // Add opacity state for the gradient at the bottom
  const [opacity, setOpacity] = useState(0);

  // Update opacity based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 1);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  return (
    <section className="relative flex items-center justify-center overflow-hidden py-24 md:py-32 lg:py-40 min-h-[90vh]">
      {/* Background elements for hero section */}
      <Grid3D />
      <AnimatedGradientBackground />
      <FloatingParticles />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-2">
            <Link
              href="#"
              className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20 backdrop-blur-md transition-all hover:bg-blue-500/15"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New: Real-time status pages now available
            </Link>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
          >
            Monitor your services with{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                confidence
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          >
            Know instantly when your services go down. UptimeCheck provides 24/7
            monitoring, instant alerts, and detailed analytics for your websites
            and APIs.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full max-w-md mx-auto justify-center"
          >
            <Button
              size="lg"
              className="gap-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-500/20 w-full sm:w-auto"
            >
              <SignUpButton mode="modal">
                <motion.div
                  className="flex items-center justify-center w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start monitoring <Zap className="ml-2 h-4 w-4" />
                </motion.div>
              </SignUpButton>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 backdrop-blur-md w-full sm:w-auto"
              asChild
            >
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center"
              >
                View demo
              </motion.a>
            </Button>
          </motion.div>

          <motion.div
            variants={statVariants}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {[
              "Trusted by 2,000+ companies",
              "99.9% uptime guarantee",
              "24/7 support",
            ].map((text, i) => (
              <div key={i} className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient for visual separation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"
        style={{ opacity }}
      />

      {/* Additional abstract elements for visual flair */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-1/3 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
    </section>
  );
}
