'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  Clock3,
  FileText,
  Gift,
  Heart,
  Image as ImageIcon,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Palette,
  PanelTop,
  Phone,
  Printer,
  Send,
  Shirt,
  Sparkles,
  Sticker,
  Truck,
} from 'lucide-react';

import Footer from '@/components/headers/Footer';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PrintService {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  icon: LucideIcon;
  highlights: string[];
}

const printServices: PrintService[] = [
  {
    id: 'wedding-event-stationery',
    title: 'Wedding & Event Stationery',
    category: 'Events',
    description: 'Thoughtfully printed stationery that gives weddings, celebrations, and special gatherings a polished identity.',
    image: '/images/printing-wedding-stationery.png',
    icon: Heart,
    highlights: ['Invitations and save-the-dates', 'Programs and menus', 'Thank-you cards and tags'],
  },
  {
    id: 'tshirt-apparel-printing',
    title: 'T-Shirt & Apparel Printing',
    category: 'Apparel',
    description: 'Custom apparel for teams, brands, schools, campaigns, celebrations, and everyday personal expression.',
    image: '/images/tshirt-printing-studio.png',
    icon: Shirt,
    highlights: ['T-shirts and branded apparel', 'Single or multicolor artwork', 'Personal and bulk quantities'],
  },
  {
    id: 'banners-large-format',
    title: 'Banners & Large Format',
    category: 'Display',
    description: 'High-impact display printing for promotions, launches, conferences, shops, and outdoor events.',
    image: '/images/printing-banners-large-format.png',
    icon: PanelTop,
    highlights: ['Roll-up and event banners', 'Indoor and outdoor formats', 'Custom dimensions available'],
  },
  {
    id: 'business-stationery',
    title: 'Business & Office Stationery',
    category: 'Business',
    description: 'Professional printed materials that keep your business consistent, organized, and ready to make an impression.',
    image: '/images/printing-business-stationery.png',
    icon: BriefcaseBusiness,
    highlights: ['Business and appointment cards', 'Letterheads and envelopes', 'Invoices, receipts, and forms'],
  },
  {
    id: 'flyers-brochures',
    title: 'Flyers, Brochures & Menus',
    category: 'Marketing',
    description: 'Clear, vibrant marketing materials designed to communicate offers, information, and ideas beautifully.',
    image: '/images/printing-flyers-brochures.png',
    icon: FileText,
    highlights: ['Single and folded formats', 'Multiple paper and finish options', 'Short-run and bulk printing'],
  },
  {
    id: 'posters-event-signage',
    title: 'Posters & Event Signage',
    category: 'Display',
    description: 'Bold visual pieces for announcements, directions, campaigns, stage areas, and branded environments.',
    image: '/images/printing-posters-signage.png',
    icon: ImageIcon,
    highlights: ['Promotional posters', 'Directional and welcome signs', 'Mounted display options'],
  },
  {
    id: 'stickers-labels-packaging',
    title: 'Stickers, Labels & Packaging',
    category: 'Branding',
    description: 'Practical branded details that help products, gifts, parcels, and customer orders feel complete.',
    image: '/images/printing-stickers-packaging.png',
    icon: Sticker,
    highlights: ['Product and packaging labels', 'Custom stickers and seals', 'Tags and branded inserts'],
  },
  {
    id: 'books-booklets-programs',
    title: 'Books, Booklets & Programs',
    category: 'Publications',
    description: 'Neatly produced multi-page materials for events, schools, organizations, portfolios, and presentations.',
    image: '/images/printing-books-booklets.png',
    icon: BookOpen,
    highlights: ['Event and funeral programs', 'Catalogues and company profiles', 'Booklets and manuals'],
  },
  {
    id: 'personalized-gifts',
    title: 'Personalized Gifts & Souvenirs',
    category: 'Gifts',
    description: 'Meaningful custom pieces created for birthdays, appreciation gifts, milestones, and branded giveaways.',
    image: '/images/printing-personalized-gifts.png',
    icon: Gift,
    highlights: ['Mugs and keepsakes', 'Event and corporate souvenirs', 'Photo and name personalization'],
  },
  {
    id: 'certificates-awards',
    title: 'Certificates & Awards',
    category: 'Professional',
    description: 'Clean, formal documents for recognition, participation, achievement, training, and institutional use.',
    image: '/images/printing-certificates-awards.png',
    icon: Sparkles,
    highlights: ['Certificates and citations', 'Special paper and finish options', 'Custom layouts and sizing'],
  },
  {
    id: 'photo-canvas-prints',
    title: 'Photo & Canvas Prints',
    category: 'Photography',
    description: 'Turn portraits, artwork, and meaningful photographs into display-ready prints for homes and workspaces.',
    image: '/images/printing-photo-canvas.png',
    icon: ImageIcon,
    highlights: ['Photo print sizes', 'Canvas print options', 'Framing available separately'],
  },
];

