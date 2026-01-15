import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/components/dashboard";
import { 
  Building2, Bed, Bath, Square, MapPin, Calendar, CreditCard, Shield, Phone, 
  Heart, Share2, Star, MessageSquare, User, Home, History, Mail, Eye 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyDetailsModalProps {
  property: (Property & {
    history?: {
      date: string;
      action: string;
      details: string;
    }[];
  }) | null;
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
          <DialogTitle className="text-xl font-display flex items-center gap-3">
            {property.building}
            <Badge className={cn("border", statusStyles[property.status])}>
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
          </DialogTitle>
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
              <p className="font-semibold">{property.beds === 0 ? "Studio" : property.beds}</p>
              <p className="text-xs text-muted-foreground">{property.beds === 0 ? "" : "Bedrooms"}</p>
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

          {/* Property Type & Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Property Type</p>
              <p className="font-medium capitalize">{property.type}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Viewings</p>
              <p className="font-medium flex items-center gap-1">
                <Eye className="w-4 h-4 text-accent" />
                {property.viewingsCount}
              </p>
            </div>
          </div>

          {/* Property Owner */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                Property Owner
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {property.owner.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <div>
                <h4 className="font-medium">{property.owner.name}</h4>
                <p className="text-sm text-muted-foreground">Property Owner</p>
              </div>
            </div>
          </div>

          {/* Agent Info */}
          {property.agent && (
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium text-accent uppercase tracking-wider">
                  Your Agent
                </p>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">
                      {property.agent.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{property.agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{property.agent.company}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                      <span className="text-sm font-medium">{property.agent.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">rating</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`tel:${property.agent!.phone}`, "_self");
                    }}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      const message = `Hi ${property.agent!.name}, I'm interested in ${property.building} - Unit ${property.unit}`;
                      window.open(`https://wa.me/${property.agent!.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Property History */}
          {property.history && property.history.length > 0 && (
            <div className="border border-border/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <History className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  Property History
                </p>
              </div>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {property.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm">{item.action}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
