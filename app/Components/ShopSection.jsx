"use client"
import React, { useState } from 'react';
import {
     Heart,
     Star,
} from 'lucide-react';
import { useProducts } from "@/app/context/ProdContext"; 
import { slugify } from '../utils';

const ShopSection = () => {
       const [wishlist, setWishlist] = useState([]);
       const [quantities, setQuantities] = useState({});
     const { products } = useProducts();
     if (!products.length) return <p className="p-10">Loading products...</p>;
     const toggleWishlist = (id) => {
          setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
     };

     const colors = {
          bg: 'bg-[#f3eadf]',
          card: 'bg-[#fffcf9]',
          border: 'border-[#dccab8]',
          text: 'text-[#1a1a1a]',
          muted: 'text-[#5a5a5a]'
     };

     return (
          <div className={`${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans ${colors.text}`}>
               <div className="max-w-7xl mx-auto">
                    {/* Editorial Title & Filter Bar */}
                    {/* <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
                         <div>
                              <h2 className="text-5xl md:text-7xl font-display leading-tight">
                                   The <span className="italic font-normal">Fragrance</span> <br /> Atelier.
                              </h2>
                              <p className="mt-4 text-[#5a5a5a] font-light max-w-sm">Explore our curations of the world's finest olfactory experiences, from the heart of Paris.</p>
                         </div>
                         <div className="flex items-center space-x-6 border-b border-[#dccab8] pb-2 cursor-pointer">
                              <SlidersHorizontal size={16} />
                              <span className="text-[11px] uppercase tracking-[0.2em] font-bold">Filter by Notes</span>
                              <ChevronDown size={14} className="opacity-40" />
                         </div>
                    </div> */}

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                         {products.slice(0,4)
                         .map((perfume) => (
                              <div key={perfume.id} className="group product-card">
                                   {/* Image Container with Hover Overlay */}
                                   <div className={`relative aspect-[4/5] ${colors.card} border ${colors.border} rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2`}>
                                        {/* Placeholder for Bottle Image */}
                                        <div className="absolute inset-0">
                                             <img
                                                  src={`/${perfume.images?.[0]}`}
                                                  alt={perfume.name}
                                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                             />
                                        </div>

                                        {/* Wishlist Button */}
                                        <button
                                             onClick={() => toggleWishlist(perfume.id)}
                                             className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-20 ${wishlist.includes(perfume.id) ? 'bg-[#1a1a1a] text-white' : 'bg-white/80 text-black hover:bg-black hover:text-white'}`}
                                        >
                                             <Heart size={16} fill={wishlist.includes(perfume.id) ? "currentColor" : "none"} />
                                        </button>

                                        {/* Description Overlay */}
                                        <div className="description-overlay absolute inset-0 bg-black/80 text-white p-8 flex flex-col justify-end opacity-0 transform translate-y-0 transition-all duration-500 pointer-events-none">
                                             <p className="text-sm font-light leading-relaxed italic">
                                                  "{perfume.shortDescription}"
                                             </p>
                                             <div className="mt-4 flex space-x-1">
                                                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill="white" />)}
                                             </div>
                                        </div>
                                   </div>

                                   {/* Product Info */}
                                   <div className="mt-6 space-y-4 text-center px-2">
                                        <div>
                                             <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40 mb-1">{perfume.note}</h3>
                                             <a href={`/shop/${slugify(perfume.name)}`}
                                                  className="text-xl font-display font-bold">{perfume.name}</a>
                                             <p className="text-lg font-light mt-1">${perfume.price}.00</p>
                                        </div>

                                        {/* Quantity & Add to Cart Container */}
                                        <div className="pt-2 flex items-center justify-between space-x-2">
                                        

                                             <button
                                                  onClick={() => {}}
                                                  className="flex-1 h-10 bg-[#1a1a1a] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-black transition-all active:scale-95"
                                             >
                                                  Add to Bag
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>


               </div>
          </div>
     );
}

export default ShopSection
