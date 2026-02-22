"use client";

import React, { useState, useEffect } from 'react';
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
               {/* Header */}
               <header className="sticky top-0 z-50 bg-[#f3eadf]/80 backdrop-blur-md border-b border-[#dccab8]">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                         <h1 className="text-2xl font-display tracking-[0.4em] uppercase font-bold cursor-pointer">AVOIRE</h1>
                         <div className="relative group">
                              <ShoppingBag size={20} />
                              <span className="absolute -top-2 -right-2 bg-[#1a1a1a] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                   {cartItems.length}
                              </span>
                         </div>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto px-6 py-12">
                    {/* Breadcrumb */}
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