import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CloudLightning, Disc, Wind, Droplets, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import AIStormAssistant from '@/components/ai/AIStormAssistant';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Storm Damage Roofing | StormGuard Roofing',
  description: 'Comprehensive Texas storm damage restoration for hail impacts, gale-force wind tear-offs, fallen trees, and roof breaches.',
};

export default function StormDamagePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Storm damage background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#93000a]/20 border border-[#93000a]/40 text-[#ffb4ab] font-code-telemetry text-xs font-bold uppercase">
            <span>Severe Weather Restoration</span>
          </div>
          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Central Texas <br />
            <span className="text-[#fbbf24]">Storm Damage Restoration</span>
          </h1>
          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Severe hail convection and high-wind derecho events cause immediate structural trauma. We specialize in precision drone forensic assessments, rapid weather-proofing, and total insurance system replacements.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#triage-terminal"
              className="inline-flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold px-6 py-3 rounded shadow-lg"
            >
              <span>Run AI Damage Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-label-md text-xs font-semibold px-6 py-3 rounded border border-[#4f4633]/60"
            >
              <span>Call Hotline: {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Specific Damage Breakdown */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-2xl mb-10">
          <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
            Damage Forensics
          </span>
          <h2 className="font-headline-lg text-3xl text-[#e1e2e8] font-bold mt-1">
            Types of Texas Storm Impact We Fix
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div id="hail" className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <Disc className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Hail Fractures &amp; Bruising
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Hail as small as 1 inch cracks internal fiberglass mats. We map granule displacement and soft metal dents to substantiate full insurer replacements rather than partial patches.
            </p>
            <ul className="text-xs text-[#e1e2e8] space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> 1.5&quot; to 3&quot; Texas hail specialists</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> Upgrades to Class 4 Impact Shingles</li>
            </ul>
          </div>

          <div id="wind" className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Wind Shear &amp; Shingle Tear-Offs
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Gusts above 50 mph break thermal seal strips and tear shingles off rafter lines. We re-deck exposed planes and seal vulnerable underlayment before the next front arrives.
            </p>
            <ul className="text-xs text-[#e1e2e8] space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> 130 MPH rated replacement systems</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> Ridge vent &amp; gable metal fortification</li>
            </ul>
          </div>

          <div id="leaks" className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#ffb4ab]">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Fallen Tree &amp; Structural Breach
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              When live oak or cedar limbs crash through the roof, our structural emergency units deploy crane extraction, temporary rafter bracing, and sandbagged heavy tarps within 2 hours.
            </p>
            <ul className="text-xs text-[#e1e2e8] space-y-1.5 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> Crane removal coordination</li>
              <li className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-[#fbbf24]" /> Complete rafter and drywall rebuild</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive AI Assistant */}
      <AIStormAssistant />

      {/* Emergency Form */}
      <EmergencyInspectionForm
        title="Schedule Storm Damage Inspection"
        subtitle="Reserve a free 4K drone forensic inspection. Our field commanders assemble an adjuster-ready claim packet directly for your insurance carrier."
      />
    </div>
  );
}
