'use client';

import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, cartCount, totalPrice, removeItem } = useCart();

  const getImage = (id: string) =>
    PlaceHolderImages.find((img) => img.id === id);

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-headline text-3xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">You have no items in your cart to check out.</p>
        <Link href="/">
          <Button className="mt-6">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <h1 className="font-headline text-3xl font-bold md:text-4xl">Checkout</h1>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
                <div className="sm:col-span-2 grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="CA" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="grid gap-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" />
                  </div>
                   <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm">
           <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-4">
              {cart.map(item => {
                 const image = getImage(item.imageId);
                 return (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      {image && <Image src={image.imageUrl} alt={item.name} fill className="object-cover" data-ai-hint={image.imageHint} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                 )
              })}
            </div>
            <Separator className="my-6" />
             <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${(totalPrice + 5 + totalPrice * 0.08).toFixed(2)}</span>
            </div>

            <Button size="lg" className="mt-6 w-full">Place Order</Button>
        </div>
      </div>
    </div>
  );
}
