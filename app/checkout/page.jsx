

// checkout
"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, ChevronLeft, Lock, CreditCard, CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartCard from "../Components/CartCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const CheckoutPage = () => {
     const [step, setStep] = useState(1);
     const [loading, setLoading] = useState(false);
     const [successMsg, setSuccessMsg] = useState("");
     const { data: session, status } = useSession();
     const router = useRouter()
     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email:"",
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
     const shipping = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 30;
               const total = subtotal + shipping;

     const StepIndicator = ({ number, title, active }) => (
          <div
               className={`flex items-center space-x-3 ${active ? "opacity-100" : "opacity-40"}`}>
               <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${active ? "bg-text-primary text-text-inverse" : ""}`}>{number}</span>
               <span
                    className="text-caption font-bold tracking-widest uppercase">{title}</span>
          </div>
     );

     const validateForm = () => {
          const nameRegex = /^[A-Za-z]{4,}$/;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const codeRegex = /^[0-9]+$/;

          if (!nameRegex.test(formData.firstName))
               return "First name must be letters only and at least 4 characters.";
          if (!nameRegex.test(formData.lastName))
               return "Last name must be letters only and at least 4 characters.";
          if (!emailRegex.test(formData.email))
               return "Invalid email address.";
          if (!codeRegex.test(formData.postCode))
               return "Post code must contain numbers only.";
          return null;
     };
     const handlePlaceOrder = async () => {
          setLoading(true);
          // Run validations
          

          if (total === 0) {
               setLoading(false);
               return Swal.fire({
                    icon: "warning",
                    title: "Your cart is empty",
                    text: "Add something before placing order.",
                    confirmButtonText: "Go to Shop",
                    confirmButtonColor: "#000"
               }).then(() => router.push("/shop"));
          }
         
          
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
                         email:formData.email,
                         address: formData.address,
                         city: formData.city,
                         postalCode: formData.postCode,
                         country: formData.country
                    }
               };
               if (!formData.firstName || !formData.address || !formData.city) {
                    setLoading(false);
                    return Swal.fire("Missing info", "Please fill shipping details", "warning");
               }
               const res = await fetch("/api/orders/create", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
               });

               const result = await res.json();

               if (result.success) {
                    await Swal.fire({
                         icon: "success",
                         title: "Order Placed!",
                         text: "Your order has been placed successfully.",
                         confirmButtonColor: "#000",
                         confirmButtonText: "Continue Shopping"
                    });

                    clearCart();
                    router.push("/");
                    setStep(1);
                    setFormData({ firstName: "", lastName: "", email: "", address: "", city: "", postCode: "", country: "Pakistan" });
               } else {
                    setSuccessMsg(result.error || "Failed to place order. Try again.");
               }
          } catch (err) {
               console.error(err);
               Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: "Something went wrong. Please try again."
               });
          }        
               finally {
               setLoading(false);
          }
     };

     if (total === 0) {
return(
          <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
               <ShoppingBag size={60} className="opacity-40" />
               <h2 className="text-2xl font-headline">Your cart is empty</h2>
               <p className="text-text-muted">Add something to your cart to continue</p>

               <Link
                    href="/shop"
                    className="px-10 h-14 flex items-center justify-center rounded-full bg-accent text-text-inverse uppercase tracking-widest text-sm font-bold hover:bg-accent-hover transition"
               >
                    Go to Shop
               </Link>
          </div>

)

     }
     return (
          <div
               className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent py-24">
      
               <main
                    className=" w-full mx-auto px-page-x py-16 lg:py-24">
                    <div
                         className="grid grid-cols-1  lg:flex lg:flex-row justify-around gap-20">
                         {/* Left: Forms */}
                         <div
                              className="lg:col-span-7 space-y-12">
                              {/* Steps */}
                              <div
                                   className="flex flex-wrap gap-8 pb-12 border-b border-border-subtle">
                                   <StepIndicator number="1" title="Shipping" active={step === 1} />
                                   <ChevronRight size={14}
                                        className="opacity-20 self-center" />
                                   <StepIndicator number="2" title="Payment" active={step === 2} />
                                   <ChevronRight size={14}
                                        className="opacity-20 self-center" />
                                   <StepIndicator number="3" title="Review" active={step === 3} />
                              </div>

                              {/* Step 1: Shipping */}
                              <section
                                   className={step !== 1 ? "opacity-40 pointer-events-none" : ""}>
                                   <div
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input type="text" placeholder="First Name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                             className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                             className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                             className="md:col-span-2 w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Address" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}

                                             className="md:col-span-2 w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                       
                                        <input type="text" placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                                             className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                        <input type="text" placeholder="Post Code" value={formData.postCode} onChange={e => setFormData({ ...formData, postCode: e.target.value })}
                                             className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3" />
                                   </div>
                                   {step === 1 && (
                                        <button onClick={() => {
                                             const errorMsg = validateForm();
                                             if (errorMsg) {
                                                  setLoading(false);
                                                  return Swal.fire("Invalid input", errorMsg, "warning");
                                             }
                                             setStep(2)}
                                        }
                                             className="mt-12 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all">
                                             Continue to Payment
                                        </button>
                                   )}
                              </section>

                              {/* Step 2: Payment */}
                              <section
                                   className={step < 2 ? "hidden" : step > 2 ? "opacity-40" : ""}>
                                   <div
                                        className="space-y-4">
                                        <div
                                             className="p-6 border border-accent bg-bg-card rounded-xl flex items-center justify-between">
                                             <div
                                                  className="flex items-center space-x-4">
                                                  <CreditCard size={20}
                                                       className="text-accent" />
                                                  <div>
                                                       <p
                                                            className="text-ui font-bold">Credit Card</p>
                                                       <p
                                                            className="text-caption text-text-muted">Visa, Mastercard, Amex</p>
                                                  </div>
                                             </div>
                                             <CheckCircle2 size={20}
                                                  className="text-accent" />
                                        </div>
                                   </div>
                                   {step === 2 && (
                                        <button onClick={() => setStep(3)}
                                             className="mt-12 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all">
                                             Review Order
                                        </button>
                                   )}
                              </section>

                              {/* Step 3: Review */}
                              <section
                                   className={step < 3 ? "hidden" : ""}>
                                   {subtotal < 200 && (
                                        <Link href="/shop" className="w-full h-16 mb-8  bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center shadow-xl shadow-accent/10 hover:bg-accent-active transition-all">
                                             Add ${(200 - subtotal).toFixed(2)} more for free shipping
                                        </Link>
                                   )}
                                   <button onClick={handlePlaceOrder}
                                        className="w-full h-16 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center shadow-xl shadow-accent/10 hover:bg-accent-active transition-all">
                                        {loading ? "Processing..." : `Pay $${total.toFixed(2)} — Place Order`}
                                   </button>
                              </section>
                         </div>

                         {/* Right: Order Summary */}
                         <CartCard
                              cartItems={cartItems}
                              subtotal={subtotal.toFixed(2)}
                              shipping={shipping.toFixed(2)}
                              total={total.toFixed(2)}
                         />                   
                         </div>
               </main>
          </div>
     );
};

export default CheckoutPage;