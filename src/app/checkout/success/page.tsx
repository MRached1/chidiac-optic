"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 text-primary-400 mx-auto mb-6" />
      <h1 className="text-3xl font-serif font-bold mb-4">
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground mb-2">
        Thank you for your order. We&apos;ve received your purchase and will begin processing it right away.
      </p>
      <p className="text-muted-foreground mb-8">
        You will receive a confirmation email shortly with your order details.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link href="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}
