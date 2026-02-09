"use client";

import { Suspense } from "react";
import { ShopContent } from "@/components/shop/shop-content";
import { Skeleton } from "@/components/ui/skeleton";

function ShopLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 pt-8">
      <Skeleton className="h-6 w-48 mb-8" />
      <Skeleton className="h-10 w-64 mb-2" />
      <Skeleton className="h-4 w-32 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}
