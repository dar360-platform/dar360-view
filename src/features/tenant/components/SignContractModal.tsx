import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Contract } from "@/components/dashboard";
import { FileText, Calendar, CreditCard, Shield, CheckCircle, Smartphone, Loader2 } from "lucide-react";
import { toast } from "sonner";
import uaePassLogo from "@/assets/uae_pass.png";

interface SignContractModalProps {
  contract: Contract | null;
  open: boolean;
  onClose: () => void;
  onSign: (contractId: string) => void;
}

type Step = "review" | "authorize" | "success";

export const SignContractModal = ({
  contract,
  open,
  onClose,
  onSign,
}: SignContractModalProps) => {
  const [step, setStep] = useState<Step>("review");
  const [agreed, setAgreed] = useState(false);
  const [countdown, setCountdown] = useState(15);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep("review");
      setAgreed(false);
      setCountdown(15);
    }
  }, [open]);

  // Countdown timer for UAE PASS authorization
  useEffect(() => {
    if (step === "authorize" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "authorize" && countdown === 0) {
      setStep("success");
      if (contract) {
        onSign(contract.id);
      }
    }
  }, [step, countdown, contract, onSign]);

  const handleInitiateSign = () => {
    if (!agreed) {
      toast.error("Please agree to the terms");
      return;
    }
    setStep("authorize");
  };

  const handleClose = () => {
    if (step === "success") {
      toast.success("Contract signed successfully via UAE PASS!");
    }
    onClose();
  };

  if (!contract) return null;

  const formattedRent = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(contract.rent);

  const formattedDeposit = new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: 0,
  }).format(contract.deposit);

  return (
    <Dialog open={open} onOpenChange={step === "authorize" ? undefined : handleClose}>
      <DialogContent className="max-w-lg">
        {step === "review" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Review & Sign Contract
              </DialogTitle>
              <DialogDescription>{contract.propertyTitle}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Contract Summary */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Lease Period</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(contract.startDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })} - {new Date(contract.endDate).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Annual Rent</span>
                  <span className="text-sm font-medium text-accent">{formattedRent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Payments</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {contract.cheques} cheques
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Security Deposit</span>
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {formattedDeposit}
                  </span>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3 p-4 border border-border/50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I have reviewed and agree to the rental contract terms and conditions. 
                  I understand that signing this contract is legally binding.
                </Label>
              </div>

              {/* UAE PASS Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <img src={uaePassLogo} alt="UAE PASS" className="w-10 h-10 object-contain" />
                <p className="text-sm text-muted-foreground">
                  You will sign this contract using <span className="font-medium text-foreground">UAE PASS</span> for secure digital authentication.
                </p>
              </div>

              <Button
                variant="gold"
                className="w-full"
                onClick={handleInitiateSign}
                disabled={!agreed}
              >
                <Shield className="w-4 h-4 mr-2" />
                Sign with UAE PASS
              </Button>
            </div>
          </>
        )}

        {step === "authorize" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-accent" />
                Authorize in UAE PASS
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <img src={uaePassLogo} alt="UAE PASS" className="w-12 h-12 object-contain" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-muted-foreground text-sm">
                    Open your <span className="font-medium text-foreground">UAE PASS app</span> on your phone and authorize the signing request.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-accent">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-medium">Waiting for authorization...</span>
                </div>

                <div className="flex items-center justify-center gap-3 py-4">
                  <Loader2 className="w-6 h-6 animate-spin text-accent" />
                  <span className="text-2xl font-display font-bold tabular-nums">
                    {countdown}s
                  </span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm font-medium">Steps to complete:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Open UAE PASS app on your phone</li>
                    <li>Go to pending requests</li>
                    <li>Review the document details</li>
                    <li>Enter your PIN to authorize</li>
                  </ol>
                </div>
              </div>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Contract Signed!</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Your contract has been digitally signed via UAE PASS.
              </p>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Legally Binding Digital Signature
            </Badge>
            <div className="bg-muted/30 rounded-lg p-4 text-left text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Contract ID:</span> {contract.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-muted-foreground mt-1">
                <span className="font-medium text-foreground">Signed at:</span> {new Date().toLocaleString("en-GB")}
              </p>
            </div>
            <Button variant="gold" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
