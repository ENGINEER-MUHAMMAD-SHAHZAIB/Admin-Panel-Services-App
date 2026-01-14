import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    ShoppingBag,
    Truck,
    DollarSign,
    TrendingUp,
    Filter,
    ChevronRight,
    Star,
    CheckCircle2,
    Clock,
    AlertCircle,
    XCircle,
    Briefcase,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';
import { cn } from '@/lib/utils';

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15
        }
    }
};

// --- Dummy Data ---
const revenueData = [
    { name: 'Jan', total: 45000, orders: 450 },
    { name: 'Feb', total: 52000, orders: 520 },
    { name: 'Mar', total: 48000, orders: 480 },
    { name: 'Apr', total: 61000, orders: 610 },
    { name: 'May', total: 55000, orders: 550 },
    { name: 'Jun', total: 68000, orders: 680 },
    { name: 'Jul', total: 75000, orders: 750 },
];

const categoryData = [
    { name: 'AC Services', value: 4200, color: '#0EA5E9' },
    { name: 'Cleaning', value: 3800, color: '#10B981' },
    { name: 'Plumbing', value: 2900, color: '#F59E0B' },
    { name: 'Electrical', value: 2400, color: '#8B5CF6' },
    { name: 'Others', value: 1700, color: '#64748B' },
];

const topProviders = [
    { id: 1, name: 'Ahmed Ali', jobs: 156, earnings: '45,000', rating: 4.9, initial: 'AA' },
    { id: 2, name: 'Mohammed Hassan', jobs: 142, earnings: '42,000', rating: 4.8, initial: 'MH' },
    { id: 3, name: 'Khalid Mansoor', jobs: 138, earnings: '39,000', rating: 4.7, initial: 'KM' },
    { id: 4, name: 'Faisal Khan', jobs: 125, earnings: '35,000', rating: 4.6, initial: 'FK' },
    { id: 5, name: 'Omar Youssef', jobs: 118, earnings: '33,000', rating: 4.5, initial: 'OY' },
];

const shipmentsData = [
    { label: 'Delivered', value: 135 },
    { label: 'In Transit', value: 100 },
    { label: 'Stuck', value: 54 },
    { label: 'Lost', value: 54 },
];

