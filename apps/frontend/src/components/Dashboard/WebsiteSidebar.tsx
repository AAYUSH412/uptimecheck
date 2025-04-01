import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Website } from "./mockData"

interface WebsiteSidebarProps {
  websites: Website[]
  selectedWebsite: Website | null
  onSelectWebsite: (website: Website) => void
}

export function WebsiteSidebar({ websites, selectedWebsite, onSelectWebsite }: WebsiteSidebarProps) {
  return (
    <>
      {websites.map((website) => (
        <motion.div
          key={website.id}
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <Button
            variant={selectedWebsite?.id === website.id ? "secondary" : "ghost"}
            className="justify-start gap-2 text-left w-full"
            onClick={() => onSelectWebsite(website)}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                website.status === "up" 
                  ? "bg-green-500 animate-pulse" 
                  : "bg-red-500"
              }`}
            />
            <span className="truncate">{website.name}</span>
          </Button>
        </motion.div>
      ))}
    </>
  )
}
