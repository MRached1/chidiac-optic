"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, LayoutGrid } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { SortDropdown } from "@/components/shop/sort-dropdown";
import type { Product, FilterState } from "@/types";

export function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters: FilterState = {
    category: searchParams.get("category") || undefined,
    brand: searchParams.get("brand") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    color: searchParams.get("color") || undefined,
    search: searchParams.get("search") || undefined,
    sort: searchParams.get("sort") || "default",
    sale: searchParams.get("sale") === "true" || undefined,
    page: Number(searchParams.get("page")) || 1,
  };

  const updateUrl = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "" && value !== false) {
          params.set(key, String(value));
        }
      });
      router.push(`/shop?${params.toString()}`);
    },
    [router]
  );

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      <Breadcrumb items={[{ label: "Shop" }]} />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold">
            {filters.category
              ? filters.category.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())
              : filters.search
              ? `Search: "${filters.search}"`
              : "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {total} product{total !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm border border-border px-4 py-2"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <SortDropdown
            value={filters.sort || "default"}
            onChange={(sort) => updateUrl({ ...filters, sort, page: 1 })}
          />
        </div>
      </div>

      <div className="flex gap-10">
        <FilterSidebar
          filters={filters}
          onFiltersChange={updateUrl}
          mobileOpen={mobileFiltersOpen}
          onMobileClose={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <LayoutGrid className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground text-sm">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={(page) => updateUrl({ ...filters, page })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
