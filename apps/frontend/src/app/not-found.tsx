import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center text-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(79,110,247,0.15),transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full pointer-events-none bg-[#111118]/20 backdrop-blur-3xl shadow-[0_0_60px_12px_rgba(79,110,247,0.1)]" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/20 backdrop-blur-sm">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          System Endpoint Not Found
        </h2>
        <p className="text-[#8888A8] max-w-md mx-auto mb-10 text-lg">
          The requested URL doesn&apos;t exist in this sector. It may have been moved, deleted, or you might have a typo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="bg-[#4F6EF7] hover:bg-[#3A58E0] text-white rounded-full px-8 h-12 shadow-[0_0_20px_rgba(79,110,247,0.4)] hover:shadow-[0_0_30px_rgba(79,110,247,0.6)] transition-all border-0">
            <Link href="/">
              <Home className="mr-2 w-4 h-4" /> Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-white/5 hover:bg-white/10 border-white/10 text-white rounded-full px-8 h-12 backdrop-blur-sm">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 w-4 h-4" /> Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}