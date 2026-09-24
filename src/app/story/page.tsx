import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame, Droplets, CheckCircle2 } from 'lucide-react';

export default function StoryPage() {
  const steps = [
    { title: 'THE IDEA', sub: 'Boring flat canned drinks are dead.', desc: 'Why settle for warm cans with synthetic syrup when fountain soda can be an artform?' },
    { title: 'THE FLAVOR', sub: 'Real cane sugars & cold-pressed purees.', desc: 'Alphonso mangoes, wild ruby cherries, tart Persian limes, and Madagascar vanilla.' },
    { title: 'THE DIRTY MIX', sub: 'Cold foam crowns & creamy marble swirls.', desc: 'Invented in craft fountain bars, perfected with velvet coconut and vanilla foams.' },
    { title: 'THE SIP', sub: 'Carbonated euphoria that makes you smile.', desc: 'High-voltage mountain carbonation that tingles with every drop.' },
    { title: 'DADDY SODA', sub: 'Your soda. Your rules.', desc: 'Not a soft drink. A personality.' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8ED] pt-8 pb-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF2E2] border border-[#E8D9BD] text-xs font-bold text-[#E6392F] mb-4">
            <Flame className="w-4 h-4 fill-[#E6392F]" />
            <span className="tracking-widest uppercase">THE BRAND MANIFESTO</span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-[#171717] tracking-tight leading-none mb-4">
            WE LIKE OUR <span className="text-[#E6392F]">SODA LOUD.</span>
          </h1>
          <p className="font-display text-2xl sm:text-3xl text-[#7A6B56] uppercase tracking-wide">
            SIP LOUD. LIVE LOUDER.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8D9BD] shadow-sm mb-16 space-y-6 text-[#171717]">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#171717]">
            WHY DADDY SODA EXISTS
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#7A6B56] leading-relaxed">
            <p>
              Walk into any beverage aisle in India. You will find the exact same 4 sodas, trapped inside aluminum cans, filled with the exact same industrial corn syrup that was designed in 1985.
            </p>
            <p className="font-bold text-[#171717]">
              We got bored. So we broke the fountain.
            </p>
            <p>
              Inspired by the underground craft dirty soda bars of Utah and elevated with bold Indian tropical purees, <strong>Daddy Soda</strong> lets you customize your carbonation from scratch. Dark craft colas spiked with tart cherry and capped with vanilla cold foam. Crisp lemon-limes layered with popping mango boba. High-voltage energy infusions with charred lime wheels.
            </p>
          </div>
        </div>

        {/* Visual Storytelling Flow: IDEA -> FLAVOR -> MIX -> SIP -> DADDY SODA */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6392F]">
              THE ANATOMY OF REBELLION
            </span>
            <h3 className="font-display text-3xl sm:text-5xl font-black text-[#171717] tracking-tight mt-1">
              FROM REBELLIOUS SPARK TO FIRST SIP
            </h3>
          </div>

          <div className="space-y-4 relative">
            {steps.map((st, idx) => (
              <div
                key={st.title}
                className="bg-[#FAF2E2] p-6 rounded-2xl border border-[#E8D9BD] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#171717] text-[#FFF8ED] flex items-center justify-center font-display text-xl font-bold shrink-0">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-[#171717]">{st.title}</h4>
                    <p className="text-xs font-bold text-[#E6392F] uppercase">{st.sub}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#7A6B56] max-w-md">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#171717] text-white rounded-3xl p-8 sm:p-12 text-center border-4 border-[#E6392F] relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h3 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              STOP DRINKING ORDINARY.
            </h3>
            <p className="text-sm text-[#C4B79D] max-w-lg mx-auto">
              Join the dirty soda revolution. Head into our studio or visit a drive-thru near you.
            </p>
            <div className="pt-2">
              <Link
                href="/build"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E6392F] text-white font-display text-xl tracking-wider hover:bg-white hover:text-[#171717] transition-all shadow-lg"
              >
                <span>BUILD YOUR SODA</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
