'use client';

import { Zap, Bot, PhoneCall } from 'lucide-react';

export default function EmergencyStatusBar() {
  const triggerChat = () => {
    if (typeof window !== 'undefined' && (window as any).openStormGuardAIChat) {
      (window as any).openStormGuardAIChat();
    }
  };

  const triggerVoice = () => {
    if (typeof window !== 'undefined' && (window as any).openStormGuardVoiceCall) {
      (window as any).openStormGuardVoiceCall();
    }
  };

  return (
    <section className="w-full bg-[#191c20] border-y border-[#4f4633]/40 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] relative z-20">
      <div className="w-full px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffb4ab]"></span>
          </span>
          <span className="font-code-telemetry text-xs text-[#ffb4ab] font-bold uppercase tracking-wide shrink-0">
            Storm Response Active:
          </span>
          <span className="font-body-sm text-xs text-[#e1e2e8]">
            Severe Weather Rapid Response protocol engaged for Central Texas. Average dispatch: 38 mins.
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-between lg:justify-end">
          <button
            type="button"
            onClick={triggerChat}
            className="inline-flex items-center gap-1.5 bg-[#1d2024] hover:bg-[#272a2e] text-[#ffe1a7] border border-[#fbbf24]/50 px-3 py-1 rounded font-label-md text-xs font-semibold transition-all whitespace-nowrap active:scale-95 cursor-pointer shadow-sm"
          >
            <Bot className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>AI Triage &amp; Booking</span>
          </button>
          <button
            type="button"
            onClick={triggerVoice}
            className="inline-flex items-center gap-1.5 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] px-3.5 py-1 rounded font-label-md text-xs font-bold transition-all whitespace-nowrap active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(251,191,36,0.3)]"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-current" />
            <span>AI Voice Call</span>
          </button>
        </div>
      </div>
    </section>
  );
}
