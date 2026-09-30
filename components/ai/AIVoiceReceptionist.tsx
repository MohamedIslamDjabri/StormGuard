'use client';

import { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  PhoneCall,
  PowerOff,
  Zap,
  FileAudio,
  Radio,
  Navigation,
  CheckCircle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

import AIVoiceCallModal from './AIVoiceCallModal';

type CallState = 'Ready' | 'Connecting' | 'Listening' | 'Processing' | 'Qualified' | 'Inspection Requested';

interface Scenario {
  homeowner: string;
  bot: string;
  severity: 'URGENT' | 'CRITICAL' | 'STANDARD';
  eta: string;
}

const SCENARIOS: Scenario[] = [
  {
    homeowner: '"I have water dripping through our upstairs ceiling right above the nursery after that hail squall..."',
    bot: '"Understood. Mark as interior breach. Dispatching Crew #4 with emergency 30x40 tarp to your address."',
    severity: 'CRITICAL',
    eta: '38 Minutes',
  },
  {
    homeowner: '"60 mile an hour winds just ripped about 20 shingles off our roof and left the black felt showing..."',
    bot: '"Received. High wind shear exposure. Tagged for priority shingle match and temporary seal. Crew #2 assigned."',
    severity: 'URGENT',
    eta: '52 Minutes',
  },
  {
    homeowner: '"Golf ball hail came through Round Rock 20 minutes ago. No leaks inside yet, but gutters are dented to pieces."',
    bot: '"Logged. Heavy hail convection event. Scheduling 4K autonomous drone forensic scan for your address."',
    severity: 'STANDARD',
    eta: 'Today 2:30 PM',
  },
];

export default function AIVoiceReceptionist() {
  const [callState, setCallState] = useState<CallState>('Listening');
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'call' | 'schedule'>('call');

  const scenario = SCENARIOS[scenarioIndex];

  // Rotate scenario when user clicks mic or toggle
  const cycleScenario = () => {
    setCallState('Processing');
    setTimeout(() => {
      setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
      setCallState('Listening');
    }, 600);
  };

  const handleOpenCallModal = (mode: 'call' | 'schedule') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleCallbackClick = () => {
    handleOpenCallModal('call');
  };

  return (
    <section className="w-full bg-[#191c20] border-y border-[#4f4633]/30 py-12 md:py-16">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Voice Tech Interactive Mockup */}
          <div className="lg:col-span-6">
            <div className="w-full rounded-xl bg-[#1d2024] border border-[#4f4633]/50 p-4 sm:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#323539]">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-[#ffe1a7]" />
                  <span className="font-code-telemetry text-xs font-bold text-[#e1e2e8]">
                    VOICE STREAM // DISPATCH LINK
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 font-code-telemetry text-[11px] text-[#ffe1a7] px-2 py-0.5 rounded bg-[#fbbf24]/10 border border-[#fbbf24]/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-ping"></span>
                    STATUS: {callState.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded bg-[#272a2e] text-[#d3c5ac] hover:text-[#ffe1a7] transition-colors"
                    title={isMuted ? "Unmute Mic" : "Mute Mic"}
                  >
                    {isMuted ? <MicOff className="w-3.5 h-3.5 text-[#ffb4ab]" /> : <Mic className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Glowing Audio Waveform Visualizer */}
              <div
                onClick={cycleScenario}
                title="Click to cycle voice scenario"
                className="py-6 flex items-center justify-center gap-1.5 h-24 bg-[#0b0e12]/80 rounded-lg my-4 px-4 cursor-pointer hover:border hover:border-[#fbbf24]/40 transition-all group"
              >
                <div className="w-1.5 bg-[#ffe1a7] rounded-full animate-wave-1"></div>
                <div className="w-1.5 bg-[#fbbf24] rounded-full animate-wave-2"></div>
                <div className="w-1.5 bg-[#ffdf9f] rounded-full animate-wave-3"></div>
                <div className="w-1.5 bg-[#ffe1a7] rounded-full animate-wave-4"></div>
                <div className="w-1.5 bg-[#f9bd22] rounded-full animate-wave-5"></div>
                <div className="w-1.5 bg-[#e1e2e8] rounded-full animate-wave-2"></div>
                <div className="w-1.5 bg-[#ffe1a7] rounded-full animate-wave-3"></div>
                <div className="w-1.5 bg-[#fbbf24] rounded-full animate-wave-1"></div>
                <div className="w-1.5 bg-[#ffdf9f] rounded-full animate-wave-4"></div>
                <div className="w-1.5 bg-[#ffe1a7] rounded-full animate-wave-5"></div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center justify-between text-xs font-code-telemetry text-[#d3c5ac] pb-2">
                <span className="flex items-center gap-1.5 text-[#ffe1a7]">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-[#fbbf24]" />
                  <span>
                    {callState === 'Processing'
                      ? 'Processing Audio Stream...'
                      : isMuted
                      ? 'Microphone Muted'
                      : 'Listening... [Live Audio Stream]'}
                  </span>
                </span>
                <span>Bitrate: 48kHz • Loss: 0%</span>
              </div>

              {/* Live Transcript Preview */}
              <div className="space-y-2 p-3 rounded bg-[#272a2e] border border-[#4f4633]/30 text-[#e1e2e8]">
                <div className="flex items-start gap-2">
                  <span className="font-code-telemetry text-xs text-[#9c8f79] shrink-0 font-bold">
                    [Homeowner]:
                  </span>
                  <p className="font-body-sm text-xs italic text-[#d3c5ac]">
                    {scenario.homeowner}
                  </p>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-[#323539]">
                  <span className="font-code-telemetry text-xs text-[#ffe1a7] shrink-0 font-bold">
                    [StormGuard AI]:
                  </span>
                  <p className="font-body-sm text-xs text-[#e1e2e8]">
                    {scenario.bot}
                  </p>
                </div>
              </div>

              {/* Real-time Classification Card */}
              <div
                className={`mt-3 p-3 rounded flex items-center justify-between border ${
                  scenario.severity === 'CRITICAL'
                    ? 'bg-[#93000a]/20 border-[#ffb4ab]/40'
                    : 'bg-[#191c20] border-[#fbbf24]/40'
                }`}
              >
                <div>
                  <span
                    className={`font-code-telemetry text-xs font-bold uppercase tracking-wider ${
                      scenario.severity === 'CRITICAL' ? 'text-[#ffb4ab]' : 'text-[#ffe1a7]'
                    }`}
                  >
                    Classification: {scenario.severity}
                  </span>
                  <div className="font-body-sm text-xs text-[#e1e2e8]">
                    Priority Tarping Required • ETA: {scenario.eta}
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    scenario.severity === 'CRITICAL'
                      ? 'bg-[#93000a]/30 text-[#ffb4ab]'
                      : 'bg-[#fbbf24]/20 text-[#fbbf24]'
                  }`}
                >
                  <Navigation className="w-4 h-4" />
                </div>
              </div>

              {/* Call to action button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => handleOpenCallModal('call')}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold py-3 rounded transition-colors shadow-[0_0_20px_rgba(251,191,36,0.25)] active:scale-95 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Request AI Emergency Call Back (30s Wait)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Voice Explainer Content */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7] bg-[#1d2024] px-3 py-1 rounded border border-[#4f4633]/30">
              <Zap className="w-4 h-4 text-[#fbbf24]" />
              <span>Zero-Friction Voice Command</span>
            </div>

            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight">
              Emergency Help, <br />
              <span className="text-[#ffdf9f]">Even When You Can&apos;t Type.</span>
            </h2>

            <p className="font-body-md text-sm md:text-base text-[#d3c5ac] leading-relaxed">
              When power is out, rain is pouring through ceilings, and storm chaos is raging, nobody has time to fill out 20 form fields. Call or speak directly to the StormGuard AI Voice Receptionist.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#272a2e] flex items-center justify-center text-[#ffe1a7] shrink-0 mt-0.5">
                  <PowerOff className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-label-lg text-sm text-[#e1e2e8] font-bold">
                    No Power or Wi-Fi Needed
                  </h4>
                  <p className="font-body-sm text-xs text-[#d3c5ac] mt-0.5">
                    Operates via standard cellular line or offline mesh protocol with automatic location triangulation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#272a2e] flex items-center justify-center text-[#ffe1a7] shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-label-lg text-sm text-[#e1e2e8] font-bold">
                    Under 30-Second Triage
                  </h4>
                  <p className="font-body-sm text-xs text-[#d3c5ac] mt-0.5">
                    Classifies hazards instantly and dispatches the closest active roofing van with the right materials.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#272a2e] flex items-center justify-center text-[#ffe1a7] shrink-0 mt-0.5">
                  <FileAudio className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-label-lg text-sm text-[#e1e2e8] font-bold">
                    Voice-to-Claim Audio Transcripts
                  </h4>
                  <p className="font-body-sm text-xs text-[#d3c5ac] mt-0.5">
                    Creates time-stamped, unalterable voice evidence proving exactly when storm ingress began for insurance claims.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Voice Call & Booking Modal */}
      <AIVoiceCallModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultMode={modalMode}
      />
    </section>
  );
}
