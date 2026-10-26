"use client";

import Link from "next/link";
import { Mail, Frame, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* 🏢 Brand Info */}
        <div>
               <Link
                        href="/"
                        className="flex mb-3 items-center space-x-2 hover:opacity-80 "
                      >
                        <Frame className="h-6  w-6 text-yellow-600" />
                        <span className="text-xl text-white font-semibold lg:font-bold">
                          MkayGraphics
                        </span>
                      </Link>
          {/* <h2 className="text-2xl font-bold text-white mb-3">MkayGraphics</h2> */}
          <p className="text-sm text-gray-400 leading-relaxed">
            Photography, handcrafted frames, photo editing, and design services. We shoot, edit, frame, and design it best for you.
          </p>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-yellow-500" />
            <span>+233 592 515 464</span>
          </div>
          <div className="flex items-center gap-3 text-sm mt-2">
            <Mail className="h-4 w-4 text-yellow-500" />
            <span>mkaygraphix@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm mt-2">
            <MapPin className="h-4 w-4 text-yellow-500" />
            <span>Accra, Ghana</span>
          </div>
        </div>

        {/* 📚 Quick Links */}
        <div>
          <h3 className="text-xl lg:font-bold font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/about" className="hover:text-yellow-500 transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-yellow-500 transition">Our Services</Link></li>
            <li><Link href="/careers" className="hover:text-yellow-500 transition">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* 💼 Services */}
        <div>
          <h3 className="text-xl lg:bold font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/services/editing" className="hover:text-yellow-500 transition">Photo Editing</Link></li>
            <li><Link href="/services/photography" className="hover:text-yellow-500 transition">Photography <span className="text-xs text-yellow-500">Soon</span></Link></li>
            <li><Link href="/services/design" className="hover:text-yellow-500 transition">Graphics Design</Link></li>
            <li><Link href="/shop" className="hover:text-yellow-500 transition">Shop Frame</Link></li>
            <li><Link href="/support" className="hover:text-yellow-500 transition">Help Center</Link></li>
          </ul>
        </div>

        {/* 📬 Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Stay Updated</h3>
          <p className="text-gray-400 mb-4 text-sm">
            Join our newsletter for updates, insights, and exclusive offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm: gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 🧭 Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-8 text-gray-500 text-sm gap-3">
        <p>© {new Date().getFullYear()} MkayGraphics. All rights reserved.</p>
        <div className="flex gap-5 text-gray-400">
          <Link href="https://facebook.com" target="_blank" className="hover:text-yellow-500">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:text-yellow-500">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-yellow-500">
            <Twitter className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
