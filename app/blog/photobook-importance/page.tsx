import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Share2 } from "lucide-react";

export default function PhotobookImportancePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/blog-photobook.jpg"
          alt="Why Every Ghanaian Family Needs a Photobook"
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
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              Photobooks
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              Why Every Ghanaian Family Needs a Photobook
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                February 28, 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                5 min read
              </span>
              <span>By MkayGraphix Team</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-xs">Photobooks</Badge>
          <Badge variant="outline" className="text-xs">Family</Badge>
          <Badge variant="outline" className="text-xs">Memories</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-blue-500 pl-4 mb-8">
          Preserve your family legacy with a beautifully designed photobook that tells your unique story.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            In Ghana, family is everything. Yet so many precious moments exist only on phones, at risk of being lost forever when devices fail or get upgraded. A photobook changes that—transforming digital files into tangible family treasures that can be passed down through generations.
          </p>

          <h2>Preserving Cultural Heritage</h2>
          <p>
            Ghana is rich in tradition and celebration. From naming ceremonies to outdooring, from 7th day celebrations to weddings, our cultural calendar is full of moments worth preserving:
          </p>
          <ul>
            <li><strong>Outdooring ceremonies</strong> – Baby's introduction to the family</li>
            <li><strong>Naming ceremonies</strong> – The formal naming with cultural significance</li>
            <li><strong>Birthday celebrations</strong> – Milestones worth documenting</li>
            <li><strong>Anniversaries</strong> – Celebrating love and commitment</li>
            <li><strong>Family reunions</strong> – Times when the whole family gathers</li>
          </ul>

          <h2>Creating a Family Legacy</h2>
          <p>
            Photobooks become family heirlooms that can be passed down through generations. Unlike digital files that can be lost, corrupted, or forgotten, a physical photobook remains:
          </p>
          <ul>
            <li>On the bookshelf, easily accessible</li>
            <li>Something children and grandchildren can hold</li>
            <li>A visual history of your family's journey</li>
            <li>A conversation starter for family gatherings</li>
          </ul>

          <h2>Milestone Moments Worth Capturing</h2>
          <p>
            Every family has milestones that deserve more than a folder on your phone:
          </p>
          <ul>
            <li><strong>Graduation days</strong> – From primary through university</li>
            <li><strong>Career achievements</strong> – New jobs, promotions, business launches</li>
            <li><strong>Religious milestones</strong> – Baptisms, confirmations, dedications</li>
            <li><strong>Home purchases</strong> – Documenting your journey to home ownership</li>
            <li><strong>Health milestones</strong> – Recovery journeys, fitness achievements</li>
          </ul>

          <h2>Travel Memories</h2>
          <p>
            Document family trips and create a visual family history:
          </p>
          <ul>
            <li>Annual family vacations</li>
            <li>Visits to historical sites (Cape Coast, Kumasi, Volta Region)</li>
            <li>International travel experiences</li>
            <li>Staycations and local adventures</li>
          </ul>
          <p>
            These books let children see where they've been and create excitement for future adventures.
          </p>

          <h2>How to Create a Family Photobook</h2>
          <p>
            <strong>Step 1: Gather Your Photos</strong><br/>
            Select 50-200 of your best photos organized by theme or timeline. Quality over quantity is key.
          </p>

          <p>
            <strong>Step 2: Choose a Theme</strong><br/>
            Consider chronological (by year), by event, by family branch, or by milestone.
          </p>

          <p>
            <strong>Step 3: Add Context</strong><br/>
            Include captions with dates, names, and stories. Future generations won't know who people are without context.
          </p>

          <p>
            <strong>Step 4: Let the Professionals Help</strong><br/>
            Our designers can create custom layouts that tell your story beautifully.
          </p>

          <p>
            <strong>Step 5: Review and Print</strong><br/>
            Proof your book carefully before printing. You'll want to treasure this for years to come.
          </p>

          <h2>Our Photobook Services</h2>
          <p>
            We create photobooks that become family heirlooms:
          </p>
          <ul>
            <li>Premium paper and durable bindings</li>
            <li>Custom design with professional layouts</li>
            <li>Multiple size options (A4, A3, square)</li>
            <li>Hardcover and softcover options</li>
            <li>20 to 100+ page options</li>
            <li>Delivery across Ghana</li>
          </ul>
          <p>
            Contact us to start preserving your family legacy today.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=Why%20Every%20Ghanaian%20Family%20Needs%20a%20Photobook%20-%20MkayGraphix%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/photobook-importance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0">
              <Link href="/services/photobook">
                Explore Photobook Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/wedding-stationery"
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="font-medium group-hover:text-yellow-600">Essential Wedding Stationery for Ghanaian Couples</p>
              </div>
            </Link>
            <Link
              href="/blog/brand-building"
              className="flex items-center justify-end gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right group"
            >
              <div>
                <p className="text-xs text-gray-500">Next</p>
                <p className="font-medium group-hover:text-yellow-600">Building a Memorable Brand for Ghanaian Businesses</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Start preserving your family legacy</h3>
          <p className="text-gray-600 mb-6">
            Contact us today to create a beautiful photobook of your precious memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 border-0">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services/photobook">
                View Photobook Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
