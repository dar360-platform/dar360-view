import { Calendar, Clock, User, Phone, MapPin, MoreVertical, Check, X, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Viewing {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyArea: string;
  tenantName: string;
  tenantPhone: string;
  date: string;
  time: string;
  outcome?: "interested" | "not_interested" | "no_show" | "offer_made" | "pending";
  notes?: string;
}

interface ViewingCardProps {
  viewing: Viewing;
  onLogOutcome?: (id: string, outcome: Viewing["outcome"]) => void;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  variant?: "upcoming" | "past";
  showProperty?: boolean;
}

const outcomeStyles = {
  interested: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  not_interested: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  no_show: "bg-red-500/10 text-red-600 border-red-500/20",
  offer_made: "bg-accent/10 text-accent border-accent/20",
  pending: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

const outcomeLabels = {
  interested: "Interested",
  not_interested: "Not Interested",
  no_show: "No Show",
  offer_made: "Offer Made",
  pending: "Pending",
};

export const ViewingCard = ({
  viewing,
  onLogOutcome,
  onReschedule,
  onCancel,
  variant = "upcoming",
  showProperty = true,
}: ViewingCardProps) => {
  const viewingDate = new Date(viewing.date);
  const isPast = viewingDate < new Date();
  const displayVariant = variant === "past" || isPast ? "past" : "upcoming";

  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 hover:shadow-soft transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Date & Time */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-accent" />
              <span className="font-medium">
                {viewingDate.toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{viewing.time}</span>
            </div>
            {displayVariant === "past" && viewing.outcome && (
              <Badge
                variant="outline"
                className={cn("ml-auto", outcomeStyles[viewing.outcome])}
              >
                {outcomeLabels[viewing.outcome]}
              </Badge>
            )}
          </div>

          {/* Property Info */}
          {showProperty && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{viewing.propertyTitle}</span>
              <span className="text-muted-foreground">• {viewing.propertyArea}</span>
            </div>
          )}

          {/* Tenant Info */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{viewing.tenantName}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{viewing.tenantPhone}</span>
            </div>
          </div>

          {/* Notes */}
          {viewing.notes && (
            <p className="text-sm text-muted-foreground italic">
              "{viewing.notes}"
            </p>
          )}
        </div>

        {/* Actions */}
        {displayVariant === "upcoming" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onReschedule?.(viewing.id)}>
                <Calendar className="w-4 h-4 mr-2" />
                Reschedule
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onCancel?.(viewing.id)}
                className="text-destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Viewing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {displayVariant === "past" && !viewing.outcome && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Log Outcome
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onLogOutcome?.(viewing.id, "interested")}
              >
                <Check className="w-4 h-4 mr-2 text-emerald-600" />
                Interested
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onLogOutcome?.(viewing.id, "offer_made")}
              >
                <Check className="w-4 h-4 mr-2 text-accent" />
                Offer Made
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onLogOutcome?.(viewing.id, "not_interested")}
              >
                <X className="w-4 h-4 mr-2 text-gray-600" />
                Not Interested
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onLogOutcome?.(viewing.id, "no_show")}
              >
                <Ban className="w-4 h-4 mr-2 text-red-600" />
                No Show
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};