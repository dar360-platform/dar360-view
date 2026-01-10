import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  User,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Phone,
  CreditCard,
  Camera,
  Save,
  Eye,
  EyeOff,
  Search,
  MapPin,
  Home,
} from "lucide-react";
import { toast } from "sonner";

interface TenantProfile {
  name: string;
  email: string;
  phone: string;
  emiratesId: string;
  nationality: string;
}

interface NotificationSettings {
  emailViewingReminders: boolean;
  emailNewListings: boolean;
  emailContractUpdates: boolean;
  smsViewingReminders: boolean;
  pushNotifications: boolean;
}

interface SearchPreferences {
  preferredAreas: string[];
  minBeds: string;
  maxBeds: string;
  minBudget: string;
  maxBudget: string;
  propertyType: string;
}

export const TenantSettings = () => {
  const [profile, setProfile] = useState<TenantProfile>({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+971 55 987 6543",
    emiratesId: "784-****-*****-1",
    nationality: "United Kingdom",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailViewingReminders: true,
    emailNewListings: true,
    emailContractUpdates: true,
    smsViewingReminders: false,
    pushNotifications: true,
  });

  const [searchPrefs, setSearchPrefs] = useState<SearchPreferences>({
    preferredAreas: ["Dubai Marina", "Downtown Dubai"],
    minBeds: "1",
    maxBeds: "3",
    minBudget: "80000",
    maxBudget: "200000",
    propertyType: "apartment",
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

  const handleSaveSearchPrefs = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    toast.success("Search preferences saved");
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
                <span className="text-2xl font-semibold text-accent">JS</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <p className="font-medium">{profile.name}</p>
              <p className="text-sm text-muted-foreground">Tenant</p>
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
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={profile.nationality}
                onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
              />
            </div>
          </div>

          <Separator />

          {/* ID Details */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> Identity Documents
            </h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Emirates ID</p>
                  <p className="text-sm text-muted-foreground">{profile.emiratesId}</p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
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

      {/* Search Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search Preferences
          </CardTitle>
          <CardDescription>Set your default search filters and get matched listings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select
                value={searchPrefs.propertyType}
                onValueChange={(value) => setSearchPrefs({ ...searchPrefs, propertyType: value })}
              >
                <SelectTrigger>
                  <Home className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Bedrooms</Label>
              <div className="flex items-center gap-2">
                <Select
                  value={searchPrefs.minBeds}
                  onValueChange={(value) => setSearchPrefs({ ...searchPrefs, minBeds: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">to</span>
                <Select
                  value={searchPrefs.maxBeds}
                  onValueChange={(value) => setSearchPrefs({ ...searchPrefs, maxBeds: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Max" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5+">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Min Budget (AED/year)</Label>
              <Input
                type="number"
                value={searchPrefs.minBudget}
                onChange={(e) => setSearchPrefs({ ...searchPrefs, minBudget: e.target.value })}
                placeholder="80,000"
              />
            </div>

            <div className="space-y-2">
              <Label>Max Budget (AED/year)</Label>
              <Input
                type="number"
                value={searchPrefs.maxBudget}
                onChange={(e) => setSearchPrefs({ ...searchPrefs, maxBudget: e.target.value })}
                placeholder="200,000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Preferred Areas
            </Label>
            <div className="flex flex-wrap gap-2">
              {searchPrefs.preferredAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full flex items-center gap-2"
                >
                  {area}
                  <button
                    onClick={() => setSearchPrefs({
                      ...searchPrefs,
                      preferredAreas: searchPrefs.preferredAreas.filter(a => a !== area)
                    })}
                    className="hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-border text-sm rounded-full text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                + Add Area
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={handleSaveSearchPrefs} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
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
                  <p className="font-medium text-sm">New Listings</p>
                  <p className="text-sm text-muted-foreground">Get notified about new properties matching your preferences</p>
                </div>
                <Switch
                  checked={notifications.emailNewListings}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNewListings: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Contract Updates</p>
                  <p className="text-sm text-muted-foreground">Updates about your applications and contracts</p>
                </div>
                <Switch
                  checked={notifications.emailContractUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailContractUpdates: checked })}
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4" /> SMS Viewing Reminders
              </p>
              <p className="text-sm text-muted-foreground">Receive SMS 1 hour before viewings</p>
            </div>
            <Switch
              checked={notifications.smsViewingReminders}
              onCheckedChange={(checked) => setNotifications({ ...notifications, smsViewingReminders: checked })}
            />
          </div>

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
    </motion.div>
  );
};
