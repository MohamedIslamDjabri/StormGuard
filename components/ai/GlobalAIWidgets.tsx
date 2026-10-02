'use client';

import { useState, useEffect } from 'react';
import { Bot, PhoneCall } from 'lucide-react';
import AIVoiceCallModal from './AIVoiceCallModal';
import FloatingAIChat from './FloatingAIChat';

export default function GlobalAIWidgets() {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceModalMode, setVoiceModalMode] = useState<'call' | 'schedule'>('call');
  const [chatOpen, setChatOpen] = useState(false);

  const openVoiceCall = () => {
    setChatOpen(false);
    setVoiceModalMode('call');
    setVoiceModalOpen(true);
  };

  const openVoiceSchedule = () => {
    setChatOpen(false);
    setVoiceModalMode('schedule');
    setVoiceModalOpen(true);
  };

  const openChat = () => {
    setVoiceModalOpen(false);
    setChatOpen(true);
  };

  useEffect(() => {
    (window as any).openStormGuardVoiceCall = openVoiceCall;
    (window as any).openStormGuardVoiceSchedule = openVoiceSchedule;
    (window as any).openStormGuardAIChat = openChat;
    return () => {
      delete (window as any).openStormGuardVoiceCall;
      delete (window as any).openStormGuardVoiceSchedule;
      delete (window as any).openStormGuardAIChat;
    };
  }, []);

  return (
    <>
      {/* Desktop Floating Tactical Dispatch Dock (Clean, unobtrusive, bottom-right) */}
      {!chatOpen && !voiceModalOpen && (
        <aside
          aria-label="AI Dispatch & Booking Widget"
          className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[#111418]/95 p-1.5 rounded-full border border-[#fbbf24]/50 shadow-[0_8px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all hover:scale-105"
        >
          {/* AI Chat & Booking Button */}
          <button
            type="button"
            onClick={openChat}
            className="flex items-center gap-2 bg-[#1a1f26] hover:bg-[#222832] text-[#ffe1a7] px-3.5 py-2 rounded-full border border-[#fbbf24]/40 transition-all active:scale-95 cursor-pointer text-xs font-bold group shadow"
            title="Open StormGuard AI Triage & Direct Booking"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
            </span>
            <Bot className="w-3.5 h-3.5 text-[#fbbf24] group-hover:rotate-12 transition-transform" />
            <span>AI Chat &amp; Booking</span>
          </button>

          {/* AI Voice Call Button */}
          <button
            type="button"
            onClick={openVoiceCall}
            className="flex items-center gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f9bd22] hover:to-[#d97706] text-[#111418] px-4 py-2 rounded-full transition-all active:scale-95 cursor-pointer text-xs font-black shadow-[0_0_16px_rgba(251,191,36,0.35)]"
            title="Start Live AI Emergency Voice Call"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-current" />
            <span>AI Voice Call</span>
          </button>
        </aside>
      )}

      {/* Floating AI Chat Window */}
      <FloatingAIChat
        isOpen={chatOpen}
        setIsOpen={setChatOpen}
        onOpenVoiceModal={openVoiceCall}
      />

      {/* AI Voice Call Modal */}
      <AIVoiceCallModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        defaultMode={voiceModalMode}
      />
    </>
  );
}
