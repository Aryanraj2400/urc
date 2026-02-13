"use client";

import { ShieldCheck, Leaf, Smile } from "lucide-react";

export function TrustSection() {
    return (
        <section className="py-12 bg-secondary/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-sm border border-border">
                        <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold font-heading">Background Checked</h3>
                            <p className="text-sm text-muted-foreground">Verified professionals only</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-sm border border-border">
                        <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold font-heading">Eco-friendly</h3>
                            <p className="text-sm text-muted-foreground">Safe chemicals used</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-background shadow-sm border border-border">
                        <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                            <Smile className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold font-heading">Satisfaction Guaranteed</h3>
                            <p className="text-sm text-muted-foreground">Free re-clean if unhappy</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
