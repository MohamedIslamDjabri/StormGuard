import type { Metadata } from 'next';
import Image from 'next/image';
import ProjectGallery from '@/components/projects/ProjectGallery';
import BeforeAfterSlider from '@/components/projects/BeforeAfterSlider';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG, PROJECTS } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Storm Recovery Projects | StormGuard Roofing',
  description: 'Explore verified Texas storm damage roof restorations with before-and-after photo comparisons, drone forensic logs, and insurance payout metrics.',
};

export default function ProjectsPage() {
  const featured = PROJECTS[0];

  return (
    <div className="flex flex-col w-full overflow-x-hidden max-w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="StormGuard project showcase background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <span>Central Texas Field Outcomes</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Documented Restorations <br />
            <span className="text-[#fbbf24]">&amp; Insurance Case Files</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Examine our forensic before-and-after records. Every completed property shows rapid emergency stabilization followed by total insurance carrier approval and Class 4 impact reconstruction.
          </p>
        </div>
      </section>

      {/* Featured Interactive Comparison Slider */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
                Interactive Comparison
              </span>
              <h2 className="font-headline-sm text-2xl text-[#e1e2e8] font-bold mt-1">
                Round Rock Hail Fracture → Class 4 Shingle System
              </h2>
            </div>
            <span className="hidden sm:inline font-code-telemetry text-xs text-[#ffb4ab] bg-[#93000a]/20 border border-[#93000a]/40 px-3 py-1 rounded font-bold">
              $28,400 Claim Total
            </span>
          </div>

          <BeforeAfterSlider
            beforeImage={featured.imageUrl}
            afterImage={SITE_CONFIG.heroImage}
            beforeLabel="Severe Hail Impact (2.25&quot;)"
            afterLabel="Architectural Class 4 Rebuild"
          />
          <p className="font-code-telemetry text-xs text-[#9c8f79] text-center">
            Drag the gold slider left and right to inspect the hail bruising vs. completed architectural replacement.
          </p>
        </div>
      </section>

      {/* Full Gallery with Category Filters */}
      <ProjectGallery showFilters={true} />

      {/* Emergency Form */}
      <EmergencyInspectionForm
        title="Ready To Restore Your Storm-Damaged Roof?"
        subtitle="Schedule a free 4K drone scan and consultation. We will provide an adjuster-ready damage dossier for your home."
      />
    </div>
  );
}
