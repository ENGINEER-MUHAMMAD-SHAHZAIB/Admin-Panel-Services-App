import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, MoreHorizontal, Calendar, MapPin } from 'lucide-react';
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
import { AppointmentModal } from '@/components/modules/orders/AppointmentModal';
import { toast } from 'sonner';

const mockOrders = Array.from({ length: 15 }).map((_, i) => ({
    id: `ORD-00${i + 1}`,
    customer: `Customer ${i + 1}`,
    service: i % 2 === 0 ? 'Home Cleaning' : 'AC Repair',
    date: '2024-02-20',
    amount: (Math.random() * 200 + 50).toFixed(2),
    status: i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'In Progress',
    address: '123 Main St, New York, NY'
}));

export const OrdersPage: React.FC = () => {
    const [orders] = useState(mockOrders);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleViewOrder = (order: any) => {
        setSelectedOrder(order);
    };

    const handleAssignClick = (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();
        toast.info(`Opening assignment for ${orderId}`);
        // In a real app, this might open a quick assign dropdown or the modal
        const order = orders.find(o => o.id === orderId);
        if (order) setSelectedOrder(order);
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Bookings</h2>
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
                                    placeholder="Search order ID or customer..."
                                    className="pl-9 h-9 rounded-md bg-white border-slate-200"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="h-9 gap-2">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-100">
                        <Table>
                            <TableHeader className="bg-[#E2E8F0]/50">
                                <TableRow>
                                    <TableHead className="w-[100px] font-semibold text-[#0F172A]">Order ID</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Customer</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Service</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Date & Time</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Address</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Amount</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Status</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Assign</TableHead>
                                    <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow key={order.id} className="hover:bg-slate-50/50 cursor-pointer" onClick={() => handleViewOrder(order)}>
                                        <TableCell className="font-medium text-[#0E7490]">{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${order.customer}`} />
                                                    <AvatarFallback>C</AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 text-sm">{order.service}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {order.date}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-slate-500 text-sm max-w-[150px] truncate" title={order.address}>
                                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="truncate">{order.address}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-900">${order.amount}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`rounded-full px-3 py-0.5 text-xs font-normal
                                                    ${order.status === 'Completed' ? 'bg-[#4ADE80] text-white hover:bg-[#4ADE80]' :
                                                        order.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                                                            'bg-blue-100 text-blue-700 hover:bg-blue-100'
                                                    }
                                                `}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {order.status === 'Pending' ? (
                                                <Button
                                                    size="sm"
                                                    className="h-7 text-xs bg-[#0E7490] hover:bg-[#155E75]"
                                                    onClick={(e) => handleAssignClick(e, order.id)}
                                                >
                                                    Assign
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-slate-400">Assigned</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:text-[#0E7490]">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500">
                                                    <MoreHorizontal className="h-4 w-4" />
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
                            Showing 1 to {Math.min(10, filteredOrders.length)} of {filteredOrders.length} entries
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

            <AppointmentModal
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
                appointment={selectedOrder}
            />
        </div>
    );
};
