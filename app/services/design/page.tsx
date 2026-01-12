"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./graphicdesign.css";
import Image from "next/image";

const Page: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const sections = [
    {
      title: "Digital Advertisement",
      text: `Elevate your brand presence with our digital advertisement services at MkayGraphix. Our team of experienced designers ensures attention-grabbing visuals that leave a lasting impression on your target audience. Take your marketing efforts to the next level with MkayGraphix.`,
      img: "/images/portfolio1.jpg",
    },
    {
      title: "Flyers & Posters",
      text: `Transform your messaging into captivating visuals with our flyer and poster design services at MkayGraphix. We specialize in creating eye-catching promotional materials that effectively communicate your message. Our expert designers focus on delivering designs that stand out and leave a lasting impression.`,
      img: "/images/design1.jpg",
      reverse: true,
    },
    {
      title: "Logo Designs",
      text: `We design a stunning Logo that actually designs, brands, and builds your business. We&apos;ve got you covered for all your logo design works and indeed we are only a few clicks away. Trust MkayGraphix to give your brand a distinctive and impactful visual representation.`,
      img: "/images/logo2.jpg",
    },
    {
      title: "Brand Identity",
      text: `Craft a cohesive and compelling brand identity with McKuleGraphix. Our brand identity services focus on creating a consistent and memorable visual language for your business. From logos to color palettes and typography, we ensure every element reflects your unique brand personality.`,
      img: "/images/portfolio2.jpg",
      reverse: true,
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Banner */}
      <header
        className="shop-banner"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(/images/designbanner.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
      >
        <h1 className="shop-title font-extrabold text-4xl sm:text-6xl lg:text-7xl top-1/2 left-1/2 absolute text-center w-full text-white">
          GRAPHIC DESIGN
        </h1>
      </header>

      <main className="w-full mx-auto px-5">
        {/* Intro */}
        <div className="my-8 lg:px-20 text-lg leading-8">
          <p>
            Embark on a visual journey with MkayGraphix, your go-to destination
            for professional graphic design that seamlessly blends quality and
            cost-effectiveness. Since 2020, we&apos;ve upheld reasonable and
            steadfast pricing, ensuring you receive the best value for your
            creative needs. Do not forget to mention all instructions and your
            requirements. Yes feel free to make it all known to us. You are
            welcome to choose the most suitable tasks from the Graphic design
            packages listed below. You will pay for the services in your
            country&apos;s currency.
          </p>
          <p>
            Visit our{" "}
            <span className="font-bold underline hover:text-blue-600">
              Express Delivery page
            </span>{" "}
            for your design to be delivered the next day after making payment.
            Our normal delivery charges are lower than the charges for express
            delivery.
          </p>
          <p>
            For normal delivery, your design will be delivered within three
            days after making payment.
          </p>
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <section
            key={idx}
            className={`flex justify-center items-center flex-col-reverse lg:flex-row lg:py-20 ${
              section.reverse ? "flex-col-reverse lg:flex-row-reverse" : ""
            }`}
          >
            <Image
              className="xl:w-[750px]  xl:h-[650px] sm:w-[500px] sm:h-[500px]"
              src={section.img}
              alt={section.title}
              width={750}
              height={650}
            />
            <div className="designproject">
              <div data-aos="fade-up" className="lg:p-20 p-6 py-20">
                <h3 className="text-3xl lg:text-5xl font-bold">{section.title}</h3>
                <p className="mt-5 text-xl leading-8 font-medium">{section.text}</p>
                <div className="lg:text-2xl my-10 mb-0 w-max">
                  <div className="border-b hover:border-b-blue-500 hover:text-blue-500 flex items-center p-2">
                    <a href="/contact">Let&apos;s talk</a>
                    <div className="m-1"></div>
                    <div>&rarr;</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Page;
