import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Banknote,
  Smartphone,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Payment {
  id: string;
  type: "rent" | "deposit" | "maintenance";
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "upcoming" | "overdue";
  paidDate?: string;
  paidMethod?: string;
}

const dummyPayments: Payment[] = [
  {
    id: "pay-001",
    type: "rent",
    description: "Rent Payment - Q1 2025",
    amount: 35000,
    dueDate: "2025-01-15",
    status: "upcoming",
  },
  {
    id: "pay-002",
    type: "deposit",
    description: "Security Deposit",
    amount: 25000,
    dueDate: "2024-12-01",
    status: "paid",
    paidDate: "2024-12-01",
    paidMethod: "Bank Transfer",
  },
  {
    id: "pay-003",
    type: "rent",
    description: "Rent Payment - Q2 2025",
    amount: 35000,
    dueDate: "2025-04-15",
    status: "upcoming",
  },
];

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, AMEX",
    fee: "2.5% processing fee",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Building2,
    description: "Direct bank transfer",
    fee: "No fees",
  },
  {
    id: "apple_pay",
    name: "Apple Pay",
    icon: Smartphone,
    description: "Pay with Apple Pay",
    fee: "No fees",
  },
  {
    id: "cheque",
    name: "Post-dated Cheque",
    icon: Banknote,
    description: "Traditional cheque payment",
    fee: "No fees",
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

export const PaymentOptions = () => {
  const [payments] = useState<Payment[]>(dummyPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [selectedMethod, setSelectedMethod] = useState("card");

  const totalDue = payments
    .filter((p) => p.status !== "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const nextPayment = payments
    .filter((p) => p.status === "upcoming")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  const handlePay = () => {
    toast.success("Payment initiated! You will be redirected to the payment gateway.");
    setSelectedPayment(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">Payments</h1>
        <p className="text-muted-foreground">
          Manage your rent and deposit payments
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Due</p>
              <p className="font-display text-xl font-semibold">
                AED {totalDue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        {nextPayment && (
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Payment</p>
                <p className="font-display text-xl font-semibold">
                  {new Date(nextPayment.dueDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="bg-card border border-border/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paid This Year</p>
              <p className="font-display text-xl font-semibold">
                AED{" "}
                {payments
                  .filter((p) => p.status === "paid")
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming/Due Payments */}
      <div className="space-y-4">
        <h2 className="font-display font-semibold">Payment Schedule</h2>
        {payments.map((payment) => {
          const StatusIcon = statusIcons[payment.status];

          return (
            <div
              key={payment.id}
              className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">
                      {payment.description}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {payment.status === "paid" && payment.paidDate
                          ? `Paid ${new Date(payment.paidDate).toLocaleDateString(
                              "en-GB",
                              { day: "numeric", month: "short", year: "numeric" }
                            )}`
                          : `Due ${new Date(payment.dueDate).toLocaleDateString(
                              "en-GB",
                              { day: "numeric", month: "short", year: "numeric" }
                            )}`}
                      </span>
                      {payment.paidMethod && (
                        <span>via {payment.paidMethod}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold">
                      AED {payment.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(statusStyles[payment.status])}
                    >
                      <StatusIcon className="w-3.5 h-3.5 mr-1" />
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </Badge>
                  </div>
                  {payment.status !== "paid" && (
                    <Button
                      variant="gold"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      Pay Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Modal */}
      <Dialog
        open={!!selectedPayment}
        onOpenChange={() => setSelectedPayment(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Make Payment
            </DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <p className="font-display text-2xl font-semibold text-accent">
                  AED {selectedPayment.amount.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedPayment.description}
                </p>
              </div>

              <div className="space-y-3">
                <p className="font-medium">Select Payment Method</p>
                <RadioGroup
                  value={selectedMethod}
                  onValueChange={setSelectedMethod}
                  className="space-y-3"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.id}>
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={method.id}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                          "hover:border-accent/50",
                          selectedMethod === method.id
                            ? "border-accent bg-accent/5"
                            : "border-border/50"
                        )}
                      >
                        <div className="p-2 rounded-lg bg-muted">
                          <method.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {method.description}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {method.fee}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedPayment(null)}
                >
                  Cancel
                </Button>
                <Button variant="gold" onClick={handlePay}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay AED {selectedPayment.amount.toLocaleString()}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
