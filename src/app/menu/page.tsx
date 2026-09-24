'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Plus, Check, Star, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Product, CategoryType } from '@/types';

function MenuContent() {
  const { addPresetProduct } = useCart();
  const searchParams = useSearchParams();
  const catParam = searchParams?.get('cat') as CategoryType | null;

  const [activeCategory, setActiveCategory] = useState<CategoryType>(catParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
    }
  }, [catParam]);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addPresetProduct(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-8 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#E6392F] mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 fill-[#E6392F]" />
            <span className="tracking-widest uppercase">THE FULL FOUNTAIN CATALOG</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black text-[#171717] tracking-tight leading-none mb-3">
            THE MENU
          </h1>
          <p className="text-sm sm:text-base text-[#7A6B56]">
            Every drink is handcrafted to order with triple-filtered carbonation, pure cane sugar syrups, and velvety cold foam crowns.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-[#A8987E] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search by name, ingredient (e.g. cherry, foam, boba)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-[#E8D9BD] text-sm font-semibold focus:outline-none focus:border-[#E6392F] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-xs text-[#A8987E] hover:text-[#171717] font-bold"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryType)}
                  className={`px-5 py-2.5 rounded-xl font-display text-base tracking-wider shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-md'
                      : 'bg-white border border-[#E8D9BD] text-[#7A6B56] hover:text-[#171717] hover:border-[#171717]'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#FAF2E2] rounded-3xl border border-[#E8D9BD] p-8 max-w-lg mx-auto">
            <span className="text-5xl block mb-3">🥤</span>
            <h3 className="font-display text-2xl font-bold text-[#171717] mb-1">
              NO SODA MATCHES THAT
            </h3>
            <p className="text-xs text-[#7A6B56] mb-4">
              Can&apos;t find what you&apos;re craving? You can build it completely custom in our studio!
            </p>
            <Link
              href="/build"
              className="inline-block px-6 py-3 rounded-xl bg-[#E6392F] text-white font-display text-lg tracking-wider"
            >
              BUILD YOUR OWN SODA
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => {
              const isAdded = addedId === product.id;

              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-3xl p-4 sm:p-5 border border-[#E8D9BD] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#171717]/40 overflow-hidden"
                >
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#171717] text-[#FFF8ED] shadow-xs">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Star Rating */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[11px] font-bold text-[#171717] border border-[#E8D9BD]">
                    <Star className="w-3 h-3 fill-[#FFB000] text-[#FFB000]" />
                    <span>{product.rating}</span>
                  </div>

                  {/* Product Image */}
                  <Link
                    href={`/menu/${product.slug}`}
                    className="block relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#FAF2E2] mb-4 border border-[#E8D9BD]/50 cursor-pointer"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-108 group-hover:-translate-y-1"
                    />

                    {/* Carbonation bubbles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bubble" style={{ left: '20%', bottom: '20%', width: '8px', height: '8px' }} />
                      <div className="bubble" style={{ left: '50%', bottom: '25%', width: '6px', height: '6px', animationDelay: '0.4s' }} />
                      <div className="bubble" style={{ left: '75%', bottom: '15%', width: '10px', height: '10px', animationDelay: '0.8s' }} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/menu/${product.slug}`}>
                        <h3 className="font-display text-xl sm:text-2xl font-black text-[#171717] tracking-tight hover:text-[#E6392F] transition-colors leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[11px] sm:text-xs text-[#7A6B56] font-medium mt-1 mb-3 line-clamp-2">
                        {product.ingredients.join(' • ')}
                      </p>
                    </div>

                    {/* Price and Actions */}
                    <div className="pt-3 border-t border-[#E8D9BD] space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#A8987E] block">Regular</span>
                          <span className="font-display text-xl sm:text-2xl font-black text-[#171717]">
                            ₹{product.price}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-display text-sm sm:text-base tracking-wider transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white scale-105'
                              : 'bg-[#E6392F] text-white hover:bg-[#171717] hover:scale-105 shadow-xs'
                          }`}
                          aria-label={`Add ${product.name} to cart`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>ADDED</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[3]" />
                              <span>+ ADD</span>
                            </>
                          )}
                        </button>
                      </div>

                      <Link
                        href={`/menu/${product.slug}`}
                        className="w-full py-1 text-center block text-[11px] font-bold text-[#7A6B56] hover:text-[#E6392F] transition-colors"
                      >
                        Customize size & ice →
                      </Link>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8ED] flex items-center justify-center font-display text-2xl text-[#171717]">
          LOADING MENU...
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
