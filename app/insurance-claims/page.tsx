import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Shield, AlertCircle, CheckCircle2, Scale, ArrowRight } from 'lucide-react';
import InsuranceAIAssistant from '@/components/ai/InsuranceAIAssistant';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import FAQSection from '@/components/sections/FAQSection';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Roof Insurance Claims Help | StormGuard Roofing',
  description: 'Expert storm damage documentation, adjuster meeting advocacy, and insurance claim navigation across Texas.',
};

export default function InsuranceClaimsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Insurance claims consultation background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <Scale className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Carrier Documentation &amp; Claims Advocacy</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Roof Insurance Claims <br />
            <span className="text-[#fbbf24]">Guidance &amp; Representation</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Navigating a storm claim doesn&apos;t have to be overwhelming. We arm Texas homeowners with photographic drone evidence, meets your insurance adjuster on-site, and ensures no subtle hail fractures are overlooked.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="#ai-claims-assistant"
              className="inline-flex items-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold px-6 py-3 rounded shadow-lg"
            >
              <span>Explore AI Claims Assistant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-label-md text-xs font-semibold px-6 py-3 rounded border border-[#4f4633]/60"
            >
              <span>Call Claim Hotline: {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4 Step Claim Navigation Timeline */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="max-w-3xl mb-10">
          <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
            Insurance Roadmap
          </span>
          <h2 className="font-headline-lg text-3xl text-[#e1e2e8] font-bold mt-1">
            How The Texas Storm Claim Process Works
          </h2>
          <p className="font-body-md text-sm text-[#d3c5ac] mt-2">
            Follow our proven, step-by-step framework to maximize your legitimate claim recovery while keeping your out-of-pocket expenses strictly limited to your policy deductible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-5 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <span className="font-code-telemetry text-2xl font-bold text-[#ffe1a7]">STEP 1</span>
            <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold">Free Drone Inspection</h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Before calling your carrier, we conduct an autonomous 4K drone scan to verify whether documented damage exceeds your policy deductible.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <span className="font-code-telemetry text-2xl font-bold text-[#ffe1a7]">STEP 2</span>
            <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold">Filing With Evidence</h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              We provide you with a forensic PDF package containing timestamped photos, radar match logs, and repair scopes to include with your claim filing.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <span className="font-code-telemetry text-2xl font-bold text-[#ffe1a7]">STEP 3</span>
            <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold">On-Site Adjuster Walk</h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Our field commander walks the roof directly with the insurance adjuster, making sure every bruised shingle, gutter dent, and pipe jack is recorded.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 space-y-3">
            <span className="font-code-telemetry text-2xl font-bold text-[#ffe1a7]">STEP 4</span>
            <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold">Class 4 Buildout</h3>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed">
              Once approved, we install premium impact-resistant shingles that reduce future risk and unlock annual policy premium discounts up to 30%.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive AI Insurance Assistant */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-10" id="ai-claims-assistant">
        <InsuranceAIAssistant />
      </section>

      {/* Claim Assistance Form */}
      <EmergencyInspectionForm
        title="Request Claim Representation &amp; Inspection"
        subtitle="Schedule an on-site consultation. We will evaluate your storm impact, prepare photo evidence, and coordinate with your insurance carrier."
      />

      {/* Insurance Specific FAQs */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <FAQSection category="insurance" />
      </section>
    </div>
  );
}
