import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={cn("sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-gray-100 bg-white/95 backdrop-blur-md px-8 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]", className)}>
            <div className="flex-1">
                <div className="relative w-full max-w-md group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="search"
                        placeholder="Search dashboard..."
                        className="h-11 w-full rounded-xl border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </Button>
                <div className="flex items-center gap-2 border-l pl-4 border-border">
                    <div className="text-sm text-right hidden md:block">
                        <p className="font-medium">Shahzaib Admin</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/10">
                        <span className="text-xs font-semibold text-primary">SA</span>
                    </div>
                </div>
            </div>
        </header>
    );
};
