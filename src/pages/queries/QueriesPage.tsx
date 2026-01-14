import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, Trash2 } from 'lucide-react';
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
import { QueryModal } from '@/components/modules/queries/QueryModal';

const mockQueries = Array.from({ length: 14 }).map((_, i) => ({
    id: i + 1,
    user: `User ${i + 1}`,
    email: `user${i}@example.com`,
    phone: `+1 234 567 89${i}`,
    subject: 'Issue with booking',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    status: i % 3 === 0 ? 'Pending' : 'Resolved',
    date: '2024-03-12',
}));

export const QueriesPage: React.FC = () => {
    const [selectedQuery, setSelectedQuery] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewDetails = (query: any) => {
        setSelectedQuery(query);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">Queries</h2>
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
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-slate-100">
                        <Table>
                            <TableHeader className="bg-[#E2E8F0]/50">
                                <TableRow>
                                    <TableHead className="w-[60px] font-semibold text-[#0F172A]">ID</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">User Name</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Email</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Phone Number</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Message</TableHead>
                                    <TableHead className="font-semibold text-[#0F172A]">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-[#0F172A]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockQueries.map((query) => (
                                    <TableRow key={query.id} className="hover:bg-slate-50/50">
                                        <TableCell className="font-medium text-slate-600">{query.id}</TableCell>
                                        <TableCell className="text-slate-600 font-medium text-sm flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={`https://i.pravatar.cc/150?u=${query.id}`} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            {query.user}
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">{query.email}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{query.phone}</TableCell>
                                        <TableCell className="text-slate-500 text-sm truncate max-w-[200px]">{query.message}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`rounded-full px-3 py-0.5 text-xs font-normal
                                                    ${query.status === 'Resolved' ? 'bg-[#4ADE80] text-white hover:bg-[#4ADE80]' :
                                                        'bg-[#CBD5E1] text-slate-600 hover:bg-[#CBD5E1]'
                                                    }
                                                `}
                                            >
                                                {query.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-sky-500 bg-sky-50 hover:bg-sky-100 hover:text-sky-600 rounded-sm"
                                                    onClick={() => handleViewDetails(query)}
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600 rounded-sm">
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
                            Showing 1 to 10 of 100 entries
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

            <QueryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                query={selectedQuery}
            />
        </div>
    );
};
