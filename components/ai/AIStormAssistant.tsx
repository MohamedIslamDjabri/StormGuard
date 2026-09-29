'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Bot,
  CheckCircle,
  BrainCircuit,
  Clock,
  ArrowRight,
  AlertTriangle,
  Flame,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { TRIAGE_OPTIONS, TriageOption } from '@/constants/data';

export default function AIStormAssistant() {
  const [selectedKey, setSelectedKey] = useState<string>('leak');
  const [hasWaterEntering, setHasWaterEntering] = useState<boolean | null>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const currentOption: TriageOption = TRIAGE_OPTIONS[selectedKey] || TRIAGE_OPTIONS.leak;

  const handleSelect = (key: string) => {
    setIsAnalyzing(true);
    setSelectedKey(key);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 300);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16" id="triage-terminal">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Intro */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7] bg-[#1d2024] px-3 py-1 rounded border border-[#4f4633]/40">
            <BrainCircuit className="w-4 h-4 text-[#fbbf24]" />
            <span>Automated Damage Diagnostics</span>
          </div>

          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] tracking-tight font-bold">
            Not Sure How Bad the Damage Is? <br />
            <span className="text-[#f9bd22]">Ask StormGuard AI.</span>
          </h2>

          <p className="font-body-md text-sm md:text-base text-[#d3c5ac] leading-relaxed">
            Our proprietary field AI calculates water intrusion risk and wind-shear severity in seconds. Get instant triage classification, calculate crew dispatch readiness, and prepare your insurance claim packet before the storm clears.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
              <CheckCircle className="w-4 h-4 text-[#ffe1a7] shrink-0" />
              <span>Real-time storm radar cross-referencing</span>
            </div>
            <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
              <CheckCircle className="w-4 h-4 text-[#ffe1a7] shrink-0" />
              <span>Instant photographic hail pattern scoring</span>
            </div>
            <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
              <CheckCircle className="w-4 h-4 text-[#ffe1a7] shrink-0" />
              <span>Direct tie-in to active Austin emergency dispatchers</span>
            </div>
          </div>
        </div>

        {/* Conversational UI Card */}
        <div className="lg:col-span-7">
          <div className="w-full rounded-xl bg-[#1d2024] border border-[#4f4633]/50 shadow-2xl p-4 sm:p-6 relative overflow-hidden backdrop-blur-lg">
            {/* Card Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#323539]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#ffe1a7]" />
                </div>
                <div>
                  <div className="font-label-lg text-sm text-[#e1e2e8] flex items-center gap-2 font-bold">
                    <span>StormGuard AI Triage Bot</span>
                    <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-pulse"></span>
                  </div>
                  <div className="font-code-telemetry text-[11px] text-[#d3c5ac]">
                    Central Texas Dispatch Sync • Active
                  </div>
                </div>
              </div>
              <span className="font-code-telemetry text-xs text-[#f9bd22] bg-[#272a2e] px-2.5 py-1 rounded border border-[#4f4633]/40">
                V4.8 TACTICAL
              </span>
            </div>

            {/* Chat Window */}
            <div className="py-4 space-y-4">
              {/* Bot Message */}
              <div className="flex items-start gap-2.5 max-w-xl">
                <div className="w-7 h-7 rounded-full bg-[#ffe1a7]/20 shrink-0 flex items-center justify-center text-[#ffe1a7] mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3.5 rounded-lg bg-[#272a2e] border-l-2 border-[#fbbf24] text-[#e1e2e8] font-body-md text-sm shadow-sm leading-relaxed">
                  Severe thunderstorm cell detected in your area. What visible signs or symptoms are you seeing on or inside your property?
                </div>
              </div>

              {/* Homeowner Clickable Response Chips */}
              <div className="pl-9 space-y-2">
                <p className="font-label-sm text-[11px] uppercase tracking-wider text-[#9c8f79] font-bold">
                  Select your primary symptom:
                </p>
                <div className="flex flex-wrap gap-2" id="triage-chips">
                  {Object.values(TRIAGE_OPTIONS).map((opt) => {
                    const isSelected = selectedKey === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelect(opt.id)}
                        className={`px-3 py-1.5 rounded font-label-md text-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-[#fbbf24]/20 text-[#ffe1a7] border border-[#fbbf24] shadow-[0_0_12px_rgba(251,191,36,0.3)] font-bold'
                            : 'bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] border border-[#4f4633]/50'
                        }`}
                      >
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Follow-Up: Water Intrusion Toggle */}
              <div className="pl-9 pt-1">
                <div className="p-3 rounded-lg bg-[#191c20] border border-[#4f4633]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-body-sm text-xs text-[#d3c5ac]">
                    Is water currently penetrating interior drywall or ceilings?
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setHasWaterEntering(true)}
                      className={`px-3 py-1 rounded text-xs font-label-md transition-colors cursor-pointer ${
                        hasWaterEntering === true
                          ? 'bg-[#93000a] text-white border border-[#ffb4ab]'
                          : 'bg-[#272a2e] text-[#d3c5ac] hover:text-white'
                      }`}
                    >
                      Yes (Active)
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasWaterEntering(false)}
                      className={`px-3 py-1 rounded text-xs font-label-md transition-colors cursor-pointer ${
                        hasWaterEntering === false
                          ? 'bg-[#272a2e] text-[#ffe1a7] border border-[#fbbf24]'
                          : 'bg-[#272a2e] text-[#d3c5ac] hover:text-white'
                      }`}
                    >
                      No / Unsure
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Classification Card */}
              <div
                className={`p-4 rounded-lg bg-[#0b0e12] border transition-all duration-300 relative ${
                  hasWaterEntering || currentOption.category === 'critical'
                    ? 'border-[#ffb4ab]/40 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                    : 'border-[#fbbf24]/40 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
                }`}
              >
                {isAnalyzing ? (
                  <div className="py-6 flex flex-col items-center justify-center gap-2 text-center">
                    <div className="w-6 h-6 border-2 border-[#fbbf24] border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-code-telemetry text-xs text-[#ffe1a7]">
                      Analyzing Doppler radar cell &amp; structural impact risk...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between pb-2 border-b border-[#1d2024]">
                      <span
                        className={`inline-flex items-center gap-1.5 font-code-telemetry text-xs font-bold ${
                          hasWaterEntering || currentOption.category === 'critical'
                            ? 'text-[#ffb4ab]'
                            : 'text-[#ffe1a7]'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {hasWaterEntering && currentOption.category !== 'critical'
                          ? 'CRITICAL: ESCALATED DUE TO ACTIVE INTERIOR MOISTURE'
                          : currentOption.badgeTitle}
                      </span>
                      <span className="font-code-telemetry text-[11px] text-[#c2c7cf]">
                        ID: TX-STORM-894
                      </span>
                    </div>

                    <p className="font-body-sm text-xs sm:text-sm text-[#e1e2e8] mt-2 leading-relaxed">
                      {hasWaterEntering
                        ? 'Active water penetration requires emergency tarping within 60 minutes to mitigate structural rafter damage, electrical shorting, and drywall rot. Qualified under insurance emergency mitigation guidelines.'
                        : currentOption.description}
                    </p>

                    <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#272a2e]">
                      <div className="flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7]">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>
                          {hasWaterEntering
                            ? 'Mobile Emergency Van ETA: 30-45 Mins'
                            : currentOption.eta}
                        </span>
                      </div>

                      <Link
                        href="#quick-form"
                        className="inline-flex items-center justify-center gap-1.5 bg-[#fbbf24] text-[#6c4f00] font-label-md text-xs font-bold px-4 py-2 rounded hover:bg-[#f9bd22] transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)] whitespace-nowrap active:scale-95"
                      >
                        <span>
                          {hasWaterEntering
                            ? 'Lock In Rapid Tarping Dispatch'
                            : currentOption.actionCta}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
