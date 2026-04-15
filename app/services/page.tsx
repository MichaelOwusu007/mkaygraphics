import Link from "next/link";
import Image from "next/image";
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
  MessageCircle,
  Heart,
  Sparkles,
  Users,
  Award,
} from "lucide-react";

const services = [
  {
    id: "framing",
    title: "Custom Framing",
    tagline: "Perfect Frames for Your Precious Moments",
    description:
      "Transform your artwork, photos, and memories into stunning display pieces. From classic wooden frames to sleek modern designs, we offer over 50 styles to match every aesthetic.",
    icon: Frame,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    features: [
      "50+ frame styles",
      "Custom sizing",
      "UV-protective glass",
      "Professional matting",
      "Canvas stretching",
      "Shadow box frames",
    ],
    price: "Starting at GH₵ 50",
    image: "/images/portfolio1.jpg",
    href: "/shop",
  },
  {
    id: "editing",
    title: "Photo Editing",
    tagline: "Professional Photo Enhancement",
    description:
      "From color correction to complex restorations, our expert editors bring your photos to life. Perfect for wedding albums, family portraits, and archival restoration.",
    icon: Palette,
    color: "from-yellow-500 to-black",
    bgColor: "bg-purple-500/10",
    features: [
      "Color correction",
      "Background removal",
      "Old photo restoration",
      "Portrait retouching",
      "Photo enhancement",
      "24-48 hour turnaround",
    ],
    price: "Starting at GH₵ 20/photo",
    image: "/images/portfolio2.jpg",
    href: "/services/editing",
  },
  {
    id: "printing",
    title: "Printing Services",
    tagline: "Premium Prints for Every Occasion",
    description:
      "High-quality printing for wedding cards, t-shirts, banners, flyers, and more. We use premium materials to ensure vibrant colors and lasting durability.",
    icon: Printer,
    color: "from-yellow-500 to-black",
    bgColor: "bg-green-500/10",
    features: [
      "Wedding stationery",
      "Custom t-shirts",
      "Banners & signage",
      "Business cards",
      "Flyers & brochures",
      "Large format printing",
    ],
    price: "Varies by product",
    image: "/images/portfolio3.jpg",
    href: "/services/printing",
  },
  {
    id: "photobook",
    title: "Photobooks",
    tagline: "Beautiful Books of Your Memories",
    description:
      "Create stunning photobooks for weddings, graduations, family albums, and travel memories. Premium paper and professional layouts turn your photos into treasured heirlooms.",
    icon: BookOpen,
    color: "from-yellow-500 to-black",
    bgColor: "bg-blue-500/10",
    features: [
      "Wedding albums",
      "Graduation books",
      "Family albums",
      "Travel journals",
      "Premium paper quality",
      "Custom layouts",
    ],
    price: "Varies by product",
    image: "/images/portfolio4.jpg",
    href: "/services/photobook",
  },
  {
    id: "design",
    title: "Graphic Design",
    tagline: "Creative Solutions for Your Brand",
    description:
      "From brand identities to marketing materials, our design team creates visuals that captivate. We blend Ghanaian culture with modern design for unique, memorable brands.",
    icon: PenTool,
    color: "from-yellow-500 to-black",
    bgColor: "bg-orange-500/10",
    features: [
      "Logo design",
      "Brand identity",
      "Business cards",
      "Social media graphics",
      "Marketing materials",
      "Brand guidelines",
    ],
    price: "Starting at GH₵ 50",
    image: "/images/portfolio5.jpg",
    href: "/services/design",
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
                About MkayGraphix
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We Frame, Edit, and Design It{" "}
                <span className="text-yellow-500">Best</span> for You
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At MkayGraphix, we believe every photo tells a story, every frame preserves a memory, and every design carries meaning. Based in Accra and Capecoast, Ghana, we've been helping individuals and businesses bring their creative visions to life for years.
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

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Image Header */}
                  <div className="relative h-48 md:h-56 overflow-hidden ">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Icon Badge */}
                    <div
                      className={`absolute top-4 left-4 w-14 h-14 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">
                        {service.price}
                      </Badge>
                    </div>

                    {/* Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-200">{service.tagline}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className={`h-4 w-4 text-green-500 flex-shrink-0`} />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex gap-3">
                      <Button
                        asChild
                        className={`flex-1 bg-gradient-to-r ${service.color} border-0 text-white hover:opacity-90`}
                      >
                        <Link href={service.href}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <a
                        href="https://wa.me/233592515464"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              Why MkayGraphix
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just service providers — we're your creative partners dedicated to bringing your vision to life.
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
