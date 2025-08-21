import React from "react";
import Link from "next/link";
import { SquareActivity, Github, Linkedin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <SquareActivity className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">UptimeCheck</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Professional website monitoring with real-time alerts and comprehensive analytics.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="https://github.com/AAYUSH412" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/aayush-vaghela/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a 
                href="https://aayush-vaghela.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">Portfolio</span>
              </a>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                    Status Page
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">About</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a 
                    href="https://aayush-vaghela.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Developer Portfolio
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/AAYUSH412" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    GitHub Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/aayush-vaghela/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                    About UptimeCheck
                  </Link>
                </li>
                <li>
                  <Link href="/customers" className="text-sm text-muted-foreground hover:text-foreground">
                    Customers
                  </Link>
                </li>
                <li>
                  <Link href="/enterprise" className="text-sm text-muted-foreground hover:text-foreground">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} UptimeCheck. Built with ❤️ by{" "}
              <a 
                href="https://aayush-vaghela.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 transition-colors"
              >
                Aayush Vaghela
              </a>
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}