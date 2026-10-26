import Image from "next/image";
import Link from "next/link";
import {
  Aperture,
  ArrowRight,
  Building2,
  CalendarDays,
  Camera,
  Check,
  Focus,
  MessageCircle,
  Users,
  WandSparkles,
} from "lucide-react";
import Footer from "@/components/headers/Footer";
import { Button } from "@/components/ui/button";

const photographyServices = [
  {
    icon: Users,
    title: "Portraits & Headshots",
    description:
      "Confident studio portraits, personal branding sessions, graduation photos, and timeless family imagery.",
  },
  {
    icon: CalendarDays,
    title: "Events & Celebrations",
    description:
      "Natural, story-led coverage for weddings, engagements, birthdays, church events, and milestone moments.",
  },
  {
    icon: Building2,
    title: "Brands & Products",
    description:
      "Crisp product photography and campaign-ready visuals designed to help Ghanaian businesses show up brilliantly.",
  },
  {
    icon: Aperture,
    title: "Lifestyle & Editorial",
    description:
      "Art-directed imagery with an authentic feel for creators, campaigns, lookbooks, and social media stories.",
  },
];

const process = [
  {
    number: "01",
    title: "Plan the story",
    description: "We shape your concept, mood, location, wardrobe, and shot list together.",
  },
  {
    number: "02",
    title: "Create the frame",
    description: "A calm, well-directed shoot keeps you comfortable and every detail intentional.",
  },
  {
    number: "03",
    title: "Perfect the image",
    description: "Careful colour work and natural retouching give each photograph a refined finish.",
  },
  {
    number: "04",
    title: "Deliver the moment",
    description: "Receive polished digital images ready to share, print, place in a photobook, or frame.",
  },
];

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-[#f5f1e8] text-stone-950">
      <main>
        <section className="relative isolate min-h-[720px] overflow-hidden bg-black md:min-h-[780px]">
          <Image
            src="/images/photography-studio-hero.png"
            alt="Professional camera in a modern photography studio with warm lighting"
            fill
            priority
            className="object-cover object-[68%_center]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_42%,rgba(0,0,0,0.18)_78%,rgba(0,0,0,0.38)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-amber-400/15 blur-[110px]" />

          <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-4 py-24 sm:px-6 md:min-h-[780px] lg:px-8">
            <div className="max-w-3xl text-white">
              <p className="mb-7 text-sm font-bold uppercase tracking-[0.28em] text-amber-400">
                Coming soon
              </p>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-white/60">
                MkayGraphics &amp; Photography
              </p>
              <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                Your story,
                <span className="block text-amber-400">beautifully shot.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-stone-200 sm:text-lg md:text-xl">
                We&apos;re building a photography experience for honest portraits,
                unforgettable events, and bold brand imagery, from the first click
                to the final frame.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-amber-400 px-7 font-bold text-black shadow-xl shadow-amber-500/20 hover:bg-amber-300"
                >
                  <a
                    href="https://wa.me/233592515464?text=Hello%20MkayGraphics%2C%20please%20let%20me%20know%20when%20photography%20bookings%20open."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Be first to know
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/25 bg-white/10 px-7 font-semibold text-white backdrop-blur-md hover:bg-white hover:text-black"
                >
                  <Link href="#what-we-will-shoot">
                    See what&apos;s coming
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-1 gap-3 text-sm text-white/75 sm:grid-cols-3">
                {["Studio & on-location", "Natural retouching", "Print-ready delivery"].map(
                  (feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 border-t border-white/15 pt-3"
                    >
                      <Check className="h-4 w-4 shrink-0 text-amber-400" />
                      {feature}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute right-[-8rem] top-16 h-80 w-80 rounded-full border border-stone-300/70" />
          <div className="absolute right-[-4rem] top-32 h-56 w-56 rounded-full border border-stone-300/70" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
                A new chapter is developing
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.035em] sm:text-5xl md:text-6xl">
                More than a photograph. A feeling you can keep.
              </h2>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-lg leading-8 text-stone-600">
                Our upcoming photography service will bring the full MkayGraphics
                experience under one roof: thoughtful planning, professional
                direction, careful editing, premium printing, photobooks, and
                custom framing.
              </p>
              <div className="mt-6 flex items-center gap-4 text-sm font-semibold text-stone-900">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-950 text-amber-300">
                  <Focus className="h-5 w-5" />
                </span>
                Created in Ghana, for stories worth remembering.
              </div>
            </div>
          </div>
        </section>

        <section id="what-we-will-shoot" className="bg-stone-950 py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-400">
                  What we&apos;ll be shooting
                </p>
                <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                  Photography with purpose.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-stone-400">
                Every session will be built around your people, your personality,
                and where the final images need to live.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {photographyServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="group relative min-h-[310px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-amber-400"
                  >
                    <span className="absolute right-5 top-5 text-xs font-semibold tracking-[0.22em] text-white/25 transition-colors group-hover:text-black/45">
                      0{index + 1}
                    </span>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-400 transition-colors group-hover:bg-black group-hover:text-amber-300">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="mt-20">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-black">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-stone-400 transition-colors group-hover:text-black/70">
                        {service.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-stone-900 shadow-2xl shadow-stone-900/15">
              <Image
                src="/images/photography-studio-hero.png"
                alt="Camera, studio lights, and reflector ready for a professional photo session"
                fill
                className="object-cover object-[72%_center]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-white sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-black">
                  <Camera className="h-6 w-6" />
                </div>
                <p className="mt-5 max-w-md text-2xl font-bold leading-tight">
                  Professional light. Thoughtful direction. Images that still feel like you.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-amber-700">
                From idea to image
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
                A considered process, from shoot to final frame.
              </h2>
              <div className="mt-10 space-y-7">
                {process.map((step) => (
                  <div key={step.number} className="grid grid-cols-[3rem_1fr] gap-4">
                    <span className="pt-1 text-sm font-bold text-amber-700">{step.number}</span>
                    <div className="border-b border-stone-200 pb-7">
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-amber-400 px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] bg-stone-950 px-6 py-10 text-white sm:px-10 md:flex-row md:items-center md:justify-between md:py-12 lg:px-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
                <WandSparkles className="h-4 w-4" />
                Bookings opening soon
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Have a shoot in mind? Let&apos;s start the conversation.
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-400 sm:text-base">
                Tell us what you&apos;re planning and we&apos;ll let you know as soon as photography dates become available.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="h-12 shrink-0 rounded-full bg-white px-7 font-bold text-black hover:bg-amber-100"
            >
              <a
                href="https://wa.me/233592515464?text=Hello%20MkayGraphics%2C%20I%20have%20a%20photography%20project%20in%20mind."
                target="_blank"
                rel="noopener noreferrer"
              >
                Tell us about your shoot
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
