"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().default("Lebanon"),
  notes: z.string().optional(),
  paymentMethod: z.enum(["stripe", "cod"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: "Lebanon",
      paymentMethod: "cod",
    },
  });

  const paymentMethod = watch("paymentMethod");
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">No items in cart</h1>
        <Link href="/shop">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  async function onSubmit(data: CheckoutForm) {
    setSubmitting(true);

    if (data.paymentMethod === "stripe") {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
              color: item.color,
            })),
            customer: data,
          }),
        });
        const { url } = await res.json();
        if (url) {
          window.location.href = url;
          return;
        }
      } catch (error) {
        console.error("Checkout error:", error);
      }
      setSubmitting(false);
      return;
    }

    // Cash on Delivery - send WhatsApp
    const orderItems = items
      .map(
        (item) =>
          `${item.product.name} x${item.quantity} = ${formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}`
      )
      .join("\n");
    const msg = `New Order (Cash on Delivery)\n\nCustomer: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nAddress: ${data.address}, ${data.city}, ${data.country}\n${data.notes ? `Notes: ${data.notes}\n` : ""}\nItems:\n${orderItems}\n\nTotal: ${formatPrice(subtotal)}`;

    window.open(getWhatsAppLink(msg), "_blank");
    clearCart();
    router.push("/checkout/success");
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Billing Form */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-lg font-serif font-bold">Billing Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">First Name *</label>
                <Input {...register("firstName")} error={errors.firstName?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Last Name *</label>
                <Input {...register("lastName")} error={errors.lastName?.message} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email *</label>
              <Input type="email" {...register("email")} error={errors.email?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Phone *</label>
              <Input type="tel" {...register("phone")} error={errors.phone?.message} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Address *</label>
              <Input {...register("address")} error={errors.address?.message} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">City *</label>
                <Input {...register("city")} error={errors.city?.message} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Country</label>
                <Input {...register("country")} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Order Notes</label>
              <Textarea
                {...register("notes")}
                placeholder="Any special instructions..."
              />
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-lg font-serif font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-border cursor-pointer hover:border-primary-400 transition-colors has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    className="accent-primary-400"
                  />
                  <div>
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-border cursor-pointer hover:border-primary-400 transition-colors has-[:checked]:border-primary-400 has-[:checked]:bg-primary-50">
                  <input
                    type="radio"
                    value="stripe"
                    {...register("paymentMethod")}
                    className="accent-primary-400"
                  />
                  <div>
                    <p className="text-sm font-medium">Credit / Debit Card</p>
                    <p className="text-xs text-muted-foreground">
                      Secure payment via Stripe
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-muted p-6 sticky top-24">
              <h2 className="text-lg font-serif font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.color || ""}`}
                    className="flex items-center gap-3"
                  >
                    <div className="relative w-14 h-14 bg-gray-100 flex-shrink-0">
                      {item.product.images[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        x{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatPrice(
                        (item.product.salePrice ?? item.product.price) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-border pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary-500">Free</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting
                  ? "Processing..."
                  : paymentMethod === "stripe"
                  ? "Pay with Card"
                  : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
