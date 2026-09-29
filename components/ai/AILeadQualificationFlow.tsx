'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Clock,
  Sparkles,
  Phone,
  Home,
} from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

export default function AILeadQualificationFlow() {
  const [step, setStep] = useState<number>(1);
  const [damageType, setDamageType] = useState<string>('leak');
  const [waterStatus, setWaterStatus] = useState<string>('dripping');
  const [ceilingSagging, setCeilingSagging] = useState<boolean>(true);
  const [propertyAddress, setPropertyAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  // Calculate Urgency Level
  let calculatedPriority: 'CRITICAL' | 'URGENT' | 'STANDARD' = 'STANDARD';
  if (waterStatus === 'dripping' || ceilingSagging || damageType === 'tree') {
    calculatedPriority = 'CRITICAL';
  } else if (damageType === 'hail' || damageType === 'wind' || waterStatus === 'damp') {
    calculatedPriority = 'URGENT';
  }

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full rounded-2xl bg-[#1d2024] border border-[#4f4633]/60 p-6 md:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Flow Header & Step Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#323539]">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
            <span className="font-code-telemetry text-xs text-[#ffe1a7] font-bold">
              AI LEAD QUALIFICATION ENGINE
            </span>
          </div>
          <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold mt-1">
            Automated Damage Severity Assessment
          </h3>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5 font-code-telemetry text-xs">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold transition-colors ${
                step === s
                  ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                  : step > s
                  ? 'bg-[#272a2e] text-[#ffe1a7] border border-[#4f4633]'
                  : 'bg-[#191c20] text-[#9c8f79]'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="py-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="font-label-sm text-[11px] text-[#9c8f79] uppercase font-bold tracking-wider">
                Step 1 of 4: Primary Breach Category
              </span>
              <h4 className="font-headline-sm text-lg text-[#e1e2e8] font-bold mt-0.5">
                What event caused the damage to your property?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { id: 'hail', label: 'Hail Damage', desc: 'Dents, granule loss, bruising' },
                { id: 'wind', label: 'Wind Damage', desc: 'Missing shingles, peeled ridge' },
                { id: 'leak', label: 'Active Roof Leak', desc: 'Water penetrating inside' },
                { id: 'tree', label: 'Tree / Structural', desc: 'Impact, broken rafters' },
                { id: 'stain', label: 'Ceiling Stain', desc: 'Yellow or brown water rings' },
                { id: 'unsure', label: 'Not Sure / Pre-Claim', desc: 'Need drone verification' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDamageType(opt.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                    damageType === opt.id
                      ? 'bg-[#fbbf24]/20 border-[#fbbf24] text-[#ffe1a7] shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                      : 'bg-[#272a2e] border-[#4f4633]/40 text-[#e1e2e8] hover:bg-[#323539]'
                  }`}
                >
                  <div className="font-label-lg text-sm font-bold">{opt.label}</div>
                  <div className="font-body-sm text-xs text-[#d3c5ac] mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="font-label-sm text-[11px] text-[#9c8f79] uppercase font-bold tracking-wider">
                Step 2 of 4: Interior Threat Analysis
              </span>
              <h4 className="font-headline-sm text-lg text-[#e1e2e8] font-bold mt-0.5">
                Is water penetrating the building envelope?
              </h4>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-label-md text-[#d3c5ac]">
                Current Water Penetration State:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'dripping', label: 'Active Dripping', desc: 'Requires bucket / pan' },
                  { id: 'damp', label: 'Damp / Wet Insulation', desc: 'Attic or ceiling damp' },
                  { id: 'none', label: 'No Interior Signs', desc: 'Exterior only for now' },
                ].map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWaterStatus(w.id)}
                    className={`p-3 rounded-lg text-left border transition-colors cursor-pointer ${
                      waterStatus === w.id
                        ? 'bg-[#fbbf24]/20 border-[#fbbf24] text-[#ffe1a7] font-bold'
                        : 'bg-[#272a2e] border-[#4f4633]/40 text-[#e1e2e8]'
                    }`}
                  >
                    <div className="text-xs font-bold">{w.label}</div>
                    <div className="text-[11px] text-[#d3c5ac]">{w.desc}</div>
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-[#0b0e12] border border-[#4f4633]/40 flex items-center justify-between gap-4 mt-4">
                <span className="font-body-sm text-xs text-[#e1e2e8]">
                  Are drywall ceilings noticeably sagging or bulging?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCeilingSagging(true)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      ceilingSagging
                        ? 'bg-[#93000a] text-white border border-[#ffb4ab]'
                        : 'bg-[#272a2e] text-[#d3c5ac]'
                    }`}
                  >
                    Yes (Warning)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCeilingSagging(false)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      !ceilingSagging
                        ? 'bg-[#272a2e] text-[#ffe1a7] border border-[#fbbf24]'
                        : 'bg-[#272a2e] text-[#d3c5ac]'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="font-label-sm text-[11px] text-[#9c8f79] uppercase font-bold tracking-wider">
                Step 3 of 4: Property &amp; Dispatch Details
              </span>
              <h4 className="font-headline-sm text-lg text-[#e1e2e8] font-bold mt-0.5">
                Where should we deploy our diagnostic team?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-md text-[#e1e2e8] mb-1">
                  Property Street Address *
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  placeholder="e.g. 1420 Barton Springs Rd"
                  className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-label-md text-[#e1e2e8] mb-1">
                  Central Texas ZIP Code *
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="78704"
                  className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-label-md text-[#e1e2e8] mb-1">
                  Homeowner / Property Contact Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-label-md text-[#e1e2e8] mb-1">
                  Mobile Callback Phone *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(512) 555-0144"
                  className="w-full bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="font-label-sm text-[11px] text-[#9c8f79] uppercase font-bold tracking-wider">
                Step 4 of 4: Priority Classification Result
              </span>
              <h4 className="font-headline-sm text-lg text-[#e1e2e8] font-bold mt-0.5">
                Dispatch Priority Scorecard
              </h4>
            </div>

            <div
              className={`p-5 rounded-xl border ${
                calculatedPriority === 'CRITICAL'
                  ? 'bg-[#93000a]/20 border-[#ffb4ab] shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  : calculatedPriority === 'URGENT'
                  ? 'bg-[#fbbf24]/10 border-[#fbbf24] shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                  : 'bg-[#191c20] border-[#c2c7cf]/40'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#272a2e]">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      calculatedPriority === 'CRITICAL' ? 'text-[#ffb4ab]' : 'text-[#fbbf24]'
                    }`}
                  />
                  <span className="font-headline-sm text-lg font-bold text-white">
                    TRIAGE STATUS: {calculatedPriority}
                  </span>
                </div>
                <span className="font-code-telemetry text-xs font-bold text-[#ffe1a7] bg-[#0b0e12] px-3 py-1 rounded">
                  QUEUE #042
                </span>
              </div>

              <div className="py-3 text-xs sm:text-sm text-[#e1e2e8] space-y-2">
                <p>
                  {calculatedPriority === 'CRITICAL'
                    ? 'Active structural or ceiling water penetration detected. Priority 1 tarping crew authorized under emergency mitigation.'
                    : calculatedPriority === 'URGENT'
                    ? 'Storm damage compromises roof barrier integrity. Priority 2 drone forensic sweep recommended within 24 hours.'
                    : 'No catastrophic breach detected. Standard 48-hour drone photogrammetry slot reserved.'}
                </p>
                <div className="font-code-telemetry text-xs text-[#ffe1a7]">
                  Estimated Dispatch Arrival Window: {calculatedPriority === 'CRITICAL' ? '30-45 Minutes' : 'Same-Day (2-4 Hours)'}
                </div>
              </div>

              <div className="pt-3 border-t border-[#272a2e] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] font-code-telemetry text-[#c2c7cf]">
                  Address: {propertyAddress || 'Austin Area Property'} • Phone: {phoneNumber || '(555) 718-STORM'}
                </span>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fbbf24] text-[#6c4f00] font-label-md text-xs font-bold px-5 py-2.5 rounded shadow-lg hover:bg-[#f9bd22] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call to Confirm Dispatch Now</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[#323539]">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-label-md text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-md text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] cursor-pointer"
          >
            <span>Continue Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="px-4 py-2 rounded bg-[#272a2e] text-[#d3c5ac] hover:text-white font-label-md text-xs cursor-pointer"
          >
            Restart Assessment
          </button>
        )}
      </div>
    </div>
  );
}
