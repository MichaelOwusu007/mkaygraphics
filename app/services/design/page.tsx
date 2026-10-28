'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  FileText,
  Image as ImageIcon,
  Mail,
  MapPin,
  Megaphone,
  MessageCircle,
  Package,
  Palette,
  PenTool,
  Phone,
  Presentation,
  Send,
  Shapes,
  Sparkles,
  Target,
} from 'lucide-react';

import Footer from '@/components/headers/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

interface DesignService {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  iconStyle: string;
  deliverables: string[];
}

const designServices: DesignService[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    category: 'Build recognition',
    description: 'A connected visual system that gives your business a clear, confident, and consistent presence.',
    icon: Shapes,
    accent: 'group-hover:border-red-500',
    iconStyle: 'bg-red-50 text-red-600',
    deliverables: ['Visual direction', 'Color and type system', 'Brand guidelines'],
  },
  {
    id: 'logo-design',
    title: 'Logo Design',
    category: 'Make your mark',
    description: 'Distinctive logo concepts built around your story, audience, and the places your identity needs to work.',
    icon: PenTool,
    accent: 'group-hover:border-amber-400',
    iconStyle: 'bg-amber-50 text-amber-600',
    deliverables: ['Primary logo', 'Logo variations', 'Ready-to-use files'],
  },
  {
    id: 'social-media',
    title: 'Social Media Design',
    category: 'Stay consistent',
    description: 'Scroll-stopping graphics and flexible templates that keep your content recognizable every day.',
    icon: ImageIcon,
    accent: 'group-hover:border-emerald-500',
    iconStyle: 'bg-emerald-50 text-emerald-600',
    deliverables: ['Post and story graphics', 'Campaign templates', 'Platform-ready sizes'],
  },
  {
    id: 'marketing-design',
    title: 'Marketing & Advertising',
    category: 'Move people to act',
    description: 'Focused visuals for promotions, launches, offers, and campaigns across digital and print channels.',
    icon: Megaphone,
    accent: 'group-hover:border-zinc-950',
    iconStyle: 'bg-zinc-100 text-zinc-900',
    deliverables: ['Flyers and posters', 'Digital advertisements', 'Campaign artwork'],
  },
  {
    id: 'packaging-labels',
    title: 'Packaging & Labels',
    category: 'Own the shelf',
    description: 'Practical packaging visuals that express your brand clearly and make products feel considered.',
    icon: Package,
    accent: 'group-hover:border-red-500',
    iconStyle: 'bg-red-50 text-red-600',
    deliverables: ['Product labels', 'Packaging layouts', 'Print-ready artwork'],
  },
  {
    id: 'event-campaigns',
    title: 'Events & Campaigns',
    category: 'Create one strong look',
    description: 'A complete visual direction carried across every event or campaign touchpoint.',
    icon: Sparkles,
    accent: 'group-hover:border-amber-400',
    iconStyle: 'bg-amber-50 text-amber-600',
    deliverables: ['Event identity', 'Promotional materials', 'Venue graphics'],
  },
  {
    id: 'editorial-publications',
    title: 'Editorial & Publications',
    category: 'Make content easy to follow',
    description: 'Well-structured layouts that give reports, books, magazines, and programs a polished flow.',
    icon: FileText,
    accent: 'group-hover:border-emerald-500',
    iconStyle: 'bg-emerald-50 text-emerald-600',
    deliverables: ['Reports and booklets', 'Programs and catalogues', 'Editorial layouts'],
  },
  {
    id: 'presentation-design',
    title: 'Presentations & Profiles',
    category: 'Tell the story clearly',
    description: 'Professional slides and company profiles that make important information easier to understand.',
    icon: Presentation,
    accent: 'group-hover:border-zinc-950',
    iconStyle: 'bg-zinc-100 text-zinc-900',
    deliverables: ['Pitch decks', 'Company profiles', 'Branded slide systems'],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Listen & align',
    description: 'We learn what you are creating, who it is for, and what the design needs to achieve.',
  },
  {
    number: '02',
    title: 'Define direction',
    description: 'We agree on the scope, visual direction, timeline, and deliverables before design begins.',
  },
  {
    number: '03',
    title: 'Design & refine',
    description: 'We develop the strongest direction, share it clearly, and refine it with focused feedback.',
  },
  {
    number: '04',
    title: 'Prepare & deliver',
    description: 'You receive organized files prepared for the digital, print, or campaign formats you need.',
  },
];

const workingBenefits = [
  {
    title: 'Clear creative direction',
    description: 'Every visual decision connects to your message, audience, and objective.',
  },
  {
    title: 'Designed for real use',
    description: 'The work is planned around the sizes, channels, and formats where it will appear.',
  },
  {
    title: 'Consistent across touchpoints',
    description: 'Your brand stays recognizable from a phone screen to a printed piece.',
  },
  {
    title: 'Files prepared properly',
    description: 'Final artwork is organized and exported in the formats agreed for your project.',
  },
];

