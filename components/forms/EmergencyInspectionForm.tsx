'use client';

import { useState } from 'react';
import {
  BellRing,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

interface EmergencyFormProps {
  defaultUrgency?: 'critical' | 'urgent' | 'standard';
  defaultDamageType?: string;
  title?: string;
  subtitle?: string;
}

export default function EmergencyInspectionForm({
  defaultUrgency = 'critical',
  defaultDamageType = 'leak',
  title = "Need Emergency Roof Help Right Now?",
  subtitle = "Lock in an emergency inspection before slots fill across Central Texas storm corridors. We coordinate with all major insurance carriers and provide immediate tarping if required.",
}: EmergencyFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [damageType, setDamageType] = useState(defaultDamageType);
  const [urgency, setUrgency] = useState<'critical' | 'urgent' | 'standard'>(defaultUrgency);
  const [waterEntering, setWaterEntering] = useState('yes');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dispatchToken, setDispatchToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate backend transmission and token generation
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setDispatchToken(`TX-DISPATCH-${randomId}`);
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16" id="quick-form">
      <div className="w-full rounded-2xl bg-gradient-to-br from-[#1d2024] via-[#272a2e] to-[#1d2024] border border-[#4f4633]/60 shadow-2xl p-6 md:p-10 relative overflow-hidden">
        {/* Ambient Glow Behind Form */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#fbbf24]/10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffb4ab] bg-[#93000a]/20 px-3 py-1 rounded border border-[#93000a]/40">
              <BellRing className="w-3.5 h-3.5" />
              <span>Immediate Crew Scheduling</span>
            </div>

            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight">
              {title}
            </h2>

            <p className="font-body-md text-sm md:text-base text-[#d3c5ac] leading-relaxed">
              {subtitle}
            </p>

            {/* Direct Dispatch Hotline Card */}
            <div className="p-4 rounded-lg bg-[#0b0e12] border border-[#4f4633]/30 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#fbbf24]/10 flex items-center justify-center text-[#ffe1a7] shrink-0">
                  <Phone className="w-5 h-5 text-[#fbbf24]" />
                </div>
                <div>
                  <div className="font-label-md text-xs text-[#e1e2e8]">
                    Direct Dispatch Hotline
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="font-code-telemetry text-xl text-[#ffe1a7] font-bold hover:underline"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="font-code-telemetry text-[11px] text-[#c2c7cf]">
                Average phone pickup: &lt; 15 seconds during storm watches.
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-2 space-y-1.5 font-body-sm text-xs text-[#d3c5ac]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
                <span>Zero out-of-pocket required for initial drone inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#fbbf24]" />
                <span>Direct billing coordination with all major insurance carriers</span>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#0b0e12]/90 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-[#fbbf24]/40 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-[#fbbf24]/20 text-[#fbbf24] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-code-telemetry text-xs text-[#ffe1a7] font-bold uppercase tracking-wider">
                    Dispatch Priority Locked
                  </span>
                  <h3 className="font-headline-sm text-2xl text-[#e1e2e8] font-bold mt-1">
                    Emergency Triage Token Created
                  </h3>
                  <div className="inline-block mt-2 px-4 py-1.5 bg-[#1d2024] rounded border border-[#fbbf24] font-code-telemetry text-sm text-[#ffe1a7] font-bold">
                    {dispatchToken}
                  </div>
                </div>
                <p className="font-body-md text-sm text-[#d3c5ac] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name || 'Neighbor'}</strong>. Our field commander is currently reviewing your property details. An emergency technician will call <strong className="text-[#ffe1a7]">{phone}</strong> within 5 to 15 minutes.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#fbbf24] text-[#6c4f00] font-label-md text-xs font-bold px-6 py-2.5 rounded shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Dispatch Now: {SITE_CONFIG.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setZip('');
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded text-xs text-[#d3c5ac] hover:text-white bg-[#272a2e]"
                  >
                    Submit Another Address
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0b0e12]/80 backdrop-blur-md p-4 sm:p-6 rounded-xl border border-[#4f4633]/40 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-xs text-[#e1e2e8] mb-1 font-semibold" htmlFor="contact-name">
                      Your Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Miller"
                      className="w-full bg-[#1d2024] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-xs text-[#e1e2e8] mb-1 font-semibold" htmlFor="contact-phone">
                      Emergency Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(512) 555-0199"
                      className="w-full bg-[#1d2024] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-xs text-[#e1e2e8] mb-1 font-semibold" htmlFor="contact-zip">
                      Central Texas ZIP Code or Address *
                    </label>
                    <input
                      id="contact-zip"
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="e.g. 78701 or 123 Main St"
                      className="w-full bg-[#1d2024] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-xs text-[#e1e2e8] mb-1 font-semibold" htmlFor="damage-type">
                      Primary Damage Type
                    </label>
                    <select
                      id="damage-type"
                      value={damageType}
                      onChange={(e) => setDamageType(e.target.value)}
                      className="w-full bg-[#1d2024] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-sm focus:outline-none transition-colors"
                    >
                      <option value="leak">Active Leak (Interior Dripping)</option>
                      <option value="hail">Hail Damage (Dents / Bruises)</option>
                      <option value="wind">Wind Shear (Missing Shingles)</option>
                      <option value="tree">Tree Impact / Structural Breach</option>
                      <option value="unsure">Unsure / Need Full Drone Scan</option>
                    </select>
                  </div>
                </div>

                {/* Is Water Entering */}
                <div className="p-2.5 rounded bg-[#191c20] border border-[#4f4633]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-label-md text-xs text-[#e1e2e8]">
                    Is water currently entering the home or attic?
                  </span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-[#ffb4ab] cursor-pointer font-bold">
                      <input
                        type="radio"
                        name="waterEntering"
                        value="yes"
                        checked={waterEntering === 'yes'}
                        onChange={(e) => setWaterEntering(e.target.value)}
                        className="text-[#ffb4ab]"
                      />
                      <span>Yes (Active)</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[#d3c5ac] cursor-pointer">
                      <input
                        type="radio"
                        name="waterEntering"
                        value="no"
                        checked={waterEntering === 'no'}
                        onChange={(e) => setWaterEntering(e.target.value)}
                      />
                      <span>No / Not yet</span>
                    </label>
                  </div>
                </div>

                {/* Urgency Level Radio Cards */}
                <div>
                  <span className="block font-label-md text-xs text-[#e1e2e8] mb-1.5 font-semibold">
                    Urgency Level
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <label
                      onClick={() => setUrgency('critical')}
                      className={`cursor-pointer rounded p-2 text-center transition-all border ${
                        urgency === 'critical'
                          ? 'border-[#ffb4ab] bg-[#93000a]/40 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                          : 'border-[#ffb4ab]/40 bg-[#93000a]/15 hover:bg-[#93000a]/25'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value="critical"
                        checked={urgency === 'critical'}
                        onChange={() => setUrgency('critical')}
                        className="sr-only"
                      />
                      <div className="font-label-md text-xs text-[#ffb4ab] font-bold">Critical</div>
                      <div className="font-code-telemetry text-[10px] text-[#ffdcd9]">Active Leak / Tarp</div>
                    </label>

                    <label
                      onClick={() => setUrgency('urgent')}
                      className={`cursor-pointer rounded p-2 text-center transition-all border ${
                        urgency === 'urgent'
                          ? 'border-[#fbbf24] bg-[#fbbf24]/20 shadow-[0_0_12px_rgba(251,191,36,0.25)]'
                          : 'border-[#4f4633]/40 bg-[#1d2024] hover:bg-[#272a2e]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value="urgent"
                        checked={urgency === 'urgent'}
                        onChange={() => setUrgency('urgent')}
                        className="sr-only"
                      />
                      <div className="font-label-md text-xs text-[#ffe1a7] font-bold">Urgent</div>
                      <div className="font-code-telemetry text-[10px] text-[#d3c5ac]">Same-Day Scan</div>
                    </label>

                    <label
                      onClick={() => setUrgency('standard')}
                      className={`cursor-pointer rounded p-2 text-center transition-all border ${
                        urgency === 'standard'
                          ? 'border-[#c2c7cf] bg-[#323539]'
                          : 'border-[#4f4633]/40 bg-[#1d2024] hover:bg-[#272a2e]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value="standard"
                        checked={urgency === 'standard'}
                        onChange={() => setUrgency('standard')}
                        className="sr-only"
                      />
                      <div className="font-label-md text-xs text-[#c2c7cf] font-bold">Standard</div>
                      <div className="font-code-telemetry text-[10px] text-[#d3c5ac]">48-Hr Inspection</div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-sm font-bold py-3.5 rounded transition-all shadow-[0_0_24px_rgba(251,191,36,0.35)] active:scale-[0.99] cursor-pointer disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Telemetry &amp; Dispatching...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Emergency Help &amp; Lock Inspection</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="font-code-telemetry text-[11px] text-[#9c8f79] text-center">
                  Zero obligation • Direct insurer billing available • Licensed &amp; Insured #TX-90281
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
