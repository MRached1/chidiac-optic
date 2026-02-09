"use client";

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceSlider } from "@/components/ui/price-slider";
import { Button } from "@/components/ui/button";
import { BRANDS } from "@/lib/constants";
import type { FilterState } from "@/types";

const categories = [
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Kids", value: "kids" },
  { label: "Contact Lenses", value: "contact-lenses" },
];

const lensColors = [
  "Brown", "Gray", "Green", "Blue", "Hazel", "Honey",
];

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  mobileOpen,
  onMobileClose,
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 500,
  ]);

  function updateFilter(key: keyof FilterState, value: string | number | boolean | undefined) {
    onFiltersChange({ ...filters, [key]: value, page: 1 });
  }

  function clearFilters() {
    onFiltersChange({ page: 1 });
    setPriceRange([0, 500]);
  }

  const content = (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Category</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                updateFilter(
                  "category",
                  filters.category === cat.value ? undefined : cat.value
                )
              }
              className={cn(
                "block w-full text-left text-sm py-1.5 transition-colors",
                filters.category === cat.value
                  ? "text-primary-500 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Price Range</h3>
        <PriceSlider
          min={0}
          max={500}
          value={priceRange}
          onValueChange={(val) => {
            setPriceRange(val);
            onFiltersChange({
              ...filters,
              minPrice: val[0],
              maxPrice: val[1],
              page: 1,
            });
          }}
        />
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Brand</h3>
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox.Root
                checked={filters.brand === brand}
                onCheckedChange={(checked) =>
                  updateFilter("brand", checked ? brand : undefined)
                }
                className="w-4 h-4 border border-border flex items-center justify-center data-[state=checked]:bg-primary-400 data-[state=checked]:border-primary-400"
              >
                <Checkbox.Indicator>
                  <Check className="w-3 h-3 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="text-sm text-muted-foreground">{brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lens Colors (for contact lenses) */}
      {filters.category === "contact-lenses" && (
        <div>
          <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Color</h3>
          <div className="space-y-2">
            {lensColors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  updateFilter(
                    "color",
                    filters.color === color ? undefined : color
                  )
                }
                className={cn(
                  "block w-full text-left text-sm py-1 transition-colors",
                  filters.color === color
                    ? "text-primary-500 font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        {content}
      </aside>

      {/* Mobile filter modal */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onMobileClose}
      />
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-white max-h-[80vh] overflow-y-auto rounded-t-2xl p-6 lg:hidden transition-transform",
          mobileOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-serif font-bold flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" /> Filters
          </h2>
          <button onClick={onMobileClose} className="p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        {content}
      </div>
    </>
  );
}
