import React, { useState, useEffect } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Palette, UserCircle, LogOut } from 'lucide-react';

const notificationTimes = ["08:00 AM", "09:00 AM", "10:00 AM", "07:00 PM", "08:00 PM"];
const themes = ["System", "Light", "Dark"];

const SettingsPage = () => {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [notificationTime, setNotificationTime] = useState("09:00 AM");
  const [selectedTheme, setSelectedTheme] = useState("System");
  const [email, setEmail] = useState("user@example.com");
  // const [password, setPassword] = useState(""); // Not used directly for security
  const { toast } = useToast();

  useEffect(() => {
    console.log('SettingsPage loaded');
    // In a real app, load settings from user preferences
  }, []);

  const handleSaveChanges = (section: string) => {
    // In a real app, save these settings
    console.log(`Saving ${section} settings:`, { enableNotifications, notificationTime, selectedTheme, email });
    toast({
      title: "Settings Saved",
      description: `Your ${section.toLowerCase()} preferences have been updated.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-1">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences.</p>
        </header>

        <Card className="w-full max-w-2xl mx-auto shadow-lg">
          <CardContent className="p-0">
            <Accordion type="single" collapsible defaultValue="notifications" className="w-full">
              <AccordionItem value="notifications">
                <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                  <div className="flex items-center">
                    <Bell className="mr-3 h-5 w-5 text-primary" /> Notifications
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 space-y-6 bg-muted/20">
                  <div className="flex items-center justify-between space-x-2 p-4 border rounded-md">
                    <Label htmlFor="enable-notifications" className="text-base">Enable Daily Notifications</Label>
                    <Switch
                      id="enable-notifications"
                      checked={enableNotifications}
                      onCheckedChange={setEnableNotifications}
                    />
                  </div>
                  {enableNotifications && (
                    <div className="space-y-2 p-4 border rounded-md">
                      <Label htmlFor="notification-time" className="text-base">Preferred Time</Label>
                      <Select value={notificationTime} onValueChange={setNotificationTime}>
                        <SelectTrigger id="notification-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {notificationTimes.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <Button onClick={() => handleSaveChanges('Notification')} className="w-full sm:w-auto">Save Notification Settings</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="theme">
                <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                  <div className="flex items-center">
                    <Palette className="mr-3 h-5 w-5 text-primary" /> Theme
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 space-y-4 bg-muted/20">
                  <div className="space-y-2 p-4 border rounded-md">
                    <Label htmlFor="theme-select" className="text-base">Choose Theme</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger id="theme-select">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map(theme => (
                          <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Theme changes might require an app refresh (not implemented).</p>
                  </div>
                  <Button onClick={() => handleSaveChanges('Theme')} className="w-full sm:w-auto">Save Theme Settings</Button>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="account">
                <AccordionTrigger className="px-6 py-4 text-lg hover:no-underline">
                  <div className="flex items-center">
                    <UserCircle className="mr-3 h-5 w-5 text-primary" /> Account
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2 space-y-6 bg-muted/20">
                  <div className="space-y-2 p-4 border rounded-md">
                    <Label htmlFor="email" className="text-base">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2 p-4 border rounded-md">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="New Password" />
                    <Input id="confirm-password" type="password" placeholder="Confirm New Password" />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <Button onClick={() => handleSaveChanges('Account')} className="w-full sm:w-auto">Update Account Info</Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground p-4 border rounded-md">Account synchronization and data backup are conceptual features for this app.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SettingsPage;