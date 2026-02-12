"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// Separator and RadioGroup replaced with custom implementation
import { ArrowLeft, CreditCard, Banknote, MapPin, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal, getDiscountAmount, getFinalTotal, coupon, clearCart } = useCartStore();
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: user?.primaryPhoneNumber?.phoneNumber || "",
        street: "",
        city: "",
        zip: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("cash");

    useEffect(() => {
        if (items.length === 0) {
            router.push("/services");
        }
    }, [items, router]);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate local success since DB is removed
        setTimeout(() => {
            if (paymentMethod === "online") {
                alert("Redirecting to payment gateway... (Feature Coming Soon)");
                setIsLoading(false);
                return;
            }

            // Cash on Service Flow
            alert("Order placed successfully! (Offline Mode)");
            clearCart();
            setIsLoading(false);
            router.push("/");
        }, 1000);
    };

    if (items.length === 0) return null;

    return (
        <div className="min-h-screen bg-background pb-20 pt-10">
            <div className="container mx-auto px-4 md:px-6">
                <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Button>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Payment */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-none shadow-lg bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Service Address
                                </CardTitle>
                                <CardDescription>Where should our professionals go?</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" placeholder="+91 98765 43210" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email (Optional)</Label>
                                        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="street">Street Address</Label>
                                        <Input id="street" placeholder="Flat 101, Oak Residency, Main Road" required value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="Mumbai" required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zip">Zip Code</Label>
                                            <Input id="zip" placeholder="400001" required value={formData.zip} onChange={e => setFormData({ ...formData, zip: e.target.value })} />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg bg-card/60 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    Payment Method
                                </CardTitle>
                                <CardDescription>Select how you would like to pay.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div
                                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                    onClick={() => setPaymentMethod("online")}
                                >
                                    <div className="flex-1 flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "online" ? "border-primary" : "border-muted-foreground"}`}>
                                            {paymentMethod === "online" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <p className="font-bold flex items-center gap-2">Pay Online <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Secure</span></p>
                                            <p className="text-sm text-muted-foreground">UPI, Cards, Netbanking (Razorpay/Knitpay)</p>
                                        </div>
                                    </div>
                                    <CreditCard className="w-6 h-6 text-muted-foreground" />
                                </div>

                                <div
                                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                                    onClick={() => setPaymentMethod("cash")}
                                >
                                    <div className="flex-1 flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-primary" : "border-muted-foreground"}`}>
                                            {paymentMethod === "cash" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Service</p>
                                            <p className="text-sm text-muted-foreground">Pay after the service is completed</p>
                                        </div>
                                    </div>
                                    <Banknote className="w-6 h-6 text-muted-foreground" />
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg mt-4">
                                    <ShieldCheck className="w-4 h-4 text-green-500" />
                                    Payments are secure and encrypted.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-none shadow-xl bg-card overflow-hidden">
                                <CardHeader className="bg-muted/30 pb-4">
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between items-start text-sm">
                                                <div>
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.duration} mins</p>
                                                </div>
                                                <p className="font-medium">₹{item.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full h-px bg-border my-2" />

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span>₹{getCartTotal()}</span>
                                        </div>
                                        {getDiscountAmount() > 0 && coupon && (
                                            <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                                                <span>Discount ({coupon.code})</span>
                                                <span>-₹{getDiscountAmount()}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax & Fees</span>
                                            <span>Creating...</span>
                                        </div>
                                    </div>

                                    <div className="w-full h-px bg-border my-2" />

                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span>Total</span>
                                        <span>₹{getFinalTotal()}</span>
                                    </div>

                                    <Button
                                        type="submit"
                                        form="checkout-form"
                                        className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/20"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Place Order <Truck className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground px-4">
                                        By placing an order, you agree to our Terms of Service and Privacy Policy.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
