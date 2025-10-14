"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { PayPalModal } from "@/components/PayPalModal";
import {
  CheckCircle2,
  CreditCard,
  Truck,
  Smartphone,
  Building2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

type PaymentMethod = "paypal" | "mobile-money" | "bank-transfer";

export default function Checkout() {
  const router = useRouter();
  const { items, serviceItems, getTotalPrice, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    mobileNumber: "",
    mobileProvider: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + shipping;

  if (items.length === 0 && serviceItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => router.push("/shop")}>Start Shopping</Button>
      </div>
    );
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(shippingInfo).every((v) => v.trim())) {
      setStep(2);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "paypal") {
      setShowPayPalModal(true);
      return;
    }

    if (paymentMethod === "mobile-money") {
      if (!paymentInfo.mobileNumber || !paymentInfo.mobileProvider) {
        toast.error("Please fill in all mobile money details");
        return;
      }
    } else if (paymentMethod === "bank-transfer") {
      if (
        !paymentInfo.bankName ||
        !paymentInfo.accountNumber ||
        !paymentInfo.accountName
      ) {
        toast.error("Please fill in all bank transfer details");
        return;
      }
    }

    handleCompleteOrder();
  };

  const handlePayPalPayment = () => {
    setShowPayPalModal(false);
    toast.success("Processing PayPal payment...");
    setTimeout(() => {
      handleCompleteOrder();
    }, 1500);
  };

  const handleCompleteOrder = () => {
    toast.success("Payment processed successfully!");
    setStep(3);
    clearCart();
    setTimeout(() => {
      router.push("/account");
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Checkout</h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center w-full">
          {/* Shipping Step */}
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
            <span className="ml-2 font-semibold hidden sm:inline">
              Shipping
            </span>
          </div>

          <div
            className={`flex-1 h-0.5 mx-4 ${
              step >= 2 ? "bg-secondary" : "bg-muted"
            }`}
          />

          {/* Payment Step */}
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
            <span className="ml-2 font-semibold hidden sm:inline">
              Payment
            </span>
          </div>

          <div
            className={`flex-1 h-0.5 mx-4 ${
              step >= 3 ? "bg-secondary" : "bg-muted"
            }`}
          />

          {/* Complete Step */}
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
            <span className="ml-2 font-semibold hidden sm:inline">
              Complete
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitShipping} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={shippingInfo.zip}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zip: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {/* ⚡ Unchanged structure — your entire payment UI stays the same */}
          {/* (omitted here due to message length, but it's exactly as in your original, no removal) */}

              {/* Step 2: Payment */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="h-10 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
                            PayPal
                          </div>
                          <div>
                            <p className="font-semibold">PayPal</p>
                            <p className="text-sm text-muted-foreground">Pay securely with your PayPal account</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="mobile-money" id="mobile-money" />
                        <Label htmlFor="mobile-money" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold">Mobile Money</p>
                            <p className="text-sm text-muted-foreground">Pay with MTN, Airtel, or other providers</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label htmlFor="bank-transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">Direct bank account transfer</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* PayPal */}
                  {paymentMethod === 'paypal' && (
                    <div className="bg-muted/50 p-6 rounded-lg border animate-fade-in">
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                      <div className="flex justify-center">
                        <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold">
                          PayPal Checkout
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Money */}
                  {paymentMethod === 'mobile-money' && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <Label htmlFor="mobile-provider">Mobile Money Provider</Label>
                        <Input
                          id="mobile-provider"
                          placeholder="e.g., MTN, Airtel, Vodafone"
                          value={paymentInfo.mobileProvider}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, mobileProvider: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="mobile-number">Mobile Number</Label>
                        <Input
                          id="mobile-number"
                          type="tel"
                          placeholder="e.g., +233 XX XXX XXXX"
                          value={paymentInfo.mobileNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, mobileNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Instructions:</strong> You will receive a prompt on your phone to approve the payment of ${total.toFixed(2)}.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {paymentMethod === 'bank-transfer' && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input
                          id="bank-name"
                          placeholder="e.g., Chase, Wells Fargo"
                          value={paymentInfo.bankName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, bankName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input
                          id="account-name"
                          placeholder="Account holder name"
                          value={paymentInfo.accountName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, accountName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input
                          id="account-number"
                          placeholder="Your account number"
                          value={paymentInfo.accountNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-lg">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>Note:</strong> Your order will be processed after we verify your bank transfer. This may take 1-2 business days.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      {paymentMethod === 'paypal' ? 'Continue to PayPal' : 'Complete Order'}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                      Back to Shipping
                    </Button>
                  </div>
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
                    Thank you for your purchase. A confirmation email has been sent to {shippingInfo.email}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">Redirecting to your orders...</p>
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
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-semibold">
                        ${(item.totalPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {serviceItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-1">
                        {item.service.title}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        Editing Service
                      </Badge>
                      <p className="text-muted-foreground">
                        {item.photoCount} photo
                        {item.photoCount > 1 ? "s" : ""}
                      </p>
                      <p className="font-semibold">
                        ${item.totalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PayPal Modal */}
      <PayPalModal
        open={showPayPalModal}
        onClose={() => setShowPayPalModal(false)}
        onConfirm={handlePayPalPayment}
        amount={total}
      />
    </div>
  );
}
