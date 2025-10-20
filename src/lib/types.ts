export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string; // Changed from imageId
  category: string;
  sizes: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string; // Changed from imageId
  quantity: number;
  size: string;
};
