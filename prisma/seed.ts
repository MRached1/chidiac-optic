import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Women", slug: "women" },
  { name: "Men", slug: "men" },
  { name: "Kids", slug: "kids" },
  { name: "Contact Lenses", slug: "contact-lenses" },
];

interface ProductData {
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  salePrice?: number;
  discountPct?: number;
  category: string;
  featured: boolean;
  material?: string;
  frameStyle?: string;
  lensColor?: string;
  uvProtection?: string;
  images: string[];
}

const products: ProductData[] = [
  // ============ WOMEN (29) ============
  { name: "DG4348 Butterfly Sunglasses", slug: "dg4348-butterfly-sunglasses", brand: "Dolce & Gabbana", description: "Elegant butterfly frame sunglasses with refined detailing. A sophisticated choice for the modern woman.", price: 280, category: "women", featured: true, material: "Acetate", frameStyle: "Butterfly", uvProtection: "UV400", images: ["/images/products/women-01a.jpg"] },
  { name: "DG4386 Cat Eye Sunglasses", slug: "dg4386-cat-eye-sunglasses", brand: "Dolce & Gabbana", description: "Bold cat eye frames with the iconic DG logo. Statement eyewear for confident women.", price: 295, salePrice: 250, discountPct: 15, category: "women", featured: true, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/women-02a.webp", "/images/products/women-02b.webp"] },
  { name: "DG6152 Oversized Sunglasses", slug: "dg6152-oversized-sunglasses", brand: "Dolce & Gabbana", description: "Glamorous oversized sunglasses with gradient lenses. A classic D&G silhouette.", price: 310, category: "women", featured: false, material: "Metal/Acetate", frameStyle: "Oversized", uvProtection: "UV400", images: ["/images/products/women-03a.jpg", "/images/products/women-03b.jpg"] },
  { name: "DG2220 Metal Sunglasses", slug: "dg2220-metal-sunglasses-women", brand: "Dolce & Gabbana", description: "Sleek metal frame sunglasses with double bridge detail.", price: 265, category: "women", featured: false, material: "Metal", frameStyle: "Aviator", uvProtection: "UV400", images: ["/images/products/women-04a.webp"] },
  { name: "P8478 Aviator Sunglasses", slug: "p8478-aviator-sunglasses-women", brand: "Porsche Design", description: "Iconic interchangeable lens aviator sunglasses. Lightweight titanium construction.", price: 450, salePrice: 380, discountPct: 16, category: "women", featured: true, material: "Titanium", frameStyle: "Aviator", uvProtection: "UV400", images: ["/images/products/women-05a.jpg"] },
  { name: "P8688 Square Sunglasses", slug: "p8688-square-sunglasses-women", brand: "Porsche Design", description: "Modern square frame sunglasses with premium German engineering.", price: 395, category: "women", featured: false, material: "Titanium/Acetate", frameStyle: "Square", uvProtection: "UV400", images: ["/images/products/women-06a.webp", "/images/products/women-06b.webp"] },
  { name: "SPR 07Y Cat Eye Glasses", slug: "spr-07y-cat-eye-glasses", brand: "Prada", description: "Refined cat eye optical frames with subtle Prada branding.", price: 340, category: "women", featured: true, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "N/A", images: ["/images/products/women-07a.webp"] },
  { name: "SPR 18W Oval Sunglasses", slug: "spr-18w-oval-sunglasses", brand: "Prada", description: "Chic oval sunglasses with polarized lenses and Prada logo temples.", price: 380, category: "women", featured: false, material: "Acetate", frameStyle: "Oval", uvProtection: "UV400", images: ["/images/products/women-08a.webp"] },
  { name: "VE4409 Round Sunglasses", slug: "ve4409-round-sunglasses", brand: "Versace", description: "Luxurious round sunglasses featuring the Medusa logo and gold accents.", price: 290, salePrice: 245, discountPct: 15, category: "women", featured: false, material: "Acetate", frameStyle: "Round", uvProtection: "UV400", images: ["/images/products/women-09a.webp", "/images/products/women-09b.webp"] },
  { name: "VE2232 Shield Sunglasses", slug: "ve2232-shield-sunglasses", brand: "Versace", description: "Bold shield sunglasses with Versace Greca motif.", price: 320, category: "women", featured: false, material: "Metal", frameStyle: "Shield", uvProtection: "UV400", images: ["/images/products/women-10a.webp", "/images/products/women-10b.webp"] },
  { name: "EA4178 Rectangular Sunglasses", slug: "ea4178-rectangular-sunglasses-women", brand: "Emporio Armani", description: "Sleek rectangular sunglasses with clean lines and EA eagle logo.", price: 185, category: "women", featured: false, material: "Acetate", frameStyle: "Rectangular", uvProtection: "UV400", images: ["/images/products/women-11a.webp", "/images/products/women-11b.webp"] },
  { name: "GU7725 Round Sunglasses", slug: "gu7725-round-sunglasses", brand: "Guess", description: "Trendy round sunglasses with Guess triangle logo on temples.", price: 120, salePrice: 95, discountPct: 21, category: "women", featured: false, material: "Acetate", frameStyle: "Round", uvProtection: "UV400", images: ["/images/products/women-12a.webp", "/images/products/women-12b.webp"] },
  { name: "GU7829 Cat Eye Sunglasses", slug: "gu7829-cat-eye-sunglasses", brand: "Guess", description: "Feminine cat eye sunglasses with gradient lenses.", price: 115, category: "women", featured: false, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/women-13a.webp", "/images/products/women-13b.webp"] },
  { name: "GU7851 Oversized Sunglasses", slug: "gu7851-oversized-sunglasses", brand: "Guess", description: "Glamorous oversized sunglasses perfect for sunny days.", price: 125, category: "women", featured: false, material: "Acetate", frameStyle: "Oversized", uvProtection: "UV400", images: ["/images/products/women-14a.jpg", "/images/products/women-14b.webp"] },
  { name: "SFU540 Square Sunglasses", slug: "sfu540-square-sunglasses", brand: "Furla", description: "Italian design square sunglasses with elegant temple detailing.", price: 175, category: "women", featured: false, material: "Acetate", frameStyle: "Square", uvProtection: "UV400", images: ["/images/products/women-15a.webp", "/images/products/women-15b.webp"] },
  { name: "SFU625 Cat Eye Sunglasses", slug: "sfu625-cat-eye-sunglasses", brand: "Furla", description: "Sophisticated cat eye frames with Furla logo accent.", price: 180, category: "women", featured: false, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/IMG_6575.jpg"] },
  { name: "SK0380 Crystal Sunglasses", slug: "sk0380-crystal-sunglasses", brand: "Swarovski", description: "Sparkling sunglasses with Swarovski crystal embellishments.", price: 295, salePrice: 250, discountPct: 15, category: "women", featured: true, material: "Acetate/Crystal", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/IMG_6580.jpg"] },
  { name: "SK0395 Oval Sunglasses", slug: "sk0395-oval-sunglasses", brand: "Swarovski", description: "Elegant oval sunglasses with subtle crystal details.", price: 285, category: "women", featured: false, material: "Acetate", frameStyle: "Oval", uvProtection: "UV400", images: ["/images/products/IMG_6582.jpg"] },
  { name: "MU 02YS Cat Eye Sunglasses", slug: "mu-02ys-cat-eye-sunglasses", brand: "Miu Miu", description: "Playful cat eye sunglasses from the Prada sub-brand. Bold and fashion-forward.", price: 360, category: "women", featured: false, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/IMG_6588.jpg"] },
  { name: "MU 04YS Round Sunglasses", slug: "mu-04ys-round-sunglasses", brand: "Miu Miu", description: "Retro-inspired round sunglasses with Miu Miu detailing.", price: 345, category: "women", featured: false, material: "Acetate/Metal", frameStyle: "Round", uvProtection: "UV400", images: ["/images/products/IMG_6597.jpg"] },
  { name: "RA5292 Square Sunglasses", slug: "ra5292-square-sunglasses", brand: "Ralph Lauren", description: "Timeless square sunglasses with polo player logo.", price: 165, category: "women", featured: false, material: "Acetate", frameStyle: "Square", uvProtection: "UV400", images: ["/images/products/women-03a.jpg"] },
  { name: "RA5283 Butterfly Sunglasses", slug: "ra5283-butterfly-sunglasses", brand: "Ralph Lauren", description: "Classic butterfly frame with refined Ralph Lauren styling.", price: 155, salePrice: 130, discountPct: 16, category: "women", featured: false, material: "Acetate", frameStyle: "Butterfly", uvProtection: "UV400", images: ["/images/products/women-04a.webp"] },
  { name: "JC862S Cat Eye Sunglasses", slug: "jc862s-cat-eye-sunglasses", brand: "Just Cavalli", description: "Edgy cat eye sunglasses with bold Just Cavalli branding.", price: 145, category: "women", featured: false, material: "Acetate", frameStyle: "Cat Eye", uvProtection: "UV400", images: ["/images/products/women-07a.webp"] },
  { name: "JC905S Oversized Sunglasses", slug: "jc905s-oversized-sunglasses", brand: "Just Cavalli", description: "Oversized frames with Just Cavalli snake logo detail.", price: 140, category: "women", featured: false, material: "Acetate", frameStyle: "Oversized", uvProtection: "UV400", images: ["/images/products/women-08a.webp"] },
  { name: "DG5085 Rectangle Optical", slug: "dg5085-rectangle-optical", brand: "Dolce & Gabbana", description: "Sophisticated rectangular optical frames for a professional look.", price: 245, category: "women", featured: false, material: "Acetate", frameStyle: "Rectangle", images: ["/images/products/women-09a.webp"] },
  { name: "EA1131 Round Optical", slug: "ea1131-round-optical-women", brand: "Emporio Armani", description: "Lightweight round optical frames with clean design.", price: 165, category: "women", featured: false, material: "Metal", frameStyle: "Round", images: ["/images/products/women-10a.webp"] },
  { name: "VPR 10Y Square Optical", slug: "vpr-10y-square-optical", brand: "Prada", description: "Premium square optical frames with Prada logo.", price: 310, category: "women", featured: false, material: "Acetate", frameStyle: "Square", images: ["/images/products/women-11a.webp"] },
  { name: "GU2873 Oval Optical", slug: "gu2873-oval-optical", brand: "Guess", description: "Charming oval optical frames with rhinestone accents.", price: 95, category: "women", featured: false, material: "Acetate", frameStyle: "Oval", images: ["/images/products/women-12a.webp"] },
  { name: "VFU635 Cat Eye Optical", slug: "vfu635-cat-eye-optical", brand: "Furla", description: "Stylish cat eye optical frames with Italian craftsmanship.", price: 155, category: "women", featured: false, material: "Acetate", frameStyle: "Cat Eye", images: ["/images/products/women-13a.webp"] },

  // ============ MEN (12) ============
  { name: "DG6134 Rectangular Sunglasses", slug: "dg6134-rectangular-sunglasses", brand: "Dolce & Gabbana", description: "Masculine rectangular sunglasses with bold D&G styling.", price: 275, category: "men", featured: true, material: "Acetate", frameStyle: "Rectangular", uvProtection: "UV400", images: ["/images/products/men-01a.webp", "/images/products/men-01b.webp"] },
  { name: "DG4405 Square Sunglasses", slug: "dg4405-square-sunglasses", brand: "Dolce & Gabbana", description: "Contemporary square sunglasses with iconic DG logo plaque.", price: 260, category: "men", featured: false, material: "Acetate", frameStyle: "Square", uvProtection: "UV400", images: ["/images/products/men-02a.webp", "/images/products/men-02b.webp"] },
  { name: "P8478 Aviator Sunglasses", slug: "p8478-aviator-sunglasses-men", brand: "Porsche Design", description: "The legendary P8478 aviator with interchangeable lenses. Titanium frame.", price: 450, salePrice: 395, discountPct: 12, category: "men", featured: true, material: "Titanium", frameStyle: "Aviator", uvProtection: "UV400", images: ["/images/products/men-03a.jpg", "/images/products/men-03b.jpg"] },
  { name: "P8650 Square Sunglasses", slug: "p8650-square-sunglasses", brand: "Porsche Design", description: "Precision-engineered square sunglasses with ultra-light construction.", price: 385, category: "men", featured: false, material: "Titanium", frameStyle: "Square", uvProtection: "UV400", images: ["/images/products/men-04a.jpg", "/images/products/men-04b.jpg"] },
  { name: "SPR 56Y Pilot Sunglasses", slug: "spr-56y-pilot-sunglasses", brand: "Prada", description: "Refined pilot sunglasses with Prada lettering on temples.", price: 365, category: "men", featured: false, material: "Metal", frameStyle: "Pilot", uvProtection: "UV400", images: ["/images/products/men-05a.jpg", "/images/products/men-05b.jpg"] },
  { name: "GU6982 Rectangle Sunglasses", slug: "gu6982-rectangle-sunglasses", brand: "Guess", description: "Sporty rectangular sunglasses with Guess logo branding.", price: 115, category: "men", featured: false, material: "Acetate", frameStyle: "Rectangle", uvProtection: "UV400", images: ["/images/products/men-06a.webp", "/images/products/men-06b.webp"] },
  { name: "GU6966 Aviator Sunglasses", slug: "gu6966-aviator-sunglasses", brand: "Guess", description: "Classic aviator sunglasses with mirror lenses.", price: 110, salePrice: 90, discountPct: 18, category: "men", featured: false, material: "Metal", frameStyle: "Aviator", uvProtection: "UV400", images: ["/images/products/men-07a.webp", "/images/products/men-07b.jpg"] },
  { name: "VE4379 Rectangular Sunglasses", slug: "ve4379-rectangular-sunglasses", brand: "Versace", description: "Bold rectangular frames with Versace Greca temples.", price: 305, category: "men", featured: false, material: "Acetate", frameStyle: "Rectangular", uvProtection: "UV400", images: ["/images/products/men-05b.jpg"] },
  { name: "VE2242 Navigator Sunglasses", slug: "ve2242-navigator-sunglasses", brand: "Versace", description: "Stylish navigator sunglasses with Medusa head detail.", price: 330, salePrice: 280, discountPct: 15, category: "men", featured: true, material: "Metal", frameStyle: "Navigator", uvProtection: "UV400", images: ["/images/products/men-09a.webp", "/images/products/men-09b.webp"] },
  { name: "EA4183 Sport Sunglasses", slug: "ea4183-sport-sunglasses", brand: "Emporio Armani", description: "Lightweight sport-inspired sunglasses with EA branding.", price: 175, category: "men", featured: false, material: "Nylon/Metal", frameStyle: "Sport", uvProtection: "UV400", images: ["/images/products/men-10a.jpg", "/images/products/men-10b.jpg"] },
  { name: "DG5076 Rectangle Optical", slug: "dg5076-rectangle-optical", brand: "Dolce & Gabbana", description: "Strong rectangular optical frames for a distinguished look.", price: 240, category: "men", featured: false, material: "Acetate", frameStyle: "Rectangle", images: ["/images/products/men-01a.webp"] },
  { name: "P8372 Optical Frames", slug: "p8372-optical-frames", brand: "Porsche Design", description: "Lightweight titanium optical frames with German precision.", price: 345, category: "men", featured: false, material: "Titanium", frameStyle: "Rectangle", images: ["/images/products/men-02a.webp"] },

  // ============ KIDS (1) ============
  { name: "RJ9052S Junior Wayfarer", slug: "rj9052s-junior-wayfarer", brand: "Ray-Ban", description: "Classic Wayfarer style for kids. Durable and comfortable with UV protection.", price: 85, category: "kids", featured: false, material: "Nylon", frameStyle: "Wayfarer", uvProtection: "UV400", images: ["/images/products/kids-rayban.jpeg", "/images/products/kids-rayban-2.jpeg"] },

  // ============ CONTACT LENSES (7) ============
  { name: "Acuvue Oasys 1-Day", slug: "acuvue-oasys-1-day", brand: "Acuvue", description: "Premium daily disposable contact lenses with HydraLuxe Technology for exceptional comfort all day.", price: 45, category: "contact-lenses", featured: false, lensColor: "Clear", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "Acuvue Oasys 2-Week", slug: "acuvue-oasys-2-week", brand: "Acuvue", description: "Bi-weekly replacement lenses with HYDRACLEAR PLUS technology.", price: 35, category: "contact-lenses", featured: false, lensColor: "Clear", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "Bella Elite Collection", slug: "bella-elite-collection", brand: "Bella", description: "Premium colored contact lenses with natural-looking patterns. Available in multiple colors.", price: 30, salePrice: 25, discountPct: 17, category: "contact-lenses", featured: true, lensColor: "Gray,Green,Brown,Blue,Hazel,Honey", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "Bella Glow Collection", slug: "bella-glow-collection", brand: "Bella", description: "Vibrant colored lenses with a luminous glow effect.", price: 28, category: "contact-lenses", featured: false, lensColor: "Gray,Green,Blue,Hazel", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "Biofinity Monthly", slug: "biofinity-monthly", brand: "Biofinity", description: "Monthly disposable lenses with Aquaform Technology for all-day comfort and breathability.", price: 40, category: "contact-lenses", featured: false, lensColor: "Clear", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "FreshLook Colorblends", slug: "freshlook-colorblends", brand: "FreshLook", description: "Color-enhancing contact lenses with 3-in-1 technology for a natural, beautiful look.", price: 32, salePrice: 27, discountPct: 16, category: "contact-lenses", featured: false, lensColor: "Gray,Green,Brown,Blue,Honey,Hazel", images: ["/images/hero/promo-contacts.jpg"] },
  { name: "FreshLook One Day", slug: "freshlook-one-day", brand: "FreshLook", description: "Daily disposable colored contact lenses for convenience and comfort.", price: 38, category: "contact-lenses", featured: false, lensColor: "Gray,Green,Blue,Hazel", images: ["/images/hero/promo-contacts.jpg"] },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.categoriesOnProducts.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Create categories
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }
  console.log(`Created ${categories.length} categories`);

  // Create products
  for (const product of products) {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        brand: product.brand,
        description: product.description,
        price: product.price,
        salePrice: product.salePrice || null,
        discountPct: product.discountPct || null,
        featured: product.featured,
        material: product.material || null,
        frameStyle: product.frameStyle || null,
        lensColor: product.lensColor || null,
        uvProtection: product.uvProtection || null,
        images: {
          create: product.images.map((url, index) => ({
            url,
            alt: product.name,
            position: index,
          })),
        },
        categories: {
          create: {
            categoryId: categoryMap[product.category],
          },
        },
      },
    });
    console.log(`  Created: ${created.name}`);
  }

  console.log(`\nSeeded ${products.length} products successfully!`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
