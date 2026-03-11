import { useState } from "react";
import { ArrowLeft, User, Lock, CreditCard, Bell, Palette, HelpCircle, LogOut, Edit2, Upload, Star, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    name: "Alex Nguyen",
    email: "alex.nguyen@example.com",
    phone: "+84 987 654 321",
  });

  // Settings data
  const [settings, setSettings] = useState({
    theme: "dark",
    language: "vi",
    notificationEmail: true,
    notificationSms: false,
    notificationApp: true,
    reminderShowtime: true,
    memberOffers: true,
    watchlistNotif: true,
    privacyShow: true,
    defaultTheater: "Cineplex Central",
  });

  // Saved payment methods
  const [paymentMethods] = useState([
    { id: 1, type: "visa", last4: "4242", name: "Visa Card" },
    { id: 2, type: "momo", last4: "0987", name: "MoMo Wallet" },
  ]);

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "membership", label: "Membership", icon: Gift },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  const handleLogout = () => {
    setLocation("/auth");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary/20 to-transparent border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/profile")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                  {/* Avatar Section */}
                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-3xl font-bold">
                        AN
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Profile Picture</h3>
                        <p className="text-sm text-muted-foreground mb-4">Update your avatar or choose from character themes</p>
                        <Button className="gap-2">
                          <Upload className="w-4 h-4" /> Change Avatar
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email Address</Label>
                          <Input
                            value={profileData.email}
                            type="email"
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number</Label>
                          <Input
                            value={profileData.phone}
                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                            className="bg-black/40 border-white/10"
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                          <Button variant="outline" className="border-white/10" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                            <p className="font-semibold">{profileData.name}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                            <Edit2 className="w-4 h-4" /> Edit
                          </Button>
                        </div>
                        <Separator className="bg-white/10" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Email Address</p>
                          <p className="font-semibold">{profileData.email}</p>
                        </div>
                        <Separator className="bg-white/10" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                          <p className="font-semibold">{profileData.phone}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6 mt-6">
                    <h3 className="font-semibold mb-4">Connected Accounts</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full border-white/10 justify-start h-11">
                        Connect with Facebook
                      </Button>
                      <Button variant="outline" className="w-full border-white/10 justify-start h-11">
                        Connect with Google
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Security Settings</h2>
                
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Current Password</Label>
                        <Input type="password" className="bg-black/40 border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <Label>New Password</Label>
                        <Input type="password" className="bg-black/40 border-white/10" />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm New Password</Label>
                        <Input type="password" className="bg-black/40 border-white/10" />
                      </div>
                      <Button>Update Password</Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" /> Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                    <Button>Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Payments */}
            {activeTab === "payments" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Payment Methods</h2>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Saved Cards & Wallets</h3>
                  <div className="space-y-3">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-white/10">
                        <div>
                          <p className="font-semibold">{method.name}</p>
                          <p className="text-xs text-muted-foreground">••••••••••••{method.last4}</p>
                        </div>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Add New Payment Method</Button>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Wallet Balance</h3>
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-2">Current Balance</p>
                    <p className="text-4xl font-bold text-primary">₫250,000</p>
                  </div>
                  <Button className="w-full">Top Up Wallet</Button>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Transaction History</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                      <span>Booking - The Silent Echo</span>
                      <span className="text-red-500">-₫480,000</span>
                    </div>
                    <div className="flex justify-between p-3 bg-black/40 rounded-lg">
                      <span>Wallet Top Up</span>
                      <span className="text-green-500">+₫500,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Notification Settings</h2>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <h3 className="font-semibold mb-4">Notification Channels</h3>
                  <div className="space-y-4">
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.notificationEmail}
                        onCheckedChange={(checked) => setSettings({ ...settings, notificationEmail: checked as boolean })}
                        className="border-white/20"
                      />
                      <span className="font-medium">Email Notifications</span>
                    </Label>
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.notificationSms}
                        onCheckedChange={(checked) => setSettings({ ...settings, notificationSms: checked as boolean })}
                        className="border-white/20"
                      />
                      <span className="font-medium">SMS Notifications</span>
                    </Label>
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.notificationApp}
                        onCheckedChange={(checked) => setSettings({ ...settings, notificationApp: checked as boolean })}
                        className="border-white/20"
                      />
                      <span className="font-medium">App Notifications</span>
                    </Label>
                  </div>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <h3 className="font-semibold mb-4">Notification Types</h3>
                  <div className="space-y-4">
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.reminderShowtime}
                        onCheckedChange={(checked) => setSettings({ ...settings, reminderShowtime: checked as boolean })}
                        className="border-white/20"
                      />
                      <div>
                        <span className="font-medium">Showtime Reminders</span>
                        <p className="text-xs text-muted-foreground">Remind 30-60 minutes before showtime</p>
                      </div>
                    </Label>
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.memberOffers}
                        onCheckedChange={(checked) => setSettings({ ...settings, memberOffers: checked as boolean })}
                        className="border-white/20"
                      />
                      <div>
                        <span className="font-medium">Member Offers</span>
                        <p className="text-xs text-muted-foreground">Special deals and promotions</p>
                      </div>
                    </Label>
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.watchlistNotif}
                        onCheckedChange={(checked) => setSettings({ ...settings, watchlistNotif: checked as boolean })}
                        className="border-white/20"
                      />
                      <div>
                        <span className="font-medium">Watchlist Alerts</span>
                        <p className="text-xs text-muted-foreground">When movies in your list go on sale</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "preferences" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">App Preferences</h2>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-4">Theme</h3>
                    <RadioGroup value={settings.theme} onValueChange={(value) => setSettings({ ...settings, theme: value })}>
                      <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg mb-2">
                        <RadioGroupItem value="dark" className="text-primary" />
                        <span className="font-medium">Dark Mode</span>
                      </Label>
                      <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                        <RadioGroupItem value="light" className="text-primary" />
                        <span className="font-medium">Light Mode</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-4">Language</h3>
                    <RadioGroup value={settings.language} onValueChange={(value) => setSettings({ ...settings, language: value })}>
                      <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg mb-2">
                        <RadioGroupItem value="vi" className="text-primary" />
                        <span className="font-medium">Tiếng Việt</span>
                      </Label>
                      <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                        <RadioGroupItem value="en" className="text-primary" />
                        <span className="font-medium">English</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-4">Default Theater</h3>
                    <p className="text-sm text-muted-foreground mb-4">Choose your preferred cinema location</p>
                    <select className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-foreground">
                      <option>Cineplex Central</option>
                      <option>Starlight Arena</option>
                      <option>Galaxy ScreenX</option>
                      <option>Premier Gold Class</option>
                      <option>Mega Cinema Hub</option>
                    </select>
                  </div>
                </div>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-5">
                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" /> Privacy
                    </h3>
                    <Label className="flex items-center gap-3 cursor-pointer p-3 bg-black/40 rounded-lg">
                      <Checkbox
                        checked={settings.privacyShow}
                        onCheckedChange={(checked) => setSettings({ ...settings, privacyShow: checked as boolean })}
                        className="border-white/20"
                      />
                      <div>
                        <span className="font-medium">Show activity to friends</span>
                        <p className="text-xs text-muted-foreground">Share your movie activity with friends</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Membership */}
            {activeTab === "membership" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Membership & Rewards</h2>

                {/* Current Status */}
                <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Status</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        <h3 className="text-3xl font-bold">GOLD MEMBER</h3>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">Active</Badge>
                  </div>
                </div>

                {/* Points & Progress */}
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Reward Points</h3>
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground mb-2">Current Points</p>
                      <p className="text-5xl font-bold text-primary">2,450</p>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" /> Progress to Platinum
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">Need 5,550 more points</p>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-purple-600" style={{ width: "31%" }} />
                    </div>
                  </div>
                </div>

                {/* Perks */}
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4">Gold Member Perks</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>10% discount on all snacks</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Free ticket exchange (up to 2 per month)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Early access to special screenings</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Birthday voucher (₫100,000 value)</span>
                    </li>
                  </ul>
                </div>

                {/* Redeem Rewards */}
                <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Gift className="w-5 h-5 text-primary" /> Redeem Rewards
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                      <span>₫50,000 voucher (1,000 pts)</span>
                      <Button size="sm" variant="outline" className="border-white/10">Redeem</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                      <span>Free popcorn (500 pts)</span>
                      <Button size="sm" variant="outline" className="border-white/10">Redeem</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                      <span>Free medium drink (300 pts)</span>
                      <Button size="sm" variant="outline" className="border-white/10">Redeem</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Support */}
            {activeTab === "support" && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Help & Support</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Help Center</h3>
                    <p className="text-sm text-muted-foreground mb-4">Find answers to common questions</p>
                    <Button variant="outline" className="w-full border-white/10">Visit Help Center</Button>
                  </div>

                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Contact Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">Get help from our support team</p>
                    <Button variant="outline" className="w-full border-white/10">Contact Support</Button>
                  </div>

                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Terms of Service</h3>
                    <p className="text-sm text-muted-foreground mb-4">Read our terms and conditions</p>
                    <Button variant="outline" className="w-full border-white/10">View Terms</Button>
                  </div>

                  <div className="bg-card/30 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-semibold mb-3">Privacy Policy</h3>
                    <p className="text-sm text-muted-foreground mb-4">Learn how we protect your data</p>
                    <Button variant="outline" className="w-full border-white/10">View Policy</Button>
                  </div>
                </div>

                <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6">
                  <h3 className="font-semibold mb-3 text-red-500">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="destructive" className="w-full">Delete Account</Button>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 h-12 gap-2 text-base"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" /> Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
