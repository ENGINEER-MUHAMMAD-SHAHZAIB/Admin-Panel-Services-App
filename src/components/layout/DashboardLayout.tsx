import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const DashboardLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <div
                className={cn(
                    "flex min-h-screen flex-col transition-all duration-300 ease-in-out",
                    sidebarOpen ? "lg:pl-64" : "lg:pl-0"
                )}
            >
                <Header />
                <main className="flex-1 p-6 overflow-x-hidden">
                    <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-300">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
