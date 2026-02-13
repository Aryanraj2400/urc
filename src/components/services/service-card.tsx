"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceItem, useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const { items, addItem, removeItem } = useCartStore();
    const isInCart = items.some((item) => item.id === service.id);

    return (
        <motion.div
            layout
            className={cn(
                "bg-card rounded-2xl p-6 shadow-sm border border-background dark:border-black hover:shadow-md transition-shadow h-full flex flex-col",
                isInCart && "ring-2 ring-secondary border-secondary"
            )}
        >
            {service.image && (
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-muted dark:bg-black">
                    <img src={service.image} alt={service.name} className="object-cover w-full h-full hover:scale-105 transition-transform duration-500" />
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold font-heading mb-1">{service.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm gap-4">
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {service.duration} mins
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">₹{service.price}</span>
                            {service.originalPrice && service.originalPrice > service.price && (
                                <span className="text-xs text-muted-foreground line-through">₹{service.originalPrice}</span>
                            )}
                        </div>
                    </div>
                </div>

                {isInCart ? (
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                        onClick={() => removeItem(service.id)}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="icon"
                        className="text-secondary hover:text-secondary hover:bg-secondary/10 border-secondary/20"
                        onClick={() => addItem(service)}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                )}
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {service.description}
            </p>

            <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-foreground p-0 h-auto"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                View Details <ChevronDown className={cn("ml-1 w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
            </Button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground pt-2 border-t border-background dark:border-black">
                            {service.inclusions.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
