"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Ticket, Loader2, Calendar, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function AdminDiscounts() {
    const [data, setData] = useState({ discounts: [], coupons: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [formType, setFormType] = useState<"discount" | "coupon" | null>(null);

    const [discountForm, setDiscountForm] = useState({ name: "", percentage: "", validUntil: "" });
    const [couponForm, setCouponForm] = useState({ code: "", discountValue: "", type: "fixed", minPurchase: "0" });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setError(null);
            const res = await fetch("/api/discounts");
            const d = await res.json();
            if (d.discounts && d.coupons) {
                setData(d);
            } else {
                setError(d.error || "Failed to fetch discounts/coupons");
                setData({ discounts: [], coupons: [] });
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
            setError("Could not connect to the server");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const body = {
                type: formType,
                data: formType === "discount" ? discountForm : couponForm
            };
            const res = await fetch("/api/discounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                setFormType(null);
                setDiscountForm({ name: "", percentage: "", validUntil: "" });
                setCouponForm({ code: "", discountValue: "", type: "fixed", minPurchase: "0" });
                fetchData();
            }
        } catch (error) {
            console.error("Failed to save entry:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Discounts & Coupons</h1>
                    <p className="text-muted-foreground">Manage ongoing discounts and promotional codes.</p>
                </div>
                {!formType && (
                    <div className="flex gap-3">
                        <Button onClick={() => setFormType("discount")} variant="outline" className="rounded-full">
                            <Percent className="w-4 h-4 mr-2" />
                            New Discount
                        </Button>
                        <Button onClick={() => setFormType("coupon")} className="rounded-full bg-primary hover:bg-primary/90">
                            <Ticket className="w-4 h-4 mr-2" />
                            Create Coupon
                        </Button>
                    </div>
                )}
            </div>

            {formType && (
                <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {formType === "discount" ? <Percent className="w-5 h-5 text-primary" /> : <Ticket className="w-5 h-5 text-primary" />}
                            Create {formType === "discount" ? "Discount" : "Coupon"}
                        </CardTitle>
                        <CardDescription>Enter details for the new promotional offering.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            {formType === "discount" ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Discount Name</Label>
                                        <Input placeholder="e.g. Summer Sale" value={discountForm.name} onChange={e => setDiscountForm({ ...discountForm, name: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Percentage (%)</Label>
                                        <Input type="number" placeholder="20" value={discountForm.percentage} onChange={e => setDiscountForm({ ...discountForm, percentage: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Valid Until (Optional)</Label>
                                        <Input type="date" value={discountForm.validUntil} onChange={e => setDiscountForm({ ...discountForm, validUntil: e.target.value })} />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Coupon Code</Label>
                                        <Input placeholder="CLEAN2026" value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Value</Label>
                                        <Input type="number" placeholder="100" value={couponForm.discountValue} onChange={e => setCouponForm({ ...couponForm, discountValue: e.target.value })} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Type</Label>
                                        <select className="w-full bg-background border rounded-md h-9 px-3 text-sm" value={couponForm.type} onChange={e => setCouponForm({ ...couponForm, type: e.target.value })}>
                                            <option value="fixed">Fixed Amount (₹)</option>
                                            <option value="percentage">Percentage (%)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Min. Purchase (₹)</Label>
                                        <Input type="number" placeholder="500" value={couponForm.minPurchase} onChange={e => setCouponForm({ ...couponForm, minPurchase: e.target.value })} />
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setFormType(null)} className="rounded-full">Cancel</Button>
                                <Button type="submit" disabled={isSaving} className="rounded-full px-8">
                                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                    Create {formType === "discount" ? "Discount" : "Coupon"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid lg:grid-cols-2 gap-8 mt-12">
                <Card className="border-none shadow-md bg-card/40 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Percent className="w-4 h-4 text-primary" />
                                Active Discounts
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-6">Name</TableHead>
                                    <TableHead>Percentage</TableHead>
                                    <TableHead>Expiry</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></TableCell></TableRow>
                                ) : error ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10 text-destructive text-xs uppercase tracking-widest">{error}</TableCell></TableRow>
                                ) : data.discounts.length === 0 ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10 text-muted-foreground text-xs uppercase tracking-widest">No Active Discounts</TableCell></TableRow>
                                ) : (
                                    data.discounts.map((d: any) => (
                                        <TableRow key={d.id}>
                                            <TableCell className="px-6 font-medium">{d.name}</TableCell>
                                            <TableCell><Badge variant="outline" className="text-primary border-primary/20">{d.percentage}% Off</Badge></TableCell>
                                            <TableCell className="text-muted-foreground text-xs">{d.validUntil ? new Date(d.validUntil).toLocaleDateString() : "Lifetime"}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-card/40 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ticket className="w-4 h-4 text-primary" />
                            Promo Codes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-6">Code</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Min. Order</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></TableCell></TableRow>
                                ) : error ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10 text-destructive text-xs uppercase tracking-widest">{error}</TableCell></TableRow>
                                ) : data.coupons.length === 0 ? (
                                    <TableRow><TableCell colSpan={3} className="text-center py-10 text-muted-foreground text-xs uppercase tracking-widest">No Promo Codes</TableCell></TableRow>
                                ) : (
                                    data.coupons.map((c: any) => (
                                        <TableRow key={c.id}>
                                            <TableCell className="px-6 font-mono font-bold text-primary">{c.code}</TableCell>
                                            <TableCell className="font-medium">{c.type === "fixed" ? `₹${c.discountValue}` : `${c.discountValue}%`}</TableCell>
                                            <TableCell className="text-muted-foreground text-xs">₹{c.minPurchase}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
