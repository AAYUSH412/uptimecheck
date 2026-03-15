import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Status", href: "/status" },
      { name: "Changelog", href: "/changelog" },
    ],
    Resources: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/docs/api" },
      { name: "Integrations", href: "/integrations" },
      { name: "Blog", href: "/blog" },
    ],
    Company: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-[#0A0A0F] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="bg-linear-to-tr from-[#4F6EF7]/20 to-[#4F6EF7]/5 p-1 rounded-lg border border-[#4F6EF7]/30 group-hover:border-[#4F6EF7]/60 group-hover:shadow-[0_0_15px_rgba(79,110,247,0.3)] transition-all">
                <Image src="/favicon/apple-touch-icon.png" alt="Logo" width={20} height={20} className="w-5 h-5 object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">UptimeCheck</span>
            </Link>
            <p className="text-[#8888A8] text-sm max-w-xs mb-6 leading-relaxed">
              Professional website and API monitoring. Know when your services go down before your customers do.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/AAYUSH412" target="_blank" rel="noopener noreferrer" className="text-[#8888A8] hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com/aayush_vaghela" target="_blank" rel="noopener noreferrer" className="text-[#8888A8] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://linkedin.com/in/aayush-vaghela" target="_blank" rel="noopener noreferrer" className="text-[#8888A8] hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.Product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#8888A8] hover:text-white hover:underline decoration-white/30 underline-offset-4 text-sm transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.Resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#8888A8] hover:text-white hover:underline decoration-white/30 underline-offset-4 text-sm transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.Company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[#8888A8] hover:text-white hover:underline decoration-white/30 underline-offset-4 text-sm transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#8888A8] text-sm">
            &copy; {currentYear} UptimeCheck. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#8888A8]">
            <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}