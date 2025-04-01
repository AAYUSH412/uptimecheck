import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, ExternalLink, Globe, Plus, RefreshCw, Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Website } from "./mockData"
import { AddWebsiteDialog } from "./AddWebsiteDialog"

interface DashboardOverviewProps {
  websites: Website[]
  onSelectWebsite: (website: Website) => void
  onAddWebsite?: (website: Website) => void
}

export function DashboardOverview({ 
  websites, 
  onSelectWebsite, 
  onAddWebsite 
}: DashboardOverviewProps) {
  const totalWebsites = websites.length
  const websitesUp = websites.filter((w) => w.status === "up").length
  const websitesDown = totalWebsites - websitesUp
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleWebsiteAdded = (website: Website) => {
    if (onAddWebsite) {
      onAddWebsite(website);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <AddWebsiteDialog onWebsiteAdded={handleWebsiteAdded} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Websites</CardTitle>
              <Globe className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWebsites}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-green-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Websites Up</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{websitesUp}</div>
              <p className="text-xs text-muted-foreground">{Math.round((websitesUp / totalWebsites) * 100)}% of total</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-red-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Websites Down</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{websitesDown}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((websitesDown / totalWebsites) * 100)}% of total
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalWebsites > 0 
                  ? Math.round(
                      websites.reduce((acc, website) => {
                        return acc + Number.parseInt(website.responseTime)
                      }, 0) / totalWebsites,
                    ) 
                  : 0}
                ms
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Monitored Websites</CardTitle>
              <CardDescription>Overview of all your monitored websites and their current status.</CardDescription>
            </div>
            <div className="relative w-56">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Filter websites..."
                className="w-full pl-8 text-sm"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {websites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No websites found</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6">Add your first website to start monitoring</p>
                <AddWebsiteDialog onWebsiteAdded={handleWebsiteAdded} />
              </div>
            ) : (
              websites.map((website, index) => (
                <motion.div
                  key={website.id}
                  className="flex items-center justify-between rounded-lg border p-4 cursor-pointer bg-card hover:bg-card/80 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}
                  onClick={() => onSelectWebsite(website)}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className={`h-3 w-3 rounded-full ${
                        website.status === "up" 
                          ? "bg-green-500 animate-pulse" 
                          : "bg-red-500"
                      }`} 
                    />
                    <div>
                      <p className="font-medium">{website.name}</p>
                      <p className="text-sm text-muted-foreground">{website.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{website.uptime} uptime</p>
                      <p className="text-xs text-muted-foreground">Last checked {website.lastChecked}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
