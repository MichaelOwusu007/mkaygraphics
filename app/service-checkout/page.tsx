'use client';

import { Suspense, useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Loader2,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getEditingService } from '@/lib/editingServices';

const DRAFT_KEY = 'mkaygraphics_editing_checkout_draft';
const LEGACY_DRAFT_KEY = 'mkaygraphix_service_checkout_draft';
const DETAILS_KEY = 'mkaygraphics_editing_checkout_details';

type DraftService = {
  serviceId: string;
  title: string;
  image: string;
  price: number;
  photoCount: number;
  turnaroundTime: string;
};

type ProjectInfo = {
  name: string;
  email: string;
  phone: string;
  instructions: string;
};

type ConfirmedOrder = {
  reference: string;
  status: string;
  serviceTitle: string;
  photoCount: number;
  unitPrice: number;
  total: number;
  currency: string;
  customerEmail: string;
  paymentChannel: string | null;
  paidAt: string | null;
};

const emptyProjectInfo: ProjectInfo = {
  name: '',
  email: '',
  phone: '',
  instructions: '',
};

function readCheckoutDraft(): DraftService | null {
  const raw = sessionStorage.getItem(DRAFT_KEY) || sessionStorage.getItem(LEGACY_DRAFT_KEY);
  if (!raw) return null;

  const stored = JSON.parse(raw) as { serviceId?: unknown; photoCount?: unknown };
  const serviceId = typeof stored.serviceId === 'string' ? stored.serviceId : '';
  const photoCount = Number(stored.photoCount);
  const service = getEditingService(serviceId);

  if (!service || !Number.isInteger(photoCount) || photoCount < 1 || photoCount > 1000) return null;

  const draft = {
    serviceId: service.id,
    title: service.title,
    image: service.image,
    price: service.price,
    photoCount,
    turnaroundTime: service.turnaroundTime,
  };

  sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ serviceId, photoCount }));
  sessionStorage.removeItem(LEGACY_DRAFT_KEY);
  return draft;
}

function ServiceCheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentReference = searchParams.get('reference') || searchParams.get('trxref');
  const paymentState = searchParams.get('payment');

  const [draft, setDraft] = useState<DraftService | null>(null);
  const [step, setStep] = useState(1);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>(emptyProjectInfo);

  useEffect(() => {
    let disposed = false;

    const prepareCheckout = async () => {
      let savedDraft: DraftService | null = null;

      try {
        savedDraft = readCheckoutDraft();
        if (savedDraft && !disposed) setDraft(savedDraft);

        const savedDetails = sessionStorage.getItem(DETAILS_KEY);
        if (savedDetails && !disposed) {
          const details = JSON.parse(savedDetails) as Partial<ProjectInfo>;
          setProjectInfo({
            name: typeof details.name === 'string' ? details.name : '',
            email: typeof details.email === 'string' ? details.email : '',
            phone: typeof details.phone === 'string' ? details.phone : '',
            instructions: typeof details.instructions === 'string' ? details.instructions : '',
          });
        }
      } catch (error) {
        console.error('Unable to restore editing checkout:', error);
      }

      if (paymentReference) {
        if (!disposed) {
          setIsInitializing(false);
          setIsVerifying(true);
          setStep(3);
        }

        try {
          const response = await fetch(
            `/api/paystack/editing/verify?reference=${encodeURIComponent(paymentReference)}`,
            { cache: 'no-store' },
          );
          const payload = await response.json() as { error?: string; order?: ConfirmedOrder };
          if (!response.ok || !payload.order) throw new Error(payload.error || 'Payment verification failed');

          if (!disposed) {
            setConfirmedOrder(payload.order);
            setPaymentError('');
            sessionStorage.removeItem(DRAFT_KEY);
            sessionStorage.removeItem(LEGACY_DRAFT_KEY);
            sessionStorage.removeItem(DETAILS_KEY);
            toast.success('Payment confirmed. Your editing order is ready.');
          }
        } catch (error) {
          console.error('Editing payment verification failed:', error);
          if (!disposed) {
            setPaymentError(error instanceof Error ? error.message : 'We could not verify this payment yet.');
            setStep(savedDraft ? 2 : 3);
          }
        } finally {
          if (!disposed) setIsVerifying(false);
        }
        return;
      }

      if (!savedDraft) {
        router.replace('/services/editing');
        return;
      }

      if (!disposed) {
        setIsInitializing(false);
        if (paymentState === 'cancelled') {
          setStep(2);
          toast.info('Payment was cancelled. Your order details are still here.');
        }
      }
    };

    void prepareCheckout();
    return () => {
      disposed = true;
    };
  }, [paymentReference, paymentState, router]);

  const total = draft ? draft.price * draft.photoCount : 0;

  const handleProjectDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectInfo.name || !projectInfo.email || !projectInfo.phone || !projectInfo.instructions) {
      toast.error('Please complete all required fields.');
      return;
    }

    sessionStorage.setItem(DETAILS_KEY, JSON.stringify(projectInfo));
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const beginPayment = async () => {
    if (!draft) return;
    setIsPaying(true);
    setPaymentError('');
    sessionStorage.setItem(DETAILS_KEY, JSON.stringify(projectInfo));

    try {
      const response = await fetch('/api/paystack/editing/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: draft.serviceId,
          photoCount: draft.photoCount,
          name: projectInfo.name,
          email: projectInfo.email,
          phone: projectInfo.phone,
          instructions: projectInfo.instructions,
        }),
      });
      const payload = await response.json() as { authorizationUrl?: string; error?: string };
      if (!response.ok || !payload.authorizationUrl) {
        throw new Error(payload.error || 'Unable to start payment');
      }

      window.location.assign(payload.authorizationUrl);
    } catch (error) {
      console.error('Unable to initialize editing payment:', error);
      const message = error instanceof Error ? error.message : 'Unable to start payment. Please try again.';
      setPaymentError(message);
      toast.error(message);
      setIsPaying(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />
          <p className="mt-3 text-sm text-zinc-500">Preparing your secure checkout...</p>
        </div>
      </div>
    );
  }

  const whatsappHelp = `Hello MkayGraphics, I need help with my editing order${paymentReference ? ` (${paymentReference})` : ''}.`;

  return (
    <main className="min-h-screen bg-stone-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Photo Editing</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Secure service checkout</h1>
          </div>
          <Button type="button" variant="outline" className="rounded-full bg-white" onClick={() => router.push('/services/editing')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Editing Services
          </Button>
        </div>

        <div className="mb-10 flex items-center justify-center">
          <div className="flex w-full max-w-2xl items-center">
            {[
              { number: 1, label: 'Project Details', icon: FileText },
              { number: 2, label: 'Review & Pay', icon: CreditCard },
              { number: 3, label: 'Confirmation', icon: CheckCircle2 },
            ].map((item, index) => {
              const Icon = item.icon;
              const active = step >= item.number;
              return (
                <div key={item.number} className="contents">
                  <div className={`flex shrink-0 items-center ${active ? 'text-zinc-950' : 'text-zinc-400'}`}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${active ? 'border-amber-400 bg-amber-400' : 'border-zinc-300 bg-white'}`}>
                      {step > item.number ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <span className="ml-2 hidden text-sm font-bold sm:inline">{item.label}</span>
                  </div>
                  {index < 2 && <div className={`mx-3 h-0.5 flex-1 sm:mx-5 ${step > item.number ? 'bg-amber-400' : 'bg-zinc-200'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            {step === 1 && draft && (
              <Card className="overflow-hidden border-0 shadow-sm">
                <CardHeader className="border-b bg-white px-6 py-6 sm:px-8">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Sparkles className="h-5 w-5 text-amber-500" /> Tell us about the project
                  </CardTitle>
                  <p className="text-sm text-zinc-500">Only the essential details needed to confirm your order and prepare the edit.</p>
                </CardHeader>
                <CardContent className="bg-white p-6 sm:p-8">
                  <form onSubmit={handleProjectDetails} className="space-y-8">
                    <section className="space-y-4">
                      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">Contact details</h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="editing-name">Full name *</Label>
                          <Input id="editing-name" autoComplete="name" value={projectInfo.name} onChange={(event) => setProjectInfo({ ...projectInfo, name: event.target.value })} placeholder="Your full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editing-email">Email address *</Label>
                          <Input id="editing-email" type="email" autoComplete="email" value={projectInfo.email} onChange={(event) => setProjectInfo({ ...projectInfo, email: event.target.value })} placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="editing-phone">Phone number *</Label>
                          <Input id="editing-phone" type="tel" autoComplete="tel" value={projectInfo.phone} onChange={(event) => setProjectInfo({ ...projectInfo, phone: event.target.value })} placeholder="+233 XX XXX XXXX" required />
                        </div>
                      </div>
                    </section>

                    <section className="space-y-4 border-t border-zinc-200 pt-7">
                      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-zinc-500">Editing brief</h2>
                      <div className="space-y-2">
                        <Label htmlFor="editing-instructions">What should we do with your photos? *</Label>
                        <Textarea
                          id="editing-instructions"
                          value={projectInfo.instructions}
                          onChange={(event) => setProjectInfo({ ...projectInfo, instructions: event.target.value })}
                          placeholder="Tell us the corrections, removals, background changes, style, or final result you want."
                          className="min-h-36 resize-none"
                          maxLength={1000}
                          required
                        />
                        <p className="text-xs text-zinc-500">You will send the original files after payment using the secure method we provide.</p>
                      </div>
                    </section>

                    <Button type="submit" size="lg" className="w-full rounded-full bg-zinc-950 font-bold text-white hover:bg-amber-400 hover:text-black">
                      Continue to Review
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && draft && (
              <Card className="overflow-hidden border-0 shadow-sm">
                <CardHeader className="border-b bg-white px-6 py-6 sm:px-8">
                  <CardTitle className="text-2xl">Review and pay securely</CardTitle>
                  <p className="text-sm text-zinc-500">Confirm the details below before continuing to Paystack.</p>
                </CardHeader>
                <CardContent className="space-y-6 bg-white p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-2xl bg-stone-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Customer</p>
                      <p className="mt-3 font-bold">{projectInfo.name}</p>
                      <p className="mt-1 text-sm text-zinc-600">{projectInfo.email}</p>
                      <p className="mt-1 text-sm text-zinc-600">{projectInfo.phone}</p>
                    </div>
                    <div className="rounded-2xl bg-stone-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Editing request</p>
                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-zinc-600">{projectInfo.instructions}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><CreditCard className="h-5 w-5" /></div>
                      <div>
                        <p className="font-bold">Paystack secure checkout</p>
                        <p className="text-sm text-zinc-500">Available payment methods are shown by Paystack for your account and location.</p>
                      </div>
                    </div>
                    <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-900">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                      <p>Your payment details are entered on Paystack. MkayGraphics does not receive or store your card or Mobile Money credentials.</p>
                    </div>
                  </div>

                  {paymentError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{paymentError}</div>
                  )}

                  <Button type="button" size="lg" onClick={beginPayment} disabled={isPaying} className="w-full rounded-full bg-zinc-950 font-bold text-white hover:bg-amber-400 hover:text-black">
                    {isPaying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting to Paystack...</> : <><LockKeyhole className="mr-2 h-4 w-4" /> Pay GH₵{total.toFixed(2)}</>}
                  </Button>
                  <Button type="button" variant="outline" className="w-full rounded-full" onClick={() => setStep(1)} disabled={isPaying}>Edit Details</Button>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="overflow-hidden border-0 shadow-sm">
                <CardContent className="bg-white px-6 py-12 text-center sm:px-10">
                  {isVerifying ? (
                    <div className="mx-auto max-w-lg">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100"><Loader2 className="h-9 w-9 animate-spin text-amber-700" /></div>
                      <h2 className="mt-6 text-3xl font-bold">Confirming your payment</h2>
                      <p className="mt-3 leading-7 text-zinc-600">Please keep this page open while we verify the transaction securely with Paystack.</p>
                    </div>
                  ) : confirmedOrder ? (
                    <div className="mx-auto max-w-2xl">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100"><CheckCircle2 className="h-10 w-10 text-emerald-700" /></div>
                      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Payment confirmed</p>
                      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Your editing order is in.</h2>
                      <p className="mt-4 leading-7 text-zinc-600">A confirmation email is being sent to {confirmedOrder.customerEmail}. Our team will contact you with a secure way to send your images.</p>

                      <div className="mt-8 rounded-2xl bg-stone-50 p-6 text-left">
                        <div className="grid gap-4 text-sm sm:grid-cols-2">
                          <div><p className="text-zinc-500">Service</p><p className="mt-1 font-bold">{confirmedOrder.serviceTitle}</p></div>
                          <div><p className="text-zinc-500">Photos</p><p className="mt-1 font-bold">{confirmedOrder.photoCount}</p></div>
                          <div><p className="text-zinc-500">Amount paid</p><p className="mt-1 font-bold">GH₵{confirmedOrder.total.toFixed(2)}</p></div>
                          <div><p className="text-zinc-500">Payment reference</p><p className="mt-1 break-all font-mono text-xs font-bold">{confirmedOrder.reference}</p></div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left">
                        <p className="font-bold">What happens next?</p>
                        <ol className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
                          <li>1. We review your brief and confirm the file-transfer method.</li>
                          <li>2. You send the original images using the secure link we provide.</li>
                          <li>3. Editing begins after the files and final instructions are received.</li>
                        </ol>
                      </div>

                      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        <Button size="lg" className="rounded-full bg-zinc-950 px-7 text-white" onClick={() => router.push('/')}>Return Home</Button>
                        <Button size="lg" variant="outline" className="rounded-full" asChild>
                          <a href={`https://wa.me/233592515464?text=${encodeURIComponent(whatsappHelp)}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Support</a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto max-w-xl">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100"><CreditCard className="h-9 w-9 text-red-700" /></div>
                      <h2 className="mt-6 text-3xl font-bold">We could not confirm the payment</h2>
                      <p className="mt-3 leading-7 text-zinc-600">{paymentError || 'Please try verification again or contact us if your account was charged.'}</p>
                      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        {paymentReference && <Button size="lg" className="rounded-full" onClick={() => window.location.reload()}>Verify Again</Button>}
                        <Button size="lg" variant="outline" className="rounded-full" asChild>
                          <a href={`https://wa.me/233592515464?text=${encodeURIComponent(whatsappHelp)}`} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> Payment Support</a>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <aside>
            <Card className="sticky top-24 overflow-hidden border-0 shadow-sm">
              <CardHeader className="bg-zinc-950 text-white">
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 bg-white p-6">
                {draft ? (
                  <>
                    <div className="flex gap-4 border-b border-zinc-200 pb-5">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image src={draft.image} alt={draft.title} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-bold">{draft.title}</h2>
                        <p className="mt-1 text-sm text-zinc-500">{draft.photoCount} {draft.photoCount === 1 ? 'photo' : 'photos'}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">{draft.turnaroundTime}</Badge>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-zinc-500">Rate per photo</span><span>GH₵{draft.price.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Photo count</span><span>{draft.photoCount}</span></div>
                      <div className="flex justify-between border-t border-zinc-200 pt-4 text-lg font-bold"><span>Total</span><span>GH₵{total.toFixed(2)}</span></div>
                    </div>
                    <p className="rounded-xl bg-blue-50 p-4 text-xs leading-5 text-blue-900">This is a digital editing service. No delivery fee is added at checkout.</p>
                    <div className="space-y-3 border-t border-zinc-200 pt-5 text-sm text-zinc-600">
                      <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Server-verified pricing</p>
                      <p className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-emerald-600" /> Secure Paystack payment</p>
                      <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-emerald-600" /> {draft.turnaroundTime} turnaround</p>
                    </div>
                  </>
                ) : confirmedOrder ? (
                  <div className="space-y-4 text-sm">
                    <p className="font-bold">{confirmedOrder.serviceTitle}</p>
                    <div className="flex justify-between"><span className="text-zinc-500">Photos</span><span>{confirmedOrder.photoCount}</span></div>
                    <div className="flex justify-between border-t border-zinc-200 pt-4 text-lg font-bold"><span>Paid</span><span>GH₵{confirmedOrder.total.toFixed(2)}</span></div>
                  </div>
                ) : (
                  <p className="text-sm leading-6 text-zinc-500">Your verified order summary will appear here.</p>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ServiceCheckoutLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
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
