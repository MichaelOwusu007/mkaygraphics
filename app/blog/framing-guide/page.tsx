import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/headers/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Frame, Calendar, Clock, ArrowLeft, ArrowRight, MessageCircle, Share2 } from "lucide-react";

export default function FramingGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="/images/banner.img1.jpg"
          alt="The Ultimate Guide to Choosing the Perfect Frame for Your Art"
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
            <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0 mb-4">
              <Frame className="h-3 w-3 mr-1" />
              Custom Framing
            </Badge>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
              The Ultimate Guide to Choosing the Perfect Frame for Your Art
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                March 15, 2024
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                5 min read
              </span>
              <span>By MkayGraphics Team</span>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="outline" className="text-xs">Framing</Badge>
          <Badge variant="outline" className="text-xs">Art</Badge>
          <Badge variant="outline" className="text-xs">Home Decor</Badge>
        </div>

        <p className="text-xl text-gray-600 italic border-l-4 border-yellow-500 pl-4 mb-8">
          Discover how to select the ideal frame that complements your artwork while protecting it for years to come.
        </p>

        <div className="prose prose-lg max-w-none">
          <h2>Introduction</h2>
          <p>
            Choosing the right frame for your artwork is both an art and a science. The perfect frame should enhance your piece without overpowering it, while also providing proper protection for years to come. Whether you have a precious family portrait, a stunning landscape photograph, or a piece of original artwork, the right frame can transform it into a true masterpiece.
          </p>

          <h2>1. Consider the Art Style</h2>
          <p>
            Modern minimalist pieces often look best in sleek, thin frames that don't compete for attention. Think clean lines and subtle finishes that let your artwork speak for itself. Contemporary art pairs beautifully with black or white frames in simple profiles.
          </p>
          <p>
            On the other hand, classical artworks, vintage prints, and traditional Ghanaian pieces may benefit from ornate, traditional frames with decorative molding. These frames add gravitas and historical context to heritage pieces.
          </p>

          <h2>2. Match the Era and Style</h2>
          <p>
            Traditional Ghanaian kente-inspired art, Adinkra symbol prints, and cultural pieces pair beautifully with wooden frames, particularly those in warm mahogany or rich walnut tones. These natural finishes honor the cultural heritage of the artwork.
          </p>
          <p>
            Contemporary digital art, abstract pieces, and modern photography might look stunning in sleek metal frames. Silver, gold, or matte black metal frames add a contemporary edge.
          </p>

          <h2>3. Think About Color Harmony</h2>
          <p>
            The frame color should either complement or thoughtfully contrast with your artwork's dominant colors:
          </p>
          <ul>
            <li><strong>Complementary colors</strong> sit opposite each other on the color wheel, creating visual tension</li>
            <li><strong>Analogous colors</strong> create harmony and a cohesive feel</li>
            <li><strong>Neutral tones</strong> (black, white, silver, gold) work with virtually everything</li>
          </ul>

          <h2>4. Consider the Room</h2>
          <p>
            Your framed art should harmonize with your existing décor while standing out as a statement piece. Consider the wall color, furniture, and overall aesthetic of the space.
          </p>
          <p>
            For minimalist modern spaces, thin-profile frames in matte finishes work best. Traditional Ghanaian homes with rich wood furniture might call for wider, more ornate frames in matching wood tones.
          </p>

          <h2>5. Don't Forget Protection</h2>
          <p>
            UV-protective glass or acrylic prevents fading, especially important for vibrant artworks in sunlit rooms. Consider:
          </p>
          <ul>
            <li><strong>Regular glass</strong> – Basic protection, affordable</li>
            <li><strong>UV-protective glass</strong> – Blocks 97% of UV rays</li>
            <li><strong>Non-reflective glass</strong> – Reduces glare for easy viewing</li>
            <li><strong>Museum glass</strong> – Maximum protection for valuable pieces</li>
          </ul>

          <h2>6. Think About Matting</h2>
          <p>
            A proper mat does more than look nice. It creates breathing room between the artwork and frame, preventing direct contact that could cause damage over time. Mats also add visual depth and can be color-coordinated to enhance your artwork.
          </p>

          <h2>7. Size Matters</h2>
          <p>
            The frame should be proportional to your wall space and artwork. A general rule: the frame should be 2-4 inches wider than the artwork on each side. For gallery walls, smaller frames with consistent styling create a cohesive look.
          </p>

          <h2>Our Framing Services</h2>
          <p>
            At MkayGraphics, we offer over 50 frame styles from classic wood to modern metal, ensuring every piece finds its perfect match. Our expert team can help you:
          </p>
          <ul>
            <li>Select the ideal frame for your artwork</li>
            <li>Choose appropriate matting and mounting</li>
            <li>Install UV-protective glazing</li>
            <li>Custom frame sizing for unique pieces</li>
          </ul>
          <p>
            Visit our shop or contact us to explore our full range of framing options. Every artwork deserves to be showcased beautifully.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-2">Share this article</p>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/?text=The%20Ultimate%20Guide%20to%20Choosing%20the%20Perfect%20Frame%20for%20Your%20Art%20-%20MkayGraphics%20Blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php?u=https://mkaygraphix.com/blog/framing-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              </div>
            </div>

            <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-500 border-0">
              <Link href="/shop">
                Explore Our Frames
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Continue Reading</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div />
            <Link
              href="/blog/photo-editing-tips"
              className="flex items-center justify-end gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-right group"
            >
              <div>
                <p className="text-xs text-gray-500">Next</p>
                <p className="font-medium group-hover:text-yellow-600">5 Photo Editing Tips That Will Transform Your Memories</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </Link>
          </div>
        </div>
      </article>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to frame your masterpiece?</h3>
          <p className="text-gray-600 mb-6">
            Contact us today to explore our custom framing services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-yellow-500 to-amber-500 border-0">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/services">
                View All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
