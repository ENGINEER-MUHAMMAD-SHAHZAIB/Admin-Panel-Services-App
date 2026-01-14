import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface AddWorkerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (worker: any) => void;
}

export const AddWorkerModal: React.FC<AddWorkerModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [zone, setZone] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
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
        if (!name || !phone || !zone) {
            toast.error("Please fill in required fields (Name, Phone, Zone)");
            return;
        }

        const newWorker = {
            id: Math.floor(Math.random() * 1000) + 20,
            name,
            phone,
            email,
            city: city || 'Unknown',
            activeOrders: 0,
            completedOrders: 0,
            status: 'Active',
            image: imagePreview
        };

        onAdd(newWorker);
        toast.success("Technician added successfully");
        onClose();

        // Reset
        setName('');
        setPhone('');
        setEmail('');
        setCity('');
        setZone('');
        setCategory('');
        setImagePreview(null);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium">Add Technician</DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="p-8 grid gap-8">
                    <div className="flex items-start gap-8">
                        {/* Image Upload */}
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                            <div
                                className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                                onClick={triggerFileInput}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <Upload className="h-8 w-8 text-[#0E7490] mx-auto mb-2" />
                                        <span className="text-xs text-[#0E7490] font-medium">Upload Image</span>
                                    </div>
                                )}
                            </div>
                            {imagePreview && (
                                <button onClick={() => setImagePreview(null)} className="text-xs text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            )}
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Full Name *</label>
                                <Input
                                    placeholder="Enter full name"
                                    className="bg-gray-50 border-gray-200"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Contact Number *</label>
                                <Input
                                    placeholder="+1 234 ..."
                                    className="bg-gray-50 border-gray-200"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email (Optional)</label>
                                <Input
                                    placeholder="email@example.com"
                                    className="bg-gray-50 border-gray-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Category</label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cat1">Cleaning</SelectItem>
                                        <SelectItem value="cat2">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Zone *</label>
                                <Select value={zone} onValueChange={setZone}>
                                    <SelectTrigger className="bg-gray-50 border-gray-200">
                                        <SelectValue placeholder="Select Zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="zone1">Zone 1</SelectItem>
                                        <SelectItem value="zone2">Zone 2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="col-span-2">
                                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Address / City</label>
                                <Input
                                    placeholder="Enter detailed address"
                                    className="bg-gray-50 border-gray-200"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
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
                            Add Worker
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
