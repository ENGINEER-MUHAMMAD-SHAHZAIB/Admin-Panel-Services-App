import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
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
import { AddWorkerModal } from '@/components/modules/technicians/AddWorkerModal';
import { toast } from 'sonner';

const initialTechnicians = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: `Worker ${i + 1}`,
    phone: `+1 234 567 89${i}`,
    email: `worker${i}@example.com`,
    city: 'New York',
    activeOrders: Math.floor(Math.random() * 5),
    completedOrders: Math.floor(Math.random() * 50) + 10,
    status: i % 5 === 0 ? 'Inactive' : 'Active',
}));

export const TechniciansPage: React.FC = () => {
    const [technicians, setTechnicians] = useState(initialTechnicians);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddWorker = (newWorker: any) => {
        setTechnicians([newWorker, ...technicians]);
    };

    const handleDeleteWorker = (id: number) => {
        setTechnicians(technicians.filter(t => t.id !== id));
        toast.success("Technician deleted successfully");
    };

    const filteredTechnicians = technicians.filter(worker =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Technicians</h2>
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
                                    <TableHead className="w-[80px] font-semibold text-[#0F172A]">Image</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Name</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Phone Number</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Email</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">City</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Active Orders</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Completed</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTechnicians.map((worker) => (
                                    <TableRow key={worker.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-600">{worker.id}</TableCell>
                                        <TableCell>
                                            <Avatar className="h-8 w-8 rounded-md">
                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${worker.id}`} className="object-cover" />
                                                <AvatarFallback className="rounded-md">W</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="text-slate-600 font-medium text-sm">{worker.name}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{worker.phone}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{worker.email}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{worker.city}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                {worker.activeOrders}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-slate-600 text-sm">{worker.completedOrders}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`rounded-full px-3 py-0.5 text-xs font-normal
                                                    ${worker.status === 'Active' ? 'bg-[#4ADE80] text-white hover:bg-[#4ADE80]' :
                                                        'bg-[#CBD5E1] text-slate-600 hover:bg-[#CBD5E1]'
                                                    }
                                                `}
                                            >
                                                {worker.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-sky-500 bg-sky-50 hover:bg-sky-100 hover:text-sky-600 rounded-sm">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-sm">
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm"
                                                    onClick={() => handleDeleteWorker(worker.id)}
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
                            Showing 1 to {Math.min(10, filteredTechnicians.length)} of {filteredTechnicians.length} entries
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

            <AddWorkerModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddWorker}
            />
        </div>
    );
};
