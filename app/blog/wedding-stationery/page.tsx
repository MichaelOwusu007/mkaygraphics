import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Share2 } from "lucide-react";

export default function WeddingStationeryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/blog-wedding.jpg"
          alt="Essential Wedding Stationery: What Ghanaian Couples Need"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Link
          href="/blog"
          className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-white hover:text-gray-200 transition-colors z-10"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back to Blog</span>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="container mx-auto">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 mb-4">
              <Printer className="h-3 w-3 mr-1" />
              Printing Services
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              Essential Wedding Stationery: What Ghanaian Couples Need
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                March 5, 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                6 min read
              </span>
              <span>By MkayGraphix Team</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-xs">Wedding</Badge>
          <Badge variant="outline" className="text-xs">Printing</Badge>
          <Badge variant="outline" className="text-xs">Ghanaian Culture</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-green-500 pl-4 mb-8">
          From wedding cards to programs, here's your complete guide to wedding stationery for modern Ghanaian celebrations.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Planning a Ghanaian wedding involves beautiful traditions, and your stationery should reflect this cultural richness while staying modern and elegant. Here's your complete guide to wedding stationery that honors our heritage.
          </p>

          <h2>Wedding Invitation Cards</h2>
          <p>
            Your invitation sets the tone for your entire celebration. Modern Ghanaian couples often blend traditional motifs with contemporary designs. At MkayGraphix, we offer customizable options that incorporate:
          </p>
          <ul>
            <li>Kente-inspired patterns and borders</li>
            <li>Cocoa leaf motifs</li>
            <li>Ghanaian Adinkra symbols</li>
            <li>Traditional fabric textures</li>
            <li>Modern typography and layouts</li>
          </ul>
          <p>
            Your invitations should include: couple's names, date, time, venue, and RSVP details. Consider adding a map or directions for out-of-town guests.
          </p>

          <h2>Save the Date Cards</h2>
          <p>
            Send these 6-12 months before the wedding, especially if you expect many out-of-town guests who need time to plan travel. This is particularly important for Ghanaian weddings where family members may be coming from abroad or other regions.
          </p>

          <h2>Ceremony Programs</h2>
          <p>
            Help guests follow along with your cultural ceremony. For Ghanaian weddings, programs can include:
          </p>
          <ul>
            <li>Order of service (customary marriage, marriage ceremony, etc.)</li>
            <li>Explanations of traditional elements for mixed-culture attendees</li>
            <li>VIP introductions (chiefs, elders, special guests)</li>
            <li>Lyrics for any songs guests might join in on</li>
            <li>Thank you notes to special guests or sponsors</li>
          </ul>

          <h2>Thank You Cards</h2>
          <p>
            Express gratitude to guests who traveled far and wide to celebrate with you. Personalized thank you cards for wedding gifts are a must. Include a photo from your special day to make them extra special.
          </p>

          <h2>Aso Ebi Coordination</h2>
          <p>
            While not traditional stationery, coordinating your Aso Ebi (family cloth) is crucial:
          </p>
          <ul>
            <li>Design cards showing the approved fabric and colors</li>
            <li>Include washing and care instructions</li>
            <li>Set clear guidelines for different events</li>
          </ul>

          <h2>Menu Cards and Place Cards</h2>
          <p>
            For receptions with plated meals or specific menus, these help guests know what's being served. Place cards ensure smooth seating arrangements.
          </p>

          <h2>Social Media Kits</h2>
          <p>
            Create branded content for your wedding hashtag, including:
          </p>
          <ul>
            <li>Instagram story templates</li>
            <li>Snapchat filters</li>
            <li>Facebook cover photo templates</li>
            <li>WhatsApp status graphics</li>
          </ul>

          <h2>Tips for Ordering Your Wedding Stationery</h2>
          <ul>
            <li><strong>Order 20% extra</strong> for mistakes and last-minute additions</li>
            <li><strong>Start the design process</strong> 4-6 months before the wedding</li>
            <li><strong>Consider digital invitations</strong> for eco-conscious celebrations and quick RSVPs</li>
            <li><strong>Proofread thoroughly</strong> – errors in names or dates are embarrassing</li>
            <li><strong>Match your stationery aesthetic</strong> to your overall wedding theme</li>
          </ul>

          <h2>Our Wedding Stationery Services</h2>
          <p>
            At MkayGraphix, we offer complete wedding stationery design and printing services:
          </p>
          <ul>
            <li>Custom design with Ghanaian cultural elements</li>
            <li>Premium paper stocks and finishes</li>
            <li>Gold foil and embossing options</li>
            <li>Complete matching sets</li>
            <li>Delivery across Ghana</li>
          </ul>
          <p>
            Contact us to start designing your perfect wedding stationery today.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=Essential%20Wedding%20Stationery%20for%20Ghanaian%20Couples%20-%20MkayGraphix%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/wedding-stationery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-500 border-0">
              <Link href="/services/printing">
                Explore Printing Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/photo-editing-tips"
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="font-medium group-hover:text-yellow-600">5 Photo Editing Tips That Will Transform Your Memories</p>
              </div>
            </Link>
            <Link
              href="/blog/photobook-importance"
              className="flex items-center justify-end gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right group"
            >
              <div>
                <p className="text-xs text-gray-500">Next</p>
                <p className="font-medium group-hover:text-yellow-600">Why Every Ghanaian Family Needs a Photobook</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Planning your Ghanaian wedding?</h3>
          <p className="text-gray-600 mb-6">
            Contact us today for beautiful wedding stationery that honors your heritage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-500 border-0">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services/printing">
                View Printing Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
