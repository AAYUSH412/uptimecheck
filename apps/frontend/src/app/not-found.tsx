"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertCircle, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background elements */}
      <AnimatedGradientBackground />
      
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      <div className="relative z-10 container max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <motion.div 
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20 ring-8 ring-red-100/20 dark:ring-red-900/10">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                404
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground">
              Oops! Page not found
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg leading-relaxed">
              The page you&apos;re looking for seems to have wandered off into the digital void. 
              Don&apos;t worry, even the best monitoring systems have blind spots!
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="min-w-[140px]">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => router.back()}
              className="min-w-[140px]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            
            <Button asChild variant="ghost" size="lg" className="min-w-[140px]">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            <p>
              If you think this is a mistake, please{" "}
              <Link 
                href="/contact" 
                className="text-primary hover:underline font-medium"
              >
                contact support
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Enhanced abstract decoration */}
      <motion.div 
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute -top-24 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}