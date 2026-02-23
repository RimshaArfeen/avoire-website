import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from "lucide-react";

const CartCard = ({ total, subtotal, shipping, cartItems, className }) => {
     return (
          <div className={`w-full sticky top-32 ${className || "lg:w-[40%]"}`}>
               <div className="bg-bg-card border border-border-default rounded-3xl p-8 shadow-sm">
                    <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary mb-8 border-b border-border-subtle pb-4">
                         Order Summary
                    </h3>

                    {/* Scrollable Cart Items */}
                    {cartItems && cartItems.length > 0 && (
                         <div className="bg-focus-ring  text-text-inverse rounded-xl p-4 mb-6 max-h-64 overflow-y-auto space-y-3">
                              {cartItems.map(item => (
                                   <div key={item._id} className="flex justify-between items-center">
                                        <div>
                                             <p className="font-bold">{item.name}</p>
                                             <p className="text-sm text-text-inverse">{item.qty} x ${item.price}</p>
                                        </div>
                                        <span className="font-bold">${(item.qty * item.price).toFixed(2)}</span>
                                   </div>
                              ))}
                         </div>
                    )}

                    {/* Subtotal, Shipping, Total */}
                    <div className="space-y-4 mb-8">
                         <div className="flex justify-between text-ui">
                              <span className="text-text-muted">Subtotal</span>
                              <span className="font-bold">${subtotal}</span>
                         </div>
                         <div className="flex justify-between text-ui">
                              <span className="text-text-muted">Shipping</span>
                              <span className="text-accent font-bold uppercase tracking-widest">
                                   {shipping === 0 ? "FREE SHIPPING" : `$${shipping}`}
                              </span>
                         </div>
                         <div className="flex justify-between text-ui">
                              <span className="text-text-muted">Estimated Tax</span>
                              <span className="font-bold">$0.00</span>
                         </div>
                    </div>

                    <div className="pt-6 border-t border-border-strong mb-10">
                         <div className="flex justify-between items-end">
                              <span className="text-caption font-bold tracking-widest uppercase">Total</span>
                              <span className="text-3xl font-headline font-bold">{total}</span>
                         </div>
                    </div>

                    <Link href="/checkout" className="w-full bg-accent text-text-inverse h-16 rounded-full font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center group hover:bg-accent-hover transition-all active:scale-95 shadow-xl shadow-accent/10">
                         Proceed to Checkout
                         <ArrowRight size={18} className="ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="mt-8 space-y-4">
                         <div className="flex items-center space-x-3 text-[10px] text-text-disabled uppercase tracking-widest font-bold justify-center">
                              <ShieldCheck size={14} />
                              <span>Secure encrypted checkout</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CartCard