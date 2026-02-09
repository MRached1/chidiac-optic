"use client";

import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedProducts } from "@/components/home/featured-products";
import { FeatureContent } from "@/components/home/feature-content";
import { ServiceFeatures } from "@/components/home/service-features";
import { PromoBanners } from "@/components/home/promo-banners";
import { BookingSection } from "@/components/home/booking-section";
import { SeasonalCollection } from "@/components/home/seasonal-collection";
import { InstagramFeed } from "@/components/home/instagram-feed";
import { BrandLogos } from "@/components/home/brand-logos";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts />
      <FeatureContent />
      <ServiceFeatures />
      <PromoBanners />
      <BookingSection />
      <SeasonalCollection />
      <InstagramFeed />
      <BrandLogos />
    </>
  );
}
