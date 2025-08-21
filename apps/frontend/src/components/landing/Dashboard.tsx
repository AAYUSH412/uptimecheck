"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Globe,
  Clock,
  BarChart3,
  Monitor,
  Zap,
  Shield
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    { 
      label: "Active Monitors", 
      value: "24", 
      change: "+3", 
      icon: <Monitor className="h-5 w-5" />,
      color: "text-blue-400" 
    },
    { 
      label: "Avg Response Time", 
      value: "247ms", 
      change: "-12ms", 
      icon: <Zap className="h-5 w-5" />,
      color: "text-green-400" 
    },
    { 
      label: "Uptime", 
      value: "99.97%", 
      change: "+0.02%", 
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-purple-400" 
    },
    { 
      label: "Incidents", 
      value: "2", 
      change: "-1", 
      icon: <AlertCircle className="h-5 w-5" />,
      color: "text-orange-400" 
    }
  ];

  const monitors = [
    { name: "Main Website", status: "online", responseTime: "234ms", uptime: "99.98%" },
    { name: "API Server", status: "online", responseTime: "156ms", uptime: "99.95%" },
    { name: "Payment Gateway", status: "warning", responseTime: "578ms", uptime: "99.89%" },
    { name: "Database", status: "online", responseTime: "89ms", uptime: "99.99%" },
    { name: "CDN", status: "online", responseTime: "45ms", uptime: "100%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-green-400 bg-green-400/20";
      case "warning": return "text-yellow-400 bg-yellow-400/20";
      case "offline": return "text-red-400 bg-red-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  return (
    <section id="dashboard" className="min-h-screen w-full relative">
      {/* Purple Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#ffffff",
          backgroundImage: `
            radial-gradient(
              circle at top left,
              rgba(173, 109, 244, 0.5),
              transparent 70%
            )
          `,
          filter: "blur(80px)",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Activity className="h-4 w-4" />
              Real-time Dashboard Preview
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Monitor Everything
              </span>
              <br />
              <span className="text-gray-800">In One Place</span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get a comprehensive view of all your services with beautiful analytics, 
              real-time alerts, and powerful insights at your fingertips.
            </p>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Browser Window */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Browser Header */}
              <div className="bg-gray-50 px-4 py-3 flex items-center border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 flex-1 text-center">
                  <div className="bg-white rounded-lg px-4 py-1 text-sm text-gray-600 inline-block">
                    dashboard.uptimecheck.com
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('400', '400/20')}`}>
                          <div className={stat.color}>
                            {stat.icon}
                          </div>
                        </div>
                        <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Area */}
                <motion.div
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-8 border border-purple-100"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Response Time Trends</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart3 className="h-4 w-4" />
                      Last 24 hours
                    </div>
                  </div>
                  
                  {/* Simulated Chart */}
                  <div className="h-32 flex items-end justify-between gap-1">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-gradient-to-t from-purple-400 to-blue-400 rounded-t-sm min-w-[4px] opacity-70"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${Math.random() * 80 + 20}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Monitors List */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Monitors</h3>
                  {monitors.map((monitor, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${getStatusColor(monitor.status)}`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{monitor.name}</div>
                          <div className="text-sm text-gray-500">Response: {monitor.responseTime}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{monitor.uptime}</div>
                        <div className="text-xs text-gray-500">Uptime</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="inline-flex items-center gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700 font-medium">50+ Global Monitoring Locations</span>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Enterprise-Grade Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}