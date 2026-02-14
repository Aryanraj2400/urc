import { pgTable, serial, text, integer, timestamp, boolean, doublePrecision } from 'drizzle-orm/pg-core';

export const services = pgTable('services', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    price: doublePrecision('price').notNull(),
    originalPrice: doublePrecision('original_price'),
    duration: integer('duration'), // in minutes
    image: text('image'),
    category: text('category'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    clerkId: text('clerk_id').unique().notNull(),
    email: text('email').unique().notNull(),
    fullName: text('full_name'),
    phone: text('phone'),
    address: text('address'),
    pgName: text('pg_name'),
    role: text('role').default('customer'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    totalAmount: doublePrecision('total_amount').notNull(),
    status: text('status').default('pending'), // 'pending', 'confirmed', 'completed', 'cancelled'
    scheduledAt: timestamp('scheduled_at'),
    address: text('address'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const bookingItems = pgTable('booking_items', {
    id: serial('id').primaryKey(),
    bookingId: integer('booking_id').references(() => bookings.id),
    serviceId: integer('service_id').references(() => services.id),
    priceAtBooking: doublePrecision('price_at_booking').notNull(),
    quantity: integer('quantity').default(1),
});

export const coupons = pgTable('coupons', {
    id: serial('id').primaryKey(),
    code: text('code').unique().notNull(),
    discountType: text('discount_type').notNull(), // 'percentage', 'fixed'
    discountValue: doublePrecision('discount_value').notNull(),
    minPurchase: doublePrecision('min_purchase').default(0),
    isActive: boolean('is_active').default(true),
    expiresAt: timestamp('expires_at'),
    createdAt: timestamp('created_at').defaultNow(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;

export type BookingItem = typeof bookingItems.$inferSelect;
export type NewBookingItem = typeof bookingItems.$inferInsert;

export type Coupon = typeof coupons.$inferSelect;
export type NewCoupon = typeof coupons.$inferInsert;
