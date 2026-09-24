import React from 'react';
import Hero from '@/components/home/Hero';
import VibeFilter from '@/components/home/VibeFilter';
import Favorites from '@/components/home/Favorites';
import BuilderTeaser from '@/components/home/BuilderTeaser';
import CinematicSection from '@/components/home/CinematicSection';
import StoreLocatorCTA from '@/components/home/StoreLocatorCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <VibeFilter />
      <Favorites />
      <BuilderTeaser />
      <CinematicSection />
      <StoreLocatorCTA />
    </div>
  );
}
