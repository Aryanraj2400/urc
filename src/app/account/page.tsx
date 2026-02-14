"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { User, Phone, Home, Save, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { getUserProfile, updateProfile } from "@/lib/actions/users";

export default function AccountPage() {
    const { user, isLoaded } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        pgName: "",
        address: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.id) {
                const { data, error } = await getUserProfile(user.id);
                if (data) {
                    setFormData({
                        fullName: data.fullName || user.fullName || "",
                        phone: data.phone || "",
                        pgName: data.pgName || "",
                        address: data.address || "",
                    });
                }
                setIsLoading(false);
            }
        };

        if (isLoaded && user) {
            fetchProfile();
        } else if (isLoaded && !user) {
            setIsLoading(false);
        }
    }, [user, isLoaded]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        setIsSaving(true);
        setIsSuccess(false);

        const { error } = await updateProfile({
            clerkId: user.id,
            fullName: formData.fullName,
            phone: formData.phone,
            pgName: formData.pgName,
            address: formData.address,
        });

        if (!error) {
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
        } else {
            alert("Error updating profile: " + error);
        }

        setIsSaving(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-8">Please login to access your account settings.</p>
                <Button asChild rounded-full>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                            <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold font-heading">My Account</h1>
                            <p className="text-muted-foreground">Manage your profile and booking preferences</p>
                        </div>
                    </div>

                    <form onSubmit={handleSave}>
                        <div className="grid gap-6">
                            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <User className="w-5 h-5 text-primary" />
                                        Personal Information
                                    </CardTitle>
                                    <CardDescription>
                                        Update your name and contact details for better service
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="fullName"
                                                    placeholder="John Doe"
                                                    className="pl-10 h-10 rounded-xl"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Mobile Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    placeholder="+91 98765 43210"
                                                    className="pl-10 h-10 rounded-xl"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            value={user.primaryEmailAddress?.emailAddress || ""}
                                            disabled
                                            className="h-10 rounded-xl bg-muted/50 opacity-70"
                                        />
                                        <p className="text-[10px] text-muted-foreground">Email is managed by your login provider</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl flex items-center gap-2">
                                        <Home className="w-5 h-5 text-primary" />
                                        Living Details
                                    </CardTitle>
                                    <CardDescription>
                                        Tell us where you live so our cleaners can find you
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="pgName">PG / Hostel Name</Label>
                                        <div className="relative">
                                            <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                id="pgName"
                                                placeholder="e.g. Skyline PG, Zolo Stays"
                                                className="pl-10 h-10 rounded-xl"
                                                value={formData.pgName}
                                                onChange={(e) => setFormData({ ...formData, pgName: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Full Address / Room Number</Label>
                                        <textarea
                                            id="address"
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-xl border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary h-auto resize-none"
                                            placeholder="Room 304, 3rd Floor, etc."
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSaving}
                                        className="rounded-full px-8 shadow-lg shadow-primary/20 gap-2"
                                    >
                                        {isSaving ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : isSuccess ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : (
                                            <Save className="w-4 h-4" />
                                        )}
                                        {isSaving ? "Saving..." : isSuccess ? "Saved!" : "Save Changes"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

import Link from "next/link";
