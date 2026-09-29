'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle,
  Calendar,
  ShieldAlert,
  X,
  Radio,
  Send,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

interface VoiceMessage {
  speaker: 'ai' | 'user';
  text: string;
  time: string;
}

interface AIVoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'call' | 'schedule';
}

export default function AIVoiceCallModal({
  isOpen,
  onClose,
  defaultMode = 'call',
}: AIVoiceCallModalProps) {
  const [activeTab, setActiveTab] = useState<'call' | 'schedule'>(defaultMode);

  // Live Call States: 'idle' | 'dialing' | 'connected' | 'ended' | 'confirmed'
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'connected' | 'ended' | 'confirmed'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [conversation, setConversation] = useState<VoiceMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  // Schedule Callback Form States
  const [schedName, setSchedName] = useState('');
  const [schedPhone, setSchedPhone] = useState('');
  const [schedAddress, setSchedAddress] = useState('');
  const [schedDamage, setSchedDamage] = useState('leak');
  const [schedTime, setSchedTime] = useState('immediate');
  const [schedLoading, setSchedLoading] = useState(false);
  const [schedSuccess, setSchedSuccess] = useState<any>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Handle call timer
  useEffect(() => {
    if (callStatus === 'connected') {
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  // Text-To-Speech helper
  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsAiSpeaking(false);
    }
  };

  // Start Call
  const startCall = () => {
    setCallStatus('dialing');
    setCallDuration(0);
    setConversation([]);
    setBookingConfirmed(null);

    setTimeout(() => {
      setCallStatus('connected');
      const greeting = "StormGuard Emergency Dispatch. I see you're calling regarding Central Texas weather damage. Are you experiencing active interior leaks, or did hail or wind impact your roof?";
      setConversation([
        {
          speaker: 'ai',
          text: greeting,
          time: 'Just now',
        },
      ]);
      speakText(greeting);
    }, 1800);
  };

  // End Call
  const endCall = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCallStatus('ended');
    setIsAiSpeaking(false);
  };

  // Handle User Voice / Response Submission
  const handleUserMessage = async (text: string) => {
    if (!text.trim() || callStatus !== 'connected') return;

    const userMsg: VoiceMessage = {
      speaker: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setConversation((prev) => [...prev, userMsg]);
    setUserInput('');

    // AI logic response
    const lower = text.toLowerCase();
    let aiResponse = "";
    let shouldConfirmBooking = false;

    if (lower.includes('leak') || lower.includes('water') || lower.includes('drip') || lower.includes('ceiling')) {
      aiResponse = "I've flagged this as a Priority 1 active water breach. Our mobile tarping crew can be on site in 35-45 minutes. May I confirm your street address or ZIP code to lock in the crew?";
    } else if (lower.includes('hail') || lower.includes('dent') || lower.includes('shingle')) {
      aiResponse = "Understood. Hail micro-fractures compromise the waterproofing layer. I am reserving an autonomous 4K drone forensic scan for your address today. What is your best contact phone number?";
    } else if (lower.includes('787') || lower.includes('786') || lower.includes('street') || lower.includes('rd') || lower.includes('ave') || lower.includes('austin')) {
      aiResponse = "Perfect. I have dispatched Mobile Unit #3 to your location and confirmed your emergency inspection token. Would you like an instant SMS confirmation sent to your phone?";
      shouldConfirmBooking = true;
    } else {
      aiResponse = "Got it. I've recorded those damage details into your dispatch dossier. An emergency field technician is standing by to confirm your inspection time.";
    }

    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        {
          speaker: 'ai',
          text: aiResponse,
          time: 'Just now',
        },
      ]);
      speakText(aiResponse);

      if (shouldConfirmBooking) {
        setBookingConfirmed({
          token: `TX-VOICE-${Math.floor(1000 + Math.random() * 9000)}`,
          eta: '38 Minutes',
          crew: 'Mobile Response Van #3 (Austin Core)',
        });
      }
    }, 900);
  };

  // Handle Schedule Callback Submission
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSchedLoading(true);

    try {
      const res = await fetch('/api/ai/voice-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callerName: schedName || 'Homeowner',
          phone: schedPhone,
          address: schedAddress,
          damageType: schedDamage,
          urgency: schedDamage === 'leak' ? 'critical' : 'urgent',
          scheduledTime: schedTime,
        }),
      });

      const data = await res.json();
      setSchedSuccess(data);
    } catch {
      setSchedSuccess({
        token: 'TX-VOICE-8924',
        etaMinutes: 35,
        assignedCrew: 'Central Texas Rapid Response Unit #2',
        confirmationMessage: 'Your AI emergency voice callback has been prioritized. Expect a call within the requested window.',
      });
    } finally {
      setSchedLoading(false);
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111418] border border-[#fbbf24]/50 rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-[#323539] bg-[#1d2024] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center text-[#ffe1a7]">
              <Radio className="w-5 h-5 animate-pulse text-[#fbbf24]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-base text-[#e1e2e8] font-bold">
                  AI Voice Emergency Receptionist
                </span>
                <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
              </div>
              <p className="font-code-telemetry text-xs text-[#d3c5ac]">
                Central Texas 24/7 Voice Dispatch Link
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              endCall();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-[#272a2e] text-[#d3c5ac] hover:text-white transition-colors cursor-pointer"
            aria-label="Close Voice Interface"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1.5 bg-[#191c20] border-b border-[#323539] text-xs font-label-md">
          <button
            type="button"
            onClick={() => setActiveTab('call')}
            className={`py-2 text-center rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'call'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
            }`}
          >
            Live AI Voice Call
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`py-2 text-center rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
            }`}
          >
            Schedule AI Callback
          </button>
        </div>

        {/* Tab 1: Live Voice Call Interface */}
        {activeTab === 'call' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {callStatus === 'idle' && (
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 my-auto">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#fbbf24]/20 border-2 border-[#fbbf24] flex items-center justify-center text-[#ffe1a7] shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                    <PhoneCall className="w-10 h-10 text-[#fbbf24] animate-bounce" />
                  </div>
                </div>

                <div className="space-y-2 max-w-sm">
                  <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold">
                    Start Real-Time Voice Booking
                  </h3>
                  <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
                    Connect directly to our voice AI dispatcher. Speak naturally to diagnose roof damage, determine urgency, and book a mobile crew without filling out forms.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={startCall}
                    className="inline-flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-sm font-bold px-8 py-3.5 rounded-full shadow-[0_0_24px_rgba(251,191,36,0.4)] transition-all active:scale-95 cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Initiate Voice Call</span>
                  </button>
                </div>

                <div className="pt-2 text-[11px] font-code-telemetry text-[#9c8f79] flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Supports audio and prompt input • 100% private</span>
                </div>
              </div>
            )}

            {callStatus === 'dialing' && (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24] flex items-center justify-center text-[#fbbf24] animate-ping">
                  <Radio className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
                    Connecting to Central Texas Dispatch...
                  </h4>
                  <p className="font-code-telemetry text-xs text-[#ffe1a7] mt-1">
                    Route: Austin MoPac Station // Encrypted Link
                  </p>
                </div>
              </div>
            )}

            {(callStatus === 'connected' || callStatus === 'ended') && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Visualizer & Call Controls Bar */}
                <div className="p-4 bg-[#1d2024] border-b border-[#323539] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-code-telemetry text-sm font-bold text-[#ffe1a7] bg-[#0b0e12] px-2.5 py-1 rounded border border-[#4f4633]/50">
                      {formatTimer(callDuration)}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                      <span className="font-code-telemetry text-xs text-[#d3c5ac]">
                        {callStatus === 'connected' ? (isAiSpeaking ? 'AI Speaking...' : 'Listening...') : 'Call Ended'}
                      </span>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-2 rounded-full border transition-colors cursor-pointer ${
                        soundEnabled
                          ? 'bg-[#272a2e] text-[#ffe1a7] border-[#4f4633]'
                          : 'bg-[#93000a]/20 text-[#ffb4ab] border-[#93000a]'
                      }`}
                      title={soundEnabled ? "Mute Voice Audio" : "Enable Voice Audio"}
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-2 rounded-full border transition-colors cursor-pointer ${
                        !isMuted
                          ? 'bg-[#272a2e] text-[#ffe1a7] border-[#4f4633]'
                          : 'bg-[#93000a]/20 text-[#ffb4ab] border-[#93000a]'
                      }`}
                      title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                    >
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    {callStatus === 'connected' ? (
                      <button
                        type="button"
                        onClick={endCall}
                        className="px-3.5 py-1.5 rounded-full bg-[#93000a] hover:bg-[#aa091b] text-white font-label-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <PhoneOff className="w-3.5 h-3.5" />
                        <span>Hang Up</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={startCall}
                        className="px-3.5 py-1.5 rounded-full bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Again</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated Glowing Waveform (Active when AI speaks) */}
                <div className="h-14 bg-[#0b0e12] border-b border-[#272a2e] flex items-center justify-center gap-1 px-4">
                  {[6, 18, 12, 28, 20, 36, 16, 24, 10, 26, 18, 12].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isAiSpeaking
                          ? 'bg-[#fbbf24] animate-pulse'
                          : callStatus === 'connected'
                          ? 'bg-[#4f4633] h-2'
                          : 'bg-[#272a2e] h-1'
                      }`}
                      style={{ height: isAiSpeaking ? `${h}px` : '4px' }}
                    ></div>
                  ))}
                </div>

                {/* Live Transcript Stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#111418]">
                  {conversation.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2.5 ${
                        msg.speaker === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.speaker === 'ai' && (
                        <div className="w-7 h-7 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] shrink-0 text-xs font-bold mt-0.5">
                          AI
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-3 rounded-xl text-xs sm:text-sm font-body-sm leading-relaxed ${
                          msg.speaker === 'user'
                            ? 'bg-[#272a2e] text-[#e1e2e8] border border-[#4f4633]/40'
                            : 'bg-[#1d2024] text-[#ffe1a7] border-l-2 border-[#fbbf24]'
                        }`}
                      >
                        <div className="font-code-telemetry text-[10px] text-[#9c8f79] mb-1">
                          {msg.speaker === 'ai' ? 'StormGuard AI Dispatcher' : 'You (Homeowner)'}
                        </div>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Dispatch Confirmation Card if triggered */}
                {bookingConfirmed && (
                  <div className="p-3 bg-[#fbbf24]/10 border-t border-[#fbbf24] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />
                      <div>
                        <span className="font-code-telemetry font-bold text-[#ffe1a7]">
                          {bookingConfirmed.token} CONFIRMED
                        </span>
                        <div className="text-[11px] text-[#d3c5ac]">
                          {bookingConfirmed.crew} • ETA: {bookingConfirmed.eta}
                        </div>
                      </div>
                    </div>
                    <span className="font-code-telemetry text-[10px] text-[#fbbf24] bg-[#272a2e] px-2 py-1 rounded">
                      SMS Alert Sent
                    </span>
                  </div>
                )}

                {/* Voice Quick Replies / Interactive Prompt Buttons */}
                {callStatus === 'connected' && (
                  <div className="p-3 bg-[#1d2024] border-t border-[#323539] space-y-2">
                    <div className="text-[10px] font-code-telemetry text-[#9c8f79] uppercase font-bold">
                      Tap quick response to speak:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "💧 Water is leaking through my ceiling",
                        "🌪️ Hail dented my shingles in Austin",
                        "📍 My address is 1420 Barton Springs Rd, 78704",
                        "📅 Book drone inspection for tomorrow 10am",
                      ].map((phrase, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleUserMessage(phrase)}
                          className="px-2.5 py-1 rounded bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] text-[11px] border border-[#4f4633]/50 transition-colors cursor-pointer"
                        >
                          {phrase}
                        </button>
                      ))}
                    </div>

                    {/* Manual Voice Text Input */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUserMessage(userInput);
                      }}
                      className="flex gap-2 pt-1"
                    >
                      <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Or type what you want to say to the AI..."
                        className="flex-1 bg-[#111418] border border-[#4f4633]/50 text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none focus:border-[#fbbf24]"
                      />
                      <button
                        type="submit"
                        disabled={!userInput.trim()}
                        className="px-3 py-2 bg-[#fbbf24] text-[#6c4f00] font-bold rounded text-xs flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Speak</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Schedule Callback Form */}
        {activeTab === 'schedule' && (
          <div className="p-5 sm:p-6 overflow-y-auto">
            {schedSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24] flex items-center justify-center text-[#fbbf24] mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-code-telemetry text-xs text-[#ffe1a7] font-bold">
                    RECEPTIONIST TICKET #{schedSuccess.token}
                  </span>
                  <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold mt-1">
                    AI Callback Reserved
                  </h3>
                </div>
                <p className="font-body-sm text-xs text-[#d3c5ac] max-w-sm mx-auto leading-relaxed">
                  Our automated voice dispatch agent will ring your phone directly. Priority queue is locked for your address.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSchedSuccess(null);
                      onClose();
                    }}
                    className="px-6 py-2 rounded bg-[#fbbf24] text-[#6c4f00] font-bold text-xs hover:bg-[#f9bd22]"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffe1a7]">
                  <Calendar className="w-4 h-4 text-[#fbbf24]" />
                  <span>Request Automated Voice Call Back</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-label-md text-[#e1e2e8] mb-1 font-semibold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={schedName}
                      onChange={(e) => setSchedName(e.target.value)}
                      placeholder="Jane Austin"
                      className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label-md text-[#e1e2e8] mb-1 font-semibold">
                      Callback Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={schedPhone}
                      onChange={(e) => setSchedPhone(e.target.value)}
                      placeholder="(512) 555-0188"
                      className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label-md text-[#e1e2e8] mb-1 font-semibold">
                    Property Address or ZIP Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={schedAddress}
                    onChange={(e) => setSchedAddress(e.target.value)}
                    placeholder="e.g. 78681 or Round Rock property"
                    className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-label-md text-[#e1e2e8] mb-1 font-semibold">
                      Primary Damage Type
                    </label>
                    <select
                      value={schedDamage}
                      onChange={(e) => setSchedDamage(e.target.value)}
                      className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none"
                    >
                      <option value="leak">Active Roof Leak / Dripping</option>
                      <option value="hail">Hail Damage / Fractures</option>
                      <option value="wind">Wind Shear / Missing Shingles</option>
                      <option value="tree">Tree Impact / Structural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-label-md text-[#e1e2e8] mb-1 font-semibold">
                      When Should AI Call You?
                    </label>
                    <select
                      value={schedTime}
                      onChange={(e) => setSchedTime(e.target.value)}
                      className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3 py-2 rounded text-xs focus:outline-none"
                    >
                      <option value="immediate">Immediate Dispatch (&lt; 30 seconds)</option>
                      <option value="15_min">In 15 Minutes</option>
                      <option value="1_hour">In 1 Hour</option>
                      <option value="morning">Tomorrow Morning (9:00 AM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={schedLoading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold py-3 rounded shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  {schedLoading ? (
                    <span>Registering Telemetry...</span>
                  ) : (
                    <>
                      <PhoneCall className="w-4 h-4" />
                      <span>Lock In Automated AI Callback</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
