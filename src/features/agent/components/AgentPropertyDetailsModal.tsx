import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/components/dashboard";
import { 
  Building2, Bed, Bath, Square, MapPin, CreditCard, Shield, Phone, 
  MessageSquare, User, Calendar, FileText, Eye, Users, History,
  Home, Mail, Clock, TrendingUp, Edit, Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentPropertyDetailsModalProps {
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
      actor?: string;
    }[];
  }) | null;
  open: boolean;
  onClose: () => void;
  onEdit?: (id: string) => void;
  onShare?: (id: string) => void;
  onScheduleViewing?: (id: string) => void;
}

const statusStyles = {
  available: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  reserved: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  rented: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export const AgentPropertyDetailsModal = ({
  property,
  open,
  onClose,
  onEdit,
  onShare,
  onScheduleViewing,
}: AgentPropertyDetailsModalProps) => {
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
            <div className="absolute top-3 right-3 flex gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/90 hover:bg-white"
                onClick={() => onEdit?.(property.id)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white/90 hover:bg-white"
                onClick={() => onShare?.(property.id)}
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
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
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Eye className="w-5 h-5 mx-auto mb-1 text-accent" />
              <p className="font-semibold">{property.viewingsCount}</p>
              <p className="text-xs text-muted-foreground">Viewings</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold text-sm">{new Date(property.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              <p className="text-xs text-muted-foreground">Listed</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <FileText className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <p className="font-semibold text-sm capitalize">{property.type}</p>
              <p className="text-xs text-muted-foreground">Type</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
              <p className="font-semibold text-sm">Active</p>
              <p className="text-xs text-muted-foreground">Status</p>
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
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {property.owner.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{property.owner.name}</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {property.owner.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {property.owner.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`tel:${property.owner.phone}`, "_self")}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const message = `Hi ${property.owner.name}, I wanted to update you about your property at ${property.building} - Unit ${property.unit}`;
                    window.open(`https://wa.me/${property.owner.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Current Tenant (if rented/reserved) */}
          {(property.status === "rented" || property.status === "reserved") && property.tenant && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                  {property.status === "rented" ? "Current Tenant" : "Incoming Tenant"}
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
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {property.tenant.email}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {property.tenant.moveInDate && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Move-in: {new Date(property.tenant.moveInDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {property.tenant.leaseEnd && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Lease ends: {new Date(property.tenant.leaseEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const message = `Hi ${property.tenant!.name}, I wanted to reach out regarding ${property.building} - Unit ${property.unit}`;
                      window.open(`https://wa.me/${property.tenant!.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
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
                  Activity History
                </p>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {property.history.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm">{item.action}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                      {item.actor && (
                        <p className="text-xs text-muted-foreground mt-1">By: {item.actor}</p>
                      )}
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
            {property.status === "available" && (
              <Button 
                variant="gold" 
                className="flex-1"
                onClick={() => onScheduleViewing?.(property.id)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Viewing
              </Button>
            )}
            {(property.status === "reserved" || property.status === "rented") && (
              <Button 
                variant="gold" 
                className="flex-1"
                onClick={() => {
                  const message = `Hi ${property.owner.name}, I wanted to update you about your property at ${property.building} - Unit ${property.unit}`;
                  window.open(`https://wa.me/${property.owner.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Update Owner
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
