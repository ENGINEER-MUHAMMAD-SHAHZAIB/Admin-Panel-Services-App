import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const mockCustomers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '+966 50 123 4567', bookings: 12, status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '+966 50 987 6543', bookings: 5, status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', phone: '+966 50 456 7890', bookings: 0, status: 'Blocked' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', phone: '+966 50 111 2222', bookings: 8, status: 'Active' },
];

export const CustomersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = mockCustomers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
                <Button>Export Customers</Button>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>All Customers</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search customers..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Bookings</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                                                <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{customer.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span>{customer.email}</span>
                                            <span className="text-muted-foreground">{customer.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.bookings}</TableCell>
                                    <TableCell>
                                        <Badge variant={customer.status === 'Active' ? 'success' : 'destructive'}>
                                            {customer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                Mock Actions
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};
