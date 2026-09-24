'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  SODA_BASES,
  SODA_FLAVORS,
  SODA_CREAMS,
  SODA_TOPPINGS,
  SIZE_CONFIG,
  ICE_OPTIONS,
} from '@/data/builderOptions';
import SodaCupCanvas from '@/components/builder/SodaCupCanvas';
import { useCart } from '@/context/CartContext';
import { SodaBase, SodaFlavor, SodaCream, SodaTopping, IceLevel, CupSize } from '@/types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  GlassWater,
  Droplets,
  Layers,
  CircleDot,
  Sliders,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STEPS = [
  { id: 1, label: 'BASE', icon: GlassWater },
  { id: 2, label: 'FLAVOR', icon: Droplets },
  { id: 3, label: 'CREAM', icon: Layers },
  { id: 4, label: 'TOPPINGS', icon: CircleDot },
  { id: 5, label: 'CHILL & SIZE', icon: Sliders },
];

export default function BuildSodaPage() {
  const { addCustomSoda, setIsDrawerOpen } = useCart();

  // Builder States
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<SodaBase>(SODA_BASES[0]);
  const [selectedFlavors, setSelectedFlavors] = useState<SodaFlavor[]>([SODA_FLAVORS[0]]);
  const [selectedCream, setSelectedCream] = useState<SodaCream | null>(SODA_CREAMS[1]);
  const [selectedToppings, setSelectedToppings] = useState<SodaTopping[]>([SODA_TOPPINGS[0]]);
  const [selectedIce, setSelectedIce] = useState<IceLevel>('regular');
  const [selectedSize, setSelectedSize] = useState<CupSize>('regular');
  const [drinkName, setDrinkName] = useState('My Daddy Mix');
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Price Calculation
  const basePrice = selectedBase.price;
  const flavorsPrice = selectedFlavors.reduce((sum, f) => sum + f.price, 0);
  const creamPrice = selectedCream ? selectedCream.price : 0;
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const sizePrice = SIZE_CONFIG[selectedSize].addPrice;
  const totalPrice = basePrice + flavorsPrice + creamPrice + toppingsPrice + sizePrice;

  // Flavor selection toggle (limit up to 2 for optimal flavor profile)
  const toggleFlavor = (flavor: SodaFlavor) => {
    if (selectedFlavors.some((f) => f.id === flavor.id)) {
      if (selectedFlavors.length > 1) {
        setSelectedFlavors(selectedFlavors.filter((f) => f.id !== flavor.id));
      }
    } else {
      if (selectedFlavors.length < 2) {
        setSelectedFlavors([...selectedFlavors, flavor]);
      } else {
        // Replace second flavor
        setSelectedFlavors([selectedFlavors[0], flavor]);
      }
    }
  };

  // Topping selection toggle
  const toggleTopping = (topping: SodaTopping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddToCart = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E6392F', '#FFB000', '#171717', '#FAF2E2'],
    });

    addCustomSoda({
      id: `custom-${Date.now()}`,
      customName: drinkName || 'Custom Daddy Mix',
      base: selectedBase,
      flavors: selectedFlavors,
      cream: selectedCream,
      toppings: selectedToppings,
      ice: selectedIce,
      size: selectedSize,
      totalPrice,
    });

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      setIsDrawerOpen(true);
    }, 600);
  };

  const handleReset = () => {
    setSelectedBase(SODA_BASES[0]);
    setSelectedFlavors([SODA_FLAVORS[0]]);
    setSelectedCream(SODA_CREAMS[1]);
    setSelectedToppings([SODA_TOPPINGS[0]]);
    setSelectedIce('regular');
    setSelectedSize('regular');
    setDrinkName('My Daddy Mix');
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pb-32 pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-[#E8D9BD] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7A6B56] uppercase tracking-wider mb-1">
              <Link href="/" className="hover:text-[#E6392F]">Home</Link>
              <span>/</span>
              <span className="text-[#E6392F]">Soda Studio</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-[#171717] tracking-tight leading-none">
              BUILD YOUR SODA
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6B56] mt-1">
              Craft your signature dirty soda from scratch. Live visual cup updates in real-time.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E8D9BD] text-xs font-bold text-[#7A6B56] hover:bg-[#FAF2E2] hover:text-[#171717] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET RECIPE</span>
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex items-center min-w-[580px] justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E8D9BD] -translate-y-1/2 z-0" />
            {STEPS.map((step) => {
              const isPast = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className="relative z-10 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg font-bold transition-all shadow-sm ${
                      isCurrent
                        ? 'bg-[#E6392F] text-white scale-110 ring-4 ring-[#E6392F]/20'
                        : isPast
                        ? 'bg-[#171717] text-[#FFF8ED]'
                        : 'bg-[#FAF2E2] text-[#A8987E] border border-[#E8D9BD]'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`font-display text-xs tracking-wider mt-2 font-bold ${
                      isCurrent ? 'text-[#E6392F]' : isPast ? 'text-[#171717]' : 'text-[#A8987E]'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Visual Cup (Left) & Controls (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Visual Cup Canvas */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-4">
            <SodaCupCanvas
              base={selectedBase}
              flavors={selectedFlavors}
              cream={selectedCream}
              toppings={selectedToppings}
              ice={selectedIce}
              size={selectedSize}
              drinkName={drinkName}
            />

            {/* Custom Drink Naming Input */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8D9BD] shadow-xs">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7A6B56] mb-1">
                Name Your Signature Mix
              </label>
              <input
                type="text"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                maxLength={30}
                placeholder="e.g. Midnight Fizz, Rebel Fuel..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-sm font-bold text-[#171717] focus:outline-none focus:border-[#E6392F]"
              />
            </div>
          </div>

          {/* Right Column: Step-by-Step Selection Panels */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: CHOOSE BASE */}
            {currentStep === 1 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#E6392F] uppercase tracking-wider">Step 1 of 5</span>
                    <h2 className="font-display text-3xl font-black text-[#171717]">CHOOSE YOUR BASE SODA</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SODA_BASES.map((b) => {
                    const isSelected = selectedBase.id === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBase(b)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] shadow-sm ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717] bg-white'
                        }`}
                      >
                        <div className="space-y-1 pr-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: b.liquidColor }}
                            />
                            <h3 className="font-display text-lg font-bold text-[#171717]">{b.name}</h3>
                          </div>
                          <p className="text-xs text-[#7A6B56] leading-relaxed">{b.description}</p>
                          <span className="inline-block text-[11px] font-bold text-[#E6392F] pt-1">
                            ₹{b.price}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                            isSelected ? 'bg-[#E6392F] border-[#E6392F] text-white' : 'border-[#A8987E]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE FLAVOR */}
            {currentStep === 2 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-[#E6392F] uppercase tracking-wider">Step 2 of 5</span>
                    <h2 className="font-display text-3xl font-black text-[#171717]">INFUSE FRUIT SYRUPS</h2>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF2E2] text-[#7A6B56]">
                    Selected: {selectedFlavors.length}/2
                  </span>
                </div>
                <p className="text-xs text-[#7A6B56] mb-5">
                  Pick up to 2 premium natural fruit syrups to layer into your carbonated fountain drink.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SODA_FLAVORS.map((f) => {
                    const isSelected = selectedFlavors.some((item) => item.id === f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFlavor(f)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[120px] ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] shadow-sm ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717] bg-white'
                        }`}
                      >
                        <span className="text-3xl mb-1">{f.emoji}</span>
                        <div>
                          <h3 className="font-display text-base font-bold text-[#171717] leading-tight">
                            {f.name}
                          </h3>
                          <span className="text-xs font-bold text-[#E6392F]">+₹{f.price}</span>
                        </div>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-[#E6392F] text-white flex items-center justify-center mt-1">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: MAKE IT CREAMY */}
            {currentStep === 3 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm animate-in fade-in duration-300">
                <div className="mb-2">
                  <span className="text-xs font-bold text-[#E6392F] uppercase tracking-wider">Step 3 of 5</span>
                  <h2 className="font-display text-3xl font-black text-[#171717]">MAKE IT DIRTY & CREAMY?</h2>
                </div>
                <p className="text-xs text-[#7A6B56] mb-5">
                  A signature dirty soda hallmark: crown your drink with velvety whipped cold foam cream.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SODA_CREAMS.map((c) => {
                    const isSelected = selectedCream?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCream(c)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] shadow-sm ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717] bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <h3 className="font-display text-lg font-bold text-[#171717]">{c.name}</h3>
                          <p className="text-xs text-[#7A6B56]">{c.description}</p>
                          <span className="inline-block text-xs font-bold text-[#E6392F]">
                            {c.price === 0 ? 'FREE' : `+₹${c.price}`}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                            isSelected ? 'bg-[#E6392F] border-[#E6392F] text-white' : 'border-[#A8987E]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: TOPPINGS */}
            {currentStep === 4 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm animate-in fade-in duration-300">
                <div className="mb-2">
                  <span className="text-xs font-bold text-[#E6392F] uppercase tracking-wider">Step 4 of 5</span>
                  <h2 className="font-display text-3xl font-black text-[#171717]">ADD BURSTING EXTRAS</h2>
                </div>
                <p className="text-xs text-[#7A6B56] mb-5">
                  Popping boba, chewy jellies, and fizzing candies for the ultimate mouthfeel.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SODA_TOPPINGS.map((t) => {
                    const isSelected = selectedToppings.some((item) => item.id === t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTopping(t)}
                        className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] shadow-sm ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717] bg-white'
                        }`}
                      >
                        <div className="space-y-1">
                          <h3 className="font-display text-lg font-bold text-[#171717]">{t.name}</h3>
                          <p className="text-xs text-[#7A6B56]">{t.description}</p>
                          <span className="inline-block text-xs font-bold text-[#E6392F]">+₹{t.price}</span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 ${
                            isSelected ? 'bg-[#E6392F] border-[#E6392F] text-white' : 'border-[#A8987E]'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: CHILL & SIZE */}
            {currentStep === 5 && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm space-y-6 animate-in fade-in duration-300">
                <div>
                  <span className="text-xs font-bold text-[#E6392F] uppercase tracking-wider">Step 5 of 5</span>
                  <h2 className="font-display text-3xl font-black text-[#171717]">CHILL LEVEL & CUP SIZE</h2>
                </div>

                {/* Ice Selection */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6B56] mb-3">
                    Ice Level
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {ICE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedIce(opt.id)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          selectedIce === opt.id
                            ? 'border-[#E6392F] bg-[#FFF8ED] ring-2 ring-[#E6392F]/20 font-bold'
                            : 'border-[#E8D9BD] hover:border-[#171717]'
                        }`}
                      >
                        <span className="text-2xl block mb-1">🧊</span>
                        <h4 className="font-display text-lg text-[#171717]">{opt.label}</h4>
                        <p className="text-[10px] text-[#7A6B56]">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cup Size Selection */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6B56] mb-3">
                    Cup Size
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {(Object.keys(SIZE_CONFIG) as CupSize[]).map((s) => {
                      const cfg = SIZE_CONFIG[s];
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#E6392F] bg-[#FFF8ED] ring-2 ring-[#E6392F]/20 font-bold'
                              : 'border-[#E8D9BD] hover:border-[#171717]'
                          }`}
                        >
                          <span className="font-display text-2xl text-[#171717] block">
                            {cfg.label}
                          </span>
                          <span className="text-xs text-[#7A6B56] font-semibold">{cfg.volume}</span>
                          <div className="text-xs font-bold text-[#E6392F] mt-1">
                            {cfg.addPrice === 0 ? 'Included' : `+₹${cfg.addPrice}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-5 py-3 rounded-xl border border-[#E8D9BD] text-[#171717] font-display text-lg tracking-wider hover:bg-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>BACK</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="px-8 py-3.5 rounded-xl bg-[#171717] text-white font-display text-xl tracking-wider hover:bg-[#E6392F] transition-all flex items-center gap-2 shadow-md"
                >
                  <span>CONTINUE →</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-8 py-3.5 rounded-xl bg-[#E6392F] text-white font-display text-2xl tracking-wider hover:bg-[#171717] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-6 h-6" />
                  <span>ADD TO CART • ₹{totalPrice}</span>
                </button>
              )}
            </div>

            {/* Live Pricing Breakdown Card */}
            <div className="bg-[#FAF2E2] p-5 rounded-2xl border border-[#E8D9BD] text-xs space-y-2 text-[#7A6B56]">
              <div className="flex items-center justify-between font-bold text-[#171717]">
                <span>YOUR DADDY SODA SUMMARY</span>
                <span className="font-display text-xl text-[#E6392F]">₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Base: {selectedBase.name}</span>
                <span>₹{selectedBase.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Flavors: {selectedFlavors.map((f) => f.name).join(', ')}</span>
                <span>+₹{flavorsPrice}</span>
              </div>
              {selectedCream && selectedCream.id !== 'none' && (
                <div className="flex justify-between">
                  <span>Cream: {selectedCream.name}</span>
                  <span>+₹{selectedCream.price}</span>
                </div>
              )}
              {toppingsPrice > 0 && (
                <div className="flex justify-between">
                  <span>Toppings: {selectedToppings.map((t) => t.name).join(', ')}</span>
                  <span>+₹{toppingsPrice}</span>
                </div>
              )}
              {sizePrice > 0 && (
                <div className="flex justify-between">
                  <span>Size upgrade ({SIZE_CONFIG[selectedSize].label})</span>
                  <span>+₹{sizePrice}</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Sticky Mobile Summary Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-[#171717] text-[#FFF8ED] p-3.5 border-t border-[#333333] shadow-2xl flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="font-display text-lg truncate font-bold">{drinkName || 'Your Soda'}</p>
          <p className="text-[11px] text-[#FFB000] font-bold">
            Step {currentStep}/5 • Total: ₹{totalPrice}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-4 py-2 rounded-xl bg-[#E6392F] text-white font-display text-base tracking-wider"
            >
              NEXT →
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded-xl bg-[#E6392F] text-white font-display text-base tracking-wider flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD ₹{totalPrice}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
