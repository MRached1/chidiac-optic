import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: { orderBy: { position: "asc" } },
        categories: { include: { category: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get related products from same categories
    const categoryIds = product.categories.map((c) => c.categoryId);
    const related = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        categories: {
          some: { categoryId: { in: categoryIds } },
        },
      },
      include: {
        images: { orderBy: { position: "asc" } },
        categories: { include: { category: true } },
      },
      take: 4,
    });

    return NextResponse.json({ product, related });
  } catch (error) {
    console.error("Product API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
