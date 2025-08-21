import { Globe, Home, Activity, Settings, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

const navItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
    description: "Main dashboard view"
  },
  {
    title: "Websites",
    href: "/dashboard",
    icon: Globe,
    description: "Manage monitored websites"
  },
  {
    title: "Analytics",
    href: "/dashboard",
    icon: BarChart3,
    description: "Performance insights"
  },
  {
    title: "Status Page",
    href: "/dashboard",
    icon: Activity,
    description: "Public status page"
  },
  {
    title: "Settings",
    href: "/dashboard",
    icon: Settings,
    description: "Account settings"
  }
]

export function WebsiteNavigation() {
  const [activeItem, setActiveItem] = useState("Overview")

  const handleItemClick = (title: string) => {
    setActiveItem(title)
    // Prevent navigation for now since these are placeholder items
    // In a real app, you'd handle routing here
  }

  return (
    <div className="space-y-2">
      {navItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Button 
            variant={activeItem === item.title ? "secondary" : "ghost"}
            className="w-full justify-start text-left p-3 h-auto hover:bg-accent/50 transition-all duration-200 group" 
            onClick={() => handleItemClick(item.title)}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 rounded-md transition-colors ${
                activeItem === item.title 
                  ? "bg-primary/20" 
                  : "bg-primary/10 group-hover:bg-primary/20"
              }`}>
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
