"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/services/service-card";
import { Loader2 } from "lucide-react";

import { useServiceStore } from "@/store/service-store";

export default function ServicesPage() {
    const { services } = useServiceStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // No fetch needed, using local data
    }, []);

    return (
        <main className="min-h-screen pt-36 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Complete Services</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore our wide range of professional cleaning services designed to make your life easier.
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center text-muted-foreground py-20">
                        <p>No services available properly.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
