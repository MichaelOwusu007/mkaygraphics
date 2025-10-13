'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Star,
  Sparkles,
  Clock,
  Shield,
  Palette,
  Image as ImageIcon,
  Wand2,
} from 'lucide-react';
import { mockProducts, editingServices, testimonials } from '@/lib/mockData';

export default function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      
      <section className="relative h-[600px] bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center text-center px-4">
        <div className="max-w-4xl space-y-5 text-white">
          <h1 className=" text-3xl md:text-5xl font-bold">
            Edit Your Photos,Frame Your Memories & Design Your Ideas.
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Premium handcrafted frames and professional custom framing services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              asChild
            >
              <Link href="/shop">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/20 backdrop-blur"
              asChild
            >
              <Link href="/shop?category=custom">Custom Framing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/shop?category=frames">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center">
                  <h3 className=" text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                    Order a frame
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop?category=custom">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <h3 className=" text-3xl font-bold text-white group-hover:scale-110 transition-transform">
                    Custom Frames
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop">
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-0">
                <div className="h-64 bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
                  <h3 className=" text-3xl font-bold text-gray-800 group-hover:scale-110 transition-transform">
                    View All
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className=" text-4xl md:text-5xl font-bold">
            Featured Collection
          </h2>
          <p className="text-gray-500 text-lg">
            Handpicked frames for every style
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card
                className="group cursor-pointer hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{product.rating}</span>
                      <span>({product.reviewCount})</span>
                    </div>
                    <p className="font-semibold text-lg">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/shop">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Editing Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-600">
              Professional Photo Editing
            </span>
          </div>
          <h2 className=" text-4xl md:text-5xl font-bold">
            Transform Your Photos
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From basic retouching to premium creative editing, our expert team
            brings your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {editingServices.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden transition-all duration-500 ${
                service.popular
                  ? 'border-2 border-yellow-500 shadow-lg'
                  : 'hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              <CardContent className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{service.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{service.turnaroundTime}</span>
                  </div>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-gray-500">Starting at</span>
                      <span className="font-serif text-3xl font-bold">
                        ${service.price}
                      </span>
                    </div>
                    <Button className="w-full group" asChild>
                      <Link href={`/services/${service.id}`}>
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">
              Simple, fast, and professional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-30" />
            {[
              {
                icon: ImageIcon,
                title: 'Upload Your Photos',
                description:
                  'Select your service and upload photos securely through our platform',
                step: '01',
              },
              {
                icon: Wand2,
                title: 'We Work Our Magic',
                description:
                  'Our expert editors carefully enhance your images to perfection',
                step: '02',
              },
              {
                icon: Shield,
                title: 'Review & Approve',
                description:
                  'Preview your edited photos and request any adjustments needed',
                step: '03',
              },
              {
                icon: ArrowRight,
                title: 'Download & Enjoy',
                description:
                  'Receive high-resolution files ready for print or digital use',
                step: '04',
              },
            ].map((item, index) => (
              <div key={index} className="relative group text-center space-y-4">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 font-serif text-6xl font-bold text-gray-200">
                    {item.step}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-lg">
            Trusted by thousands of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-yellow-500 mx-auto flex items-center justify-center">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Premium Quality</h3>
              <p className="text-gray-500">
                Handcrafted frames and expert photo editing using finest
                materials and techniques
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-yellow-500 mx-auto flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Expert Service</h3>
              <p className="text-gray-500">
                Professional consultation and unlimited revisions to ensure
                perfection
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-full bg-yellow-500 mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold">Fast Delivery</h3>
              <p className="text-gray-500">
                Quick turnaround times and secure delivery to your door
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
