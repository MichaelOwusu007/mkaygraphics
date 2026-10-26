// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ShoppingCart,
//   Search,
//   Menu,
//   X,
//   Frame,
//   User,
//   ChevronDown,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useCartStore } from "@/stores/cartStore";

// const publicLinks = [
//   { href: "/about", label: "About" },
//   { href: "/shop", label: "Order Frame" },
//   { href: "/projects", label: "Projects" },
//   { href: "/blog", label: "Blog" },
//   { href: "/Contact", label: "Contact Us" },
// ];

// const servicesLinks = [
//   { href: "/services/editing", label: "Editing Services" },
//   { href: "/services/design", label: "Design Services" },
//   { href: "/services/photobook", label: "Photobook" },
//   { href: "/services/photography", label: "Photography" },
// ];

// const privateLinks = [
//   { href: "/order-frame", label: "Order Frame" },
//   { href: "/account", label: "Account" },
// ];

// export default function Header() {
//   const { toggleCart, getTotalItems } = useCartStore();
//   const router = useRouter();

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);

//   // mounted ensures client-only values (localStorage/cart count) don't cause SSR hydration mismatch
//   const [mounted, setMounted] = useState(false);

//   // auth state (derived on mount)
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     setMounted(true);

//     const checkAuth = () => {
//       const authStatus = localStorage.getItem("isAuthenticated") === "true";
//       setIsAuthenticated(authStatus);
//     };

//     // initial check
//     checkAuth();

//     // Listen for storage events (other tabs/windows)
//     const onStorage = (e: StorageEvent) => {
//       if (e.key === "isAuthenticated") checkAuth();
//     };

//     // Listen for same-tab auth changes (custom event dispatched from login)
//     const onAuthChange = () => checkAuth();

//     window.addEventListener("storage", onStorage);
//     window.addEventListener("authChange", onAuthChange);

//     return () => {
//       window.removeEventListener("storage", onStorage);
//       window.removeEventListener("authChange", onAuthChange);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isAuthenticated");
//     // notify other listeners (same-tab)
//     window.dispatchEvent(new Event("authChange"));
//     router.push("/");
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
//           >
//             <Frame className="h-8 w-8 text-primary" />
//             <span className="text-xl font-bold">MkayGraphics</span>
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {/* Render public links by default (matches server). After mount, client may re-render with authenticated links */}
//             {!isAuthenticated ? (
//               <>
//                 {publicLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
//                   <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
//                     Services <ChevronDown className="h-4 w-4" />
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="start" className="w-48">
//                     {servicesLinks.map((s) => (
//                       <DropdownMenuItem asChild key={s.href}>
//                         <Link href={s.href} className="cursor-pointer">
//                           {s.label}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </>
//             ) : (
//               <>
//                 {/* Authenticated links */}
//                 {privateLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className="text-sm font-medium transition-colors hover:text-primary"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 {/* Auth users also see Services */}
//                 <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
//                   <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
//                     Services <ChevronDown className="h-4 w-4" />
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="start" className="w-48">
//                     {servicesLinks.map((s) => (
//                       <DropdownMenuItem asChild key={s.href}>
//                         <Link href={s.href} className="cursor-pointer">
//                           {s.label}
//                         </Link>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>

//                 {/* Search icon for desktop */}
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="hidden md:flex"
//                   onClick={() => router.push("/search")}
//                 >
//                   <Search className="h-5 w-5" />
//                 </Button>
//               </>
//             )}
//           </nav>

//           {/* Right Actions */}
//           <div className="flex items-center space-x-3">
//             {/* Cart (always visible). Guard rendering of dynamic count until mounted to avoid SSR mismatch */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="relative"
//               onClick={toggleCart}
//               aria-label="Open cart"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {mounted && getTotalItems() > 0 && (
//                 <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center animate-scale-in">
//                   {getTotalItems()}
//                 </span>
//               )}
//             </Button>

//             {/* Unauthenticated -> Sign Up button */}
//             {!isAuthenticated ? (
//               <Link href="/auth">
//                 <Button className="bg-black cursor-pointer hover:opacity-90 hidden md:flex">
//                   Sign Up
//                 </Button>
//               </Link>
//             ) : (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon" aria-label="Account menu">
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   <DropdownMenuItem asChild>
//                     <Link href="/account" className="cursor-pointer">
//                       My Account
//                     </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem
//                     onClick={handleLogout}
//                     className="cursor-pointer text-destructive"
//                   >
//                     Logout
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             )}

//             {/* Mobile menu toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         <div
//           className={`md:hidden transition-all duration-300 overflow-hidden ${
//             mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
//           }`}
//         >
//           <nav className="py-4 space-y-4 border-t border-border/40">
//             {!isAuthenticated ? (
//               <>
//                 {publicLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className="block py-2 text-sm font-medium transition-colors hover:text-primary"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 <div className="space-y-1 pl-2">
//                   <p className="text-sm font-semibold text-muted-foreground">Services</p>
//                   {servicesLinks.map((s) => (
//                     <Link
//                       key={s.href}
//                       href={s.href}
//                       className="block py-1 text-sm transition-colors hover:text-primary"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {s.label}
//                     </Link>
//                   ))}
//                 </div>

//                 <Link href="/auth">
//                   <Button className="w-full bg-gradient-primary hover:opacity-90">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </>
//             ) : (
//               <>
//                 {privateLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className="block py-2 text-sm font-medium transition-colors hover:text-primary"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {link.label}
//                   </Link>
//                 ))}

//                 <div className="space-y-1 pl-2">
//                   <p className="text-sm font-semibold text-muted-foreground">Services</p>
//                   {servicesLinks.map((s) => (
//                     <Link
//                       key={s.href}
//                       href={s.href}
//                       className="block py-1 text-sm transition-colors hover:text-primary"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {s.label}
//                     </Link>
//                   ))}
//                 </div>

//                 <Link
//                   href="/search"
//                   className="block py-2 text-sm font-medium transition-colors hover:text-primary"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Search
//                 </Link>

//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left py-2 text-sm font-medium text-destructive hover:text-destructive/80"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
