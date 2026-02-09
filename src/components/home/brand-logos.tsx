"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { BRANDS } from "@/lib/constants";

export function BrandLogos() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <SectionHeading subtitle="Our Partners" title="Premium Brands" />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {BRANDS.map((brand) => (
                <div
                  key={brand}
                  className="flex-[0_0_auto] min-w-0 px-6 md:px-10"
                >
                  <div className="h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 cursor-default">
                    <span className="text-sm md:text-base font-semibold tracking-wider uppercase text-foreground whitespace-nowrap">
                      {brand}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
