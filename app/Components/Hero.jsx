"use client";
import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background — gradient acts as elegant fallback when no image is present */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2018] to-[#0d0d0d]">
        <img
          src="/images/hero.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        <div className="inline-block px-5 py-2 border border-white/20 rounded-full mb-10">
          <span className="text-[10px] uppercase tracking-[0.35em] font-medium opacity-70">
            Est. 2024 &mdash; Paris
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-display leading-[0.95] mb-8">
          The Art of
          <br />
          <span className="italic font-normal">Olfactory</span> Elegance.
        </h1>

        <p className="text-lg md:text-xl font-light opacity-50 max-w-lg mx-auto mb-14 leading-relaxed">
          Rare essences, crafted in the heart of Paris.
        </p>

        <Link
          href="/shop"
          className="inline-block px-14 py-4 bg-white text-[#1a1a1a] text-[11px] uppercase tracking-[0.3em] font-bold rounded-full hover:bg-white/90 transition-all duration-300 active:scale-[0.97]"
        >
          Explore the Collection
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
