import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: any; // Using any for now, ideally interface
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, appointment }) => {
    if (!appointment) return null;

    const handleAssign = () => {
        toast.success(`Technician assigned to Order #${appointment.id}`);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium flex items-center gap-2">
                        Booking Details
                        <Badge className="bg-white/20 text-white hover:bg-white/30 border-none font-normal">
                            #{appointment.id}
                        </Badge>
                    </DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="flex h-[500px]">
                    {/* Left Sidebar - Customer Info */}
                    <div className="w-1/3 bg-slate-50 p-6 border-r border-slate-200 space-y-6">
                        <div className="text-center">
                            <Avatar className="h-20 w-20 mx-auto mb-3 outline outline-2 outline-offset-2 outline-[#0E7490]">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${appointment.customer}`} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h3 className="font-bold text-lg text-slate-900">{appointment.customer}</h3>
                            <p className="text-sm text-slate-500">Customer</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Phone className="h-4 w-4 text-[#0E7490]" />
                                <span>+1 234 567 890</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                <Mail className="h-4 w-4 text-[#0E7490]" />
                                <span>customer@example.com</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-600">
                                <MapPin className="h-4 w-4 text-[#0E7490] mt-0.5" />
                                <span>123 Main St, New York, NY 10001</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                            <h4 className="font-semibold text-sm mb-2">Previous Bookings</h4>
                            <div className="space-y-2">
                                <div className="text-xs bg-white p-2 rounded border border-slate-200 flex justify-between">
                                    <span>AC Repair</span>
                                    <span className="text-slate-500">12 0ct</span>
                                </div>
                                <div className="text-xs bg-white p-2 rounded border border-slate-200 flex justify-between">
                                    <span>Plumbing</span>
                                    <span className="text-slate-500">22 Sep</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Service Details */}
                    <div className="w-2/3 p-6 space-y-6 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</span>
                                <p className="text-lg font-medium text-slate-900">{appointment.service}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Schedule</span>
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Calendar className="h-4 w-4 text-[#0E7490]" />
                                    <span className="font-medium">{appointment.date} • 10:00 AM</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</span>
                                <div>
                                    <Badge
                                        variant="outline"
                                        className={`
                                            ${appointment.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' :
                                                appointment.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'}
                                        `}
                                    >
                                        {appointment.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Payment</span>
                                <p className="font-medium text-slate-900">${appointment.amount} <span className="text-slate-400 font-normal">(Paid)</span></p>
                            </div>
                        </div>

                        <div className="space-y-1 pt-4 border-t border-slate-100">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Note from Customer</span>
                            <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-md">
                                "Please arrive on time, the gate code is 1234."
                            </p>
                        </div>

                        <div className="space-y-3 pt-4">
                            <h4 className="font-semibold text-sm">Assign Technician</h4>
                            <div className="flex gap-4">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select available technician" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech1">John Cooper (Available)</SelectItem>
                                        <SelectItem value="tech2">Mike Ross (Busy)</SelectItem>
                                        <SelectItem value="tech3">Sarah Jane (Available)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="bg-[#0E7490] hover:bg-[#155E75]" onClick={handleAssign}>Assign</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
