"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/headers/Footer";
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  MessageCircle,
  Frame,
  Palette,
  Printer,
  BookOpen,
  PenTool,
  Search,
} from "lucide-react";

const blogPosts = [
  {
    id: "framing-guide",
    title: "The Ultimate Guide to Choosing the Perfect Frame for Your Art",
    excerpt: "Discover how to select the ideal frame that complements your artwork while protecting it for years to come.",
    image: "/images/blog-framing.jpg",
    category: "Custom Framing",
    categoryColor: "from-yellow-500 to-amber-500",
    icon: Frame,
    author: "MkayGraphics Team",
    date: "March 15, 2024",
    readTime: "5 min read",
    featured: true,
    tags: ["Framing", "Art", "Home Decor"],
  },
  {
    id: "photo-editing-tips",
    title: "5 Photo Editing Tips That Will Transform Your Memories",
    excerpt: "Professional tips to enhance your photos and preserve precious moments in the best quality possible.",
    image: "/images/blog-editing.jpg",
    category: "Photo Editing",
    categoryColor: "from-purple-500 to-pink-500",
    icon: Palette,
    author: "MkayGraphics Team",
    date: "March 10, 2024",
    readTime: "4 min read",
    featured: false,
    tags: ["Photo Editing", "Tips", "Photography"],
  },
  {
    id: "wedding-stationery",
    title: "Essential Wedding Stationery: What Ghanaian Couples Need",
    excerpt: "From wedding cards to programs, here's your complete guide to wedding stationery for modern Ghanaian celebrations.",
    image: "/images/blog-wedding.jpg",
    category: "Printing Services",
    categoryColor: "from-green-500 to-emerald-500",
    icon: Printer,
    author: "MkayGraphics Team",
    date: "March 5, 2024",
    readTime: "6 min read",
    featured: false,
    tags: ["Wedding", "Printing", "Ghanaian Culture"],
  },
  {
    id: "photobook-importance",
    title: "Why Every Ghanaian Family Needs a Photobook",
    excerpt: "Preserve your family legacy with a beautifully designed photobook that tells your unique story.",
    image: "/images/blog-photobook.jpg",
    category: "Photobooks",
    categoryColor: "from-blue-500 to-cyan-500",
    icon: BookOpen,
    author: "MkayGraphics Team",
    date: "February 28, 2024",
    readTime: "5 min read",
    featured: false,
    tags: ["Photobooks", "Family", "Memories"],
  },
  {
    id: "brand-building",
    title: "Building a Memorable Brand: Design Principles for Ghanaian Businesses",
    excerpt: "Learn the essential design principles that help Ghanaian businesses stand out and build lasting brand recognition.",
    image: "/images/blog-branding.jpg",
    category: "Graphic Design",
    categoryColor: "from-orange-500 to-red-500",
    icon: PenTool,
    author: "MkayGraphics Team",
    date: "February 20, 2024",
    readTime: "7 min read",
    featured: false,
    tags: ["Branding", "Business", "Design"],
  },
  {
    id: "tshirt-design-ideas",
    title: "Custom T-Shirt Design Ideas for Ghanaian Events",
    excerpt: "Creative t-shirt design concepts for weddings, funerals, church events, and corporate gatherings in Ghana.",
    image: "/images/blog-tshirt.jpg",
    category: "Printing Services",
    categoryColor: "from-green-500 to-emerald-500",
    icon: Printer,
    author: "MkayGraphics Team",
    date: "February 15, 2024",
    readTime: "4 min read",
    featured: false,
    tags: ["T-Shirts", "Printing", "Events"],
  },
];

const categories = [
  { name: "All Posts", count: 6 },
  { name: "Custom Framing", count: 1 },
  { name: "Photo Editing", count: 1 },
  { name: "Printing Services", count: 2 },
  { name: "Photobooks", count: 1 },
  { name: "Graphic Design", count: 1 },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || selectedCategory !== "All Posts" || searchQuery);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              Our Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Insights & <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">Inspiration</span>
            </h1>
            <p className="text-lg text-gray-300">
              Tips, guides, and creative inspiration to help you make the most of our services and preserve your precious moments.
            </p>
          </div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" /> */}
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-gray-50 border-b sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.name
                      ? "bg-black text-white"
                      : "bg-white border hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All Posts" && !searchQuery && featuredPost && (
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Link href={`/blog/${featuredPost.id}`} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:hidden" />
                  </div>
                  <CardContent className="p-6 md:p-10 flex flex-col justify-center">
                    <Badge className={`w-fit mb-4 bg-gradient-to-r ${featuredPost.categoryColor} text-white border-0`}>
                      <featuredPost.icon className="h-3 w-3 mr-1" />
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-yellow-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-500 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {regularPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedCategory("All Posts");
                  setSearchQuery("");
                }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${post.categoryColor} text-white border-0`}>
                        <post.icon className="h-3 w-3 mr-1" />
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{post.date}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Inspired
            </h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest tips, tutorials, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-8">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
