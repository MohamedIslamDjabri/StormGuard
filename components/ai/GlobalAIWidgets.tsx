'use client';

import { useState, useEffect } from 'react';
import { Bot, PhoneCall, Sparkles } from 'lucide-react';
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
      {/* Floating Tactical Dispatch Dock (positioned above mobile bottom bar) */}
      {!chatOpen && !voiceModalOpen && (
        <aside
          aria-label="AI Dispatch & Booking Widget"
          className="fixed bottom-14 sm:bottom-16 right-2 sm:right-6 z-40 flex items-center gap-1.5 sm:gap-2 bg-[#111418]/95 p-1 rounded-full border border-[#fbbf24]/50 shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md"
        >
          {/* AI Chat Button */}
          <button
            type="button"
            onClick={openChat}
            className="flex items-center gap-1.5 bg-[#1d2024] hover:bg-[#272a2e] text-[#ffe1a7] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-[#fbbf24]/40 transition-all active:scale-95 cursor-pointer text-xs font-bold group shadow"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
            </span>
            <Bot className="w-3.5 h-3.5 text-[#fbbf24] group-hover:rotate-12 transition-transform" />
            <span className="hidden xs:inline">AI Chat &amp; Booking</span>
            <span className="xs:hidden">Chat</span>
          </button>

          {/* AI Voice Call Button */}
          <button
            type="button"
            onClick={openVoiceCall}
            className="flex items-center gap-1.5 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full transition-all active:scale-95 cursor-pointer text-xs font-bold shadow-[0_0_15px_rgba(251,191,36,0.35)]"
          >
            <PhoneCall className="w-3.5 h-3.5 fill-current" />
            <span className="hidden xs:inline">AI Voice Call</span>
            <span className="xs:hidden">Voice</span>
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
