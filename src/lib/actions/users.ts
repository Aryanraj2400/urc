"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function syncUser(payload: {
    clerkId: string;
    email: string;
    fullName?: string;
    phone?: string;
    address?: string;
    pgName?: string;
}) {
    try {
        // Check if user exists
        const [existingUser] = await db
            .select()
            .from(users)
            .where(eq(users.clerkId, payload.clerkId));

        if (existingUser) {
            // Update existing user
            const [updatedUser] = await db
                .update(users)
                .set({
                    email: payload.email,
                    fullName: payload.fullName || existingUser.fullName,
                    updatedAt: new Date(),
                })
                .where(eq(users.clerkId, payload.clerkId))
                .returning();
            return { data: updatedUser, error: null };
        } else {
            // Create new user
            const [newUser] = await db
                .insert(users)
                .values({
                    clerkId: payload.clerkId,
                    email: payload.email,
                    fullName: payload.fullName,
                    phone: payload.phone,
                    address: payload.address,
                    pgName: payload.pgName,
                })
                .returning();
            return { data: newUser, error: null };
        }
    } catch (error: any) {
        console.error("Error syncing user:", error);
        return { data: null, error: error.message };
    }
}

export async function updateProfile(payload: {
    clerkId: string;
    fullName: string;
    phone: string;
    pgName: string;
    address?: string;
}) {
    try {
        const [updatedUser] = await db
            .update(users)
            .set({
                fullName: payload.fullName,
                phone: payload.phone,
                pgName: payload.pgName,
                address: payload.address,
                updatedAt: new Date(),
            })
            .where(eq(users.clerkId, payload.clerkId))
            .returning();

        revalidatePath("/account");
        return { data: updatedUser, error: null };
    } catch (error: any) {
        console.error("Error updating profile:", error);
        return { data: null, error: error.message };
    }
}

export async function getUserProfile(clerkId: string) {
    try {
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.clerkId, clerkId));
        return { data: user, error: null };
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        return { data: null, error: error.message };
    }
}
