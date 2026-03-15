"use client";

import { motion } from "framer-motion";
import { User, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, useClerk } from "@clerk/nextjs";

export default function SettingsPage() {
  const { isLoaded, user } = useUser();
  const { openUserProfile } = useClerk();

  return (
    <div className="flex-1 space-y-6 lg:p-4 max-w-5xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
        <p className="text-muted-foreground mt-1 text-[#8888A8]">
          Manage your account settings.
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
        <Card className="border border-white/10 bg-[#111118]/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-[#4F6EF7]" />
              Profile Settings
            </CardTitle>
            <CardDescription className="text-[#8888A8]">
              Your personal details are securely managed by Clerk Authentication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isLoaded ? (
               <div className="animate-pulse flex flex-col gap-4">
                  <div className="h-10 bg-white/5 rounded w-full max-w-md"></div>
                  <div className="h-10 bg-white/5 rounded w-full max-w-md"></div>
               </div>
            ) : (
              <>
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input 
                    id="name" 
                    value={user?.fullName || "No Name"} 
                    disabled 
                    className="bg-white/5 border-white/10 text-white opacity-70 cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <Input 
                    id="email" 
                    value={user?.primaryEmailAddress?.emailAddress || "No Email"} 
                    disabled 
                    className="bg-white/5 border-white/10 text-white opacity-70 cursor-not-allowed" 
                  />
                </div>
                <Button 
                  onClick={() => openUserProfile()}
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/10"
                >
                  Manage Account in Clerk
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border border-red-500/20 bg-[#111118]/80 backdrop-blur-xl mt-6">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-[#8888A8]">
              Irreversible actions for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-500/10 bg-red-500/5 rounded-lg">
              <div>
                <h4 className="font-medium text-white">Delete Account</h4>
                <p className="text-sm text-[#8888A8]">Permanently delete your account and all data.</p>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => openUserProfile()}
                className="shrink-0 bg-red-500 hover:bg-red-600 text-white border-0"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
