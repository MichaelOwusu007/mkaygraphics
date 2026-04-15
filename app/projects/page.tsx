"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Frame,
  Palette,
  Printer,
  BookOpen,
  PenTool,
  ArrowRight,
  ExternalLink,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/headers/Footer";

const serviceProjects = [
  {
    id: "framing",
    title: "Custom Framing",
    description: "Handcrafted frames in wood, metal & gold finishes",
    icon: Frame,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-500/10",
    categories: ["Wood Frames", "Metal Frames", "Gold Frames", "Canvas Frames"],
    gallery: [
      "/images/portfolio1.jpg",
      "/images/portfolio2.jpg",
      "/images/portfolio5.jpg",
      "/images/portfolio6.jpg",
      "/images/portfolio7.jpg",
      "/images/shop1.jpg",
      "/images/shop2.jpg",
      "/images/portfolio8.jpg",
    ],
    stats: [
      { label: "Frames Completed", value: "200+" },
      { label: "Happy Clients", value: "300+" },
      { label: "Frame Styles", value: "50+" },
    ],
  },
  {
    id: "editing",
    title: "Photo Editing",
    description: "Professional retouching & color correction",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    categories: ["Retouching", "Color Correction", "Background Removal", "Restoration"],
    gallery: [
      "/images/portfolio1.jpg",
      "/images/portfolio2.jpg",
      "/images/portfolio5.jpg",
      "/images/portfolio6.jpg",
      "/images/portfolio3.jpg",
      "/images/portfolio4.jpg",
      "/images/mine.jpg",
      "/images/portfolio8.jpg",
    ],
    stats: [
      { label: "Photos Edited", value: "1000+" },
      { label: "Satisfaction Rate", value: "99%" },
      { label: "Turnaround", value: "24-48hrs" },
    ],
  },
  {
    id: "printing",
    title: "Printing Services",
    description: "Wedding cards, t-shirts, banners & more",
    icon: Printer,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    categories: ["Wedding Cards", "T-Shirts", "Banners", "Business Cards", "Flyers"],
    gallery: [
      "/images/FLYER.jpg",
      "/images/banner1.jpg",
      "/images/banner2.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/wedding-card2.jpg",
      "/images/business-card1.jpg",
    ],
    stats: [
      { label: "Prints Delivered", value: "5,000+" },
      { label: "Products", value: "100+" },
      { label: "Same-Day Option", value: "Available" },
    ],
  },
  {
    id: "photobook",
    title: "Photobooks",
    description: "Wedding albums, graduation books & family albums",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    categories: ["Wedding Albums", "Graduation Books", "Family Albums", "Travel Books"],
    gallery: [
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
    ],
    stats: [
      { label: "Photobooks Created", value: "500+" },
      { label: "Happy Couples", value: "300+" },
      { label: "Custom Designs", value: "Unlimited" },
    ],
  },
  {
    id: "design",
    title: "Graphic Design",
    description: "Logos, brand identity & social media graphics",
    icon: PenTool,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    categories: ["Logo Design", "Brand Identity", "Social Media", "Print Design"],
    gallery: [
      "/images/logo.jpg",
      "/images/logo2.jpg",
      "/images/design.jpg",
      "/images/design1.jpg",
      "/images/artwork.jpg",
      "/images/artwork.jpg",
      "/images/design.jpg",
      "/images/design1.jpg",
    ],
    stats: [
      { label: "Brands Created", value: "50+" },
      { label: "Logo Designs", value: "50+" },
      { label: "Repeat Clients", value: "85%" },
    ],
  },
];

const squareData = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  let currentIndex = newArray.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
};

interface ShuffleGridProps {
  images: string[];
  serviceTitle: string;
  color: string;
  onViewAll: () => void;
}

const ShuffleGrid = ({ images, serviceTitle, onViewAll }: ShuffleGridProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const [squares, setSquares] = useState(squareData.map((sq, i) => ({
    ...sq,
    src: images[i]
  })));

  useEffect(() => {
    setMounted(true);
    
    const shuffleSquares = () => {
      setSquares(shuffle(squareData).map((sq, i) => ({
        ...sq,
        src: images[i]
      })));
      timeoutRef.current = setTimeout(shuffleSquares, 2000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [images]);

  if (!mounted) {
    return (
      <div className="relative">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {squareData.map((sq, i) => (
            <div
              key={sq.id}
              className="relative rounded-xl overflow-hidden shadow-lg aspect-square bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {squares.map((sq) => (
          <motion.div
            key={sq.id}
            layout
            transition={{ duration: 1.5, type: "spring" }}
            className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group aspect-square`}
            onClick={onViewAll}
          >
            <motion.div
              className="absolute inset-0"
              layout
              transition={{ duration: 1.5, type: "spring" }}
            >
              <Image
                src={sq.src}
                alt={`${serviceTitle}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeGallery, setActiveGallery] = useState<string[]>([]);

  const openGallery = (service: (typeof serviceProjects)[0]) => {
    setActiveGallery(service.gallery);
    setCurrentImageIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveGallery([]);
    setCurrentImageIndex(0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeGallery.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === activeGallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 px-4 py-1">
              Our Work
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Stunning Projects
              <span className="block bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                That Speak Volumes
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              From handcrafted frames to stunning photobooks, explore our portfolio of creative work 
              that brings Ghanaian stories to life.
            </p>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              What We <span className="bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">Create</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Every project is crafted with passion and precision. Here&apos;s a glimpse of our creative expertise.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {serviceProjects.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-8 md:gap-12 items-center ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className={!isEven ? "lg:order-2" : ""}>
                    <div className={`inline-flex items-center gap-2 ${service.bgColor} rounded-full px-4 py-2 mb-4`}>
                      <Icon className={`h-5 w-5 text-gray-700`} />
                      <span className="text-sm font-semibold text-gray-700">{service.title}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                      {service.description}
                    </h3>

                    <p className="text-gray-500 mb-6">
                      Our team brings years of expertise to every {service.title.toLowerCase()} project, 
                      ensuring exceptional quality and attention to detail.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.categories.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {service.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => openGallery(service)}
                        className={`bg-gradient-to-r ${service.color} hover:opacity-90 text-white`}
                      >
                        <ZoomIn className="h-4 w-4 mr-2" />
                        View Gallery
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href={`/services/${service.id}`}>
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Shuffle Grid Preview */}
                  <div className={!isEven ? "lg:order-1" : ""}>
                    <div className="relative">
                      <ShuffleGrid
                        images={service.gallery}
                        serviceTitle={service.title}
                        color={service.color}
                        onViewAll={() => openGallery(service)}
                      />

                      {/* Service Icon Badge */}
                      <motion.div 
                        className={`absolute -bottom-4 -right-4 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-xl`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Let&apos;s create something amazing together. Get in touch and let&apos;s bring your vision to life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold"
              asChild
            >
              <Link href="/contact">
                Get a Quote
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white hover:text-black"
              asChild
            >
              <Link href="/shop">
                Browse Shop
                <ExternalLink className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {modalOpen && activeGallery.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={activeGallery[currentImageIndex]}
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-center">
                {currentImageIndex + 1} / {activeGallery.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          {/* Thumbnails */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-full px-4 overflow-x-auto">
            {activeGallery.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === currentImageIndex ? "border-yellow-500" : "border-transparent"
                }`}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
      < Footer /> 
    </div>
  );
}
