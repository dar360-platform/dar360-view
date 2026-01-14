import { Building2, Bed, Bath, Square, MapPin, Heart, Eye, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Property } from "./PropertyCard";

interface TenantPropertyCardProps {
  property: Property;
  onView: (id: string) => void;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  reserved: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rented: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const TenantPropertyCard = ({
  property,
  onView,
  onSave,
  isSaved = false,
}: TenantPropertyCardProps) => {
  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.rent);

  return (
    <div 
      className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-soft transition-all duration-200 group cursor-pointer"
      onClick={() => onView(property.id)}
    >
      {/* Image */}
      <div className="relative h-44 bg-muted overflow-hidden">
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
          className={cn("absolute top-3 left-3 border", statusStyles[property.status])}
        >
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute top-3 right-3 h-8 w-8 bg-white/90 hover:bg-white",
            isSaved && "text-red-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onSave?.(property.id);
          }}
        >
          <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
        </Button>
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
            {property.beds === 0 ? "Studio" : `${property.beds} Beds`}
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

        {/* Agent Info */}
        {property.agent && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-2 border-t border-border/50">
            <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-accent">
                {property.agent.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <span className="truncate">{property.agent.name}</span>
            <div className="flex items-center gap-0.5 ml-auto">
              <Star className="w-3 h-3 fill-warning text-warning" />
              <span className="text-xs">{property.agent.rating}</span>
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <p className="font-display font-semibold text-lg text-accent">
              {formattedRent}
              <span className="text-sm text-muted-foreground font-body font-normal">/year</span>
            </p>
            <p className="text-xs text-muted-foreground">{property.cheques} cheques</p>
          </div>
          <Button variant="outline" size="sm" onClick={(e) => {
            e.stopPropagation();
            onView(property.id);
          }}>
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </div>
    </div>
  );
};
