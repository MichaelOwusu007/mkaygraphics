import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Calendar, Clock, ArrowLeft, MessageCircle, Share2 } from "lucide-react";

export default function TshirtDesignIdeasPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/blog-tshirt.jpg"
          alt="Custom T-Shirt Design Ideas for Ghanaian Events"
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
              Custom T-Shirt Design Ideas for Ghanaian Events
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                February 15, 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                4 min read
              </span>
              <span>By MkayGraphics Team</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-xs">T-Shirts</Badge>
          <Badge variant="outline" className="text-xs">Printing</Badge>
          <Badge variant="outline" className="text-xs">Events</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-green-500 pl-4 mb-8">
          Creative t-shirt design concepts for weddings, funerals, church events, and corporate gatherings in Ghana.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Custom t-shirts have become essential for Ghanaian events, creating unity, lasting memories, and a sense of belonging. Here's how to make yours stand out while staying true to our cultural context.
          </p>

          <h2>Family Reunion T-Shirts</h2>
          <p>
            Family reunions are becoming increasingly popular in Ghana. Make yours memorable with custom shirts that:
          </p>
          <ul>
            <li>Feature your family name prominently (the Asante family, the Kofi family, etc.)</li>
            <li>Include the year of the reunion</li>
            <li>Consider incorporating a family crest or symbol</li>
            <li>Add the location where the reunion is held</li>
            <li>Include a memorable tagline or motto</li>
          </ul>
          <p>
            Pro tip: Order in multiple colors for different family branches to add visual variety while maintaining cohesion.
          </p>

          <h2>Outdooring Ceremonies</h2>
          <p>
            Celebrate baby milestones with adorable designs that parents and godparents will cherish forever:
          </p>
          <ul>
            <li>"Welcome [Baby's Name]" designs</li>
            <li>Baby's birth stats (date, weight, time)</li>
            <li>Traditional elements like Ghanaian symbols</li>
            <li>Godparent and parent acknowledgment shirts</li>
            <li>Modern minimalist designs for the little one</li>
          </ul>

          <h2>Church Events and Programs</h2>
          <p>
            Create unifying shirts for various church activities:
          </p>
          <ul>
            <li><strong>Choir performances</strong> – Matching choir robes or performance shirts</li>
            <li><strong>Conference apparel</strong> – Annual programs, retreats, crusades</li>
            <li><strong>Outreach programs</strong> – Community service and evangelism events</li>
            <li><strong>Youth programs</strong> – Youth conferences and camps</li>
            <li><strong>Anniversary celebrations</strong> – Church milestone commemorations</li>
          </ul>

          <h2>Corporate Events</h2>
          <p>
            Professional yet creative designs for business occasions:
          </p>
          <ul>
            <li><strong>Team building events</strong> – Building unity among staff</li>
            <li><strong>Product launches</strong> – Creating buzz around new offerings</li>
            <li><strong>Company anniversaries</strong> – Milestone celebrations</li>
            <li><strong>Staff durbars</strong> – Formal company gatherings</li>
            <li><strong>Training programs</strong> – Professional development events</li>
          </ul>

          <h2>Funeral and Memorial Events</h2>
          <p>
            While solemn occasions require sensitivity, custom shirts can honor loved ones:
          </p>
          <ul>
            <li>Memorial shirts with photos of the departed</li>
            <li>"In Loving Memory" designs</li>
            <li>Family unity shirts for funeral planning committees</li>
            <li>Church memorial shirts</li>
          </ul>

          <h2>Design Tips for Ghanaian Events</h2>
          <ul>
            <li><strong>Keep it simple</strong> – One main message is most effective</li>
            <li><strong>Choose quality fabric</strong> – Comfort matters, especially for all-day wear</li>
            <li><strong>Consider print method</strong> – Screen printing for bulk orders, DTG for complex designs</li>
            <li><strong>Order extras</strong> – For walk-ins and last-minute guests</li>
            <li><strong>Think about colors</strong> – What colors represent your event or family?</li>
          </ul>

          <h2>Print Methods Explained</h2>
          <p>
            <strong>Screen Printing:</strong>
          </p>
          <ul>
            <li>Best for bulk orders (20+ shirts)</li>
            <li>Cost-effective for simple designs with few colors</li>
            <li>Durable, long-lasting prints</li>
            <li>Ideal for single or two-color designs</li>
          </ul>

          <p>
            <strong>Direct-to-Garment (DTG):</strong>
          </p>
          <ul>
            <li>Perfect for complex, full-color designs</li>
            <li>Photographic quality prints</li>
            <li>No setup fees</li>
            <li>Works on both light and dark fabrics</li>
          </ul>

          <p>
            <strong>Heat Transfer:</strong>
          </p>
          <ul>
            <li>Good for small quantities</li>
            <li>Full-color prints without setup</li>
            <li>Can be less durable than screen printing</li>
          </ul>

          <h2>Our T-Shirt Printing Services</h2>
          <p>
            At MkayGraphics, we offer comprehensive t-shirt printing:
          </p>
          <ul>
            <li>Custom design consultation</li>
            <li>Screen printing for bulk orders</li>
            <li>DTG printing for complex designs</li>
            <li>Various fabric options (cotton, polyester, blends)</li>
            <li>Size ranges from children to adult</li>
            <li>Delivery across Ghana</li>
          </ul>
          <p>
            Contact us to bring your event t-shirt vision to life.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=Custom%20T-Shirt%20Design%20Ideas%20for%20Ghanaian%20Events%20-%20MkayGraphics%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/tshirt-design-ideas"
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
                <Printer className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/brand-building"
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="font-medium group-hover:text-yellow-600">Building a Memorable Brand for Ghanaian Businesses</p>
              </div>
            </Link>
            <div />
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to print your custom shirts?</h3>
          <p className="text-gray-600 mb-6">
            Contact us today for quality t-shirt printing for your event.
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
