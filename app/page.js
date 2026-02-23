"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Star,
  Gem,
  FlaskConical,
  Leaf,
} from "lucide-react";
import {
  Quote,
  Instagram,
  ArrowUpRight
} from 'lucide-react';
import Hero from "./Components/Hero";
import { slugify } from "./utils";
import ShopSection from "./Components/ShopSection";
import { useProducts } from "./context/ProdContext";
export default function Home() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  const { products: perfumes } = useProducts();
  // const featured = perfumes.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#1a1a1a]  selection:bg-[#1a1a1a] selection:text-white">
      <Hero />

      {/* ─── Brand Philosophy Strip ─── */}
      <section className="bg-[#1a1a1a] text-white py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
          {["Hand-Blended in Paris", "Rare Natural Essences", "Free Worldwide Shipping"].map(
            (text, i) => (
              <React.Fragment key={text}>
                {i > 0 && (
                  <span className="hidden sm:block w-px h-3.5 bg-white/20" />
                )}
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium opacity-60">
                  {text}
                </span>
              </React.Fragment>
            )
          )}
        </div>
      </section>

      {/* ─── Featured Collection ─── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                Curated Selection
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display leading-tight">
              Signature <span className="italic font-normal">Scents</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity group"
          >
            View All Collections
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <ShopSection/>
      </section>

      {/* ─── Editorial Story Block ─── */}
      <section className="bg-[#f7efe6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative overflow-hidden min-h-[420px] lg:min-h-[640px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#dccab8] to-[#cbb49e]">
                <img
                  src="/avoire.jpg"
                  alt="The Avoire Atelier"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              {/* Decorative corner frame */}
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/20 rounded-lg pointer-events-none" />
            </div>

            {/* Text side */}
            <div className="flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-24">
              <div className="max-w-lg space-y-8">
                <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                    The Maison
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display leading-tight">
                  Born from
                  <br />
                  <span className="italic font-normal">Obsession.</span>
                </h2>

                <p className="text-[#5a5a5a] font-light leading-relaxed text-lg">
                  In a quiet atelier on the Champs-Élysées, we blend rare
                  ingredients from five continents into fragrances that tell
                  stories. Each bottle is a chapter — personal, evocative, and
                  unforgettable.
                </p>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity group pt-4"
                >
                  Read Our Story
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Second Image + Text (Reversed) ─── */}
      <section className="bg-[#f3eadf]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Text side (first on desktop) */}
            <div className="flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-24 order-2 lg:order-1">
              <div className="max-w-lg space-y-8">
                <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                    The Process
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display leading-tight">
                  From Essence
                  <br />
                  <span className="italic font-normal">to Emotion.</span>
                </h2>

                <p className="text-[#5a5a5a] font-light leading-relaxed text-lg">
                  Every creation begins with a single note — a whisper of
                  saffron, the warmth of oud, or the delicate caress of iris.
                  Our master perfumers layer these raw materials into
                  compositions that evolve on your skin throughout the day.
                </p>

                <Link
                  href="/shop"
                  className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity group pt-4"
                >
                  Discover the Collection
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Image side */}
            <div className="relative overflow-hidden min-h-[420px] lg:min-h-[640px] order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#e6d7c8] to-[#cbb49e]">
                <img
                  src="/ingredients.jpg"
                  alt="Rare perfume ingredients"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/20 rounded-lg pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Press Quote ─── */}
      <section className="py-28 md:py-36 px-6 bg-[#f7efe6]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-1.5 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                fill="#1a1a1a"
                className="text-[#1a1a1a]"
              />
            ))}
          </div>

          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-snug font-normal px-4">
            &ldquo;The most captivating fragrance house to emerge from Paris in
            a decade.&rdquo;
          </blockquote>

          <cite className="block text-[11px] uppercase tracking-[0.3em] font-semibold opacity-35 not-italic pt-2">
            &mdash; Vogue Paris
          </cite>
        </div>
      </section>

      {/* ─── Values / Pillars ─── */}
      <section className="bg-[#1a1a1a] text-white py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display">
              The Avoire{" "}
              <span className="italic font-normal">Difference</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                icon: Gem,
                title: "Rare Essences",
                text: "We source the world\u2019s most precious ingredients \u2014 from Iranian saffron to Indian oud \u2014 ensuring each note tells an authentic story.",
              },
              {
                icon: FlaskConical,
                title: "Artisan Craft",
                text: "Every bottle is hand-blended in our Parisian atelier by master perfumers with decades of olfactory expertise.",
              },
              {
                icon: Leaf,
                title: "Sustainable Luxury",
                text: "Beauty without compromise. Ethically sourced materials, recyclable packaging, and an unwavering commitment to the planet.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center space-y-6 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-white/10 rounded-full">
                  <Icon size={24} strokeWidth={1.5} className="opacity-70" />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold">
                  {title}
                </h3>
                <p className="text-sm font-light leading-relaxed opacity-45 max-w-xs mx-auto">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Best Sellers Row ─── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                Most Loved
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display leading-tight">
              Best <span className="italic font-normal">Sellers</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-bold hover:opacity-50 transition-opacity group"
          >
            Shop All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {perfumes.slice(2, 8).map((perfume) => (
            <div key={perfume._id} className="group">
              <Link href={`/shop/${slugify(perfume.name)}`}>
                <div className="relative aspect-[3/4] bg-[#fffcf9] border border-[#dccab8] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img
                    src={perfume.images[0]} // use first image from images array
                    alt={perfume.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ─── The Avoire Circle (Last Section) ─── */}
        <section className=" overflow-hidden py-24">
          <div className="max-w-7xl mx-auto">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div className="max-w-2xl space-y-6">
                <span className="text-ui uppercase tracking-[0.3em] text-accent/60 font-medium">The Community</span>
                <h2 className="text-headline-xl font-headline leading-[1.1] tracking-tight">
                  Join <span className="italic font-light text-accent/80">The Avoire Circle</span>
                </h2>
                <p className="text-text-muted text-body font-light max-w-lg leading-relaxed">
                  Experience the world of rare essences and luxury craftsmanship.
                  Indulge in scents that tell a story and connect with a global
                  community of connoisseurs.
                </p>
              </div>

              <div className="hidden md:block">
                <a
                  href="/shop"
                  className="group flex items-center gap-3 bg-accent text-text-inverse uppercase tracking-widest text-caption font-bold px-10 py-5 rounded-full transition-all hover:bg-accent-hover hover:-translate-y-1 shadow-xl"
                >
                  experience our fragrance
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Premium Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-6 h-auto md:h-[800px]">

              {/* Main Hero Visual (Top Left) */}
              <div className="md:col-span-7 md:row-span-4 relative group overflow-hidden rounded-3xl border border-border-subtle shadow-sm">
                <img
                  src="https://i.pinimg.com/736x/e0/9e/0f/e09e0f26edaba87032bba2b31cce1203.jpg"
                  alt="Artisanal Process"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-caption uppercase tracking-[0.2em] font-medium opacity-80 mb-2">Heritage</p>
                  <h3 className="text-headline font-headline italic">The Art of Extraction</h3>
                </div>
                <div className="absolute top-6 right-6">
                  <Instagram className="text-white/80" size={20} />
                </div>
              </div>

              {/* Testimonial 1 - Vogue (Top Right) */}
              <div className="md:col-span-5 md:row-span-2 bg-bg-card p-10 flex flex-col justify-center rounded-3xl border border-border-subtle shadow-sm relative group hover:border-accent-secondary transition-colors">
                <Quote className="text-accent-secondary/40 absolute top-8 right-8" size={40} />
                <div className="space-y-4 relative z-10">
                  <p className="text-headline-lg font-headline italic text-text-primary leading-tight">
                    &ldquo;A masterclass in olfactory balance.&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="h-[1px] w-8 bg-accent-secondary" />
                    <p className="text-ui font-bold uppercase tracking-widest text-accent">Vogue Paris</p>
                  </div>
                </div>
              </div>

              {/* Social Detail (Center Right) */}
              <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-border-subtle shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop"
                  alt="Fragrance bottle"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Secondary Testimonial - Le Monde (Bottom Left) */}
              <div className="md:col-span-3 md:row-span-2 bg-accent text-text-inverse p-6 lg:p-8 flex flex-col justify-between rounded-3xl shadow-2xl">
                <p className="text-sm font-light leading-relaxed italic opacity-90">
                  "Respecting the slow-perfumery tradition while embracing modern nuances."
                </p>
                <p className="text-caption font-bold uppercase tracking-[0.2em]">Le Monde</p>
              </div>

              {/* Secondary Visual (Bottom Center) */}
              <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-3xl border border-border-subtle">
                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop"
                  alt="Floral ingredients"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/20 mix-blend-multiply" />
              </div>

              {/* Engagement Card (Bottom Right) */}
              <div className="md:col-span-5 md:row-span-2 bg-bg-subtle  p-6 lg:p-8 flex flex-col justify-center rounded-3xl border border-border-subtle relative overflow-hidden">
                <div className="space-y-4">
                  <h4 className="text-ui font-bold uppercase tracking-widest">Global Reach</h4>
                  <p className="text-text-muted text-body-sm">Over 50,000 members across 40 countries sharing their olfactory journeys.</p>
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-subtle bg-accent-secondary flex items-center justify-center text-[10px] text-accent font-bold">
                        AV
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-bg-subtle bg-white flex items-center justify-center text-[10px] text-accent font-bold italic">
                      +4k
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Mobile CTA */}
            <div className="mt-12 md:hidden flex justify-center">
              <a
                href="/subscribe"
                className="w-full text-center bg-accent text-text-inverse uppercase tracking-widest text-caption font-bold px-8 py-5 rounded-full shadow-lg"
              >
                Join the Circle
              </a>
            </div>
          </div>
        </section>
      </section>

     
    </div>
  );
}
