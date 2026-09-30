import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, MapPin, Users, CheckCircle, ArrowRight } from 'lucide-react';
import StatsSection from '@/components/sections/StatsSection';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'About StormGuard Roofing | Tactical Roof Logistics',
  description: 'Learn about StormGuard Roofing: over 15 years of rapid storm response, military precision field logistics, and verified Texas craftsmanship.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="About StormGuard Roofing crew"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <span>Command Center • Central Texas</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Tactical Precision. <br />
            <span className="text-[#fbbf24]">Architectural Excellence.</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            StormGuard Roofing was established on a single principle: when severe weather strikes, homeowners deserve rapid disaster triage paired with uncompromising engineering precision—not aggressive door-to-door sales pressure.
          </p>
        </div>
      </section>

      {/* Origin & Core Philosophy */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
              Our Core Heritage
            </span>
            <h2 className="font-headline-lg text-3xl text-[#e1e2e8] font-bold">
              Engineering Defense For Texas Weather Extremes
            </h2>
            <p className="font-body-md text-sm text-[#d3c5ac] leading-relaxed">
              Between intense supercell hail corridors and sudden straight-line derecho winds, Central Texas has some of the most punishing climate stresses in North America.
            </p>
            <p className="font-body-md text-sm text-[#d3c5ac] leading-relaxed">
              Our tactical dispatch framework ensures our emergency mobile vans reach punctured roofs in under an hour, stopping water damage at the source. Once secured, our licensed master contractors rebuild the roof deck using Class 4 impact shingles engineered for 130 mph survivability.
            </p>

            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
                <CheckCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>Zero door-to-door storm-chasing sales tactics</span>
              </div>
              <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
                <CheckCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>Full Xactimate line-item insurance parity</span>
              </div>
              <div className="flex items-center gap-2 font-body-sm text-sm text-[#e1e2e8]">
                <CheckCircle className="w-4 h-4 text-[#fbbf24] shrink-0" />
                <span>50-Year non-prorated architectural warranties</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#1d2024] border border-[#4f4633]/50 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#323539]">
                <span className="font-code-telemetry text-xs text-[#ffe1a7] font-bold">
                  TACTICAL CREDENTIALS // AUDIT
                </span>
                <span className="text-[11px] font-code-telemetry text-[#ffb4ab]">
                  VERIFIED ACTIVE
                </span>
              </div>

              <div className="space-y-3 font-body-sm text-xs">
                <div className="flex items-center justify-between p-3 rounded bg-[#272a2e]">
                  <span className="text-[#d3c5ac]">Texas Master Contractor License:</span>
                  <span className="font-code-telemetry text-[#ffe1a7] font-bold">#TX-90281</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-[#272a2e]">
                  <span className="text-[#d3c5ac]">General Liability Insurance:</span>
                  <span className="font-code-telemetry text-[#e1e2e8]">$2,000,000 Policy Coverage</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-[#272a2e]">
                  <span className="text-[#d3c5ac]">Better Business Bureau:</span>
                  <span className="font-code-telemetry text-[#fbbf24] font-bold">A+ Accredited</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-[#272a2e]">
                  <span className="text-[#d3c5ac]">FAA Certified Part 107 Pilots:</span>
                  <span className="font-code-telemetry text-[#e1e2e8]">Autonomous Drone Fleet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Reviews Section */}
      <StatsSection />

      {/* Emergency Contact Form */}
      <EmergencyInspectionForm
        title="Connect With Our Field Command Team"
        subtitle="Schedule a consultation with our licensed estimators. We are stationed across Central Texas ready for rapid inspection."
      />
    </div>
  );
}
