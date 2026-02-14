import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { db } from './index';
import { services } from './schema';

async function seed() {
    console.log('🌱 Seeding database...');

    const initialServices = [
        {
            name: 'Deep Room Cleaning',
            description: 'Comprehensive cleaning for a single room, including ceiling fans, windows, and floor scrubbing.',
            price: 899,
            originalPrice: 1299,
            duration: 120,
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80',
            category: 'Cleaning',
        },
        {
            name: 'Basic Room Cleaning',
            description: 'Quick dusting, mopping, and vacuuming for your room.',
            price: 499,
            originalPrice: 699,
            duration: 60,
            image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80',
            category: 'Cleaning',
        },
        {
            name: 'Sofa Cleaning',
            description: 'Stain removal and deep shampooing for your 3-seater sofa.',
            price: 799,
            originalPrice: 999,
            duration: 90,
            image: 'https://images.unsplash.com/photo-1556911220-e15224bbafb0?auto=format&fit=crop&q=80',
            category: 'Furniture',
        },
    ];

    for (const service of initialServices) {
        await db.insert(services).values(service);
    }

    console.log('✅ Seeding complete!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
