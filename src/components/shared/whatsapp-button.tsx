"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/utils";

export function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink("Hello! I'm interested in your products.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
