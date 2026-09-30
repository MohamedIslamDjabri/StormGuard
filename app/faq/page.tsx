import type { Metadata } from 'next';
import Image from 'next/image';
import FAQSection from '@/components/sections/FAQSection';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | StormGuard Roofing',
  description: 'Answers to critical homeowner questions on emergency roof tarping, storm damage documentation, adjuster meetings, and Texas insurance claims.',
};

export default function FAQPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="FAQ background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <span>Knowledge Base &amp; Field Protocols</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Frequently Asked <br />
            <span className="text-[#fbbf24]">Storm Response Questions</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Get clear, definitive answers regarding emergency tarping coverage, insurance deductible laws in Texas, autonomous drone scans, and contractor adjuster walkthroughs.
          </p>
        </div>
      </section>

      {/* Main FAQ Accordion with Filters */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <FAQSection showFilters={true} />
      </section>

      {/* Emergency Form */}
      <EmergencyInspectionForm
        title="Still Have Questions About Your Roof?"
        subtitle="Speak directly with a licensed Central Texas field dispatcher. We provide zero-obligation damage assessments."
      />
    </div>
  );
}
