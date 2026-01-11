import { useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  Camera,
  Calendar,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MaintenanceRequest {
  id: string;
  category: "plumbing" | "electrical" | "hvac" | "appliances" | "general";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  resolvedAt?: string;
  images: string[];
  updates: { date: string; message: string }[];
}

const dummyRequests: MaintenanceRequest[] = [
  {
    id: "mnt-001",
    category: "plumbing",
    title: "Bathroom sink leaking",
    description:
      "The sink in the master bathroom has been dripping continuously.",
    priority: "medium",
    status: "in_progress",
    createdAt: "2024-12-20",
    images: [],
    updates: [
      {
        date: "2024-12-21",
        message: "Technician scheduled for Dec 23, 10 AM - 12 PM",
      },
    ],
  },
  {
    id: "mnt-002",
    category: "electrical",
    title: "Light switch not working",
    description: "The light switch in the living room stopped working.",
    priority: "low",
    status: "completed",
    createdAt: "2024-12-10",
    resolvedAt: "2024-12-12",
    images: [],
    updates: [
      { date: "2024-12-11", message: "Electrician visited and fixed the switch" },
      { date: "2024-12-12", message: "Issue resolved. Marked as completed." },
    ],
  },
];

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  in_progress: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const statusIcons = {
  pending: Clock,
  in_progress: Wrench,
  completed: CheckCircle,
};

const categoryIcons = {
  plumbing: "🔧",
  electrical: "⚡",
  hvac: "❄️",
  appliances: "🔌",
  general: "🏠",
};

export const MaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(dummyRequests);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(
    null
  );
  const [formData, setFormData] = useState({
    category: "general",
    title: "",
    description: "",
    priority: "medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: MaintenanceRequest = {
      id: `mnt-${Date.now()}`,
      category: formData.category as MaintenanceRequest["category"],
      title: formData.title,
      description: formData.description,
      priority: formData.priority as MaintenanceRequest["priority"],
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      images: [],
      updates: [],
    };

    setRequests([newRequest, ...requests]);
    toast.success("Maintenance request submitted!");
    setShowNewRequest(false);
    setFormData({
      category: "general",
      title: "",
      description: "",
      priority: "medium",
    });
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const inProgressCount = requests.filter((r) => r.status === "in_progress").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Maintenance</h1>
          <p className="text-muted-foreground">
            Submit and track maintenance requests
          </p>
        </div>
        <Button variant="gold" onClick={() => setShowNewRequest(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
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
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="font-display text-xl font-semibold">
                {requests.filter((r) => r.status === "completed").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => {
          const StatusIcon = statusIcons[request.status];

          return (
            <div
              key={request.id}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all cursor-pointer"
              onClick={() => setSelectedRequest(request)}
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
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {request.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {request.updates.length > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {request.updates.length} update(s)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {requests.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No maintenance requests yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setShowNewRequest(true)}
            >
              Submit a Request
            </Button>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              New Maintenance Request
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">🔧 Plumbing</SelectItem>
                  <SelectItem value="electrical">⚡ Electrical</SelectItem>
                  <SelectItem value="hvac">❄️ HVAC / AC</SelectItem>
                  <SelectItem value="appliances">🔌 Appliances</SelectItem>
                  <SelectItem value="general">🏠 General</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Details *</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about the issue..."
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData({ ...formData, priority: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Can wait</SelectItem>
                  <SelectItem value="medium">Medium - Soon</SelectItem>
                  <SelectItem value="high">High - Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Photos (Optional)</Label>
              <Button type="button" variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Add Photos
              </Button>
              <p className="text-xs text-muted-foreground">
                Photos help maintenance staff understand the issue better
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewRequest(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal */}
      <Dialog
        open={!!selectedRequest}
        onOpenChange={() => setSelectedRequest(null)}
      >
        <DialogContent className="max-w-md">
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-xl flex items-center gap-2">
                  <span className="text-2xl">
                    {categoryIcons[selectedRequest.category]}
                  </span>
                  {selectedRequest.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={cn(statusStyles[selectedRequest.status])}
                  >
                    {selectedRequest.status.replace("_", " ").charAt(0).toUpperCase() +
                      selectedRequest.status.replace("_", " ").slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Submitted{" "}
                    {new Date(selectedRequest.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Description
                  </p>
                  <p className="text-sm">{selectedRequest.description}</p>
                </div>

                {selectedRequest.updates.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Updates
                    </p>
                    <div className="space-y-2">
                      {selectedRequest.updates.map((update, index) => (
                        <div
                          key={index}
                          className="p-3 bg-muted/50 rounded-lg text-sm"
                        >
                          <p className="text-muted-foreground text-xs mb-1">
                            {new Date(update.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p>{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRequest.status === "completed" &&
                  selectedRequest.resolvedAt && (
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-sm text-emerald-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Resolved on{" "}
                        {new Date(selectedRequest.resolvedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
