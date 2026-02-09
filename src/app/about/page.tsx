"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Award, UserCheck, Glasses, Contact, Stethoscope } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BUSINESS } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

const services = [
  {
    icon: Stethoscope,
    title: "Refraction Tests",
    description: "Comprehensive eye examinations using modern equipment to accurately assess your vision.",
  },
  {
    icon: Glasses,
    title: "Eyeglasses & Sunglasses",
    description: "Premium designer frames and lenses tailored to your prescription and style preferences.",
  },
  {
    icon: Contact,
    title: "Contact Lenses",
    description: "Professional fitting and guidance for comfortable, clear contact lens wear.",
  },
  {
    icon: Eye,
    title: "Lens Fitting",
    description: "Expert lens selection and fitting to ensure optimal visual clarity and comfort.",
  },
  {
    icon: Award,
    title: "Designer Brands",
    description: "Curated collection of world-renowned brands including D&G, Prada, Versace, and more.",
  },
  {
    icon: UserCheck,
    title: "Personal Consultations",
    description: "One-on-one appointments with our experienced opticians for personalized recommendations.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <ParallaxImage
        src="/images/hero/hero-2.jpg"
        alt="About Chidiac Optic"
        className="h-[40vh] md:h-[50vh]"
        overlay
      >
        <div className="flex items-center justify-center h-[40vh] md:h-[50vh] text-center">
          <div>
            <p className="text-primary-400 text-sm uppercase tracking-[0.2em] mb-3 font-medium">
              About Us
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Our Story
            </h1>
          </div>
        </div>
      </ParallaxImage>

      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb items={[{ label: "About Us" }]} />

        {/* Service Cards */}
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Eye, title: "Expert Eye Care", desc: "State-of-the-art examinations" },
              { icon: Award, title: "Premium Brands", desc: "World-renowned designers" },
              { icon: UserCheck, title: "Personal Service", desc: "Tailored to your needs" },
            ].map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="bg-muted p-8 text-center">
                  <card.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Content Block */}
        <section className="pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative aspect-[4/5] bg-gray-200">
                <Image
                  src="/images/about/lens-fitting.jpg"
                  alt="Chidiac Optic store"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary-400 mb-3 font-medium">
                  Who We Are
                </p>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 leading-tight">
                  Your Trusted Optical Destination in Bickfaya
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chidiac Optic is your premier destination for quality eyewear and professional optical services in Bickfaya, Lebanon. We are dedicated to helping you see the world clearly and stylishly.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our experienced team of opticians combines cutting-edge technology with personalized care to deliver the best visual solutions for each of our clients. From comprehensive eye exams to custom lens fitting, we provide end-to-end optical services.
                </p>
                <blockquote className="border-l-4 border-primary-400 pl-4 my-6 italic text-lg font-serif text-foreground">
                  {BUSINESS.tagline}
                </blockquote>
                <p className="text-muted-foreground leading-relaxed">
                  With a curated selection of designer brands including Dolce & Gabbana, Prada, Versace, Porsche Design, and more, we ensure you find the perfect frames that match both your vision needs and personal style.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Services */}
        <section className="pb-16">
          <AnimatedSection>
            <SectionHeading subtitle="What We Offer" title="Our Services" />
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="p-6 border border-border hover:border-primary-400 hover:shadow-md transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary-400 mb-4" />
                  <h3 className="text-lg font-serif font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Booking CTA */}
        <AnimatedSection>
          <section className="mb-16 bg-foreground text-white p-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready for Better Vision?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Book your appointment today and let our experts help you find the perfect eyewear solution.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a href={getWhatsAppLink("Hello! I'd like to book an appointment.")}>
                <Button size="lg">Book Appointment</Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground">
                  Contact Us
                </Button>
              </Link>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}
