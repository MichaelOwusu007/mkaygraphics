'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, CreditCard, FileText, Zap, Loader2 } from "lucide-react";
import { toast } from "sonner";

type DraftService = {
  serviceId: string;
  title: string;
  image: string;
  price: number;
  photoCount: number;
  turnaroundTime?: string;
};

export default function ServiceCheckoutPage() {
  const router = useRouter();

  const [draft, setDraft] = useState<DraftService | null>(null);
  const [step, setStep] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const raw = sessionStorage.getItem("serviceCheckoutDraft");
      if (!raw) {
        router.push("/services/editing");
        return;
      }
      const d: DraftService = JSON.parse(raw);
      setDraft(d);
    } catch (err) {
      console.error("Failed to load checkout draft:", err);
      router.push("/services/editing");
    }
  }, [router]);

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

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await initiatePaystackPayment();
  };

  const initiatePaystackPayment = async () => {
    setIsProcessing(true);

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
        setIsProcessing(false);
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (error) {
      console.error("Paystack error:", error);
      toast.error("Payment initialization failed");
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">Service Checkout</h1>

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
          {step === 1 && (
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
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 2 */}
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
                </form>
              </CardContent>
            </Card>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <Card className="text-center">
              <CardContent className="py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-secondary" />
                </div>
                <h2 className="font-serif text-3xl font-bold mb-4">Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your order. We have received your project details and will contact you within 24 hours to discuss next steps.
                </p>
                <Button onClick={() => router.push('/')} size="lg">Return Home</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="font-serif">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="relative w-16 h-16 rounded overflow-hidden">
                    <Image src={draft.image} alt={draft.title} fill sizes="64px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{draft.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">
                      {draft.photoCount} {draft.photoCount === 1 ? 'photo' : 'photos'}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {draft.turnaroundTime || "Standard"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">GH₵{(draft.price * draft.photoCount).toFixed(2)}</p>
                  </div>
                </div>
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
