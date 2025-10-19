'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';
import { products } from '@/data/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/product-card';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === product.imageId);
  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);


  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    addItem({ ...product, size: selectedSize });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative h-[400px] w-full md:h-[600px]">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={image.imageHint}
            />
          ) : (
             <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
                <span className="text-muted-foreground">No Image</span>
              </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-3xl font-bold md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(12 Reviews)</span>
          </div>
          <p className="mt-4 text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          
          <div className="mt-6">
            <label htmlFor="size" className="mb-2 block text-sm font-medium">Size</label>
            <Select onValueChange={setSelectedSize} value={selectedSize}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-6">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 md:mt-24">
        <h2 className="font-headline text-2xl font-bold md:text-3xl">You Might Also Like</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
