import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface AddBannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (banner: any) => void;
}

export const AddBannerModal: React.FC<AddBannerModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [expiry, setExpiry] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = () => {
        if (!title || !expiry) {
            toast.error("Please fill in all fields");
            return;
        }

        const newBanner = {
            id: Math.floor(Math.random() * 1000),
            title,
            expiry,
            status: 'Active',
            image: imagePreview
        };

        onAdd(newBanner);
        toast.success("Event Banner added successfully");
        onClose();
        setTitle('');
        setExpiry('');
        setImagePreview(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium">Add Banner</DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="p-8 grid gap-8">
                    <div className="flex items-start gap-8">
                        {/* Image Upload */}
                        <div className="flex flex-col items-center gap-2 mt-2 w-full">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <div className="h-32 w-full aspect-video rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors px-12 overflow-hidden"
                                onClick={triggerFileInput}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="h-8 w-8 text-[#0E7490] mx-auto mb-2" />
                                        <span className="text-xs text-[#0E7490] font-medium">Upload Banner Image</span>
                                    </div>
                                )}
                            </div>
                            {imagePreview && (
                                <button onClick={() => setImagePreview(null)} className="text-xs text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-semibold text-gray-700">Banner Title *</label>
                            <Input
                                placeholder="e.g., Ramadan Special Offer"
                                className="bg-gray-50 border-gray-200"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-semibold text-gray-700">Expiry Date *</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Select date"
                                    className="pl-9 bg-gray-50 border-gray-200"
                                    type="date"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-2">
                        <Button variant="outline" className="flex-1 h-12 bg-gray-400/50 hover:bg-gray-400/70 text-white border-none" onClick={onClose}>
                            Discard
                        </Button>
                        <Button className="flex-1 h-12 bg-[#0E7490] hover:bg-[#155E75] text-white" onClick={handleSubmit}>
                            Add Banner
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
