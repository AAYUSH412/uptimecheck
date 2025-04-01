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
import { Website } from "./mockData";

interface WebsiteDetailProps {
  website: Website;
  onBack: () => void;
}

// Function to get status styling
const getStatusStyles = (status: string) => {
  switch (status) {
    case "up":
      return "bg-green-500/10 text-green-500";
    case "down":
      return "bg-red-500/10 text-red-500";
    default:
      return "bg-gray-500/10 text-gray-500";
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

export function WebsiteDetail({ website, onBack }: WebsiteDetailProps) {
  return (
    <div className="space-y-6">
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{website.name}</h1>
        <div
          className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(website.status)}`}
        >
          <StatusIndicator status={website.status} />
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">URL</CardTitle>
              <Globe className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-wrap">{website.url}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-500 to-green-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uptime</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{website.uptime}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{website.responseTime}</div>
              <p className="text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Last Checked
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{website.lastChecked}</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Uptime History</CardTitle>
            <CardDescription>
              Last 30 minutes of monitoring data for {website.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="graph">Graph</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline" className="space-y-0">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Up</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500" />
                      <span className="text-sm">Unknown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">Down</span>
                    </div>
                  </div>

                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-3.5 top-0 h-full w-0.5 bg-border" />

                    {/* Timeline events */}
                    <div className="space-y-6">
                      {website.uptimeHistory.length > 0 ? (
                        website.uptimeHistory.map((event, index) => {
                          // Get the right color based on status
                          let statusColor = "";
                          let StatusIcon = CheckCircle;
                          let statusText = "";

                          switch (event.status) {
                            case "up":
                              statusColor = "border-green-500 bg-green-500";
                              StatusIcon = CheckCircle;
                              statusText = "Website is up";
                              break;
                            case "down":
                              statusColor = "border-red-500 bg-red-500";
                              StatusIcon = XCircle;
                              statusText = "Website is down";
                              break;
                            default:
                              statusColor = "border-gray-500 bg-gray-500";
                              StatusIcon = HelpCircle;
                              statusText = "Status unknown";
                              break;
                          }

                          return (
                            <motion.div
                              key={index}
                              className="flex gap-4"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                            >
                              <div
                                className={`relative mt-1 h-7 w-7 rounded-full border-2 ${statusColor}`}
                              >
                                <StatusIcon
                                  className={`absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 ${
                                    event.status === "up"
                                      ? "bg-green-500/20"
                                      : event.status === "down"
                                      ? "bg-red-500/20"
                                      : "bg-gray-500/20"
                                  }`}
                                />
                              </div>
                              <div>
                                <p className="font-medium">{statusText}</p>
                                <p className="text-sm text-muted-foreground">
                                  {event.timestamp}
                                </p>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="flex justify-center py-8">
                          <p className="text-sm text-muted-foreground">
                            No uptime data available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="graph">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm">Up</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-500" />
                      <span className="text-sm">Unknown</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-sm">Down</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-10 gap-2">
                      {website.uptimeHistory.map((event, index) => {
                        // Get the right color based on status
                        let statusColor = "";

                        switch (event.status) {
                          case "up":
                            statusColor =
                              "bg-green-500/20 border border-green-500";
                            break;
                          case "down":
                            statusColor = "bg-red-500/20 border border-red-500";
                            break;
                          default:
                            statusColor =
                              "bg-gray-500/20 border border-gray-500";
                            break;
                        }

                        return (
                          <motion.div
                            key={index}
                            className={`h-16 rounded-md ${statusColor}`}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <div
                              className={`h-full w-full rounded-md ${
                                event.status === "up"
                                  ? "bg-green-500/20"
                                  : event.status === "down"
                                  ? "bg-red-500/20"
                                  : "bg-gray-500/20"
                              }`}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-10 gap-2 text-xs text-muted-foreground">
                      {website.uptimeHistory.map((event, index) => (
                        <div key={index} className="text-center">
                          {event.timestamp.replace(" min ago", "m")}
                        </div>
                      ))}
                    </div>
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
