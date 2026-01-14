import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Star } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServiceAddModal } from '@/components/modules/services/ServiceAddModal';
import { toast } from 'sonner';

const initialServices = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: `Service ${i + 1}`,
    category: `Category ${Math.floor(i / 3) + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    rating: (Math.random() * 2 + 3).toFixed(1),
    orders: Math.floor(Math.random() * 200) + 10,
    status: i % 4 === 0 ? 'Inactive' : 'Active',
}));

export const ServicesPage: React.FC = () => {
    const [services, setServices] = useState(initialServices);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddService = (newService: any) => {
        setServices([newService, ...services]);
    };

    const handleDeleteService = (id: number) => {
        setServices(services.filter(s => s.id !== id));
        toast.success("Service deleted successfully");
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Services</h2>
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
                                onClick={() => setIsAddModalOpen(true)}
                            >
                                <Plus className="h-4 w-4" /> Add New
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-100">
                        <Table>
                            <TableHeader className="bg-[#E2E8F0]/50">
                                <TableRow>
                                    <TableHead className="w-[60px] font-semibold text-[#0F172A]">ID</TableHead>
                                    <TableHead className="w-[60px] font-semibold text-[#0F172A]">Image</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Service Name</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Category</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Price</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Rating</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Orders</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredServices.map((service) => (
                                    <TableRow key={service.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-600">{service.id}</TableCell>
                                        <TableCell>
                                            <Avatar className="h-8 w-8 rounded-md">
                                                <AvatarImage src={`https://source.unsplash.com/random/50x50?sig=${service.id}`} className="object-cover" />
                                                <AvatarFallback className="rounded-md">S</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="text-slate-600 font-medium text-sm">{service.name}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{service.category}</TableCell>
                                        <TableCell className="text-slate-600 font-medium text-sm">${service.price}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-amber-500 font-medium text-sm">
                                                <Star className="h-3.5 w-3.5 fill-current mr-1" />
                                                {service.rating}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm pl-4">{service.orders}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`rounded-full px-3 py-0.5 text-xs font-normal
                                                    ${service.status === 'Active' ? 'bg-[#4ADE80] text-white hover:bg-[#4ADE80]' :
                                                        'bg-[#CBD5E1] text-slate-600 hover:bg-[#CBD5E1]'
                                                    }
                                                `}
                                            >
                                                {service.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-sm">
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm"
                                                    onClick={() => handleDeleteService(service.id)}
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing 1 to {Math.min(10, filteredServices.length)} of {filteredServices.length} entries
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled><span className="sr-only">Previous</span>&lt;</Button>
                            <Button variant="default" size="sm" className="h-8 w-8 bg-[#0E7490] hover:bg-[#155E75]">1</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
                            <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                            <span className="text-sm text-muted-foreground mx-1">...</span>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0"><span className="sr-only">Next</span>&gt;</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ServiceAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddService}
            />
        </div>
    );
};
