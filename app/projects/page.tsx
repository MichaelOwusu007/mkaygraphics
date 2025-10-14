"use client";

import { useState } from "react";
import Image from "next/image";


const ProjectPage: React.FC = () => {
  const images: string[] = [
    "/images/portfolio6.jpg",
    "/images/portfolio2.jpg",
    "/images/portfolio1.jpg",
    "/images/portfolio8.jpg",
    "/images/design.jpg",
    "/images/ibrand1.jpg",
    "/images/portfolio7.jpg",
    "/images/design1.jpg",
    "/images/logo.jpg",
    "/images/portfolio5.jpg",
    "/images/mine.jpg",
    "/images/logo2.jpg",
    "/images/FLYER.jpg",
    "/images/portfolio3.jpg",
    "/images/shop1.jpg",
    "/images/shop2.jpg",
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
    }
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== null) {
      setCurrentIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <div className="overflow-x-hidden m-auto py-10">
      {/* Header */}
      <div className="py-10 text-center">
        <h1 className="lg:leading-[60px] text-4xl lg:text-6xl my-3 young-serif-font">
          PROJECTS
        </h1>
        <p className="font-bold">Few of our recent projects.</p>
      </div>

      {/* ✅ Modal with Prev/Next */}
      {modalOpen && currentIndex !== null && (
        <div
          className="full-img z-[100] w-full h-full flex items-center justify-center fixed top-0 left-0 bg-[rgba(0,0,0,0.85)]"
          onClick={closeModal}
        >
          <div className="relative max-w-[90%] max-h-[90%]">
            <Image
              src={images[currentIndex]}
              alt={`Project ${currentIndex + 1}`}
              width={1000}
              height={800}
              className="object-contain max-h-[90vh] rounded shadow-lg"
            />

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-3xl font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Prev / Next Navigation */}
            <button
              onClick={showPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3 hover:text-blue-400"
            >
              ‹
            </button>
            <button
              onClick={showNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white text-3xl px-3 hover:text-blue-400"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* ✅ Gallery (multi-column, not fixed 2x2) */}
      <div className="gallery-container py-[50px] px-[8%]">
        <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="cursor-pointer hover:opacity-90 transition"
              onClick={() => openModal(index)}
            >
              <Image
                src={src}
                alt={`Project ${index + 1}`}
                width={500}
                height={500}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Footer Buttons */}
      <div className="btn mt-10 flex justify-between max-w-[1500px] m-auto px-6">
        <a
          href="/images/videography.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="border py-1 px-3 font-bold">View more</button>
        </a>
        <a href="/contact">
          <button className="border py-1 px-3 font-bold bg-blue-500 rounded text-white">
            👋 Hire us
          </button>
        </a>
      </div>
    </div>
  );
};

export default ProjectPage;
