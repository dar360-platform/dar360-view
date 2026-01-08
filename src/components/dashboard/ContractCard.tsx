import { FileText, Calendar, User, Download, Eye, Send, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Contract {
  id: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  startDate: string;
  endDate: string;
  rent: number;
  cheques: number;
  deposit: number;
  status: "draft" | "pending_signature" | "signed" | "expired" | "cancelled";
  signedAt?: string;
  pdfUrl?: string;
  createdAt: string;
}

interface ContractCardProps {
  contract: Contract;
  onView?: (id: string) => void;
  onSendForSignature?: (id: string) => void;
  onDownload?: (id: string) => void;
  variant?: "agent" | "owner";
}

const statusStyles = {
  draft: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  pending_signature: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  signed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  expired: "bg-red-500/10 text-red-600 border-red-500/20",
  cancelled: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const statusIcons = {
  draft: FileText,
  pending_signature: Clock,
  signed: CheckCircle,
  expired: XCircle,
  cancelled: XCircle,
};

const statusLabels = {
  draft: "Draft",
  pending_signature: "Awaiting Signature",
  signed: "Signed",
  expired: "Expired",
  cancelled: "Cancelled",
};

export const ContractCard = ({
  contract,
  onView,
  onSendForSignature,
  onDownload,
  variant = "agent",
}: ContractCardProps) => {
  const StatusIcon = statusIcons[contract.status];
  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(contract.rent);

  return (
    <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-soft transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold">{contract.propertyTitle}</h3>
              <p className="text-sm text-muted-foreground">
                Contract #{contract.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
            <Badge
              variant="outline"
              className={cn("ml-auto", statusStyles[contract.status])}
            >
              <StatusIcon className="w-3.5 h-3.5 mr-1" />
              {statusLabels[contract.status]}
            </Badge>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Tenant</p>
              <p className="font-medium flex items-center gap-1.5">
                <User className="w-4 h-4 text-muted-foreground" />
                {contract.tenantName}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Lease Period</p>
              <p className="font-medium flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                {new Date(contract.startDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Annual Rent</p>
              <p className="font-medium text-accent">{formattedRent}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cheques</p>
              <p className="font-medium">{contract.cheques} payments</p>
            </div>
          </div>

          {/* Signed info */}
          {contract.status === "signed" && contract.signedAt && (
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Signed on {new Date(contract.signedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
        <Button variant="outline" size="sm" onClick={() => onView?.(contract.id)}>
          <Eye className="w-4 h-4 mr-1.5" />
          View
        </Button>
        
        {variant === "agent" && contract.status === "draft" && (
          <Button
            variant="gold"
            size="sm"
            onClick={() => onSendForSignature?.(contract.id)}
          >
            <Send className="w-4 h-4 mr-1.5" />
            Send for Signature
          </Button>
        )}

        {contract.status === "signed" && contract.pdfUrl && (
          <Button variant="outline" size="sm" onClick={() => onDownload?.(contract.id)}>
            <Download className="w-4 h-4 mr-1.5" />
            Download PDF
          </Button>
        )}
      </div>
    </div>
  );
};