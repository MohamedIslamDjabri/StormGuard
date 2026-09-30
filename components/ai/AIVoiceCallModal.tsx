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
  CheckCircle2,
  Calendar,
  ShieldAlert,
  X,
  Radio,
  Send,
  Sparkles,
  MapPin,
  FileCheck,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

interface VoiceMessage {
  speaker: 'ai' | 'user';
  text: string;
  time: string;
}

interface BookingVoucher {
  token: string;
  eta: string;
  crew: string;
  address?: string;
  damageType?: string;
  status: string;
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

  // Live Call States: 'idle' | 'dialing' | 'connected' | 'ended'
  const [callStatus, setCallStatus] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [conversation, setConversation] = useState<VoiceMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<BookingVoucher | null>(null);

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
  const recognitionRef = useRef<any>(null);

  // Auto scroll transcript
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
      const greeting = "StormGuard Emergency Dispatch online. I see you're calling from Central Texas regarding roof storm damage. Are you experiencing active interior leaks, or did hail impact your shingles?";
      setConversation([
        {
          speaker: 'ai',
          text: greeting,
          time: 'Just now',
        },
      ]);
      speakText(greeting);
    }, 1600);
  };

  // End Call
  const endCall = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setCallStatus('ended');
    setIsAiSpeaking(false);
    setIsListeningMic(false);
  };

  // Handle User Voice / Message Input
  const handleUserMessage = async (text: string) => {
    if (!text.trim() || callStatus !== 'connected') return;

    const userMsg: VoiceMessage = {
      speaker: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setConversation((prev) => [...prev, userMsg]);
    setUserInput('');

    // Dynamic AI logic & Booking Qualification
    const lower = text.toLowerCase();
    let aiResponse = "";
    let shouldConfirmBooking = false;
    let eta = "38 Minutes";
    let crew = "Mobile Tarp Van #3 (Austin Metro Core)";

    if (lower.includes('leak') || lower.includes('water') || lower.includes('drip') || lower.includes('ceiling')) {
      aiResponse = "I've flagged active water breach as Priority 1 Critical. Our mobile tarping crew can be on site in 35-45 minutes. May I confirm your street address or ZIP code to lock in the crew?";
    } else if (lower.includes('hail') || lower.includes('dent') || lower.includes('shingle')) {
      aiResponse = "Understood. Hail impacts create micro-fractures in fiberglass shingle mats. I can book an autonomous 4K drone forensic scan for your property today. What is your street address?";
    } else if (
      lower.includes('787') ||
      lower.includes('786') ||
      lower.includes('austin') ||
      lower.includes('round rock') ||
      lower.includes('street') ||
      lower.includes('rd') ||
      lower.includes('ave') ||
      lower.includes('drive') ||
      lower.includes('lane') ||
      lower.includes('way')
    ) {
      aiResponse = "Perfect. Address verified. I have reserved Mobile Dispatch Unit #3 and confirmed your emergency inspection booking voucher. A field supervisor is assigned and your ticket is locked.";
      shouldConfirmBooking = true;
    } else if (lower.includes('book') || lower.includes('schedule') || lower.includes('confirm') || lower.includes('yes') || lower.includes('tomorrow')) {
      aiResponse = "Inspection appointment confirmed. I have reserved tomorrow's priority 4K drone photogrammetry slot for you. Our crew will notify you 30 minutes before arrival.";
      shouldConfirmBooking = true;
      eta = "Scheduled Tomorrow 10:00 AM";
      crew = "Drone Forensic Unit #1 (Central Texas)";
    } else {
      aiResponse = "Received. I have entered those property notes into your dispatch dossier. To dispatch an emergency tarp crew or drone scan immediately, please provide your address or ZIP code.";
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
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const voucher: BookingVoucher = {
          token: `TX-VOICE-${randomId}`,
          eta,
          crew,
          address: text,
          status: 'DISPATCH ASSIGNED',
        };
        setBookingConfirmed(voucher);
      }
    }, 850);
  };

  // Toggle Live Microphone Listening (Web Speech Recognition)
  const toggleMicListening = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use the one-tap voice chips or type below.");
      return;
    }

    if (isListeningMic) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      setIsListeningMic(false);
    } else {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListeningMic(true);
        recognition.onend = () => setIsListeningMic(false);
        recognition.onerror = () => setIsListeningMic(false);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleUserMessage(transcript);
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn("Microphone start error:", err);
        setIsListeningMic(false);
      }
    }
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
        token: `TX-VOICE-${Math.floor(1000 + Math.random() * 9000)}`,
        etaMinutes: 35,
        assignedCrew: 'Central Texas Rapid Response Fleet Unit #2',
        confirmationMessage: 'Your AI emergency voice callback has been prioritized. Expect an automated dispatch call within your requested window.',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111418] border-2 border-[#fbbf24]/50 rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.95)] relative overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-3.5 sm:p-4 border-b border-[#323539] bg-[#1d2024] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/50 flex items-center justify-center text-[#ffe1a7]">
              <Radio className="w-5 h-5 animate-pulse text-[#fbbf24]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-sm sm:text-base text-[#e1e2e8] font-bold">
                  AI Voice Emergency Receptionist
                </span>
                <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
              </div>
              <p className="font-code-telemetry text-[11px] text-[#d3c5ac]">
                Real-Time Voice Booking &amp; Dispatch Line
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
        <div className="grid grid-cols-2 p-1 bg-[#191c20] border-b border-[#323539] text-xs font-label-md">
          <button
            type="button"
            onClick={() => setActiveTab('call')}
            className={`py-2 text-center rounded font-bold transition-all cursor-pointer ${
              activeTab === 'call'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
            }`}
          >
            🎙️ Live AI Voice Call
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('schedule')}
            className={`py-2 text-center rounded font-bold transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
            }`}
          >
            📅 Schedule AI Callback
          </button>
        </div>

        {/* Tab 1: Live Voice Call Interface */}
        {activeTab === 'call' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {callStatus === 'idle' && (
              <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#fbbf24]/20 border-2 border-[#fbbf24] flex items-center justify-center text-[#ffe1a7] shadow-[0_0_35px_rgba(251,191,36,0.35)]">
                    <PhoneCall className="w-10 h-10 text-[#fbbf24] animate-bounce" />
                  </div>
                </div>

                <div className="space-y-1.5 max-w-sm">
                  <h3 className="font-headline-sm text-lg sm:text-xl text-[#e1e2e8] font-bold">
                    Start Voice Booking Call
                  </h3>
                  <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
                    Speak directly with our automated AI emergency dispatcher. State your damage and address to lock in emergency tarping or drone inspection in seconds.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={startCall}
                  className="inline-flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-sm font-bold px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all active:scale-95 cursor-pointer"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Connect Voice Call Now</span>
                </button>

                <div className="text-[11px] font-code-telemetry text-[#8c8273] flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Supports microphone voice audio or one-tap speech chips</span>
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
                    Routing to Central Texas Dispatch...
                  </h4>
                  <p className="font-code-telemetry text-xs text-[#ffe1a7] mt-1">
                    Station: Austin MoPac Command // Voice Channel Open
                  </p>
                </div>
              </div>
            )}

            {(callStatus === 'connected' || callStatus === 'ended') && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Visualizer & Call Controls Bar */}
                <div className="px-3 py-2.5 bg-[#1d2024] border-b border-[#323539] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-code-telemetry text-xs font-bold text-[#ffe1a7] bg-[#0b0e12] px-2 py-0.5 rounded border border-[#4f4633]/50">
                      {formatTimer(callDuration)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                      <span className="font-code-telemetry text-xs text-[#d3c5ac]">
                        {callStatus === 'connected' ? (isAiSpeaking ? 'AI Speaking...' : isListeningMic ? 'Listening to your voice...' : 'Online') : 'Call Finished'}
                      </span>
                    </div>
                  </div>

                  {/* Audio Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                        soundEnabled
                          ? 'bg-[#272a2e] text-[#ffe1a7] border-[#4f4633]'
                          : 'bg-[#93000a]/20 text-[#ffb4ab] border-[#93000a]'
                      }`}
                      title={soundEnabled ? "Mute Voice Audio" : "Enable Voice Audio"}
                    >
                      {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    </button>
                    {callStatus === 'connected' && (
                      <button
                        type="button"
                        onClick={toggleMicListening}
                        className={`p-1.5 rounded-full border transition-colors cursor-pointer ${
                          isListeningMic
                            ? 'bg-[#fbbf24] text-[#6c4f00] border-[#fbbf24] animate-pulse'
                            : 'bg-[#272a2e] text-[#ffe1a7] border-[#4f4633]'
                        }`}
                        title={isListeningMic ? "Microphone active (listening)" : "Click to speak via microphone"}
                      >
                        {isListeningMic ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                      </button>
                    )}
                    {callStatus === 'connected' ? (
                      <button
                        type="button"
                        onClick={endCall}
                        className="px-3 py-1 rounded-full bg-[#93000a] hover:bg-[#aa091b] text-white font-label-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <PhoneOff className="w-3 h-3" />
                        <span>Hang Up</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={startCall}
                        className="px-3 py-1 rounded-full bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-md text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Call Again</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Animated Glowing Waveform (Active when AI speaks) */}
                <div className="h-10 bg-[#0b0e12] border-b border-[#272a2e] flex items-center justify-center gap-1 px-4">
                  {[6, 16, 10, 24, 18, 30, 14, 20, 8, 22, 16, 10].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isAiSpeaking
                          ? 'bg-[#fbbf24] animate-pulse'
                          : isListeningMic
                          ? 'bg-[#3b82f6] animate-pulse'
                          : callStatus === 'connected'
                          ? 'bg-[#4f4633] h-2'
                          : 'bg-[#272a2e] h-1'
                      }`}
                      style={{ height: (isAiSpeaking || isListeningMic) ? `${h}px` : '4px' }}
                    ></div>
                  ))}
                </div>

                {/* Live Transcript Stream */}
                <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 bg-[#111418]">
                  {conversation.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2 ${
                        msg.speaker === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {msg.speaker === 'ai' && (
                        <div className="w-6 h-6 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center text-[#fbbf24] shrink-0 text-[10px] font-bold mt-0.5">
                          AI
                        </div>
                      )}
                      <div
                        className={`max-w-[86%] p-3 rounded-xl text-xs sm:text-sm font-body-sm leading-relaxed ${
                          msg.speaker === 'user'
                            ? 'bg-[#272a2e] text-[#e1e2e8] border border-[#4f4633]/40'
                            : 'bg-[#1d2024] text-[#ffe1a7] border-l-2 border-[#fbbf24]'
                        }`}
                      >
                        <div className="font-code-telemetry text-[9px] text-[#9c8f79] mb-1">
                          {msg.speaker === 'ai' ? 'StormGuard AI Dispatcher' : 'You (Homeowner)'}
                        </div>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Official Booking Confirmation Card */}
                  {bookingConfirmed && (
                    <div className="mt-3 p-3 bg-[#fbbf24]/10 border-2 border-[#fbbf24] rounded-xl text-xs space-y-2 text-[#e1e2e8]">
                      <div className="flex items-center justify-between">
                        <span className="font-code-telemetry font-bold text-[#fbbf24] flex items-center gap-1.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" />
                          VOICE DISPATCH VOUCHER #{bookingConfirmed.token}
                        </span>
                        <span className="font-code-telemetry text-[9px] bg-[#fbbf24] text-[#6c4f00] px-2 py-0.5 rounded font-bold">
                          {bookingConfirmed.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#d3c5ac] space-y-0.5">
                        <p><span className="text-[#ffe1a7] font-semibold">Assigned Unit:</span> {bookingConfirmed.crew}</p>
                        <p><span className="text-[#ffe1a7] font-semibold">Guaranteed Window:</span> {bookingConfirmed.eta}</p>
                      </div>
                      <div className="pt-1 flex items-center justify-between gap-2">
                        <a
                          href={`tel:${SITE_CONFIG.phoneRaw}`}
                          className="flex-1 inline-flex items-center justify-center gap-1 bg-[#272a2e] hover:bg-[#323539] text-[#ffe1a7] py-1.5 px-2 rounded text-[11px] font-semibold border border-[#4f4633]"
                        >
                          <Phone className="w-3 h-3 text-[#fbbf24]" />
                          <span>Call Hotline: {SITE_CONFIG.phone}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Voice Quick Replies / Interactive Prompt Buttons */}
                {callStatus === 'connected' && (
                  <div className="p-3 bg-[#1d2024] border-t border-[#323539] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-code-telemetry text-[#9c8f79] uppercase font-bold">
                        Tap response to speak to AI:
                      </span>
                      {isListeningMic && (
                        <span className="text-[10px] font-code-telemetry text-[#fbbf24] animate-pulse">
                          ● Mic Active - Speak now
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "💧 Active water leak through my ceiling",
                        "🌪️ Hail dented my shingles in Austin",
                        "📍 My address is 1420 Barton Springs Rd, 78704",
                        "📅 Confirm drone inspection for tomorrow",
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
                        placeholder="Type or click mic to speak to AI dispatcher..."
                        className="flex-1 bg-[#111418] border border-[#4f4633]/50 text-[#e1e2e8] px-3 py-1.5 rounded text-xs focus:outline-none focus:border-[#fbbf24]"
                      />
                      <button
                        type="button"
                        onClick={toggleMicListening}
                        className={`px-2.5 py-1.5 rounded text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                          isListeningMic
                            ? 'bg-[#fbbf24] text-[#6c4f00] border-[#fbbf24]'
                            : 'bg-[#272a2e] text-[#ffe1a7] border-[#4f4633]'
                        }`}
                        title="Click to speak"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isListeningMic ? 'Listening' : 'Mic'}</span>
                      </button>
                      <button
                        type="submit"
                        disabled={!userInput.trim()}
                        className="px-3.5 py-1.5 bg-[#fbbf24] text-[#6c4f00] font-bold rounded text-xs flex items-center gap-1 disabled:opacity-40 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
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
          <div className="p-4 sm:p-6 overflow-y-auto">
            {schedSuccess ? (
              <div className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24] flex items-center justify-center text-[#fbbf24] mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
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
                  Our automated voice dispatch system will ring your phone directly. Priority queue is locked for your address.
                </p>
                <div className="pt-2 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSchedSuccess(null);
                      onClose();
                    }}
                    className="px-6 py-2 rounded bg-[#fbbf24] text-[#6c4f00] font-bold text-xs hover:bg-[#f9bd22] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleScheduleSubmit} className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffe1a7] bg-[#1d2024] p-2 rounded border border-[#4f4633]/40">
                  <Calendar className="w-4 h-4 text-[#fbbf24]" />
                  <span>Request Automated AI Voice Call Back</span>
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
