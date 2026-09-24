'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useRewards } from '@/context/RewardsContext';
import {
  ShoppingBag,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    grandTotal,
    clearCart,
    deliveryType,
  } = useCart();
  const { addPoints } = useRewards();

  // Form states
  const [name, setName] = useState('Nagesh K');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Royal Residency, Tarabai Park');
  const [city, setCity] = useState('Kolhapur');
  const [pincode, setPincode] = useState('416003');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Order Placement / Tracking state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderStep, setOrderStep] = useState(1);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E6392F', '#FFB000', '#171717'],
    });

    const newOrderId = `DS-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);

    // Award loyalty points (10 points per 100 spent)
    const pointsEarned = Math.max(20, Math.round(grandTotal / 5));
    addPoints(pointsEarned);

    // Simulated real-time tracking progression
    setTimeout(() => setOrderStep(2), 2500); // 2: Chilling with ice
    setTimeout(() => setOrderStep(3), 6000); // 3: Out for delivery

    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FFF8ED] pt-12 pb-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8D9BD] shadow-xl space-y-6">
            
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#E6392F]">
                ORDER CONFIRMED
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-[#171717] mt-1">
                SIP IS ON THE WAY!
              </h1>
              <p className="text-xs font-mono text-[#A8987E] mt-1">
                ORDER ID: <span className="font-bold text-[#171717]">{orderId}</span>
              </p>
            </div>

            {/* Real-time Order Tracker Steps */}
            <div className="bg-[#FAF2E2] p-6 rounded-2xl border border-[#E8D9BD] text-left space-y-5">
              <h3 className="font-display text-lg font-bold text-[#171717] uppercase tracking-wider">
                LIVE FIZZ TRACKER
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      orderStep >= 1 ? 'bg-[#E6392F] text-white' : 'bg-[#E8D9BD] text-[#7A6B56]'
                    }`}
                  >
                    1
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-[#171717]">
                      BREWING YOUR DIRTY SODA MIX
                    </p>
                    <p className="text-xs text-[#7A6B56]">
                      Barista is blending syrups and carbonating base fountain.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      orderStep >= 2 ? 'bg-[#E6392F] text-white' : 'bg-[#E8D9BD] text-[#7A6B56]'
                    }`}
                  >
                    2
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-[#171717]">
                      CHILLING & CAPPING WITH COLD FOAM
                    </p>
                    <p className="text-xs text-[#7A6B56]">
                      Adding crushed ice, popping boba & whipping fresh foam.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      orderStep >= 3 ? 'bg-[#E6392F] text-white' : 'bg-[#E8D9BD] text-[#7A6B56]'
                    }`}
                  >
                    3
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-[#171717]">
                      DISPATCHED WITH DRIVER
                    </p>
                    <p className="text-xs text-[#7A6B56]">
                      Arriving at your doorstep in an insulated chill pack (~20 mins).
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/menu"
                className="flex-1 py-3.5 rounded-xl bg-[#171717] text-white font-display text-lg tracking-wider hover:bg-[#E6392F] transition-colors"
              >
                BACK TO MENU
              </Link>
              <Link
                href="/rewards"
                className="flex-1 py-3.5 rounded-xl bg-[#FAF2E2] border border-[#E8D9BD] text-[#171717] font-display text-lg tracking-wider hover:bg-[#E6392F] hover:text-white transition-colors"
              >
                CHECK REWARDS
              </Link>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-8 pb-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/menu"
            className="text-xs font-bold text-[#7A6B56] hover:text-[#E6392F] uppercase tracking-wider"
          >
            ← Continue Ordering
          </Link>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-[#171717] tracking-tight leading-none mt-2">
            CHECKOUT
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8D9BD] max-w-md mx-auto space-y-4">
            <span className="text-5xl block">🛒</span>
            <h2 className="font-display text-2xl font-bold text-[#171717]">YOUR CART IS EMPTY</h2>
            <p className="text-xs text-[#7A6B56]">
              Add some signature drinks or build your own custom soda first.
            </p>
            <Link
              href="/menu"
              className="inline-block px-6 py-3 rounded-xl bg-[#E6392F] text-white font-display text-lg tracking-wider"
            >
              EXPLORE MENU
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery Address */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#E6392F]">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-display text-xl font-bold text-[#171717]">
                    DELIVERY ADDRESS
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#7A6B56] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-xs font-bold focus:outline-none focus:border-[#E6392F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#7A6B56] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-xs font-bold focus:outline-none focus:border-[#E6392F]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase text-[#7A6B56] mb-1">
                      Street Address & Apt
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-xs font-bold focus:outline-none focus:border-[#E6392F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#7A6B56] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-xs font-bold focus:outline-none focus:border-[#E6392F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#7A6B56] mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8D9BD] bg-[#FFF8ED] text-xs font-bold focus:outline-none focus:border-[#E6392F]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8D9BD] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-[#E6392F]">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-display text-xl font-bold text-[#171717]">
                    PAYMENT METHOD
                  </h3>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'upi' as const, label: 'UPI / GPay', desc: 'Instant 1-Click' },
                    { id: 'card' as const, label: 'Cards', desc: 'Visa / MC / RuPay' },
                    { id: 'cod' as const, label: 'Cash / COD', desc: 'Pay at Doorstep' },
                  ].map((p) => {
                    const isSelected = paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#E6392F] bg-[#FFF8ED] ring-2 ring-[#E6392F]/20'
                            : 'border-[#E8D9BD] hover:border-[#171717]'
                        }`}
                      >
                        <span className="font-display text-base font-bold text-[#171717] block">
                          {p.label}
                        </span>
                        <span className="text-[10px] text-[#7A6B56] block">{p.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-[#E8D9BD] shadow-sm space-y-4">
                <h3 className="font-display text-xl font-bold text-[#171717] border-b border-[#E8D9BD] pb-3">
                  ORDER SUMMARY ({items.reduce((s, i) => s + i.quantity, 0)} ITEMS)
                </h3>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <div>
                        <p className="font-bold text-[#171717]">
                          {item.type === 'preset'
                            ? item.presetProduct?.name
                            : item.customSoda?.customName}
                        </p>
                        <p className="text-[11px] text-[#7A6B56]">
                          Qty: {item.quantity} • {item.selectedSize} • {item.selectedIce} ice
                        </p>
                      </div>
                      <span className="font-bold text-[#171717]">
                        ₹{item.unitPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8D9BD] pt-3 space-y-1.5 text-xs text-[#7A6B56]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#171717]">₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#E6392F]">
                      <span>Discount</span>
                      <span className="font-bold">− ₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-[#171717]">
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-display font-black text-[#171717] pt-2 border-t border-[#E8D9BD]">
                    <span>TOTAL</span>
                    <span className="text-[#E6392F]">₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#E6392F] text-white font-display text-xl tracking-wider hover:bg-[#171717] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>PLACE ORDER • ₹{grandTotal}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#7A6B56] pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Insulated ice-cold freshness guarantee</span>
                </div>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
