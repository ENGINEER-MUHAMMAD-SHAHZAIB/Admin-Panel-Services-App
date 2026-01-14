import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Wrench,
    Map,
    Settings,
    LogOut,
    Menu,
    UserCog,
    List,
    Image as ImageIcon,
    Bell,
    MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingBag, label: 'Bookings', path: '/orders' }, // Renamed from Orders to Bookings as per ref
    { icon: UserCog, label: 'Technicians', path: '/technicians' },
    { icon: Wrench, label: 'Services', path: '/services' },
    { icon: List, label: 'Categories', path: '/categories' }, // New
    { icon: ImageIcon, label: 'Event Banner', path: '/banners' }, // New
    { icon: Map, label: 'Zones', path: '/zones' },
    { icon: Bell, label: 'Notifications', path: '/notifications' }, // New
    { icon: MessageSquare, label: 'Queries', path: '/queries' }, // New
    { icon: Settings, label: 'Setting', path: '/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto shadow-[4px_0_24px_-2px_rgba(0,0,0,0.05)] border-r border-gray-100 no-scrollbar",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-20 items-center px-6 mb-2">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                            <span className="font-bold text-xl">A</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900">Adawat</span>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden ml-auto text-gray-500 hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="space-y-1.5 px-4 pb-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }: { isActive: boolean }) =>
                                cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 relative overflow-hidden group",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )
                            }
                        >
                            <item.icon className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                ({ isActive }: { isActive: boolean }) => isActive ? "" : "text-gray-400 group-hover:text-primary"
                            )} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}

                    <div className="my-6 border-t border-gray-100 mx-2" />

                    <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 group">
                        <LogOut className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        <span>Log out</span>
                    </button>
                </nav>
            </aside>
        </>
    );
};
