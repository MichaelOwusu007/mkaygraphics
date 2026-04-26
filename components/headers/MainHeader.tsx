"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Menu,
  X,
  Frame,
  ChevronDown,
  MessageCircle,
  Home,
  Layers,
  Info,
  Newspaper,
  Phone,
  Briefcase,
  Palette,
  Printer,
  BookOpen,
  PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { href: "/services", label: "All Services", icon: Briefcase },
  { href: "/services/editing", label: "Photo Editing", icon: Palette },
  { href: "/services/printing", label: "Printing Services", icon: Printer },
  { href: "/services/photobook", label: "Photobooks", icon: BookOpen },
  { href: "/services/design", label: "Graphic Design", icon: PenTool },
];

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: Layers },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/about", label: "About", icon: Info },
  { href: "/contact", label: "Contact", icon: Phone },
];

const desktopNavLinks = navLinks.filter((link) => link.href !== "/services");

export const Header = () => {
  const { toggleCart, getTotalItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const totalItems = isHydrated ? getTotalItems() : 0;

  return (
    <header
      className={`sticky top-0 z-[80] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Frame className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight">
                MkayGraphix
              </span>
              <span className="text-[10px] text-gray-500 hidden sm:block -mt-1">
                Frame • Edit • Design
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  isActive(link.href)
                    ? "text-yellow-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  pathname.startsWith("/services")
                    ? "text-yellow-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full z-[90] pt-2"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 w-[280px]">
                      <div className="p-3 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Our Services
                        </p>
                      </div>
                      <div className="py-2">
                        {services.map((service) => {
                          const Icon = service.icon;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 flex items-center justify-center group-hover:from-yellow-100 group-hover:to-amber-100 transition-colors">
                                <Icon className="h-5 w-5 text-yellow-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm">
                                  {service.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  View details →
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      <div className="p-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
                        <Link
                          href="/services"
                          className="flex items-center justify-center gap-2 text-sm font-medium text-yellow-600 hover:text-yellow-700 transition-colors"
                        >
                          View All Services
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* WhatsApp Button - Desktop */}
            <a
              href="https://wa.me/233592515464"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-green-500/25"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-yellow-50"
              onClick={toggleCart}
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close mobile menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 top-[4.75rem] z-[60] lg:hidden"
            >
              <div className="mx-auto max-w-xl -mt-6 overflow-hidden rounded-[28px] border border-white/60 bg-white/92 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                <div className="bg-gradient-to-r from-yellow-100 via-amber-50 to-white px-5 py-4 border-b border-yellow-100">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-yellow-700/80">
                        Explore
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Browse MkayGraphix
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                        Menu
                      </div>
                      <button
                        type="button"
                        aria-label="Close mobile menu"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/85 text-gray-700 shadow-sm transition-all hover:scale-105 hover:bg-white hover:text-black"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="max-h-[calc(100vh-7rem)] overflow-y-auto px-4 py-4">
                  <motion.a
                    href="https://wa.me/233592515464"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.05, duration: 0.25 }}
                    className="mb-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/25"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </motion.a>

                  <nav className="space-y-2">
                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      const active = isActive(link.href);

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ delay: 0.08 + index * 0.04, duration: 0.28 }}
                        >
                          <Link
                            href={link.href}
                            className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                              active
                                ? "border-yellow-200 text-yellow-700 shadow-sm"
                                : "border-transparent bg-gray-50/80 text-gray-700 hover:-translate-y-0.5 hover:border-yellow-100 hover:bg-white hover:shadow-md"
                            }`}
                          >
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-colors ${
                                active
                                  ? "bg-yellow-500 text-white"
                                  : "bg-white text-gray-700 group-hover:bg-black group-hover:text-white"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold">{link.label}</p>
                              <p className="text-xs text-gray-500">
                                {link.href === "/services"
                                  ? "See everything we offer"
                                  : `Go to ${link.label.toLowerCase()}`}
                              </p>
                            </div>
                            {active ? (
                              <Badge className="bg-yellow-500 text-white text-[10px]">
                                Active
                              </Badge>
                            ) : (
                              <span className="text-lg text-gray-300 transition-transform duration-300 group-hover:translate-x-1">
                                →
                              </span>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
