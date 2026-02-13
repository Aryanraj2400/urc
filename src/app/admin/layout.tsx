"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Scissors, Tag, Home, ChevronRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Scissors },
    { name: "Discounts", href: "/admin/discounts", icon: Tag },
    { name: "Users", href: "/admin/users", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 border-r border-background dark:border-black bg-card/50 backdrop-blur-sm hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <Home className="w-5 h-5" />
                        <span className="font-bold text-xl uppercase tracking-tighter">Spotless Admin</span>
                    </Link>

                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className={cn("w-5 h-5", isActive ? "animate-pulse" : "")} />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <ChevronRight className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        isActive ? "rotate-90" : "group-hover:translate-x-1"
                                    )} />
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-background dark:border-black">
                    <div className="bg-card rounded-xl p-4 border border-background dark:border-black shadow-sm">
                        <p className="text-xs text-muted-foreground mb-1">Status</p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm font-medium">System Online</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-background dark:border-black bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-lg">
                        {sidebarItems.find(item => item.href === pathname)?.name || "Admin"}
                    </h2>

                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                            A
                        </div>
                    </div>
                </header>

                <div className="pt-12 pb-8 px-8 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
