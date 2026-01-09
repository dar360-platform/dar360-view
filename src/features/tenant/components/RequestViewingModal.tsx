import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Property } from "@/components/dashboard";
import { Calendar, Clock } from "lucide-react";
import { toast } from "sonner";

interface RequestViewingModalProps {
  property: Property | null;
  open: boolean;
  onClose: () => void;
  onRequest: (data: { propertyId: string; date: string; time: string; notes?: string }) => void;
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
];

export const RequestViewingModal = ({
  property,
  open,
  onClose,
  onRequest,
}: RequestViewingModalProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !date || !time) return;

    setIsLoading(true);
    setTimeout(() => {
      onRequest({
        propertyId: property.id,
        date,
        time,
        notes: notes || undefined,
      });
      setIsLoading(false);
      toast.success("Viewing request sent!");
      onClose();
      resetForm();
    }, 800);
  };

  const resetForm = () => {
    setDate("");
    setTime("");
    setNotes("");
  };

  // Get minimum date (tomorrow)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Viewing</DialogTitle>
          <DialogDescription>
            {property.building} - Unit {property.unit}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Preferred Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDateStr}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Preferred Time
            </Label>
            <Select value={time} onValueChange={setTime} required>
              <SelectTrigger>
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific requirements or questions?"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gold" className="flex-1" disabled={isLoading || !date || !time}>
              {isLoading ? "Sending..." : "Request Viewing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
