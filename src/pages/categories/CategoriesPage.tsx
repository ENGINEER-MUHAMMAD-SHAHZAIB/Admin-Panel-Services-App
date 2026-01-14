import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddCategoryModal } from '@/components/modules/categories/AddCategoryModal';
import { AddSubCategoryModal } from '@/components/modules/categories/AddSubCategoryModal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';


const initialCategories = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: `Category ${i + 1}`,
    subCategories: Math.floor(Math.random() * 50) + 1,
    services: Math.floor(Math.random() * 100) + 1,
}));

const initialSubCategories = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: `Sub Category ${i + 1}`,
    mainCategory: `Category ${Math.floor(Math.random() * 5) + 1}`,
    services: Math.floor(Math.random() * 100) + 1,
}));

export const CategoriesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('main');
    const [categories, setCategories] = useState(initialCategories);
    const [subCategories, setSubCategories] = useState(initialSubCategories);

    const [isAddMainOpen, setIsAddMainOpen] = useState(false);
    const [isAddSubOpen, setIsAddSubOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddCategory = (newCategory: any) => {
        setCategories([newCategory, ...categories]);
    };

    const handleAddSubCategory = (newSubCategory: any) => {
        setSubCategories([newSubCategory, ...subCategories]);
    };

    const handleDelete = (id: number, type: 'main' | 'sub') => {
        if (type === 'main') {
            setCategories(categories.filter(c => c.id !== id));
            toast.success("Category deleted");
        } else {
            setSubCategories(subCategories.filter(c => c.id !== id));
            toast.success("Sub-Category deleted");
        }
    };

    const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredSubCategories = subCategories.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Categories</h2>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                        <TabsList className="bg-transparent p-0 gap-2 h-auto">
                            <TabsTrigger
                                value="main"
                                className="rounded-full border border-slate-200 px-4 py-1.5 data-[state=active]:bg-[#0E7490] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-500"
                            >
                                Main Category
                            </TabsTrigger>
                            <TabsTrigger
                                value="sub"
                                className="rounded-full border border-slate-200 px-4 py-1.5 data-[state=active]:bg-[#0E7490] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-500"
                            >
                                Sub Categories
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <Card className="border-none shadow-sm bg-white/80 backdrop-blur-md">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Show</span>
                            <Select defaultValue="15">
                                <SelectTrigger className="w-[70px] h-8">
                                    <SelectValue placeholder="15" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                            <span>entries</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search"
                                    className="pl-9 h-9 rounded-md bg-white border-slate-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button
                                className="bg-[#0E7490] hover:bg-[#155E75] text-white h-9 px-4 gap-2"
                                onClick={() => activeTab === 'main' ? setIsAddMainOpen(true) : setIsAddSubOpen(true)}
                            >
                                <Plus className="h-4 w-4" /> Add New
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-100">
                        {activeTab === 'main' ? (
                            <Table>
                                <TableHeader className="bg-[#E2E8F0]/50">
                                    <TableRow>
                                        <TableHead className="w-[60px] font-semibold text-[#0F172A]">ID</TableHead>
                                        <TableHead className="w-[60px] font-semibold text-[#0F172A]">Icon</TableHead>
                                        <TableHead className="font-semibold text-[#0F172A]">Category</TableHead>
                                        <TableHead className="font-semibold text-[#0F172A]">Sub Categories</TableHead>
                                        <TableHead className="font-semibold text-[#0F172A]">Services</TableHead>
                                        <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((cat) => (
                                        <TableRow key={cat.id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-medium text-slate-600">{cat.id}</TableCell>
                                            <TableCell>
                                                <Avatar className="h-8 w-8 bg-purple-100 p-1.5">
                                                    <AvatarImage src="/placeholder-icon.png" className="object-contain" />
                                                    <AvatarFallback className="bg-purple-100 text-purple-600">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3501/3501241.png" alt="icon" className="w-full h-full opacity-60" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="text-slate-600 font-medium text-sm">{cat.name}</TableCell>
                                            <TableCell className="text-slate-500 text-sm pl-8">{cat.subCategories}</TableCell>
                                            <TableCell className="text-slate-500 text-sm pl-4">{cat.services}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-sm">
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm"
                                                        onClick={() => handleDelete(cat.id, 'main')}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Table>
                                <TableHeader className="bg-[#E2E8F0]/50">
                                    <TableRow>
                                        <TableHead className="w-[60px] font-semibold text-[#0F172A]">ID</TableHead>
                                        <TableHead className="w-[60px] font-semibold text-[#0F172A]">Icon</TableHead>
                                        <TableHead className="font-semibold text-[#0F172A]">Sub Category</TableHead>
                                        <TableHead className="font-semibold text-[#0F172A]">Services</TableHead>
                                        <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSubCategories.map((cat) => (
                                        <TableRow key={cat.id} className="hover:bg-slate-50/50">
                                            <TableCell className="font-medium text-slate-600">{cat.id}</TableCell>
                                            <TableCell>
                                                <Avatar className="h-8 w-8 bg-purple-100 p-1.5">
                                                    <AvatarImage src="/placeholder-icon.png" className="object-contain" />
                                                    <AvatarFallback className="bg-purple-100 text-purple-600">
                                                        <img src="https://cdn-icons-png.flaticon.com/512/3501/3501241.png" alt="icon" className="w-full h-full opacity-60" />
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>
                                            <TableCell className="text-slate-600 font-medium text-sm">{cat.name}</TableCell>
                                            <TableCell className="text-slate-500 text-sm pl-4">{cat.services}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-sm">
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm"
                                                        onClick={() => handleDelete(cat.id, 'sub')}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing 1 to {Math.min(10, activeTab === 'main' ? filteredCategories.length : filteredSubCategories.length)} of {activeTab === 'main' ? filteredCategories.length : filteredSubCategories.length} entries
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled><span className="sr-only">Previous</span>&lt;</Button>
                            <Button variant="default" size="sm" className="h-8 w-8 bg-[#0E7490] hover:bg-[#155E75]">1</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                            <span className="text-sm text-muted-foreground mx-1">...</span>
                            <Button variant="outline" size="sm" className="h-8 w-8">8</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">9</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">10</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0"><span className="sr-only">Next</span>&gt;</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AddCategoryModal
                isOpen={isAddMainOpen}
                onClose={() => setIsAddMainOpen(false)}
                onAdd={handleAddCategory}
            />
            <AddSubCategoryModal
                isOpen={isAddSubOpen}
                onClose={() => setIsAddSubOpen(false)}
                onAdd={handleAddSubCategory}
            />
        </div>
    );
};
