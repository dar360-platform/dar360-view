import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

interface ScheduleViewingModalProps {
  open: boolean;
  onClose: () => void;
  onSchedule: (viewing: any) => void;
  properties: Property[];
  preselectedPropertyId?: string;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

export const ScheduleViewingModal = ({
  open,
  onClose,
  onSchedule,
  properties,
  preselectedPropertyId,
}: ScheduleViewingModalProps) => {
  const [formData, setFormData] = useState({
    propertyId: preselectedPropertyId || "",
    tenantName: "",
    tenantPhone: "",
    date: "",
    time: "",
    notes: "",
  });

  const selectedProperty = properties.find((p) => p.id === formData.propertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProperty) return;

    const newViewing = {
      id: `view-${Date.now()}`,
      propertyId: formData.propertyId,
      propertyTitle: `${selectedProperty.building} - Unit ${selectedProperty.unit}`,
      propertyArea: selectedProperty.area,
      tenantName: formData.tenantName,
      tenantPhone: formData.tenantPhone,
      date: formData.date,
      time: formData.time,
      outcome: "pending" as const,
      notes: formData.notes || undefined,
    };

    onSchedule(newViewing);
    toast.success("Viewing scheduled!", {
      description: `${formData.tenantName} on ${new Date(formData.date).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })} at ${formData.time}`,
    });
    onClose();

    // Reset form
    setFormData({
      propertyId: "",
      tenantName: "",
      tenantPhone: "",
      date: "",
      time: "",
      notes: "",
    });
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            Schedule Viewing
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Property Selection */}
          <div className="space-y-2">
            <Label htmlFor="property">Property *</Label>
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
                {properties
                  .filter((p) => p.status === "available")
                  .map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.building} - Unit {property.unit} ({property.area})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tenant Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenantName">Tenant Name *</Label>
              <Input
                id="tenantName"
                placeholder="Full name"
                value={formData.tenantName}
                onChange={(e) =>
                  setFormData({ ...formData, tenantName: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenantPhone">Tenant Phone *</Label>
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

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                min={today}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select
                value={formData.time}
                onValueChange={(value) =>
                  setFormData({ ...formData, time: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Schedule Viewing
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};