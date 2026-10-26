import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PenTool, Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Share2 } from "lucide-react";

export default function BrandBuildingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/blog-branding.jpg"
          alt="Building a Memorable Brand: Design Principles for Ghanaian Businesses"
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
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 mb-4">
              <PenTool className="h-3 w-3 mr-1" />
              Graphic Design
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              Building a Memorable Brand: Design Principles for Ghanaian Businesses
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                February 20, 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                7 min read
              </span>
              <span>By MkayGraphics Team</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-xs">Branding</Badge>
          <Badge variant="outline" className="text-xs">Business</Badge>
          <Badge variant="outline" className="text-xs">Design</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-orange-500 pl-4 mb-8">
          Learn the essential design principles that help Ghanaian businesses stand out and build lasting brand recognition.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            In Ghana's competitive business landscape, strong branding isn't optional. It's essential. Your brand is the first impression you make, the promise you keep, and the story you tell. Here's how design can elevate your business.
          </p>

          <h2>Understanding Brand Identity</h2>
          <p>
            Brand identity is more than just a logo. It's everything visual that represents your business:
          </p>
          <ul>
            <li><strong>Logo</strong> – Your visual signature</li>
            <li><strong>Color palette</strong> – Emotional triggers that define your feel</li>
            <li><strong>Typography</strong> – The personality of your words</li>
            <li><strong>Imagery style</strong> – Photos, illustrations, and graphics that define your look</li>
            <li><strong>Brand voice</strong> – How you speak to your audience</li>
          </ul>

          <h2>Your Logo is Your Identity</h2>
          <p>
            A great logo is:
          </p>
          <ul>
            <li><strong>Simple</strong> – Easy to recognize at a glance</li>
            <li><strong>Memorable</strong> – Stays in people's minds</li>
            <li><strong>Versatile</strong> – Works on a billboard and a business card</li>
            <li><strong>Timeless</strong> – Won't need updating every few years</li>
            <li><strong>Appropriate</strong> – Right for your industry and audience</li>
          </ul>

          <h2>Color Psychology for Ghanaian Businesses</h2>
          <p>
            Colors convey meaning and trigger emotions:
          </p>
          <ul>
            <li><strong>Red</strong> – Energy, passion, excitement (great for restaurants, entertainment)</li>
            <li><strong>Blue</strong> – Trust, reliability, professionalism (perfect for financial services)</li>
            <li><strong>Green</strong> – Growth, nature, health (ideal for healthcare, organic products)</li>
            <li><strong>Gold/Yellow</strong> – Premium, optimism, warmth (luxury, celebration services)</li>
            <li><strong>Purple</strong> – Creativity, wisdom (creative agencies, beauty)</li>
            <li><strong>Black</strong> – Elegance, power, sophistication (premium services)</li>
          </ul>

          <h2>Typography Speaks Volumes</h2>
          <p>
            Your font choice communicates your brand personality:
          </p>
          <ul>
            <li><strong>Modern sans-serifs</strong> – Innovative, clean, forward-thinking</li>
            <li><strong>Classic serifs</strong> – Established, reliable, trustworthy</li>
            <li><strong>Playful scripts</strong> – Friendly, approachable, creative</li>
            <li><strong>Bold display fonts</strong> – Confident, attention-grabbing</li>
          </ul>
          <p>
            Limit yourself to 2-3 fonts maximum for brand consistency.
          </p>

          <h2>Consistency is Key</h2>
          <p>
            Use the same colors, fonts, and design elements across all materials:
          </p>
          <ul>
            <li>Business cards</li>
            <li>Letterheads and envelopes</li>
            <li>Social media profiles and posts</li>
            <li>Website and digital presence</li>
            <li>Packaging and receipts</li>
            <li>Signage and vehicle branding</li>
          </ul>
          <p>
            Consistency builds recognition over time. When customers see your consistent brand everywhere, they remember you.
          </p>

          <h2>Local Relevance Matters</h2>
          <p>
            Incorporate elements that resonate with your Ghanaian audience:
          </p>
          <ul>
            <li>Traditional patterns (Kente, Adinkra) for heritage brands</li>
            <li>Local language translations</li>
            <li>Cultural color associations</li>
            <li>Locally relevant imagery</li>
          </ul>
          <p>
            But balance cultural relevance with professional presentation for broader appeal.
          </p>

          <h2>Where to Start</h2>
          <ol>
            <li><strong>Define your brand personality</strong> – What words describe your business?</li>
            <li><strong>Research your competition</strong> – What are they doing? How can you stand out?</li>
            <li><strong>Create a style guide</strong> – Document colors, fonts, and rules</li>
            <li><strong>Apply consistently</strong> – Every touchpoint matters</li>
            <li><strong>Evolve thoughtfully</strong> – Brands can grow, but changes should be strategic</li>
          </ol>

          <h2>Our Design Services</h2>
          <p>
            Our design team specializes in creating brands that honor Ghanaian culture while appealing to modern markets:
          </p>
          <ul>
            <li>Complete brand identity packages</li>
            <li>Logo design with multiple concepts</li>
            <li>Brand guidelines and style guides</li>
            <li>Business card and stationery design</li>
            <li>Social media branding</li>
            <li>Brand collateral and print materials</li>
          </ul>
          <p>
            Let us help you build a brand that tells your story and grows your business.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=Building%20a%20Memorable%20Brand%20for%20Ghanaian%20Businesses%20-%20MkayGraphics%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/brand-building"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
              <Link href="/services/design">
                Explore Design Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/photobook-importance"
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="font-medium group-hover:text-yellow-600">Why Every Ghanaian Family Needs a Photobook</p>
              </div>
            </Link>
            <Link
              href="/blog/tshirt-design-ideas"
              className="flex items-center justify-end gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right group"
            >
              <div>
                <p className="text-xs text-gray-500">Next</p>
                <p className="font-medium group-hover:text-yellow-600">Custom T-Shirt Design Ideas for Ghanaian Events</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to build your brand?</h3>
          <p className="text-gray-600 mb-6">
            Contact us today to create a memorable brand identity for your business.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services/design">
                View Design Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
