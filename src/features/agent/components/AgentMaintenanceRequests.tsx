import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle,
  Phone,
  MessageSquare,
  Building2,
  User,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface MaintenanceRequest {
  id: string;
  property: {
    id: string;
    building: string;
    unit: string;
    area: string;
  };
  tenant: {
    name: string;
    phone: string;
    email: string;
  };
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  category: "plumbing" | "electrical" | "hvac" | "appliance" | "structural" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  title: string;
  description: string;
  status: "new" | "in_progress" | "pending_approval" | "completed";
  createdAt: string;
  updatedAt: string;
  images?: string[];
  notes?: string;
}

// Dummy maintenance requests
const dummyRequests: MaintenanceRequest[] = [
  {
    id: "maint-001",
    property: {
      id: "prop-001",
      building: "Marina Heights",
      unit: "1204",
      area: "Dubai Marina",
    },
    tenant: {
      name: "John Smith",
      phone: "+971 50 111 2222",
      email: "john@email.com",
    },
    owner: {
      name: "Mohammed Al Maktoum",
      phone: "+971 50 333 4444",
      email: "mohammed@email.com",
    },
    category: "plumbing",
    priority: "high",
    title: "Kitchen sink leaking",
    description: "Water is leaking from under the kitchen sink. The cabinet underneath is getting damaged.",
    status: "new",
    createdAt: "2025-01-14T09:00:00",
    updatedAt: "2025-01-14T09:00:00",
  },
  {
    id: "maint-002",
    property: {
      id: "prop-002",
      building: "Boulevard Point",
      unit: "3502",
      area: "Downtown Dubai",
    },
    tenant: {
      name: "Sarah Johnson",
      phone: "+971 55 222 3333",
      email: "sarah@email.com",
    },
    owner: {
      name: "Ahmed Al Rashid",
      phone: "+971 50 444 5555",
      email: "ahmed.owner@email.com",
    },
    category: "hvac",
    priority: "medium",
    title: "AC not cooling properly",
    description: "The living room AC unit is running but not cooling the room effectively.",
    status: "in_progress",
    createdAt: "2025-01-12T14:30:00",
    updatedAt: "2025-01-13T10:00:00",
    notes: "Technician scheduled for Jan 15",
  },
  {
    id: "maint-003",
    property: {
      id: "prop-001",
      building: "Marina Heights",
      unit: "1204",
      area: "Dubai Marina",
    },
    tenant: {
      name: "John Smith",
      phone: "+971 50 111 2222",
      email: "john@email.com",
    },
    owner: {
      name: "Mohammed Al Maktoum",
      phone: "+971 50 333 4444",
      email: "mohammed@email.com",
    },
    category: "appliance",
    priority: "low",
    title: "Dishwasher making noise",
    description: "The dishwasher makes a grinding noise during the wash cycle.",
    status: "pending_approval",
    createdAt: "2025-01-10T16:00:00",
    updatedAt: "2025-01-11T09:00:00",
    notes: "Quoted AED 350 for repair. Awaiting owner approval.",
  },
  {
    id: "maint-004",
    property: {
      id: "prop-003",
      building: "Palm Views",
      unit: "801",
      area: "Palm Jumeirah",
    },
    tenant: {
      name: "Emily Chen",
      phone: "+971 50 555 6666",
      email: "emily@email.com",
    },
    owner: {
      name: "Fatima Al Zahra",
      phone: "+971 50 777 8888",
      email: "fatima@email.com",
    },
    category: "electrical",
    priority: "urgent",
    title: "Power outlet sparking",
    description: "The power outlet in the bedroom is sparking when plugging in devices. Potential fire hazard.",
    status: "in_progress",
    createdAt: "2025-01-14T08:00:00",
    updatedAt: "2025-01-14T08:30:00",
    notes: "Emergency electrician dispatched",
  },
  {
    id: "maint-005",
    property: {
      id: "prop-002",
      building: "Boulevard Point",
      unit: "3502",
      area: "Downtown Dubai",
    },
    tenant: {
      name: "Sarah Johnson",
      phone: "+971 55 222 3333",
      email: "sarah@email.com",
    },
    owner: {
      name: "Ahmed Al Rashid",
      phone: "+971 50 444 5555",
      email: "ahmed.owner@email.com",
    },
    category: "plumbing",
    priority: "medium",
    title: "Bathroom faucet dripping",
    description: "The master bathroom faucet has a constant drip.",
    status: "completed",
    createdAt: "2025-01-05T11:00:00",
    updatedAt: "2025-01-08T15:00:00",
    notes: "Replaced washer. Issue resolved.",
  },
];

