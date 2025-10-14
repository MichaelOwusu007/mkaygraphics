"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner"; // ✅ for toast notifications
import "./contact.css";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, contact, service, message }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        // ✅ Clear form fields after successful submission
        setName("");
        setEmail("");
        setContact("");
        setService("");
        setMessage("");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* ✅ Banner Section */}
      <header
        className="shop-banner"
        style={{
          backgroundImage: "url(/images/contactbanner.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <h1 className="shop-title text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl top-1/2 left-1/2 absolute text-center w-full">
          CONTACT US
        </h1>
      </header>

      {/* ✅ Contact Section */}
      <section className="m-auto">
        <div className="flex flex-col lg:flex-row p-4 items-center justify-between">
          {/* 🗺️ Map */}
          <div className="map m-auto lg:w-[50%] w-[100%] md:w-[80%] mx-auto lg:min-w-[450px] xl:min-w-[550px] py-10 lg:py-16 flex items-center overflow-hidden">
            <iframe
              className="lg:w-[50%] w-[100%] md:w-[80%] mx-auto lg:min-w-[500px] md:min-w-[700px] xl:min-w-[800px] py-8 lg:py-16 md:h-[600px] xl:h-[700px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15882.11339387216!2d-0.16861529003705508!3d5.636402513563441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b501278f4a5%3A0xca081548a0c20ffd!2sEast%20Legon%2C%20Accra!5e0!3m2!1sen!2sgh!4v1699666583312!5m2!1sen!2sgh"
              width="600"
              height="500"
              loading="lazy"
            ></iframe>
          </div>

          {/* 📩 Form */}
          <div className="w-full lg:w-[50%]">
            <form
              onSubmit={handleSubmit}
              className="w-[90%] md:w-[80%] mx-auto lg:min-w-[450px] xl:min-w-[550px] py-5 lg:py-16 xl:text-lg"
            >
              <h2 className="young-serif-font text-2xl md:text-3xl">
                Get In Touch:
              </h2>

              {/* Inputs */}
              <fieldset className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-sans text-lg lg:text-xl">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Enter name"
                    className="border p-4 bg-zinc-300 bg-opacity-5 rounded-md w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    className="border p-4 bg-zinc-300 bg-opacity-5 rounded-md w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact">Phone number</label>
                  <input
                    type="text"
                    name="contact"
                    id="contact"
                    placeholder="Contact"
                    className="border p-4 bg-zinc-300 bg-opacity-5 rounded-md w-full"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="service"
                    className="font-sans text-lg lg:text-xl"
                  >
                    Service title
                  </label>
                  <input
                    type="text"
                    name="service"
                    id="service"
                    required
                    placeholder="e.g. video editing"
                    className="border p-4 bg-zinc-300 bg-opacity-5 rounded-md w-full"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Message Box */}
              <fieldset className="space-y-8 lg:space-y-10 mt-10">
                <textarea
                  name="message"
                  id="message"
                  placeholder="How can we help you?"
                  className="border p-4 w-full bg-zinc-300 bg-opacity-5 min-h-[200px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                className="text-center cursor-pointer py-2 px-5 rounded font-sans text-lg bg-blue-500 inline-block mt-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ WhatsApp Floating Button */}
      <a
        className="whatsup fixed bottom-[100px] right-[100px] flex gap-3 items-center"
        aria-label="Chat on WhatsApp"
        href="https://wa.me/+233542512399"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/images/sup.png"
          alt="Chat on WhatsApp"
          width={50}
          height={50}
          className="w-[50px] h-[50px]"
        />
        <p className="text-lg font-sans font-medium underline text-green-500">
          WhatsAppUs
        </p>
      </a>
    </div>
  );
}
