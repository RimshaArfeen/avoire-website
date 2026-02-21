

"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, ChevronDown } from 'lucide-react';

const App = () => {
     const [loading, setLoading] = useState(false)

     const [formState, setFormState] = useState({
          name: '',
          email: '',
          subject: '',
          message: ''
     });
     const [submitted, setSubmitted] = useState(false);

     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          try {
               const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formState)
               });

               if (res.ok) {
                    setSubmitted(true);
                    setTimeout(() => setSubmitted(false), 5000);
               }
          } finally {
               setLoading(false);
          }
          setFormState({
               name: '',
               email: '',
               subject: '',
               message: ''
          })
     };

     const colors = {
          bg: 'bg-[#f3eadf]',
          accent: 'text-[#1a1a1a]',
          muted: 'text-[#5a5a5a]',
          card: 'bg-[#fffcf9]',
          border: 'border-[#dccab8]'
     };

     return (
          <div className={`min-h-screen ${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans text-[#1a1a1a]`}>
               {/* Load Fonts and Reset Focus Styles */}
               <style>
                    {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          
          .font-display { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }

          /* Globally remove focus outlines for a custom UI feel */
          input:focus, textarea:focus, select:focus {
            outline: none !important;
            box-shadow: none !important;
          }
        `}
               </style>

               {/* Navigation Branding */}
               <nav className="p-8 flex justify-center">
                    <h1 className="text-3xl font-display tracking-[0.3em] uppercase font-bold">
                         AVOIRE
                    </h1>
               </nav>

               <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                         {/* Left Side: Editorial Content */}
                         <div className="space-y-12">
                              <header className="space-y-6">
                                   <div className="inline-block px-3 py-1 border border-black/10 rounded-full">
                                        <span className="uppercase tracking-[0.2em] text-[10px] font-semibold opacity-60">Customer Concierge</span>
                                   </div>
                                   <h2 className="text-6xl md:text-8xl font-display leading-[0.9] text-[#1a1a1a]">
                                        Refined <br />
                                        <span className="italic font-normal">Connection.</span>
                                   </h2>
                                   <p className="max-w-md text-lg leading-relaxed text-[#5a5a5a] font-sans font-light">
                                        Our advisors are available to assist you with fragrance selections, order tracking, or boutique appointments.
                                   </p>
                              </header>

                              <div className="space-y-8 pt-10 border-t border-[#dccab8]">
                                   <div className="group flex items-center space-x-6 cursor-default">
                                        <div className="p-4 bg-white/40 rounded-full border border-[#dccab8] group-hover:bg-white transition-colors">
                                             <MapPin size={18} />
                                        </div>
                                        <div>
                                             <h4 className="font-sans font-semibold uppercase tracking-widest text-[11px] mb-1 opacity-50">Atelier</h4>
                                             <p className="font-display text-xl italic">122 Champs-Élysées, Paris</p>
                                        </div>
                                   </div>

                                   <div className="group flex items-center space-x-6 cursor-default">
                                        <div className="p-4 bg-white/40 rounded-full border border-[#dccab8] group-hover:bg-white transition-colors">
                                             <Mail size={18} />
                                        </div>
                                        <div>
                                             <h4 className="font-sans font-semibold uppercase tracking-widest text-[11px] mb-1 opacity-50">Email</h4>
                                             <p className="font-display text-xl italic">concierge@avoire.com</p>
                                        </div>
                                   </div>
                              </div>

                              <div className="flex space-x-6 pt-4">
                                   <button className="p-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                        <Instagram size={18} />
                                   </button>
                                   <button className="p-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                        <Twitter size={18} />
                                   </button>
                                   <button className="p-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                        <Facebook size={18} />
                                   </button>
                              </div>
                         </div>

                         {/* Right Side: Contact Form */}
                         <div className="relative">
                              <div className="absolute inset-0 bg-black/5 blur-[120px] rounded-full transform translate-y-12 scale-75 -z-10" />

                              <div className={`p-8 md:p-14 ${colors.card} border ${colors.border} rounded-3xl shadow-2xl relative overflow-hidden`}>
                                   {/* Subtle texture overlay */}
                                   <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                                   {submitted ? (
                                        <div className="text-center py-24 space-y-6 animate-in fade-in zoom-in duration-700">
                                             <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1a1a1a] text-white rounded-full mb-2">
                                                  <Send size={28} />
                                             </div>
                                             <h3 className="text-3xl font-display italic">Merci Beaucoup</h3>
                                             <p className="text-[#5a5a5a] font-sans max-w-xs mx-auto">Your message has been safely delivered to our Parisian atelier.</p>
                                             <button
                                                  onClick={() => setSubmitted(false)}
                                                  className="mt-8 text-[11px] tracking-[0.3em] uppercase font-bold text-[#1a1a1a] hover:opacity-50"
                                             >
                                                  Return to form
                                             </button>
                                        </div>
                                   ) : (
                                        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                                             <div className="space-y-10">
                                                  <div className="relative">
                                                       <input
                                                            required
                                                            type="text"
                                                            id="name"
                                                            className="peer w-full bg-transparent border-b border-[#dccab8] py-3 focus:border-black transition-colors placeholder-transparent font-sans"
                                                            placeholder="Name"
                                                            value={formState.name}
                                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                       />
                                                       <label htmlFor="name" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#1a1a1a]">
                                                            Full Name
                                                       </label>
                                                  </div>

                                                  <div className="relative">
                                                       <input
                                                            required
                                                            type="email"
                                                            id="email"
                                                            className="peer w-full bg-transparent border-b border-[#dccab8] py-3 focus:border-black transition-colors placeholder-transparent font-sans"
                                                            placeholder="Email"
                                                            value={formState.email}
                                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                       />
                                                       <label htmlFor="email" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#1a1a1a]">
                                                            Email Address
                                                       </label>
                                                  </div>

                                                  <div className="relative">
                                                       <select
                                                            className="peer w-full bg-transparent border-b border-[#dccab8] py-3 focus:border-black transition-colors appearance-none cursor-pointer font-sans text-black/60"
                                                            value={formState.subject}
                                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                       >
                                                            <option value="">Inquiry Type</option>
                                                            <option value="Eternal Oud">Eternal Oud Collection</option>
                                                            <option value="Bespoke">Bespoke Fragrance</option>
                                                            <option value="Event">Event Partnership</option>
                                                       </select>
                                                       <ChevronDown size={14} className="absolute right-0 top-4 pointer-events-none opacity-40" />
                                                  </div>

                                                  <div className="relative">
                                                       <textarea
                                                            required
                                                            rows="3"
                                                            id="message"
                                                            className="peer w-full bg-transparent border-b border-[#dccab8] py-3 focus:border-black transition-colors resize-none placeholder-transparent font-sans"
                                                            placeholder="Message"
                                                            value={formState.message}
                                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                       ></textarea>
                                                       <label htmlFor="message" className="absolute left-0 -top-3.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#1a1a1a] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-black/30 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-[#1a1a1a]">
                                                            Your Message
                                                       </label>
                                                  </div>
                                             </div>

                                                  <button
                                                       type="submit"
                                                       disabled={loading}
                                                       className="group w-full py-6 bg-[#1a1a1a] text-white uppercase tracking-[0.4em] text-[11px] font-bold hover:bg-black transition-all active:scale-[0.99] flex items-center justify-center space-x-4 shadow-xl shadow-black/10 disabled:opacity-70 disabled:cursor-not-allowed"
                                                  >
                                                       {loading ? (
                                                            <>
                                                                 <span>Sending</span>
                                                                 <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <span>Send Message</span>
                                                                 <Send size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                            </>
                                                       )}
                                                  </button>
                                        </form>
                                   )}
                              </div>
                         </div>
                    </div>
               </main>

               <footer className="mt-20 py-16 border-t border-[#dccab8] text-center">
                    <p className="text-[10px] tracking-[0.4em] opacity-40 font-bold">EST. 2024 — AVOIRE PARFUMERIE</p>
               </footer>
          </div>
     );
};

export default App;