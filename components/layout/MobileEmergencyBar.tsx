'use client';

import Link from 'next/link';
import { Phone, PhoneCall, Bot, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

export default function MobileEmergencyBar() {
  const triggerVoice = () => {
    if (typeof window !== 'undefined' && (window as any).openStormGuardVoiceCall) {
      (window as any).openStormGuardVoiceCall();
    }
  };

  const triggerChat = () => {
    if (typeof window !== 'undefined' && (window as any).openStormGuardAIChat) {
      (window as any).openStormGuardAIChat();
    }
  };

  return (
    <aside
      aria-label="Emergency Dispatch Bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1216]/98 backdrop-blur-lg border-t border-[#3b4352] px-2.5 py-2 shadow-[0_-6px_24px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-center justify-between gap-1.5 max-w-md mx-auto">
        {/* Button 1: Direct Hotline Call */}
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#1a1f26] border border-[#3b4352] text-[#cbd5e1] hover:text-[#f8fafc] active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#fbbf24] mb-0.5" />
          <span className="text-[10px] font-bold font-code-telemetry leading-none">Call Crew</span>
        </a>

        {/* Button 2: AI Voice Call */}
        <button
          type="button"
          onClick={triggerVoice}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-gradient-to-b from-[#fbbf24] to-[#f59e0b] text-[#111418] shadow-[0_0_12px_rgba(251,191,36,0.3)] active:scale-95 transition-all text-center cursor-pointer"
        >
          <PhoneCall className="w-4 h-4 fill-current mb-0.5" />
          <span className="text-[10px] font-black font-label-md leading-none">AI Voice</span>
        </button>

        {/* Button 3: AI Chat & Direct Booking */}
        <button
          type="button"
          onClick={triggerChat}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#1a1f26] border border-[#fbbf24]/40 text-[#ffe1a7] active:scale-95 transition-all text-center cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-[#fbbf24] mb-0.5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#fbbf24]"></span>
            </span>
          </div>
          <span className="text-[10px] font-bold font-label-md leading-none">AI Booking</span>
        </button>

        {/* Button 4: Instant Triage / Inspection */}
        <Link
          href="/#quick-form"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#222832] border border-[#3b4352] text-[#f1f5f9] active:scale-95 transition-all text-center"
        >
          <Zap className="w-4 h-4 text-[#ffe1a7] mb-0.5 fill-current" />
          <span className="text-[10px] font-bold font-label-md leading-none">Inspect</span>
        </Link>
      </div>
    </aside>
  );
}
