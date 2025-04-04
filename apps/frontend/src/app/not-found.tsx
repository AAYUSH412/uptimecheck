"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background elements */}
      <AnimatedGradientBackground />
      
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <AlertCircle className="h-10 w-10 text-red-500" />
            </div>
          </div>
          
          <h1 className="font-heading text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          
          <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
          
          <p className="text-muted-foreground mb-8">
            {`The page you're looking for doesn't exist or has been moved.`}
          </p>
          
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Abstract decoration */}
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -top-24 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
    </div>
  );
}