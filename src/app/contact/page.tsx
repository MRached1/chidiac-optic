"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, MessageCircle, CheckCircle, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ParallaxImage } from "@/components/shared/parallax-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BUSINESS } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [BUSINESS.location],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: [BUSINESS.phone, BUSINESS.mobile],
  },
  {
    icon: MessageCircle,
    title: "Message Us",
    lines: [BUSINESS.email, `WhatsApp: ${BUSINESS.whatsapp}`],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: [BUSINESS.workingHours.weekdays, BUSINESS.workingHours.weekend],
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactForm) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // Handle error
    }
    setSubmitting(false);
  }

  return (
    <div>
      {/* Hero Banner */}
      <ParallaxImage
        src="/images/hero/hero-3.jpg"
        alt="Contact Chidiac Optic"
        className="h-[40vh] md:h-[50vh]"
        overlay
      >
        <div className="flex items-center justify-center h-[40vh] md:h-[50vh] text-center">
          <div>
            <p className="text-primary-400 text-sm uppercase tracking-[0.2em] mb-3 font-medium">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Contact Us
            </h1>
          </div>
        </div>
      </ParallaxImage>

      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb items={[{ label: "Contact Us" }]} />

        {/* Contact Cards */}
        <section className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, index) => (
              <AnimatedSection key={card.title} delay={index * 0.1}>
                <div className="bg-muted p-8 text-center">
                  <card.icon className="w-10 h-10 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-bold mb-3">{card.title}</h3>
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground">
                      {line}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-12 bg-primary-50 rounded">
                    <CheckCircle className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-serif font-bold mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Name *
                      </label>
                      <Input
                        {...register("name")}
                        error={errors.name?.message}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Email *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        error={errors.email?.message}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        {...register("phone")}
                        placeholder="+961 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">
                        Message *
                      </label>
                      <Textarea
                        {...register("message")}
                        error={errors.message?.message}
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Find Us
                </h2>
                <div className="aspect-[4/3] bg-gray-200">
                  <iframe
                    src={BUSINESS.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chidiac Optic Location"
                  />
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Chidiac Optic</p>
                  <p>{BUSINESS.location}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>
    </div>
  );
}
