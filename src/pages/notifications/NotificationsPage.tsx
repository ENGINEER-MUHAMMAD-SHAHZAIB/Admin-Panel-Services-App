import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const initialNotifications = [
    { id: 1, title: 'New Service Application', message: 'Technician "John Doe" applied for verification.', time: '2 mins ago', type: 'info' },
    { id: 2, title: 'High Demand in Riyadh Zone 1', message: 'Orders exceeding available technicians by 20%.', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'System Backup Completed', message: 'Daily database backup finished successfully.', time: '3 hours ago', type: 'success' },
    { id: 4, title: 'Subscription Expiring', message: 'Premium plan expires in 2 days.', time: '5 hours ago', type: 'warning' },
    { id: 5, title: 'New User Registered', message: 'Welcome a new user to the platform.', time: '1 day ago', type: 'info' },
];

export const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handleClearAll = () => {
        setNotifications([]);
        toast.success("All notifications cleared");
    };

    const handleMarkAllRead = () => {
        toast.success("All notifications marked as read");
        // Visual logic could be added here (e.g., removing 'unread' dot)
    };

    const handleDeleteOne = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id));
        toast.success("Notification removed");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Notifications Center</h2>
                <div className="flex gap-4">
                    <Button variant="ghost" className="text-[#0E7490] hover:text-[#155E75] hover:bg-cyan-50" onClick={handleMarkAllRead}>
                        Mark all as read
                    </Button>
                    <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleClearAll}>
                        Clear all
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-[#0F172A]">Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-0 p-0">
                    {notifications.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">
                            No new notifications
                        </div>
                    ) : (
                        notifications.map((notif) => (
                            <div key={notif.id} className="flex items-start gap-4 p-4 hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0 group">
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center mt-1 flex-shrink-0
                                    ${notif.type === 'info' ? 'bg-blue-50 text-blue-600' :
                                        notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                                            'bg-green-50 text-green-600'}
                                `}>
                                    {notif.type === 'info' && <Info className="h-5 w-5" />}
                                    {notif.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                                    {notif.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-slate-900">{notif.title}</p>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 -mt-1"
                                            onClick={() => handleDeleteOne(notif.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                    <p className="text-sm text-slate-600 mt-0.5">{notif.message}</p>
                                    <p className="text-xs text-slate-400 mt-2">{notif.time}</p>
                                </div>
                                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
