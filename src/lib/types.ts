export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  sizes: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  size: string;
};

export type Order = {
    id: string;
    customerId: string;
    orderDate: string; // ISO string format
    totalAmount: number;
    shippingAddress: string;
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
};

export type OrderItem = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
};

export type Customer = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};
