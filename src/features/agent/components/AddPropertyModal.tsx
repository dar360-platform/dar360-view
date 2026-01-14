import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (property: any) => void;
}

const areas = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "JBR",
  "Business Bay",
  "DIFC",
  "JLT",
  "Dubai Hills",
  "Arabian Ranches",
  "Mirdif",
];

const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
];

export const AddPropertyModal = ({
  open,
  onClose,
  onAdd,
}: AddPropertyModalProps) => {
  const [formData, setFormData] = useState({
    building: "",
    unit: "",
    area: "",
    type: "apartment",
    beds: "",
    baths: "",
    sqft: "",
    rent: "",
    cheques: "1",
    deposit: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
  });
  const [inviteOwner, setInviteOwner] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: `${formData.building} - Unit ${formData.unit}`,
      building: formData.building,
      unit: formData.unit,
      area: formData.area,
      type: formData.type,
      beds: parseInt(formData.beds) || 0,
      baths: parseInt(formData.baths) || 1,
      sqft: parseInt(formData.sqft) || 0,
      rent: parseInt(formData.rent) || 0,
      cheques: parseInt(formData.cheques) || 1,
      deposit: parseInt(formData.deposit) || 0,
      status: "available" as const,
      images: [],
      owner: {
        name: formData.ownerName,
        email: formData.ownerEmail,
        phone: formData.ownerPhone,
      },
      viewingsCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onAdd(newProperty);
    setIsSubmitting(false);

    if (inviteOwner && formData.ownerEmail) {
      setShowSuccess(true);
    } else {
      toast.success("Property added successfully!", {
        description: `${newProperty.building} - Unit ${newProperty.unit}`,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      building: "",
      unit: "",
      area: "",
      type: "apartment",
      beds: "",
      baths: "",
      sqft: "",
      rent: "",
      cheques: "1",
      deposit: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    });
    setInviteOwner(true);
    onClose();
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="font-display text-xl font-semibold mb-2">Property Added Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              An invitation email has been sent to <strong>{formData.ownerEmail}</strong> with login credentials to access their owner portal.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 w-full mb-6">
              <div className="flex items-center gap-3 text-left">
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm font-medium">Invitation Sent</p>
                  <p className="text-xs text-muted-foreground">
                    {formData.ownerName} will receive an email with their login details
                  </p>
                </div>
              </div>
            </div>
            <Button variant="gold" onClick={handleClose} className="w-full">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Add New Property
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Property Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">Building Name *</Label>
                <Input
                  id="building"
                  placeholder="e.g., Marina Heights Tower"
                  value={formData.building}
                  onChange={(e) =>
                    setFormData({ ...formData, building: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit Number *</Label>
                <Input
                  id="unit"
                  placeholder="e.g., 1204"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="area">Area *</Label>
                <Select
                  value={formData.area}
                  onValueChange={(value) =>
                    setFormData({ ...formData, area: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  id="beds"
                  type="number"
                  min="0"
                  placeholder="2"
                  value={formData.beds}
                  onChange={(e) =>
                    setFormData({ ...formData, beds: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  id="baths"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={formData.baths}
                  onChange={(e) =>
                    setFormData({ ...formData, baths: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">Size (sqft)</Label>
                <Input
                  id="sqft"
                  type="number"
                  placeholder="1200"
                  value={formData.sqft}
                  onChange={(e) =>
                    setFormData({ ...formData, sqft: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Rental Terms */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Rental Terms
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Annual Rent (AED) *</Label>
                <Input
                  id="rent"
                  type="number"
                  placeholder="120000"
                  value={formData.rent}
                  onChange={(e) =>
                    setFormData({ ...formData, rent: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cheques">No. of Cheques</Label>
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
              <div className="space-y-2">
                <Label htmlFor="deposit">Security Deposit (AED)</Label>
                <Input
                  id="deposit"
                  type="number"
                  placeholder="10000"
                  value={formData.deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
                Owner Information
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Full name"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email *</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  placeholder="owner@email.com"
                  value={formData.ownerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerEmail: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Owner Phone *</Label>
                <Input
                  id="ownerPhone"
                  type="tel"
                  placeholder="+971 50 XXX XXXX"
                  value={formData.ownerPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, ownerPhone: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Invite Owner Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <Checkbox
                id="inviteOwner"
                checked={inviteOwner}
                onCheckedChange={(checked) => setInviteOwner(checked as boolean)}
              />
              <div className="space-y-1">
                <Label htmlFor="inviteOwner" className="font-medium cursor-pointer">
                  Send portal invitation to owner
                </Label>
                <p className="text-sm text-muted-foreground">
                  The owner will receive an email with login credentials to access their Dar360 owner portal where they can track viewings, payments, and property status.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gold" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Property"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
