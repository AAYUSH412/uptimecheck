import Link from "next/link"
import { Globe, Home, Server, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WebsiteNavigation() {
  return (
    <>
      <Button variant="ghost" className="justify-start gap-2 w-full text-left" asChild>
        <Link href="/dashboard">
          <Home className="h-4 w-4" />
          Overview
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full text-left" asChild>
        <Link href="/dashboard">
          <Globe className="h-4 w-4" />
          Websites
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full text-left" asChild>
        <Link href="/dashboard">
          <Server className="h-4 w-4" />
          Services
        </Link>
      </Button>
      <Button variant="ghost" className="justify-start gap-2 w-full text-left" asChild>
        <Link href="/dashboard">
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </Button>
    </>
  )
}
