"use client";


import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Book,
  FileText,
  CreditCard,
  Truck,
  Package,
  Camera,
  Frame,
  Palette,
  Printer,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Clock,
  CheckCircle,
} from "lucide-react";

const faqCategories = [
  {
    category: "General",
    icon: HelpCircle,
    questions: [
      {
        q: "What services does MkayGraphics offer?",
        a: "We offer photography, custom framing, photo editing, printing services (wedding cards, t-shirts, banners), photobooks, and graphic design. Photography bookings are coming soon, while our other services are available to customers across Ghana.",
      },
      {
        q: "Where are you located?",
        a: "We are based in East Legon, Accra, Ghana. We also serve customers throughout Ghana via delivery services.",
      },
      {
        q: "What are your working hours?",
        a: "We operate Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 10:00 AM to 4:00 PM. Sundays are by appointment only.",
      },
      {
        q: "How can I contact MkayGraphics?",
        a: "You can reach us via WhatsApp at +233 592 515 464, email at mkaygraphix@gmail.com, or by filling out the contact form on our website.",
      },
    ],
  },
  {
    category: "Orders & Delivery",
    icon: Truck,
    questions: [
      {
        q: "How long does it take to complete an order?",
        a: "Most orders are completed within 48-72 hours. Complex projects like photobooks may take 5-7 days. We'll give you a specific timeline when you place your order.",
      },
      {
        q: "Do you offer delivery services?",
        a: "Yes! We deliver to all regions in Ghana. Delivery fees depend on location and order size. We also offer free delivery within Accra for orders above GH₵ 500.",
      },
      {
        q: "Can I track my order?",
        a: "Yes, once your order is ready, we'll send you photos and updates. For delivery orders, we'll provide tracking information when your package is shipped.",
      },
      {
        q: "What if I'm not satisfied with my order?",
        a: "We take pride in quality work. If you're not satisfied, please contact us within 48 hours of receiving your order. We'll work with you to make it right.",
      },
    ],
  },
  {
    category: "Payments",
    icon: CreditCard,
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept payments via Paystack (cards, mobile money, bank transfer). Full payment is required before work begins on your project.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes, we use Paystack for all payments, which is a secure, trusted payment processor in Ghana. Your payment information is never stored on our servers.",
      },
      {
        q: "Do you require a deposit?",
        a: "For most projects, we require full payment upfront. For large orders above GH₵ 2,000, we may accept a 50% deposit with the balance due before delivery.",
      },
      {
        q: "Are your prices negotiable?",
        a: "Our prices are competitive and reflect the quality of our work. For bulk orders, we offer special discounts. Contact us to discuss your project.",
      },
    ],
  },
  {
    category: "Custom Framing",
    icon: Frame,
    questions: [
      {
        q: "How do I choose the right frame for my artwork?",
        a: "We offer over 50 frame styles! Consider your artwork's style, the room's décor, and your personal preference. Our team can also help you select the perfect frame.",
      },
      {
        q: "Can you frame irregularly sized artwork?",
        a: "Yes! We offer custom framing for any size, including non-standard dimensions. Just provide your measurements when ordering.",
      },
      {
        q: "What types of frames do you offer?",
        a: "We offer wooden frames (classic and modern), metal frames, canvas frames, and shadow box frames. All frames include UV-protective glass.",
      },
      {
        q: "Do you offer canvas stretching?",
        a: "Yes, we provide canvas stretching services for canvas prints. This gives your artwork a clean, gallery-wrapped look.",
      },
    ],
  },
  {
    category: "Photo Editing",
    icon: Palette,
    questions: [
      {
        q: "What types of photo editing do you offer?",
        a: "We offer color correction, background removal, portrait retouching, old photo restoration, photo enhancement, and more. Just tell us what you need!",
      },
      {
        q: "Can you restore old or damaged photos?",
        a: "Absolutely! We specialize in restoring faded, torn, or damaged photos. We can fix scratches, remove stains, and restore colors.",
      },
      {
        q: "How do I send my photos for editing?",
        a: "You can send photos via WhatsApp at +233 592 515 464, or email them to mkaygraphix@gmail.com. Please include a description of the edits you need.",
      },
      {
        q: "What's your turnaround time for photo editing?",
        a: "Most photo editing orders are completed within 24-48 hours. Complex restoration work may take longer. We'll give you a specific timeline.",
      },
    ],
  },
  {
    category: "Printing Services",
    icon: Printer,
    questions: [
      {
        q: "What printing products do you offer?",
        a: "We offer wedding stationery, custom t-shirts, banners, flyers, business cards, brochures, and large format printing. Contact us for custom printing needs.",
      },
      {
        q: "What's the minimum order for t-shirt printing?",
        a: "We can print as few as 1 t-shirt for DTG (direct-to-garment) printing. For screen printing, the minimum is typically 20 pieces.",
      },
      {
        q: "Can I get a proof before my order is printed?",
        a: "Yes! We'll send you a digital proof for approval before printing. This ensures everything looks exactly as you want it.",
      },
      {
        q: "What file formats do you accept for printing?",
        a: "We accept high-resolution JPG, PNG, PDF, and AI files. For best results, provide files with at least 300 DPI resolution.",
      },
    ],
  },
];

