"use client";

import React, { useState, useEffect } from 'react';
import {
     Heart,
     Plus,
     Minus,
     Star,
     ChevronRight,
     ChevronLeft,
     ShieldCheck,
     Truck,
     RotateCcw
} from 'lucide-react';
import { useParams } from "next/navigation";
import ShopSection from '@/app/Components/ShopSection';
import Link from 'next/link';
import AddCart from '@/app/Components/AddCart';
import { useCart } from '@/app/context/CartContext';

export default function Page() {
     const { slug } = useParams();
     const { addToCart, cartItems } = useCart(); // get cartItems to count
     const [product, setProduct] = useState(null);
     const [quantity, setQuantity] = useState(1);
     const [isWishlisted, setIsWishlisted] = useState(false);

     // Fetch product from API
     useEffect(() => {
          async function loadProduct() {
               const res = await fetch(`/api/products/${slug}`, { cache: "no-store" });
               if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
               }
          }
          loadProduct();
     }, [slug]);

     if (!product) return <div className="p-20 text-3xl">Loading product...</div>;

     const colors = {
          bg: 'bg-[#f3eadf]',
          card: 'bg-[#fffcf9]',
          border: 'border-[#dccab8]',
          text: 'text-[#1a1a1a]',
          muted: 'text-[#5a5a5a]'
     };

     const handleAddToCart = () => {
          const normalized = {
               ...product,
               _id: product._id ?? product.id ?? product.title
          };
          addToCart(normalized, quantity);
     };

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent selection:text-text-inverse">

          <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24">
               {/* Breadcrumbs */}
               <nav className=" w-fit flex items-center space-x-2 text-[10px] uppercase tracking-widest text-amber-50/60 mb-12 relative top-24 p-2 px-4 border-2 rounded-full bg-accent-active">
                    <a href="/" className="hover:cursor-pointer">Home</a>
                    <ChevronRight size={10} />
                         <a href="/shop" className="hover:cursor-pointer">Collections</a>
                    <ChevronRight size={10} />
                         <span className="font-bold text-amber-50">{product.name}</span>
               </nav>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 py-32">
                         {/* Left: Visuals */}
                         <div className="lg:col-span-7">
                              <div className="relative aspect-[4/5] bg-bg-card border border-border-default rounded-[2rem] overflow-hidden group">
                                   {/* Image */}
                                   <img
                                        src={`/${product.images?.[0]}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-[2rem]"
                                   />

                                   {/* Gradient overlay on hover */}
                                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                   {/* Info tag */}
                                   <div className="absolute bottom-8 left-8">
                                        <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border border-border-subtle shadow-sm">
                                             100ml / 3.4 fl. oz.
                                        </span>
                                   </div>
                              </div>
                         </div>

                    {/* Right: Detailed Content */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                         <div className="space-y-8">
                              <div className="flex justify-between items-start">
                                   <div className="space-y-2">
                                        <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-accent/50">{product.note}</span>
                                        <h1 className="text-5xl md:text-6xl font-headline leading-tight tracking-tight">{product.name}</h1>
                                   </div>
                                   <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-4 rounded-full border transition-all duration-500 ${isWishlisted
                                                  ? 'bg-accent text-text-inverse border-accent'
                                                  : 'border-border-default hover:bg-bg-subtle'
                                             }`}
                                        aria-label="Add to Wishlist"
                                   >
                                        <Heart size={20} strokeWidth={1.5} fill={isWishlisted ? "currentColor" : "none"} />
                                   </button>
                              </div>

                              <div className="flex items-baseline space-x-4">
                                   <p className="text-3xl font-headline">${product.price.toFixed(2)}</p>
                                   <span className="text-caption text-text-disabled uppercase tracking-widest">Tax Included</span>
                              </div>

                              <p className="text-text-muted leading-relaxed font-light text-lg italic">
                                   "{product.description}"
                              </p>

                              {/* Accents/Accordions */}
                              <div className="space-y-4 pt-8 border-t border-border-default">
                                   <details className="group cursor-pointer">
                                        <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold py-2">
                                             Composition
                                             <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <p className="pt-4 text-xs leading-loose text-text-muted font-sans border-t border-border-subtle mt-2">
                                             {product.composition}
                                        </p>
                                   </details>

                                   <details className="group cursor-pointer">
                                        <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold py-2">
                                             How to Wear
                                             <Plus size={14} className="group-open:rotate-45 transition-transform" />
                                        </summary>
                                        <p className="pt-4 text-xs leading-loose text-text-muted font-sans border-t border-border-subtle mt-2">
                                             {product.usage}
                                        </p>
                                   </details>
                              </div>

                              {/* Purchase Controls */}
                              <div className="space-y-6 pt-8">
                                   <div className="flex items-center space-x-4">
                                        <div className="flex items-center border border-border-strong rounded-full p-1 h-14 w-36 justify-between bg-bg-card shadow-sm">
                                             <button
                                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                  className="w-10 h-10 flex items-center justify-center hover:bg-accent hover:text-text-inverse rounded-full transition-all"
                                             >
                                                  <Minus size={14} />
                                             </button>
                                             <span className="font-bold text-lg px-2">{quantity}</span>
                                             <button
                                                  onClick={() => setQuantity(quantity + 1)}
                                                  className="w-10 h-10 flex items-center justify-center hover:bg-accent hover:text-text-inverse rounded-full transition-all"
                                             >
                                                  <Plus size={14} />
                                             </button>
                                        </div>

                                        <button className="flex-1 h-14 bg-accent text-text-inverse text-[12px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-accent-hover transition-all active:scale-95 shadow-xl shadow-accent/20">
                                             Add to Shopping Bag
                                        </button>
                                   </div>

                                   {/* Trust Badges */}
                                   <div className="grid grid-cols-3 gap-4 pt-8 text-[9px] uppercase tracking-widest font-bold text-center text-text-muted">
                                        <div className="space-y-3 flex flex-col items-center group">
                                             <Truck size={20} className="group-hover:text-accent transition-colors" />
                                             <span>Free Shipping</span>
                                        </div>
                                        <div className="space-y-3 flex flex-col items-center border-x border-border-default group">
                                             <RotateCcw size={20} className="group-hover:text-accent transition-colors" />
                                             <span>30-Day Returns</span>
                                        </div>
                                        <div className="space-y-3 flex flex-col items-center group">
                                             <ShieldCheck size={20} className="group-hover:text-accent transition-colors" />
                                             <span>Secure Checkout</span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Similar Items Section */}
               <section className="mt-40 border-t border-border-default pt-20">
                    <div className="flex items-end justify-between mb-16">
                         <h2 className="text-4xl md:text-5xl font-headline tracking-tight">
                              You May Also <span className="italic font-normal">Like</span>
                         </h2>
                         <a href="#" className="text-[11px] uppercase tracking-[0.2em] font-bold pb-1 border-b border-text-primary hover:text-accent hover:border-accent transition-all">
                              Explore All
                         </a>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                         {[1, 2, 3, 4].map((item) => (
                              <div key={item} className="group cursor-pointer space-y-6">
                                   <div className="aspect-[3/4] bg-bg-card border border-border-subtle rounded-2xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="w-full h-full flex items-center justify-center opacity-30 group-hover:scale-110 transition-transform duration-700">
                                             <div className="w-8 h-20 border border-text-primary rounded-t-lg" />
                                        </div>
                                   </div>
                                   <div className="text-center space-y-1">
                                        <h3 className="text-[12px] font-bold uppercase tracking-widest">Fragrance No. {item}</h3>
                                        <p className="text-caption text-text-muted">$195.00</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </section>
          </main>
          </div>
//           <div className={`min-h-screen ${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans ${colors.text}`}>

//                <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
//                     {/* Breadcrumbs */}
//                     <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest opacity-40 mb-12">
//                          <span>Home</span>
//                          <ChevronRight size={10} />
//                          <span>Collections</span>
//                          <ChevronRight size={10} />
//                          <span className="font-bold text-black opacity-100">{product.name}</span>
//                     </nav>

//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
//                          {/* Left: Image */}
//                          <div className="lg:col-span-7">
//                               <div className={`relative aspect-[4/5] ${colors.card} border ${colors.border} rounded-3xl overflow-hidden`}>
//                                    <img src={`/${product.images?.[0]}`} alt={product.name} className="w-full h-full object-cover" />
//                               </div>
//                          </div>
// </div>
//                          {/* Right: Details */}
//                          <div className="lg:col-span-5 space-y-10">
//                               <div className="flex justify-between items-start">
//                                    <div>
//                                         <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40">{product.note}</span>
//                                         <h1 className="text-5xl font-display mt-2">{product.name}</h1>
//                                    </div>
//                                    <button
//                                         onClick={() => setIsWishlisted(!isWishlisted)}
//                                         className={`p-3 rounded-full border ${colors.border} transition-colors ${isWishlisted ? 'bg-black text-white' : 'hover:bg-white'}`}
//                                    >
//                                         <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
//                                    </button>
//                               </div>

//                               <p className="text-[#5a5a5a] leading-relaxed font-light text-lg italic">{product.description}</p>

//                               <div className="flex items-center space-x-4">
//                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button>
//                                    <span>{quantity}</span>
//                                    <button onClick={() => setQuantity(quantity + 1)}><Plus /></button>
//                                    <AddCart onClick={handleAddToCart} />
//                               <section className="space-y-6">
//                                    <p className="text-[#5a5a5a] leading-relaxed font-light text-lg italic">
//                                         {product.description}
//                                    </p>

//                                    <div className="space-y-4 pt-4 border-t border-[#dccab8]">
//                                         <details className="group cursor-pointer">
//                                              <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold">
//                                                   Composition
//                                                   <Plus size={14} className="group-open:rotate-45 transition-transform" />
//                                              </summary>
//                                              <p className="pt-4 text-xs leading-loose opacity-60 font-sans">{product.composition}</p>
//                                         </details>
//                                         <details className="group cursor-pointer">
//                                              <summary className="flex justify-between items-center list-none text-[11px] uppercase tracking-[0.2em] font-bold">
//                                                   How to Wear
//                                                   <Plus size={14} className="group-open:rotate-45 transition-transform" />
//                                              </summary>
//                                              <p className="pt-4 text-xs leading-loose opacity-60 font-sans">{product.usage}</p>
//                                         </details>
//                                    </div>
//                               </section>

//                               {/* Controls */}
//                               <div className="space-y-6">
//                                    <div className="flex items-center space-x-4">
//                                         <div className="flex items-center border border-[#dccab8] rounded-full p-2 h-14 w-32 justify-between">
//                                              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
//                                                   <Minus size={16} />
//                                              </button>
//                                              <span className="font-bold text-lg">{quantity}</span>
//                                              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors">
//                                                   <Plus size={16} />
//                                              </button>
//                                         </div>

//                                         <button
//                                              onClick={() => {}}
//                                              className="flex-1 h-14 bg-[#1a1a1a] text-white text-[12px] uppercase tracking-[0.4em] font-bold rounded-full hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10"
//                                         >
//                                              Add to Shopping Bag
//                                         </button>
//                                    </div>

//                                    <div className="grid grid-cols-3 gap-4 pt-6 text-[9px] uppercase tracking-widest font-bold text-center opacity-60">
//                                         <div className="space-y-2 flex flex-col items-center">
//                                              <Truck size={18} />
//                                              <span>Free Shipping</span>
//                                         </div>
//                                         <div className="space-y-2 flex flex-col items-center border-x border-[#dccab8]">
//                                              <RotateCcw size={18} />
//                                              <span>30-Day Returns</span>
//                                         </div>
//                                         <div className="space-y-2 flex flex-col items-center">
//                                              <ShieldCheck size={18} />
//                                              <span>Secure Checkout</span>
//                                         </div>
//                                    </div>
//                               </div>
//                          </div>
//                     </div>

//                     {/* You May Also Like */}
//                     <section className="mt-32">
//                          <div className="flex items-end justify-between mb-12 border-b border-[#dccab8] pb-6">
//                               <h2 className="text-4xl font-display italic">You May Also <span className="not-italic">Like</span></h2>
//                               <Link href="/shop" className="text-[11px] uppercase tracking-[0.2em] font-bold pb-1 border-b border-black">View All</Link>
//                          </div>

//                          <ShopSection />
//                     </section>
//                </main>
//           </div>
     );
}