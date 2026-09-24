'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { CupSize, IceLevel } from '@/types';
import {
  Star,
  Check,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const { addPresetProduct, setIsDrawerOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<CupSize>('regular');
  const [selectedIce, setSelectedIce] = useState<IceLevel>('regular');
  const [isAdded, setIsAdded] = useState(false);

  // Calculate price with size
  const priceMultiplier =
    selectedSize === 'large' ? 40 : selectedSize === 'daddy-tub' ? 80 : 0;
  const currentPrice = product.price + priceMultiplier;

  const handleAddToCart = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E6392F', '#FFB000', '#171717'],
    });

    addPresetProduct(product, selectedSize, selectedIce);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setIsDrawerOpen(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-8 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A6B56] hover:text-[#E6392F] transition-colors mb-6 uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>

        {/* Product Grid */}
        <div className="bg-white rounded-3xl border border-[#E8D9BD] shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left: Big Product Image */}
            <div className="md:col-span-6 relative aspect-square rounded-3xl overflow-hidden bg-[#FAF2E2] border border-[#E8D9BD] shadow-inner flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#171717] text-[#FFF8ED] shadow-sm">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Floating Bubbles */}
              <div className="bubble" style={{ left: '25%', bottom: '15%', width: '12px', height: '12px' }} />
              <div className="bubble" style={{ left: '60%', bottom: '20%', width: '8px', height: '8px', animationDelay: '0.8s' }} />
            </div>

            {/* Right: Customization & Info */}
            <div className="md:col-span-6 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#171717]">
                    <Star className="w-3.5 h-3.5 fill-[#FFB000] text-[#FFB000]" />
                    <span>{product.rating}</span>
                    <span className="text-[#A8987E]">({product.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs font-bold text-[#7A6B56] uppercase tracking-wider">
                    {product.calories} KCAL
                  </span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-black text-[#171717] tracking-tight leading-none">
                  {product.name}
                </h1>
                <p className="text-sm font-semibold text-[#E6392F] mt-1">
                  {product.tagline}
                </p>
                <p className="text-sm text-[#7A6B56] mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Flavor Profile Ingredients */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8987E]">
                  Signature Flavor Layers
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1 rounded-lg bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#171717]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[#7A6B56] uppercase tracking-wider">
                  <span>Choose Cup Size</span>
                  <span className="text-[#171717] lowercase">({selectedSize})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'regular' as CupSize, label: 'Regular', vol: '350 ml', add: 0 },
                    { id: 'large' as CupSize, label: 'Large', vol: '500 ml', add: 40 },
                    { id: 'daddy-tub' as CupSize, label: 'Daddy Tub', vol: '750 ml', add: 80 },
                  ].map((s) => {
                    const isSelected = selectedSize === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSize(s.id)}
                        className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717]'
                        }`}
                      >
                        <span className="font-display text-lg font-bold text-[#171717] block">
                          {s.label}
                        </span>
                        <span className="text-[11px] text-[#7A6B56] block">{s.vol}</span>
                        <span className="text-xs font-bold text-[#E6392F] mt-1 block">
                          {s.add === 0 ? 'Standard' : `+₹${s.add}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ice Level Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-[#7A6B56] uppercase tracking-wider">
                  <span>Ice Level</span>
                  <span className="text-[#171717] lowercase">({selectedIce})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light' as IceLevel, label: 'Light Ice', sub: '25%' },
                    { id: 'regular' as IceLevel, label: 'Regular Ice', sub: '50%' },
                    { id: 'extra' as IceLevel, label: 'Extra Chill', sub: '75%' },
                  ].map((ice) => {
                    const isSelected = selectedIce === ice.id;
                    return (
                      <button
                        key={ice.id}
                        type="button"
                        onClick={() => setSelectedIce(ice.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#171717] bg-[#171717] text-white font-bold'
                            : 'border-[#E8D9BD] hover:border-[#171717] text-[#171717]'
                        }`}
                      >
                        <span className="text-xs font-bold block">{ice.label}</span>
                        <span className="text-[10px] opacity-80 block">{ice.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Add to Cart Action */}
              <div className="pt-4 border-t border-[#E8D9BD] flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A8987E] block">Total Price</span>
                  <span className="font-display text-3xl font-black text-[#171717]">
                    ₹{currentPrice}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 rounded-2xl font-display text-xl tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                    isAdded ? 'bg-emerald-600 text-white' : 'bg-[#E6392F] text-white hover:bg-[#171717]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>ADD TO CART • ₹{currentPrice}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quality Note */}
              <div className="flex items-center gap-2 text-xs text-[#7A6B56] pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Made fresh with pure cane sugar and real cold foam whip.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