const serviceBenefits = [
  { icon: Layers3, title: 'Materials that fit the job', description: 'Paper, fabric, vinyl, card, and finish options are matched to how your print will be used.' },
  { icon: Palette, title: 'Design support available', description: 'Bring finished artwork or let our creative team help prepare a print-ready design.' },
  { icon: PackageCheck, title: 'Careful finishing', description: 'Trimming, folding, mounting, binding, and packaging are considered as part of the final result.' },
  { icon: Truck, title: 'Pickup or delivery', description: 'Choose the fulfilment option that works for your location, schedule, and order size.' },
];

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  quantity: '',
  description: '',
  deliveryDate: '',
  address: '',
  message: '',
};

export default function PrintingPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const openQuoteForm = (service = '') => {
    setFormData((current) => ({ ...current, service }));
    setQuoteOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email/printing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, serviceType: 'Printing Services' }),
      });

      if (!response.ok) throw new Error('Unable to submit quote request');

      toast.success('Quote request sent. We will contact you shortly.');
      setQuoteOpen(false);
      setFormData(emptyForm);
    } catch {
      toast.error('Your request could not be sent. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <header className="relative isolate flex min-h-[700px] h-[86svh] max-h-[900px] items-center overflow-hidden bg-zinc-950">
        <Image
          src="/images/printing-studio-hero.png"
          alt="Professional printing studio with large-format printers and finished print materials"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-yellow-300 sm:text-sm">Professional Printing Services</p>
            <h1 className="text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl">
              Print it.
              <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">Make it real.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg lg:text-xl">
              From everyday business materials to statement event pieces, we turn your ideas into print with the right format, finish, and attention to detail.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button type="button" size="lg" onClick={() => openQuoteForm()} className="h-12 rounded-full bg-yellow-400 px-7 font-bold text-black hover:bg-yellow-300">
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-black" asChild>
                <a href="#printing-services">Explore Printing</a>
              </Button>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400">Pricing is prepared for your exact quantity, size, material, finish, and timeline.</p>
          </div>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-zinc-200 px-4 sm:px-6 md:grid-cols-4 md:divide-y-0 lg:px-8">
          {[
            { icon: Palette, label: 'Custom designs' },
            { icon: Layers3, label: 'Multiple finishes' },
            { icon: Clock3, label: 'Flexible timelines' },
            { icon: Truck, label: 'Pickup or delivery' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 px-3 py-5 text-center sm:py-6">
              <item.icon className="h-5 w-5 shrink-0 text-yellow-600" />
              <span className="text-xs font-semibold text-zinc-700 sm:text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="printing-services" className="scroll-mt-20 bg-zinc-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-600">What we print</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Print solutions for every kind of idea.</h2>
            </div>
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm leading-relaxed text-zinc-700 sm:p-6">
              <p className="font-semibold text-zinc-950">Every project is quoted individually.</p>
              <p className="mt-2">Tell us what you need and we will recommend the right material, production method, finish, and quantity for it.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {printServices.map((service) => (
              <article key={service.id} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-black/45 text-yellow-300 backdrop-blur-md">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">{service.category}</span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold tracking-tight text-zinc-950 sm:text-2xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{service.description}</p>
                  <ul className="mt-5 space-y-2.5">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2.5 text-sm text-zinc-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <Button type="button" onClick={() => openQuoteForm(service.title)} className="mt-7 w-full rounded-full bg-zinc-950 text-white hover:bg-yellow-400 hover:text-black">
                    Ask About This Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-600">Built around your brief</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">The right print starts with the right questions.</h2>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">Size, quantity, material, finish, artwork, and deadline all shape a printing project. We review the details first, then recommend a practical way forward.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { number: '01', title: 'Share your idea', description: 'Choose a service and tell us the quantity, dimensions, timeline, and what the print needs to achieve.' },
              { number: '02', title: 'Confirm the details', description: 'We help you settle the material, finish, artwork requirements, production approach, and final quote.' },
              { number: '03', title: 'Approve and print', description: 'Once the specification and artwork are approved, your project moves into production and finishing.' },
            ].map((step) => (
              <div key={step.number} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7 sm:p-8">
                <span className="text-sm font-bold text-yellow-600">{step.number}</span>
                <h3 className="mt-8 text-xl font-bold text-zinc-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">Why MkayGraphics</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">More than ink on a surface.</h2>
            <p className="mt-5 max-w-xl leading-relaxed text-zinc-400">We consider how your print should look, feel, travel, and perform so the finished piece makes sense for its real purpose.</p>
            <Button type="button" size="lg" onClick={() => openQuoteForm()} className="mt-8 rounded-full bg-yellow-400 px-7 font-bold text-black hover:bg-yellow-300">
              Tell Us What You Need <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {serviceBenefits.map((benefit) => (
              <div key={benefit.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-black"><benefit.icon className="h-5 w-5" /></div>
                <h3 className="mt-5 text-lg font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-700">Ready when you are</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Have a print project in mind?</h2>
            <p className="mt-3 max-w-2xl text-zinc-700">Send the details and we will help you turn them into a clear print specification and quote.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="button" size="lg" onClick={() => openQuoteForm()} className="rounded-full bg-zinc-950 px-7 font-bold text-white hover:bg-zinc-800">
              Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-zinc-950 bg-transparent px-7 font-bold text-zinc-950 hover:bg-white" asChild>
              <a href="https://wa.me/233592515464?text=Hello%20MkayGraphics%2C%20I%20would%20like%20to%20discuss%20a%20printing%20project." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Sheet open={quoteOpen} onOpenChange={setQuoteOpen}>
        <SheetContent side="left" className="w-full overflow-y-auto border-r-0 p-0 sm:max-w-2xl">
          <div className="bg-zinc-950 px-6 py-7 text-white sm:px-8">
            <SheetHeader className="p-0">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-black"><Printer className="h-5 w-5" /></div>
              <SheetTitle className="text-2xl font-bold text-white sm:text-3xl">Request a printing quote</SheetTitle>
              <SheetDescription className="max-w-xl text-zinc-400">Share the project details below. We will review the specification and contact you with the next steps.</SheetDescription>
            </SheetHeader>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-7 sm:px-8 sm:pb-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="printing-name">Full name *</Label>
                <Input id="printing-name" value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="printing-phone">Phone number *</Label>
                <Input id="printing-phone" type="tel" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} placeholder="+233 XX XXX XXXX" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="printing-email">Email address *</Label>
              <Input id="printing-email" type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} placeholder="you@example.com" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="printing-service">Printing service *</Label>
                <select id="printing-service" value={formData.service} onChange={(event) => setFormData({ ...formData, service: event.target.value })} className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-xs outline-none focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10" required>
                  <option value="">Choose a service</option>
                  {printServices.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
                  <option value="Other printing request">Other printing request</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="printing-quantity">Estimated quantity *</Label>
                <Input id="printing-quantity" value={formData.quantity} onChange={(event) => setFormData({ ...formData, quantity: event.target.value })} placeholder="Example: 100 copies" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="printing-description">Project details *</Label>
              <Textarea id="printing-description" value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} placeholder="Tell us the size, material, colors, finishing, artwork status, and how the print will be used." className="min-h-28 resize-none" required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="printing-date">Preferred completion date</Label>
                <Input id="printing-date" type="date" value={formData.deliveryDate} onChange={(event) => setFormData({ ...formData, deliveryDate: event.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="printing-location">Pickup or delivery location</Label>
                <Input id="printing-location" value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} placeholder="Town or delivery address" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="printing-notes">Additional notes</Label>
              <Textarea id="printing-notes" value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} placeholder="Anything else we should know?" className="min-h-20 resize-none" />
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full bg-zinc-950 font-bold text-white hover:bg-yellow-400 hover:text-black">
              {isSubmitting ? 'Sending request...' : 'Send Quote Request'}
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
