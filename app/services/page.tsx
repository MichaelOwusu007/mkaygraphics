import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from '@/components/ui/card';
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Frame,
  Palette,
  Printer,
  BookOpen,
  PenTool,
  ArrowRight,
  Check,
  Star,
  Zap,
  Scissors,
  Camera,
  ChevronRight,
  MessageCircle,
  Heart,
  Sparkles,
  Users,
  Award,
} from "lucide-react";

  const services = [
    {
      icon: Scissors,
      title: 'Photo Editing',
      description: 'Professional retouching from basic corrections to advanced manipulation',
      href: '/services/editing',
      color: 'from-red-600 to-rose-800',
    },
    {
      icon: Printer,
      title: 'Printing Services',
      description: 'T-shirts, banners, cards, wedding items - all premium quality prints',
      href: '/services/printing',
      color: 'from-yellow-500 to-amber-700',
    },
    {
      icon: BookOpen,
      title: 'Photobooks',
      description: 'Beautiful wedding, graduation & memory photobooks - Ghana style',
      href: '/services/photobook',
      color: 'from-green-600 to-emerald-800',
    },
    {
      icon: PenTool,
      title: 'Graphic Design',
      description: 'Stunning visuals for branding, marketing, and digital media',
      href: '/services/design',
      color: 'from-red-600 to-rose-800',
    },
    {
      icon: Frame,
      title: 'Custom Framing',
      description: 'Handcrafted frames for photos, art, and certificates',
      href: '/shop',
      color: 'from-yellow-500 to-amber-600',
    },
    {
      icon: Camera,
      title: 'Photography',
      description: 'Portraits, events, products, and brand stories, captured with intention',
      href: '/services/photography',
      color: 'from-green-600 to-emerald-800',
    },
  ];

const whyChooseUs = [
  {
    title: "Ghana-Based Team",
    description: "We understand local culture and deliver personalized service",
  },
  {
    title: "Quick Turnaround",
    description: "Most orders completed within 48-72 hours",
  },
  {
    title: "Premium Quality",
    description: "We use only high-grade materials and professional equipment",
  },
  {
    title: "Nationwide Delivery",
    description: "We ship to all regions in Ghana",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/servicesbanner.jpg"
          alt="Our Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Premium Creative Services for{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Ghana
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              From custom frames to stunning photobooks, we offer comprehensive creative services to preserve your precious moments and elevate your brand.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                About MkayGraphics
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Frame, Edit, and Design It{" "}
                <span className="text-yellow-500">Best</span> for You
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At MkayGraphics, we believe every photo tells a story, every frame preserves a memory, and every design carries meaning. Based in Accra and Capecoast, Ghana, we've been helping individuals and businesses bring their creative visions to life for years.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                From custom frames that showcase your precious artwork to stunning photobooks that preserve your most cherished moments, we combine craftsmanship with modern technology to deliver results that exceed expectations.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Made with Love</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>100+ Happy Clients</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">5+</div>
                    <p className="text-sm text-gray-600">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">50+</div>
                    <p className="text-sm text-gray-600">Frame Styles</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">100+</div>
                    <p className="text-sm text-gray-600">Projects Done</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-yellow-500 mb-2">100%</div>
                    <p className="text-sm text-gray-600">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              What We Offer
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Creative Solutions
            </h2>
            <p className="text-gray-600">
              Whether you're looking to frame a masterpiece, edit your wedding photos, create custom prints, or build a memorable brand, we have the expertise and passion to make it happen. Our services are designed to meet the diverse needs of Ghanaians across all walks of life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Frame,
                title: "Memories Preserved",
                description: "We transform your precious photos into timeless framed artwork that decorates your home and touches your heart.",
              },
              {
                icon: Palette,
                title: "Photos Enhanced",
                description: "Professional editing brings out the best in your photos, correcting colors, removing distractions, and restoring old memories.",
              },
              {
                icon: Printer,
                title: "Ideas Printed",
                description: "From wedding invitations to business cards, we deliver high-quality prints that make lasting impressions.",
              },
              {
                icon: BookOpen,
                title: "Stories Bound",
                description: "Photobooks that tell your story beautifully, perfect for weddings, graduations, and family albums.",
              },
              {
                icon: PenTool,
                title: "Brands Built",
                description: "Creative design solutions that help businesses stand out and connect with their audience.",
              },
              {
                icon: Award,
                title: "Excellence Delivered",
                description: "Every project receives our full attention and commitment to quality, no matter the size.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
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

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              Why MkayGraphics
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re not just service providers. We&apos;re your creative partners dedicated to bringing your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple 4-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Contact Us",
                description:
                  "Reach out via WhatsApp, email, or our contact form with your requirements.",
              },
              {
                step: "02",
                title: "Get a Quote",
                description:
                  "We'll provide a detailed quote based on your specifications.",
              },
              {
                step: "03",
                title: "We Create",
                description:
                  "Our team works on your project with attention to every detail.",
              },
              {
                step: "04",
                title: "Receive & Enjoy",
                description:
                  "Get your finished product delivered or pick up in person.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contact us today for a free consultation and quote. We're here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-8"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
            <a
              href="https://wa.me/233592515464"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
