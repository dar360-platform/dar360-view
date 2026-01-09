import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Contract } from "@/components/dashboard";
import { FileText, Calendar, CreditCard, Shield, CheckCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface SignContractModalProps {
  contract: Contract | null;
  open: boolean;
  onClose: () => void;
  onSign: (contractId: string) => void;
}

type Step = "review" | "otp" | "success";

export const SignContractModal = ({
  contract,
  open,
  onClose,
  onSign,
}: SignContractModalProps) => {
  const [step, setStep] = useState<Step>("review");
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOTP = () => {
    if (!agreed) {
      toast.error("Please agree to the terms");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast.success("OTP sent to your phone");
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
      onSign(contract!.id);
    }, 1000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("review");
      setAgreed(false);
      setOtp("");
    }, 300);
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
    <Dialog open={open} onOpenChange={handleClose}>
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

              <Button
                variant="gold"
                className="w-full"
                onClick={handleRequestOTP}
                disabled={!agreed || isLoading}
              >
                {isLoading ? "Sending OTP..." : "Proceed to Sign"}
              </Button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-accent" />
                Verify Your Identity
              </DialogTitle>
              <DialogDescription>
                Enter the 6-digit code sent to your phone
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="flex justify-center">
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Didn't receive the code?{" "}
                <button className="text-accent hover:underline">Resend</button>
              </p>

              <Button
                variant="gold"
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? "Verifying..." : "Sign Contract"}
              </Button>
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
                Your signed contract has been sent to your email.
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
