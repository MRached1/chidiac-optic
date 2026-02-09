"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery("");
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-white flex items-start justify-center pt-[20vh] transition-all duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl px-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full text-3xl md:text-4xl font-serif border-b-2 border-foreground pb-4 bg-transparent focus:outline-none placeholder:text-gray-300"
            autoFocus={open}
          />
          <button
            type="submit"
            className="absolute right-0 bottom-4 p-1"
            aria-label="Search"
          >
            <Search className="w-7 h-7" />
          </button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Type and press enter to search
        </p>
      </form>
    </div>
  );
}
