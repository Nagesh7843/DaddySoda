'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Flame, Menu, X, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRewards } from '@/context/RewardsContext';

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount, setIsDrawerOpen, cartBadgeBounced } = useCart();
  const { points } = useRewards();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'MENU', href: '/menu' },
    { label: 'BUILD YOUR SODA', href: '/build', highlight: true },
    { label: 'LOCATIONS', href: '/stores' },
    { label: 'OUR STORY', href: '/story' },
    { label: 'REWARDS', href: '/rewards' },
  ];

  return (
    <>
      {/* Top Banner Ticker */}
      <div className="bg-[#171717] text-[#F5E9D0] text-xs font-semibold py-2 px-4 border-b border-[#333333] overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E6392F] animate-ping" />
            <span className="tracking-wide">
              ⚡ <strong className="text-[#FFB000]">DADDY50</strong> FOR FLAT ₹50 OFF YOUR FIRST CUSTOM FOUNTAIN MIX
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-[#C4B79D]">
            <Link href="/stores" className="hover:text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#E6392F]" />
              <span>Drive-Thru Open till 1:30 AM</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#E8D9BD] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#E6392F] flex items-center justify-center text-white shadow-md group-hover:rotate-6 transition-transform">
              <span className="font-display text-2xl font-bold tracking-tighter">DS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717] leading-none group-hover:text-[#E6392F] transition-colors">
                DADDY SODA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#E6392F]">
                CRAFT DIRTY FOUNTAIN
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-lg tracking-wider transition-all relative py-1 ${
                    isActive
                      ? 'text-[#E6392F]'
                      : 'text-[#171717] hover:text-[#E6392F]'
                  } ${link.highlight ? 'flex items-center gap-1.5 text-[#E6392F] font-bold' : ''}`}
                >
                  {link.highlight && <Sparkles className="w-4 h-4 text-[#FFB000] animate-pulse" />}
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E6392F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Elements */}
          <div className="flex items-center gap-3">
            {/* Rewards Badge */}
            <Link
              href="/rewards"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#171717] hover:border-[#FFB000] transition-colors shadow-sm"
              title="Your Daddy Rewards Points"
            >
              <Flame className="w-4 h-4 text-[#E6392F] fill-[#E6392F]" />
              <span>{points} PTS</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`relative p-2.5 rounded-full bg-[#171717] text-[#FFF8ED] hover:bg-[#E6392F] transition-all cursor-pointer ${
                cartBadgeBounced ? 'scale-125 bg-[#E6392F]' : ''
              }`}
              aria-label="Open Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#FFB000] text-[#171717] font-black text-[11px] rounded-full flex items-center justify-center border-2 border-[#FFF8ED] shadow-sm animate-scale">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <Link
              href="/build"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#E6392F] text-white font-display text-lg tracking-wider hover:bg-[#171717] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              ORDER NOW
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#171717] hover:bg-[#F5E9D0]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FFF8ED] border-b border-[#E8D9BD] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block font-display text-xl tracking-wider py-2 px-3 rounded-lg ${
                  pathname === link.href
                    ? 'bg-[#E6392F] text-white'
                    : 'text-[#171717] hover:bg-[#F5E9D0]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex items-center justify-between border-t border-[#E8D9BD]">
              <Link
                href="/rewards"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-bold text-[#171717]"
              >
                <Flame className="w-4 h-4 text-[#E6392F] fill-[#E6392F]" />
                <span>Daddy Points: {points}</span>
              </Link>
              <Link
                href="/build"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 bg-[#E6392F] text-white font-display rounded-lg text-sm"
              >
                START MIXING
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
