import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Download, Star, MessageSquare, MoreHorizontal, Eye, AlertTriangle } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';

const mockTechnicians = [
    { id: 1, name: 'Ahmed Khan', role: 'Certified', rating: 4.8, jobs: 142, status: 'Available', specialty: 'AC Repair', urgent: true, image: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, name: 'John Doe', role: 'Freelancer', rating: 4.5, jobs: 89, status: 'Busy', specialty: 'Plumbing', urgent: false, image: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, name: 'Ali Reza', role: 'Certified', rating: 4.9, jobs: 310, status: 'Offline', specialty: 'Electrical', urgent: false, image: 'https://i.pravatar.cc/150?u=3' },
];

export const TechniciansPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTech, setSelectedTech] = useState<any>(null); // For details view
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Technicians</h2>
                    <p className="text-muted-foreground">Monitor performance and availability.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                    <Button className="bg-[#0e5f68] hover:bg-[#0b4a51]">
                        Add Technician
                    </Button>
                </div>
            </div>

            <Card className="glass-card">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search technicians..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-9 gap-2">
                                        <Filter className="h-4 w-4" /> Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                    <DropdownMenuItem>Available</DropdownMenuItem>
                                    <DropdownMenuItem>Busy</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Technician</TableHead>
                                <TableHead>Specialty</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTechnicians.map((tech) => (
                                <TableRow key={tech.id} className="group hover:bg-muted/50 transition-colors">
                                    <TableCell className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                                                <img src={tech.image} alt={tech.name} className="h-full w-full object-cover" />
                                            </div>
                                            {tech.urgent && (
                                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-background animate-pulse" title="Urgent Availability" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium">{tech.name}</div>
                                            <div className="text-xs text-muted-foreground">{tech.role} • {tech.jobs} Jobs</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{tech.specialty}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                                            <span className="font-medium">{tech.rating}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={tech.status === 'Available' ? 'success' : tech.status === 'Busy' ? 'destructive' : 'secondary'} className={tech.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : ''}>
                                            {tech.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedTech(tech)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => alert(`Messaging ${tech.name}`)}>
                                                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-amber-600 focus:text-amber-600" onClick={() => setIsWarningOpen(true)}>
                                                        <AlertTriangle className="mr-2 h-4 w-4" /> Issue Warning
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* View Details Modal */}
            <Dialog open={!!selectedTech} onOpenChange={(open) => !open && setSelectedTech(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Technician Profile</DialogTitle>
                    </DialogHeader>
                    {selectedTech && (
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                                    <img src={selectedTech.image} alt={selectedTech.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold">{selectedTech.name}</h3>
                                    <p className="text-muted-foreground">{selectedTech.role} - {selectedTech.specialty}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold">{selectedTech.jobs}</div>
                                    <div className="text-xs text-muted-foreground">Total Jobs</div>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                                        {selectedTech.rating} <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    </div>
                                    <div className="text-xs text-muted-foreground">Rating</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Contact Information</p>
                                    <p className="text-sm text-muted-foreground">+966 50 123 4567</p>
                                    <p className="text-sm text-muted-foreground">tech@adawat.com</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Current Zone</p>
                                    <p className="text-sm text-muted-foreground">Riyadh Zone 1 (North)</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button className="w-full sm:w-auto" variant="outline" onClick={() => alert("Message sent!")}>
                            <MessageSquare className="mr-2 h-4 w-4" /> Message
                        </Button>
                        <Button className="w-full sm:w-auto bg-[#0e5f68]" onClick={() => setSelectedTech(null)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Warning Modal */}
            <Dialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-amber-600">
                            <AlertTriangle className="h-5 w-5" /> Issue Warning
                        </DialogTitle>
                        <DialogDescription>
                            This will send an official warning to the technician. 3 warnings may lead to suspension.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">Reason for warning</label>
                        <textarea className="w-full p-2 border rounded-md h-24 text-sm" placeholder="e.g. Late arrival, Rude behavior..." />
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsWarningOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => { setIsWarningOpen(false); alert("Warning issued."); }}>Send Warning</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
