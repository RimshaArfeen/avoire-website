"use client";
import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Gem,
  FlaskConical,
  Leaf,
  MapPin,
  Quote,
} from "lucide-react";
import Navbar from "../Components/Navbar";

const milestones = [
  { year: "2024", text: "Avoire founded in the heart of Paris" },
  { year: "2024", text: "First collection of 12 signature scents launched" },
  { year: "2025", text: "Opened flagship atelier on the Champs-Élysées" },
  { year: "2025", text: "Expanded to worldwide shipping across 40+ countries" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white py-24">

      {/* ─── Hero ─── */}
      <section className="relative h-[85vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2018] to-[#0d0d0d]">
          <img
            src="/images/about-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-3xl">
          <div className="inline-block px-5 py-2 border border-white/20 rounded-full mb-10">
            <span className="text-[10px] uppercase tracking-[0.35em] font-medium opacity-70">
              Our Story
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display leading-[0.95] mb-8">
            Crafting <span className="italic font-normal">Emotion,</span>
            <br />
            One Essence at a Time.
          </h1>

          <p className="text-lg md:text-xl font-light opacity-50 max-w-lg mx-auto leading-relaxed">
            A Parisian maison devoted to the art of rare, unforgettable
            fragrance.
          </p>
        </div>
      </section>

      {/* ─── Origin Story ─── */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#dccab8] to-[#cbb49e]">
              <img
                src="/shop.jpg"
                alt="The Avoire founder"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="absolute top-5 left-5 right-5 bottom-5 border border-white/20 rounded-2xl pointer-events-none" />
          </div>

          {/* Text */}
          <div className="space-y-8 lg:py-8">
            <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                The Beginning
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-display leading-tight">
              Born from a
              <br />
              <span className="italic font-normal">Relentless Pursuit.</span>
            </h2>

            <div className="space-y-5 text-[#5a5a5a] font-light leading-relaxed text-lg">
              <p>
                Avoire was born from a singular conviction: that fragrance is
                the most intimate form of self-expression. In 2024, from a
                sunlit atelier overlooking the Seine, we set out to create
                perfumes that don&rsquo;t just smell extraordinary &mdash; they
                make you feel extraordinary.
              </p>
              <p>
                We rejected the mass-market formula. Instead, we chose to work
                with the rarest ingredients on earth, hand-blended in small
                batches by master perfumers who treat each composition as a work
                of art.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <MapPin size={16} className="opacity-40" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold opacity-40">
                Founded 2024 &mdash; Paris, France
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy Quote ─── */}
      <section className="bg-[#1a1a1a] text-white py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Quote
            size={36}
            strokeWidth={1}
            className="mx-auto opacity-20 mb-4"
          />
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display italic leading-snug font-normal px-4">
            A fragrance should be a feeling you wear &mdash; invisible to the
            eye, unforgettable to the soul.
          </blockquote>
          <cite className="block text-[11px] uppercase tracking-[0.3em] font-semibold opacity-35 not-italic pt-2">
            &mdash; The Avoire Atelier
          </cite>
        </div>
      </section>

      {/* ─── The Craft — Image Left, Text Right ─── */}
      <section className="bg-[#f7efe6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative overflow-hidden min-h-[420px] lg:min-h-[640px]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e6d7c8] to-[#cbb49e]">
                <img
                  src="/perfumeBlending.jpg"
                  alt="The art of perfume blending"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-white/20 rounded-lg pointer-events-none" />
            </div>

            <div className="flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-24">
              <div className="max-w-lg space-y-8">
                <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                    The Craft
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display leading-tight">
                  Where Science Meets
                  <br />
                  <span className="italic font-normal">Artistry.</span>
                </h2>

                <div className="space-y-5 text-[#5a5a5a] font-light leading-relaxed text-lg">
                  <p>
                    Every Avoire fragrance begins its journey at the source. We
                    travel to Iranian saffron fields, Indian oud forests, and
                    Grasse lavender valleys to hand-select the raw materials that
                    will define each composition.
                  </p>
                  <p>
                    Back in our atelier, our perfumers spend months layering
                    these essences &mdash; adjusting, refining, and aging each
                    blend until it achieves a depth and character that is
                    unmistakably Avoire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Experience — Text Left, Image Right ─── */}
      <section className="bg-[#f3eadf]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex items-center px-8 md:px-16 lg:px-20 py-20 lg:py-24 order-2 lg:order-1">
              <div className="max-w-lg space-y-8">
                <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                    The Experience
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-display leading-tight">
                  Designed to
                  <br />
                  <span className="italic font-normal">Evolve.</span>
                </h2>

                <div className="space-y-5 text-[#5a5a5a] font-light leading-relaxed text-lg">
                  <p>
                    An Avoire fragrance is never static. Each scent is designed
                    to unfold over hours &mdash; a bright opening that gives way
                    to a warm heart, settling into a rich, lasting base that
                    becomes uniquely yours.
                  </p>
                  <p>
                    We believe a fragrance should feel like a second skin. It
                    should draw people closer, spark memories, and leave an
                    impression long after you&rsquo;ve left the room.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden min-h-[420px] lg:min-h-[640px] order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#dccab8] to-[#cbb49e]">
                <img
                  src="/fragrance.jpg"
                  alt="The Avoire fragrance experience"
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

      {/* ─── Values Pillars ─── */}
      <section className="py-24 md:py-32 px-6 bg-[#f7efe6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                What We Stand For
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display">
              Our <span className="italic font-normal">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
            {[
              {
                icon: Gem,
                title: "Uncompromising Quality",
                text: "We never cut corners. Every ingredient is evaluated for purity, potency, and provenance before it enters our atelier.",
              },
              {
                icon: FlaskConical,
                title: "Small-Batch Integrity",
                text: "Each fragrance is produced in limited quantities, ensuring the care and precision that mass production cannot replicate.",
              },
              {
                icon: Leaf,
                title: "Conscious Luxury",
                text: "From ethically sourced raw materials to fully recyclable packaging, sustainability is woven into every decision we make.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center space-y-6 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-[#dccab8] rounded-full bg-[#fffcf9]">
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-[#1a1a1a] opacity-60"
                  />
                </div>
                <h3 className="text-[11px] uppercase tracking-[0.25em] font-bold">
                  {title}
                </h3>
                <p className="text-[15px] font-light leading-relaxed text-[#5a5a5a] max-w-xs mx-auto">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Journey / Milestones ─── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 border border-[#1a1a1a]/10 rounded-full mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50">
                Our Journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display">
              The Path <span className="italic font-normal">So Far</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-[#dccab8] -translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-8 md:gap-16 ${
                    i % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse md:text-right"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[23px] md:left-1/2 w-3 h-3 bg-[#1a1a1a] rounded-full -translate-x-1/2 mt-1.5 z-10 ring-4 ring-[#f3eadf]" />

                  {/* Content */}
                  <div
                    className={`pl-14 md:pl-0 md:w-1/2 ${
                      i % 2 === 0 ? "md:pr-16" : "md:pl-16"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.25em] font-bold opacity-35 block mb-2">
                      {item.year}
                    </span>
                    <p className="text-lg font-display">{item.text}</p>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA to Shop ─── */}
      <section className="bg-[#1a1a1a] text-white py-24 md:py-32 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-display leading-tight">
            Experience the{" "}
            <span className="italic font-normal">Collection</span>
          </h2>

          <p className="font-light text-lg opacity-50 max-w-md mx-auto leading-relaxed">
            Discover your signature scent from our curated selection of rare,
            hand-blended fragrances.
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-14 py-4 bg-white text-[#1a1a1a] text-[11px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97] group"
          >
            Shop Now
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
