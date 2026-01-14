import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, Calendar, X, Send } from 'lucide-react';
import { toast } from 'sonner';

interface QueryModalProps {
    isOpen: boolean;
    onClose: () => void;
    query: any;
}

export const QueryModal: React.FC<QueryModalProps> = ({ isOpen, onClose, query }) => {
    const [reply, setReply] = useState('');

    if (!query) return null;

    const handleSendReply = () => {
        if (!reply) {
            toast.error("Please write a reply first");
            return;
        }
        toast.success(`Reply sent to ${query.email}`);
        setReply('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white text-slate-900 border-none shadow-2xl">
                <DialogHeader className="px-6 py-4 bg-[#0E7490] text-white flex flex-row items-center justify-between">
                    <DialogTitle className="text-lg font-medium">Query Details</DialogTitle>
                    <DialogClose className="text-white hover:bg-white/20 rounded-full p-1" onClick={onClose}>
                        <X className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                <div className="p-6 grid gap-6">
                    {/* User Info Header */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 outline outline-2 outline-slate-100">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${query.id}`} />
                                <AvatarFallback>USER</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{query.user}</h3>
                                <div className="flex flex-col gap-1 text-sm text-slate-500 mt-1">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3.5 w-3.5" /> {query.email}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3.5 w-3.5" /> {query.phone}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right space-y-2">
                            <Badge
                                variant="secondary"
                                className={`
                                    ${query.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}
                                `}
                            >
                                {query.status}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-slate-400 justify-end">
                                <Calendar className="h-3.5 w-3.5" />
                                {query.date}
                            </div>
                        </div>
                    </div>

                    {/* Query Content */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Subject: {query.subject}</h4>
                        <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed border border-slate-100">
                            {query.message}
                        </div>
                    </div>

                    {/* Reply Section */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">Reply to User</label>
                        <Textarea
                            placeholder="Type your response here..."
                            className="min-h-[120px] bg-white border-slate-200 focus:border-[#0E7490]"
                            value={reply}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReply(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                    <Button variant="outline" className="mr-auto" onClick={onClose}>Close</Button>
                    <Button className="bg-[#0E7490] hover:bg-[#155E75] gap-2" onClick={handleSendReply}>
                        <Send className="h-4 w-4" /> Send Reply
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
