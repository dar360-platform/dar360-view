import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building2,
  Calendar,
  User,
  Image,
  MessageSquare,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface MaintenanceRequest {
  id: string;
  propertyTitle: string;
  tenantName: string;
  category: "plumbing" | "electrical" | "hvac" | "appliances" | "general";
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  resolvedAt?: string;
  cost?: number;
  images?: string[];
}

const dummyRequests: MaintenanceRequest[] = [
  {
    id: "mnt-001",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    category: "plumbing",
    title: "Bathroom sink leaking",
    description:
      "The sink in the master bathroom has been dripping continuously. Tried tightening but still leaking.",
    priority: "medium",
    status: "in_progress",
    createdAt: "2024-12-20",
    images: ["leak1.jpg"],
  },
  {
    id: "mnt-002",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    category: "hvac",
    title: "AC not cooling properly",
    description:
      "The bedroom AC is running but not cooling the room. Makes a strange noise.",
    priority: "high",
    status: "pending",
    createdAt: "2024-12-22",
  },
  {
    id: "mnt-003",
    propertyTitle: "Boulevard Point - 3502",
    tenantName: "Lisa Anderson",
    category: "electrical",
    title: "Light fixture replacement",
    description: "Kitchen light fixture needs replacement - old one stopped working.",
    priority: "low",
    status: "completed",
    createdAt: "2024-12-10",
    resolvedAt: "2024-12-15",
    cost: 350,
  },
  {
    id: "mnt-004",
    propertyTitle: "Boulevard Point - 3502",
    tenantName: "Lisa Anderson",
    category: "appliances",
    title: "Dishwasher not draining",
    description: "Dishwasher fills with water but doesn't drain after cycle.",
    priority: "medium",
    status: "pending",
    createdAt: "2024-12-21",
    images: ["dishwasher1.jpg", "dishwasher2.jpg"],
  },
];

const priorityStyles = {
  low: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  medium: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  high: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  urgent: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  in_progress: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  cancelled: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const statusIcons = {
  pending: Clock,
  in_progress: Wrench,
  completed: CheckCircle,
  cancelled: AlertTriangle,
};

const categoryIcons = {
  plumbing: "🔧",
  electrical: "⚡",
  hvac: "❄️",
  appliances: "🔌",
  general: "🏠",
};

export const MaintenanceView = () => {
  const [requests] = useState<MaintenanceRequest[]>(dummyRequests);
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");

  const properties = [...new Set(requests.map((r) => r.propertyTitle))];

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    const matchesProperty =
      propertyFilter === "all" || req.propertyTitle === propertyFilter;
    return matchesStatus && matchesProperty;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const inProgressCount = requests.filter((r) => r.status === "in_progress").length;
  const completedCount = requests.filter((r) => r.status === "completed").length;
  const totalCost = requests
    .filter((r) => r.cost)
    .reduce((sum, r) => sum + (r.cost || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Maintenance</h1>
        <p className="text-muted-foreground">
          Track maintenance requests across your properties
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="font-display text-xl font-semibold">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Wrench className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In Progress</p>
              <p className="font-display text-xl font-semibold">{inProgressCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="font-display text-xl font-semibold">{completedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Building2 className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="font-display text-xl font-semibold">
                AED {totalCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={propertyFilter} onValueChange={setPropertyFilter}>
          <SelectTrigger className="w-52">
            <Building2 className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            {properties.map((prop) => (
              <SelectItem key={prop} value={prop}>
                {prop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = statusIcons[request.status];

          return (
            <div
              key={request.id}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{categoryIcons[request.category]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-display font-semibold">{request.title}</h3>
                    <Badge
                      variant="outline"
                      className={cn(statusStyles[request.status])}
                    >
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {request.status.replace("_", " ").charAt(0).toUpperCase() +
                        request.status.replace("_", " ").slice(1)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(priorityStyles[request.priority])}
                    >
                      {request.priority.charAt(0).toUpperCase() +
                        request.priority.slice(1)}{" "}
                      Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {request.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {request.propertyTitle}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {request.tenantName}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {request.images && request.images.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        {request.images.length} photo(s)
                      </span>
                    )}
                  </div>
                  {request.status === "completed" && request.cost && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Cost:</span>{" "}
                        <span className="font-medium">
                          AED {request.cost.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground ml-3">
                          Resolved:{" "}
                          {request.resolvedAt &&
                            new Date(request.resolvedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No maintenance requests found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
