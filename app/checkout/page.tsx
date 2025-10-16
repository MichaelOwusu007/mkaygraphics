"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define types for user and address
type SupabaseUser = {
  id: string;
  email: string;
  user_metadata?: { name?: string };
};

type ShippingAddress = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default?: boolean;
};

type PaymentMethod = "paypal" | "mobile-money" | "bank-transfer";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, serviceItems, getTotalPrice, clearCart } = useCartStore();

  const [step, setStep] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("paypal");
  const [showPayPalModal, setShowPayPalModal] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [savedAddress, setSavedAddress] = useState<ShippingAddress | null>(null);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "Ghana",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    mobileNumber: "",
    mobileProvider: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const subtotal = getTotalPrice();
  const shipping = subtotal > 500 ? 0 : 50; // Example: free shipping over 500, else 50
  const total = subtotal;

  useEffect(() => {
    checkAuthAndLoadAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthAndLoadAddress = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("Please sign in to checkout");
        router.push("/auth");
        return;
      }

      setUser(session.user as SupabaseUser);

      // Fetch profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!profileError && profile) {
        setShippingInfo((prev) => ({
          ...prev,
          name: profile.name || prev.name,
          email: session.user.email || prev.email,
        }));
      }

      // Fetch saved shipping address (default)
      const { data: address, error: addressError } = await supabase
        .from("shipping_addresses")
        .select("*")
        .eq("user_id", session.user.id)
        .eq("is_default", true)
        .single();

      if (!addressError && address) {
        setSavedAddress(address as ShippingAddress);
        setShippingInfo({
          name: address.name || session.user.user_metadata?.name || "",
          email: session.user.email || "",
          address: address.address || "",
          city: address.city || "",
          state: address.state || "",
          zip: address.zip || "",
          country: address.country || "Ghana",
        });
      }
    } catch (err) {
      console.error("Error checking session/address:", err);
    }
  };

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
    // ensure all shipping fields are filled
    const allFilled = Object.values(shippingInfo).every(
      (v) => typeof v === "string" && v.trim().length > 0
    );
    if (allFilled) {
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

  const handleCompleteOrder = async () => {
    if (!user) {
      toast.error("Please sign in to complete order");
      router.push("/auth");
      return;
    }

    try {
      let shippingAddressId = savedAddress?.id;

      // if no saved address, insert new
      if (!savedAddress) {
        const {
          data: newAddress,
          error: addressError,
        } = await supabase
          .from("shipping_addresses")
          .insert({
            user_id: user.id,
            name: shippingInfo.name,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zip: shippingInfo.zip,
            country: shippingInfo.country,
            is_default: true,
          })
          .select()
          .single();

        if (addressError || !newAddress) {
          toast.error("Error saving shipping address");
          return;
        }
        shippingAddressId = newAddress.id;
      } else {
        // update existing address
        const { error: updateError } = await supabase
          .from("shipping_addresses")
          .update({
            name: shippingInfo.name,
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            zip: shippingInfo.zip,
            country: shippingInfo.country,
          })
          .eq("id", savedAddress.id);

        if (updateError) {
          toast.error("Error updating shipping address");
          return;
        }
      }

      // create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          status: "pending",
          payment_method: paymentMethod,
          shipping_address_id: shippingAddressId,
        })
        .select()
        .single();

      if (orderError || !order) {
        toast.error("Error creating order");
        return;
      }

      // create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        product_name: item.product.title,
        quantity: item.quantity,
        price: item.totalPrice / (item.quantity || 1),
        selected_variants: item.selectedVariants,
      }));

      // include any service items as separate order_items entries (optional)
      const serviceItemsRows = serviceItems.map((s) => ({
        order_id: order.id,
        product_id: "", // Use empty string for service items
        product_name: s.service.title,
        quantity: 1,
        price: s.totalPrice,
        selected_variants: { photos: s.photoCount },
      }));

      const allItems = [...orderItems, ...serviceItemsRows];

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(allItems);

      if (itemsError) {
        toast.error("Error saving order items");
        return;
      }

      toast.success("Order placed successfully!");
      setStep(3);
      clearCart();

      // redirect to account/orders after a delay
      setTimeout(() => {
        router.push("/account");
      }, 3000);
    } catch (err) {
      console.error("Complete order error:", err);
      toast.error("Error completing order");
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
            <span className="ml-2 font-semibold hidden sm:inline">Shipping</span>
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
                <CardTitle className="font-serif">Shipping Information</CardTitle>
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
                          setShippingInfo({ ...shippingInfo, name: e.target.value })
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
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
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
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
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
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
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
                          setShippingInfo({ ...shippingInfo, state: e.target.value })
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
                          setShippingInfo({ ...shippingInfo, zip: e.target.value })
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
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) =>
                      setPaymentMethod(value as PaymentMethod)
                    }
                  >
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label
                          htmlFor="paypal"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div className="h-10 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold text-xs">
                            PayPal
                          </div>
                          <div>
                            <p className="font-semibold">PayPal</p>
                            <p className="text-sm text-muted-foreground">
                              Pay securely with your PayPal account
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="mobile-money" id="mobile-money" />
                        <Label
                          htmlFor="mobile-money"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold">Mobile Money</p>
                            <p className="text-sm text-muted-foreground">
                              Pay with MTN, Airtel, or other providers
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                        <Label
                          htmlFor="bank-transfer"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="font-semibold">Bank Transfer</p>
                            <p className="text-sm text-muted-foreground">
                              Direct bank account transfer
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* PayPal */}
                  {paymentMethod === "paypal" && (
                    <div className="bg-muted/50 p-6 rounded-lg border animate-fade-in">
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        You will be redirected to PayPal to complete your payment
                        securely.
                      </p>
                      <div className="flex justify-center">
                        <div className="h-16 w-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded flex items-center justify-center text-white font-bold">
                          PayPal Checkout
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mobile Money */}
                  {paymentMethod === "mobile-money" && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <Label htmlFor="mobile-provider">Mobile Money Provider</Label>
                        <Input
                          id="mobile-provider"
                          placeholder="e.g., MTN, Airtel, Vodafone"
                          value={paymentInfo.mobileProvider}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, mobileProvider: e.target.value })
                          }
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
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, mobileNumber: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Instructions:</strong> You will receive a prompt on
                          your phone to approve the payment of ${total.toFixed(2)}.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {paymentMethod === "bank-transfer" && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <Label htmlFor="bank-name">Bank Name</Label>
                        <Input
                          id="bank-name"
                          placeholder="e.g., Chase, Wells Fargo"
                          value={paymentInfo.bankName}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, bankName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="account-name">Account Name</Label>
                        <Input
                          id="account-name"
                          placeholder="Account holder name"
                          value={paymentInfo.accountName}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, accountName: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="account-number">Account Number</Label>
                        <Input
                          id="account-number"
                          placeholder="Your account number"
                          value={paymentInfo.accountNumber}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4 rounded-lg">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>Note:</strong> Your order will be processed after we
                          verify your bank transfer. This may take 1-2 business days.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <Button type="submit" size="lg" className="w-full">
                      {paymentMethod === "paypal" ? "Continue to PayPal" : "Complete Order"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep(1)}
                    >
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
                    Thank you for your purchase. A confirmation email has been sent to{" "}
                    {shippingInfo.email}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Redirecting to your orders...
                </p>
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
                {/* Product Items */}
                {items.map((item, index) => (
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
                        ${((item.totalPrice || 0) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Service Items */}
                {serviceItems.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-16 h-16 bg-secondary/10 rounded flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-secondary" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-1">{item.service.title}</p>
                      <Badge variant="outline" className="text-xs mt-1">
                        Editing Service
                      </Badge>
                      <p className="text-muted-foreground">
                        {item.photoCount} photo{item.photoCount > 1 ? "s" : ""}
                      </p>
                      <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
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
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : "15 GHC+"}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <span className="text-[14px] text-gray-600">Pay your delivery fee upon arival-price base on location</span>
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
