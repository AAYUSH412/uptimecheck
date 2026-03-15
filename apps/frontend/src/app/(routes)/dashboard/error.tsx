"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex h-[80vh] w-full items-center justify-center p-6">
      <Card className="max-w-md w-full border-red-500/20 bg-red-500/5">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-500/10 p-2 text-red-500">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Something went wrong!</CardTitle>
              <CardDescription className="mt-1">
                We encountered an error loading your dashboard.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="rounded-md bg-background/50 p-4 font-mono text-sm text-muted-foreground break-all">
            {error.message || "An unexpected error occurred and has been logged."}
          </div>
          <Button onClick={reset} className="w-full gap-2" variant="outline">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
