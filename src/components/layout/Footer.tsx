import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F5E9D0] pt-16 pb-24 md:pb-16 border-t-4 border-[#E6392F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Manifesto Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#333333]">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#E6392F] flex items-center justify-center font-display text-xl font-bold text-white">
                DS
              </span>
              <span className="font-display text-3xl font-black text-white tracking-wide">
                DADDY SODA
              </span>
            </div>
            <p className="text-sm text-[#C4B79D] leading-relaxed max-w-sm">
              Daddy Soda isn&apos;t a soft drink. It&apos;s a personality. Handcrafted dirty sodas, pure cane sugar fizz, velvety cold foams, and explosive flavor collisions.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#FFB000]">
              <Sparkles className="w-4 h-4" />
              <span>OVER 10,000+ CUSTOM COMBINATIONS POSSIBLE</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wider">NAVIGATE</h4>
            <ul className="space-y-2 text-sm text-[#C4B79D]">
              <li><Link href="/menu" className="hover:text-[#E6392F] transition-colors">The Soda Menu</Link></li>
              <li><Link href="/build" className="hover:text-[#E6392F] transition-colors text-white font-semibold">Build Your Soda</Link></li>
              <li><Link href="/stores" className="hover:text-[#E6392F] transition-colors">Find a Store</Link></li>
              <li><Link href="/rewards" className="hover:text-[#E6392F] transition-colors">Daddy Rewards</Link></li>
              <li><Link href="/story" className="hover:text-[#E6392F] transition-colors">Brand Manifesto</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wider">CATEGORIES</h4>
            <ul className="space-y-2 text-sm text-[#C4B79D]">
              <li><Link href="/menu?cat=classic" className="hover:text-[#E6392F] transition-colors">Classic Dirty</Link></li>
              <li><Link href="/menu?cat=creamy" className="hover:text-[#E6392F] transition-colors">Cream Clouds</Link></li>
              <li><Link href="/menu?cat=fruity" className="hover:text-[#E6392F] transition-colors">Tropical & Boba</Link></li>
              <li><Link href="/menu?cat=energy" className="hover:text-[#E6392F] transition-colors">Voltage Energy</Link></li>
              <li><Link href="/menu?cat=limited" className="hover:text-[#E6392F] transition-colors">Limited Drops</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display text-lg text-white tracking-wider">LATE NIGHT CRAVINGS?</h4>
            <p className="text-xs text-[#C4B79D]">
              Select drive-thrus & delivery hubs open till 1:30 AM in Pune, Mumbai, Kolhapur & Bangalore.
            </p>
            <div className="flex items-center gap-2 text-xs text-white bg-[#242424] p-2.5 rounded-lg border border-[#3A3A3A]">
              <MapPin className="w-4 h-4 text-[#E6392F] shrink-0" />
              <span>Kolhapur • Pune • Mumbai • Bengaluru</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C806A] gap-4">
          <div>
            © {new Date().getFullYear()} Daddy Soda Beverages Co. All rights reserved. Sip Loud. Live Louder.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[#C4B79D]">
              <ShieldCheck className="w-4 h-4 text-[#FFB000]" /> 100% Real Cane Sugar & Fresh Foam
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
