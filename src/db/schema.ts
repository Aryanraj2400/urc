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

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
