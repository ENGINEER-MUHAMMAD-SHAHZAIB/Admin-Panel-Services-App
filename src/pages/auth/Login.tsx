import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const LoginPage: React.FC = () => {
    return (
        <div className="min-h-screen w-full lg:grid lg:grid-cols-2 relative overflow-hidden">
            {/* Abstract Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 -z-20" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-200/30 blur-[120px] -z-10" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-200/30 blur-[120px] -z-10" />

            <div className="hidden lg:flex flex-col justify-center p-12 relative bg-black/5 dark:bg-black/20 backdrop-blur-sm border-r border-white/20">
                <div className="relative z-10 px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
                            Welcome to Adawat Services
                        </h1>
                        <p className="text-lg text-muted-foreground mb-8 text-pretty">
                            Manage your service marketplace with efficiency and style. Track orders, manage technicians, and grow your business.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="rounded-xl overflow-hidden shadow-2xl border border-white/20"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop"
                            alt="Services"
                            className="w-full h-[400px] object-cover"
                        />
                    </motion.div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <Card className="border-0 shadow-2xl bg-white/70 dark:bg-black/70 backdrop-blur-xl">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                            <CardDescription className="text-center">
                                Enter your email and password to access the admin panel
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="admin@adawat.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="remember" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
                                Sign In
                            </Button>
                            <p className="text-xs text-center text-muted-foreground">
                                Forgot password? Contact support.
                            </p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};
