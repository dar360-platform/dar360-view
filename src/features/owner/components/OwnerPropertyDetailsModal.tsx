import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/components/dashboard";
import { 
  Building2, Bed, Bath, Square, MapPin, CreditCard, Shield, Phone, 
  Star, MessageSquare, User, Calendar, TrendingUp, Clock, FileText,
  Eye, Users, History
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OwnerPropertyDetailsModalProps {
  property: (Property & {
    tenant?: {
      name: string;
      email: string;
      phone: string;
      moveInDate?: string;
      leaseEnd?: string;
    };
    history?: {
      date: string;
      action: string;
      details: string;
    }[];
  }) | null;
  open: boolean;
  onClose: () => void;
}

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  reserved: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rented: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const OwnerPropertyDetailsModal = ({
  property,
  open,
  onClose,
}: OwnerPropertyDetailsModalProps) => {
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

          {/* Location & Features */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Unit {property.unit} • {property.area}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {property.beds === 0 ? "Studio" : `${property.beds} Beds`}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  {property.baths} Baths
                </span>
                <span className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  {property.sqft.toLocaleString()} sqft
                </span>
              </div>
            </div>
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <p className="font-display text-xl font-semibold text-accent">
                {formattedRent}
                <span className="text-sm text-muted-foreground font-body font-normal">/year</span>
              </p>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Eye className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="font-semibold text-lg">{property.viewingsCount}</p>
              <p className="text-xs text-muted-foreground">Total Viewings</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold text-lg">{new Date(property.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              <p className="text-xs text-muted-foreground">Listed Date</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold text-lg capitalize">{property.type}</p>
              <p className="text-xs text-muted-foreground">Property Type</p>
            </div>
          </div>

          {/* Assigned Agent */}
          {property.agent && (
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-accent" />
                <p className="text-sm font-medium text-accent uppercase tracking-wider">
                  Assigned Agent
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
                    onClick={() => window.open(`tel:${property.agent!.phone}`, "_self")}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const message = `Hi ${property.agent!.name}, I wanted to discuss my property at ${property.building} - Unit ${property.unit}`;
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

          {/* Current Tenant (if rented) */}
          {property.status === "rented" && property.tenant && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                  Current Tenant
                </p>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">
                      {property.tenant.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{property.tenant.name}</h4>
                    <p className="text-sm text-muted-foreground">{property.tenant.email}</p>
                    {property.tenant.leaseEnd && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Lease ends: {new Date(property.tenant.leaseEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`tel:${property.tenant!.phone}`, "_self")}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
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
              <div className="space-y-3">
                {property.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{item.action}</p>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
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
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="gold" 
              className="flex-1"
              onClick={() => {
                if (property.agent) {
                  const message = `Hi ${property.agent.name}, I'd like to get an update on my property at ${property.building} - Unit ${property.unit}`;
                  window.open(`https://wa.me/${property.agent.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
                }
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
