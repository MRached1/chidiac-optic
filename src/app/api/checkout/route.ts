import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    // Verify product prices from database
    const productIds = items.map((item: { productId: string }) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      include: { images: { take: 1, orderBy: { position: "asc" } } },
    });

    const lineItems = items.map((item: { productId: string; quantity: number; color?: string }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Product not found: ${item.productId}`);

      const price = product.salePrice ?? product.price;

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: `${product.brand}${item.color ? ` - ${item.color}` : ""}`,
            images: product.images[0] ? [product.images[0].url] : [],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      customer_email: customer.email,
      metadata: {
        customerName: `${customer.firstName} ${customer.lastName}`,
        customerPhone: customer.phone,
        shippingAddress: customer.address,
        shippingCity: customer.city,
        shippingCountry: customer.country,
        notes: customer.notes || "",
        items: JSON.stringify(
          items.map((item: { productId: string; quantity: number; color?: string }) => ({
            productId: item.productId,
            quantity: item.quantity,
            color: item.color,
          }))
        ),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
