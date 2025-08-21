"use client"

import { useState } from "react"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { WebsiteDetail } from "./WebsiteDetail"
import { DashboardOverview } from "./DashboardOverview"
import { Website } from "./mockData" // Keep the type import only
import { WebsiteNavigation } from "./WebsiteNavigation"
import { WebsiteSidebar } from "./WebsiteSidebar"
import { useWebsite } from "@/hooks/useWebsite"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { websites, isLoading, refreshWebsites, authError } = useWebsite()

  // Convert ProcessedWebsite[] to Website[] for compatibility
  const compatibleWebsites: Website[] = websites.map(site => ({
    ...site,
    id: typeof site.id === 'string' ? parseInt(site.id, 10) || 0 : site.id, // Convert string ID to number
    uptimeHistory: site.uptimeHistory.map(tick => ({
      timestamp: tick.timestamp,
      status: tick.status
    }))
  }))

  const filteredWebsites = compatibleWebsites.filter(website => 
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.url.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddWebsite = () => {
    // This would need to call an API to create the website
    // For now, just refresh the data after a short delay
    setTimeout(() => {
      refreshWebsites();
    }, 500);
  }

  const handleDeleteWebsite = () => {
    // Refresh the data after deletion
    refreshWebsites();
    // Show a notification
    toast("Website deleted", {
      description: "The website has been deleted successfully.",
    });
  }

  if (authError) {
    return (
      <motion.div 
        className="flex h-screen items-center justify-center bg-gradient-to-br from-background to-muted/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">{authError}</p>
          <p className="text-sm text-muted-foreground">Please sign in to monitor websites.</p>
        </div>
      </motion.div>
    )
  }

  const SidebarContent = () => (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <p className="text-sm text-muted-foreground mt-1">Monitor your websites</p>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search websites..."
              className="w-full pl-10 pr-4 py-2 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.nav 
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <WebsiteNavigation />
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
              Monitored Sites
            </h3>
            <motion.div 
              className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
              key={filteredWebsites.length} // Key to animate count changes
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {filteredWebsites.length}
            </motion.div>
          </div>
          <div className="space-y-2">
            <WebsiteSidebar 
              websites={filteredWebsites} 
              selectedWebsite={selectedWebsite as Website} 
              onSelectWebsite={(website) => {
                setSelectedWebsite(website)
                setIsMobileSidebarOpen(false)
              }} 
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-muted/10 pt-16">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-16 lg:top-16 border-r bg-card/80 backdrop-blur-md">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <main className="flex-1 lg:pl-80">
        <div className="sticky top-16 z-40 lg:hidden">
          <div className="flex items-center gap-x-4 bg-background/95 backdrop-blur-md border-b px-4 py-4 shadow-sm">
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-accent/50">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h1 className="text-lg font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
        </div>

        <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto">
          {selectedWebsite ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WebsiteDetail 
                website={selectedWebsite} 
                onBack={() => setSelectedWebsite(null)} 
                onDelete={handleDeleteWebsite}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardOverview 
                websites={filteredWebsites} 
                onSelectWebsite={setSelectedWebsite} 
                onAddWebsite={handleAddWebsite}
                isLoading={isLoading}
                onRefresh={refreshWebsites}
              />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}