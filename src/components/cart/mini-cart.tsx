"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useClerk, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

export function MiniCart() {
    const { items, isOpen, toggleCart, removeItem, getCartTotal, getDiscountAmount, getFinalTotal, applyCoupon, removeCoupon, coupon } = useCartStore();
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser();
    const [couponCode, setCouponCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cartTotal = getCartTotal();
    const discount = getDiscountAmount();
    const finalTotal = getFinalTotal();

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setIsVerifying(true);
        setError(null);

        try {
            // Local fallback for common promo codes since DB is removed
            if (couponCode.toUpperCase() === "SAVE10") {
                applyCoupon({
                    code: "SAVE10",
                    type: "percentage",
                    value: 10,
                    minPurchase: 0
                });
                setCouponCode("");
            } else {
                setError("Invalid coupon (Database disconnected)");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsVerifying(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <>
            <AnimatePresence>
                {!isOpen && items.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-40"
                    >
                        <Button
                            size="lg"
                            className="rounded-full shadow-2xl h-14 px-6 bg-foreground text-background hover:bg-foreground/90"
                            onClick={toggleCart}
                        >
                            <ShoppingBag className="w-5 h-5 mr-3" />
                            <span className="font-bold mr-2">{items.length}</span>
                            <span className="w-px h-4 bg-background/20 mx-2" />
                            <span className="font-bold">₹{cartTotal}</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 p-6 flex flex-col border-l border-border"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-heading font-bold flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" /> Your Cart
                            </h2>
                            <Button variant="ghost" size="icon" onClick={toggleCart}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                                    <p>Your cart is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start p-3 rounded-xl bg-secondary/5 border border-secondary/10">
                                        <div>
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">₹{item.price}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive -mt-1 -mr-2"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-border space-y-4">
                            {/* Coupon Input */}
                            {!coupon ? (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                            className="flex-1 h-10 px-3 rounded-md border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                        />
                                        <Button
                                            size="sm"
                                            onClick={handleApplyCoupon}
                                            disabled={!couponCode || isVerifying}
                                        >
                                            {isVerifying ? "..." : "Apply"}
                                        </Button>
                                    </div>
                                    {error && <p className="text-xs text-destructive">{error}</p>}
                                </div>
                            ) : (
                                <div className="flex justify-between items-center bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                                    <div className="flex gap-2 items-center text-green-600 dark:text-green-400">
                                        <span className="font-mono font-bold text-sm">{coupon.code}</span>
                                        <span className="text-xs">
                                            ({coupon.type === "percentage" ? `${coupon.value}% off` : `₹${coupon.value} off`})
                                        </span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={removeCoupon} className="h-6 w-6 p-0 text-green-600 hover:text-green-700">
                                        <X className="w-3 h-3" />
                                    </Button>
                                </div>
                            )}

                            {/* Summary */}
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                                        <span>Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span>₹{finalTotal}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-12 text-base rounded-xl"
                                onClick={() => {
                                    if (!isSignedIn) {
                                        openSignIn();
                                    } else {
                                        toggleCart();
                                        window.location.href = "/checkout";
                                    }
                                }}
                            >
                                Checkout <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
