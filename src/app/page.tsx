"use client";

import { Hero } from "@/components/hero";
import { TrustSection } from "@/components/trust-section";
import { ServiceCard } from "@/components/services/service-card";
import { useServiceStore } from "@/store/service-store";
import { getServices } from "@/lib/actions/services";
import { useEffect, useState } from "react";

export default function Home() {
  const { services, setServices } = useServiceStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await getServices();
      if (data) setServices(data as any);
      setIsLoading(false);
    };
    fetchServices();
  }, [setServices]);

  const data = services.slice(0, 6);

  return (
    <main className="min-h-screen pb-24">
      <Hero />
      <TrustSection />

      <section id="services" className="container mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground max-w-2xl">
              Select the services you need. Our professionals come fully equipped with eco-friendly supplies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed">
              <p className="text-muted-foreground">No services available yet. Add some in the Admin panel!</p>
            </div>
          ) : (
            data.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
