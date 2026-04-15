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
  Check,
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

const openPositions = [
  {
    title: "Graphic Designer",
    department: "Creative",
    location: "Remote",
    type: "Part-time",
    description: "Create stunning visual designs for clients across various industries.",
    requirements: [
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio showcasing design skills",
      "Understanding of brand identity principles",
      "Ability to work under tight deadlines",
    ],
  },
  {
    title: "Photo Editor",
    department: "Creative",
    location: "Remote",
    type: "Part-time",
    description: "Edit and enhance photos to create stunning visual content for our clients.",
    requirements: [
      "Expert knowledge in photo editing software",
      "Experience with color correction and retouching",
      "Attention to detail and quality",
      "Fast turnaround for client deliverables",
    ],
  },
  {
    title: "Customer Service Representative",
    department: "Operations",
    location: "Remote",
    type: "Part-time",
    description: "Be the friendly face of MkayGraphix, helping customers with their needs.",
    requirements: [
      "Excellent communication skills",
      "Problem-solving abilities",
      "Patience and professionalism",
      "Basic computer proficiency",
    ],
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
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
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
              Join Our Growing Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're always looking for talented, passionate individuals to join our creative family. Check out our current openings below.
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium">
                          {position.department}
                        </span>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                          {position.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 border-0">
                      <Link href="/contact">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">{position.description}</p>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {position.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't See a Role? */}
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
