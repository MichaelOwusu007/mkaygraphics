export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants: ProductVariant[];
  dimensions?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  sku: string;
  tags: string[];
  featured?: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'size' | 'material' | 'color' | 'matting';
  options: VariantOption[];
}

export interface VariantOption {
  value: string;
  label: string;
  priceAdjustment: number;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
  totalPrice: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
}

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  materials?: string[];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface EditingService {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  features: string[];
  turnaroundTime: string;
  category: 'basic' | 'advanced' | 'premium';
  popular?: boolean;
}

export interface ServiceCartItem {
  serviceId: string;
  service: EditingService;
  photoCount: number;
  uploadedFiles: File[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}
