"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: "women",
    title: "Women's Collection",
    description:
      "Elegant frames from Dolce & Gabbana, Prada, Versace, Swarovski, and more. Discover designs that complement your unique style.",
    image: "/images/hero/hero-1.jpg",
  },
  {
    id: "men",
    title: "Men's Collection",
    description:
      "Sophisticated eyewear from Porsche Design, Emporio Armani, Guess, and Ray-Ban. Bold frames for the modern gentleman.",
    image: "/images/hero/hero-2.jpg",
  },
  {
    id: "lenses",
    title: "Contact Lenses",
    description:
      "Premium contact lenses from Acuvue, Bella, Biofinity, and FreshLook. Experience comfort and clarity with professional fitting.",
    image: "/images/hero/hero-3.jpg",
  },
];

export function SeasonalCollection() {
  const [activeId, setActiveId] = useState("women");
  const activeCollection = collections.find((c) => c.id === activeId) || collections[0];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative aspect-[4/5] bg-gray-200 overflow-hidden">
              <Image
                key={activeCollection.id}
                src={activeCollection.image}
                alt={activeCollection.title}
                fill
                className="object-cover transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-3 font-medium">
                Collections
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
                Our Brand Collections
              </h2>

              <Accordion.Root
                type="single"
                value={activeId}
                onValueChange={(val) => val && setActiveId(val)}
                className="space-y-3"
              >
                {collections.map((collection) => (
                  <Accordion.Item
                    key={collection.id}
                    value={collection.id}
                    className="border border-border"
                  >
                    <Accordion.Trigger className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-lg hover:bg-gray-50 transition-colors group">
                      {collection.title}
                      <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                    <Accordion.Content className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden">
                      <p className="mb-4">{collection.description}</p>
                      <Link href={`/shop?category=${collection.id === "lenses" ? "contact-lenses" : collection.id}`}>
                        <Button variant="outline" size="sm">
                          Explore Collection
                        </Button>
                      </Link>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
