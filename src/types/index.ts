export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  position: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  discountPct: number | null;
  sku: string | null;
  material: string | null;
  frameStyle: string | null;
  lensColor: string | null;
  uvProtection: string | null;
  dimensions: string | null;
  featured: boolean;
  inStock: boolean;
  images: ProductImage[];
  categories: { category: Category }[];
}

export interface CartItemType {
  id: string;
  product: Product;
  quantity: number;
  color?: string;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  notes?: string;
  paymentMethod: "stripe" | "cod";
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FilterState {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  search?: string;
  sort?: string;
  sale?: boolean;
  page?: number;
}
