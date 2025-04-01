import React from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  BarChart, 
  Clock, 
  MessageSquare, 
  Shield, 
  Activity,
  Server,
  Database,
  Code,
} from "lucide-react";

import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24 ">
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)] opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-16">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Features
          </motion.h2>
          <motion.p
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Everything you need to ensure your services are always available and performing optimally.
          </motion.p>
        </div>

        <div className="relative z-10 mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {[
            {
              icon: <Clock className="h-10 w-10 text-blue-500" />,
              title: "24/7 Monitoring",
              description: "Continuous monitoring of your websites, APIs, and services around the clock."
            },
            {
              icon: <Bell className="h-10 w-10 text-blue-500" />,
              title: "Instant Alerts",
              description: "Receive immediate notifications via email, SMS, Slack, or Discord when issues arise."
            },
            {
              icon: <BarChart className="h-10 w-10 text-blue-500" />,
              title: "Detailed Analytics",
              description: "Gain insights into performance trends, uptime statistics, and historical data."
            },
            {
              icon: <Shield className="h-10 w-10 text-blue-500" />,
              title: "SSL Certificate Monitoring",
              description: "Get alerted before your SSL certificates expire to prevent security warnings."
            },
            {
              icon: <Server className="h-10 w-10 text-blue-500" />,
              title: "Server Monitoring",
              description: "Monitor server resources including CPU, memory, and disk usage."
            },
            {
              icon: <Database className="h-10 w-10 text-blue-500" />,
              title: "Database Monitoring",
              description: "Track database performance and availability with specialized checks."
            },
            {
              icon: <Code className="h-10 w-10 text-blue-500" />,
              title: "API Monitoring",
              description: "Verify your APIs are functioning correctly with custom request monitoring."
            },
            {
              icon: <MessageSquare className="h-10 w-10 text-blue-500" />,
              title: "Status Pages",
              description: "Create beautiful, customizable status pages to keep your users informed."
            },
            {
              icon: <Activity className="h-10 w-10 text-blue-500" />,
              title: "Fast & Reliable",
              description: "Built on a distributed architecture ensuring reliability and minimal latency."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="flex h-full flex-col relative overflow-hidden group bg-background/80 backdrop-blur-sm border border-border">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="relative z-10 flex flex-col items-start">
                  <div className="mb-4 p-2 rounded-full bg-blue-500/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}