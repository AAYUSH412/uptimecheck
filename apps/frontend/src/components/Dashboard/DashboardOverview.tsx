import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, ExternalLink, Globe, RefreshCw, Search, XCircle, Trash2, AlertCircle, Plus, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Website } from "./mockData"
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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

interface DashboardOverviewProps {
  websites: Website[]
  onSelectWebsite: (website: Website) => void
  onAddWebsite?: (website: Website) => void
  isLoading?: boolean
  onRefresh?: () => void
}

export function DashboardOverview({ 
  websites, 
  onSelectWebsite, 
  onAddWebsite,
  onRefresh,
  isLoading = false
}: DashboardOverviewProps) {
  const totalWebsites = websites.length
  const websitesUp = websites.filter((w) => w.status === "up").length
  const websitesDown = totalWebsites - websitesUp
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const { getToken } = useAuth()
  
  // For deletion functionality
  const [websiteToDelete, setWebsiteToDelete] = useState<Website | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  // Show loading skeleton
  if (isLoading) {
    return <DashboardSkeleton />
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    if (onRefresh) {
      onRefresh()
    }
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
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <motion.h1 
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Dashboard
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Monitor and manage your website uptime in real-time
          </motion.p>
        </div>
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            className="transition-all duration-200 hover:scale-105"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <AddWebsiteDialog onWebsiteAdded={handleWebsiteAdded} />
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Websites</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">{totalWebsites}</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
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
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Websites Up</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">{websitesUp}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {totalWebsites > 0 ? Math.round((websitesUp / totalWebsites) * 100) : 0}% uptime
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Websites Down</CardTitle>
              <div className="p-2 bg-red-500/20 rounded-full">
                <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-red-900 dark:text-red-100">{websitesDown}</div>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">
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
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Avg. Response</CardTitle>
              <div className="p-2 bg-amber-500/20 rounded-full">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                {totalWebsites > 0 
                  ? Math.round(
                      websites.reduce((acc, website) => {
                        return acc + Number.parseInt(website.responseTime)
                      }, 0) / totalWebsites,
                    ) 
                  : 0}
                <span className="text-lg ml-1">ms</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
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
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold">Monitored Websites</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Overview of all your monitored websites and their current status
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Filter websites..."
                    className="w-64 pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {websites.length} total
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {websites.length === 0 ? (
              <EmptyState onWebsiteAdded={handleWebsiteAdded} />
            ) : (
              <div className="grid gap-4">
                {websites.map((website, index) => (
                  <motion.div
                    key={website.id}
                    className="group relative rounded-xl border bg-card/30 p-6 cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-card/60"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        type: "spring" as const,
                        stiffness: 400,
                        damping: 25,
                        delay: index * 0.1
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -4,
                      transition: {
                        type: "spring" as const,
                        stiffness: 400,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="flex items-center justify-between"
                      onClick={() => onSelectWebsite(website)}
                    >
                      <div className="flex items-center space-x-4 flex-1">
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
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-1">
                            <p className="font-semibold text-lg truncate">{website.name}</p>
                            <Badge 
                              variant={website.status === "up" ? "default" : "destructive"}
                              className="text-xs"
                            >
                              {website.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{website.url}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{website.uptime} uptime</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{website.responseTime}ms</span>
                            </span>
                            <span>Last checked {website.lastChecked}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
