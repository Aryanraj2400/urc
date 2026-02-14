"use server";

import { db } from "@/db";
import { bookings, bookingItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBooking(payload: {
    userId: number;
    totalAmount: number;
    scheduledAt: Date;
    address: string;
    items: {
        serviceId: number;
        priceAtBooking: number;
        quantity: number;
    }[];
}) {
    try {
        const result = await db.transaction(async (tx) => {
            // 1. Create the booking header
            const [newBooking] = await tx
                .insert(bookings)
                .values({
                    userId: payload.userId,
                    totalAmount: payload.totalAmount,
                    scheduledAt: payload.scheduledAt,
                    address: payload.address,
                    status: 'pending',
                })
                .returning();

            // 2. Create the booking items
            const itemsToInsert = payload.items.map((item) => ({
                bookingId: newBooking.id,
                serviceId: item.serviceId,
                priceAtBooking: item.priceAtBooking,
                quantity: item.quantity,
            }));

            await tx.insert(bookingItems).values(itemsToInsert);

            return newBooking;
        });

        revalidatePath("/admin/bookings");
        revalidatePath("/history");
        return { data: result, error: null };
    } catch (error: any) {
        console.error("Error creating booking:", error);
        return { data: null, error: error.message };
    }
}

export async function getUserBookings(userId: number) {
    try {
        const data = await db
            .select()
            .from(bookings)
            .where(eq(bookings.userId, userId))
            .orderBy(bookings.createdAt);
        return { data, error: null };
    } catch (error: any) {
        console.error("Error fetching user bookings:", error);
        return { data: [], error: error.message };
    }
}
