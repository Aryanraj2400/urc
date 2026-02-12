import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ServiceItem {
    id: string
    name: string
    price: number
    duration: number // in minutes
    description: string
    inclusions: string[]
    image?: string | null
    originalPrice?: number | null
}

export interface Coupon {
    code: string
    type: "fixed" | "percentage"
    value: number
    minPurchase: number
}

interface CartState {
    items: ServiceItem[]
    coupon: Coupon | null
    addItem: (item: ServiceItem) => void
    removeItem: (itemId: string) => void
    applyCoupon: (coupon: Coupon) => void
    removeCoupon: () => void
    clearCart: () => void
    isOpen: boolean
    toggleCart: () => void
    getCartTotal: () => number
    getDiscountAmount: () => number
    getFinalTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            coupon: null,
            isOpen: false,
            addItem: (item) => set((state) => {
                if (state.items.some((i) => i.id === item.id)) return state
                return { items: [...state.items, item], isOpen: true }
            }),
            removeItem: (itemId) => set((state) => ({
                items: state.items.filter((i) => i.id !== itemId)
            })),
            applyCoupon: (coupon) => set({ coupon }),
            removeCoupon: () => set({ coupon: null }),
            clearCart: () => set({ items: [], coupon: null }),
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            getCartTotal: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price, 0);
            },
            getDiscountAmount: () => {
                const { items, coupon } = get();
                const total = items.reduce((total, item) => total + item.price, 0);

                if (!coupon) return 0;
                if (total < coupon.minPurchase) return 0;

                if (coupon.type === "percentage") {
                    return Math.round((total * coupon.value) / 100);
                } else {
                    return coupon.value;
                }
            },
            getFinalTotal: () => {
                const { getCartTotal, getDiscountAmount } = get();
                const total = getCartTotal();
                const discount = getDiscountAmount();
                return Math.max(0, total - discount);
            }
        }),
        {
            name: 'cart-storage',
        }
    )
)
