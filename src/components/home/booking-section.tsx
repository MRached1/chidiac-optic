"use client";

import { Eye, Calendar, Contact } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getWhatsAppLink } from "@/lib/utils";

const cards = [
  {
    icon: Eye,
    title: "Eye Exams",
    description:
      "Comprehensive refraction tests using modern equipment to accurately assess your vision and eye health.",
    cta: "Book an Exam",
    href: getWhatsAppLink("Hello! I'd like to book an eye exam."),
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description:
      "Schedule a personalized consultation with our expert opticians at your convenience.",
    cta: "Book Now",
    href: getWhatsAppLink("Hello! I'd like to book an appointment."),
  },
  {
    icon: Contact,
    title: "Contact Lens Fitting",
    description:
      "Professional fitting and guidance for comfortable, clear vision with contact lenses.",
    cta: "Get Fitted",
    href: getWhatsAppLink("Hello! I'd like to schedule a contact lens fitting."),
  },
];

export function BookingSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            subtitle="Our Services"
            title="Book Your Visit"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <AnimatedSection key={card.title} delay={index * 0.15}>
              <div className="bg-white p-8 text-center group hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 mx-auto mb-5 bg-primary-50 text-primary-400 flex items-center justify-center rounded-full group-hover:bg-primary-400 group-hover:text-white transition-all duration-300">
                  <card.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm uppercase tracking-wider font-medium text-primary-500 hover:text-primary-600 transition-colors border-b border-primary-500 pb-0.5"
                >
                  {card.cta}
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
