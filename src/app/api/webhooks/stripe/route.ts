import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata!;

    try {
      const items = JSON.parse(metadata.items);

      // Get product prices from DB
      const productIds = items.map((item: { productId: string }) => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      const subtotal = items.reduce(
        (total: number, item: { productId: string; quantity: number }) => {
          const product = products.find((p) => p.id === item.productId);
          if (!product) return total;
          const price = product.salePrice ?? product.price;
          return total + price * item.quantity;
        },
        0
      );

      await prisma.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          status: "PROCESSING",
          customerName: metadata.customerName,
          customerEmail: session.customer_email || "",
          customerPhone: metadata.customerPhone,
          shippingAddress: metadata.shippingAddress,
          shippingCity: metadata.shippingCity,
          shippingCountry: metadata.shippingCountry,
          notes: metadata.notes || null,
          subtotal,
          total: subtotal,
          paymentMethod: "stripe",
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent as string,
          items: {
            create: items.map(
              (item: { productId: string; quantity: number; color?: string }) => {
                const product = products.find((p) => p.id === item.productId);
                return {
                  productId: item.productId,
                  quantity: item.quantity,
                  price: product ? (product.salePrice ?? product.price) : 0,
                  color: item.color || null,
                };
              }
            ),
          },
        },
      });
    } catch (error) {
      console.error("Order creation error:", error);
    }
  }

  return NextResponse.json({ received: true });
}
