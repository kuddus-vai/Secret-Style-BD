export type ProductSize = 'Regular' | 'Plus Size (38-46)' | 'Oversized' | 'Free Size';

export interface ProductColor {
  name: string;
  nameBn: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  nameBn: string;
  category: 'pj-shirts' | 'pajamas' | 'shorts' | 'panties' | 'combos' | 'loungewear' | string;
  categoryLabelBn: string;
  price: number;
  originalPrice: number;
  fabric: string;
  gsm: number;
  chestSize: string;
  lengthSize: string;
  availableSizes: ProductSize[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  description: string;
  descriptionBn: string;
  badge?: string;
  badgeBn?: string;
  isBestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export type DeliveryZone = 'inside_dhaka' | 'outside_dhaka';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  timestamp: string;
  location?: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameBn: string;
  description?: string;
  icon?: string;
  order: number;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  alternativePhone?: string;
  email?: string;
  district: string;
  address: string;
  role?: 'customer' | 'admin' | 'moderator';
  status: 'active' | 'vip' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  lastOrderDate?: string;
  notes?: string;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  alternativePhone?: string;
  deliveryZone: DeliveryZone;
  district: string;
  fullAddress: string;
  notes?: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  trxId?: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  date: string;
  status: OrderStatus;
  courierProvider?: 'Steadfast' | 'Pathao' | 'RedX' | 'Paperfly' | 'In-house Delivery' | string;
  courierTrackingCode?: string;
  estimatedDelivery?: string;
  trackingTimeline?: TrackingEvent[];
  adminNotes?: string;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  commentBn: string;
  productName: string;
  verifiedPurchase: boolean;
  avatarBg: string;
  image?: string;
}
