"use client";
import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  Plus,
  Star,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import AddCart from "../Components/AddCart";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/LikeContext";
import WishlistBtn from "../Components/WishlistBtn";
import { useProducts } from "../context/ProdContext";

const App = () => {
  const [itemQuantity, setItemQuantity] = useState(1);
  const [filter, setFilter] = useState(""); // "", "price-asc", "price-desc", "best-selling"
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, likedItems } = useWishlist();
  const { products } = useProducts();

  const colors = {
    bg: "bg-[#f3eadf]",
    card: "bg-[#fffcf9]",
    border: "border-[#dccab8]",
    text: "text-[#1a1a1a]",
    muted: "text-[#5a5a5a]",
  };

  const handleAddToCart = (product) => {
    const normalized = { ...product, _id: product._id ?? product.id ?? product.title };
    addToCart(normalized, itemQuantity);
  };

  const filteredProducts = useMemo(() => {
    let sorted = [...products];
    if (filter === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (filter === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (filter === "best-selling") sorted.sort((a, b) => a.stock - b.stock);
    return sorted;
  }, [products, filter]);

  return (
    <div className={`min-h-screen ${colors.bg} selection:bg-[#1a1a1a] selection:text-white font-sans text-text-primary py-24`}>
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        {/* Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
          <div>
            <h2 className="text-5xl md:text-7xl font-display leading-tight">
              The <span className="italic font-normal">Fragrance</span> <br /> Atelier.
            </h2>
            <p className="mt-4 text-[#5a5a5a] font-light max-w-sm">
              Explore our curations of the world's finest olfactory experiences, from the heart of Paris.
            </p>
          </div>

          {/* Filter Button */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 border-b border-[#dccab8] pb-2 px-2 font-bold text-[11px] uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <SlidersHorizontal size={16} />
              <span>Filter</span>
              <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#dccab8] rounded-md shadow-lg z-50">
                <ul className="flex flex-col">
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "" ? "font-bold" : ""}`}
                    onClick={() => { setFilter(""); setDropdownOpen(false); }}
                  >
                    Default
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "price-asc" ? "font-bold" : ""}`}
                    onClick={() => { setFilter("price-asc"); setDropdownOpen(false); }}
                  >
                    Price: Low to High
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "price-desc" ? "font-bold" : ""}`}
                    onClick={() => { setFilter("price-desc"); setDropdownOpen(false); }}
                  >
                    Price: High to Low
                  </li>
                  <li
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${filter === "best-selling" ? "font-bold" : ""}`}
                    onClick={() => { setFilter("best-selling"); setDropdownOpen(false); }}
                  >
                    Best Selling / Low Stock
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((perfume) => (
            <div key={perfume.id} className="group product-card">
              <div className={`relative aspect-[4/5] ${colors.card} border ${colors.border} rounded-2xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2`}>
                <img
                  src={`/${perfume.images?.[0]}`}
                  alt={perfume.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-30">
                  <WishlistBtn
                    isFavorite={likedItems.some(item => item.id === perfume.id)}
                    onClick={() => addToWishlist(perfume)}
                  />
                </div>
                <div className="description-overlay absolute inset-0 bg-black/80 text-white p-8 flex flex-col justify-end opacity-0 transform translate-y-0 transition-all duration-500 pointer-events-none">
                  <p className="text-sm font-light leading-relaxed italic">
                    "{perfume.shortDescription}"
                  </p>
                  <div className="mt-4 flex space-x-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill="white" />)}
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-center px-2">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold opacity-40 mb-1">{perfume.note}</h3>
                  <a href={`/shop/${perfume.slug}`} className="text-xl font-display font-bold">{perfume.name}</a>
                  <p className="text-lg font-light mt-1">${perfume.price}.00</p>
                </div>
                <div className="pt-2 flex items-center justify-between space-x-2">
                  <AddCart onClick={() => handleAddToCart(perfume)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;