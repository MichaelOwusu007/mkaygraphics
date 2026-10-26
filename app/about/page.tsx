import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Frame,
  Sparkles,
  Users,
  Award,
  Heart,
  Target,
  Eye,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Check,
  Star,
} from "lucide-react";

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "100+", label: "Happy Clients" },
  { number: "200+", label: "Projects Done" },
  { number: "30+", label: "Frame Styles" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "We pour our heart into every project, ensuring each creation is nothing short of exceptional.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Your vision is our priority. We listen, understand, and deliver beyond expectations.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "Premium materials and attention to detail ensure lasting results you'll love.",
  },
  {
    icon: Star,
    title: "Innovation & Creativity",
    description: "We blend traditional craftsmanship with modern techniques for unique results.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Started as a small framing business in Accra with a passion for preserving memories.",
  },
  {
    year: "2021",
    title: "Expanding Horizons",
    description: "Added photo editing and design services to meet growing client needs.",
  },
  {
    year: "2023",
    title: "Growing Team",
    description: "Welcomed a few more creatives to serve more clients across Ghana remotely.",
  },
  {
    year: "2025",
    title: "Full-Service digital Studio",
    description: "Now offering comprehensive creative services including photobooks and brand design.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src="/images/banner.img1.jpg"
          alt="About MkayGraphics"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="container mx-auto px-4 -mt-8  relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              About MkayGraphics
            </Badge>
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              We Frame, Edit & Design{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                It Best
              </span>{" "}
              for You
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Your photography and creative studio for custom framing, photo editing, photobooks, and graphic design services in Ghana.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                Our Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From a Small Dream to{" "}
                <span className="text-yellow-500">Ghana's Creative Partner</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with passion by <span className="font-bold text-gray-900">Michael Nana Yaw Owusu Wiafe</span>, MkayGraphics began as a small framing business with a big dream: to help Ghanaians preserve their precious memories in beautiful, lasting ways.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                What started in 2020 as a one man operation has grown into a comprehensive creative studio. Today, we offer custom framing, professional photo editing, stunning photobooks, and graphic design, with professional photography coming soon for individuals and businesses across Ghana.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team of skilled craftsmen and digital artists share a common goal: transforming your vision into reality. Whether it's a cherished family photo that needs framing, wedding photos awaiting enhancement, or a brand seeking its identity, we're here to make it happen.
              </p>
              <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 border-0">
                <Link href="/contact">
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <Frame className="h-32 w-32 text-yellow-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">MkayGraphics</h3>
                  <p className="text-gray-600">Since 2019</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional creative services that help Ghanaians preserve their precious memories and build memorable brands. We commit to quality, innovation, and customer satisfaction in every project we undertake.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become Ghana's most trusted creative partner for framing, photo services, and design. We envision a future where every home has a MkayGraphics creation and every business has a brand that stands out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              What Drives Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from the smallest frame to the largest design project.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Milestones</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to where we are today
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-yellow-500/30 transform md:-translate-x-1/2" />
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1 md:w-1/2" />
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-yellow-500 transform md:-translate-x-1/2 -translate-y-1" />
                    <div className="flex-1 md:w-1/2 pl-12 md:pl-0">
                      <div className={`bg-gray-800 rounded-xl p-6 ${index % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}>
                        <span className="text-yellow-500 font-bold text-lg">{item.year}</span>
                        <h3 className="font-bold text-xl mt-1 mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              What We Do
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Services We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Frame,
                title: "Custom Framing",
                description: "50+ styles from classic to modern",
                href: "/shop",
              },
              {
                icon: Sparkles,
                title: "Photo Editing",
                description: "Professional enhancement & restoration",
                href: "/services/editing",
              },
              {
                icon: Users,
                title: "Photobooks",
                description: "Beautiful albums for any occasion",
                href: "/services/photobook",
              },
              {
                icon: Award,
                title: "Graphic Design",
                description: "Brand identity & creative design",
                href: "/services/design",
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:bg-yellow-500 transition-colors">
                  <service.icon className="h-7 w-7 text-yellow-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold mb-2 group-hover:text-yellow-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <span className="text-sm text-yellow-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Whether you need a single frame or a complete brand identity, we're here to help bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-8"
            >
              <Link href="/contact">
                Get in Touch
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
