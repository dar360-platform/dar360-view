import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Contract } from "@/components/dashboard";
import { 
  FileText, Calendar, CreditCard, Shield, CheckCircle, 
  Smartphone, Loader2, Download, Eye, ExternalLink, 
  RefreshCw, QrCode, AlertCircle, User
} from "lucide-react";
import { toast } from "sonner";
import uaePassLogo from "@/assets/uae_pass.png";

interface SignContractModalProps {
  contract: Contract | null;
  open: boolean;
  onClose: () => void;
  onSign: (contractId: string) => void;
  signerName?: string;
  signerRole?: "tenant" | "owner" | "agent";
}

type Step = "review" | "authorize" | "timeout" | "success";

const AUTHORIZATION_TIMEOUT = 60; // seconds

export const SignContractModal = ({
  contract,
  open,
  onClose,
  onSign,
  signerName = "Ahmed Al Maktoum",
  signerRole = "tenant",
}: SignContractModalProps) => {
  const [step, setStep] = useState<Step>("review");
  const [agreed, setAgreed] = useState(false);
  const [authorizedToSign, setAuthorizedToSign] = useState(false);
  const [countdown, setCountdown] = useState(AUTHORIZATION_TIMEOUT);
  const [showQrCode, setShowQrCode] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setStep("review");
      setAgreed(false);
      setAuthorizedToSign(false);
      setCountdown(AUTHORIZATION_TIMEOUT);
      setShowQrCode(false);
    }
  }, [open]);

  // Countdown timer for UAE PASS authorization
  useEffect(() => {
    if (step === "authorize" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "authorize" && countdown === 0) {
      setStep("timeout");
    }
  }, [step, countdown]);

  // Simulate successful authorization after 15 seconds (for demo)
  useEffect(() => {
    if (step === "authorize" && countdown === AUTHORIZATION_TIMEOUT - 15) {
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
    if (!authorizedToSign) {
      toast.error("Please confirm you're authorized to sign");
      return;
    }
    setStep("authorize");
  };

  const handleResendRequest = () => {
    setCountdown(AUTHORIZATION_TIMEOUT);
    toast.success("Signing request resent to UAE PASS");
  };

  const handleRetry = () => {
    setStep("authorize");
    setCountdown(AUTHORIZATION_TIMEOUT);
  };

  const handleViewPDF = () => {
    toast.info("Opening contract PDF...");
    // In real implementation, this would open a PDF viewer
  };

  const handleDownloadPDF = () => {
    toast.success("Downloading unsigned contract...");
    // In real implementation, this would download the PDF
  };

  const handleOpenUAEPass = () => {
    // Deep link to UAE PASS app
    window.open("uaepass://", "_blank");
    toast.info("Opening UAE PASS app...");
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

  const roleLabels = {
    tenant: "Tenant",
    owner: "Property Owner",
    agent: "Authorized Agent",
  };

  return (
    <Dialog open={open} onOpenChange={step === "authorize" ? undefined : handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
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
              {/* Signer Identity */}
              <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Signing as: {signerName}</p>
                  <p className="text-xs text-muted-foreground">Role: {roleLabels[signerRole]}</p>
                </div>
              </div>

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

              {/* View/Download Contract PDF */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleViewPDF}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Contract
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDownloadPDF}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>

              {/* Terms Agreement */}
              <div className="space-y-3">
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

                <div className="flex items-start gap-3 p-4 border border-border/50 rounded-lg">
                  <Checkbox
                    id="authority"
                    checked={authorizedToSign}
                    onCheckedChange={(checked) => setAuthorizedToSign(checked as boolean)}
                  />
                  <Label htmlFor="authority" className="text-sm leading-relaxed cursor-pointer">
                    I confirm that I am authorized to sign this contract as the {roleLabels[signerRole].toLowerCase()}.
                  </Label>
                </div>
              </div>

              {/* UAE PASS Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <img src={uaePassLogo} alt="UAE PASS" className="w-10 h-10 object-contain" />
                <p className="text-sm text-muted-foreground">
                  You'll be asked to approve the <span className="font-medium text-foreground">signing request</span> in UAE PASS.
                </p>
              </div>

              <Button
                variant="gold"
                className="w-full"
                onClick={handleInitiateSign}
                disabled={!agreed || !authorizedToSign}
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
                Approve Signing Request
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 py-2">
              <div className="text-center space-y-4">
                <div className="mx-auto w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <img src={uaePassLogo} alt="UAE PASS" className="w-12 h-12 object-contain" />
                </div>
                
                {/* What to look for */}
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-accent">Approve in UAE PASS:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Sakani contract signing for {contract.propertyTitle}"
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-accent">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="font-medium">Waiting for approval...</span>
                </div>

                <div className="text-3xl font-display font-bold tabular-nums text-muted-foreground">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleOpenUAEPass}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open UAE PASS App
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleResendRequest}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Resend Request
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowQrCode(!showQrCode)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Use QR Code
                  </Button>
                </div>
              </div>

              {/* QR Code option */}
              {showQrCode && (
                <div className="bg-muted/50 rounded-lg p-4 text-center space-y-2">
                  <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center border">
                    <QrCode className="w-20 h-20 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan with UAE PASS app on another device
                  </p>
                </div>
              )}

              {/* Steps */}
              <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
                <p className="text-sm font-medium">Steps to complete:</p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open UAE PASS app on your phone</li>
                  <li>Go to pending requests / notifications</li>
                  <li>Review the contract signing request</li>
                  <li>Enter your PIN or use biometric to approve</li>
                </ol>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                Didn't receive the notification? Check your UAE PASS app is updated and connected.
              </p>
            </div>
          </>
        )}

        {step === "timeout" && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">Request Timed Out</h3>
              <p className="text-muted-foreground text-sm mt-1">
                We didn't receive a response from UAE PASS in time.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-left space-y-2">
              <p className="text-sm font-medium">What you can try:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Make sure UAE PASS app is installed and updated</li>
                <li>Check your internet connection</li>
                <li>Ensure notifications are enabled for UAE PASS</li>
                <li>Try opening UAE PASS manually to check for pending requests</li>
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="gold" className="flex-1" onClick={handleRetry}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
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
            <div className="bg-muted/30 rounded-lg p-4 text-left text-sm space-y-1">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Contract ID:</span> {contract.id.slice(0, 8).toUpperCase()}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Signed by:</span> {signerName}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Role:</span> {roleLabels[signerRole]}
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Signed at:</span> {new Date().toLocaleString("en-GB")}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download Signed PDF
              </Button>
              <Button variant="gold" className="flex-1" onClick={handleClose}>
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
