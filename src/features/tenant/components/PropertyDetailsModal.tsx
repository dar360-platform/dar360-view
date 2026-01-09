import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/components/dashboard";
import { Building2, Bed, Bath, Square, MapPin, Calendar, CreditCard, Shield, Phone, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyDetailsModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onRequestViewing: (propertyId: string) => void;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
}

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  reserved: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rented: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const PropertyDetailsModal = ({
  property,
  open,
  onClose,
  onRequestViewing,
  onSave,
  isSaved = false,
}: PropertyDetailsModalProps) => {
  if (!property) return null;

  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.rent);

  const formattedDeposit = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(property.deposit);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">{property.building}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
            {property.images[0] ? (
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-16 h-16 text-muted-foreground/30" />
              </div>
            )}
            <Badge
              className={cn("absolute top-3 left-3 border", statusStyles[property.status])}
            >
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Unit {property.unit} • {property.area}</span>
          </div>

          {/* Price */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <p className="font-display text-2xl font-semibold text-accent">
              {formattedRent}
              <span className="text-base text-muted-foreground font-body font-normal">/year</span>
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                {property.cheques} cheques
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                {formattedDeposit} deposit
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Bed className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold">{property.beds}</p>
              <p className="text-xs text-muted-foreground">Bedrooms</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Bath className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold">{property.baths}</p>
              <p className="text-xs text-muted-foreground">Bathrooms</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold">{property.sqft.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Sq.ft</p>
            </div>
          </div>

          {/* Property Type */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Property Type</p>
            <p className="font-medium capitalize">{property.type}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              variant="gold"
              className="flex-1"
              onClick={() => onRequestViewing(property.id)}
              disabled={property.status !== "available"}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Request Viewing
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSave?.(property.id)}
            >
              <Heart className={cn("w-4 h-4", isSaved && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