const priorityConfig = {
  low: { color: "bg-muted text-muted-foreground", label: "Low" },
  medium: { color: "bg-warning/10 text-warning border-warning/20", label: "Medium" },
  high: { color: "bg-orange-500/10 text-orange-500 border-orange-500/20", label: "High" },
  urgent: { color: "bg-destructive/10 text-destructive border-destructive/20", label: "Urgent" },
};

const statusConfig = {
  new: { color: "bg-accent/10 text-accent", label: "New", icon: Clock },
  in_progress: { color: "bg-warning/10 text-warning", label: "In Progress", icon: Wrench },
  pending_approval: { color: "bg-orange-500/10 text-orange-500", label: "Pending Approval", icon: AlertTriangle },
  completed: { color: "bg-success/10 text-success", label: "Completed", icon: CheckCircle },
};

const categoryLabels: Record<string, string> = {
  plumbing: "Plumbing",
  electrical: "Electrical",
  hvac: "HVAC",
  appliance: "Appliance",
  structural: "Structural",
  other: "Other",
};

export const AgentMaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(dummyRequests);
  const [filter, setFilter] = useState<"all" | "new" | "in_progress" | "pending_approval" | "completed">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.status === filter);

  const handleUpdateStatus = (id: string, newStatus: MaintenanceRequest["status"]) => {
    setRequests(requests.map(r => 
      r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r
    ));
    toast.success(`Status updated to ${statusConfig[newStatus].label}`);
  };

  const handleContactTenant = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsAppTenant = (phone: string, requestTitle: string) => {
    const message = `Hi, regarding your maintenance request: "${requestTitle}" - `;
    window.open(`https://wa.me/${phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleContactOwner = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const stats = {
    new: requests.filter(r => r.status === "new").length,
    inProgress: requests.filter(r => r.status === "in_progress").length,
    pendingApproval: requests.filter(r => r.status === "pending_approval").length,
    completed: requests.filter(r => r.status === "completed").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Maintenance Requests</h1>
        <p className="text-muted-foreground">
          Manage maintenance requests from tenants
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{stats.new}</p>
              <p className="text-xs text-muted-foreground">New</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{stats.inProgress}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{stats.pendingApproval}</p>
              <p className="text-xs text-muted-foreground">Pending Approval</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-display font-semibold">{stats.completed}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
        <TabsList>
          <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
          <TabsTrigger value="new">New ({stats.new})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({stats.inProgress})</TabsTrigger>
          <TabsTrigger value="pending_approval">Pending ({stats.pendingApproval})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Request Cards */}
      <div className="space-y-4">
        {filteredRequests.map((request) => {
          const StatusIcon = statusConfig[request.status].icon;
          const isExpanded = expandedId === request.id;

          return (
            <div
              key={request.id}
              className="bg-card border border-border/50 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : request.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${statusConfig[request.status].color}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">{request.title}</h3>
                        <Badge variant="outline" className={priorityConfig[request.priority].color}>
                          {priorityConfig[request.priority].label}
                        </Badge>
                        <Badge variant="secondary">{categoryLabels[request.category]}</Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {request.property.building} - {request.property.unit}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {request.tenant.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusConfig[request.status].color}>
                      {statusConfig[request.status].label}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-border/50 p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                    <p className="text-sm">{request.description}</p>
                  </div>

                  {request.notes && (
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                      <p className="text-sm">{request.notes}</p>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Tenant</h4>
                      <p className="font-medium">{request.tenant.name}</p>
                      <p className="text-sm text-muted-foreground">{request.tenant.phone}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactTenant(request.tenant.phone)}
                        >
                          <Phone className="w-4 h-4 mr-1" /> Call
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsAppTenant(request.tenant.phone, request.title)}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" /> WhatsApp
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Owner</h4>
                      <p className="font-medium">{request.owner.name}</p>
                      <p className="text-sm text-muted-foreground">{request.owner.phone}</p>
                      <div className="flex gap-2 mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContactOwner(request.owner.phone)}
                        >
                          <Phone className="w-4 h-4 mr-1" /> Call
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Update Status:</span>
                      <Select 
                        value={request.status} 
                        onValueChange={(v) => handleUpdateStatus(request.id, v as MaintenanceRequest["status"])}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="pending_approval">Pending Approval</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date(request.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
            <Wrench className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium mb-1">No maintenance requests</h3>
            <p className="text-sm text-muted-foreground">
              {filter === "all" 
                ? "No maintenance requests have been submitted yet."
                : `No ${filter.replace("_", " ")} requests.`
              }
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
