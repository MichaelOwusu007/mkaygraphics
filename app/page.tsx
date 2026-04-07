'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/headers/Footer';
import {
  ArrowRight,
  Star,
  Sparkles,
  Clock,
  Shield,
  Palette,
  Scissors,
  Printer,
  PenTool,
  Megaphone,
  Zap,
  Gift,
  Percent,
  ChevronRight,
  Frame,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Upload,
  PackageCheck,
} from 'lucide-react';
import { mockProducts, editingServices, testimonials } from '@/lib/mockData';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 4);

  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          service: 'General Inquiry',
        }),
      });
      if (res.ok) {
        toast.success('Message sent! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', phone: '', message: '' });
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    {
      icon: Scissors,
      title: 'Photo Editing',
      description: 'Professional retouching from basic corrections to advanced manipulation',
      href: '/services/editing',
      color: 'from-amber-500 to-orange-600',
    },
    {
      icon: Printer,
      title: 'Printing Services',
      description: 'T-shirts, banners, cards, wedding items - all premium quality prints',
      href: '/services/printing',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: BookOpen,
      title: 'Photobooks',
      description: 'Beautiful wedding, graduation & memory photobooks - Ghana style',
      href: '/services/photobook',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: PenTool,
      title: 'Graphic Design',
      description: 'Stunning visuals for branding, marketing, and digital media',
      href: '/services/design',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Frame,
      title: 'Custom Framing',
      description: 'Handcrafted frames for photos, art, and certificates',
      href: '/shop',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Megaphone,
      title: 'Brand Identity',
      description: 'Complete branding solutions including logos, palettes, and guidelines',
      href: '/services/design',
      color: 'from-rose-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      
       <section
      className="relative h-[600px] flex items-center justify-center text-center px-4 sm:px-8"
      aria-label="Photo editing and custom framing hero section"
    >
      {/* ✅ Background Image */}
      <Image
        src="/images/hero_image.jpg"
        alt="Beautiful photo frames and editing workspace"
        fill
        priority
        className="object-cover object-center brightness-75 "
        sizes="100vw"
      />

          {/* ✅ Enhanced Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* ✅ Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-white space-y-5">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Edit Your Photos, Frame Your Memories &amp; Design Your Ideas.
        </h1>

        <p className="text-base md:text-lg text-gray-200 max-w-2xl mx-auto">
          Premium handcrafted frames, photo editing, and design services all in one place. We frame, edit, and design it best for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="bg-yellow-600 hover:bg-yellow-600 text-white flex items-center justify-center"
            asChild
          >
            <Link href="/shop">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className=" text-white bg-black"
            asChild
          >
            <Link href="/services/editing">Photo Editing</Link>
          </Button>
        </div>
      </div>
    </section>

      {/* Special Offer Banner */}
      <section className="relative overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black py-4">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,#FFD700_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Mobile-first stacked layout */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            {/* Left - Promo Badge */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Gift className="h-6 w-6 md:h-8 md:w-8 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Percent className="h-2 w-2 md:h-3 md:w-3 text-white" />
                </div>
              </div>
              <div>
                <p className="text-yellow-400 font-bold text-sm md:text-lg">Limited Offer!</p>
                <p className="text-gray-300 text-xs md:text-sm hidden sm:block">Get 15% off your first order</p>
              </div>
            </div>

            {/* Center - Countdown */}
            <div className="flex items-center gap-1 md:gap-3 text-center">
              <span className="text-white font-medium mr-1 md:mr-2 text-xs md:text-sm hidden sm:block">Ends:</span>
              {[
                { value: timeLeft.days, label: 'D' },
                { value: timeLeft.hours, label: 'H' },
                { value: timeLeft.minutes, label: 'M' },
                { value: timeLeft.seconds, label: 'S' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-md md:rounded-lg px-2 md:px-3 py-1 md:py-2 min-w-[36px] md:min-w-[50px]">
                    <span className="text-lg md:text-2xl font-bold text-white tabular-nums">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Right - Promo Code & CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full sm:w-auto">
              <div className="relative">
                <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-bold px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl shadow-lg shadow-yellow-500/20 text-center">
                  <span className="text-xs md:text-sm mr-1 md:mr-2">Code:</span>
                  <span className="text-base md:text-xl tracking-wider font-extrabold">WELCOME15</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-yellow-300 rounded-full animate-ping hidden sm:block" />
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto px-4"
                asChild
              >
                <Link href="/shop">
                  Claim <ArrowRight className="ml-1 md:ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-black rounded-full">
              <Zap className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
              <span className="text-xs md:text-sm font-semibold text-white">What We Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight px-2">
              Complete Creative
              <span className="block bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                Solutions
              </span>
            </h2>
            <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto px-4">
              From capturing moments to framing memories, we provide end-to-end creative services 
              tailored to bring your vision to life.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group relative"
              >
                <Card className="relative overflow-hidden h-full transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 md:hover:-translate-y-2">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <CardContent className="relative z-10 p-5 md:p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-white/20 group-hover:to-white/10 flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                      <service.icon className="h-6 w-6 md:h-8 md:w-8 text-yellow-400 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Text */}
                    <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base group-hover:text-white/80 mb-4 md:mb-6 flex-grow transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-xs md:text-sm font-semibold group-hover:text-white transition-colors duration-300 mt-auto">
                      <span>Learn More</span>
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-10 md:mt-16">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 md:gap-4 bg-black text-white px-4 md:px-8 py-4 md:py-4 rounded-xl md:rounded-2xl">
              <div className="text-center sm:text-left">
                <p className="text-xs md:text-sm text-gray-400">Need a custom solution?</p>
                <p className="font-bold text-sm md:text-base">Contact us for a free consultation</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold whitespace-nowrap w-full sm:w-auto md:text-base md:px-6 md:py-3"
                asChild
              >
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-1 md:ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <Link href="/shop?category=frames">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-yellow-600 to-black flex items-center justify-center p-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center group-hover:scale-110 transition-transform">
                    Order a Frame
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop?category=custom">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-yellow-600 to-black flex items-center justify-center p-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center group-hover:scale-110 transition-transform">
                    Custom Frames
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop" className="sm:col-span-2 md:col-span-1">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center group-hover:scale-110 transition-transform">
                    View All
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className=" text-4xl md:text-5xl font-bold">
            Featured Collection
          </h2>
          <p className="text-gray-500 text-lg">
            Handpicked frames for every style
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>
                    <p className="font-semibold text-lg">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Editing Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-semibold text-white">
              Professional Photo Editing
            </span>
          </div>
          <h2 className=" text-4xl md:text-5xl font-bold">
            Transform Your Photos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From basic retouching to premium creative editing, our expert team
            brings your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editingServices.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-500 ${
                service.popular
                  ? 'border-2 border-yellow-500 shadow-lg'
                  : 'hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{service.turnaroundTime}</span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <span className="font-serif text-3xl font-bold">
                        ${service.price}
                      </span>
                    </div>
                    <Button className="w-full group" asChild>
                      <Link href={`/services/${service.id}`}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services/editing">
              View All Editing Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-3 md:px-4 py-1 text-xs md:text-sm">
              Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white px-2">
              How It
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"> Works</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
              Whether you need photo editing, custom framing, printing, or a beautiful photobook — 
              our process is seamless and stress-free.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                step: '01',
                icon: MessageSquare,
                title: 'Tell Us What You Need',
                description: 'Browse services, pick what fits, fill a booking form. We\'ll get back to you within hours.',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                icon: Upload,
                title: 'Share Your Content',
                description: 'Upload photos, designs, or files. Share specifications and preferences.',
                color: 'from-purple-500 to-pink-500',
              },
              {
                step: '03',
                icon: Sparkles,
                title: 'We Create Magic',
                description: 'Our expert team works on your project with precision and creativity.',
                color: 'from-yellow-500 to-amber-500',
              },
              {
                step: '04',
                icon: PackageCheck,
                title: 'Receive & Enjoy',
                description: 'Get your finished product delivered or download digital files.',
                color: 'from-emerald-500 to-green-500',
              },
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 h-full">
                  {/* Step number - positioned differently for mobile */}
                  <div className={`absolute top-3 right-3 md:top-0 md:right-0 md:relative w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl mb-3 md:mb-6 rotate-0 md:rotate-3 group-hover:rotate-0 md:group-hover:rotate-6 transition-transform duration-500`}>
                    <span className="text-base md:text-2xl font-bold text-white">{item.step}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>

                  <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base group-hover:text-gray-300 transition-colors">
                    {item.description}
                  </p>

                  {/* Connector line */}
                  {i < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-white/30 to-white/10" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-10 md:mt-16">
            <div className="inline-flex flex-col lg:flex-row items-center gap-3 md:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
              <p className="text-white font-medium text-sm md:text-base">Ready to get started?</p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold text-xs md:text-sm md:px-6 md:py-5"
                  asChild
                >
                  <Link href="/services/editing">Photo Editing</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xs md:text-sm md:px-6 md:py-5"
                  asChild
                >
                  <Link href="/services/printing">Printing</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xs md:text-sm md:px-6 md:py-5"
                  asChild
                >
                  <Link href="/services/photography">Photobooks</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className=" text-4xl md:text-5xl font-bold">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-lg">
            Trusted by hundrands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  {testimonial.avatar && (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-black mx-auto flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Premium Quality</h3>
              <p className="text-gray-500">
                Handcrafted frames and expert photo editing and design using finest
                materials and techniques
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-black mx-auto flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Expert Service</h3>
              <p className="text-gray-500">
                Professional consultation and unlimited revisions to ensure
                perfection
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-black mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Fast Delivery</h3>
              <p className="text-gray-500">
                Quick turnaround times and secure delivery to your door
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
            {/* Left - Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-yellow-500/20 rounded-full">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-yellow-400" />
                  <span className="text-xs md:text-sm font-semibold text-yellow-400">Get In Touch</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight px-2">
                  Let&apos;s Create
                  <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                    Something Amazing
                  </span>
                </h2>
                <p className="text-gray-400 text-sm md:text-lg max-w-lg px-2">
                  Whether you need custom framing, photo editing, or printing services, 
                  we&apos;re here to bring your vision to life.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 md:mb-4">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">Call Us</h3>
                  <p className="text-gray-400 text-xs md:text-sm">+233 XX XXX XXXX</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 md:mb-4">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">Email Us</h3>
                  <p className="text-gray-400 text-xs md:text-sm break-all">hello@mkaygraphix.com</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 md:mb-4">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">Visit Us</h3>
                  <p className="text-gray-400 text-xs md:text-sm">Cape Coast, Ghana</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-yellow-500/20 flex items-center justify-center mb-3 md:mb-4">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">Working Hours</h3>
                  <p className="text-gray-400 text-xs md:text-sm">Mon-Sat: 8AM - 6PM</p>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl mt-8 lg:mt-0">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Send us a Message</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-sm">Full Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="h-11 md:h-12 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-sm">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="h-11 md:h-12 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="text-sm">Phone Number</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+233 XX XXX XXXX"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="h-11 md:h-12 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="text-sm">Message</Label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell us about your project..."
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none text-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white h-11 md:h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="ml-1 md:ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      < Footer />
    </div>
  );
}
