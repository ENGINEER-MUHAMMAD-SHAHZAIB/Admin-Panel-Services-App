import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ControllersPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Controllers Management</h2>
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Controllers List</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Manage zone controllers here (Coming Soon)</p>
                </CardContent>
            </Card>
        </div>
    );
};
