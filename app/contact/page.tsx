"use client";

import { useState } from "react";
import Footer from "@/components/headers/Footer";
import "./contact.css";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Instagram,
  ChevronDown,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+233 592 515 464",
    href: "tel:+233592515464",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+233 592 515 464",
    href: "https://wa.me/233592515464",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    value: "mkaygraphix@gmail.com",
    href: "mailto:mkaygraphix@gmail.com",
    color: "from-red-500 to-red-600",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Accra, Ghana",
    href: "https://maps.google.com/?q=East+Legon,+Accra,+Ghana",
    color: "from-yellow-500 to-yellow-600",
  },
];

const services = [
  "Custom Framing",
  "Photo Editing",
  "Printing Services",
  "Photobooks",
  "Graphic Design",
  "Brand Identity",
  "Other",
];

const faqs = [
  {
    question: "What are your working hours?",
    answer: "We operate Monday to Saturday, from 9:00 AM to 6:00 PM. Sundays are by appointment only.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Most projects are completed within 48-72 hours. Complex projects like photobooks may take 5-7 days.",
  },
  {
    question: "Do you offer delivery services?",
    answer: "Yes! We deliver throughout Ghana. Delivery fees depend on location and order size.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Paystack payments (cards, mobile money) and bank transfers. Full payment is required before work begins.You can also simply reach us out on whatsapp",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Banner Section */}
      <header
        className="contact-banner"
        style={{
          backgroundImage: "url(/images/contactbanner.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <h1 className="contact-title text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl top-1/2 left-1/2 absolute text-center w-full">
          CONTACT US
        </h1>
      </header>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith("http") ? "_blank" : undefined}
                rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
              >
                <div
                  className={`w-10 h-10 md:w-14 md:h-14 mx-auto rounded-xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-2 md:mb-4 group-hover:scale-110 transition-transform`}
                >
                  <info.icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1">{info.title}</h3>
                <p className="text-xs md:text-sm text-gray-600 break-all">{info.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-12">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-6 md:mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Michael Owusu"
                      className="w-full px-3 md:px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="michael@email.com"
                      className="w-full px-3 md:px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+233 XX XXX XXXX"
                      className="w-full px-3 md:px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full px-3 md:px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 md:py-4 rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 md:mt-8 pt-4 md:pt-8 border-t">
                <p className="text-sm text-gray-600 mb-4">Or reach us directly:</p>
                <div className="flex gap-3 md:gap-4">
                  <a
                    href="https://wa.me/233592515464"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a
                    href="https://facebook.com/mkaygraphix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                  >
                    <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                  <a
                    href="https://instagram.com/mkaygraphix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 flex items-center justify-center text-white transition-colors"
                  >
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Map & Info */}
            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-lg h-[250px] md:h-[300px] lg:h-[350px] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.9731328!2d-0.1686153!3d5.6364025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b501278f4a5%3A0xca081548a0c20ffd!2sEast%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1699666583312!5m2!1sen!2sgh"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MkayGraphix Accra Location"
                />
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 md:p-6 lg:p-8">
                <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">Business Hours</h3>
                    <div className="space-y-1 text-xs md:text-sm text-gray-600">
                      <p className="flex flex-col sm:flex-row sm:justify-between gap-0 sm:gap-4">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between gap-0 sm:gap-4">
                        <span>Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </p>
                      <p className="flex flex-col sm:flex-row sm:justify-between gap-0 sm:gap-4">
                        <span>Sunday</span>
                        <span className="font-medium text-red-500">Closed</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg mb-2">Our Location</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      East Legon, Accra, Ghana
                      <br />
                      Nationwide delivery.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/233592515464?text=Hi%20MkayGraphix!%20I'd%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 md:gap-3 w-full py-3 md:py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold transition-colors"
              >
                <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-sm md:text-base">Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-4 bg-black/10 text-black border-0">
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Quick answers to common questions about our services.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-sm md:text-base pr-2 md:pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 md:h-5 md:w-5 text-gray-400 flex-shrink-0 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 md:px-6 pb-3 md:pb-4">
                      <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            Prefer Quick Communication?
          </h2>
          <p className="text-gray-300 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
            Send us a direct message on WhatsApp for instant response. We typically reply within minutes!
          </p>
          <a
            href="https://wa.me/233592515464"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 lg:px-10 py-3 md:py-4 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold text-base md:text-lg transition-colors"
          >
            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
            Start a Conversation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
