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
  MapPin,
  Send,
  Star,
  BookOpen,
  Heart,
  Gift,
  Camera,
  Users,
  Sparkles,
  Trophy,
  Award,
  HeartHandshake,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import Footer from '@/components/headers/Footer';

interface PhotobookType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  basePrice: string;
  popular?: boolean;
  badge?: string;
}

const photobookTypes: PhotobookType[] = [
  {
    id: 'wedding',
    title: 'Wedding Photobook',
    description: 'Capture every magical moment from your special day in a stunning wedding album.',
    icon: Heart,
    features: ['Premium leather cover', '50-200 pages', 'Full-page photos', 'Chapter dividers', 'Gift box included'],
    basePrice: 'GH₵ 450',
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'engagement',
    title: 'Engagement Album',
    description: 'Celebrate your love story from the moment it began.',
    icon: HeartHandshake,
    features: ['Elegant softcover', '30-80 pages', 'Story layout design', 'Custom captions', 'Engraved cover'],
    basePrice: 'GH₵ 280',
  },
  {
    id: 'graduation',
    title: 'Graduation Album',
    description: 'Honor your academic achievement with a beautiful graduation memory book.',
    icon: Trophy,
    features: ['Academic-themed cover', '40-100 pages', 'Achievement highlights', 'Certificate copy', 'Family photos section'],
    basePrice: 'GH₵ 320',
  },
  {
    id: 'birthday',
    title: 'Birthday Celebration',
    description: 'Preserve the joy and fun of birthday celebrations for years to come.',
    icon: Gift,
    features: ['Colorful designs', '20-60 pages', 'Theme customization', 'Guest messages section', 'Quick turnaround'],
    basePrice: 'GH₵ 180',
  },
  {
    id: 'family',
    title: 'Family Heritage Book',
    description: 'Document your family history and create a legacy for generations.',
    icon: Users,
    features: ['A4 hardcover', '100+ pages', 'Timeline layout', 'Genealogy pages', 'Archive quality paper'],
    basePrice: 'GH₵ 550',
  },
  {
    id: 'travel',
    title: 'Travel & Vacation',
    description: 'Relive your adventures with a stunning travel photobook.',
    icon: MapPin,
    features: ['Lightweight design', '30-100 pages', 'Map integrations', 'Location highlights', 'Souvenir collection pages'],
    basePrice: 'GH₵ 250',
  },
  {
    id: 'baby',
    title: 'Baby & Maternity',
    description: 'Cherish every precious moment from pregnancy to first steps.',
    icon: Sparkles,
    features: ['Soft pastel themes', '40-80 pages', 'Monthly milestones', 'Ultrasound keepsake', 'Personalized cover'],
    basePrice: 'GH₵ 300',
    badge: 'New',
  },
  {
    id: 'memorial',
    title: 'Memorial Tribute',
    description: 'A beautiful way to honor and remember loved ones.',
    icon: Award,
    features: ['Elegant memorial design', 'Custom tribute pages', 'Premium paper', 'Conservation quality', 'Professional design included'],
    basePrice: 'GH₵ 400',
  },
];

const whyPhotobooks = [
  {
    icon: Heart,
    title: 'Preserve Precious Memories',
    description: 'Transform thousands of digital photos into a tangible keepsake that lasts generations. Unlike phones that get lost or broken, a photobook remains a beautiful reminder of life\'s most treasured moments.',
  },
  {
    icon: Camera,
    title: 'Tell Your Unique Story',
    description: 'Every page is carefully designed to flow like a narrative, taking you on a journey through your special day or milestone. It\'s not just photos—it\'s your story beautifully told.',
  },
  {
    icon: Gift,
    title: 'Perfect Gift for Loved Ones',
    description: 'A personalized photobook makes an unforgettable gift for weddings, anniversaries, graduations, or any special occasion. Show your loved ones how much they mean to you.',
  },
  {
    icon: Trophy,
    title: 'Professional Quality',
    description: 'We use premium materials—luxury covers, archival paper, and vibrant printing—that ensure your photos look stunning and last a lifetime without fading.',
  },
];

const ghanaTraditions = [
  'Traditional kente cloth photo sessions',
  'Naming ceremonies and infancy milestones',
  'Outdooring celebrations',
  'Matrimonial rites and ceremonies',
  'Funeral tributes and memorial services',
  'Graduation and academic achievements',
  'Family reunions and gatherings',
  'Traditional naming ceremonies',
];

