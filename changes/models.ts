export interface User {
  userID: number;
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
  name: string;
}

export interface RegisterRequest {
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
}

export interface Category {
  categoryID: number;
  name: string;
  parentCategoryID: number | null;
  parentCategoryName?: string;
  subCategories?: Category[];
}

export interface Product {
  productID: number;
  name: string;
  price: number;
  sku: string;
  storeID: number;
  categoryID?: number;
  categoryName?: string;
  storeName?: string;
  sellerName?: string;
}

export interface Store {
  storeId: number;
  categoryFocus: string;
  rating: number;
  status: string;
}

export interface Seller {
  sellerId: number;
  storeName: string;
  complianceStatus: string;
  rejectionReason?: string;
}

export interface Inventory {
  productID: number;
  availableQuantity: number;
  reorderThreshold: number;
}

export interface Order {
  orderID: number;
  totalAmount: number;
  customerName?: string;
  status: string;
  orderDate?: string;
}

export interface SellerOrderItem {
  orderID: number;
  productID: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  orderStatus: string;
}

export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Cart {
  orderId: number;
  items: CartItem[];
}

export interface Notification {
  notificationID: number;
  message: string;
  category: string;
  status: string;
  createdDate: string;
}

export interface ShipmentItem {
  shipmentID: number;
  orderID: number;
  carrier: string;
  trackingNumber: string;
  dispatchDate: string;
  deliveryDate: string | null;
  status: string;
}

export interface Dispute {
  disputeID: number;
  orderID: number;
  reason: string;
  status: string;
  resolutionNote?: string;
  createdDate: string;
}

export interface ReturnRequest {
  returnID: number;
  orderID: number;
  reason: string;
  status: string;
  requestedDate: string;
}

export interface Policy {
  policyID: number;
  title: string;
  content: string;
}

export interface Commission {
  commissionID: number;
  percentage: number;
}