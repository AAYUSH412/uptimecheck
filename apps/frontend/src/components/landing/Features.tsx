"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  BarChart, 
  Clock, 
  Shield, 
  Activity,
  Server,
  Globe,
  Zap,
  Eye,
  TrendingUp,
  Smartphone,
  AlertTriangle
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Monitor your websites and APIs 24/7 with sub-second response time tracking and instant detection of outages.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Alerts", 
      description: "Get notified instantly via email, SMS, Slack, or webhooks when issues are detected. Custom escalation rules included.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into performance trends, uptime statistics, and response times with beautiful, interactive charts.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Network",
      description: "Monitor from 50+ locations worldwide to ensure your site performs well for users everywhere on the planet.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security Monitoring",
      description: "SSL certificate monitoring, security headers checking, and vulnerability scanning to keep your site secure.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Sub-second response times and instant notifications. Our monitoring infrastructure is built for speed and reliability.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="features" className="min-h-screen w-full relative">
      {/* Dark Sphere Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
          `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need to monitor, analyze, and optimize your website's performance with enterprise-grade reliability.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>

                  {/* Hover effect background */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">Join 10,000+ websites being monitored</span>
              </div>
              <div className="h-6 w-px bg-gray-600" />
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">99.9% uptime guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}