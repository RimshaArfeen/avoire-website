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
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import { perfumes } from "./shop/data";
import { slugify } from "./utils";

export default function Home() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const featured = perfumes.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white">
      <Navbar variant="transparent" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {featured.map((perfume) => (
            <div key={perfume.id} className="group">
              {/* Card */}
              <Link href={`/shop/${slugify(perfume.name)}`}>
                <div className="relative aspect-[3/4] bg-[#fffcf9] border border-[#dccab8] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  {/* Image with gradient fallback */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7efe6] to-[#efe4d6]">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(perfume.id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-10 ${
                      wishlist.includes(perfume.id)
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-white/80 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                    }`}
                  >
                    <Heart
                      size={14}
                      fill={
                        wishlist.includes(perfume.id) ? "currentColor" : "none"
                      }
                    />
                  </button>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                    <p className="text-white text-sm font-light italic leading-relaxed">
                      &ldquo;{perfume.shortDesc}&rdquo;
                    </p>
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="mt-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-35 mb-1">
                  {perfume.note}
                </p>
                <Link
                  href={`/shop/${slugify(perfume.name)}`}
                  className="text-lg font-display font-bold hover:opacity-70 transition-opacity"
                >
                  {perfume.name}
                </Link>
                <p className="text-base font-light mt-1 opacity-60">
                  ${perfume.price}.00
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Editorial Story Block ─── */}
      <section className="bg-[#f7efe6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image side */}
            <div className="relative overflow-hidden min-h-[420px] lg:min-h-[640px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#dccab8] to-[#cbb49e]">
                <img
                  src="/images/atelier.jpg"
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
                  src="/images/ingredients.jpg"
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
          {perfumes.slice(4, 8).map((perfume) => (
            <div key={perfume.id} className="group">
              <Link href={`/shop/${slugify(perfume.name)}`}>
                <div className="relative aspect-[3/4] bg-[#fffcf9] border border-[#dccab8] rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f7efe6] to-[#efe4d6]">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(perfume.id);
                    }}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-10 ${
                      wishlist.includes(perfume.id)
                        ? "bg-[#1a1a1a] text-white"
                        : "bg-white/80 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white"
                    }`}
                  >
                    <Heart
                      size={14}
                      fill={
                        wishlist.includes(perfume.id) ? "currentColor" : "none"
                      }
                    />
                  </button>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                    <p className="text-white text-sm font-light italic leading-relaxed">
                      &ldquo;{perfume.shortDesc}&rdquo;
                    </p>
                  </div>
                </div>
              </Link>

              <div className="mt-5 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-35 mb-1">
                  {perfume.note}
                </p>
                <Link
                  href={`/shop/${slugify(perfume.name)}`}
                  className="text-lg font-display font-bold hover:opacity-70 transition-opacity"
                >
                  {perfume.name}
                </Link>
                <p className="text-base font-light mt-1 opacity-60">
                  ${perfume.price}.00
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Newsletter CTA ─── */}
      <section className="py-28 md:py-36 px-6 border-t border-[#dccab8]">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Join the <span className="italic font-normal">Atelier</span>
          </h2>

          <p className="text-[#5a5a5a] font-light text-lg max-w-md mx-auto leading-relaxed">
            Be first to discover limited editions, receive scent stories, and
            access exclusive invitations.
          </p>

          <div className="relative max-w-md mx-auto pt-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent border-b-2 border-[#dccab8] py-4 pr-12 text-center font-light focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#9c8f84]"
            />
            <button
              aria-label="Subscribe"
              className="absolute right-0 bottom-4 p-1 hover:translate-x-1 transition-transform"
            >
              <ArrowRight size={20} className="text-[#1a1a1a]" />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9c8f84] font-medium pt-2">
            No spam, ever. Only the finest updates.
          </p>
        </div>
      </section>
    </div>
  );
}
