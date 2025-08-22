import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Website } from "./mockData"
import { Clock, Globe } from "lucide-react"

interface WebsiteSidebarProps {
  websites: Website[]
  selectedWebsite: Website | null
  onSelectWebsite: (website: Website) => void
}

export function WebsiteSidebar({ websites, selectedWebsite, onSelectWebsite }: WebsiteSidebarProps) {
  if (websites.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-8 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Globe className="h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">No websites to show</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {websites.map((website, index) => (
          <motion.div
            key={website.id}
            layout
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              scale: 1,
              transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 25,
                delay: index * 0.05
              }
            }}
            exit={{ 
              opacity: 0, 
              x: -20, 
              scale: 0.95,
              transition: { duration: 0.2 }
            }}
            whileHover={{ 
              x: 4,
              transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 20
              }
            }}
          >
            <Button
              variant={selectedWebsite?.id === website.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left p-3 h-auto relative group hover:bg-accent/50 transition-all duration-200"
              onClick={() => onSelectWebsite(website)}
            >
              <div className="flex items-start space-x-3 w-full">
                <div className="relative flex-shrink-0 mt-1">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      website.status === "up" 
                        ? "bg-green-500 shadow-sm shadow-green-500/50" 
                        : "bg-red-500 shadow-sm shadow-red-500/50"
                    }`}
                  />
                  {website.status === "up" && (
                    <motion.div 
                      className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 opacity-20"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate pr-2">{website.name}</span>
                    <Badge 
                      variant={website.status === "up" ? "default" : "destructive"}
                      className="text-xs scale-75 origin-right"
                    >
                      {website.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-1">{website.url}</p>
                  <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-current rounded-full" />
                      <span>{website.uptime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-2.5 w-2.5" />
                      <span>{website.responseTime}ms</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Selection indicator */}
              <AnimatePresence>
                {selectedWebsite?.id === website.id && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        type: "spring" as const,
                        stiffness: 500,
                        damping: 30
                      }
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                  />
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
