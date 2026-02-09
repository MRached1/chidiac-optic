"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "See the World in Style",
    subtitle: "New Collection 2025",
    description: "Discover our curated selection of premium designer eyewear",
    cta: { label: "Shop Now", href: "/shop" },
    bg: "bg-gradient-to-r from-gray-900 to-gray-700",
    image: "/images/hero/hero-1.jpg",
  },
  {
    title: "Expert Eye Care",
    subtitle: "Professional Services",
    description: "Comprehensive eye exams and personalized lens fitting",
    cta: { label: "Learn More", href: "/about" },
    bg: "bg-gradient-to-r from-primary-900 to-primary-700",
    image: "/images/hero/hero-2.jpg",
  },
  {
    title: "Premium Brands",
    subtitle: "Designer Eyewear",
    description: "From Dolce & Gabbana to Prada — find your perfect frame",
    cta: { label: "Browse Collection", href: "/shop" },
    bg: "bg-gradient-to-r from-gray-800 to-gray-600",
    image: "/images/hero/hero-3.jpg",
  },
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "flex-[0_0_100%] min-w-0 relative h-[60vh] md:h-[80vh] flex items-center",
                slide.bg
              )}
            >
              <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
                <div className="max-w-xl">
                  <p className="text-primary-400 text-sm uppercase tracking-[0.2em] mb-3 font-sans font-medium">
                    {slide.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-gray-300 text-lg mb-8 max-w-md">
                    {slide.description}
                  </p>
                  <Link href={slide.cta.href}>
                    <Button size="lg">{slide.cta.label}</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === selectedIndex
                ? "bg-primary-400 w-8"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
