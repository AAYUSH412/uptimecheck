import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  Globe,
  XCircle,
  HelpCircle,
  Trash2,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Website } from "./mockData";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL


interface WebsiteDetailProps {
  website: Website;
  onBack: () => void;
  onDelete?: (websiteId: string | number) => void;
}

// Function to get status styling
const getStatusStyles = (status: string) => {
  switch (status) {
    case "up":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800";
    case "down":
      return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/30 dark:text-gray-400 dark:border-gray-800";
  }
};

// Function to get status icon and text
const StatusIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "up":
      return (
        <>
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Operational</span>
        </>
      );
    case "down":
      return (
        <>
          <XCircle className="h-3.5 w-3.5" />
          <span>Down</span>
        </>
      );
    default:
      return (
        <>
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Unknown</span>
        </>
      );
  }
};

export function WebsiteDetail({ website, onBack, onDelete }: WebsiteDetailProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const token = await getToken();
      await axios.delete(`${BACKEND_URL}/api/v1/website?websiteid=${website.id}`, {
        headers: {
          Authorization: token,
        },
      });

      // Close dialog and notify parent component
      setIsDeleteDialogOpen(false);
      if (onDelete) {
        onDelete(website.id);
      }
      onBack();
    } catch (err) {
      console.error("Error deleting website:", err);
      setDeleteError("Failed to delete website. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0 hover:scale-105 transition-transform duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {website.name}
              </h1>
              <Badge
                variant={website.status === "up" ? "default" : "destructive"}
                className={`px-3 py-1 border ${getStatusStyles(website.status)}`}
              >
                <div className="flex items-center space-x-1.5">
                  <StatusIndicator status={website.status} />
                </div>
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span className="text-sm">{website.url}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-primary/10"
                onClick={() => window.open(website.url, '_blank')}
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsDeleteDialogOpen(true)}
          className="hover:scale-105 transition-transform duration-200"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Website
        </Button>
      </motion.div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this website?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{website.name}</strong> from
              your monitoring dashboard. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              {deleteError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive"
            >
              {isDeleting ? "Deleting..." : "Delete Website"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Website URL</CardTitle>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                    {website.url}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Primary endpoint
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 hover:bg-blue-500/20"
                  onClick={() => window.open(website.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Uptime</CardTitle>
              <div className="p-2 bg-green-500/20 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">{website.uptime}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Response Time</CardTitle>
              <div className="p-2 bg-amber-500/20 rounded-full">
                <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-100">{website.responseTime}</div>
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                Average latency
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-purple-600/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Last Checked</CardTitle>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-lg font-bold text-purple-900 dark:text-purple-100">{website.lastChecked}</div>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                Latest monitoring check
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Uptime History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Uptime History</span>
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Real-time monitoring data and historical performance for {website.name}
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                Last 30 minutes
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="timeline" className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="graph" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Graph</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="space-y-0">
                <div className="space-y-6">
                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-8 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                      <span className="text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                      <span className="text-sm font-medium">Down</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500" />
                      <span className="text-sm font-medium">Unknown</span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Timeline events */}
                    <div className="space-y-4">
                      {website.uptimeHistory.length > 0 ? (
                        website.uptimeHistory.map((event, index) => {
                          let statusColor = "";
                          let StatusIcon = CheckCircle;
                          let statusText = "";
                          let bgColor = "";

                          switch (event.status) {
                            case "up":
                              statusColor = "border-green-500 bg-green-500 shadow-green-500/50";
                              bgColor = "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800";
                              StatusIcon = CheckCircle;
                              statusText = "Website is operational";
                              break;
                            case "down":
                              statusColor = "border-red-500 bg-red-500 shadow-red-500/50";
                              bgColor = "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800";
                              StatusIcon = XCircle;
                              statusText = "Website is down";
                              break;
                            default:
                              statusColor = "border-gray-500 bg-gray-500";
                              bgColor = "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800";
                              StatusIcon = HelpCircle;
                              statusText = "Status unknown";
                              break;
                          }

                          return (
                            <motion.div
                              key={index}
                              className={`relative flex items-center space-x-4 p-4 rounded-lg border ${bgColor}`}
                              initial={{ opacity: 0, x: -20, scale: 0.95 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0, 
                                scale: 1,
                                transition: {
                                  type: "spring" as const,
                                  stiffness: 400,
                                  damping: 25,
                                  delay: index * 0.1
                                }
                              }}
                              whileHover={{ 
                                scale: 1.02,
                                x: 4,
                                transition: {
                                  type: "spring" as const,
                                  stiffness: 400,
                                  damping: 20
                                }
                              }}
                            >
                              <div className={`relative h-8 w-8 rounded-full border-2 shadow-lg ${statusColor}`}>
                                <StatusIcon className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm">{statusText}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {event.timestamp}
                                </p>
                              </div>
                              <Badge 
                                variant={event.status === "up" ? "default" : "destructive"}
                                className="text-xs"
                              >
                                {event.status.toUpperCase()}
                              </Badge>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Shield className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-lg font-medium mb-2">No monitoring data available</p>
                          <p className="text-sm text-muted-foreground text-center max-w-md">
                            Monitoring data will appear here once we start checking your website. This usually takes a few minutes.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="graph">
                <div className="space-y-6">
                  {/* Legend */}
                  <div className="flex items-center justify-center space-x-8 p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                      <span className="text-sm font-medium">Operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                      <span className="text-sm font-medium">Down</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500" />
                      <span className="text-sm font-medium">Unknown</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {website.uptimeHistory.length > 0 ? (
                      <>
                        <div className="grid grid-cols-10 gap-2">
                          {website.uptimeHistory.map((event, index) => {
                            let statusColor = "";

                            switch (event.status) {
                              case "up":
                                statusColor = "bg-green-500 shadow-lg shadow-green-500/50";
                                break;
                              case "down":
                                statusColor = "bg-red-500 shadow-lg shadow-red-500/50";
                                break;
                              default:
                                statusColor = "bg-gray-500";
                                break;
                            }

                            return (
                              <motion.div
                                key={index}
                                className={`h-20 rounded-lg ${statusColor} hover:scale-105 cursor-pointer`}
                                initial={{ opacity: 0, scaleY: 0, y: 20 }}
                                animate={{ 
                                  opacity: 1, 
                                  scaleY: 1, 
                                  y: 0,
                                  transition: {
                                    type: "spring" as const,
                                    stiffness: 400,
                                    damping: 25,
                                    delay: index * 0.05
                                  }
                                }}
                                whileHover={{ 
                                  scale: 1.05,
                                  y: -2,
                                  transition: {
                                    type: "spring" as const,
                                    stiffness: 400,
                                    damping: 20
                                  }
                                }}
                                whileTap={{ scale: 0.95 }}
                                title={`${event.status.toUpperCase()} - ${event.timestamp}`}
                              />
                            );
                          })}
                        </div>
                        <div className="grid grid-cols-10 gap-2 text-xs text-muted-foreground">
                          {website.uptimeHistory.map((event, index) => (
                            <div key={index} className="text-center truncate">
                              {event.timestamp.replace(" min ago", "m")}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium mb-2">No graph data available</p>
                        <p className="text-sm text-muted-foreground text-center max-w-md">
                          The uptime graph will be populated as we collect monitoring data for your website.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
