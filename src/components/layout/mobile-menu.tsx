"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[300px] bg-white shadow-xl transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-lg font-serif font-bold">Menu</span>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="py-2">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <div className="flex items-center">
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex-1 px-5 py-3 text-sm uppercase tracking-wider font-medium hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
                {"children" in link && link.children && (
                  <button
                    onClick={() =>
                      setExpandedItem(
                        expandedItem === link.label ? null : link.label
                      )
                    }
                    className="px-4 py-3 hover:bg-gray-50"
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedItem === link.label && "rotate-180"
                      )}
                    />
                  </button>
                )}
              </div>
              {"children" in link &&
                link.children &&
                expandedItem === link.label && (
                  <div className="bg-gray-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={onClose}
                        className="block px-8 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border text-sm text-muted-foreground space-y-1.5">
          <p>{BUSINESS.phone}</p>
          <p>{BUSINESS.email}</p>
        </div>
      </div>
    </>
  );
}
