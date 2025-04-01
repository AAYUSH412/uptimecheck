"use client";

import React from "react";
import { LineChart, Activity, Clock, Globe, Bell, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <section className="relative z-10 py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500/10 px-4 py-1 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400">
            <Activity className="h-4 w-4" />
            Real-time Analytics
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            Powerful Monitoring Dashboard
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[42rem] mx-auto">
            Get a clear overview of all your services in one intuitive dashboard with powerful analytics and real-time alerts.
          </p>
        </div>
        
        {/* New Animated Dashboard Preview Container */}
        <div className="container mx-auto space-y-6 py-8 md:py-12">
          <motion.div
            className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-60 w-full sm:h-80 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative h-full w-full max-w-4xl overflow-hidden rounded-xl border bg-background/80 backdrop-blur-sm p-2 shadow-xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex h-8 items-center border-b bg-muted/50 px-4">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-4 flex-1 text-sm font-medium">UptimeGuard Dashboard</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 p-4">
                    <div className="col-span-2 space-y-2">
                      <div className="h-24 rounded-md bg-gradient-to-r from-blue-500/20 to-blue-600/30 p-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Uptime Overview</span>
                          <LineChart className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="mt-2 flex items-end justify-between">
                          <div className="space-y-1">
                            <motion.div
                              className="h-1 w-12 rounded-full bg-blue-500/60"
                              initial={{ width: 0 }}
                              whileInView={{ width: "3rem" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                            <motion.div
                              className="h-1 w-16 rounded-full bg-blue-500/60"
                              initial={{ width: 0 }}
                              whileInView={{ width: "4rem" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.3 }}
                            />
                            <motion.div
                              className="h-1 w-8 rounded-full bg-blue-500/60"
                              initial={{ width: 0 }}
                              whileInView={{ width: "2rem" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.4 }}
                            />
                            <motion.div
                              className="h-1 w-14 rounded-full bg-blue-500/60"
                              initial={{ width: 0 }}
                              whileInView={{ width: "3.5rem" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                          <div className="text-right text-xs">
                            <motion.div
                              className="font-bold"
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.7, delay: 0.6 }}
                            >
                              99.98%
                            </motion.div>
                            <div className="text-muted-foreground">30d avg</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-md bg-muted p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Response Time</span>
                            <Clock className="h-3 w-3" />
                          </div>
                          <motion.div
                            className="mt-2 text-lg font-bold"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                          >
                            187ms
                          </motion.div>
                        </div>
                        <div className="rounded-md bg-muted p-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium">Incidents</span>
                            <Bell className="h-3 w-3" />
                          </div>
                          <motion.div
                            className="mt-2 text-lg font-bold"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                          >
                            0
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="rounded-md bg-muted p-2">
                        <div className="text-xs font-medium">Monitored Services</div>
                        <div className="mt-2 space-y-1">
                          <motion.div
                            className="flex items-center justify-between"
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                          >
                            <span className="text-xs">api.example.com</span>
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                          </motion.div>
                          <motion.div
                            className="flex items-center justify-between"
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <span className="text-xs">dashboard.example.com</span>
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                          </motion.div>
                          <motion.div
                            className="flex items-center justify-between"
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                          >
                            <span className="text-xs">store.example.com</span>
                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                          </motion.div>
                        </div>
                      </div>
                      <div className="rounded-md bg-muted p-2">
                        <div className="text-xs font-medium">Alerts</div>
                        <div className="mt-2 text-xs text-muted-foreground">No active alerts</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Features Cards Section */}
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {[
              {
                icon: <Globe className="h-12 w-12 text-blue-500" />,
                title: "Global Monitoring",
                description: "Monitor from multiple locations worldwide for accurate uptime data.",
              },
              {
                icon: <Bell className="h-12 w-12 text-blue-500" />,
                title: "Instant Alerts",
                description: "Get notified instantly via SMS, email, Slack, or Discord when issues arise.",
              },
              {
                icon: <BarChart2 className="h-12 w-12 text-blue-500" />,
                title: "Detailed Analytics",
                description: "Comprehensive performance metrics and historical data analysis.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-lg border bg-background/80 backdrop-blur-sm p-2 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6 relative z-10">
                  {feature.icon}
                  <div className="space-y-2">
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}