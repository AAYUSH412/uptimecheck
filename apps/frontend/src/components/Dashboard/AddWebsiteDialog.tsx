"use client";

import { useState, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Website } from "./mockData";
import axios from "axios";
import { BACKEND_URL } from "../../../config";

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

      // Reset form
      setWebsiteName("");
      setWebsiteUrl("");
      
      // Close the dialog by setting the open state to false
      setOpen(false);
      
      // Call the onWebsiteAdded callback with the new website data
      onWebsiteAdded({
        id: data.id,
        name: websiteName || websiteUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0],
        url: websiteUrl,
        status: "unknown",
        uptime: "0%",
        responseTime: "0ms",
        lastChecked: "Just now",
        uptimeHistory: []
      });
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
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Website</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="website-name">Website Name</Label>
            <Input
              id="website-name"
              placeholder="My Website"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="website-url">Website URL</Label>
            <Input
              id="website-url"
              placeholder="example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
          {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Website"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}