import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Phone,
  Camera,
  Save,
  Eye,
  EyeOff,
  CreditCard,
  Building2,
  Banknote,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface OwnerProfile {
  name: string;
  email: string;
  phone: string;
  emiratesId: string;
}

interface NotificationSettings {
  emailViewingUpdates: boolean;
  emailContractUpdates: boolean;
  emailMonthlyReports: boolean;
  smsViewingAlerts: boolean;
  smsContractSigned: boolean;
  pushNotifications: boolean;
}

interface BankDetails {
  bankName: string;
  accountName: string;
  iban: string;
}

export const OwnerSettings = () => {
  const [profile, setProfile] = useState<OwnerProfile>({
    name: "Sara Ahmed",
    email: "sara.ahmed@email.com",
    phone: "+971 50 123 4567",
    emiratesId: "784-****-*****-1",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailViewingUpdates: true,
    emailContractUpdates: true,
    emailMonthlyReports: true,
    smsViewingAlerts: false,
    smsContractSigned: true,
    pushNotifications: true,
  });

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    accountName: "",
    iban: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Profile updated successfully");
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast.success("Notification preferences saved");
  };

  const handleSaveBankDetails = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    toast.success("Bank details saved securely");
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("Passwords don't match");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setPasswords({ current: "", new: "", confirm: "" });
    toast.success("Password changed successfully");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl font-semibold text-accent">SA</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted-foreground">Property Owner</p>
            </div>
          </div>

          <Separator />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eid">Emirates ID</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="eid"
                  value={profile.emiratesId}
                  disabled
                  className="pl-10 bg-muted"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="gold" onClick={handleSaveProfile} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            Bank Details
            <span className="text-xs font-normal text-muted-foreground ml-2">(Optional)</span>
          </CardTitle>
          <CardDescription>Add your bank details for rent collection reference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                placeholder="Emirates NBD"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Holder Name</Label>
              <Input
                id="accountName"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                placeholder="Sara Ahmed"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input
                id="iban"
                value={bankDetails.iban}
                onChange={(e) => setBankDetails({ ...bankDetails, iban: e.target.value })}
                placeholder="AE12 3456 7890 1234 5678 901"
              />
            </div>
          </div>

          <div className="p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
            <p>Your bank details are stored securely and only shared with tenants when contracts are signed.</p>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleSaveBankDetails} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Bank Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified about your properties</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Viewing Updates</p>
                  <p className="text-sm text-muted-foreground">Get notified when viewings are scheduled or completed</p>
                </div>
                <Switch
                  checked={notifications.emailViewingUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailViewingUpdates: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Contract Updates</p>
                  <p className="text-sm text-muted-foreground">Notifications when contracts are created or signed</p>
                </div>
                <Switch
                  checked={notifications.emailContractUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailContractUpdates: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Monthly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive monthly summary of property activity</p>
                </div>
                <Switch
                  checked={notifications.emailMonthlyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailMonthlyReports: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> SMS Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Viewing Alerts</p>
                  <p className="text-sm text-muted-foreground">SMS when a viewing is scheduled for your property</p>
                </div>
                <Switch
                  checked={notifications.smsViewingAlerts}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, smsViewingAlerts: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Contract Signed</p>
                  <p className="text-sm text-muted-foreground">Instant SMS when a tenant signs the contract</p>
                </div>
                <Switch
                  checked={notifications.smsContractSigned}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, smsContractSigned: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Enable browser/app push notifications</p>
            </div>
            <Switch
              checked={notifications.pushNotifications}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
            />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleSaveNotifications} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your password and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Change Password</h3>
            <div className="grid gap-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleChangePassword}
              disabled={!passwords.current || !passwords.new || !passwords.confirm || isSaving}
            >
              Update Password
            </Button>
          </div>

          <Separator />

          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-accent mt-0.5" />
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security using UAE PASS or an authenticator app.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Management Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Your Properties
          </CardTitle>
          <CardDescription>Overview of properties linked to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">2 Properties</p>
                  <p className="text-sm text-muted-foreground">Managed by ABC Real Estate</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              To add or remove properties, please contact your property agent.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
