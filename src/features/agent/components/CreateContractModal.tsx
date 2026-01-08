import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Property } from "@/components/dashboard";

interface CreateContractModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (contract: any) => void;
  properties: Property[];
  preselectedPropertyId?: string;
}

export const CreateContractModal = ({
  open,
  onClose,
  onCreate,
  properties,
  preselectedPropertyId,
}: CreateContractModalProps) => {
  const [formData, setFormData] = useState({
    propertyId: preselectedPropertyId || "",
    tenantName: "",
    tenantEmail: "",
    tenantPhone: "",
    tenantEmiratesId: "",
    startDate: "",
    endDate: "",
    cheques: "1",
  });

  const selectedProperty = properties.find((p) => p.id === formData.propertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProperty) return;

    const newContract = {
      id: `cont-${Date.now()}`,
      propertyId: formData.propertyId,
      propertyTitle: `${selectedProperty.building} - Unit ${selectedProperty.unit}, ${selectedProperty.area}`,
      tenantName: formData.tenantName,
      tenantEmail: formData.tenantEmail,
      tenantPhone: formData.tenantPhone,
      startDate: formData.startDate,
      endDate: formData.endDate,
      rent: selectedProperty.rent,
      cheques: parseInt(formData.cheques),
      deposit: selectedProperty.deposit,
      status: "draft" as const,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onCreate(newContract);
    toast.success("Contract created!", {
      description: `Draft contract for ${formData.tenantName}`,
    });
    onClose();

    // Reset form
    setFormData({
      propertyId: "",
      tenantName: "",
      tenantEmail: "",
      tenantPhone: "",
      tenantEmiratesId: "",
      startDate: "",
      endDate: "",
      cheques: "1",
    });
  };

  // Calculate end date when start date changes
  const handleStartDateChange = (startDate: string) => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);
    end.setDate(end.getDate() - 1);
    setFormData({
      ...formData,
      startDate,
      endDate: end.toISOString().split("T")[0],
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Create Rental Contract
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Selection */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Property
            </h3>
            <div className="space-y-2">
              <Label htmlFor="property">Select Property *</Label>
              <Select
                value={formData.propertyId}
                onValueChange={(value) =>
                  setFormData({ ...formData, propertyId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.building} - Unit {property.unit} ({property.area})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProperty && (
              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Rent:</span>{" "}
                  <span className="font-medium text-accent">
                    AED {selectedProperty.rent.toLocaleString()}/year
                  </span>
                </p>
                <p>
                  <span className="text-muted-foreground">Owner:</span>{" "}
                  {selectedProperty.owner.name}
                </p>
              </div>
            )}
          </div>

          {/* Tenant Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Tenant Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenantName">Full Name *</Label>
                <Input
                  id="tenantName"
                  placeholder="As per Emirates ID"
                  value={formData.tenantName}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantEmiratesId">Emirates ID *</Label>
                <Input
                  id="tenantEmiratesId"
                  placeholder="784-XXXX-XXXXXXX-X"
                  value={formData.tenantEmiratesId}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantEmiratesId: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tenantEmail">Email *</Label>
                <Input
                  id="tenantEmail"
                  type="email"
                  placeholder="tenant@email.com"
                  value={formData.tenantEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tenantPhone">Phone (WhatsApp) *</Label>
                <Input
                  id="tenantPhone"
                  type="tel"
                  placeholder="+971 55 XXX XXXX"
                  value={formData.tenantPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, tenantPhone: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Lease Terms */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Lease Terms
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cheques">Payment Cheques</Label>
                <Select
                  value={formData.cheques}
                  onValueChange={(value) =>
                    setFormData({ ...formData, cheques: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 6, 12].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "cheque" : "cheques"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Create Draft Contract
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};