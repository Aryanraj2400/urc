"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Clock, CheckCircle, XCircle, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    duration: number;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    couponCode: string | null;
    address: { street: string; city: string; zip: string };
    paymentMethod: string;
    status: string;
    createdAt: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
    pending: { icon: <Clock className="w-4 h-4" />, color: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20", label: "Pending" },
    confirmed: { icon: <CheckCircle className="w-4 h-4" />, color: "text-blue-500 bg-blue-500/10 border-blue-500/20", label: "Confirmed" },
    in_progress: { icon: <Package className="w-4 h-4" />, color: "text-purple-500 bg-purple-500/10 border-purple-500/20", label: "In Progress" },
    completed: { icon: <CheckCircle className="w-4 h-4" />, color: "text-green-500 bg-green-500/10 border-green-500/20", label: "Completed" },
    cancelled: { icon: <XCircle className="w-4 h-4" />, color: "text-red-500 bg-red-500/10 border-red-500/20", label: "Cancelled" },
};

export default function HistoryPage() {
    const { isSignedIn, isLoaded } = useUser();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            // Database is removed, so we won't have real history
            setOrders([]);
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]);

    const fetchOrders = async () => {
        // Mocking empty history as database is removed
        setOrders([]);
        setLoading(false);
    };

    if (!isLoaded || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
                <h1 className="text-2xl font-heading font-bold">Sign in to view your orders</h1>
                <p className="text-muted-foreground text-center">You need to be signed in to see your order history.</p>
                <Link href="/">
                    <Button className="rounded-full">Go Home</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20 pt-28">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <Link href="/">
                    <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-3xl font-heading font-bold mb-2">Order History</h1>
                    <p className="text-muted-foreground mb-8">Track your past and current bookings.</p>
                </motion.div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mb-4" />
                        <h2 className="text-xl font-medium mb-2">No orders yet</h2>
                        <p className="text-muted-foreground mb-6">Your booking history will show up here.</p>
                        <Link href="/services">
                            <Button className="rounded-full">Browse Services</Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => {
                            const status = statusConfig[order.status] || statusConfig.pending;
                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <Card className="border shadow-sm hover:shadow-md transition-shadow">
                                        <CardContent className="p-5">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="text-xs text-muted-foreground font-mono">
                                                        #{order.id.slice(0, 8).toUpperCase()}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                                                    {status.icon}
                                                    {status.label}
                                                </span>
                                            </div>

                                            <div className="space-y-1.5 mb-3">
                                                {(order.items as OrderItem[]).map((item, i) => (
                                                    <div key={i} className="flex justify-between text-sm">
                                                        <span>{item.name}</span>
                                                        <span className="text-muted-foreground">₹{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-border">
                                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                    <span className="capitalize">{order.paymentMethod === "cash" ? "Cash on Service" : "Online"}</span>
                                                    {order.couponCode && (
                                                        <span className="text-green-600 dark:text-green-400 font-medium">
                                                            🏷️ {order.couponCode}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-lg font-bold">₹{order.total}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
