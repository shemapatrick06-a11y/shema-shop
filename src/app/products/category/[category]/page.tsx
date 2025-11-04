'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/product-card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import type { Product } from '@/lib/types';
import { collection, query, where } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const params = useParams();
  const category = decodeURIComponent(params.category as string);
  const firestore = useFirestore();

  const productsQuery = useMemoFirebase(
    () =>
      category
        ? query(collection(firestore, 'products'), where('category', '==', category))
        : null,
    [firestore, category]
  );

  const { data: products, isLoading: isLoadingProducts } = useCollection<Product>(productsQuery);

  const pageTitle = category ? `${category}'s Collection` : 'All Products';

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            {pageTitle}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our curated selection for {category}.
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-80 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              No products found in this category yet.
            </p>
            <Button asChild>
                <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
