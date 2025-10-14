'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cartStore';
import { Minus, Plus, X, ShoppingBag, Image as ImageIcon } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    serviceItems,
    updateQuantity,
    removeItem,
    removeServiceItem,
    getTotalPrice,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 12.99;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  const getVariantKey = (variants: Record<string, string>) => {
    return Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, value]) => value)
      .join('-');
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  // ✅ Empty Cart UI
  if (items.length === 0 && serviceItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center space-y-6">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h1 className="font-serif text-3xl font-bold">Your Cart is Empty</h1>
          <p className="text-muted-foreground">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Button size="lg" asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const variantKey = getVariantKey(item.selectedVariants);
            return (
              <Card key={`${item.productId}-${variantKey}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <Link href={`/product/${item.productId}`} className="shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    </Link>

                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/product/${item.productId}`}>
                            <h3 className="font-semibold text-lg hover:text-secondary transition-colors">
                              {item.product.title}
                            </h3>
                          </Link>
                          <div className="text-sm text-muted-foreground space-y-1 mt-1">
                            {Object.entries(item.selectedVariants).map(([key, value]) => (
                              <div key={key} className="capitalize">
                                {key}: {value}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.productId, variantKey)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.productId, variantKey, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-semibold w-12 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item.productId, variantKey, item.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xl font-bold">
                          ${(item.totalPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Service Items */}
          {serviceItems.map((serviceItem) => (
            <Card key={serviceItem.serviceId}>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="shrink-0 w-32 h-32 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <ImageIcon className="h-16 w-16 text-secondary" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/services/${serviceItem.serviceId}`}>
                          <h3 className="font-semibold text-lg hover:text-secondary transition-colors">
                            {serviceItem.service.title}
                          </h3>
                        </Link>
                        <Badge variant="outline" className="mt-1">
                          Editing Service
                        </Badge>
                        <div className="text-sm text-muted-foreground mt-2">
                          <div>
                            {serviceItem.photoCount} photo
                            {serviceItem.photoCount > 1 ? 's' : ''}
                          </div>
                          <div className="text-xs">${serviceItem.service.price} per photo</div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeServiceItem(serviceItem.serviceId)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {serviceItem.uploadedFiles.length} file
                        {serviceItem.uploadedFiles.length !== 1 ? 's' : ''} uploaded
                      </div>
                      <p className="text-xl font-bold">${serviceItem.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-serif text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-secondary">
                    <span>Promo Code</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                {subtotal > 0 && subtotal < 100 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={promoApplied}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                >
                  {promoApplied ? 'Code Applied' : 'Apply Code'}
                </Button>
                {promoApplied && (
                  <p className="text-xs text-center text-secondary">10% discount applied!</p>
                )}
                <p className="text-xs text-center text-muted-foreground">Try code: SAVE10</p>
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
