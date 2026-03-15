"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { fetchAndProcessWebsites, type ProcessedWebsite } from "../actions/website";

export function useWebsite() {
  const { getToken, isSignedIn } = useAuth();
  const [websites, setWebsites] = useState<ProcessedWebsite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const refreshWebsites = useCallback(async (silent = false) => {
    if (!silent) {
      setIsLoading(true);
      setError(null);
      setAuthError(null);
    }
    
    try {
      const token = await getToken();
      if (!token) {
        setAuthError("Authentication required to access monitoring features");
        setWebsites([]);
        return;
      }
      
      // Call the server action instead of doing processing locally
      const processedData = await fetchAndProcessWebsites(token);
      setWebsites(processedData);
    } catch (err: unknown) {
      console.error("Error fetching websites:", err);
      
      const errorObject = err as { message?: string };
      if (errorObject.message?.includes("Authentication")) {
        setAuthError("Authentication failed. Please sign in again.");
      } else {
        setError("Failed to fetch website data. Please try again.");
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      }
    }
  }, [getToken]);

  useEffect(() => {
    refreshWebsites(false);
    
    if (isSignedIn) {
      const interval = setInterval(() => {
        refreshWebsites(true);
      }, 60000); // 1 minute interval
      
      return () => clearInterval(interval);
    }
  }, [refreshWebsites, isSignedIn]);

  return {
    websites,
    isLoading,
    error,
    authError,
    isAuthenticated: !!isSignedIn,
    refreshWebsites
  };
}