'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRewards } from '@/context/RewardsContext';
import { useCart } from '@/context/CartContext';
import { Flame, Sparkles, Gift, Check, ArrowRight, Trophy, Zap, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RewardsPage() {
  const { points, targetPoints, tier, claimFreeSodaReward, hasRedeemedFreeSoda, addPoints } = useRewards();
  const { applyPromo, setIsDrawerOpen } = useCart();
  const [claimStatus, setClaimStatus] = useState<string | null>(null);

  const percentage = Math.min(100, Math.round((points / targetPoints) * 100));

  const handleRedeem = () => {
    if (points >= targetPoints) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E6392F', '#FFB000', '#171717'],
      });
      claimFreeSodaReward();
      applyPromo('DADDY50');
      setClaimStatus('Unlocked! Applied promo code DADDY50 to your cart.');
      setTimeout(() => setIsDrawerOpen(true), 800);
    } else {
      setClaimStatus(`You need ${targetPoints - points} more points to claim a Free Large Soda! Order 2 more drinks to unlock.`);
    }
  };

  const handleSimulateEarn = () => {
    addPoints(30);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#FFB000', '#E6392F'],
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-8 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#E6392F] mb-3">
            <Flame className="w-4 h-4 fill-[#E6392F]" />
            <span className="tracking-widest uppercase">THE DIRTY LOYALTY CLUB</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-black text-[#171717] tracking-tight leading-none mb-3">
            DADDY REWARDS
          </h1>
          <p className="text-sm text-[#7A6B56]">
            Every sip earns you points. Unlock free large sodas, secret limited drops, and skip-the-line privileges.
          </p>
        </div>

        {/* Central Loyalty Points Tracker Card */}
        <div className="bg-[#171717] text-[#FFF8ED] rounded-3xl p-8 sm:p-10 border-4 border-[#E6392F] shadow-2xl relative overflow-hidden mb-10">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E6392F]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#FFB000]">
                  CURRENT TIER STATUS
                </span>
                <h3 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#FFB000]" />
                  <span>{tier}</span>
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C4B79D]">
                  AVAILABLE BALANCE
                </span>
                <p className="font-display text-4xl sm:text-5xl font-black text-[#FFB000] leading-none">
                  🔥 {points} <span className="text-xl text-white">PTS</span>
                </p>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#C4B79D]">
                <span>Progress to Free Drink</span>
                <span className="text-white">{points} / {targetPoints} PTS</span>
              </div>
              <div className="w-full h-4 bg-[#2A2A2A] rounded-full overflow-hidden p-0.5 border border-[#444444]">
                <div
                  className="h-full bg-gradient-to-r from-[#FFB000] via-[#E6392F] to-[#E6392F] rounded-full transition-all duration-700 ease-out shadow-sm"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#A8987E]">
                <span>0 PTS</span>
                <span className="font-bold text-[#FFB000]">
                  {points >= targetPoints ? 'READY TO REDEEM!' : `${targetPoints - points} PTS NEEDED`}
                </span>
                <span>{targetPoints} PTS (FREE LARGE SODA)</span>
              </div>
            </div>

            {/* Redeem Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleRedeem}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-display text-xl tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  points >= targetPoints
                    ? 'bg-[#E6392F] text-white hover:bg-white hover:text-[#171717] shadow-lg'
                    : 'bg-[#2A2A2A] text-[#C4B79D] hover:bg-[#333333]'
                }`}
              >
                <Gift className="w-5 h-5" />
                <span>{points >= targetPoints ? 'REDEEM FREE SODA' : 'CLAIM REWARD'}</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateEarn}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#444444] text-xs font-bold text-[#FFB000] hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-4 h-4" />
                <span>+30 PTS (SIMULATE ORDER)</span>
              </button>
            </div>

            {claimStatus && (
              <p className="text-xs font-semibold text-[#FFB000] bg-[#2A2A2A] p-3 rounded-xl border border-[#3A3A3A]">
                {claimStatus}
              </p>
            )}

          </div>
        </div>

        {/* How To Earn Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-[#E8D9BD] text-center space-y-2">
            <span className="text-3xl block">🥤</span>
            <h4 className="font-display text-xl font-bold text-[#171717]">ORDER ANY SODA</h4>
            <p className="text-xs text-[#7A6B56]">
              Earn 10 points for every handcrafted fountain drink you buy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8D9BD] text-center space-y-2">
            <span className="text-3xl block">🎨</span>
            <h4 className="font-display text-xl font-bold text-[#171717]">BUILD CUSTOM</h4>
            <p className="text-xs text-[#7A6B56]">
              Earn 20 points every time you mix your own recipe in the studio.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#E8D9BD] text-center space-y-2">
            <span className="text-3xl block">🚀</span>
            <h4 className="font-display text-xl font-bold text-[#171717]">REFER A FRIEND</h4>
            <p className="text-xs text-[#7A6B56]">
              Give ₹50 off, get 50 points when they make their first sip.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
