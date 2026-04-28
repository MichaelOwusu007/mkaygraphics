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
import { CheckCircle2, FileText, Zap, Loader2, MessageCircle, Send, Clock } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    try {
      const raw = sessionStorage.getItem("mkaygraphix_service_checkout_draft");
      if (!raw) {
        router.push("/services/editing");
        return;
      }
      const d: DraftService = JSON.parse(raw);
      setDraft(d);
      setIsInitializing(false);
    } catch (err) {
      console.error("Failed to load checkout draft:", err);
      router.push("/services/editing");
    }
  }, [router]);

  if (isInitializing) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  const total = draft.price * draft.photoCount;

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

  const submitOrder = async () => {
    if (!draft) return;
    setIsSubmitting(true);

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

    try {
      // Use service-order API which is designed for editing services
      const response = await fetch("/api/service-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: orderDataToSave.customerName,
          customerEmail: orderDataToSave.customerEmail,
          customerPhone: orderDataToSave.customerPhone,
          serviceTitle: orderDataToSave.serviceTitle,
          photoCount: orderDataToSave.photoCount,
          totalPrice: orderDataToSave.totalPrice,
          total: orderDataToSave.total,
          projectInfo: orderDataToSave.projectInfo,
          paymentMethod: "WhatsApp",
        }),
      });

      if (!response.ok) {
        toast.error("Failed to submit order. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setOrderData(orderDataToSave);
      sessionStorage.removeItem("mkaygraphix_service_checkout_draft");
      setStep(3);
      toast.success("Order submitted successfully!");
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hi MkayGraphix! I've just submitted my ${draft.title} order for ${draft.photoCount} photos (GH₵${total.toFixed(2)}). I'd like to proceed with payment and share my images.`;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Service Order</h1>

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
              {step > 2 ? <CheckCircle2 className="h-6 w-6" /> : <FileText className="h-5 w-5" />}
            </div>
            <span className="ml-2 font-semibold hidden sm:inline">Review</span>
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
          {/* Step 1: Project Details */}
          {step === 1 && draft && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                        <Input id="name" value={projectInfo.name} onChange={(e) => setProjectInfo({ ...projectInfo, name: e.target.value })} required placeholder="Your full name" />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" value={projectInfo.email} onChange={(e) => setProjectInfo({ ...projectInfo, email: e.target.value })} required placeholder="your@email.com" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input id="phone" type="tel" value={projectInfo.phone} onChange={(e) => setProjectInfo({ ...projectInfo, phone: e.target.value })} required placeholder="+233592515464" />
                      </div>
                      <div>
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" value={projectInfo.company} onChange={(e) => setProjectInfo({ ...projectInfo, company: e.target.value })} placeholder="Your company" />
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

                  <Button type="submit" size="lg" className="w-full">Continue to Review</Button>
                   
                  <a
                    href={`https://wa.me/233592515464?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp First
                  </a>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Review & Submit */}
          {step === 2 && draft && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> {projectInfo.name}</div>
                    <div><span className="text-muted-foreground">Email:</span> {projectInfo.email}</div>
                    <div><span className="text-muted-foreground">Phone:</span> {projectInfo.phone}</div>
                    {projectInfo.company && <div><span className="text-muted-foreground">Company:</span> {projectInfo.company}</div>}
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                  <h3 className="font-semibold">Project Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-muted-foreground">Project Title:</span> {projectInfo.projectTitle}</div>
                    <div><span className="text-muted-foreground">Description:</span></div>
                    <div className="text-muted-foreground whitespace-pre-wrap">{projectInfo.projectDescription}</div>
                    {projectInfo.deadline && <div><span className="text-muted-foreground">Deadline:</span> {projectInfo.deadline}</div>}
                    {projectInfo.referenceLinks && <div><span className="text-muted-foreground">Reference Links:</span> {projectInfo.referenceLinks}</div>}
                    {projectInfo.specialRequirements && <div><span className="text-muted-foreground">Special Requirements:</span> {projectInfo.specialRequirements}</div>}
                  </div>
                </div>

                <Button
                  type="button"
                  size="lg"
                  className="w-full"
                  onClick={submitOrder}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Order
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
                  href={`https://wa.me/233592515464?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && orderData && (
            <Card className="text-center">
              <CardContent className="py-12 space-y-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Order Submitted!</h2>
                <p className="text-muted-foreground">
                  Thank you! We've received your order. A confirmation email has been sent to {orderData.customerEmail}.
                </p>
                
                <div className="bg-muted/30 rounded-lg p-4 text-left max-w-md mx-auto">
                  <h3 className="font-semibold mb-2">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{orderData.serviceTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Photos:</span>
                      <span className="font-medium">{orderData.photoCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span className="font-medium">{orderData.customerName}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="font-bold">Est. Total:</span>
                      <span className="font-bold text-lg">GH₵{orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Next Steps</h3>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 text-left">
                    <li>1. We'll respond to your WhatsApp message</li>
                    <li>2. Confirm the final price and details</li>
                    <li>3. Share payment instructions</li>
                    <li>4. Send you a link to upload your images</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push('/')} size="lg">Return Home</Button>
                  <a
                    href={`https://wa.me/233592515464?text=${encodeURIComponent(whatsappMessage)}`}
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

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {draft && (
                <div className="flex gap-3 pb-3 border-b">
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image 
                      src={draft.image || "/images/service-placeholder.jpg"} 
                      alt={draft.title} 
                      fill 
                      sizes="64px" 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{draft.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {draft.photoCount} photos
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {draft.turnaroundTime || "Standard"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">GH₵{total.toFixed(2)}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span>Rate per photo</span>
                  <span>GH₵{draft?.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Photo Count</span>
                  <span>× {draft?.photoCount}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Estimated Total</span>
                  <span>GH₵{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-semibold">Turnaround Time</span>
                </div>
                <p className="text-xs text-muted-foreground">{draft?.turnaroundTime || "Standard delivery"}</p>
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