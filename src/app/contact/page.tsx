"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-36 pb-12">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Get in Touch</h1>
                    <p className="text-muted-foreground">We are here to help you achieve a urbanroomcare home.</p>
                </motion.div>

                <div className="max-w-xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-heading text-lg">Phone</h3>
                                    <p className="text-muted-foreground">+91 98765 43210</p>
                                    <p className="text-xs text-muted-foreground mt-1">Mon-Sat 9am to 6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-heading text-lg">Email</h3>
                                    <p className="text-muted-foreground">support@urbanroomcare.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold font-heading text-lg">Office</h3>
                                    <p className="text-muted-foreground">
                                        123 Clean Street, Sector 1<br />
                                        New Delhi, India 110001
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 rounded-2xl bg-secondary/5 border border-secondary/10">
                            <h3 className="font-bold font-heading text-lg mb-4">Chat with us</h3>
                            <p className="text-sm text-muted-foreground mb-4">Need a quick answer? Chat with our support team on WhatsApp.</p>
                            <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950">
                                Chat on WhatsApp
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
