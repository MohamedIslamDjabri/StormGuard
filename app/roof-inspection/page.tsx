import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Crosshair, ShieldCheck, CheckCircle, FileText, ArrowRight, Eye, Video } from 'lucide-react';
import AILeadQualificationFlow from '@/components/ai/AILeadQualificationFlow';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Roof Inspection | StormGuard Roofing',
  description: 'Comprehensive 4K autonomous drone forensic scans and FLIR thermal moisture detection for Texas storm insurance claims.',
};

export default function RoofInspectionPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden max-w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Roof inspection drone background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <Crosshair className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Autonomous 4K Drone Photogrammetry</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Precision Forensic <br />
            <span className="text-[#fbbf24]">Roof Inspection &amp; Thermal Scan</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Insurance adjusters spend an average of only 12 minutes on a ladder. Our autonomous drones take over 1,200 high-resolution photos and FLIR thermal captures to map every single hail micro-fracture and sub-deck leak.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#qualification-flow"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f9bd22] text-[#111418] font-label-lg text-xs font-black px-6 py-3.5 rounded-xl shadow-[0_0_16px_rgba(251,191,36,0.35)] active:scale-95 transition-all"
            >
              <span>Start Instant Inspection Triage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-[#1a1f26] hover:bg-[#222832] text-[#f1f5f9] font-label-md text-xs font-bold px-6 py-3.5 rounded-xl border border-[#3b4352] active:scale-95 transition-all"
            >
              <span>Call Hotline: {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3 Inspection Advantages */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-2xl mb-8">
          <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
            Diagnostic Standards
          </span>
          <h2 className="font-headline-lg text-3xl text-[#e1e2e8] font-bold mt-1">
            Why Our 4K Drone Forensics Win Claims
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              3D Digital Elevation Twin
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              We compile thousands of overlapping aerial captures into an interactive 3D model that captures exact pitch, square footage, valley dimensions, and ridge cap measurements down to the quarter inch.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              FLIR Thermal Infrared Moisture Detection
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Thermal cameras capture the temperature signature of water pooled underneath intact shingles and inside attic insulation, proving active storm damage before ceiling stains appear.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold">
              Adjuster-Ready Xactimate Scope
            </h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Insurance companies write scopes using Xactimate software. Our forensic reports are formatted with identical line items and local Central Texas pricing, eliminating claim pushback.
            </p>
          </div>
        </div>
      </section>

      {/* AI Lead Qualification Interactive Flow */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12" id="qualification-flow">
        <AILeadQualificationFlow />
      </section>

      {/* Booking Form */}
      <EmergencyInspectionForm
        title="Schedule Your Free Inspection Slot"
        subtitle="Our autonomous drone team will conduct an exhaustive diagnostic scan of your roof and provide an official forensic damage package."
      />

      {/* Inspection FAQs */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <FAQSection category="inspections" />
      </section>
    </div>
  );
}
