import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Palette, Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Share2 } from "lucide-react";

export default function PhotoEditingTipsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/banner.img3.jpg"
          alt="5 Photo Editing Tips That Will Transform Your Memories"
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
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 mb-4">
              <Palette className="h-3 w-3 mr-1" />
              Photo Editing
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              5 Photo Editing Tips That Will Transform Your Memories
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                March 10, 2024
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
          <Badge variant="outline" className="text-xs">Photo Editing</Badge>
          <Badge variant="outline" className="text-xs">Tips</Badge>
          <Badge variant="outline" className="text-xs">Photography</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-purple-500 pl-4 mb-8">
          Professional tips to enhance your photos and preserve precious moments in the best quality possible.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Your photos deserve to look their absolute best. Whether it's your wedding day, your child's first steps, or a memorable family gathering, professional photo editing can transform ordinary photos into extraordinary memories that will last a lifetime.
          </p>

          <h2>1. Fix Lighting Issues</h2>
          <p>
            Correct exposure can make or break a photo. When editing, pay attention to:
          </p>
          <ul>
            <li><strong>Shadows</strong> – Brighten dark areas to reveal hidden details</li>
            <li><strong>Highlights</strong> – Reduce overexposed areas that wash out details</li>
            <li><strong>White balance</strong> – Adjust color temperature for natural tones</li>
          </ul>
          <p>
            The goal is balanced lighting that looks natural, not artificially enhanced. Over-editing can make photos look fake and lose their emotional impact.
          </p>

          <h2>2. Enhance Colors Naturally</h2>
          <p>
            Avoid the trap of over-saturation. While vibrant colors can be eye-catching, they often look artificial. Instead:
          </p>
          <ul>
            <li>Increase saturation slightly for warmth</li>
            <li>Use vibrance to boost muted colors without affecting skin tones</li>
            <li>Focus on natural-looking enhancement that preserves authentic mood</li>
          </ul>
          <p>
            For Ghanaian celebrations with colorful kente fabrics and vibrant decorations, subtle color enhancement can make these elements pop without looking artificial.
          </p>

          <h2>3. Remove Distractions</h2>
          <p>
            Clean backgrounds draw attention to your subject. Common distractions include:
          </p>
          <ul>
            <li>Power lines, signs, or modern structures in heritage photos</li>
            <li>Background clutter that competes with your subject</li>
            <li>Unwanted people at events</li>
            <li>Photobombers and spontaneous interruptions</li>
          </ul>
          <p>
            Professional editing can seamlessly remove these elements while maintaining the photo's integrity. The best edits are the ones nobody notices.
          </p>

          <h2>4. Restore Old Photos</h2>
          <p>
            Digitally restore faded, torn, or damaged photos to bring old memories back to life:
          </p>
          <ul>
            <li>Color correction for faded color photos</li>
            <li>Scratch and tear removal</li>
            <li>Smudge and stain elimination</li>
            <li>Contrast and brightness adjustment</li>
            <li>Digital reconstruction of damaged areas</li>
          </ul>
          <p>
            These restored photos make wonderful gifts for family members, especially for occasions like anniversaries, birthdays, and family reunions. Imagine giving your grandmother a restored photo of her parents!
          </p>

          <h2>5. Pay Attention to Cropping</h2>
          <p>
            The right crop can completely change a photo's impact:
          </p>
          <ul>
            <li>Remove excess space that dilutes the composition</li>
            <li>Follow the rule of thirds for dynamic images</li>
            <li>Focus on what matters most in the frame</li>
            <li>Consider the final print size when cropping</li>
          </ul>

          <h2>Why Professional Editing Matters</h2>
          <p>
            While smartphone apps offer basic editing, professional services provide:
          </p>
          <ul>
            <li>Industry-standard software and expertise</li>
            <li>Batch processing for consistent results across event photos</li>
            <li>High-resolution output suitable for printing</li>
            <li>Quick turnaround times (24-48 hours typically)</li>
          </ul>

          <h2>Our Editing Services</h2>
          <p>
            Our editing services use professional-grade tools to ensure every photo looks its best. Whether you need basic adjustments or complex restoration, we've got you covered. Contact us to transform your memories today.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=5%20Photo%20Editing%20Tips%20That%20Will%20Transform%20Your%20Memories%20-%20MkayGraphics%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/photo-editing-tips"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
              <Link href="/services/editing">
                Explore Editing Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/framing-guide"
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left group"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
              <div>
                <p className="text-xs text-gray-500">Previous</p>
                <p className="font-medium group-hover:text-yellow-600">The Ultimate Guide to Choosing the Perfect Frame</p>
              </div>
            </Link>
            <Link
              href="/blog/wedding-stationery"
              className="flex items-center justify-end gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right group"
            >
              <div>
                <p className="text-xs text-gray-500">Next</p>
                <p className="font-medium group-hover:text-yellow-600">Essential Wedding Stationery for Ghanaian Couples</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to enhance your photos?</h3>
          <p className="text-gray-600 mb-6">
            Contact us today to learn more about our photo editing services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 border-0">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services/editing">
                View Editing Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
