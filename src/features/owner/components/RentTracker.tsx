import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  CreditCard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ChequePayment {
  id: string;
  propertyTitle: string;
  tenantName: string;
  chequeNumber: number;
  totalCheques: number;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue";
  paidDate?: string;
}

const dummyCheques: ChequePayment[] = [
  {
    id: "chq-001",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    chequeNumber: 1,
    totalCheques: 4,
    amount: 16250,
    dueDate: "2024-12-01",
    status: "paid",
    paidDate: "2024-12-01",
  },
  {
    id: "chq-002",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    chequeNumber: 2,
    totalCheques: 4,
    amount: 16250,
    dueDate: "2025-03-01",
    status: "upcoming",
  },
  {
    id: "chq-003",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    chequeNumber: 3,
    totalCheques: 4,
    amount: 16250,
    dueDate: "2025-06-01",
    status: "upcoming",
  },
  {
    id: "chq-004",
    propertyTitle: "Marina Heights - 1204",
    tenantName: "James Wilson",
    chequeNumber: 4,
    totalCheques: 4,
    amount: 16250,
    dueDate: "2025-09-01",
    status: "upcoming",
  },
  {
    id: "chq-005",
    propertyTitle: "Boulevard Point - 3502",
    tenantName: "Lisa Anderson",
    chequeNumber: 1,
    totalCheques: 2,
    amount: 140000,
    dueDate: "2025-01-15",
    status: "upcoming",
  },
];

const statusStyles = {
  paid: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  overdue: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusIcons = {
  paid: CheckCircle,
  upcoming: Clock,
  overdue: AlertTriangle,
};

export const RentTracker = () => {
  const totalCollected = dummyCheques
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalPending = dummyCheques
    .filter((c) => c.status === "upcoming" || c.status === "overdue")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalOverdue = dummyCheques
    .filter((c) => c.status === "overdue")
    .reduce((sum, c) => sum + c.amount, 0);

  const paidCount = dummyCheques.filter((c) => c.status === "paid").length;
  const totalCount = dummyCheques.length;

  // Group by property
  const propertiesMap = dummyCheques.reduce((acc, cheque) => {
    if (!acc[cheque.propertyTitle]) {
      acc[cheque.propertyTitle] = {
        propertyTitle: cheque.propertyTitle,
        tenantName: cheque.tenantName,
        cheques: [],
      };
    }
    acc[cheque.propertyTitle].cheques.push(cheque);
    return acc;
  }, {} as Record<string, { propertyTitle: string; tenantName: string; cheques: ChequePayment[] }>);

  const properties = Object.values(propertiesMap);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Rent Collection</h1>
        <p className="text-muted-foreground">
          Track cheque schedules and payments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="font-display text-xl font-semibold">
                AED {totalCollected.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Clock className="w-5 h-5 text-blue-600" />
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
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="font-display text-xl font-semibold">
                AED {totalOverdue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-display text-xl font-semibold">
                {paidCount}/{totalCount} cheques
              </p>
            </div>
          </div>
          <Progress
            value={(paidCount / totalCount) * 100}
            className="mt-2 h-1.5"
          />
        </div>
      </div>

      {/* Properties with Cheques */}
      <div className="space-y-6">
        {properties.map((property) => {
          const paidCheques = property.cheques.filter((c) => c.status === "paid").length;
          const totalCheques = property.cheques.length;

          return (
            <div
              key={property.propertyTitle}
              className="bg-card border border-border/50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">
                      {property.propertyTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Tenant: {property.tenantName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Collected</p>
                  <p className="font-medium">
                    {paidCheques}/{totalCheques} cheques
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {property.cheques.map((cheque) => {
                  const StatusIcon = statusIcons[cheque.status];
                  return (
                    <div
                      key={cheque.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className={cn(statusStyles[cheque.status])}
                        >
                          <StatusIcon className="w-3.5 h-3.5 mr-1" />
                          {cheque.status.charAt(0).toUpperCase() +
                            cheque.status.slice(1)}
                        </Badge>
                        <div>
                          <p className="font-medium">
                            Cheque {cheque.chequeNumber} of {cheque.totalCheques}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Due:{" "}
                            {new Date(cheque.dueDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-semibold text-accent">
                          AED {cheque.amount.toLocaleString()}
                        </p>
                        {cheque.status === "paid" && cheque.paidDate && (
                          <p className="text-xs text-emerald-600">
                            Paid{" "}
                            {new Date(cheque.paidDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                              }
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
