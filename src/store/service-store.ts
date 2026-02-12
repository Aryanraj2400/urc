import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServiceItem } from "./cart-store";

interface ServiceStore {
    services: ServiceItem[];
    addService: (service: ServiceItem) => void;
    updateService: (service: ServiceItem) => void;
    removeService: (id: string) => void;
    setServices: (services: ServiceItem[]) => void;
}

export const useServiceStore = create<ServiceStore>()(
    persist(
        (set) => ({
            services: [],
            addService: (service) => set((state) => ({
                services: [...state.services, service]
            })),
            updateService: (updatedService) => set((state) => ({
                services: state.services.map((s) => s.id === updatedService.id ? updatedService : s)
            })),
            removeService: (id) => set((state) => ({
                services: state.services.filter((s) => s.id !== id)
            })),
            setServices: (services) => set({ services }),
        }),
        {
            name: "service-storage",
        }
    )
);
