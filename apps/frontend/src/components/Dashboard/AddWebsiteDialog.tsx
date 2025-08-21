"use client";

import { useState, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus, Globe, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Website } from "./mockData";
import axios from "axios";
import { BACKEND_URL } from "../../../config";
import { motion } from "framer-motion";

interface AddWebsiteDialogProps {
  onWebsiteAdded: (website: Website) => void;
}

export function AddWebsiteDialog({ onWebsiteAdded }: AddWebsiteDialogProps) {
  const { getToken } = useAuth();
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    if (!websiteName.trim()) {
      setError("Website name is required");
      return;
    }

    if (!websiteUrl.trim()) {
      setError("Website URL is required");
      return;
    }

    // URL validation (basic)
    if (!websiteUrl.includes(".")) {
      setError("Please enter a valid URL");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/website`,
        { url: websiteUrl },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      // Call the callback with the new website
      onWebsiteAdded({
        id: typeof data.id === 'string' ? parseInt(data.id, 10) || 0 : data.id,
        name: websiteName || websiteUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
        url: websiteUrl,
        status: "unknown",
        uptime: "0%",
        responseTime: "0ms",
        lastChecked: "Just now",
        uptimeHistory: []
      });

      // Reset form
      setWebsiteName("");
      setWebsiteUrl("");
      
      // Close the dialog by setting the open state to false
      setOpen(false);
    } catch (err) {
      console.error("Error adding website:", err);
      setError("Failed to add website. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105">
          <Plus className="h-4 w-4 mr-2" />
          Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b">
            <DialogHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold">Add New Website</DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    Start monitoring a new website for uptime and performance
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-name" className="text-sm font-medium">
                  Website Name
                </Label>
                <Input
                  id="website-name"
                  placeholder="e.g., My Portfolio Website"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                />
                <p className="text-xs text-muted-foreground">
                  A friendly name to identify this website
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website-url" className="text-sm font-medium">
                  Website URL
                </Label>
                <Input
                  id="website-url"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
                />
                <p className="text-xs text-muted-foreground">
                  The complete URL including http:// or https://
                </p>
              </div>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </motion.div>
            )}
          </div>
          
          <DialogFooter className="p-6 pt-0 flex space-x-2">
            <DialogClose asChild ref={closeButtonRef}>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Website</span>
                </div>
              )}
            </Button>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}