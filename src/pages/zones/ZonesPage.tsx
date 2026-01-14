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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddZoneModal } from '@/components/modules/zones/AddZoneModal';
import { toast } from 'sonner';

const initialZones = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    name: `Zone ${i + 1}`,
    services: Math.floor(Math.random() * 100) + 10,
    workers: Math.floor(Math.random() * 50) + 5,
    orders: Math.floor(Math.random() * 50) + 5,
}));

export const ZonesPage: React.FC = () => {
    const [zones, setZones] = useState(initialZones);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddZone = (newZone: any) => {
        setZones([newZone, ...zones]);
    };

    const handleDeleteZone = (id: number) => {
        setZones(zones.filter(z => z.id !== id));
        toast.success("Zone deleted successfully");
    };

    const filteredZones = zones.filter(zone =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Zones</h2>
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
                                    placeholder="Search zones..."
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
                                    <TableHead className="w-[60px] font-semibold text-[#0F172A]">Icon</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Zone</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Services</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Workers</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Orders</TableHead>
                                    <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredZones.map((zone) => (
                                    <TableRow key={zone.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-600">{zone.id}</TableCell>
                                        <TableCell>
                                            <Avatar className="h-8 w-8 bg-purple-100 p-1.5">
                                                <AvatarImage src="/placeholder-icon.png" className="object-contain" />
                                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3501/3501241.png" alt="icon" className="w-full h-full opacity-60" />
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="text-slate-600 font-medium text-sm">{zone.name}</TableCell>
                                        <TableCell className="text-slate-500 text-sm pl-4">{zone.services}</TableCell>
                                        <TableCell className="text-slate-500 text-sm pl-4">{zone.workers}</TableCell>
                                        <TableCell className="text-slate-500 text-sm pl-4">{zone.orders}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500 bg-amber-50 hover:bg-amber-100 hover:text-amber-600 rounded-sm">
                                                    <Edit className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm"
                                                    onClick={() => handleDeleteZone(zone.id)}
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
                            Showing 1 to {Math.min(10, filteredZones.length)} of {filteredZones.length} entries
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

            <AddZoneModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddZone} />
        </div>
    );
};