export const Dashboard: React.FC = () => {
    const [chartType, setChartType] = useState<'revenue' | 'orders'>('revenue');

    return (
        <motion.div
            className="space-y-8 pb-12 px-2"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Page Header */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                    <p className="text-slate-500 mt-1 font-medium italic">Welcome back, Admin. Real-time overview of your operations.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-4 py-2 h-11 transition-all duration-200 hover:shadow-sm font-semibold">
                        <Calendar className="h-4 w-4 mr-2" />
                        Today: Mar 15, 2024
                    </Button>
                </div>
            </motion.div>

            {/* Main KPI Cards Row 1 - Aligned with Reference Image */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Customers', value: '12,543', trend: '+12.5%', icon: Users, color: 'blue' },
                    { label: 'Service Providers', value: '856', trend: '+8.2%', icon: Briefcase, color: 'indigo' },
                    { label: 'Total Bookings', value: '8,429', trend: '+15.3%', icon: ShoppingBag, color: 'blue' },
                    { label: 'Revenue (SAR)', value: '452,340', trend: '+18.7%', icon: DollarSign, color: 'blue' },
                ].map((kpi, i) => (
                    <Card key={i} className="border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 group rounded-2xl overflow-hidden bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{kpi.value}</h3>
                                    <div className="flex items-center gap-2 mt-2 pt-1">
                                        <div className="flex items-center gap-1.5 text-green-600">
                                            <TrendingUp className="h-3.5 w-3.5" />
                                            <span className="text-xs font-bold">{kpi.trend}</span>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">vs last month</span>
                                    </div>
                                </div>
                                <div className={cn(
                                    "h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
                                    kpi.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                                )}>
                                    <kpi.icon className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Status Cards Row 2 - Clean Prominent Professional */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: 'Completed Today', value: '128', icon: CheckCircle2, color: 'bg-green-50 text-green-600 border-green-100' },
                    { label: 'In Progress', value: '45', icon: Clock, color: 'bg-blue-50 text-blue-600 border-blue-100' },
                    { label: 'Pending', value: '23', icon: AlertCircle, color: 'bg-amber-50 text-amber-600 border-amber-100' },
                    { label: 'Cancelled', value: '8', icon: XCircle, color: 'bg-red-50 text-red-600 border-red-100' },
                ].map((item, i) => (
                    <Card key={i} className="border border-slate-100 shadow-sm flex items-center p-5 gap-4 rounded-2xl bg-white hover:bg-slate-50/50 transition-all duration-200">
                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", item.color)}>
                            <item.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-0.5">{item.label}</p>
                            <p className="text-xl font-bold text-slate-900">{item.value}</p>
                        </div>
                    </Card>
                ))}
            </motion.div>

            {/* Charts Section Row 3 */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Overview */}
                <Card className="lg:col-span-2 border border-slate-100 shadow-sm rounded-2xl bg-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-4 pt-7 px-7">
                        <div className="space-y-1">
                            <CardTitle className="text-xl font-bold text-slate-900">Revenue Overview</CardTitle>
                            <p className="text-sm text-slate-500 font-medium italic">Operational performance metrics</p>
                        </div>
                        <div className="flex bg-slate-100/80 p-1 rounded-xl">
                            <Button
                                variant={chartType === 'revenue' ? 'default' : 'ghost'}
                                size="sm"
                                className={cn(
                                    "h-8 text-xs font-bold rounded-lg px-4 transition-all duration-200",
                                    chartType === 'revenue' ? "bg-white text-blue-600 shadow-sm hover:bg-white" : "text-slate-500 hover:text-slate-900"
                                )}
                                onClick={() => setChartType('revenue')}
                            >
                                Revenue
                            </Button>
                            <Button
                                variant={chartType === 'orders' ? 'default' : 'ghost'}
                                size="sm"
                                className={cn(
                                    "h-8 text-xs font-bold rounded-lg px-4 transition-all duration-200",
                                    chartType === 'orders' ? "bg-white text-blue-600 shadow-sm hover:bg-white" : "text-slate-500 hover:text-slate-900"
                                )}
                                onClick={() => setChartType('orders')}
                            >
                                Orders
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-7 pb-7">
                        <div className="h-[320px] w-full mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                {chartType === 'revenue' ? (
                                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                            animationDuration={1000}
                                        />
                                    </AreaChart>
                                ) : (
                                    <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                                            cursor={{ fill: '#f1f5f9' }}
                                        />
                                        <Bar
                                            dataKey="orders"
                                            fill="#3B82F6"
                                            radius={[6, 6, 0, 0]}
                                            barSize={32}
                                            animationDuration={1000}
                                        />
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Services by Category */}
                <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="pt-7 px-7">
                        <CardTitle className="text-xl font-bold text-slate-900">Services by Category</CardTitle>
                        <p className="text-sm text-slate-500 font-medium">Activity distribution</p>
                    </CardHeader>
                    <CardContent className="px-7 pb-8 pt-2">
                        <div className="h-[200px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                        animationDuration={1000}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold text-slate-900">15.2k</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total</span>
                            </div>
                        </div>
                        <div className="mt-8 space-y-4">
                            {categoryData.map((item, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                        <span className="text-sm font-semibold text-slate-600 italic">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900">{item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Row 4: Top Providers & Shipments */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Providers */}
                <Card className="lg:col-span-2 border border-slate-100 shadow-sm rounded-2xl bg-white">
                    <CardHeader className="pt-7 px-7 pb-5">
                        <CardTitle className="text-xl font-bold text-slate-900 flex items-center justify-between">
                            Top Performing Providers
                            <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-50">View All</Button>
                        </CardTitle>
                        <p className="text-sm text-slate-500 font-medium italic">Highest rated experts this cycle</p>
                    </CardHeader>
                    <CardContent className="px-7 pb-8">
                        <div className="space-y-7 mt-2">
                            {topProviders.map((provider) => (
                                <div key={provider.id} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-5">
                                        <div className="text-xs font-bold text-blue-600 bg-blue-50/80 h-9 w-9 rounded-xl flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                            #{provider.id}
                                        </div>
                                        <div className="relative">
                                            <Avatar className="h-12 w-12 bg-slate-100 ring-2 ring-white shadow-sm">
                                                <AvatarFallback className="text-slate-500 text-sm font-bold">{provider.initial}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{provider.name}</p>
                                            <p className="text-xs text-slate-500 font-semibold italic">{provider.jobs} completed orders</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-bold text-slate-900">SAR {provider.earnings}</p>
                                        <div className="flex items-center justify-end gap-1.5 mt-0.5">
                                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-bold text-slate-600">{provider.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Shipments Card */}
                <Card className="border-none shadow-sm rounded-2xl bg-blue-50/30 overflow-hidden flex flex-col">
                    <CardHeader className="pt-7 px-7">
                        <CardTitle className="text-xl font-bold text-blue-900">Shipments Status</CardTitle>
                        <p className="text-sm font-bold text-blue-600/70 uppercase tracking-widest mt-1">Total: 289 Units</p>
                    </CardHeader>
                    <CardContent className="px-7 pb-8 flex-1 flex flex-col justify-center gap-4">
                        {shipmentsData.map((s, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-blue-100/50 hover:border-blue-300 transition-all duration-300 group flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium mb-1">{s.label}</p>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">{s.value}</p>
                                </div>
                                <div className="h-10 w-10 flex items-center justify-center text-blue-100 group-hover:text-blue-500 transition-colors duration-300">
                                    <Truck className="h-6 w-6" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Row 5: Detailed Status Summaries */}
            <motion.div variants={itemVariants} className="space-y-6">
                {[
                    {
                        label: 'Orders Management', stats: [
                            { label: 'Total Orders', value: '1072' },
                            { label: 'Complete Orders', value: '1012', color: 'text-green-600' },
                            { label: 'Pending Orders', value: '56', color: 'text-blue-500' },
                            { label: 'Cancel Orders', value: '06', color: 'text-orange-500' },
                        ]
                    },
                    {
                        label: 'Services Catalog', stats: [
                            { label: 'Total Services', value: '50' },
                            { label: 'Active Services', value: '21', color: 'text-slate-900' },
                            { label: 'Disable Services', value: '16', color: 'text-slate-900' },
                            { label: 'Quotation In progress', value: '13', color: 'text-slate-900' },
                        ]
                    },
                    {
                        label: 'Worker Fleet', stats: [
                            { label: 'Total Workers', value: '50' },
                            { label: 'Active Workers', value: '21', color: 'text-slate-900' },
                            { label: 'Disable Workers', value: '16', color: 'text-slate-900' },
                            { label: 'New Requests', value: '13', color: 'text-slate-900' },
                        ]
                    }
                ].map((panel, idx) => (
                    <Card key={idx} className="border border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white group">
                        <div className="px-7 py-4 flex items-center justify-between bg-blue-50/50">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-blue-900">{panel.label}</h4>
                            <ChevronRight className="h-4 w-4 text-blue-200 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 py-8">
                            {panel.stats.map((s, i) => (
                                <div key={i} className="px-8 text-center md:text-left transition-transform duration-300 hover:-translate-y-1">
                                    <p className="text-xs text-slate-500 font-medium mb-1.5">{s.label}</p>
                                    <p className={cn("text-2xl font-bold tracking-tight", s.color || "text-slate-900")}>
                                        {s.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </motion.div>

            {/* Recent Bookings Table */}
            <motion.div variants={itemVariants}>
                <Card className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
                    <CardHeader className="p-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold">Latest Operational Bookings</CardTitle>
                                <p className="text-sm text-slate-500 font-medium italic">Real-time status monitor</p>
                            </div>
                            <Button variant="outline" size="sm" className="h-10 gap-2 border-slate-200 text-slate-600 rounded-xl px-4 hover:shadow-sm font-semibold">
                                <Filter className="h-4 w-4" /> Filter Records
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-7 pb-7 pt-0">
                        <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/80">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-bold text-slate-900 px-6 py-4">ID</TableHead>
                                        <TableHead className="font-bold text-slate-900">Customer Profile</TableHead>
                                        <TableHead className="font-bold text-slate-900">Service</TableHead>
                                        <TableHead className="font-bold text-slate-900">Update</TableHead>
                                        <TableHead className="font-bold text-slate-900 text-right">Settlement</TableHead>
                                        <TableHead className="font-bold text-slate-900 px-6">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { id: '#ORD-128', customer: 'Sarah Smith', service: 'HVAC Maintenance', date: '2 mins ago', amount: '120.00', status: 'Completed' },
                                        { id: '#ORD-127', customer: 'John Doe', service: 'Plumbing Repair', date: '15 mins ago', amount: '85.50', status: 'Pending' },
                                        { id: '#ORD-126', customer: 'Emma Wilson', service: 'Electrical Panel', date: '1 hour ago', amount: '200.00', status: 'In Progress' },
                                        { id: '#ORD-125', customer: 'Mike Brown', service: 'Facility Sanitizing', date: '2 hours ago', amount: '350.00', status: 'Cancelled' },
                                        { id: '#ORD-124', customer: 'Lisa Anderson', service: 'Wall Painting', date: '5 hours ago', amount: '500.00', status: 'Completed' },
                                    ].map((order, idx) => (
                                        <TableRow key={idx} className="hover:bg-blue-50/30 transition-colors border-slate-50 last:border-none group">
                                            <TableCell className="font-bold text-blue-600 px-6 py-5">{order.id}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
                                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${order.id}`} />
                                                        <AvatarFallback className="font-bold text-slate-400">{order.customer[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-sm">{order.customer}</p>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Premium Member</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-600 font-medium text-sm">{order.service}</TableCell>
                                            <TableCell className="text-slate-400 text-xs font-semibold">{order.date}</TableCell>
                                            <TableCell className="font-bold text-slate-900 text-right text-sm">SAR {order.amount}</TableCell>
                                            <TableCell className="px-6">
                                                <div className={cn(
                                                    "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm border",
                                                    order.status === 'Completed' ? "bg-green-50 text-green-700 border-green-100" :
                                                        order.status === 'Cancelled' ? "bg-red-50 text-red-700 border-red-100" :
                                                            order.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                                "bg-blue-50 text-blue-700 border-blue-100"
                                                )}>
                                                    {order.status}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};
