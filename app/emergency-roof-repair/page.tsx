import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, Clock, Phone, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import AIVoiceReceptionist from '@/components/ai/AIVoiceReceptionist';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Emergency Roof Repair | StormGuard Roofing',
  description: '24/7 rapid emergency roof tarping and leak stabilization across Central Texas. Average crew arrival within 38-50 minutes.',
};

export default function EmergencyRoofRepairPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Emergency roof repair background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93000a]/30 border border-[#ffb4ab]/40 text-[#ffb4ab] font-code-telemetry text-xs font-bold uppercase">
            <span className="h-2 w-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
            <span>24/7 Rapid Response Protocol Active</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Emergency Roof Repair <br />
            <span className="text-[#fbbf24]">&amp; 2-Hour Tarping</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Active interior leaks destroy drywall, ruin electrical circuits, and cultivate toxic mold within 24 hours. Our tactical mobile units arrive equipped with heavy-duty commercial tarps to stop water intrusion immediately.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold px-6 py-3.5 rounded shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency Dispatch: {SITE_CONFIG.phone}</span>
            </a>
            <Link
              href="#quick-form"
              className="inline-flex items-center justify-center gap-2 bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-label-md text-xs px-6 py-3.5 rounded border border-[#4f4633]/60"
            >
              <span>Get Emergency Help (Form)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Protocol Specs */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#ffb4ab]/30 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Guaranteed 2-Hour Tarp Deployment
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              When storms hit, response speed determines whether your interior hardwood floors and ceilings survive. We dispatch our nearest mobile unit within 15 minutes of your call.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Zero-Puncture Compression Battens
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Inexperienced contractors nail tarps through good shingles, creating new leak points. We anchor heavy-duty 40-mil woven poly tarps using non-destructive perimeter sandbags and wooden ridge compression.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Insurer-Approved Emergency Billing
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Standard Texas homeowner insurance covers emergency mitigation in addition to policy limits. We document and submit itemized invoices directly to your adjuster for seamless reimbursement.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Receptionist Component */}
      <AIVoiceReceptionist />

      {/* Emergency Form */}
      <EmergencyInspectionForm
        defaultUrgency="critical"
        defaultDamageType="leak"
        title="Immediate Emergency Tarp Dispatch"
        subtitle="Submit your address now to queue our closest Central Texas mobile response truck. If water is actively pouring, call (555) 718-STORM immediately."
      />

      {/* Emergency FAQs */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <FAQSection category="emergency-repairs" />
      </section>
    </div>
  );
}
