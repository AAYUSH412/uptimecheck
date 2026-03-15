"use client";

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, ExternalLink, Globe, RefreshCw, Search, XCircle, Trash2, AlertCircle, TrendingUp, Activity, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Website } from "./types"
import { AddWebsiteDialog } from "./AddWebsiteDialog"
import { DashboardSkeleton } from "./DashboardSkeleton"
import { EmptyState } from "./EmptyState"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'

interface DashboardOverviewProps {
  websites: Website[]
  onSelectWebsite: (website: Website) => void
  onAddWebsite?: (website: Website) => void
  onSubmitWebsite?: (input: { name: string; url: string }) => Promise<Website | void>
  onDeleteWebsite?: (website: Website) => Promise<void> | void
  isLoading?: boolean
  onRefresh?: () => void
  isDemo?: boolean
}

export function DashboardOverview({ 
  websites, 
  onSelectWebsite, 
  onAddWebsite,
  onSubmitWebsite,
  onDeleteWebsite,
  onRefresh,
  isLoading = false,
  isDemo = false
}: DashboardOverviewProps) {
  const totalWebsites = websites.length
  const websitesUp = websites.filter((w) => w.status === "up").length
  const websitesDown = totalWebsites - websitesUp
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "up" | "down">("all")
  const [sortBy, setSortBy] = useState<"status" | "response" | "name">("status")
  const [lastSyncAt, setLastSyncAt] = useState(() => new Date())
  const { getToken } = useAuth()
  
  // For deletion functionality
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const avgResponseMs = totalWebsites > 0
    ? Math.round(
        websites.reduce((acc, website) => {
          const numeric = Number.parseInt(String(website.responseTime).replace(/[^0-9]/g, ""), 10)
          return acc + (Number.isNaN(numeric) ? 0 : numeric)
        }, 0) / totalWebsites,
      )
    : 0

  const uptimePercent = totalWebsites > 0
    ? Math.round((websitesUp / totalWebsites) * 100)
    : 0

  const filteredWebsites = websites.filter((website) => {
    const query = searchInput.trim().toLowerCase()
    const matchesQuery =
      query.length === 0 ||
      website.name.toLowerCase().includes(query) ||
      website.url.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "up" && website.status === "up") ||
      (statusFilter === "down" && website.status !== "up")

    return matchesQuery && matchesStatus
  })

  const parseResponseMs = (responseTime: string) => {
    const numeric = Number.parseInt(String(responseTime).replace(/[^0-9]/g, ""), 10)
    return Number.isNaN(numeric) ? Number.POSITIVE_INFINITY : numeric
  }

  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    }

    if (sortBy === "response") {
      return parseResponseMs(a.responseTime) - parseResponseMs(b.responseTime)
    }

    if (a.status === b.status) {
      return a.name.localeCompare(b.name)
    }

    return a.status === "up" ? 1 : -1
  })

  // Show loading skeleton
  if (isLoading) {
    return <DashboardSkeleton />
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    if (onRefresh) {
      onRefresh()
    }
    setLastSyncAt(new Date())
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleWebsiteAdded = (website: Website) => {
    if (onAddWebsite) {
      onAddWebsite(website);
    }
  }
  
  const handleDeleteWebsite = async () => {
    if (!websiteToDelete) return;
    
    setIsDeleting(true);
    setDeleteError(null);
    
    try {
      if (onDeleteWebsite) {
        await onDeleteWebsite(websiteToDelete);
        setWebsiteToDelete(null);
        if (onRefresh) {
          onRefresh();
        }
        return;
      }

      const token = await getToken();
      await axios.delete(`${BACKEND_URL}/api/v1/website?websiteid=${websiteToDelete.id}`, {
        headers: {
          Authorization: token,
        },
      });
      
      // Close dialog and refresh data
      setWebsiteToDelete(null);
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error("Error deleting website:", err);
      setDeleteError("Failed to delete website. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        className="rounded-2xl border border-white/10 bg-[#0F111A]/80 p-5 backdrop-blur-xl"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Operations Dashboard</h1>
            <p className="mt-1 text-sm text-[#9AA3B2]">
              Live uptime command center driven by your backend monitors.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <Badge className="border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
                <Activity className="mr-1 h-3 w-3" /> Live
              </Badge>
              <Badge variant="outline" className="border-white/15 text-[#B8C1D1]">
                Last Sync {lastSyncAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </Badge>
              {isDemo && (
                <Badge variant="outline" className="border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
                  Demo Mode
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="border-white/15 bg-white/5 text-white hover:bg-white/10"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <AddWebsiteDialog
              onWebsiteAdded={handleWebsiteAdded}
              onSubmitWebsite={onSubmitWebsite}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
            className={statusFilter === "all" ? "bg-[#4F6EF7] text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
          >
            All ({totalWebsites})
          </Button>
          <Button
            size="sm"
            variant={statusFilter === "up" ? "default" : "outline"}
            onClick={() => setStatusFilter("up")}
            className={statusFilter === "up" ? "bg-emerald-600 text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
          >
            Healthy ({websitesUp})
          </Button>
          <Button
            size="sm"
            variant={statusFilter === "down" ? "default" : "outline"}
            onClick={() => setStatusFilter("down")}
            className={statusFilter === "down" ? "bg-rose-600 text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
          >
            Attention ({websitesDown})
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-white/10 bg-[#121625] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#9AA3B2]">Total Monitors</CardTitle>
              <div className="rounded-full bg-[#4F6EF7]/20 p-2">
                <Globe className="h-4 w-4 text-[#8DA2FF]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{totalWebsites}</div>
              <p className="mt-1 text-xs text-[#7F8A9A]">
                {totalWebsites === 1 ? 'website' : 'websites'} monitored
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-white/10 bg-[#121625] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#9AA3B2]">Healthy</CardTitle>
              <div className="rounded-full bg-emerald-500/20 p-2">
                <CheckCircle className="h-4 w-4 text-emerald-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{websitesUp}</div>
              <p className="mt-1 text-xs text-[#7F8A9A]">
                {uptimePercent}% fleet uptime
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-white/10 bg-[#121625] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#9AA3B2]">Needs Attention</CardTitle>
              <div className="rounded-full bg-rose-500/20 p-2">
                <XCircle className="h-4 w-4 text-rose-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{websitesDown}</div>
              <p className="mt-1 text-xs text-[#7F8A9A]">
                {totalWebsites > 0 ? Math.round((websitesDown / totalWebsites) * 100) : 0}% offline
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-white/10 bg-[#121625] text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#9AA3B2]">Avg. Response</CardTitle>
              <div className="rounded-full bg-amber-500/20 p-2">
                <Clock className="h-4 w-4 text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">
                {avgResponseMs}
                <span className="ml-1 text-lg text-[#C9D0DD]">ms</span>
              </div>
              <p className="mt-1 text-xs text-[#7F8A9A]">
                average response time
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Websites List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-white/10 bg-[#121625] text-white">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold">Monitor Grid</CardTitle>
                <CardDescription className="mt-1 text-sm text-[#9AA3B2]">
                  Overview of all your monitored websites and their current status
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7F8A9A]" />
                  <Input
                    type="search"
                    placeholder="Filter websites..."
                    className="w-64 border-white/15 bg-[#0E1220] pl-10 text-white placeholder:text-[#667083] focus-visible:ring-[#4F6EF7]"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Badge variant="outline" className="border-white/15 px-2 py-1 text-xs text-[#C9D0DD]">
                  {sortedWebsites.length} shown
                </Badge>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#7F8A9A]">Sort by</span>
              <Button
                size="sm"
                variant={sortBy === "status" ? "default" : "outline"}
                onClick={() => setSortBy("status")}
                className={sortBy === "status" ? "bg-[#4F6EF7] text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
              >
                <ArrowUpDown className="mr-1 h-3 w-3" />
                Status
              </Button>
              <Button
                size="sm"
                variant={sortBy === "response" ? "default" : "outline"}
                onClick={() => setSortBy("response")}
                className={sortBy === "response" ? "bg-[#4F6EF7] text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
              >
                Response
              </Button>
              <Button
                size="sm"
                variant={sortBy === "name" ? "default" : "outline"}
                onClick={() => setSortBy("name")}
                className={sortBy === "name" ? "bg-[#4F6EF7] text-white" : "border-white/15 bg-transparent text-[#B8C1D1]"}
              >
                Name
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {websites.length === 0 ? (
              <EmptyState onWebsiteAdded={handleWebsiteAdded} />
            ) : sortedWebsites.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-[#0E1220] p-8 text-center">
                <p className="text-sm text-[#9AA3B2]">No monitors match your current search and status filters.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="hidden grid-cols-[2fr_120px_120px_160px_80px] gap-4 px-5 text-[11px] uppercase tracking-wide text-[#6E7790] md:grid">
                  <span>Monitor</span>
                  <span>Status</span>
                  <span>Uptime</span>
                  <span>Response</span>
                  <span>Actions</span>
                </div>
                {sortedWebsites.map((website, index) => (
                  <motion.div
                    key={website.id}
                    className="group relative cursor-pointer rounded-xl border border-white/10 bg-[#0E1220] p-5 transition-all duration-200 hover:border-[#4F6EF7]/40 hover:bg-[#141A2D] hover:shadow-[0_10px_24px_-16px_rgba(79,110,247,0.9)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.24,
                        ease: "easeOut",
                        delay: Math.min(index * 0.03, 0.24)
                      }
                    }}
                    whileHover={{ 
                      y: -1,
                      transition: {
                        duration: 0.14,
                        ease: "easeOut"
                      }
                    }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div
                      className={`pointer-events-none absolute inset-y-2 left-0 w-1 rounded-r-full ${
                        website.status === "up" ? "bg-emerald-400/80" : "bg-rose-400/80"
                      }`}
                    />
                    <div 
                      className="grid items-center gap-4 md:grid-cols-[2fr_120px_120px_160px_80px]"
                      onClick={() => onSelectWebsite(website)}
                    >
                      <div className="flex min-w-0 items-center space-x-4">
                        <div className="relative">
                          <div 
                            className={`h-4 w-4 rounded-full ${
                              website.status === "up" 
                                ? "bg-green-500 shadow-lg shadow-green-500/50" 
                                : "bg-red-500 shadow-lg shadow-red-500/50"
                            }`} 
                          />
                          {website.status === "up" && (
                            <div className="absolute inset-0 h-4 w-4 rounded-full bg-green-500 animate-ping opacity-20" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-semibold">{website.name}</p>
                          <p className="truncate text-sm text-[#A9B3C7]">{website.url}</p>
                          <p className="mt-1 text-xs text-[#7F8A9A]">Last checked {website.lastChecked}</p>
                        </div>
                      </div>

                      <div className="md:justify-self-start">
                        <Badge
                          variant={website.status === "up" ? "default" : "destructive"}
                          className="text-xs uppercase"
                        >
                          {website.status === "up" ? "Healthy" : "Down"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-[#C9D0DD] md:justify-self-start">
                        <TrendingUp className="h-3 w-3 text-[#7F8A9A]" />
                        {website.uptime}
                      </div>

                      <div className="flex flex-col md:justify-self-start">
                        <span className="text-sm text-[#E2E8F5]">{website.responseTime}</span>
                        <span className="text-[11px] text-[#7F8A9A]">latency</span>
                      </div>

                      <div className="flex items-center space-x-2 opacity-100 transition-all duration-200 md:opacity-0 md:translate-x-1 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`${website.url}`, '_blank');
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            setWebsiteToDelete(website);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!websiteToDelete} onOpenChange={(open) => !open && setWebsiteToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this website?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{websiteToDelete?.name}</strong> from your monitoring dashboard.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {deleteError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteWebsite();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Website"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
