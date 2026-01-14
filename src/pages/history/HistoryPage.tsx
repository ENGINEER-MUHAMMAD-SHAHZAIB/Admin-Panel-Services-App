import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, User, FileText, Settings as SettingsIcon } from 'lucide-react';

const mockLogs = [
    { id: 1, action: 'Order Created', user: 'System', details: 'Order #ORD-009 created', time: '2 mins ago', icon: FileText, color: 'text-blue-500' },
    { id: 2, action: 'Technician Verified', user: 'Admin Shahzaib', details: 'Verified technician Ahmed Khan', time: '1 hour ago', icon: User, color: 'text-green-500' },
    { id: 3, action: 'Settings Updated', user: 'Super Admin', details: 'Updated commission rates', time: '3 hours ago', icon: SettingsIcon, color: 'text-orange-500' },
    { id: 4, action: 'Login Detected', user: 'Controller Ali', details: 'Login from new IP', time: '5 hours ago', icon: History, color: 'text-purple-500' },
];

export const HistoryPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">System History</h2>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Recent Activity Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {mockLogs.map((log) => (
                            <div key={log.id} className="flex items-center">
                                <div className={`h-9 w-9 rounded-full border flex items-center justify-center ${log.color} bg-background`}>
                                    <log.icon className="h-5 w-5" />
                                </div>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{log.action}</p>
                                    <p className="text-sm text-muted-foreground">
                                        by <span className="font-semibold">{log.user}</span> - {log.details}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-xs text-muted-foreground">{log.time}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
