import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  Building2,
  
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data for agents managing owner's properties
const assignedAgents = [
  {
    id: "agent-001",
    name: "Ahmed Al Rashid",
    email: "ahmed@dar360.ae",
    phone: "+971 50 123 4567",
    photo: null,
    company: "Dar360 Real Estate",
    rating: 4.8,
    totalReviews: 127,
    properties: [
      { id: "prop-001", title: "Marina Heights - 1204", status: "available" },
    ],
    stats: {
      viewingsThisMonth: 8,
      viewingsLastMonth: 5,
      inquiriesThisMonth: 12,
      inquiriesLastMonth: 8,
      conversionRate: 25,
      leadsGenerated: 15,
    },
    recentActivity: [
      { type: "viewing", date: "2025-01-12", description: "Conducted viewing with John S." },
      { type: "inquiry", date: "2025-01-11", description: "Responded to WhatsApp inquiry" },
      { type: "listing", date: "2025-01-10", description: "Updated property photos" },
    ],
  },
  {
    id: "agent-002",
    name: "Sara Mohammed",
    email: "sara@dar360.ae",
    phone: "+971 55 987 6543",
    photo: null,
    company: "Dar360 Real Estate",
    rating: 4.6,
    totalReviews: 89,
    properties: [
      { id: "prop-002", title: "Boulevard Point - 3502", status: "reserved" },
    ],
    stats: {
      viewingsThisMonth: 12,
      viewingsLastMonth: 10,
      inquiriesThisMonth: 18,
      inquiriesLastMonth: 15,
      conversionRate: 33,
      leadsGenerated: 22,
    },
    recentActivity: [
      { type: "contract", date: "2025-01-11", description: "Sent contract to Lisa Anderson" },
      { type: "viewing", date: "2025-01-10", description: "Conducted viewing with Michael B." },
      { type: "inquiry", date: "2025-01-09", description: "Handled 3 new inquiries" },
    ],
  },
];

const activityLog = [
  { id: 1, agentName: "Ahmed Al Rashid", property: "Marina Heights - 1204", action: "Conducted viewing", tenant: "John S.", date: "2025-01-12", time: "10:00 AM", outcome: "interested" },
  { id: 2, agentName: "Sara Mohammed", property: "Boulevard Point - 3502", action: "Sent contract", tenant: "Lisa Anderson", date: "2025-01-11", time: "3:30 PM", outcome: "pending" },
  { id: 3, agentName: "Ahmed Al Rashid", property: "Marina Heights - 1204", action: "Responded to inquiry", tenant: "Emily C.", date: "2025-01-11", time: "2:15 PM", outcome: "replied" },
  { id: 4, agentName: "Sara Mohammed", property: "Boulevard Point - 3502", action: "Conducted viewing", tenant: "Michael B.", date: "2025-01-10", time: "11:00 AM", outcome: "interested" },
  { id: 5, agentName: "Ahmed Al Rashid", property: "Marina Heights - 1204", action: "Updated listing", tenant: "-", date: "2025-01-10", time: "9:00 AM", outcome: "completed" },
];

const outcomeStyles: Record<string, string> = {
  interested: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  replied: "bg-accent/10 text-accent border-accent/20",
  completed: "bg-muted text-muted-foreground border-muted",
  not_interested: "bg-destructive/10 text-destructive border-destructive/20",
};

export const AgentPerformance = () => {
  const getTrendIcon = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-success" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-destructive" />;
    }
    return null;
  };

  const getTrendText = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    if (change > 0) {
      return <span className="text-success text-xs">+{change.toFixed(0)}%</span>;
    } else if (change < 0) {
      return <span className="text-destructive text-xs">{change.toFixed(0)}%</span>;
    }
    return <span className="text-muted-foreground text-xs">0%</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Agent Performance</h1>
        <p className="text-muted-foreground">
          Track how your agents are managing your properties
        </p>
      </div>

      {/* Agent Cards */}
      <div className="grid gap-6">
        {assignedAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-card border border-border/50 rounded-xl overflow-hidden"
          >
            {/* Agent Header */}
            <div className="p-5 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-accent">
                      {agent.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.company}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{agent.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({agent.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-1.5" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1.5" />
                    Email
                  </Button>
                </div>
              </div>
            </div>

            {/* Properties Managed */}
            <div className="px-5 py-3 bg-muted/30 border-b border-border/50">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Managing:</span>
                {agent.properties.map((prop) => (
                  <Badge key={prop.id} variant="secondary" className="font-normal">
                    {prop.title}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Performance Stats */}
            <div className="p-5">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Performance This Month
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <Eye className="w-4 h-4 text-accent" />
                    <div className="flex items-center gap-1">
                      {getTrendIcon(agent.stats.viewingsThisMonth, agent.stats.viewingsLastMonth)}
                      {getTrendText(agent.stats.viewingsThisMonth, agent.stats.viewingsLastMonth)}
                    </div>
                  </div>
                  <p className="text-2xl font-display font-semibold">{agent.stats.viewingsThisMonth}</p>
                  <p className="text-xs text-muted-foreground">Viewings Conducted</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    <div className="flex items-center gap-1">
                      {getTrendIcon(agent.stats.inquiriesThisMonth, agent.stats.inquiriesLastMonth)}
                      {getTrendText(agent.stats.inquiriesThisMonth, agent.stats.inquiriesLastMonth)}
                    </div>
                  </div>
                  <p className="text-2xl font-display font-semibold">{agent.stats.inquiriesThisMonth}</p>
                  <p className="text-xs text-muted-foreground">Inquiries Handled</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-2xl font-display font-semibold">{agent.stats.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mt-5">
                <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Recent Activity
                </h4>
                <div className="space-y-2">
                  {agent.recentActivity.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-sm py-2 border-b border-border/30 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        {activity.type === "viewing" && <Eye className="w-4 h-4 text-accent" />}
                        {activity.type === "inquiry" && <MessageSquare className="w-4 h-4 text-accent" />}
                        {activity.type === "listing" && <Building2 className="w-4 h-4 text-accent" />}
                        {activity.type === "contract" && <CheckCircle className="w-4 h-4 text-success" />}
                      </div>
                      <div className="flex-1">
                        <p>{activity.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Activity Log Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h3 className="font-display font-semibold">Activity Log</h3>
          <p className="text-sm text-muted-foreground">All agent actions on your properties</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activityLog.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.date}</p>
                      <p className="text-xs text-muted-foreground">{log.time}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.agentName}</TableCell>
                  <TableCell>{log.property}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.tenant}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={outcomeStyles[log.outcome] || outcomeStyles.completed}
                    >
                      {log.outcome.replace("_", " ")}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};
