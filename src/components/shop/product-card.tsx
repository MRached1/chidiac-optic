"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const hasDiscount = product.salePrice && product.salePrice < product.price;

  return (
    <div className="group">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-4">
        <Link href={`/shop/${product.slug}`}>
          {product.images[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <ShoppingBag className="w-12 h-12" />
            </div>
          )}
        </Link>

        {/* Badges */}
        {hasDiscount && (
          <Badge variant="sale" className="absolute top-3 left-3">
            -{product.discountPct || Math.round((1 - product.salePrice! / product.price) * 100)}%
          </Badge>
        )}

        {/* Hover actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addItem(product)}
            className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary-400 hover:text-white transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleItem(product.id)}
            className={cn(
              "w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary-400 hover:text-white transition-all",
              wishlisted && "bg-primary-400 text-white"
            )}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="w-10 h-10 bg-white shadow-md flex items-center justify-center hover:bg-primary-400 hover:text-white transition-all"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-sm font-medium hover:text-primary-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center justify-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-sm font-semibold text-red-500">
                {formatPrice(product.salePrice!)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
