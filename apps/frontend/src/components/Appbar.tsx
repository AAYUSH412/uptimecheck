"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { 
  ActivitySquare, 
  Menu, 
  X, 
  ChevronDown, 
  Home,
  LayoutDashboard,
  Globe,
  BarChart,
  Bell,
  Settings,
  Search
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Appbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Navigation items for better organization
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  ];

  // Handle scroll effect - make navbar transparent or solid
  useEffect(() => {
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

  return (
    <motion.nav 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
      "sticky top-0 z-50 transition-all duration-200 backdrop-blur-md",
      scrolled 
        ? "bg-500/95 border-b border-border shadow-sm" 
        : "bg-500/50 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <ActivitySquare className="h-8 w-8 text-primary" />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">UptimeCheck</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-secondary/60"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side - auth and other actions */}
          <div className="hidden md:flex items-center gap-2">
            
            {/* Auth buttons */}
            <SignedOut>
              <div className="flex items-center gap-2">
                <SignInButton
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-black-500 hover:bg-slate-400 text-sm',
                  },
                }}
                 mode="modal">
                  <Button variant="ghost" size="sm" className="rounded-full">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm" className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9"
                    }
                  }}
                />
              </motion.div>
            </SignedIn>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            {/* Search Bar Mobile */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 w-full bg-secondary/50"
                />
              </div>
            </div>
            
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/60"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4 pb-5 border-t border-border">
              <div className="px-5">
                <SignedOut>
                  <div className="flex flex-col space-y-3 w-full">
                    <SignInButton mode="modal">
                      <Button variant="outline" className="w-full justify-center cursor-auto">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-400 cursor-auto">
                        Create Account
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-3 px-1 py-2">
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "h-10 w-10"
                        }
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">User Account</span>
                      <span className="text-sm text-muted-foreground">Manage your account</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => setIsOpen(false)}
                      asChild
                    >
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </Button>
                  </div>
                </SignedIn>
              </div>
            </div>
            
            {/* App info in mobile menu */}
            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <ActivitySquare className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">UptimeCheck v1.0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}