const quickLinks = [
  { title: "Custom Framing", href: "/shop", icon: Frame, desc: "Browse our frame collection" },
  { title: "Photo Editing", href: "/services/editing", icon: Camera, desc: "Professional editing services" },
  { title: "Printing", href: "/services/printing", icon: Printer, desc: "T-shirts, cards, banners" },
  { title: "Photobooks", href: "/services/photobook", icon: Book, desc: "Beautiful albums" },
  { title: "Graphic Design", href: "/services/design", icon: Palette, desc: "Logo, branding & more" },
  { title: "Contact Us", href: "/contact", icon: MessageCircle, desc: "Get in touch" },
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+233 592 515 464",
    href: "https://wa.me/233592515464",
    color: "from-green-500 to-green-600",
    desc: "Fastest response",
  },
  {
    icon: Mail,
    title: "Email",
    value: "mkaygraphix@gmail.com",
    href: "mailto:mkaygraphix@gmail.com",
    color: "from-red-500 to-red-600",
    desc: "Within 24 hours",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+233 592 515 464",
    href: "tel:+233592515464",
    color: "from-blue-500 to-blue-600",
    desc: "Mon-Fri, 9AM-6PM",
  },
];

export default function SupportPage() {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<{ cat: number; q: number } | null>({ cat: 0, q: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleCategory = (index: number) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const toggleQuestion = (catIndex: number, qIndex: number) => {
    const key = { cat: catIndex, q: qIndex };
    if (openQuestion?.cat === catIndex && openQuestion?.q === qIndex) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(key);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="/images/supportbanner.jpg"
          alt="Help Center"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

        <div className="container mx-auto px-4 relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              How Can We{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
              Find answers to common questions, browse our services, or get in touch with our team.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Quick Links</h2>
            <p className="text-gray-600">Jump to a service or topic</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group bg-gray-50 rounded-xl p-4 md:p-6 text-center hover:bg-yellow-50 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                  <link.icon className="h-6 w-6 text-yellow-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-sm mb-1">{link.title}</h3>
                <p className="text-xs text-gray-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-black/10 text-black border-0">
              FAQ
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqCategories.map((cat, catIndex) => (
              <div
                key={catIndex}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleCategory(catIndex)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <cat.icon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <span className="font-bold text-lg">{cat.category}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      openCategory === catIndex ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openCategory === catIndex && (
                  <div className="px-6 pb-4 space-y-2">
                    {cat.questions.map((item, qIndex) => (
                      <div
                        key={qIndex}
                        className="border border-gray-100 rounded-lg"
                      >
                        <button
                          onClick={() => toggleQuestion(catIndex, qIndex)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left"
                        >
                          <span className="font-medium text-sm pr-4">{item.q}</span>
                          <ChevronRight
                            className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${
                              openQuestion?.cat === catIndex && openQuestion?.q === qIndex
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </button>
                        {openQuestion?.cat === catIndex && openQuestion?.q === qIndex && (
                          <div className="px-4 pb-3">
                            <p className="text-sm text-gray-600 pl-4 border-l-2 border-yellow-500">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
              How It Works
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Getting Help is Easy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Browse FAQ",
                desc: "Check our FAQs for quick answers to common questions",
                icon: HelpCircle,
              },
              {
                step: "02",
                title: "Search Services",
                desc: "Explore our services and find what you need",
                icon: Search,
              },
              {
                step: "03",
                title: "Contact Us",
                desc: "Reach out via WhatsApp, email, or phone",
                icon: MessageCircle,
              },
              {
                step: "04",
                title: "Get Support",
                desc: "We'll help you with your project",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-yellow-500" />
                </div>
                <span className="text-yellow-500 font-bold text-sm">Step {item.step}</span>
                <h3 className="font-bold mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help? */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              Contact Us
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-300 mb-10 max-w-xl mx-auto">
              Our team is ready to assist you. Choose your preferred way to reach us.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {contactOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.href}
                  target={option.href.startsWith("http") ? "_blank" : undefined}
                  rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all"
                >
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-r ${option.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <option.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{option.title}</h3>
                  <p className="text-sm text-yellow-400 mb-2">{option.value}</p>
                  <p className="text-xs text-gray-400">{option.desc}</p>
                </a>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="https://wa.me/233592515464?text=Hi!%20I%20need%20help%20with%20my%20MkayGraphics%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Helpful Resources</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: FileText,
                title: "Service Guides",
                desc: "Detailed guides for each of our services",
                href: "/services",
              },
              {
                icon: Book,
                title: "Blog",
                desc: "Tips, tutorials, and creative inspiration",
                href: "/blog",
              },
              {
                icon: Package,
                title: "Portfolio",
                desc: "See examples of our past work",
                href: "/projects",
              },
            ].map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="group bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <resource.icon className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="font-bold mb-2 group-hover:text-yellow-600 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{resource.desc}</p>
                <span className="text-sm text-yellow-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
