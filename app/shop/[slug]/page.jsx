// /shop/[slug]/page.jsx
"use client";

import React, { useState } from 'react';
import {
     ShoppingBag,
     Heart,
     Plus,
     Minus,
     Search,
     Star,
     ChevronRight,
     ChevronLeft,
     ShieldCheck,
     Truck,
     RotateCcw,
     Instagram,
     Twitter,
     Facebook
} from 'lucide-react';
import { perfumes } from '../data';
import { useParams } from "next/navigation";
import ShopSection from '@/app/Components/ShopSection';
import Link from 'next/link';

export default function Page() {
     const { slug } = useParams();
          const [cartCount, setCartCount] = useState(0);
     const [quantity, setQuantity] = useState(1);
     const [selectedImage, setSelectedImage] = useState(0);
     const [isWishlisted, setIsWishlisted] = useState(false);
     const perfume = perfumes.find(p => p.slug === slug);
          if (!perfume) return <div className="p-20 text-3xl">Product not found</div>;

     // Mock data for the current perfume


     // Recommendations


     const colors = {
          bg: 'bg-[#f3eadf]',
          card: 'bg-[#fffcf9]',
          border: 'border-[#dccab8]',
          text: 'text-[#1a1a1a]',
          muted: 'text-[#5a5a5a]'
     };

     return (
          <div className={`min-h-screen ${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans ${colors.text}`}>
               <style>
                    {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-display { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          
          /* Custom scrollbar for gallery */
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
               </style>

               {/* Header */}
               <header className="sticky top-0 z-50 bg-[#f3eadf]/80 backdrop-blur-md border-b border-[#dccab8]">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                         <div className="flex items-center space-x-8">
                              <button className="hover:opacity-50"><Search size={20} /></button>
                              <button className="hidden md:block text-[11px] uppercase tracking-widest font-bold">Collections</button>
                         </div>
                         <h1 className="text-2xl font-display tracking-[0.4em] uppercase font-bold cursor-pointer">AVOIRE</h1>
                         <div className="flex items-center space-x-8">
                              <button className="hidden md:block text-[11px] uppercase tracking-widest font-bold">Account</button>
                              <button className="relative group">
                                   <ShoppingBag size={20} />
                                   <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                   </span>
                              </button>
                         </div>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto px-6 py-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest opacity-40 mb-12">
                         <span>Home</span>
                         <ChevronRight size={10} />
                         <span>Collections</span>
                         <ChevronRight size={10} />
                         <span className="font-bold text-black opacity-100">{perfume.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                         {/* Left: Image Gallery (7/12 cols) */}
                         <div className="lg:col-span-7 space-y-4">
                              <div className={`relative aspect-[4/5] ${colors.card} border ${colors.border} rounded-3xl overflow-hidden`}>

                                   <img
                                        src={perfume.image}
                                        alt={perfume.name}
                                        className="w-full h-full object-cover"
                                   />

                                   {/* Left arrow */}
                                   <button className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors">
                                        <ChevronLeft size={20} />
                                   </button>

                                   {/* Right arrow */}
                                   <button className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors">
                                        <ChevronRight size={20} />
                                   </button>

                              </div>

                              {/* Thumbnails */}
                              <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-2">
                                   {/* {perfume.images.map((img, idx) => (
                                        <button
                                             key={idx}
                                             onClick={() => setSelectedImage(idx)}
                                             className={`flex-shrink-0 w-24 aspect-square rounded-xl border-2 transition-all ${selectedImage === idx ? 'border-black' : 'border-[#dccab8] opacity-60'}`}
                                        >
                                             <div className={`w-full h-full ${colors.card} rounded-lg flex items-center justify-center text-[8px] uppercase font-bold tracking-tighter`}>
                                                  View {idx + 1}
                                             </div>
                                        </button>
                                   ))} */}
                              </div>
                         </div>

                         {/* Right: perfume Details (5/12 cols) */}
                         <div className="lg:col-span-5 space-y-10">
                              <section className="space-y-4">
                                   <div className="flex justify-between items-start">
                                        <div>
                                             <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40">{perfume.note}</span>
                                             <h1 className="text-5xl font-display mt-2">{perfume.name}</h1>
                                        </div>
                                        <button
                                             onClick={() => setIsWishlisted(!isWishlisted)}
                                             className={`p-3 rounded-full border ${colors.border} transition-colors ${isWishlisted ? 'bg-black text-white' : 'hover:bg-white'}`}
                                        >
                                             <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                        </button>
                                   </div>

                                   <div className="flex items-center space-x-4">
                                        <p className="text-3xl font-light">${perfume.price}.00</p>
                                        <div className="h-4 w-[1px] bg-black/10" />
                                        <div className="flex items-center space-x-1">
                                             {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="black" />)}
                                             <span className="text-[10px] font-bold ml-2 underline underline-offset-4 tracking-widest">(48 REVIEWS)</span>
                                        </div>
                                   </div>
                              </section>

                              <section className="space-y-6">
                                   <p className="text-[#5a5a5a] leading-relaxed font-light text-lg italic">
                                        {perfume.desc}
                                   </p>

                                   <div className="space-y-4 pt-4 border-t border-[#dccab8]">
                                        <details className="group cursor-pointer">
                                             <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold">
                                                  Composition
                                                  <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                             </summary>
                                             <p className="pt-4 text-xs leading-loose opacity-60 font-sans">{perfume.composition}</p>
                                        </details>
                                        <details className="group cursor-pointer">
                                             <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold">
                                                  How to Wear
                                                  <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                             </summary>
                                             <p className="pt-4 text-xs leading-loose opacity-60 font-sans">{perfume.usage}</p>
                                        </details>
                                   </div>
                              </section>

                              {/* Controls */}
                              <div className="space-y-6">
                                   <div className="flex items-center space-x-4">
                                        <div className="flex items-center border border-[#dccab8] rounded-full p-2 h-14 w-32 justify-between">
                                             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
                                                  <Minus size={16} />
                                             </button>
                                             <span className="font-bold text-lg">{quantity}</span>
                                             <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
                                                  <Plus size={16} />
                                             </button>
                                        </div>

                                        <button
                                             onClick={() => setCartCount(c => c + quantity)}
                                             className="flex-1 h-14 bg-[#1a1a1a] text-white text-[12px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10"
                                        >
                                             Add to Shopping Bag
                                        </button>
                                   </div>

                                   <div className="grid grid-cols-3 gap-4 pt-6 text-[9px] uppercase tracking-widest font-bold text-center opacity-60">
                                        <div className="space-y-2 flex flex-col items-center">
                                             <Truck size={18} />
                                             <span>Free Shipping</span>
                                        </div>
                                        <div className="space-y-2 flex flex-col items-center border-x border-[#dccab8]">
                                             <RotateCcw size={18} />
                                             <span>30-Day Returns</span>
                                        </div>
                                        <div className="space-y-2 flex flex-col items-center">
                                             <ShieldCheck size={18} />
                                             <span>Secure Checkout</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* You May Also Like Section */}
                    <section className="mt-32">
                         <div className="flex items-end justify-between mb-12 border-b border-[#dccab8] pb-6">
                              <h2 className="text-4xl font-display italic">You May Also <span className="not-italic">Like</span></h2>
                              <Link href="/shop"  className="text-[11px] uppercase tracking-[0.2em] font-bold pb-1 border-b border-black">View All</Link>
                         </div>

                         <ShopSection />
                    </section>
               </main>


          </div>
     );
}
