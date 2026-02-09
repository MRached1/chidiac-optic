"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-200 mx-auto mb-6" />
        <h1 className="text-2xl font-serif font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">
          Looks like you haven&apos;t added any items yet
        </p>
        <Link href="/shop">
          <Button variant="outline" size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const whatsappItems = items
    .map(
      (item) =>
        `- ${item.product.name} (${item.product.brand}) x${item.quantity} = ${formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}${item.color ? ` [${item.color}]` : ""}`
    )
    .join("\n");
  const whatsappMsg = `Hello! I'd like to place an order:\n\n${whatsappItems}\n\nTotal: ${formatPrice(subtotal)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb items={[{ label: "Cart" }]} />

      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-border">
            {items.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              return (
                <div
                  key={`${item.product.id}-${item.color || ""}`}
                  className="grid grid-cols-12 gap-4 py-5 items-center"
                >
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-sm font-medium hover:text-primary-500 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.product.brand}
                      </p>
                      {item.color && (
                        <p className="text-xs text-muted-foreground">
                          Color: {item.color}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-center text-sm">
                    {formatPrice(price)}
                  </div>

                  <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1, item.color)
                        }
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1, item.color)
                        }
                        className="p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-2 text-right flex items-center justify-end gap-3">
                    <span className="text-sm font-medium">
                      {formatPrice(price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id, item.color)}
                      className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
            <Button variant="ghost" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Cart Totals */}
        <div className="lg:col-span-1">
          <div className="bg-muted p-6 sticky top-24">
            <h2 className="text-lg font-serif font-bold mb-4">Cart Totals</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary-500">Free</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <Link href="/checkout">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <a
                href={getWhatsAppLink(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full mt-3" size="lg">
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
