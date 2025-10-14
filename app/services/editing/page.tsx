'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import "./photoediting.css";
import { ArrowRight, Star, Clock, Check } from 'lucide-react';
import { editingServices } from '@/lib/mockData';

export default function Services() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <header className='shop-banner'
        style={{
          backgroundImage: "url(/images/banner.img3.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center"
        }}>
        <h1 className='shop-title text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl top-1/2 left-1/2 absolute text-center w-full'>PHOTO EDITING</h1>
      </header>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {editingServices.map((service, index) => (
            <Card
              key={service.id}
              className={`group relative overflow-hidden hover:shadow-elegant transition-all duration-500 animate-fade-in flex flex-col ${
                service.popular ? 'border-2 border-secondary shadow-glow lg:scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.popular && (
                <Badge className="absolute top-4 right-4 z-10 bg-secondary text-secondary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardContent className="p-0 flex flex-col flex-1">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Turnaround: {service.turnaroundTime}</span>
                  </div>

                  <div className="space-y-3 flex-1">
                    <p className="font-semibold text-sm">What&apos;s included:</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t space-y-3 mt-auto">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-muted-foreground">Starting at</span>
                      <div className="text-right">
                        <span className=" text-3xl font-bold">GH{service.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">per photo</span>
                      </div>
                    </div>
                    <Button className="w-full group" size="lg" asChild>
                      <Link href={`/services/${service.id}`}>
                        Order Service
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className=" text-4xl font-bold">Compare Services</h2>
            <p className="text-muted-foreground">Choose the perfect editing level for your needs</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4 text-lg">Features</th>
                  {editingServices.map((service) => (
                    <th key={service.id} className="p-4 text-center">
                      <div className="font-serif text-lg font-bold">{service.title}</div>
                      <div className="text-2xl font-bold text-secondary mt-2">${service.price}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  'Color correction',
                  'Basic blemish removal',
                  'Advanced skin retouching',
                  'Body contouring',
                  'Background removal',
                  'Creative effects',
                  'Unlimited revisions',
                ].map((feature, index) => (
                  <tr key={index} className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-4">{feature}</td>
                    <td className="p-4 text-center">
                      {index < 2 ? (
                        <Check className="h-5 w-5 text-orange-400 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {index < 5 ? (
                        <Check className="h-5 w-5 text-orange-400 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-orange-400 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
          <Star className="h-12 w-12 text-secondary mx-auto" />
          <h2 className=" text-3xl md:text-4xl font-bold">
            Not sure which service to choose?
          </h2>
          <p className="text-muted-foreground text-lg">
            Contact our team for a free consultation and we&apos;ll help you find the perfect editing solution
          </p>
          <Button size="lg" variant="outline">
            Get Free Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}
