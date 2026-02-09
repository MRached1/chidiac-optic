"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Button } from "@/components/ui/button";

export function PromoBanners() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedSection>
            <ParallaxImage
              src="/images/hero/hero-1.jpg"
              alt="Quality eyewear collection"
              className="h-[400px] md:h-[500px]"
              overlay
            >
              <div className="flex items-center justify-center h-[400px] md:h-[500px] text-center text-white p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-2">
                    Premium Collection
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Quality Eyewear
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-sm mx-auto">
                    Handpicked designer frames for every style and occasion
                  </p>
                  <Link href="/shop">
                    <Button>Shop Now</Button>
                  </Link>
                </div>
              </div>
            </ParallaxImage>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ParallaxImage
              src="/images/hero/hero-2.jpg"
              alt="Professional optical team"
              className="h-[400px] md:h-[500px]"
              overlay
            >
              <div className="flex items-center justify-center h-[400px] md:h-[500px] text-center text-white p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-2">
                    Expert Team
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                    Professional Team
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-sm mx-auto">
                    Dedicated opticians committed to your perfect vision
                  </p>
                  <Link href="/about">
                    <Button>Learn More</Button>
                  </Link>
                </div>
              </div>
            </ParallaxImage>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