export default function PhotobookPage() {
  const [selectedType, setSelectedType] = useState<PhotobookType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photobookType: '',
    pages: '',
    coverStyle: '',
    eventDate: '',
    specialRequests: '',
    deliveryAddress: '',
    message: '',
  });

  useEffect(() => {
    if (selectedType) {
      setFormData((prev) => ({
        ...prev,
        photobookType: selectedType.title,
      }));
    }
  }, [selectedType]);

  const handleBookPhotobook = (type: PhotobookType) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/email/photobook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: 'Photobook Service',
        }),
      });

      if (res.ok) {
        toast.success('Photobook inquiry submitted! We\'ll contact you shortly.');
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          photobookType: '',
          pages: '',
          coverStyle: '',
          eventDate: '',
          specialRequests: '',
          deliveryAddress: '',
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
        className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(to bottom right, rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url('/images/banner.img1.jpg')",
          }}
        />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 md:px-6 py-1.5 md:py-2 text-xs md:text-sm">
              <BookOpen className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Premium Photobooks Made in Ghana
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight px-2">
              Turn Your Photos Into
              <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Timeless Treasures
              </span>
            </h1>
            
            <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
              Beautiful, handcrafted photobooks for weddings, graduations, families, and all of life&apos;s 
              most precious moments. Designed with love, delivered with care across Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 px-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-6 md:px-10 h-11 md:h-14 text-sm md:text-lg shadow-xl shadow-yellow-500/30"
                onClick={() => document.getElementById('photobook-types')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Create Your Photobook
                <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-white/30 text-black hover:bg-white/10 hover:border-white/50 px-6 md:px-10 h-11 md:h-14 text-sm md:text-lg backdrop-blur-sm"
                asChild
              >
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-6 md:pt-8 text-gray-400 text-xs md:text-sm">
              <div className="flex items-center gap-1.5 md:gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>Ghana-Wide Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>Custom Designs</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <Check className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-white to-transparent" />
      </header>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-6 md:py-8 -mt-10 md:-mt-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { number: '100+', label: 'Photobooks' },
                { number: '50+', label: 'Happy Couples' },
                { number: '50+', label: 'Grad Albums' },
                { number: '5-Star', label: 'Rating' },
              ].map((stat, i) => (
                <div key={i} className="space-y-0.5 md:space-y-1">
                  <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Photobooks Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <Badge className="bg-black text-white px-3 md:px-4 py-1 text-xs md:text-sm">Why Choose Photobooks</Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold px-2">
              More Than Just Photos—
              <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent"> A Legacy</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg px-4">
              In Ghana, we celebrate life&apos;s moments with family and community. A photobook captures 
              these celebrations in a way that can be passed down for generations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {whyPhotobooks.map((item, i) => (
              <Card
                key={i}
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-5 md:p-8">
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center shrink-0 group-hover:from-yellow-500/30 group-hover:to-amber-500/30 transition-colors">
                      <item.icon className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-base md:text-xl font-bold group-hover:text-yellow-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ghana Traditions Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs md:text-sm">Proudly Ghanaian</Badge>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                  Celebrate Our
                  <span className="block text-yellow-400">Cultural Moments</span>
                </h2>
                <p className="text-gray-400 text-sm md:text-lg">
                  Ghana is rich in tradition and celebration. From traditional weddings to naming ceremonies, 
                  we understand what matters most to Ghanaian families.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {ghanaTraditions.map((tradition, i) => (
                  <div key={i} className="flex items-start gap-2 md:gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span className="text-gray-300 text-xs md:text-sm">{tradition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-yellow-500/30">
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2 md:gap-3">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                    What Makes Us Special
                  </h3>
                  <ul className="space-y-3 md:space-y-4">
                    {[
                      'Understanding of Ghanaian traditions and ceremonies',
                      'Local delivery across all 16 regions',
                      'Quick turnaround for last-minute events',
                      'Personal consultations available',
                      'Multiple payment options including Mobile Money',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                        </div>
                        <span className="text-gray-300 text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold h-11 md:h-12"
                    onClick={() => handleBookPhotobook(photobookTypes[0])}
                  >
                    Start Your Album Today
                    <ArrowRight className="ml-1 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photobook Types Section */}
      <section id="photobook-types" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <Badge className="bg-black text-white px-3 md:px-4 py-1 text-xs md:text-sm">Our Photobooks</Badge>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold px-2">
              Find Your Perfect
              <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent"> Photobook</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg px-4">
              From grand wedding albums to intimate family collections, we have the perfect 
              photobook for every occasion and milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {photobookTypes.map((type) => (
              <div key={type.id} className="group relative">
                <Card
                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 h-full"
                >
                  {type.badge && (
                    <div className="absolute top-3 md:top-4 right-4 z-10">
                      <Badge className={type.badge === 'Most Popular' ? 'bg-yellow-500 text-black text-xs' : 'bg-green-500 text-white text-xs'}>
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 mr-0.5 md:mr-1" />
                        {type.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center mb-4 md:mb-5 group-hover:from-yellow-500/30 group-hover:to-amber-500/30 transition-colors">
                      <type.icon className="h-6 w-6 md:h-7 md:w-7 text-yellow-600" />
                    </div>
                    
                    <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2 group-hover:text-yellow-700 transition-colors">
                      {type.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                      {type.description}
                    </p>

                    <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-5 flex-1">
                      {type.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <Check className="w-3 h-3 md:w-4 md:h-4 text-green-500 shrink-0" />
                          <span className="truncate">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 md:pt-4 border-t space-y-3">
                      <div>
                        <span className="text-xs md:text-sm text-gray-400">From</span>
                        <p className="text-lg md:text-2xl font-bold text-gray-900">{type.basePrice}</p>
                      </div>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white text-xs md:text-sm"
                        onClick={() => handleBookPhotobook(type)}
                      >
                        Book Now
                        <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <a
                  href={`https://wa.me/233592515464?text=Hi, I'm interested in ${encodeURIComponent(type.title)} photobook`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-20 right-4 bg-green-500 hover:bg-green-600 text-white p-2.5 md:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl">
              <div className="flex justify-center gap-0.5 md:gap-1 mb-4 md:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-base md:text-xl lg:text-2xl text-gray-700 italic mb-6 md:mb-8 leading-relaxed px-2">
                &quot;The wedding photobook MkayGraphix created for us was absolutely stunning. 
                Our guests couldn&apos;t stop admiring it at the reception. It perfectly captured 
                every special moment of our traditional Ghanaian wedding.&quot;
              </p>
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-200 flex items-center justify-center">
                  <Users className="w-6 h-6 md:w-7 md:h-7 text-gray-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm md:text-base">Kwame & Akua A.</p>
                  <p className="text-gray-500 text-xs md:text-sm">Wedding Photobook - Cape Coast</p>
                </div>
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
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
              </div>
              <div>
                <SheetTitle className="text-base md:text-lg">Create Your Photobook</SheetTitle>
                <SheetDescription className="text-xs md:text-sm">
                  {selectedType?.title}
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
                <Label htmlFor="photobookType" className="text-sm">Photobook</Label>
                <Input
                  id="photobookType"
                  value={formData.photobookType}
                  readOnly
                  className="h-10 md:h-11 text-sm bg-gray-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pages" className="text-sm">Pages</Label>
                <Input
                  id="pages"
                  type="number"
                  placeholder="e.g., 50"
                  value={formData.pages}
                  onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                  min="20"
                  className="h-10 md:h-11 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="coverStyle" className="text-sm">Cover Style</Label>
                <Input
                  id="coverStyle"
                  placeholder="e.g., Leather"
                  value={formData.coverStyle}
                  onChange={(e) => setFormData({ ...formData, coverStyle: e.target.value })}
                  className="h-10 md:h-11 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate" className="text-sm">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="h-10 md:h-11 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-sm">Special Requests</Label>
              <textarea
                id="specialRequests"
                placeholder="Any specific themes, layouts, or requirements..."
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Full delivery address in Ghana"
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="h-10 md:h-11 text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm">Additional Notes</Label>
              <textarea
                id="message"
                placeholder="Any other information..."
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
                    Submit Inquiry
                    <Send className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center text-gray-500">
                We&apos;ll contact you within 24 hours to discuss your photobook.
              </p>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
}
