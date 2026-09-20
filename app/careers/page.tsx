import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Zap,
  Globe,
  Clock,
  Award,
  Briefcase,
  Gift,
  Coffee,
  ArrowRight,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const benefits = [

  {
    icon: Gift,
    title: "Creative Freedom",
    description: "Express your creativity and bring innovative ideas to life.",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Work-life balance with flexible scheduling options.",
  },
  {
    icon: Zap,
    title: "Growth Opportunities",
    description: "Clear career paths and professional development programs.",
  },
 

];

const values = [
  {
    icon: Users,
    title: "Team Spirit",
    description: "We collaborate, support each other, and celebrate wins together.",
  },
  {
    icon: Heart,
    title: "Passion for Quality",
    description: "We take pride in delivering exceptional work to every client.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We embrace new ideas and continuously improve our craft.",
  },
  {
    icon: Globe,
    title: "Customer Focus",
    description: "Our clients are at the heart of everything we do.",
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/images/careersbanner.jpg"
          alt="Join Our Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              Join Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Build Your Creative Career at{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                MkayGraphix
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Join a team of passionate creatives dedicated to bringing visions to life. Shape your career while helping others preserve their precious moments.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
              Why Join Us
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MkayGraphix?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a workplace. We're a creative family that values innovation, quality, and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                Our Culture
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The MkayGraphix <span className="text-yellow-500">Way</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At MkayGraphix, we believe great work comes from happy, motivated team members. Our culture is built on collaboration, creativity, and a shared commitment to excellence.
              </p>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 md:p-12">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">5</div>
                    <p className="text-sm text-gray-600">Team Members</p>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">5+</div>
                    <p className="text-sm text-gray-600">Years in Business</p>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">100+</div>
                    <p className="text-sm text-gray-600">Happy Clients</p>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-bold text-yellow-500 mb-2">4.9</div>
                    <p className="text-sm text-gray-600">Star Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              Open Positions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Current Openings
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore roles with our creative team below.
            </p>
          </div>

          {/* Empty State */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-dashed border-gray-300 overflow-hidden">
              <div className="p-10 md:p-14 text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-yellow-100 rounded-3xl rotate-6" />
                  <div className="absolute inset-0 bg-amber-100 rounded-3xl -rotate-6" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="h-10 w-10 text-yellow-500" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  No Open Positions Right Now
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We're not hiring at the moment, but we're always excited to meet talented, passionate creatives. Drop us a message and introduce yourself.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black border-0"
                  >
                    <Link href="/contact">
                      Send Your CV
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <a
                    href="https://wa.me/233592515464?text=Hi!%20I'm%20interested%20in%20career%20opportunities%20at%20MkayGraphix."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Us
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-8">
                  We'll reach out when a suitable role opens up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Don't See a Role? */}
      {/* Commented out - not hiring at the moment
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See the Perfect Role?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            We're always interested in meeting talented people. Send us your CV and tell us how you'd like to contribute to MkayGraphix.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black border-0"
            >
              <Link href="/contact">
                Send Your CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <a
              href="https://wa.me/233592515464?text=Hi!%20I'm%20interested%20in%20career%20opportunities%20at%20MkayGraphix."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
      */}

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Have Questions?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="tel:+233592515464"
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">+233 592 515 464</p>
              </a>
              <a
                href="mailto:mkaygraphix@gmail.com"
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Mail className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Email</h3>
                <p className="text-sm text-gray-600">mkaygraphix@gmail.com</p>
              </a>
              <a
                href="https://maps.google.com/?q=East+Legon,+Accra,+Ghana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <MapPin className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Visit</h3>
                <p className="text-sm text-gray-600">East Legon, Accra</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
