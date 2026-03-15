"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebsite } from "@/hooks/useWebsite";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Activity, Globe, AlertTriangle, ArrowUpRight, Trash2, ShieldAlert, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

export default function MonitorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { websites, isLoading, refreshWebsites } = useWebsite();
  const { getToken } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  
  // Find the specific website based on the route parameter ID
  const website = websites.find(w => w.id.toString() === resolvedParams.id);

  useEffect(() => {
    refreshWebsites(true); // silent refresh on mount
  }, [refreshWebsites]);

  if (isLoading && !website) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F6EF7] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#8888A8]">Connecting to monitoring node...</p>
        </div>
      </div>
    );
  }

  if (!website && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-6">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Monitor Not Found</h2>
        <p className="text-[#8888A8] mb-8">The requested monitoring endpoint could not be located in this workspace.</p>
        <Button onClick={() => router.push('/dashboard')} className="bg-[#4F6EF7] hover:bg-[#3A58E0] text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
        </Button>
      </div>
    );
  }

  if (!website) return null;

  const handleDelete = async () => {
    if (!website) return

    try {
      setIsDeleting(true)
      setDeleteError(null)

      const token = await getToken()
      await axios.delete(`${BACKEND_URL}/api/v1/website?websiteid=${website.id}`, {
        headers: {
          Authorization: token,
        },
      })

      toast.success("Monitor deleted", { description: "The website monitor has been permanently removed." })
      router.push("/dashboard")
      setTimeout(() => refreshWebsites(true), 300)
    } catch (error) {
      console.error("Error deleting monitor:", error)
      setDeleteError("Failed to delete monitor. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col space-y-6 lg:p-4">
      <motion.div
        className="rounded-2xl border border-white/10 bg-[#0F111A]/80 p-5 backdrop-blur-xl"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="-ml-3 w-fit text-[#A3ADC2] hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Overview
            </Button>

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">{website.name}</h1>
              <Badge
                variant={website.status === "up" ? "default" : "destructive"}
                className="uppercase"
              >
                {website.status === "up" ? "Healthy" : "Down"}
              </Badge>
            </div>

            <a
              href={website.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-[#A3ADC2] transition-colors hover:text-[#8DA2FF]"
            >
              {website.url}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
              <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
                <Activity className="mr-1 h-3 w-3" /> Live
              </Badge>
              <Badge variant="outline" className="border-white/15 text-[#B8C1D1]">
                Last Checked {website.lastChecked}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshWebsites(true)}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-red-100"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-red-500">
                    <ShieldAlert className="h-5 w-5" /> Confirm Deletion
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently remove <strong>{website.name}</strong> and all associated monitoring history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                {deleteError && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {deleteError}
                  </div>
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.preventDefault()
                      handleDelete()
                    }}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deleting..." : "Delete Monitor"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9AA3B2]">Current Status</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            {website.status === "up" ? (
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            ) : (
              <XCircle className="h-5 w-5 text-rose-400" />
            )}
            <span className="text-2xl font-semibold">{website.status === "up" ? "Healthy" : "Down"}</span>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9AA3B2]">Uptime</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-400" />
            <span className="text-2xl font-semibold">{website.uptime}</span>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#9AA3B2]">Response Time</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-300" />
            <span className="text-2xl font-semibold">{website.responseTime}</span>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader>
            <CardTitle>Historical Performance</CardTitle>
            <CardDescription className="text-[#9AA3B2]">Past checks timeline from your backend monitor data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex justify-between text-xs text-[#7F8A9A]">
              <span>Past 30 minutes</span>
              <span>Now</span>
            </div>
            <div className="flex h-10 w-full gap-0.5 overflow-hidden rounded-md bg-[#0E1220]">
              {website.uptimeHistory.length === 0 ? (
                <div className="flex w-full items-center justify-center border border-dashed border-white/10 text-xs text-[#7F8A9A]">
                  No data available
                </div>
              ) : (
                website.uptimeHistory.map((tick, i) => (
                  <div
                    key={i}
                    className="group relative flex-1 transition-all duration-200 hover:brightness-110"
                    style={{
                      backgroundColor:
                        tick.status === "up"
                          ? "#10B981"
                          : tick.status === "down"
                            ? "#EF4444"
                            : "#475569",
                    }}
                  >
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 group-hover:block">
                      <div className="rounded border border-white/10 bg-[#0F111A] px-3 py-2 text-xs text-white shadow-xl">
                        <p className="capitalize">{tick.status}</p>
                        <p className="text-[#9AA3B2]">{tick.timestamp}</p>
                        <p className="mt-1 text-[10px] text-[#7F8A9A]">Up: {tick.upCount} | Down: {tick.downCount}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader>
            <CardTitle>Recent Checks</CardTitle>
            <CardDescription className="text-[#9AA3B2]">Latest backend health checks for this monitor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {website.uptimeHistory.length === 0 ? (
                <p className="text-sm italic text-[#7F8A9A]">Awaiting initial check.</p>
              ) : (
                [...website.uptimeHistory].reverse().slice(0, 20).map((tick, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-2 rounded-lg border border-white/8 bg-[#0E1220] px-4 py-3 transition-colors hover:bg-[#141A2D] md:grid-cols-[120px_1fr_180px] md:items-center"
                  >
                    <div className="flex items-center gap-2 text-xs text-[#8F98AA]">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{tick.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          tick.status === "up"
                            ? "bg-emerald-500"
                            : tick.status === "down"
                              ? "bg-red-500"
                              : "bg-slate-500"
                        }`}
                      />
                      <span className="text-sm text-[#D4DBE8]">
                        {tick.status === "up" ? "Operating normally" : tick.status === "down" ? "Downtime detected" : "Status unknown"}
                      </span>
                    </div>
                    <div className="text-xs text-[#8F98AA] md:text-right">
                      Successful: <span className="text-white">{tick.upCount}</span> | Failed: <span className="text-white">{tick.downCount}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
