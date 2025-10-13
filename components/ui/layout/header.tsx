'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';

export const Header = () => {
  const { items, toggleCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-gold" />
            <span className="text-xl font-bold text-primary">
              FrameStation
            </span>
          </Link>

          {/* ✅ Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/shop"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Order Frame
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Editing Services
            </Link>
            <Link
              href="/shop?category=custom"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Custom Frames
            </Link>
                <Link
              href="/graphicdesign"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              Design Services
            </Link>
            <Link
              href="/account"
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors"
            >
              My Account
            </Link>
          </nav>

          {/* ✅ Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-2 border-t animate-fade-in">
            <Link
              href="/shop"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop Frames
            </Link>
            <Link
              href="/services"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Editing Services
            </Link>
            <Link
              href="/shop?category=custom"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Custom Framing
            </Link>
              <Link
              href="/graphicdesign"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Design Services
            </Link>
            <Link
              href="/account"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <Link
              href="/search"
              className="block px-4 py-2 text-sm font-medium hover:bg-muted rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
