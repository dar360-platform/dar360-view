import { Building2, User, Phone, Calendar, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Application } from "../data/dummyData";

interface ApplicationCardProps {
  application: Application;
  onViewContract?: (applicationId: string) => void;
  onWithdraw?: (applicationId: string) => void;
}

const statusStyles = {
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-600 border-red-500/20",
  withdrawn: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

const statusIcons = {
  pending: Loader2,
  approved: CheckCircle,
  rejected: XCircle,
  withdrawn: XCircle,
};

const statusLabels = {
  pending: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

export const ApplicationCard = ({
  application,
  onViewContract,
  onWithdraw,
}: ApplicationCardProps) => {
  const StatusIcon = statusIcons[application.status];
  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(application.rent);

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-soft transition-all duration-200">
      <div className="flex">
        {/* Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-muted">
          {application.propertyImage ? (
            <img
              src={application.propertyImage}
              alt={application.propertyTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-muted-foreground/30" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-display font-semibold line-clamp-1">{application.propertyTitle}</h3>
                <p className="text-sm text-muted-foreground">{application.propertyArea}</p>
              </div>
              <Badge variant="outline" className={cn("flex-shrink-0", statusStyles[application.status])}>
                <StatusIcon className={cn("w-3.5 h-3.5 mr-1", application.status === "pending" && "animate-spin")} />
                {statusLabels[application.status]}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {application.agentName}
              </span>
              <span className="text-accent font-medium">{formattedRent}/yr</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {application.status === "approved" && (
              <Button variant="gold" size="sm" onClick={() => onViewContract?.(application.id)}>
                View Contract
              </Button>
            )}
            {application.status === "pending" && (
              <Button variant="outline" size="sm" onClick={() => onWithdraw?.(application.id)}>
                Withdraw
              </Button>
            )}
            {application.notes && (
              <p className="text-xs text-muted-foreground italic ml-auto">{application.notes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
