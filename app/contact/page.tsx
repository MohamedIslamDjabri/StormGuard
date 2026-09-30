import type { Metadata } from 'next';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ShieldAlert, Radio, ArrowRight } from 'lucide-react';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Contact & 24/7 Dispatch | StormGuard Roofing',
  description: 'Reach StormGuard Roofing 24/7 emergency dispatch command. Instant phone support at (555) 718-STORM for Texas roof leaks and storm damage.',
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Contact command center background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93000a]/20 border border-[#93000a]/40 text-[#ffb4ab] font-code-telemetry text-xs font-bold uppercase">
            <span className="h-2 w-2 rounded-full bg-[#ffb4ab] animate-ping"></span>
            <span>Live Dispatch Lines Open 24/7</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Contact Emergency Dispatch <br />
            <span className="text-[#fbbf24]">&amp; Command Logistics</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Whether water is dripping through your ceiling right now or you need an adjuster-ready drone report after yesterday&apos;s storm, our field command team answers immediately.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 24/7 Hotline */}
          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#ffb4ab]/30 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              24/7 Emergency Dispatch
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Immediate connection to our on-duty field logistics dispatcher. Average wait time &lt; 15 seconds.
            </p>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-block pt-2 font-code-telemetry text-lg font-bold text-[#ffe1a7] hover:underline"
            >
              {SITE_CONFIG.phone}
            </a>
          </div>

          {/* Card 2: Email & Claims Desk */}
          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Claims &amp; Estimate Desk
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Submit your adjuster scope documents, photo evidence, or billing inquiries.
            </p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-block pt-2 font-code-telemetry text-sm font-semibold text-[#ffe1a7] hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
          </div>

          {/* Card 3: Central Command */}
          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Field Command Headquarters
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              {SITE_CONFIG.address}
            </p>
            <div className="pt-2 font-code-telemetry text-xs text-[#9c8f79]">
              Hours: 24/7/365 Emergency Dispatch
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Form */}
      <EmergencyInspectionForm
        title="Request Emergency Inspection Dispatch"
        subtitle="Complete this quick form. Our dispatch system calculates crew proximity and locks in your inspection slot."
      />
    </div>
  );
}
