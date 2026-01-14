import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface AddZoneModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (zone: any) => void;
}

export const AddZoneModal: React.FC<AddZoneModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
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
        if (!name) {
            toast.error("Zone name is required");
            return;
        }

        const newZone = {
            id: Math.floor(Math.random() * 1000) + 20,
            name,
            services: 0,
            workers: 0,
            orders: 0,
            icon: imagePreview
        };

        onAdd(newZone);
        toast.success("Zone added successfully");
        onClose();
        setName('');
        setImagePreview(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium">Add Zone</DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="p-8 grid gap-8">
                    <div className="flex items-center gap-8">
                        {/* Image Upload */}
                        <div className="flex flex-col items-center gap-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <div
                                className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                                onClick={triggerFileInput}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="h-6 w-6 text-[#0E7490] mx-auto mb-1" />
                                        <span className="text-xs text-[#0E7490] font-medium">Upload Icon</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-semibold text-gray-700">Zone Name *</label>
                                <Input
                                    placeholder="e.g., Downtown"
                                    className="bg-gray-50 border-gray-200"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-4">
                        <Button variant="outline" className="flex-1 h-12 bg-gray-400/50 hover:bg-gray-400/70 text-white border-none" onClick={onClose}>
                            Discard
                        </Button>
                        <Button className="flex-1 h-12 bg-[#0E7490] hover:bg-[#155E75] text-white" onClick={handleSubmit}>
                            Add Zone
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
