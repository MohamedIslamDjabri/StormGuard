'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldAlert,
  Loader2,
  PhoneCall,
} from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/constants/data';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionType?: 'dispatch' | 'call' | 'voice_modal';
}

interface FloatingAIChatProps {
  onOpenVoiceModal?: () => void;
}

export default function FloatingAIChat({ onOpenVoiceModal }: FloatingAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "StormGuard Emergency AI active. How can we assist your property today? Select a quick topic below or describe the roof damage.",
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef<number>(1);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    messageCounterRef.current += 1;
    const userMsgId = `user-${messageCounterRef.current}`;

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: messageContent,
      timestamp: 'Sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: messageContent,
          messages: messages.concat(userMsg).map((m) => ({
            role: m.sender === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || "Our emergency response network is operational. Please call (555) 718-STORM for immediate crew dispatch.";

      let actionType: 'dispatch' | 'call' | 'voice_modal' | undefined = undefined;
      const lower = messageContent.toLowerCase();
      if (lower.includes('leak') || lower.includes('water') || lower.includes('emergency')) {
        actionType = 'dispatch';
      } else if (lower.includes('voice') || lower.includes('call me')) {
        actionType = 'voice_modal';
      }

      messageCounterRef.current += 1;
      const aiMsgId = `ai-${messageCounterRef.current}`;

      setMessages((prev) => [
        ...prev,
        {
          id: aiMsgId,
          sender: 'ai',
          text: aiReply,
          timestamp: 'Online',
          actionType,
        },
      ]);
    } catch {
      messageCounterRef.current += 1;
      const errorMsgId = `ai-err-${messageCounterRef.current}`;
      setMessages((prev) => [
        ...prev,
        {
          id: errorMsgId,
          sender: 'ai',
          text: "Active storm dispatch units are standing by. For immediate 2-hour tarp deployment, call (555) 718-STORM or submit your inspection request below.",
          timestamp: 'Online',
          actionType: 'dispatch',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "💧 Water leaking through my ceiling",
    "🌪️ Hail hit my neighborhood",
    "📋 Does insurance cover 100% of roof?",
    "📞 Request emergency callback",
  ];

  return (
    <>
      {/* Floating Trigger Button (Positioned comfortably above mobile docked bar) */}
      <div className="fixed bottom-14 sm:bottom-16 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#1d2024] hover:bg-[#272a2e] text-[#ffe1a7] border-2 border-[#fbbf24] px-4 py-2.5 rounded-full shadow-[0_4px_25px_rgba(251,191,36,0.35)] transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer group"
            aria-label="Open StormGuard AI Chat"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fbbf24]"></span>
            </span>
            <Bot className="w-5 h-5 text-[#fbbf24] group-hover:rotate-12 transition-transform" />
            <span className="font-headline-sm text-xs font-bold text-[#e1e2e8] hidden xs:inline">
              Ask AI Triage
            </span>
          </button>
        )}
      </div>

      {/* Floating Tactical Chat Window */}
      {isOpen && (
        <div className="fixed bottom-14 sm:bottom-16 right-3 sm:right-6 z-50 w-[94vw] sm:w-[390px] h-[520px] max-h-[80vh] rounded-2xl bg-[#111418] border-2 border-[#fbbf24]/50 shadow-[0_8px_36px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header Bar */}
          <div className="p-3.5 bg-[#1d2024] border-b border-[#323539] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24]">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-xs text-[#e1e2e8] font-bold">
                    StormGuard AI Triage
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
                </div>
                <span className="font-code-telemetry text-[10px] text-[#ffe1a7]">
                  Austin Dispatch Hub • Online
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {onOpenVoiceModal && (
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenVoiceModal();
                  }}
                  className="p-1.5 rounded text-[#ffe1a7] hover:bg-[#272a2e] transition-colors cursor-pointer"
                  title="Switch to AI Voice Call"
                >
                  <PhoneCall className="w-4 h-4 text-[#fbbf24]" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded text-[#d3c5ac] hover:text-white hover:bg-[#272a2e] transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#111418]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] shrink-0 text-[10px] font-bold mt-0.5">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-3 rounded-xl text-xs font-body-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#272a2e] text-[#e1e2e8] border border-[#4f4633]/40'
                      : 'bg-[#1d2024] text-[#ffe1a7] border-l-2 border-[#fbbf24]'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Cards */}
                  {msg.actionType === 'dispatch' && (
                    <div className="mt-2.5 pt-2 border-t border-[#323539] flex flex-col gap-1.5">
                      <Link
                        href="/#quick-form"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center gap-1 bg-[#fbbf24] text-[#6c4f00] font-bold text-[11px] py-1.5 px-3 rounded shadow hover:bg-[#f9bd22]"
                      >
                        <span>Lock In Emergency Tarping</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <a
                        href={`tel:${SITE_CONFIG.phoneRaw}`}
                        className="inline-flex items-center justify-center gap-1 bg-[#272a2e] text-[#e1e2e8] text-[11px] py-1.5 px-3 rounded border border-[#4f4633]"
                      >
                        <Phone className="w-3 h-3 text-[#fbbf24]" />
                        <span>Call Dispatch: {SITE_CONFIG.phone}</span>
                      </a>
                    </div>
                  )}

                  {msg.actionType === 'voice_modal' && onOpenVoiceModal && (
                    <div className="mt-2.5 pt-2 border-t border-[#323539]">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onOpenVoiceModal();
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#fbbf24] text-[#6c4f00] font-bold text-[11px] py-1.5 px-3 rounded shadow hover:bg-[#f9bd22] cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Launch AI Voice Receptionist</span>
                      </button>
                    </div>
                  )}

                  <span className="block text-[9px] font-code-telemetry text-[#9c8f79] mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#ffe1a7] font-code-telemetry pl-8">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#fbbf24]" />
                <span>StormGuard AI analyzing Doppler &amp; structural risk...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-[#191c20] border-t border-[#323539] flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(p)}
                className="px-2.5 py-1 rounded bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] text-[10px] border border-[#4f4633]/40 transition-colors shrink-0 cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-[#1d2024] border-t border-[#323539] flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hail, leaks, or emergency tarping..."
              className="flex-1 bg-[#111418] border border-[#4f4633]/50 text-[#e1e2e8] px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#fbbf24] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3.5 py-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-bold rounded-lg text-xs flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer shadow"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
