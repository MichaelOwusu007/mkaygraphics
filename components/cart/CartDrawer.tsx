'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cartStore';
import { Minus, Plus, X, Image as ImageIcon } from 'lucide-react';

export const CartDrawer = () => {
  const {
    items,
    serviceItems,
    isOpen,
    toggleCart,
    updateQuantity,
    removeItem,
    removeServiceItem,
    getTotalPrice,
  } = useCartStore();

  const totalPrice = getTotalPrice();

  // ✅ Generate a unique key for selected variants
  const getVariantKey = (variants: Record<string, string>) => {
    return Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([ value]) => value)
      .join('-');
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        {/* ✅ Empty Cart State */}
        {items.length === 0 && serviceItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <p className="text-gray-500">Your cart is empty</p>
            <Button onClick={toggleCart} asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            <div className="flex-1 overflow-auto py-6 space-y-6">
              {/* ✅ Product Items */}
              {items.map((item) => {
                const variantKey = getVariantKey(item.selectedVariants);
                return (
                  <div
                    key={`${item.productId}-${variantKey}`}
                    className="flex gap-4 border-b pb-4 last:border-b-0"
                  >
                    <div className="w-20 h-20 relative rounded-md overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-sm">{item.product.title}</h3>
                          <div className="text-xs text-gray-500 space-y-1">
                            {Object.entries(item.selectedVariants).map(([key, value]) => (
                              <div key={key}>
                                {key}: {value}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.productId, variantKey)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.productId, variantKey, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.productId, variantKey, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ${(item.totalPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ✅ Service Items */}
              {serviceItems.map((item) => (
                <div key={item.serviceId} className="flex gap-4 border-b pb-4 last:border-b-0">
                  <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-sm">{item.service.title}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          Editing Service
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeServiceItem(item.serviceId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {item.photoCount} photo{item.photoCount > 1 ? 's' : ''}
                      </div>
                      <p className="font-semibold text-gray-800">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Cart Total & Buttons */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg" onClick={toggleCart} asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={toggleCart} asChild>
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
