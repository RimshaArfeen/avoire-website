"use client"
import React, { useState } from 'react';
import {
     Instagram,
     Twitter,
     Facebook,
     ArrowRight,
     Globe,
     CreditCard
} from 'lucide-react';

/**
 * Avoire a Perfume - Senior UI/UX Footer Component
 * Updated with internal routing links: Home, About, Shop, Product, and Contact.
 */
const Footer = () => {
     const [email, setEmail] = useState('');

     const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Subscribed:', email);
          setEmail('');
     };

     const footerLinks = {
          navigation: [
               { label: 'Home', href: '/' },
               { label: 'About Us', href: '/about' },
               { label: 'Shop All', href: '/shop' },
               { label: 'Contact Us', href: '/contact-us' },
          ],
          collections: [
               { label: 'Ocean Whisper', href: '/shop/ocean-whisper' },
               { label: 'Spice Mirage', href: '/shop/spice-mirage' },
               { label: 'Rose Elixir', href: '/shop/rose-elixir' },
               { label: 'Velvet Amber', href: '/shop/velvet-amber' },
          ],
          legal: [
               { label: 'Privacy Policy', href: '/privacy' },
               { label: 'Terms of Service', href: '/terms-of-service' },
               // { label: 'Accessibility', href: '#' },
          ],
     };

     return (
          <footer className="bg-accent text-text-inverse pt-20 pb-10 px-page-x font-sans">
               <div className="max-w-7xl mx-auto">

                    {/* Top Section: Newsletter & Brand Identity */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">

                         {/* Brand Info */}
                         <div className="lg:col-span-5 flex flex-col justify-between">
                              <div className="space-y-6">
                                   <h2 className="text-headline-lg font-headline tracking-tight uppercase">
                                        Avoire <span className="font-light italic">a Perfume</span>
                                   </h2>
                                   <p className="text-body-sm max-w-md text-white/70 leading-relaxed">
                                        Crafting olfactory poetry since 1924. Each bottle of Avoire is a
                                        symphony of rare botanicals and timeless elegance, designed to
                                        linger in memory as much as on skin.
                                   </p>
                              </div>

                              <div className="mt-8 flex gap-5">
                                   <SocialIcon Icon={Instagram} />
                                   <SocialIcon Icon={Twitter} />
                                   <SocialIcon Icon={Facebook} />
                              </div>
                         </div>

                         
                    </div>

                    {/* Middle Section: Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 py-16 text-sm md:text-lg">
                         <FooterColumn title="Explore" links={footerLinks.navigation} />
                         <FooterColumn title="Collections" links={footerLinks.collections} />

                         <div className="space-y-6">
                              <h4 className="text-ui font-headline uppercase tracking-widest text-white/40">Visit Us</h4>
                              <div className="space-y-4">
                                   <p className="text-body-sm text-white/70">
                                        1600 Pennsylvania Ave NW<br /> Washington, DC, United States
                                   </p>
                                   <a
                                        href="https://www.google.com/maps?q=1600+Pennsylvania+Ave+NW,+Washington,+DC"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-body-sm text-white/70 hover:text-white transition-colors underline underline-offset-4"
                                   >
                                        View on Map
                                   </a>
                              </div>
                         </div>

                         <div className="space-y-6">
                              <h4 className="text-ui font-headline uppercase tracking-widest text-white/40">Concierge</h4>
                              <div className="space-y-4">
                                   <p className="text-body-sm text-white/70">
                                        concierge@avoire.com
                                   </p>
                                   <p className="text-body-sm text-white/70">
                                        +33 (0) 1 42 25 00 00
                                   </p>
                                   <a href="/contact" className="text-body-sm text-white/70 hover:text-white transition-colors block">
                                        Customer Support
                                   </a>
                              </div>
                         </div>
                    </div>

                    {/* Bottom Bar: Legals & Regional */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                         <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
                              <span className="text-caption text-white/40">© 2024 Avoire a Perfume.</span>
                              {footerLinks.legal.map((link, idx) => (
                                   <a key={idx} href={link.href} className="text-caption text-white/40 hover:text-white transition-colors underline-offset-4 hover:underline">
                                        {link.label}
                                   </a>
                              ))}
                         </div>

                         {/* <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2 text-caption text-white/60 hover:text-white transition-colors cursor-pointer">
                                   <Globe size={14} />
                                   <span>International (EN)</span>
                              </div>
                              {/* <div className="flex gap-3 text-white/30">
                                   <CreditCard size={20} strokeWidth={1.5} />
                                   <div className="w-8 h-5 bg-white/10 rounded-sm" />
                                   <div className="w-8 h-5 bg-white/10 rounded-sm" />
                              </div> 
                         </div> */}
                    </div>
               </div>
          </footer>
     );
};

const FooterColumn = ({ title, links }) => (
     <div className="space-y-6">
          <h4 className="text-ui font-headline uppercase tracking-widest text-white/40">{title}</h4>
          <ul className="space-y-3">
               {links.map((link, idx) => (
                    <li key={idx}>
                         <a
                              href={link.href}
                              className="text-body-sm text-white/70 hover:text-white transition-colors block nav-link-underline w-fit"
                         >
                              {link.label}
                         </a>
                    </li>
               ))}
          </ul>
     </div>
);

const SocialIcon = ({ Icon }) => (
     <a
          href="#"
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-accent transition-all duration-300 group"
     >
          <Icon size={18} className="group-hover:scale-110 transition-transform" />
     </a>
);

export default Footer;