"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Button } from "@/components/ui/button";

export function FeatureContent() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative aspect-[4/5] bg-gray-200">
              <Image
                src="/images/about/lens-fitting.jpg"
                alt="Professional lens fitting at Chidiac Optic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="lg:pl-8">
              <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-3 font-medium">
                Professional Service
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                Expert Lens Fitting & Eye Care
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 20 years of experience, Optometrist Francis Chidiac and his team provide comprehensive refraction tests and personalized lens fitting. We design, measure, fit, and adapt lenses and frames to meet each client&apos;s unique needs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you need prescription eyeglasses, 100% authentic sunglasses, or contact lenses, we take the time to understand your needs and recommend the perfect solution from our curated collection of world-renowned designer brands.
              </p>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