const faqs = [
  {
    question: 'How much does a graphic design project cost?',
    answer: 'Pricing depends on the scope, number of items, complexity, and timeline. Share your brief and we will send a clear quote before work begins.',
  },
  {
    question: 'How long will my project take?',
    answer: 'Timing varies by project. A single design can move faster than a full brand identity or publication. We will confirm a realistic schedule after reviewing your request.',
  },
  {
    question: 'Can I request changes to the design?',
    answer: 'Yes. The agreed quote will explain the review stages and revisions included, so feedback stays focused and the project keeps moving.',
  },
  {
    question: 'Can you work with my existing logo and brand files?',
    answer: 'Yes. We can design within your current brand system or help improve consistency where your visual materials need it.',
  },
];

const emptyForm = {
  name: '',
  phone: '',
  email: '',
  service: '',
  businessName: '',
  projectDetails: '',
  usage: '',
  assets: '',
  timeline: '',
  budget: '',
  message: '',
};

export default function GraphicDesignPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const openQuoteForm = (service = '') => {
    setFormData((current) => ({ ...current, service: service || current.service }));
    setQuoteOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Unable to submit design request');

      toast.success('Your design brief has been sent. We will contact you shortly.');
      setQuoteOpen(false);
      setFormData(emptyForm);
    } catch {
      toast.error('Your request could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-zinc-950">
      <header className="relative isolate flex min-h-[720px] h-[88svh] max-h-[920px] items-center overflow-hidden bg-zinc-950">
        <Image
          src="/images/graphic-design-studio-hero.png"
          alt="Professional graphic design studio with a creative workstation, brand layouts, color swatches, and printed design proofs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[66%_center]"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300 sm:text-sm">Graphic Design</p>
            <h1 className="text-5xl font-bold leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Design with purpose.
              <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Stand out clearly.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg lg:text-xl">
              Brand identities, campaigns, social content, packaging, and print-ready artwork shaped around what your business needs to say.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button type="button" size="lg" onClick={() => openQuoteForm()} className="h-12 rounded-full bg-amber-400 px-7 font-bold text-black hover:bg-amber-300">
                Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-black" asChild>
                <a href="#design-services">Explore Services</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-300">
              {['Strategy led', 'Made for every format', 'Ready for real use'].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-amber-300" /> {item}</span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-600">Designed to communicate</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">More than something that looks good.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
                Strong design helps people recognize you, understand you, and remember you. We connect clear thinking with thoughtful visuals, so every piece has a job and every detail belongs.
              </p>
              <Button type="button" variant="link" onClick={() => openQuoteForm()} className="mt-6 h-auto p-0 text-base font-bold text-zinc-950 hover:text-red-600">
                Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-zinc-950 p-8 text-white sm:p-10">
              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-red-500/20 blur-3xl" />
              <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-black"><Target className="h-6 w-6" /></div>
                <p className="mt-10 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Our approach</p>
                <p className="mt-3 text-3xl font-semibold leading-snug sm:text-4xl">Clear idea. Strong visual. Consistent execution.</p>
                <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center text-sm text-zinc-300">
                  <span>Brand</span><span>Digital</span><span>Print</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="design-services" className="scroll-mt-24 bg-stone-50 py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">What we design</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">One studio. Every touchpoint.</h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
                Choose the service closest to what you need. If your project combines several items, share the full brief and we will shape the right scope around it.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {designServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article key={service.id} className={`group flex min-h-[420px] flex-col rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${service.accent}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.iconStyle}`}><Icon className="h-5 w-5" /></div>
                      <span className="text-xs font-bold tracking-[0.18em] text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">{service.category}</p>
                    <h3 className="mt-2 text-2xl font-bold">{service.title}</h3>
                    <p className="mt-4 leading-7 text-zinc-600">{service.description}</p>
                    <ul className="mt-6 space-y-2 border-t border-zinc-100 pt-5 text-sm text-zinc-600">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-600" /> {item}</li>
                      ))}
                    </ul>
                    <Button type="button" variant="link" onClick={() => openQuoteForm(service.title)} className="mt-auto h-auto justify-start p-0 pt-7 font-bold text-zinc-950 hover:text-red-600">
                      Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-zinc-950 py-20 text-white sm:py-24 lg:py-32">
          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-red-600/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">How it works</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">A clear path from brief to final files.</h2>
            </div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.number} className="bg-zinc-950 p-7 sm:p-8">
                  <span className="text-sm font-bold text-amber-300">{step.number}</span>
                  <h3 className="mt-10 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-4 leading-7 text-zinc-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-600">Built to work</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Good design should make the next step easier.</h2>
              <p className="mt-6 text-lg leading-8 text-zinc-600">The goal is not decoration. It is a visual system that helps your audience understand, trust, and choose your business.</p>
              <Button type="button" size="lg" onClick={() => openQuoteForm()} className="mt-8 rounded-full bg-zinc-950 px-7 font-bold text-white hover:bg-red-600">
                Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {workingBenefits.map((benefit, index) => (
                <div key={benefit.title} className="rounded-[1.75rem] border border-zinc-200 p-7 sm:p-8">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-white"><BadgeCheck className="h-5 w-5" /></div>
                  <p className="mt-8 text-xs font-bold tracking-[0.2em] text-zinc-400">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-bold">{benefit.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-stone-50 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Good to know</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Questions before we begin.</h2>
            </div>
            <div className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold marker:content-none sm:text-xl">
                    {faq.question}
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-xl font-normal transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-4 leading-7 text-zinc-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-amber-400 py-16 sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-700">Have a project in mind?</p>
              <h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Let&apos;s turn the idea into something people remember.</h2>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button type="button" size="lg" onClick={() => openQuoteForm()} className="rounded-full bg-zinc-950 px-7 font-bold text-white hover:bg-zinc-800">
                Let&apos;s Talk <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-zinc-950 bg-transparent px-7 font-bold text-zinc-950 hover:bg-white" asChild>
                <a href="https://wa.me/233592515464?text=Hello%20MkayGraphics%2C%20I%20would%20like%20to%20discuss%20a%20graphic%20design%20project." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Sheet open={quoteOpen} onOpenChange={setQuoteOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-l-0 p-0 sm:max-w-2xl">
          <div className="bg-zinc-950 px-6 py-7 text-white sm:px-8">
            <SheetHeader className="p-0">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-black"><Palette className="h-5 w-5" /></div>
              <SheetTitle className="text-2xl font-bold text-white sm:text-3xl">Tell us what you want to create</SheetTitle>
              <SheetDescription className="max-w-xl text-zinc-400">Share the essentials below. We will review your brief and contact you to confirm scope, timing, and a quote.</SheetDescription>
            </SheetHeader>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-8 pt-6 sm:px-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="design-name">Full name *</Label>
                <Input id="design-name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="design-phone">Phone number *</Label>
                <Input id="design-phone" type="tel" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="+233 XX XXX XXXX" required />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="design-email">Email address *</Label>
                <Input id="design-email" type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="design-business">Business or brand name</Label>
                <Input id="design-business" value={formData.businessName} onChange={(event) => setFormData({ ...formData, businessName: event.target.value })} placeholder="Optional" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="design-service">Design service *</Label>
              <select id="design-service" value={formData.service} onChange={(event) => setFormData({ ...formData, service: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10" required>
                <option value="">Choose a service</option>
                {designServices.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                <option value="Multiple design services">Multiple design services</option>
                <option value="Other design request">Other design request</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="design-project">Project brief *</Label>
              <Textarea id="design-project" value={formData.projectDetails} onChange={(event) => setFormData({ ...formData, projectDetails: event.target.value })} placeholder="What do you need designed, who is it for, and what should it help you achieve?" className="min-h-32 resize-none" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="design-usage">Where will it be used? *</Label>
                <select id="design-usage" value={formData.usage} onChange={(event) => setFormData({ ...formData, usage: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10" required>
                  <option value="">Choose one</option>
                  <option value="Digital only">Digital only</option>
                  <option value="Print only">Print only</option>
                  <option value="Digital and print">Digital and print</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="design-assets">Existing brand assets</Label>
                <select id="design-assets" value={formData.assets} onChange={(event) => setFormData({ ...formData, assets: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10">
                  <option value="">Choose one</option>
                  <option value="Logo and brand guide available">Logo and brand guide available</option>
                  <option value="Logo files available">Logo files available</option>
                  <option value="No brand files yet">No brand files yet</option>
                  <option value="Not sure">Not sure</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="design-timeline">Preferred timeline</Label>
                <select id="design-timeline" value={formData.timeline} onChange={(event) => setFormData({ ...formData, timeline: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10">
                  <option value="">Choose one</option>
                  <option value="As soon as possible">As soon as possible</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 2 to 4 weeks">Within 2 to 4 weeks</option>
                  <option value="More than 1 month">More than 1 month</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="design-budget">Estimated budget</Label>
                <select id="design-budget" value={formData.budget} onChange={(event) => setFormData({ ...formData, budget: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10">
                  <option value="">Choose a range</option>
                  <option value="Below GHS 500">Below GHS 500</option>
                  <option value="GHS 500 to GHS 1,500">GHS 500 to GHS 1,500</option>
                  <option value="GHS 1,500 to GHS 3,000">GHS 1,500 to GHS 3,000</option>
                  <option value="Above GHS 3,000">Above GHS 3,000</option>
                  <option value="I need guidance">I need guidance</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="design-notes">Additional notes</Label>
              <Textarea id="design-notes" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="Mention required sizes, references, content status, or anything else we should know." className="min-h-24 resize-none" />
            </div>

            <p className="rounded-xl bg-stone-50 px-4 py-3 text-xs leading-5 text-zinc-500">Have a logo, brief, or reference files? We will tell you how to send them after we contact you.</p>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full bg-zinc-950 font-bold text-white hover:bg-amber-400 hover:text-black">
              {isSubmitting ? 'Sending brief...' : 'Send Design Brief'}
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>

            <div className="grid gap-2 border-t border-zinc-200 pt-5 text-xs text-zinc-500 sm:grid-cols-3">
              <span className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> 059 251 5464</span>
              <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> mkaygraphix@gmail.com</span>
              <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Accra &amp; Cape Coast</span>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
}
