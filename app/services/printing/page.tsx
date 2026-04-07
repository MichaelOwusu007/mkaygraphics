'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  Star,
  Printer,
  Shirt,
  Image as ImageIcon,
  Gift,
  Award,
  Heart,
  Palette,
  Briefcase,
  PartyPopper,
} from 'lucide-react';
import { toast } from 'sonner';
import Footer from '@/components/headers/Footer';

interface PrintService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  image: string;
  features: string[];
  basePrice: string;
  category: string;
  popular?: boolean;
}

const printServices: PrintService[] = [
  {
    id: 'wedding-cards',
    title: 'Wedding Cards & Invitations',
    description: 'Elegant wedding invitations, save-the-dates, and ceremony programs crafted with premium materials.',
    icon: Heart,
    image: '/images/wedding-card.jpg',
    features: ['Premium cardstock', 'Custom designs', 'Full color printing', 'Matching envelopes', 'RSVP cards included'],
    basePrice: 'GH₵ 15',
    category: 'Wedding',
    popular: true,
  },
  {
    id: 'branded-shirts',
    title: 'Custom Branded T-Shirts',
    description: 'High quality printed T-shirts for events, corporate branding, or personal use.',
    icon: Shirt,
    image: '/images/custom-shirt.jpg',
    features: ['Quality cotton fabric', 'Screen printing', 'Full color options', 'Custom sizes', 'Bulk discounts available'],
    basePrice: 'GH₵ 80',
    category: 'Apparel',
  },
  {
    id: 'rollup-banners',
    title: 'Roll-Up Banners',
    description: 'Professional retractable banners for events, trade shows, and promotional displays.',
    icon: ImageIcon,
    image: '/images/rollup-banner.jpg',
    features: ['Weather-resistant vinyl', 'Chrome stand included', 'High-resolution print', 'Multiple sizes', 'Easy setup'],
    basePrice: 'GH₵ 250',
    category: 'Signage',
    popular: true,
  },
  {
    id: 'business-cards',
    title: 'Business Cards',
    description: 'Premium business cards that make a lasting impression.',
    icon: Briefcase,
    image: '/images/business-card.jpg',
    features: ['Premium cardstock', 'Matte or glossy finish', 'Full color', 'Standard or custom size', 'Rounded corners option'],
    basePrice: 'GH₵ 50',
    category: 'Business',
  },
  {
    id: 'flyers',
    title: 'Flyers & Brochures',
    description: 'Eye-catching promotional flyers and informative brochures.',
    icon: Palette,
    image: '/images/flyer.jpg',
    features: ['Various paper weights', 'Single or double-sided', 'Full color', 'Bulk pricing', 'Custom sizes available'],
    basePrice: 'GH₵ 2',
    category: 'Marketing',
  },
  {
    id: 'event-signage',
    title: 'Event Signage & Posters',
    description: 'Large format posters and event signage for maximum visibility.',
    icon: PartyPopper,
    image: '/images/event-poster.jpg',
    features: ['Large format printing', 'Weatherproof options', 'Custom sizing', 'High quality resolution', 'Quick turnaround'],
    basePrice: 'GH₵ 120',
    category: 'Events',
  },
  {
    id: 'gift-items',
    title: 'Custom Gift Items',
    description: 'Personalized mugs, keychains, and other gift items with your designs.',
    icon: Gift,
    image: '/images/custom-gift.jpg',
    features: ['Photo printing', 'Custom text', 'Premium quality', 'Gift packaging', 'Bulk orders welcome'],
    basePrice: 'GH₵ 45',
    category: 'Gifts',
  },
  {
    id: 'certificates',
    title: 'Certificates & Awards',
    description: 'Professional certificates, awards, and commemorative documents.',
    icon: Award,
    image: '/images/certificate.jpg',
    features: ['Premium parchment', 'Gold/silver foil options', 'Custom design', 'Various sizes', 'Elegant presentation'],
    basePrice: 'GH₵ 35',
    category: 'Professional',
  },
  {
    id: 'photo-prints',
    title: 'Photo Prints & Canvas',
    description: 'High-quality photo prints and gallery-wrapped canvas prints.',
    icon: ImageIcon,
    image: '/images/photo-print.jpg',
    features: ['Lab-quality printing', 'Multiple sizes', 'Matte or glossy', 'Canvas stretching', 'Framing options'],
    basePrice: 'GH₵ 25',
    category: 'Photography',
  },
];

const categories = ['All', 'Wedding', 'Apparel', 'Signage', 'Business', 'Marketing', 'Events', 'Gifts', 'Professional', 'Photography'];

