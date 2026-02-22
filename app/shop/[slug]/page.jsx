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
          <div className={`min-h-screen ${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans ${colors.text}`}>
               <Navbar variant="solid" />

               <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-[10px] uppercase tracking-widest opacity-40 mb-12">
                         <span>Home</span>
                         <ChevronRight size={10} />
                         <span>Collections</span>
                         <ChevronRight size={10} />
                         <span className="font-bold text-black opacity-100">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                         {/* Left: Image */}
                         <div className="lg:col-span-7">
                              <div className={`relative aspect-[4/5] ${colors.card} border ${colors.border} rounded-3xl overflow-hidden`}>
                                   <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              </div>
                         </div>
</div>
                         {/* Right: Details */}
                         <div className="lg:col-span-5 space-y-10">
                              <div className="flex justify-between items-start">
                                   <div>
                                        <span className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40">{product.note}</span>
                                        <h1 className="text-5xl font-display mt-2">{product.name}</h1>
                                   </div>
                                   <button
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`p-3 rounded-full border ${colors.border} transition-colors ${isWishlisted ? 'bg-black text-white' : 'hover:bg-white'}`}
                                   >
                                        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                                   </button>
                              </div>

                              <p className="text-[#5a5a5a] leading-relaxed font-light text-lg italic">{product.description}</p>

                              <div className="flex items-center space-x-4">
                                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button>
                                   <span>{quantity}</span>
                                   <button onClick={() => setQuantity(quantity + 1)}><Plus /></button>
                                   <AddCart onClick={handleAddToCart} />
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
                                             onClick={() => {}}
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

                    {/* You May Also Like */}
                    <section className="mt-32">
                         <div className="flex items-end justify-between mb-12 border-b border-[#dccab8] pb-6">
                              <h2 className="text-4xl font-display italic">You May Also <span className="not-italic">Like</span></h2>
                              <Link href="/shop" className="text-[11px] uppercase tracking-[0.2em] font-bold pb-1 border-b border-black">View All</Link>
                         </div>

                         <ShopSection />
                    </section>
               </main>
          </div>
     );
}