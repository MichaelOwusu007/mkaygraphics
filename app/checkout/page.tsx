"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/stores/cartStore";
import {
  CheckCircle2,
  CreditCard,
  Truck,
  Loader2,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

type OrderData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    selectedVariants?: Record<string, string>;
  }>;
  serviceItems: Array<{
    serviceTitle: string;
    photoCount: number;
    totalPrice: number;
  }>;
  total: number;
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, serviceItems, getTotalPrice, clearCart } = useCartStore();

  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Ghana",
  });

  const subtotal = getTotalPrice();
  const total = subtotal;

  const sendOrderEmail = useCallback(async (data: OrderData, paymentRef?: string) => {
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          paymentMethod: "Paystack",
          paymentReference: paymentRef || searchParams.get("ref"),
          orderType: "Shop Order",
        }),
      });

      if (!response.ok) {
        console.error("Failed to send order email");
      }
    } catch (error) {
      console.error("Error sending order email:", error);
    }
  }, [searchParams]);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const ref = searchParams.get("ref");

    if (paymentStatus === "success" && ref) {
      const savedOrderData = sessionStorage.getItem("pendingOrder");
      if (savedOrderData) {
        const data = JSON.parse(savedOrderData) as OrderData;
        setOrderData(data);
        sendOrderEmail(data, ref);
        sessionStorage.removeItem("pendingOrder");
      }
      setStep(3);
      clearCart();
      toast.success("Payment successful! Your order has been placed.");
    }

    setIsInitializing(false);
  }, [searchParams, clearCart, sendOrderEmail]);

  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (items.length === 0 && serviceItems.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/shop")}>Start Shopping</Button>
      </div>
    );
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, address, city } = shippingInfo;
    if (!name || !email || !phone || !address || !city) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiatePaystackPayment();
  };

  const initiatePaystackPayment = async () => {
    setIsProcessing(true);

    const orderDataToSave: OrderData = {
      customerName: shippingInfo.name,
      customerEmail: shippingInfo.email,
      customerPhone: shippingInfo.phone,
      items: items.map((item) => ({
        productName: item.product.title,
        quantity: item.quantity,
        price: item.totalPrice / item.quantity,
        selectedVariants: item.selectedVariants,
      })),
      serviceItems: serviceItems.map((item) => ({
        serviceTitle: item.service.title,
        photoCount: item.photoCount,
        totalPrice: item.totalPrice,
      })),
      total,
      shippingInfo,
    };

    sessionStorage.setItem("pendingOrder", JSON.stringify(orderDataToSave));

    try {
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: shippingInfo.email,
          name: shippingInfo.name,
          phone: shippingInfo.phone,
          orderId: `ORD-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to initialize payment");
        sessionStorage.removeItem("pendingOrder");
        setIsProcessing(false);
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (error) {
      console.error("Paystack error:", error);
      toast.error("Payment initialization failed");
      sessionStorage.removeItem("pendingOrder");
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center w-full">
          <div
            className={`flex items-center ${
              step >= 1 ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? "border-secondary bg-secondary/10" : "border-muted"
              }`}
            >
              {step > 1 ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <Truck className="h-5 w-5" />
              )}
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Details</span>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? "bg-secondary" : "bg-muted"}`} />

          <div
            className={`flex items-center ${
              step >= 2 ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? "border-secondary bg-secondary/10" : "border-muted"
              }`}
            >
              {step > 2 ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <CreditCard className="h-5 w-5" />
              )}
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Payment</span>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? "bg-secondary" : "bg-muted"}`} />

          <div
            className={`flex items-center ${
              step >= 3 ? "text-secondary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 3 ? "border-secondary bg-secondary/10" : "border-muted"
              }`}
            >
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Your Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitShipping} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Region</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={shippingInfo.zip}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zip: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                  
                  <a
                    href="https://wa.me/233592515464?text=Hi, I need help with my order"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded flex items-center justify-center text-white font-bold text-sm">
                        Paystack
                      </div>
                      <div>
                        <p className="font-semibold">Pay securely with Paystack</p>
                        <p className="text-sm text-muted-foreground">Card, USSD, or Bank Transfer</p>
                      </div>
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      You will be redirected to Paystack to complete your payment securely. After payment, your order will be confirmed.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay GH₵{total.toFixed(2)} with Paystack
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>

                  <a
                    href="https://wa.me/233592515464?text=Hi, I need help with my payment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <Card className="animate-scale-in">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-secondary/10 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-secondary" />
                </div>
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-2">Order Complete!</h2>
                  <p className="text-muted-foreground">
                    Thank you for your order! A confirmation email has been sent to{" "}
                    {orderData?.customerEmail || shippingInfo.email}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will contact you shortly to confirm your order.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push("/")}>
                    Return Home
                  </Button>
                  <a
                    href="https://wa.me/233592515464?text=Hi, I just placed an order and have a question"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="font-serif">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-auto">
                {items.length > 0 && items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-1">{item.product.title}</p>
                      <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="font-semibold">
                        GH₵{((item.totalPrice || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {serviceItems.length > 0 && serviceItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center">
                      <CreditCard className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-1">{item.service.title}</p>
                      <p className="text-muted-foreground">
                        {item.photoCount} photo{item.photoCount > 1 ? "s" : ""}
                      </p>
                      <p className="font-semibold">GH₵{item.totalPrice.toFixed(2)}</p>
                    </div>
                  </div>
                ))}

                {step === 3 && orderData && (
                  <>
                    {orderData.items.map((item, index) => (
                      <div key={`order-${index}`} className="flex gap-3">
                        <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center">
                          <CreditCard className="h-8 w-8 text-secondary" />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-semibold line-clamp-1">{item.productName}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="font-semibold">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    {orderData.serviceItems.map((item, index) => (
                      <div key={`service-${index}`} className="flex gap-3">
                        <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center">
                          <CreditCard className="h-8 w-8 text-secondary" />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-semibold line-clamp-1">{item.serviceTitle}</p>
                          <p className="font-semibold">GH₵{item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">GH₵{(orderData?.total || subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>GH₵{(orderData?.total || total).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
