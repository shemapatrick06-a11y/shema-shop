export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageId: string;
  category: string;
  sizes: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageId: string;
  quantity: number;
  size: string;
};
