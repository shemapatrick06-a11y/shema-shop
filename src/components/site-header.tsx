'use client';

import Link from 'next/link';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CartDrawer from './cart-drawer';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SiteHeader() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline inline-block text-2xl font-bold">
              Shema Shop
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/products/category/Men"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Men
            </Link>
            <Link
              href="/products/category/Women"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Women
            </Link>
            <Link
              href="/products/category/Kids"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Kids
            </Link>
          </nav>
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.email || ''} />
                    <AvatarFallback>
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.displayName || user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary-foreground/10"
                aria-label="Customer Login"
              >
                <User className="h-6 w-6" />
              </Button>
            </Link>
          )}
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}
