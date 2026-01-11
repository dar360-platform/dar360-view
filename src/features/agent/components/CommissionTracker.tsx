import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Building2,
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Commission {
  id: string;
  propertyTitle: string;
  propertyArea: string;
  tenantName: string;
  dealValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: "pending" | "approved" | "paid" | "disputed";
  closedDate: string;
  expectedPayment?: string;
  paidDate?: string;
}

const dummyCommissions: Commission[] = [
  {
    id: "comm-001",
    propertyTitle: "Marina Heights Tower - 1204",
    propertyArea: "Dubai Marina",
    tenantName: "James Wilson",
    dealValue: 65000,
    commissionRate: 5,
    commissionAmount: 3250,
    status: "paid",
    closedDate: "2024-12-01",
    paidDate: "2024-12-15",
  },
  {
    id: "comm-002",
    propertyTitle: "Boulevard Point - 3502",
    propertyArea: "Downtown Dubai",
    tenantName: "Lisa Anderson",
    dealValue: 280000,
    commissionRate: 5,
    commissionAmount: 14000,
    status: "approved",
    closedDate: "2024-12-20",
    expectedPayment: "2025-01-15",
  },
  {
    id: "comm-003",
    propertyTitle: "Palm Jumeirah Villa - V12",
    propertyArea: "Palm Jumeirah",
    tenantName: "Robert Johnson",
    dealValue: 750000,
    commissionRate: 5,
    commissionAmount: 37500,
    status: "pending",
    closedDate: "2024-12-22",
  },
];

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  approved: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  disputed: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  paid: DollarSign,
  disputed: AlertCircle,
};

export const CommissionTracker = () => {
  const [filter, setFilter] = useState<string>("all");
  const [commissions] = useState<Commission[]>(dummyCommissions);

  const filteredCommissions =
    filter === "all"
      ? commissions
      : commissions.filter((c) => c.status === filter);

  const totalEarned = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const totalPending = commissions
    .filter((c) => c.status === "pending" || c.status === "approved")
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const totalDeals = commissions.length;
  const paidDeals = commissions.filter((c) => c.status === "paid").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold">Commissions</h1>
          <p className="text-muted-foreground">
            Track your earnings and pending payments
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="font-display text-xl font-semibold">
                AED {totalEarned.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="font-display text-xl font-semibold">
                AED {totalPending.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Commission</p>
              <p className="font-display text-xl font-semibold">5%</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Closed Deals</p>
              <p className="font-display text-xl font-semibold">
                {paidDeals}/{totalDeals}
              </p>
            </div>
          </div>
          <Progress
            value={(paidDeals / totalDeals) * 100}
            className="mt-2 h-1.5"
          />
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Commission List */}
      <div className="space-y-4">
        {filteredCommissions.map((commission) => {
          const StatusIcon = statusIcons[commission.status];
          return (
            <div
              key={commission.id}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display font-semibold">
                      {commission.propertyTitle}
                    </h3>
                    <Badge
                      variant="outline"
                      className={cn(statusStyles[commission.status])}
                    >
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {commission.status.charAt(0).toUpperCase() +
                        commission.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {commission.propertyArea} • Tenant: {commission.tenantName}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Deal Value</p>
                      <p className="font-medium">
                        AED {commission.dealValue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate</p>
                      <p className="font-medium">{commission.commissionRate}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Commission</p>
                      <p className="font-medium text-accent">
                        AED {commission.commissionAmount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {commission.status === "paid"
                          ? "Paid On"
                          : commission.status === "approved"
                          ? "Expected"
                          : "Closed On"}
                      </p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {new Date(
                          commission.paidDate ||
                            commission.expectedPayment ||
                            commission.closedDate
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
