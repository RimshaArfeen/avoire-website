"use client"
import React from 'react';
import {
     Instagram,
     Twitter,
     Facebook,
     ArrowRight
} from 'lucide-react';

const Footer = () => {
     // Using the semantic color tokens provided in your globals.css
     const footerLinks = {
          collections: ["Limited Edition", "The Classics", "Travel Sets", "Sample Kits"],
          company: ["Our Story", "The Atelier", "Sustainability", "Careers"],
          support: ["Shipping & Returns", "Contact Us", "FAQ", "Store Locator"]
     };

     return (
               <footer className="bg-bg-page border-t border-border-default pt-24 pb-12 px-page-x selection:bg-accent selection:text-text-inverse lg:px-20">
                    <div className="max-w-7xl mx-auto">
                         {/* Top Section: Branding & Links */}
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

                              {/* Column 1: Brand & Newsletter (4 cols) */}
                              <div className="lg:col-span-4 space-y-10">
                                   <div className="space-y-4">
                                        <h2 className="text-2xl font-headline tracking-[0.4em] uppercase font-bold text-text-primary">AVOIRE</h2>
                                        <p className="text-body-sm text-text-muted max-w-xs font-light leading-relaxed">
                                             Crafting sensory experiences through rare essences. Designed in Paris, inspired by the world.
                                        </p>
                                   </div>

                                   <div className="space-y-6">
                                        <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary">The Newsletter</h3>
                                        <div className="relative max-w-sm">
                                             <input
                                             suppressHydrationWarning
                                                  type="email"
                                                  placeholder="Enter your email"
                                                  className="w-full bg-transparent border-b border-border-strong py-3 text-ui focus:outline-none placeholder:text-text-disabled transition-all focus:border-accent"
                                             />
                                             <button className="absolute right-0 bottom-3 hover:translate-x-1 transition-transform text-accent">
                                                  <ArrowRight size={18} />
                                             </button>
                                        </div>
                                        <p className="text-[10px] text-text-disabled uppercase tracking-widest leading-relaxed">
                                             Join our list for exclusive releases and scent stories.
                                        </p>
                                   </div>
                              </div>

                              {/* Link Columns (6 cols total) */}
                              <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
                                   <div className="space-y-6">
                                        <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary">Collections</h3>
                                        <ul className="space-y-4">
                                             {footerLinks.collections.map(link => (
                                                  <li key={link}>
                                                       <a href="#" className="text-ui text-text-muted hover:text-accent transition-colors nav-link-underline">{link}</a>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>

                                   <div className="space-y-6">
                                        <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary">Maison</h3>
                                        <ul className="space-y-4">
                                             {footerLinks.company.map(link => (
                                                  <li key={link}>
                                                       <a href="#" className="text-ui text-text-muted hover:text-accent transition-colors nav-link-underline">{link}</a>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>

                                   <div className="space-y-6">
                                        <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary">Help</h3>
                                        <ul className="space-y-4">
                                             {footerLinks.support.map(link => (
                                                  <li key={link}>
                                                       <a href="#" className="text-ui text-text-muted hover:text-accent transition-colors nav-link-underline">{link}</a>
                                                  </li>
                                             ))}
                                        </ul>
                                   </div>
                              </div>

                              {/* Social Column (2 cols) */}
                              <div className="lg:col-span-2 space-y-6">
                                   <h3 className="text-caption font-bold tracking-[0.2em] uppercase text-text-primary">Connect</h3>
                                   <div className="flex lg:flex-col gap-6">
                                        <a href="#" className="flex items-center gap-3 text-ui text-text-muted hover:text-accent transition-all group">
                                             <Instagram size={18} />
                                             <span className="hidden lg:block nav-link-underline">Instagram</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 text-ui text-text-muted hover:text-accent transition-all group">
                                             <Twitter size={18} />
                                             <span className="hidden lg:block nav-link-underline">Twitter</span>
                                        </a>
                                        <a href="#" className="flex items-center gap-3 text-ui text-text-muted hover:text-accent transition-all group">
                                             <Facebook size={18} />
                                             <span className="hidden lg:block nav-link-underline">Facebook</span>
                                        </a>
                                   </div>
                              </div>
                         </div>

                         {/* Bottom Bar */}
                         <div className="pt-12 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
                              <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-text-disabled">
                                   <span>&copy; 2024 AVOIRE PARFUMS</span>
                                   <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                                   <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                              </div>

                              <div className="flex items-center gap-4 text-text-disabled">
                                   <span className="text-[10px] uppercase tracking-[0.3em] font-bold">FR / EN</span>
                              </div>
                         </div>
                    </div>
               </footer>
     );
};

export default Footer;