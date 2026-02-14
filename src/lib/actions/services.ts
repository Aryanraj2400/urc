"use server";

import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getServices() {
    try {
        const data = await db.select().from(services).where(eq(services.isActive, true));
        return { data, error: null };
    } catch (error: any) {
        console.error("Error fetching services:", error);
        return { data: [], error: error.message };
    }
}

export async function createService(payload: any) {
    try {
        const [newService] = await db.insert(services).values(payload).returning();
        revalidatePath("/services");
        revalidatePath("/");
        revalidatePath("/admin/services");
        return { data: newService, error: null };
    } catch (error: any) {
        console.error("Error creating service:", error);
        return { data: null, error: error.message };
    }
}

export async function deleteService(id: number) {
    try {
        await db.delete(services).where(eq(services.id, id));
        revalidatePath("/services");
        revalidatePath("/");
        revalidatePath("/admin/services");
        return { error: null };
    } catch (error: any) {
        console.error("Error deleting service:", error);
        return { error: error.message };
    }
}
