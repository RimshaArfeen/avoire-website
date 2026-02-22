

// checkout
"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, ChevronLeft, Lock, CreditCard, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartCard from "../Components/CartCard";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
     const [step, setStep] = useState(1);
     const [loading, setLoading] = useState(false);
     const [successMsg, setSuccessMsg] = useState("");
     const { data: session, status } = useSession();

     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postCode: "",
          country: "Pakistan"
     });
     useEffect(() => {
          if (status === "unauthenticated") {
               router.push("/login");
          }
     }, [status]);
     const { cartItems, clearCart } = useCart();
     if (status === "loading") return null;

     const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.qty ?? 1)), 0);
     const shipping = 0;
     const total = subtotal + shipping;

     const StepIndicator = ({ number, title, active }) => (
          <div className={`flex items-center space-x-3 ${active ? "opacity-100" : "opacity-40"}`}>
               <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${active ? "bg-text-primary text-text-inverse" : ""}`}>{number}</span>
               <span className="text-caption font-bold tracking-widest uppercase">{title}</span>
          </div>
     );

     const handlePlaceOrder = async () => {
          setLoading(true);
          try {
               const orderData = {
                    items: cartItems.map(i => ({
                         productId: i._id,
                         name: i.name,
                         price: i.price,
                         qty: i.qty || 1
                    })),
                    total,
                    shippingAddress: {
                         fullName: `${formData.firstName} ${formData.lastName}`,
                         address: formData.address,
                         city: formData.city,
                         postalCode: formData.postCode,
                         country: formData.country
                    }
               };

               const res = await fetch("/api/orders/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
               });

               const result = await res.json();

               if (result.success) {
                    clearCart();
                    setSuccessMsg("Order placed successfully ✨");
                    setStep(1);
                    setFormData({ firstName: "", lastName: "", address: "", city: "", postCode: "", country: "Pakistan" });
               } else {
                    setSuccessMsg(result.error || "Failed to place order. Try again.");
               }
          } catch (err) {
               console.error(err);
               setSuccessMsg("Server error. Try again.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent">
               {/* Header */}
               <header className="border-b border-border-default bg-bg-page/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-page-x h-20 flex justify-between items-center">
                         <Link href="/cart" className="flex items-center space-x-2 text-[10px] font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
                              <ChevronLeft size={14} />
                              <span>Back to Bag</span>
                         </Link>
                         <h1 className="text-xl font-headline tracking-[0.4em] uppercase font-bold">AVOIRE</h1>
                         <div className="flex items-center space-x-2 text-text-muted">
                              <Lock size={14} />
                              <span className="text-[10px] font-bold tracking-widest uppercase">Secure</span>
                         </div>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto px-page-x py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                         {/* Left: Forms */}
                         <div className="lg:col-span-7 space-y-12">
                              {/* Steps */}
                              <div className="flex flex-wrap gap-8 pb-12 border-b border-border-subtle">
                                   <StepIndicator number="1" title="Shipping" active={step === 1} />
                                   <ChevronRight size={14} className="opacity-20 self-center" />
                                   <StepIndicator number="2" title="Payment" active={step === 2} />
                                   <ChevronRight size={14} className="opacity-20 self-center" />
                                   <StepIndicator number="3" title="Review" active={step === 3} />
                              </div>

                              {/* Step 1: Shipping */}
                              <section className={step !== 1 ? "opacity-40 pointer-events-none" : ""}>
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="text" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="md:col-span-2 w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Post Code" value={formData.postCode} onChange={e => setFormData({ ...formData, postCode: e.target.value })} className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                   </div>
                                   {step === 1 && (
                                        <button onClick={() => setStep(2)} className="mt-12 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all">
                                             Continue to Payment
                                        </button>
                                   )}
                              </section>

                              {/* Step 2: Payment */}
                              <section className={step < 2 ? "hidden" : step > 2 ? "opacity-40" : ""}>
                                   <div className="space-y-4">
                                        <div className="p-6 border border-accent bg-bg-card rounded-xl flex items-center justify-between">
                                             <div className="flex items-center space-x-4">
                                                  <CreditCard size={20} className="text-accent" />
                                                  <div>
                                                       <p className="text-ui font-bold">Credit Card</p>
                                                       <p className="text-caption text-text-muted">Visa, Mastercard, Amex</p>
                                                  </div>
                                             </div>
                                             <CheckCircle2 size={20} className="text-accent" />
                                        </div>
                                   </div>
                                   {step === 2 && (
                                        <button onClick={() => setStep(3)} className="mt-12 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all">
                                             Review Order
                                        </button>
                                   )}
                              </section>

                              {/* Step 3: Review */}
                              <section className={step < 3 ? "hidden" : ""}>
                                   {successMsg && <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 text-sm font-semibold">{successMsg}</div>}
                                   <button onClick={handlePlaceOrder} className="w-full h-16 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center shadow-xl shadow-accent/10 hover:bg-accent-active transition-all">
                                        {loading ? "Processing..." : `Pay $${total.toFixed(2)} — Place Order`}
                                   </button>
                              </section>
                         </div>

                         {/* Right: Order Summary */}
                         <CartCard subtotal={subtotal.toFixed(2)} total={total.toFixed(2)} />
                    </div>
               </main>
          </div>
     );
};

export default CheckoutPage;