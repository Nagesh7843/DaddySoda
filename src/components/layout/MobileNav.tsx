'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, GlassWater, Plus, MapPin, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FFF8ED]/95 backdrop-blur-lg border-t border-[#E8D9BD] py-2 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            pathname === '/' ? 'text-[#E6392F]' : 'text-[#7A6B56]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Menu */}
        <Link
          href="/menu"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            pathname.startsWith('/menu') ? 'text-[#E6392F]' : 'text-[#7A6B56]'
          }`}
        >
          <GlassWater className="w-5 h-5" />
          <span>Menu</span>
        </Link>

        {/* Visually Prominent Signature Build Button */}
        <Link
          href="/build"
          className="relative -top-5 flex flex-col items-center group"
          aria-label="Build Your Soda"
        >
          <div className="w-14 h-14 rounded-full bg-[#E6392F] text-white flex items-center justify-center shadow-lg shadow-[#E6392F]/40 border-4 border-[#FFF8ED] group-hover:scale-105 group-hover:bg-[#171717] transition-all">
            <Plus className="w-7 h-7 stroke-[3]" />
          </div>
          <span className="text-[11px] font-display tracking-wider font-black text-[#E6392F] mt-0.5">
            BUILD
          </span>
        </Link>

        {/* Locations */}
        <Link
          href="/stores"
          className={`flex flex-col items-center gap-1 text-[11px] font-bold ${
            pathname === '/stores' ? 'text-[#E6392F]' : 'text-[#7A6B56]'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span>Stores</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-bold text-[#7A6B56] relative cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#E6392F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

      </div>
    </div>
  );
}
