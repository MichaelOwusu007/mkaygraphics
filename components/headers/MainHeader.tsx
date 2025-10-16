"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search, Menu, X, Frame, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const router = useRouter();
  const { toggleCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // ✅ Check auth state once on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Frame className="h-8 w-8 text-primary" />
            <span className="font-serif text-xl font-bold">Artisan Frames</span>
          </Link>

          {/* ✅ Desktop Nav */}
          {!isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About Us
              </Link>
              <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary">
                Blog
              </Link>
              <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                Shop Frames
              </Link>
              <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>

              <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
                <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                  Services <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/services" className="cursor-pointer">
                      Editing Services
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/shop" className="cursor-pointer">
                      Design Services
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/shop" className="text-sm font-medium transition-colors hover:text-primary">
                Shop
              </Link>
              <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                Editing Services
              </Link>
              <Link href="/search" className="text-sm font-medium transition-colors hover:text-primary">
                Search
              </Link>
            </nav>
          )}

          {/* ✅ Actions */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link href="/auth">
                <Button className="bg-gradient-primary hover:opacity-90 hidden md:flex">
                  Sign Up
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex"
                  onClick={() => router.push("/search")}
                >
                  <Search className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-destructive"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </>
            )}

            {/* ✅ Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* ✅ Mobile Nav Items */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-4 animate-fade-in border-t border-border/40">
            {!isAuthenticated ? (
              <>
                <Link href="/about" className="block py-2 text-sm font-medium hover:text-primary">
                  About Us
                </Link>
                <Link href="/blog" className="block py-2 text-sm font-medium hover:text-primary">
                  Blog
                </Link>
                <Link href="/shop" className="block py-2 text-sm font-medium hover:text-primary">
                  Shop Frames
                </Link>
                <Link href="/contact" className="block py-2 text-sm font-medium hover:text-primary">
                  Contact
                </Link>
                <Link href="/services" className="block py-2 text-sm font-medium hover:text-primary">
                  Editing Services
                </Link>
                <Link href="/auth">
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/shop" className="block py-2 text-sm font-medium hover:text-primary">
                  Shop
                </Link>
                <Link href="/services" className="block py-2 text-sm font-medium hover:text-primary">
                  Editing Services
                </Link>
                <Link href="/search" className="block py-2 text-sm font-medium hover:text-primary">
                  Search
                </Link>
                <Link href="/account" className="block py-2 text-sm font-medium hover:text-primary">
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary text-destructive"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};
