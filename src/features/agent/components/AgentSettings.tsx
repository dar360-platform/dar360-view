import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Building2,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface AgentProfile {
  name: string;
  email: string;
  phone: string;
  agencyName: string;
  reraNumber: string;
  location: string;
}

interface NotificationSettings {
  emailViewingReminders: boolean;
  emailContractUpdates: boolean;
  smsViewingReminders: boolean;
  smsNewLeads: boolean;
  pushNotifications: boolean;
}

export const AgentSettings = () => {
  const [profile, setProfile] = useState<AgentProfile>({
    name: "Ahmed Khan",
    email: "ahmed@abcrealestate.ae",
    phone: "+971 55 123 4567",
    agencyName: "ABC Real Estate",
    reraNumber: "BRN-12345",
    location: "Dubai Marina, Dubai",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailViewingReminders: true,
    emailContractUpdates: true,
    smsViewingReminders: true,
    smsNewLeads: false,
    pushNotifications: true,
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
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal and agency details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl font-semibold text-accent">AK</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.agencyName}</p>
              <Badge variant="outline" className="mt-1">
                <Check className="w-3 h-3 mr-1" /> Verified Agent
              </Badge>
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
              <Label htmlFor="location">Office Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Agency Details */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Agency Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agency">Agency Name</Label>
                <Input
                  id="agency"
                  value={profile.agencyName}
                  onChange={(e) => setProfile({ ...profile, agencyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rera">RERA/BRN Number</Label>
                <Input
                  id="rera"
                  value={profile.reraNumber}
                  onChange={(e) => setProfile({ ...profile, reraNumber: e.target.value })}
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

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email Notifications
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Viewing Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before scheduled viewings</p>
                </div>
                <Switch
                  checked={notifications.emailViewingReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailViewingReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Contract Updates</p>
                  <p className="text-sm text-muted-foreground">Receive updates when contracts are signed</p>
                </div>
                <Switch
                  checked={notifications.emailContractUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailContractUpdates: checked })}
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
                  <p className="font-medium text-sm">Viewing Reminders</p>
                  <p className="text-sm text-muted-foreground">SMS reminder 1 hour before viewing</p>
                </div>
                <Switch
                  checked={notifications.smsViewingReminders}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, smsViewingReminders: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">New Lead Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when someone views your listing</p>
                </div>
                <Switch
                  checked={notifications.smsNewLeads}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, smsNewLeads: checked })}
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
                  Add an extra layer of security to your account using UAE PASS or an authenticator app.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
