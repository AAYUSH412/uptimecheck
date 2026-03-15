"use client";

import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Webhook, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function AlertsPage() {
  return (
    <div className="flex-1 space-y-6 lg:p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Alert Rules</h2>
          <p className="text-muted-foreground mt-1 text-[#8888A8]">
            Configure how and when you get notified about downtime.
          </p>
        </div>
        <Button className="bg-[#4F6EF7] text-white hover:bg-[#3A58E0] transition-colors border-0">
          <Plus className="mr-2 h-4 w-4" />
          New Alert Rule
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Email Alert Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="relative h-full overflow-hidden border border-white/10 bg-[#111118]/80 backdrop-blur-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#4F6EF7]/20 rounded-full border border-[#4F6EF7]/20">
                  <Mail className="h-5 w-5 text-[#4F6EF7]" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Email</CardTitle>
              </div>
              <Switch defaultChecked />
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-sm text-[#8888A8]">
                Sends an email to team@example.com when a monitor goes down.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-white/10 text-white bg-white/5">Primary Contacts</Badge>
                <Badge variant="outline" className="border-red-500/20 text-red-400 bg-red-500/10">Downtime Only</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Slack Alert Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="relative h-full overflow-hidden border border-white/10 bg-[#111118]/80 backdrop-blur-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#4F6EF7]/20 rounded-full border border-[#4F6EF7]/20">
                  <MessageSquare className="h-5 w-5 text-[#4F6EF7]" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Slack</CardTitle>
              </div>
              <Switch defaultChecked />
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-sm text-[#8888A8]">
                Posts to #engineering-alerts channel instantly on status changes.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-white/10 text-white bg-white/5">#engineering-alerts</Badge>
                <Badge variant="outline" className="border-green-500/20 text-green-400 bg-green-500/10">All Events</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Webhook Alert Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="relative h-full overflow-hidden border border-white/10 bg-[#111118]/80 backdrop-blur-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#4F6EF7]/20 rounded-full border border-[#4F6EF7]/20">
                  <Webhook className="h-5 w-5 text-[#4F6EF7]" />
                </div>
                <CardTitle className="text-lg font-medium text-white">Webhook</CardTitle>
              </div>
              <Switch defaultChecked={false} />
            </CardHeader>
            <CardContent className="mt-4">
              <p className="text-sm text-[#8888A8]">
                Send JSON payloads to your custom API endpoint (PagerDuty, etc).
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border-white/10 text-white bg-white/5">https://api.example...</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Connection options */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
        <Card className="border border-white/10 bg-[#111118]/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Bell className="h-5 w-5 text-[#4F6EF7]" />
              <span>Notification Preferences</span>
            </CardTitle>
            <CardDescription className="text-[#8888A8]">
              Manage global notification settings and quiet hours.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-white">SSL Certificates</h4>
                <p className="text-sm text-[#8888A8]">Receive alerts when SSL certificates are expiring within 7 days.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-white">Weekly Reports</h4>
                <p className="text-sm text-[#8888A8]">Get a weekly email summary of your monitors&apos; uptime and performance.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-medium text-white">Maintenance Mode</h4>
                <p className="text-sm text-[#8888A8]">Temporarily pause all notifications for planned maintenance.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
