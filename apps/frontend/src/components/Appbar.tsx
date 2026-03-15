"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { 
  Menu, 
  X,
  LayoutDashboard,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Appbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Status", href: "/status" },
    { name: "Demo", href: "/demo/dashboard" },
    { name: "Docs", href: "/docs" },
  ];

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/demo/dashboard")) return null;
  if (!mounted) return null; // Avoid hydration mismatch on the navbar

  return (
    <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "w-full transition-all duration-300 border-b pointer-events-auto",
          scrolled 
            ? "bg-[#0A0A0F]/80 backdrop-blur-md border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="bg-linear-to-tr from-[#4F6EF7]/20 to-[#4F6EF7]/5 p-1 rounded-xl border border-[#4F6EF7]/30 group-hover:border-[#4F6EF7]/60 group-hover:shadow-[0_0_15px_rgba(79,110,247,0.3)] transition-all">
                <Image src="/favicon/apple-touch-icon.png" alt="Logo" width={20} height={20} className="w-5 h-5 object-contain" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight hidden sm:block group-hover:text-[#4F6EF7] transition-colors">UptimeCheck</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 space-x-2">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-white bg-white/10 border border-white/5"
                    : "text-[#8888A8] hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side - Auth */}
          <div className="hidden md:flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" className="text-[#8888A8] hover:text-white hover:bg-white/10 rounded-full h-9">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className="border-l border-white/10 pl-4">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 ring-1 ring-white/20 hover:ring-[#4F6EF7]/50 transition-all"
                    }
                  }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" className="text-[#8888A8] hover:text-white hover:bg-white/5 rounded-full font-medium h-9">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium h-9 px-5 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all group">
                  Start Monitoring
                  <ChevronRight className="h-4 w-4 ml-1 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-[#8888A8] hover:text-white hover:bg-white/5 rounded-full" 
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/10 overflow-hidden bg-[#0A0A0F]/95 backdrop-blur-3xl -mt-px pointer-events-auto"
            >
              <div className="px-6 py-6 space-y-2">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href} 
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      pathname === item.href
                        ? "bg-white/10 text-white border border-white/5"
                        : "text-[#8888A8] hover:text-white hover:bg-white/5 border border-transparent"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="px-6 pt-2 pb-8">
                <SignedOut>
                  <div className="flex flex-col space-y-3">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full rounded-xl border-white/10 hover:bg-white/5 text-white h-11">
                        Log in
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full rounded-xl bg-white text-black hover:bg-white/90 h-11 font-medium">
                        Start Monitoring FREE
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="text-white hover:bg-white/10 rounded-lg">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Go to Dashboard
                      </Button>
                    </Link>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-9 w-9 ring-2 ring-[#4F6EF7]/30"
                        }
                      }}
                    />
                  </div>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}