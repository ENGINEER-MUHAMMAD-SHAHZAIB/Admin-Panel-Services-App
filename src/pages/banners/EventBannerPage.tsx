import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Image as ImageIcon, Trash2 } from 'lucide-react';
import { AddBannerModal } from '@/components/modules/banners/AddBannerModal';
import { toast } from 'sonner';

const initialBanners = [
    { id: 1, title: 'Ramadan Special Offer', expiry: '2024-04-10' },
    { id: 2, title: 'Summer Sale', expiry: '2024-08-31' },
    { id: 3, title: 'New User Discount', expiry: '2024-12-31' },
];

export const EventBannerPage: React.FC = () => {
    const [banners, setBanners] = useState(initialBanners);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAddBanner = (newBanner: any) => {
        setBanners([newBanner, ...banners]);
    };

    const handleDeleteBanner = (id: number) => {
        setBanners(banners.filter(b => b.id !== id));
        toast.success("Banner deleted successfully");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Event Banners</h2>
                <Button className="bg-[#0E7490] hover:bg-[#155E75]" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Banner
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {banners.map((banner) => (
                    <Card key={banner.id} className="bg-white/80 backdrop-blur-md shadow-sm border-none overflow-hidden group relative">
                        <div className="aspect-video w-full bg-slate-100 flex items-center justify-center relative">
                            {/* Placeholder for banner image */}
                            <ImageIcon className="h-12 w-12 text-slate-300" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteBanner(banner.id)}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            </div>
                        </div>
                        <CardHeader className="p-4">
                            <CardTitle className="text-base text-slate-900">{banner.title}</CardTitle>
                            <CardDescription className="text-slate-500">Active until {banner.expiry}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <AddBannerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddBanner}
            />
        </div>
    );
};
