

//cart
"use client";
import React from "react";
import {
     ShoppingBag,
     X,
     Plus,
     Minus,
     ArrowRight,
     Heart,
     ShieldCheck,
     Truck,
     DeleteIcon
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import CartCard from "../Components/CartCard";

const Page = () => {
     const { cartItems, removeFromCart, updateQty } = useCart();

     const updateQuantity = (_id, delta) => {
          const item = cartItems.find((i) => i._id === _id);
          if (!item) return;
          const newQty = Math.max(1, (item.qty ?? 1) + delta);
          updateQty(_id, newQty);
     };

     const subtotal = cartItems.reduce(
          (acc, item) => acc + (item.price * (item.qty ?? 1)),
          0
     );
     const shipping = 0;
     const total = subtotal + shipping;

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent selection:text-text-inverse py-24">
               <main className="max-w-7xl mx-auto px-page-x py-16">
                  

                    {cartItems.length > 0 ? (
                         <>
                              <h2 className="text-headline-xl font-headline mb-12">
                                   Your <span className="italic">Shopping Bag</span>
                              </h2>
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                              {/* Left: Item List */}
                              <div className="lg:col-span-8 space-y-8">
                                   {cartItems.map((item) => (
                                        <div
                                             key={item._id}
                                             className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-8 border-b border-border-subtle group"
                                        >
                                             {/* Product Info */}
                                             <div className="col-span-1 md:col-span-6 flex items-center space-x-6">
                                                  <div className="w-24 h-32 bg-bg-card border border-border-default rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                                       <div className="w-8 h-12 border border-accent/10 rounded-t-lg rounded-b-sm" />
                                                       <button
                                                            onClick={() => removeFromCart(item._id)}
                                                            className="absolute top-2 left-2 p-1.5 bg-white border border-border-default rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 text-red-500"
                                                       >
                                                            <X size={12} />
                                                       </button>
                                                  </div>
                                                  <div className="space-y-1">
                                                       <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted">
                                                            {item.note}
                                                       </p>
                                                       <h3 className="text-xl font-headline">{item.name}</h3>
                                                       <p className="text-ui text-text-muted font-light">
                                                            {item.size} — {item.image}
                                                       </p>
                                                       <div className="flex items-center space-x-4 pt-2">
                                                            <button className="text-[10px] uppercase tracking-widest font-bold text-text-disabled hover:text-accent transition-colors flex items-center gap-1">
                                                                 <Heart size={12} /> Save for later
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>

                                             {/* Quantity Controller */}
                                             <div className="col-span-1 md:col-span-3 flex justify-center">
                                                  <div className="flex items-center border border-border-default rounded-full p-1 h-11 w-28 justify-between bg-bg-card">
                                                       <button
                                                            onClick={() => updateQuantity(item._id, -1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-bg-subtle rounded-full transition-colors"
                                                       >
                                                            <Minus size={14} />
                                                       </button>
                                                       <span className="text-ui font-bold">{item.qty ?? 1}</span>
                                                       <button
                                                            onClick={() => updateQuantity(item._id, 1)}
                                                            className="w-8 h-8 flex items-center justify-center hover:bg-bg-subtle rounded-full transition-colors"
                                                       >
                                                            <Plus size={14} />
                                                       </button>
                                                  </div>
                                             </div>

                                             {/* Price */}
                                             {/* Price + Delete */}
                                             <div className="col-span-1 md:col-span-3 flex items-center justify-end gap-4">
                                                  <div className="text-right">
                                                       <p className="text-lg font-headline font-bold">
                                                            ${(item.price * (item.qty ?? 1)).toFixed(2)}
                                                       </p>
                                                       <p className="text-[10px] text-text-disabled font-bold tracking-widest">
                                                            ${item.price} each
                                                       </p>
                                                  </div>

                                                  {/* Delete Button */}
                                                  <button
                                                       onClick={() => removeFromCart(item._id)}
                                                       className="p-2 rounded-full border border-border-default hover:bg-red-50 hover:border-red-200 text-red-500 transition"
                                                  >
                                                       <DeleteIcon size={16} />
                                                  </button>
                                             </div>
                                        </div>
                                   ))}
                              </div>

                              {/* Right: Summary Box */}
                              <CartCard subtotal={subtotal.toFixed(2)} 
                              total={total.toFixed(2)} />
                              
                         </div>
                         </>
                    ) : (
                              <div className="text-center h-max-screen py-20 space-y-8">
                                   {/* Icon */}
                                   <div className="w-24 h-24 bg-bg-subtle border border-border-default rounded-full flex items-center justify-center mx-auto text-text-disabled">
                                        <ShoppingBag size={34} />
                                   </div>

                                   {/* Text */}
                                   <div className="space-y-3">
                                        <h3 className="text-3xl font-headline">Your bag is empty</h3>
                                        <p className="text-text-muted max-w-sm mx-auto font-light leading-relaxed">
                                             Discovery awaits. Explore our collections of rare essences and find your signature scent.
                                        </p>
                                   </div>

                                   {/* Button */}
                                   <Link
                                        href="/shop"
                                        className="inline-flex items-center justify-center h-14 px-10 bg-accent text-text-inverse text-[12px] uppercase tracking-[0.35em] font-bold rounded-full hover:bg-accent-hover transition-all active:scale-95 shadow-lg shadow-accent/10"
                                   >
                                        Return to Shop
                                   </Link>
                              </div>
                    )}
               </main>
          </div>
     );
};

export default Page;

