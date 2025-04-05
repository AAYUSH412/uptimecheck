"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { WebsiteDetail } from "./WebsiteDetail"
import { DashboardOverview } from "./DashboardOverview"
import { Website } from "./mockData" // Keep the type import only
import { WebsiteNavigation } from "./WebsiteNavigation"
import { WebsiteSidebar } from "./WebsiteSidebar"
import { useWebsite } from "@/hooks/useWebsite"
import { Toaster } from "@/components/ui/sonner"

export default function DashboardPage() {
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
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
    Toaster({
      title: "Website deleted",
      description: "The website has been deleted successfully.",
      variant: "success",
      duration: 3000,
    });
  }

  if (authError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{authError}</p>
          <p className="mb-4">Please sign in to monitor websites.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col dark">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        {/* Sidebar */}
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Dashboard</h2>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search websites..."
                  className="w-full pl-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <nav className="grid gap-2">
              <WebsiteNavigation />
            </nav>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium">Monitored Websites</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                </Button>
              </div>
              <div className="space-y-1">
                <WebsiteSidebar 
                  websites={filteredWebsites} 
                  selectedWebsite={selectedWebsite as Website} 
                  onSelectWebsite={setSelectedWebsite} 
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          {selectedWebsite ? (
            <WebsiteDetail 
              website={selectedWebsite} 
              onBack={() => setSelectedWebsite(null)} 
              onDelete={handleDeleteWebsite}
            />
          ) : (
            <DashboardOverview 
              websites={filteredWebsites} 
              onSelectWebsite={setSelectedWebsite} 
              onAddWebsite={handleAddWebsite}
              isLoading={isLoading}
              onRefresh={refreshWebsites}
            />
          )}
        </main>
      </div>
    </div>
  )
}