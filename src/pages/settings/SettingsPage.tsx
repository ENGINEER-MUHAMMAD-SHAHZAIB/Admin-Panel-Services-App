import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from 'sonner';

export const SettingsPage: React.FC = () => {
    const [generalData, setGeneralData] = useState({
        appName: 'Adawat Services',
        email: 'support@adawat.com',
        phone: '+966 50 000 0000'
    });

    const [notifications, setNotifications] = useState({
        email: true,
        push: true
    });

    const handleSaveGeneral = () => {
        toast.success("General settings saved successfully");
    };

    const handleToggleNotification = (key: 'email' | 'push') => {
        const newState = !notifications[key];
        setNotifications(prev => ({ ...prev, [key]: newState }));
        toast.info(`${key === 'email' ? 'Email' : 'Push'} notifications ${newState ? 'enabled' : 'disabled'}`);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Settings</h2>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start bg-white/50 backdrop-blur-sm p-1">
                    <TabsTrigger value="general" className="data-[state=active]:bg-[#0E7490] data-[state=active]:text-white">General</TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-[#0E7490] data-[state=active]:text-white">Notifications</TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-[#0E7490] data-[state=active]:text-white">Security</TabsTrigger>
                    <TabsTrigger value="billing" className="data-[state=active]:bg-[#0E7490] data-[state=active]:text-white">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="mt-6">
                    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-[#0F172A]">Platform Details</CardTitle>
                            <CardDescription>Manage your platform's general information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="storeName">App Name</Label>
                                <Input
                                    id="storeName"
                                    value={generalData.appName}
                                    onChange={(e) => setGeneralData({ ...generalData, appName: e.target.value })}
                                    className="bg-white border-slate-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="supportEmail">Support Email</Label>
                                <Input
                                    id="supportEmail"
                                    value={generalData.email}
                                    onChange={(e) => setGeneralData({ ...generalData, email: e.target.value })}
                                    className="bg-white border-slate-200"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input
                                    id="phone"
                                    value={generalData.phone}
                                    onChange={(e) => setGeneralData({ ...generalData, phone: e.target.value })}
                                    className="bg-white border-slate-200"
                                />
                            </div>
                            <div className="pt-4">
                                <Button className="bg-[#0E7490] hover:bg-[#155E75]" onClick={handleSaveGeneral}>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-[#0F172A]">Notification Preferences</CardTitle>
                            <CardDescription>Configure how you receive alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-slate-800">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive emails about new bookings.</p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={() => handleToggleNotification('email')}
                                />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white p-4">
                                <div className="space-y-0.5">
                                    <Label className="text-base text-slate-800">Push Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive push alerts for urgent issues.</p>
                                </div>
                                <Switch
                                    checked={notifications.push}
                                    onCheckedChange={() => handleToggleNotification('push')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-6">
                    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-[#0F172A]">Security Settings</CardTitle>
                            <CardDescription>Manage your account security.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-amber-50 text-amber-800 rounded-md text-sm">
                                Security settings are disabled in this demo version.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing" className="mt-6">
                    <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                        <CardHeader>
                            <CardTitle className="text-[#0F172A]">Billing & Plans</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-blue-50 text-blue-800 rounded-md text-sm">
                                You are currently on the <strong>Premium Enterprise Plan</strong>.
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
