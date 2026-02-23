

//wishlistpage
"use client"
import React, { useState } from 'react';
import {
     Heart,
     ShoppingBag,
     X,
     ArrowRight,
     Share2,
     Plus,
     ChevronLeft,
     Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useWishlist } from "@/app/context/LikeContext";
import AddCart from '../Components/AddCart';
import { useCart } from '../context/CartContext';
import ShopSection from '../Components/ShopSection';

const page = () => {
     const [itemQuantity, setItemQuantity] = useState(1);
     const { addToCart } = useCart();
     const { likedItems, removeFromWishlist } = useWishlist();

     const handleAddToCart = (product) => {
          const normalized = {
               ...product,
               _id: product._id ?? product.id ?? product.title
          };
          addToCart(normalized, itemQuantity);
     };

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent py-24">
             
              

               <main className="max-w-7xl mx-auto px-page-x py-16 lg:py-24">
                    {/* Page Title Section */}
                    <div className="mb-16 md:flex justify-between items-end gap-8">
                         <div className="space-y-4">
                              <div className="flex items-center space-x-3 text-accent text-ui font-bold uppercase tracking-widest">
                                   <Sparkles size={16} />
                                   <span>Curated Selection</span>
                              </div>
                              <h2 className="text-headline-xl font-headline leading-tight">
                                   Your <span className="italic">Private</span> <br /> Collection
                              </h2>
                         </div>
                         <div className="mt-8 md:mt-0">
                              <p className="text-text-muted text-ui max-w-xs font-light mb-6">
                                   A refined list of your most desired essences. Your selections are saved for your next visit to the atelier.
                              </p>

                         </div>
                    </div>

                    {likedItems.length > 0 ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                              {likedItems.map((item) => (
                                   <div key={item.id} className="group relative">
                                        {/* Image Container */}
                                        <div className="aspect-[4/5] bg-bg-card border border-border-default rounded-2xl overflow-hidden relative flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-accent/5">

                                             {/* Product Image */}
                                             <img
                                                  src={`/${item.images?.[0]}`}
                                                  alt={item.name}
                                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                             />

                                             {/* Actions Overlay */}
                                             <div className="absolute inset-0 bg-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                             {/* Add to Cart & Remove buttons */}
                                             <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2">
                                                  <div className="w-full hover:cursor-pointer bg-accent text-text-inverse rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg">
                                                       <AddCart onClick={() => handleAddToCart(item)} />
                                                  </div>
                                                  <button
                                                       className="w-full hover:cursor-pointer bg-red-700 p-2 text-text-inverse rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg"
                                                       onClick={() => removeFromWishlist(item.id)}
                                                  >
                                                       Remove
                                                  </button>
                                             </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-6 space-y-2">
                                             <div className="flex justify-between items-start">
                                                  <div>
                                                       <p className="text-[10px] uppercase tracking-widest font-bold text-text-disabled">{item.collection}</p>
                                                       <h3 className="text-xl font-headline group-hover:text-accent transition-colors">{item.name}</h3>
                                                  </div>
                                                  <p className="text-lg font-headline font-bold">${item.price}</p>
                                             </div>

                                             <div className="flex items-center space-x-3 text-caption text-text-muted font-light italic">
                                                  <span>{item.note}</span>
                                                  <span className="w-1 h-1 bg-border-strong rounded-full" />
                                                  <span className="text-[9px] uppercase tracking-tighter not-italic font-bold text-accent">{item.status}</span>
                                             </div>
                                        </div>
                                   </div>
                              ))}

                              {/* Empty Slot / CTA */}
                              <div className="border-2 border-dashed border-border-default rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                                   <Link href="/shop"
                                        className="w-12 h-12 rounded-full border border-border-strong flex items-center justify-center group-hover:bg-accent group-hover:text-text-inverse transition-all">
                                        <Plus size={20} />
                                   </Link>
                                   <p className="text-ui font-bold uppercase tracking-widest">Add more</p>
                              </div>
                         </div>
                    ) : (
                         <div className="text-center py-32 space-y-8 border border-border-subtle rounded-3xl bg-bg-card">
                              <div className="w-24 h-24 bg-bg-subtle rounded-full flex items-center justify-center mx-auto text-text-disabled">
                                   <Heart size={40} strokeWidth={1} />
                              </div>
                              <div className="space-y-2">
                                   <h3 className="text-2xl font-headline">Your collection is empty</h3>
                                   <p className="text-text-muted font-light max-w-xs mx-auto">Begin your olfactory journey and save the scents that speak to your soul.</p>
                              </div>
                              <button className="px-12 py-4 bg-accent text-text-inverse rounded-full uppercase tracking-[0.2em] text-[11px] font-bold flex items-center mx-auto space-x-3 group">
                                   <span>Explore Fragrances</span>
                                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                         </div>
                    )}

                    {/* Recommendations Section */}
                    <section className="mt-32 pt-16 border-t border-border-default">
                         <h3 className="text-caption font-bold tracking-[0.3em] uppercase mb-12 text-center">You might also desire</h3>
                         <ShopSection />
                    </section>
               </main>


          </div>
     );
};

export default page;