'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { ScrollArea } from './ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from './ui/input';

export default function CartDrawer() {
  const { cart, cartCount, totalPrice, updateQuantity, removeItem } =
    useCart();
  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-primary-foreground/10"
        >
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Your Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="space-y-4 px-6">
                {cart.map((item) => {
                  const image = getImage(item.imageId);
                  return (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        {image && (
                           <Image
                            src={image.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.quantity - 1)
                              }
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.size, item.quantity + 1)
                              }
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto bg-background px-6 py-4">
              <div className="w-full space-y-4">
                 <div className="flex items-center gap-2">
                  <Input placeholder="Promo Code" className="flex-1" />
                  <Button variant="secondary">Apply</Button>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Taxes and shipping calculated at checkout.
                </p>
                <SheetClose asChild>
                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full">
                      Checkout
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">
              Looks like you haven't added anything yet.
            </p>
            <SheetClose asChild>
              <Button>Start Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
