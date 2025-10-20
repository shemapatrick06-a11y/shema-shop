'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, Loader2 } from 'lucide-react';
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
import { useDoc, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { Product } from '@/lib/types';
import { doc, collection, query, where, limit } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCart();
  const { toast } = useToast();
  const firestore = useFirestore();

  const productRef = useMemoFirebase(() => doc(firestore, 'products', params.id), [firestore, params.id]);
  const { data: product, isLoading: isLoadingProduct } = useDoc<Product>(productRef);

  const relatedProductsQuery = useMemoFirebase(() => 
    product ? query(
      collection(firestore, 'products'),
      where('category', '==', product.category),
      where('__name__', '!=', product.id),
      limit(4)
    ) : null
  , [firestore, product]);

  const { data: relatedProducts, isLoading: isLoadingRelated } = useCollection<Product>(relatedProductsQuery);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    addItem({ ...product, size: selectedSize, quantity: 1 });
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`
    })
  };

  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Skeleton className="h-[400px] w-full md:h-[600px] rounded-lg" />
          <div className="flex flex-col justify-center gap-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-12 w-[140px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="relative h-[400px] w-full md:h-[600px]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-cover"
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
          {isLoadingRelated
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <Skeleton className="h-80 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))
            : relatedProducts?.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
