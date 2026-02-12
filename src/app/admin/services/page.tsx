"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { useServiceStore } from "@/store/service-store";

export default function AdminServices() {
    const { services, addService, removeService } = useServiceStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        originalPrice: "",
        duration: "",
        description: "",
        inclusions: "",
        image: "",
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const newService = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            price: Number(formData.price),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
            duration: Number(formData.duration),
            description: formData.description,
            inclusions: formData.inclusions.split("\n").filter(i => i.trim()),
            image: formData.image || null,
        };

        addService(newService);
        setIsSaving(false);
        setIsFormOpen(false);
        setFormData({
            name: "",
            price: "",
            originalPrice: "",
            duration: "",
            description: "",
            inclusions: "",
            image: "",
        });
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            removeService(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services Management</h1>
                    <p className="text-muted-foreground">Add, edit, or remove services from your platform.</p>
                </div>
                {!isFormOpen && (
                    <Button onClick={() => setIsFormOpen(true)} className="rounded-full shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Service
                    </Button>
                )}
            </div>

            {isFormOpen && (
                <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-primary" />
                            New Service Details
                        </CardTitle>
                        <CardDescription>Fill in the information for the new service offering.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Service Name</Label>
                                    <Input id="name" placeholder="e.g. Deep Room Cleaning" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Service Image</Label>
                                    <div className="flex flex-col gap-4">
                                        <div
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                            className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-4 hover:border-primary/50 transition-colors cursor-pointer bg-background/50 flex flex-col items-center justify-center gap-2 min-h-[120px]"
                                        >
                                            {formData.image ? (
                                                <div className="relative w-full h-32">
                                                    <img src={formData.image} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                        <p className="text-white text-xs font-bold">Change Image</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                                    <div className="text-center">
                                                        <p className="text-sm font-medium">Click to upload photo</p>
                                                        <p className="text-xs text-muted-foreground">Supported: JPG, PNG, WEBP</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, image: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Discounted Price (₹)</Label>
                                    <Input id="price" type="number" placeholder="899" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                                    <Input id="originalPrice" type="number" placeholder="1299" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} className="bg-background/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration">Duration (minutes)</Label>
                                    <Input id="duration" type="number" placeholder="60" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} required className="bg-background/50" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Short Description</Label>
                                    <Input id="description" placeholder="Short summary of the service" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required className="bg-background/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inclusions">Inclusions (one per line)</Label>
                                <Textarea id="inclusions" rows={4} placeholder="Dust removal&#10;Floor scrubbing&#10;Window cleaning" value={formData.inclusions} onChange={e => setFormData({ ...formData, inclusions: e.target.value })} required className="bg-background/50" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="rounded-full">Cancel</Button>
                                <Button type="submit" disabled={isSaving} className="rounded-full px-8">
                                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                                    Create Service
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <Card className="border-none shadow-md bg-card/40 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead className="font-semibold px-6 py-4">Name</TableHead>
                                <TableHead className="font-semibold">Price</TableHead>
                                <TableHead className="font-semibold">Duration</TableHead>
                                <TableHead className="font-semibold">Inclusions</TableHead>
                                <TableHead className="font-semibold text-right px-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center">
                                        <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                                        <p className="mt-2 text-muted-foreground">Loading services...</p>
                                    </TableCell>
                                </TableRow>
                            ) : services.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-48 text-center text-muted-foreground">
                                        No services found. Add your first service to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                services.map((service) => (
                                    <TableRow key={service.id} className="group transition-colors hover:bg-muted/30">
                                        <TableCell>
                                            {service.image ? (
                                                <div className="relative h-12 w-20 rounded-md overflow-hidden bg-muted">
                                                    <img src={service.image} alt={service.name} className="object-cover h-full w-full" />
                                                </div>
                                            ) : (
                                                <div className="h-12 w-20 rounded-md bg-muted flex items-center justify-center">
                                                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 font-medium">{service.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary font-bold w-fit">
                                                    ₹{service.price}
                                                </Badge>
                                                {service.originalPrice && (
                                                    <span className="text-xs text-muted-foreground line-through mt-1 ml-1">
                                                        ₹{service.originalPrice}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{service.duration} mins</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 flex-wrap">
                                                {service.inclusions?.slice(0, 2).map((inc: string, idx: number) => (
                                                    <Badge key={idx} variant="outline" className="text-[10px] whitespace-nowrap">
                                                        {inc}
                                                    </Badge>
                                                ))}
                                                {service.inclusions?.length > 2 && (
                                                    <span className="text-[10px] text-muted-foreground">+{service.inclusions.length - 2} more</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right px-6 pr-6">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                                    onClick={() => handleDelete(service.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
