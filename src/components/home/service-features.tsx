"use client";

import { Eye, Award, UserCheck } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";

const features = [
  {
    icon: Eye,
    title: "Expert Eye Care",
    description:
      "Comprehensive eye exams with state-of-the-art refraction testing by our experienced opticians.",
  },
  {
    icon: Award,
    title: "Premium Brands",
    description:
      "Curated selection of world-renowned designer eyewear from D&G, Prada, Versace, and more.",
  },
  {
    icon: UserCheck,
    title: "Personal Service",
    description:
      "One-on-one consultations to find the perfect frames and lenses tailored to your style and vision needs.",
  },
];

export function ServiceFeatures() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.15}>
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-50 text-primary-400 flex items-center justify-center rounded-full group-hover:bg-primary-400 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
