"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col md:flex-row items-center pt-32 md:pt-0 overflow-hidden bg-background">
            {/* Left Content */}
            <div className="w-full md:w-[60%] px-6 md:px-20 lg:px-32 flex flex-col justify-center h-full z-10 py-12 md:py-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 mb-6">
                        <span className="px-3 py-1 rounded-full bg-neon-green/10 dark:bg-neon-blue/10 text-neon-green dark:text-neon-blue text-xs font-bold tracking-wider border border-neon-green/30 dark:border-neon-blue/30 shadow-[0_0_15px_rgba(204,255,0,0.1)] dark:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-colors duration-300">
                            #1 RATED CLEANING SERVICE
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading leading-[1.1] text-foreground mb-6 tracking-tight">
                        Care that keeps your room perfect
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
                        Experience the ultimate room cleaning service. Book professional, background-checked cleaners in seconds with just your phone number.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <Button size="lg" className="w-full sm:w-auto text-base h-12 shadow-xl shadow-neon-green/20 dark:shadow-neon-blue/20 bg-neon-green dark:bg-neon-blue text-black dark:text-black hover:bg-neon-green/90 dark:hover:bg-neon-blue/90 border-none font-bold transition-all duration-300">
                            Book Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Link href="/services" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full h-12 text-base hover:bg-transparent hover:scale-105 transition-transform">
                                View Services
                            </Button>
                        </Link>
                    </div>

                    <div className="flex items-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                            <span>Background Checked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                            <span>Eco-friendly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary" />
                            <span>Insured</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Content - Asymmetric Collage */}
            <div className="w-full md:w-[40%] h-[50vh] md:h-[calc(100vh-6rem)] relative bg-background dark:bg-black md:block hidden mt-24 border-l border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300">
                {/* Background decorative elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-neon-green/10 dark:bg-neon-blue/10 blur-[100px] transition-colors duration-300" />

                <div className="absolute inset-0 p-8 grid grid-cols-2 grid-rows-2 gap-4 h-full content-center">
                    {/* Image 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative rounded-2xl overflow-hidden shadow-xl bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300"
                    >
                        <Image
                            src="/images/hero-new-1.jpg"
                            alt="Cleaning Team 1"
                            fill
                            className="object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Image 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative rounded-2xl overflow-hidden shadow-xl bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300"
                    >
                        <Image
                            src="/images/hero-new-2.jpg"
                            alt="Cleaning Team 2"
                            fill
                            className="object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Image 3 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative rounded-2xl overflow-hidden shadow-xl bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300"
                    >
                        <Image
                            src="/images/hero-new-3.jpg"
                            alt="Cleaning Team 3"
                            fill
                            className="object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>

                    {/* Image 4 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative rounded-2xl overflow-hidden shadow-xl bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300"
                    >
                        <Image
                            src="/images/hero-new-4.jpg"
                            alt="Cleaning Team 4"
                            fill
                            className="object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Mobile Collage (Simpler version) */}
            <div className="w-full h-auto px-6 pb-12 md:hidden">
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300">
                        <Image src="/images/hero-new-1.jpg" alt="Team" fill className="object-cover object-top" />
                    </div>
                    <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg mt-8 bg-neon-green/5 dark:bg-neon-blue/5 border border-neon-green/10 dark:border-neon-blue/10 transition-colors duration-300">
                        <Image src="/images/hero-new-2.jpg" alt="Cleaning" fill className="object-cover object-top" />
                    </div>
                </div>
            </div>
        </section>
    );
}