export default function PrintingPage() {
  const [selectedService, setSelectedService] = useState<PrintService | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    quantity: '',
    description: '',
    deliveryDate: '',
    address: '',
    message: '',
  });

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({
        ...prev,
        service: selectedService.title,
      }));
    }
  }, [selectedService]);

  const filteredServices = selectedCategory === 'All'
    ? printServices
    : printServices.filter((s) => s.category === selectedCategory);

  const handleBookService = (service: PrintService) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/email/printing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: 'Printing Services',
        }),
      });

      if (res.ok) {
        toast.success('Booking submitted! We\'ll contact you shortly.');
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          quantity: '',
          description: '',
          deliveryDate: '',
          address: '',
          message: '',
        });
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header
        className="relative min-h-[450px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/images/banner.img3.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-amber-500/10 animate-pulse" />
        
        <div className="relative z-10 px-4 max-w-5xl mx-auto">
          <Badge className="mb-4 md:mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 md:px-4 py-1 text-xs md:text-sm">
            <Printer className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Premium Printing Services
          </Badge>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Print Your
            <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Dreams Into Reality
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            From stunning wedding cards to custom apparel, banners, and more. 
            High quality prints tailored for Ghanaian celebrations and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-6 md:px-8 h-11 md:h-14 text-sm md:text-lg shadow-lg shadow-yellow-500/30"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
              <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-black px-6 md:px-8 h-11 md:h-14 text-sm md:text-lg"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-white to-transparent" />
      </header>

      {/* Stats Section */}
      <section className="bg-gray-900 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { number: '5000+', label: 'Projects' },
              { number: '100%', label: 'Satisfaction' },
              { number: '24hr', label: 'Fast Turnaround' },
              { number: '500+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1 md:space-y-2">
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 md:mb-4 bg-black text-white px-3 md:px-4 py-1 text-xs md:text-sm">Our Services</Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
              Everything You Need,
              <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent"> Printed Perfectly</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base px-4">
              Browse our comprehensive range of printing services designed for Ghanaian events, 
              businesses, and personal celebrations.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-12 px-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-2 md:px-4 text-xs md:text-sm ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Services Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2"
              >
                {service.popular && (
                  <div className="absolute top-3 right-3 md:top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-black text-xs">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="relative h-36 md:h-48 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
                    <service.icon className="h-14 w-14 md:h-20 md:w-20 text-yellow-400/50 group-hover:scale-110 group-hover:text-yellow-400 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                      <Badge variant="outline" className="border-yellow-400/50 text-yellow-400 text-xs">
                        {service.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                    <h3 className="text-base md:text-xl font-bold group-hover:text-yellow-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm line-clamp-2">{service.description}</p>

                    <ul className="space-y-1.5 md:space-y-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 md:pt-4 border-t">
                      <div>
                        <span className="text-xs md:text-sm text-gray-400">From</span>
                        <p className="text-lg md:text-2xl font-bold text-gray-900">{service.basePrice}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleBookService(service)}
                        className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white w-full sm:w-auto text-xs md:text-sm"
                      >
                        Book Now
                        <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30 text-xs md:text-sm">Why Choose Us</Badge>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                  Quality Prints,
                  <span className="block text-gray-400">Delivered Right</span>
                </h2>
              </div>
              <div className="space-y-4 md:space-y-6">
                {[
                  { title: 'Premium Materials', desc: 'High quality papers, inks, and materials that ensure your prints last.', icon: Award },
                  { title: 'Quick Turnaround', desc: 'Same-day and next-day printing for urgent orders.', icon: Clock },
                  { title: 'Custom Designs', desc: 'Our team can help design your prints or work with your artwork.', icon: Palette },
                  { title: 'Nationwide Delivery', desc: 'We deliver to all regions in Ghana, safely packaged and on time.', icon: MapPin },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-500 transition-colors">
                      <item.icon className="h-5 w-5 md:h-7 md:w-7 text-yellow-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm md:text-base">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl md:rounded-3xl p-5 md:p-8 text-white space-y-4 md:space-y-6">
                <h3 className="text-xl md:text-2xl font-bold">Contact Us Today</h3>
                <p className="text-gray-300 text-sm md:text-base">
                  Ready to start your print project? Get in touch and let&apos;s make something amazing together.
                </p>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <span className="text-sm md:text-base">+233 XX XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <span className="text-sm md:text-base break-all">prints@mkaygraphix.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    <span className="text-sm md:text-base">Cape Coast, Ghana</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold h-11 md:h-12"
                  onClick={() => handleBookService(printServices[0])}
                >
                  Get a Free Quote
                  <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Sidebar */}
      <Sheet open={showForm} onOpenChange={setShowForm}>
        <SheetContent side="left" className="w-full sm:max-w-lg overflow-y-auto p-4 md:p-6">
          <SheetHeader className="space-y-3 md:space-y-4 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Printer className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
              </div>
              <div>
                <SheetTitle className="text-base md:text-lg">Book Service</SheetTitle>
                <SheetDescription className="text-xs md:text-sm">
                  {selectedService?.title}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-10 md:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+233 XX XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="h-10 md:h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-10 md:h-11 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm">Service</Label>
                <Input
                  id="service"
                  value={formData.service}
                  readOnly
                  className="h-10 md:h-11 text-sm bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                  min="1"
                  className="h-10 md:h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery" className="text-sm">Delivery Date</Label>
              <Input
                id="delivery"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="h-10 md:h-11 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm">Design Description *</Label>
              <textarea
                id="description"
                placeholder="Describe your design requirements..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Full delivery address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-10 md:h-11 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">Additional Notes</Label>
              <textarea
                id="message"
                placeholder="Any special instructions..."
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
              />
            </div>

            <div className="pt-2 md:pt-4 space-y-2 md:space-y-3">
              <Button
                type="submit"
                size="sm"
                className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 h-10 md:h-12 text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    Submit Booking
                    <Send className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-gray-500">
                We&apos;ll contact you within 24 hours to confirm your order.
              </p>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
}
