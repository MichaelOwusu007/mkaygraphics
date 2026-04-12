'use client';

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, FileText, Zap, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type DraftService = {
  serviceId: string;
  title: string;
  image: string;
  price: number;
  photoCount: number;
  turnaroundTime?: string;
};

type ServiceOrderData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceTitle: string;
  photoCount: number;
  totalPrice: number;
  total: number;
  projectInfo: {
    company: string;
    projectTitle: string;
    projectDescription: string;
    deadline: string;
    referenceLinks: string;
    specialRequirements: string;
  };
};

function ServiceCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [draft, setDraft] = useState<DraftService | null>(null);
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [orderData, setOrderData] = useState<ServiceOrderData | null>(null);

  const [projectInfo, setProjectInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectTitle: '',
    projectDescription: '',
    deadline: '',
    referenceLinks: '',
    specialRequirements: '',
  });

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const ref = searchParams.get("ref");

    if (paymentStatus === "success" && ref) {
      const savedOrderData = sessionStorage.getItem("pendingServiceOrder");
      if (savedOrderData) {
        const data = JSON.parse(savedOrderData) as ServiceOrderData;
        setOrderData(data);
        sendOrderEmail(data, ref);
        sessionStorage.removeItem("pendingServiceOrder");
        sessionStorage.removeItem("serviceCheckoutDraft");
      }
      setStep(3);
      toast.success("Payment successful! Your order has been placed.");
    }
    setIsInitializing(false);
  }, [searchParams]);

  const sendOrderEmail = async (data: ServiceOrderData, paymentRef?: string) => {
    try {
      await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          items: [],
          serviceItems: [{
            serviceTitle: `${data.serviceTitle} - ${data.photoCount} photos`,
            photoCount: data.photoCount,
            totalPrice: data.totalPrice,
          }],
          total: data.total,
          shippingInfo: data.projectInfo,
          paymentMethod: "Paystack",
          paymentReference: paymentRef,
          orderType: "Editing Service",
        }),
      });
    } catch (error) {
      console.error("Error sending order email:", error);
    }
  };

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("serviceCheckoutDraft");
      if (!raw && step !== 3) {
        router.push("/services/editing");
        return;
      }
      if (raw) {
        const d: DraftService = JSON.parse(raw);
        setDraft(d);
      }
    } catch (err) {
      console.error("Failed to load checkout draft:", err);
      router.push("/services/editing");
    }
  }, [router, step]);

  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!draft && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  const total = draft ? draft.price * draft.photoCount : orderData?.total || 0;

  const handleSubmitProjectInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectInfo.name || !projectInfo.email || !projectInfo.phone || !projectInfo.projectTitle || !projectInfo.projectDescription) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!projectInfo.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setStep(2);
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await initiatePaystackPayment();
  };

  const initiatePaystackPayment = async () => {
    if (!draft) return;
    setIsProcessing(true);

    const orderDataToSave: ServiceOrderData = {
      customerName: projectInfo.name,
      customerEmail: projectInfo.email,
      customerPhone: projectInfo.phone,
      serviceTitle: draft.title,
      photoCount: draft.photoCount,
      totalPrice: total,
      total,
      projectInfo: {
        company: projectInfo.company,
        projectTitle: projectInfo.projectTitle,
        projectDescription: projectInfo.projectDescription,
        deadline: projectInfo.deadline,
        referenceLinks: projectInfo.referenceLinks,
        specialRequirements: projectInfo.specialRequirements,
      },
    };

    sessionStorage.setItem("pendingServiceOrder", JSON.stringify(orderDataToSave));

    try {
      const response = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: projectInfo.email,
          name: projectInfo.name,
          phone: projectInfo.phone,
          orderId: `SVC-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to initialize payment");
        sessionStorage.removeItem("pendingServiceOrder");
        setIsProcessing(false);
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (error) {
      console.error("Paystack error:", error);
      toast.error("Payment initialization failed");
      sessionStorage.removeItem("pendingServiceOrder");
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className=" text-4xl font-bold mb-8">Service Checkout</h1>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-12 max-w-2xl mx-auto">
        <div className="flex items-center w-full">
          <div className={`flex items-center ${step >= 1 ? 'text-secondary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-secondary bg-secondary/10' : 'border-muted'}`}>
              {step > 1 ? <CheckCircle2 className="h-6 w-6" /> : <FileText className="h-5 w-5" />}
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Project Details</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-secondary' : 'bg-muted'}`} />
          <div className={`flex items-center ${step >= 2 ? 'text-secondary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-secondary bg-secondary/10' : 'border-muted'}`}>
              {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : <CreditCard className="h-5 w-5" />}
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Payment</span>
          </div>
          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-secondary' : 'bg-muted'}`} />
          <div className={`flex items-center ${step >= 3 ? 'text-secondary' : 'text-muted-foreground'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-secondary bg-secondary/10' : 'border-muted'}`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1 */}
          {step === 1 && draft && (
            <Card>
              <CardHeader>
                <CardTitle className="font-serif flex items-center gap-2">
                  <Zap className="h-5 w-5 text-secondary" />
                  Project Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">Tell us about your project and requirements</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitProjectInfo} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input id="name" value={projectInfo.name} onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={projectInfo.email} onChange={(e) => setProjectInfo({ ...projectInfo, email: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" value={projectInfo.phone} onChange={(e) => setProjectInfo({ ...projectInfo, phone: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" value={projectInfo.company} onChange={(e) => setProjectInfo({ ...projectInfo, company: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Project Details</h3>
                    <div>
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input id="projectTitle" placeholder="e.g., Wedding Album Editing" value={projectInfo.projectTitle} onChange={(e) => setProjectInfo({ ...projectInfo, projectTitle: e.target.value })} required />
                    </div>
                    <div>
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Describe your project, style preferences, and expected outcomes..."
                        value={projectInfo.projectDescription}
                        onChange={(e) => setProjectInfo({ ...projectInfo, projectDescription: e.target.value })}
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Preferred Deadline (Optional)</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={projectInfo.deadline}
                        onChange={(e) => setProjectInfo({ ...projectInfo, deadline: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="referenceLinks">Reference Links (Optional)</Label>
                      <Textarea
                        id="referenceLinks"
                        placeholder="Share any inspiration links, Pinterest boards, or examples..."
                        value={projectInfo.referenceLinks}
                        onChange={(e) => setProjectInfo({ ...projectInfo, referenceLinks: e.target.value })}
                        className="min-h-[80px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                      <Textarea
                        id="specialRequirements"
                        placeholder="Any specific technical requirements, file formats, delivery preferences..."
                        value={projectInfo.specialRequirements}
                        onChange={(e) => setProjectInfo({ ...projectInfo, specialRequirements: e.target.value })}
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">Continue to Payment</Button>
                  
                  <a
                    href={`https://wa.me/233592515464?text=Hi, I need help with ${draft?.title || 'editing service'} (GH₵${total.toFixed(2)})`}
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

          {/* Step 2 */}
          {step === 2 && draft && (
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
                      You will be redirected to Paystack to complete your payment securely.
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
                      `Pay GH₵${total.toFixed(2)} with Paystack`
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

          {/* Step 3 */}
          {step === 3 && (
            <Card className="text-center">
              <CardContent className="py-12 space-y-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-secondary" />
                </div>
                <h2 className=" text-3xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order! A confirmation email has been sent to {orderData?.customerEmail}. We will contact you within 24 hours to discuss next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push('/')} size="lg">Return Home</Button>
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
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {(draft || orderData) && (
                  <div className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image 
                        src={draft?.image || "/images/service-placeholder.jpg"} 
                        alt={draft?.title || orderData?.serviceTitle || "Service"} 
                        fill 
                        sizes="64px" 
                        style={{ objectFit: 'cover' }} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">{draft?.title || orderData?.serviceTitle}</h3>
                      <p className="text-xs text-muted-foreground mb-1">
                        {draft?.photoCount || orderData?.photoCount} {draft?.photoCount === 1 ? 'photo' : 'photos'}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {draft?.turnaroundTime || "Standard"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">GH₵{total.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>GH₵{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>GH₵{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-accent/30 p-4 rounded-lg">
                <p className="text-xs text-center">Digital services - No shipping required</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ServiceCheckoutLoading() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
    </div>
  );
}

export default function ServiceCheckoutPage() {
  return (
    <Suspense fallback={<ServiceCheckoutLoading />}>
      <ServiceCheckoutContent />
    </Suspense>
  );
}
