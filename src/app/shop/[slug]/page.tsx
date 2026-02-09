"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { Minus, Plus, Heart, Share2, ShoppingBag } from "lucide-react";
import { cn, formatPrice, getWhatsAppLink } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import type { Product } from "@/types";

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-6 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="aspect-square" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
        <Link href="/shop">
          <Button variant="outline">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const wishlisted = isInWishlist(product.id);
  const categoryName = product.categories[0]?.category?.name || "Shop";
  const categorySlug = product.categories[0]?.category?.slug || "";
  const isContactLens = categorySlug === "contact-lenses";

  const lensColors = isContactLens
    ? product.lensColor?.split(",").map((c) => c.trim()) || []
    : [];

  function handleAddToCart() {
    addItem(product!, quantity, selectedColor);
    setQuantity(1);
  }

  const whatsappMsg = `Hi! I'm interested in ${product.name} (${product.brand}) - ${formatPrice(product.salePrice ?? product.price)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          { label: categoryName, href: `/shop?category=${categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden">
            {product.images[selectedImage] ? (
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ShoppingBag className="w-20 h-20" />
              </div>
            )}
            {hasDiscount && (
              <Badge variant="sale" className="absolute top-4 left-4">
                Sale
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 bg-gray-100 border-2 transition-colors",
                    index === selectedImage
                      ? "border-primary-400"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || ""}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
            {product.brand}
          </p>
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            {hasDiscount ? (
              <>
                <span className="text-2xl font-bold text-red-500">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
                <Badge variant="sale">
                  -{product.discountPct || Math.round((1 - product.salePrice! / product.price) * 100)}%
                </Badge>
              </>
            ) : (
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>
          )}

          {/* Contact Lens Color Selector */}
          {isContactLens && lensColors.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Color</label>
              <select
                value={selectedColor || ""}
                onChange={(e) => setSelectedColor(e.target.value || undefined)}
                className="w-full border border-border px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary-400"
              >
                <option value="">Select a color</option>
                {lensColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2.5 hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 py-2.5 text-sm font-medium border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2.5 hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={isContactLens && lensColors.length > 0 && !selectedColor}
              className="flex-1"
            >
              Add to Cart
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => toggleItem(product.id)}
              className={cn(
                "flex items-center gap-2 text-sm transition-colors",
                wishlisted
                  ? "text-primary-500"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className={cn("w-4 h-4", wishlisted && "fill-current")} />
              {wishlisted ? "In Wishlist" : "Add to Wishlist"}
            </button>
            <a
              href={getWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </a>
          </div>

          {/* Product Tabs */}
          <Tabs.Root defaultValue="description" className="border-t border-border pt-6">
            <Tabs.List className="flex gap-6 mb-6">
              <Tabs.Trigger
                value="description"
                className="text-sm uppercase tracking-wider font-medium pb-2 border-b-2 border-transparent data-[state=active]:border-primary-400 data-[state=active]:text-primary-500 text-muted-foreground transition-colors"
              >
                Description
              </Tabs.Trigger>
              <Tabs.Trigger
                value="info"
                className="text-sm uppercase tracking-wider font-medium pb-2 border-b-2 border-transparent data-[state=active]:border-primary-400 data-[state=active]:text-primary-500 text-muted-foreground transition-colors"
              >
                Additional Info
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="description" className="text-sm text-muted-foreground leading-relaxed">
              {product.description || "No description available."}
            </Tabs.Content>

            <Tabs.Content value="info">
              <table className="w-full text-sm">
                <tbody>
                  {product.brand && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium w-1/3">Brand</td>
                      <td className="py-2.5 text-muted-foreground">{product.brand}</td>
                    </tr>
                  )}
                  {product.material && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">Material</td>
                      <td className="py-2.5 text-muted-foreground">{product.material}</td>
                    </tr>
                  )}
                  {product.frameStyle && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">Frame Style</td>
                      <td className="py-2.5 text-muted-foreground">{product.frameStyle}</td>
                    </tr>
                  )}
                  {product.lensColor && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">Lens Color</td>
                      <td className="py-2.5 text-muted-foreground">{product.lensColor}</td>
                    </tr>
                  )}
                  {product.uvProtection && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">UV Protection</td>
                      <td className="py-2.5 text-muted-foreground">{product.uvProtection}</td>
                    </tr>
                  )}
                  {product.dimensions && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">Dimensions</td>
                      <td className="py-2.5 text-muted-foreground">{product.dimensions}</td>
                    </tr>
                  )}
                  {product.sku && (
                    <tr className="border-b border-border">
                      <td className="py-2.5 font-medium">SKU</td>
                      <td className="py-2.5 text-muted-foreground">{product.sku}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <SectionHeading subtitle="You May Also Like" title="Related Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
