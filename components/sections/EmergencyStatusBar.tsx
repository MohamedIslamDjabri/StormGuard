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
    <section className="w-full bg-[#14181f] border-y border-[#2b3038] py-3 shadow-[0_4px_24px_rgba(0,0,0,0.6)] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffb4ab]"></span>
          </span>
          <span className="font-code-telemetry text-xs text-[#ffb4ab] font-bold uppercase tracking-wider shrink-0">
            Storm Response Active:
          </span>
          <span className="font-body-sm text-xs sm:text-sm text-[#cbd5e1] truncate sm:whitespace-normal">
            Severe Weather Rapid Response engaged. Avg dispatch: 38 mins.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full lg:w-auto">
          <button
            type="button"
            onClick={triggerChat}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#1a1f26] hover:bg-[#222832] text-[#ffe1a7] border border-[#fbbf24]/40 px-3 py-2 sm:px-3.5 sm:py-1.5 rounded-lg font-label-md text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm text-center"
          >
            <Bot className="w-3.5 h-3.5 text-[#fbbf24] shrink-0" />
            <span className="truncate">AI Triage</span>
          </button>
          <button
            type="button"
            onClick={triggerVoice}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f9bd22] hover:to-[#d97706] text-[#111418] px-3 py-2 sm:px-4 sm:py-1.5 rounded-lg font-label-md text-xs font-black transition-all active:scale-95 cursor-pointer shadow-[0_0_14px_rgba(251,191,36,0.35)] text-center"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="truncate">AI Voice Call</span>
          </button>
        </div>
      </div>
    </section>
  );
}
