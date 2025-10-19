'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartDrawer from './cart-drawer';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline inline-block text-2xl font-bold">
              Shema Shop
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden w-full max-w-sm items-center space-x-2 lg:flex">
            <Input
              type="search"
              placeholder="Find jeans..."
              className="border-primary-foreground/20 focus:bg-background"
            />
            <Button
              type="submit"
              size="icon"
              variant="outline"
              className="border-primary-foreground/20"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary-foreground/10"
              aria-label="Admin Login"
            >
              <User className="h-6 w-6" />
            </Button>
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
