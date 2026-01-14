import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (category: any) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (!name) {
            toast.error("Category name is required");
            return;
        }

        const newCategory = {
            id: Math.floor(Math.random() * 1000) + 20,
            name,
            subCategories: 0,
            services: 0
        };

        onAdd(newCategory);
        toast.success("Category added successfully");
        onClose();
        setName('');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium">Add Category</DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="p-8 grid gap-8">
                    <div className="flex items-center gap-8">
                        {/* Image Upload */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-24 w-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                                <div className="text-center">
                                    <Upload className="h-6 w-6 text-[#0E7490] mx-auto mb-1" />
                                    <span className="text-xs text-[#0E7490] font-medium">Upload</span>
                                </div>
                            </div>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 space-y-4">
                            <div className="grid gap-2">
                                <label className="text-sm font-semibold text-gray-700">Main Category *</label>
                                <Input
                                    placeholder="Enter Category Name"
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
                            Add
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
