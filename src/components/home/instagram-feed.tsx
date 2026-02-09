"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { BUSINESS } from "@/lib/constants";

const instagramImages = [
  { src: "/images/hero/hero-1.jpg", alt: "Instagram post 1" },
  { src: "/images/hero/hero-2.jpg", alt: "Instagram post 2" },
  { src: "/images/hero/hero-3.jpg", alt: "Instagram post 3" },
  { src: "/images/about/lens-fitting.jpg", alt: "Instagram post 4" },
  { src: "/images/hero/hero-1.jpg", alt: "Instagram post 5" },
];

export function InstagramFeed() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            subtitle="@chidiacoptic"
            title="Follow Us on Instagram"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {instagramImages.map((img, index) => (
              <a
                key={index}
                href={BUSINESS.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-gray-200 overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
