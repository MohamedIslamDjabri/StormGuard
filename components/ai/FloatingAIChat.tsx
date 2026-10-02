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
  Calendar,
  CheckCircle2,
  MapPin,
  Clock,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/constants/data';

interface BookingInfo {
  token: string;
  assignedCrew: string;
  etaMinutes: number;
  scheduledTime: string;
  address?: string;
  status: string;
  damageType?: string;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionType?: 'dispatch' | 'call' | 'voice_modal' | 'booking';
  booking?: BookingInfo;
}

interface FloatingAIChatProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onOpenVoiceModal?: () => void;
}

export default function FloatingAIChat({
  isOpen: controlledIsOpen,
  setIsOpen: controlledSetIsOpen,
  onOpenVoiceModal,
}: FloatingAIChatProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = controlledSetIsOpen || setInternalIsOpen;

  const [activeTab, setActiveTab] = useState<'chat' | 'book'>('chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "StormGuard 24/7 AI Triage & Booking is active. How can we secure your property today? You can ask damage questions, request emergency tarping, or book a free 4K drone forensic inspection.",
      timestamp: 'Online',
    },
  ]);

  // Fast In-Chat Booking Wizard State
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookAddress, setBookAddress] = useState('');
  const [bookDamage, setBookDamage] = useState('leak');
  const [bookTime, setBookTime] = useState('immediate');
  const [bookSubmitting, setBookSubmitting] = useState(false);
  const [latestBooking, setLatestBooking] = useState<BookingInfo | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageCounterRef = useRef<number>(1);

  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

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

      let actionType: 'dispatch' | 'call' | 'voice_modal' | 'booking' | undefined = undefined;
      const lower = messageContent.toLowerCase();
      if (data.booking) {
        actionType = 'booking';
      } else if (lower.includes('leak') || lower.includes('water') || lower.includes('emergency')) {
        actionType = 'dispatch';
      } else if (lower.includes('voice') || lower.includes('call me') || lower.includes('phone me')) {
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
          timestamp: 'Just now',
          actionType,
          booking: data.booking,
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
          text: "Active storm dispatch units are standing by across Central Texas. For immediate 2-hour tarp deployment, call (555) 718-STORM or submit your inspection request below.",
          timestamp: 'Online',
          actionType: 'dispatch',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Submit In-Chat Booking Wizard
  const handleQuickBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookSubmitting) return;

    setBookSubmitting(true);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingRequest: {
            name: bookName,
            phone: bookPhone,
            address: bookAddress,
            damageType: bookDamage,
            timeWindow: bookTime,
          },
        }),
      });

      const data = await res.json();
      if (data.booking) {
        setLatestBooking(data.booking);
        // Also inject into chat stream
        messageCounterRef.current += 1;
        setMessages((prev) => [
          ...prev,
          {
            id: `book-confirm-${messageCounterRef.current}`,
            sender: 'ai',
            text: `✅ Inspection booking ticket #${data.booking.token} confirmed for ${bookName || 'Homeowner'}. Mobile Rapid Unit dispatched for ${bookAddress || 'Central Texas'}.`,
            timestamp: 'Just now',
            actionType: 'booking',
            booking: data.booking,
          },
        ]);
        setActiveTab('chat');
      }
    } catch {
      const fallbackToken = `TX-AI-${Math.floor(1000 + Math.random() * 9000)}`;
      const fallbackBooking: BookingInfo = {
        token: fallbackToken,
        assignedCrew: 'Central Texas Rapid Fleet Unit #2',
        etaMinutes: 38,
        scheduledTime: 'Immediate Dispatch Queued',
        address: bookAddress || 'Austin Area',
        status: 'DISPATCH CONFIRMED',
      };
      setLatestBooking(fallbackBooking);
      setActiveTab('chat');
    } finally {
      setBookSubmitting(false);
    }
  };

  const quickPrompts = [
    "📅 Book Free Drone Inspection",
    "💧 Active water leak through ceiling",
    "🌪️ Hail damage in my neighborhood",
    "📋 How does insurance claim work?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 sm:bottom-6 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[420px] max-w-[calc(100vw-1rem)] h-[560px] max-h-[85vh] rounded-2xl bg-[#111418] border border-[#fbbf24]/60 shadow-[0_16px_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
      {/* Top Tactical Header */}
      <div className="px-3.5 py-3 bg-[#181c22] border-b border-[#2b3038] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/50 flex items-center justify-center text-[#fbbf24]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-xs text-[#f1f5f9] font-bold">
                StormGuard AI Assistant
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
            </div>
            <span className="font-code-telemetry text-[10px] text-[#fbbf24]">
              Austin Command Dispatch • 24/7 Active
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
              className="flex items-center gap-1 bg-[#fbbf24]/15 hover:bg-[#fbbf24]/25 text-[#ffe1a7] border border-[#fbbf24]/40 px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer"
              title="Switch to AI Voice Call"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="hidden xs:inline">Voice Call</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#202630] transition-colors cursor-pointer"
            aria-label="Close Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="grid grid-cols-2 p-1 bg-[#16181d] border-b border-[#272a2e] text-xs font-label-md">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`py-1.5 text-center rounded font-bold transition-all cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_10px_rgba(251,191,36,0.3)]'
              : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
          }`}
        >
          💬 AI Triage Chat
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('book')}
          className={`py-1.5 text-center rounded font-bold transition-all cursor-pointer ${
            activeTab === 'book'
              ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_10px_rgba(251,191,36,0.3)]'
              : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
          }`}
        >
          📅 Fast Booking Form
        </button>
      </div>

      {/* Tab 1: AI Chat Stream */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#111418]">
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
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
                  className={`max-w-[86%] p-3 rounded-xl text-xs font-body-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#272a2e] text-[#e1e2e8] border border-[#4f4633]/50'
                      : 'bg-[#1a1d22] text-[#ffe1a7] border-l-2 border-[#fbbf24] shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Confirmed Booking Ticket Badge */}
                  {msg.booking && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/60 text-[#e1e2e8] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-code-telemetry text-[11px] font-bold text-[#fbbf24] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#fbbf24]" />
                          TICKET #{msg.booking.token}
                        </span>
                        <span className="font-code-telemetry text-[9px] bg-[#fbbf24] text-[#6c4f00] px-1.5 py-0.5 rounded font-bold uppercase">
                          {msg.booking.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#d3c5ac]">
                        <p><span className="text-[#ffe1a7] font-semibold">Unit:</span> {msg.booking.assignedCrew}</p>
                        <p><span className="text-[#ffe1a7] font-semibold">Est. Arrival:</span> {msg.booking.etaMinutes} Mins ({msg.booking.scheduledTime})</p>
                      </div>
                      <div className="pt-1 flex gap-2">
                        <a
                          href={`tel:${SITE_CONFIG.phoneRaw}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 bg-[#272a2e] text-[#ffe1a7] hover:bg-[#323539] py-1 px-2 rounded text-[10px] font-semibold border border-[#4f4633]"
                        >
                          <Phone className="w-3 h-3 text-[#fbbf24]" />
                          <span>Direct Hotline</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Contextual Action Links */}
                  {msg.actionType === 'dispatch' && !msg.booking && (
                    <div className="mt-2.5 pt-2 border-t border-[#323539] flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveTab('book')}
                        className="inline-flex items-center justify-center gap-1 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-bold text-[11px] py-1.5 px-3 rounded shadow cursor-pointer transition-all"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>Book Emergency Inspection</span>
                      </button>
                      <a
                        href={`tel:${SITE_CONFIG.phoneRaw}`}
                        className="inline-flex items-center justify-center gap-1 bg-[#272a2e] text-[#e1e2e8] text-[11px] py-1.5 px-3 rounded border border-[#4f4633] transition-colors"
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
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-bold text-[11px] py-1.5 px-3 rounded shadow cursor-pointer transition-all"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Launch AI Voice Receptionist</span>
                      </button>
                    </div>
                  )}

                  <span className="block text-[9px] font-code-telemetry text-[#8c8273] mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#ffe1a7] font-code-telemetry pl-8 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#fbbf24]" />
                <span>StormGuard AI analyzing hail radar &amp; structural risk...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="p-2 bg-[#17191e] border-t border-[#2a2d33] flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (p.includes('Book Free Drone')) {
                    setActiveTab('book');
                  } else {
                    handleSendMessage(p);
                  }
                }}
                className="px-2.5 py-1 rounded bg-[#22252a] hover:bg-[#2d3137] text-[#e1e2e8] text-[10px] border border-[#4f4633]/40 transition-colors shrink-0 cursor-pointer font-medium"
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
            className="p-2.5 bg-[#1a1d22] border-t border-[#2d3137] flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hail damage, leaks, or booking..."
              className="flex-1 bg-[#111418] border border-[#4f4633]/60 text-[#e1e2e8] px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-[#fbbf24] transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-3.5 py-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-bold rounded-lg text-xs flex items-center justify-center transition-colors disabled:opacity-40 cursor-pointer shadow"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Fast In-Chat Booking Wizard */}
      {activeTab === 'book' && (
        <div className="flex-1 p-4 overflow-y-auto bg-[#111418]">
          <form onSubmit={handleQuickBookingSubmit} className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffe1a7] bg-[#1d2024] p-2 rounded border border-[#4f4633]/40">
              <Calendar className="w-4 h-4 text-[#fbbf24] shrink-0" />
              <span>Reserve Free 4K Drone Inspection or Emergency Tarp</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#e1e2e8] mb-1">
                Homeowner Name *
              </label>
              <input
                type="text"
                required
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                placeholder="e.g. Michael Miller"
                className="w-full bg-[#191c20] border border-[#4f4633]/60 focus:border-[#fbbf24] text-[#e1e2e8] px-2.5 py-1.5 rounded text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#e1e2e8] mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                required
                value={bookPhone}
                onChange={(e) => setBookPhone(e.target.value)}
                placeholder="(512) 555-0199"
                className="w-full bg-[#191c20] border border-[#4f4633]/60 focus:border-[#fbbf24] text-[#e1e2e8] px-2.5 py-1.5 rounded text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#e1e2e8] mb-1">
                Property Address or ZIP Code *
              </label>
              <input
                type="text"
                required
                value={bookAddress}
                onChange={(e) => setBookAddress(e.target.value)}
                placeholder="e.g. 78759 Austin or Round Rock"
                className="w-full bg-[#191c20] border border-[#4f4633]/60 focus:border-[#fbbf24] text-[#e1e2e8] px-2.5 py-1.5 rounded text-xs focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#e1e2e8] mb-1">
                  Damage Concern
                </label>
                <select
                  value={bookDamage}
                  onChange={(e) => setBookDamage(e.target.value)}
                  className="w-full bg-[#191c20] border border-[#4f4633]/60 focus:border-[#fbbf24] text-[#e1e2e8] px-2 py-1.5 rounded text-xs focus:outline-none"
                >
                  <option value="leak">Active Roof Leak</option>
                  <option value="hail">Hail Damage / Impacts</option>
                  <option value="wind">Wind Shear / Shingles</option>
                  <option value="inspection">Routine Drone Scan</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#e1e2e8] mb-1">
                  Arrival Preference
                </label>
                <select
                  value={bookTime}
                  onChange={(e) => setBookTime(e.target.value)}
                  className="w-full bg-[#191c20] border border-[#4f4633]/60 focus:border-[#fbbf24] text-[#e1e2e8] px-2 py-1.5 rounded text-xs focus:outline-none"
                >
                  <option value="immediate">Immediate Dispatch (&lt; 2 Hrs)</option>
                  <option value="today">Later Today</option>
                  <option value="tomorrow_morning">Tomorrow Morning</option>
                  <option value="tomorrow_afternoon">Tomorrow Afternoon</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={bookSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-bold py-2.5 px-3 rounded shadow-md transition-all cursor-pointer disabled:opacity-50 text-xs"
            >
              {bookSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Assigning Emergency Unit...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Inspection Booking</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
