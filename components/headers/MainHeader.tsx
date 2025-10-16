"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Frame,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setIsAuthenticated(!!session)
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.push("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Frame className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold lg:font-bold">
              MkayGraphix
            </span>
          </Link>

          {/* Cart Icon (Mobile Top) */}
          <div className="flex items-center lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative mr-2"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
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

            {/* Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {[
                        ["editing", "Editing Services"],
                        ["photobook", "Photobook Services"],
                        ["design", "Design Services"],
                        ["photography", "Photography"],
                      ].map(([slug, label]) => (
                        <li key={slug}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/services/${slug}`}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Section - Desktop Cart / Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {!isAuthenticated ? (
              <Link href="/auth">
                <Button className="bg-black hover:bg-yellow-500">
                  Sign Up
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu Overlay - scrollable */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 w-full bg-background shadow-lg z-40 lg:hidden border-t border-border/40 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-4">
              {[
                ["/about", "About Us"],
                ["/blog", "Blog"],
                ["/shop", "Shop Frames"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              ))}

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground px-2">
                  Services
                </p>
                {[
                  ["editing", "Editing Services"],
                  ["photobook", "Photobook Services"],
                  ["design", "Design Services"],
                  ["photography", "Photography"],
                ].map(([slug, label]) => (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    onClick={closeMobileMenu}
                    className="block py-2 pl-4 text-sm font-medium transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {!isAuthenticated ? (
                <Link href="/auth" onClick={closeMobileMenu}>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/account"
                    onClick={closeMobileMenu}
                    className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left py-2 text-sm font-medium transition-colors hover:text-primary text-destructive"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
