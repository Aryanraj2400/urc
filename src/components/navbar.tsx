"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, User, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleTheme = () => {
        if (navigator.vibrate) navigator.vibrate(10);
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Hide navbar on admin routes
    if (pathname?.startsWith("/admin")) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-6 px-4 pointer-events-none">
            <div className="flex items-center justify-between px-6 py-3 bg-black backdrop-blur-md rounded-full shadow-lg w-full max-w-5xl relative z-10 pointer-events-auto border border-white/20">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2">
                        {mounted ? (
                            <div className="relative h-14 w-32">
                                <img
                                    src="/images/logo-v3.png"
                                    alt="Spotless Logo"
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        ) : (
                            <div className="h-10 w-24 bg-muted animate-pulse rounded" />
                        )}
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {["Home", "Services", "History", "Contact"].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-base text-white hover:text-gray-300 transition-colors font-medium">
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {mounted && theme === "dark" ? (
                            <Sun className="w-5 h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-white" />
                        )}
                    </button>



                    {/* Desktop CTA / Auth */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <SignedIn>
                            <div className="flex items-center gap-4 text-white">
                                <span className="text-sm font-medium">Hi, {user?.firstName || user?.username || "User"}</span>
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button
                                    className="inline-flex items-center justify-center px-5 py-2 text-sm text-black bg-white rounded-full hover:bg-gray-200 transition-colors h-auto shadow-md font-medium"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Login
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
                        <Menu className="h-6 w-6 text-white" />
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 pt-24 px-6 md:hidden pointer-events-auto"
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-2"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <X className="h-6 w-6 text-foreground" />
                        </motion.button>
                        <div className="flex flex-col space-y-6 items-center text-center mt-10">
                            {["Home", "Services", "History", "Contact"].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 + 0.1 }}
                                    exit={{ opacity: 0, y: 20 }}
                                >
                                    <Link
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-2xl text-foreground font-medium"
                                        onClick={toggleMenu}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="pt-6 w-full max-w-xs"
                            >
                                <SignedIn>
                                    <div className="flex justify-center">
                                        <UserButton afterSignOutUrl="/" showName />
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <SignInButton mode="modal">
                                        <Button onClick={() => { toggleMenu(); }} className="w-full rounded-full text-white" size="lg">
                                            Login
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
