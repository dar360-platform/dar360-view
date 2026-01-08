import { Building2, Bed, Bath, Square, MoreVertical, Eye, Share2, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Property {
  id: string;
  title: string;
  building: string;
  unit: string;
  area: string;
  type: "apartment" | "villa" | "townhouse" | "studio" | "penthouse";
  beds: number;
  baths: number;
  sqft: number;
  rent: number;
  cheques: number;
  deposit: number;
  status: "available" | "reserved" | "rented";
  images: string[];
  owner: {
    name: string;
    email: string;
    phone: string;
  };
  viewingsCount: number;
  createdAt: string;
}

interface PropertyCardProps {
  property: Property;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onShare?: (id: string) => void;
  onContract?: (id: string) => void;
  onScheduleViewing?: (id: string) => void;
  variant?: "agent" | "owner";
}

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  reserved: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rented: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

const statusLabels = {
  available: "Available",
  reserved: "Reserved",
  rented: "Rented",
};

export const PropertyCard = ({
  property,
  onView,
  onEdit,
  onShare,
  onContract,
  onScheduleViewing,
  variant = "agent",
}: PropertyCardProps) => {
  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.rent);

  return (
    <div className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-soft transition-all duration-200 group">
      {/* Image */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        <Badge
          className={cn(
            "absolute top-3 left-3 border",
            statusStyles[property.status]
          )}
        >
          {statusLabels[property.status]}
        </Badge>
        {variant === "agent" && (
          <div className="absolute top-3 right-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView?.(property.id)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(property.id)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Edit Property
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare?.(property.id)}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onContract?.(property.id)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Create Contract
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-display font-semibold text-lg line-clamp-1">
            {property.building}
          </h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              Unit {property.unit} • {property.area}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            {property.baths}
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            {property.sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="font-display font-semibold text-lg text-accent">
              {formattedRent}
              <span className="text-sm text-muted-foreground font-body font-normal">
                /year
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {property.cheques} cheques
            </p>
          </div>

          {variant === "agent" && property.status === "available" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onScheduleViewing?.(property.id)}
            >
              Schedule Viewing
            </Button>
          )}

          {variant === "owner" && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>{property.viewingsCount} viewings</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};