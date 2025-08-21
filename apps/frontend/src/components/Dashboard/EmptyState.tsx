import { motion } from "framer-motion"
import { Globe, Plus, Monitor, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AddWebsiteDialog } from "./AddWebsiteDialog"
import { Website } from "./mockData"

interface EmptyStateProps {
  onWebsiteAdded: (website: Website) => void
}

export function EmptyState({ onWebsiteAdded }: EmptyStateProps) {
  const features = [
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "Get instant alerts when your website goes down"
    },
    {
      icon: Zap,
      title: "Performance Tracking",
      description: "Monitor response times and uptime statistics"
    },
    {
      icon: Globe,
      title: "Global Monitoring",
      description: "Check your website from multiple locations worldwide"
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Globe className="h-12 w-12 text-primary" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">Start Monitoring Your First Website</h3>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Add your first website to begin monitoring uptime, performance, and get instant alerts when something goes wrong.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <AddWebsiteDialog onWebsiteAdded={onWebsiteAdded} />
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <Card className="border-0 bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
