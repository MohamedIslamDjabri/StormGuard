import type { Metadata } from 'next';
import Image from 'next/image';
import { Radar, MapPin, Clock, Truck, ShieldAlert, Phone } from 'lucide-react';
import ServiceAreasSection from '@/components/sections/ServiceAreasSection';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import { SITE_CONFIG, SERVICE_AREAS } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Central Texas Service Areas | StormGuard Roofing',
  description: 'Rapid emergency storm damage roofing coverage across Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Leander, and Kyle/Buda.',
};

export default function ServiceAreasPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden max-w-full">
      {/* Subpage Hero */}
      <section className="relative w-full overflow-hidden bg-[#111418] py-10 md:py-14 px-4 md:px-8 lg:px-16">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src={SITE_CONFIG.heroImage}
            alt="Service territory background"
            fill
            className="object-cover"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fbbf24]/20 border border-[#fbbf24]/40 text-[#ffe1a7] font-code-telemetry text-xs font-bold uppercase">
            <Radar className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>60-Mile Operational Radius</span>
          </div>

          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] font-bold tracking-tight">
            Central Texas <br />
            <span className="text-[#fbbf24]">Emergency Response Territories</span>
          </h1>

          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            Our strategic fleet of mobile roofing vans is staged across major Travis, Williamson, and Hays County transit corridors for sub-50 minute arrival times during severe storm events.
          </p>
        </div>
      </section>

      {/* Territory Command & Pills */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <ServiceAreasSection showInteractiveCards={true} />
      </section>

      {/* Map Presentation Card */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <div className="rounded-2xl bg-[#1d2024] border border-[#4f4633]/40 p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#323539]">
            <div>
              <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
                Telemetry Grid
              </span>
              <h3 className="font-headline-sm text-2xl text-[#e1e2e8] font-bold mt-1">
                Central Texas Radar Dispatch Hub
              </h3>
            </div>
            <div className="flex items-center gap-2 font-code-telemetry text-xs text-[#d3c5ac]">
              <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
              <span>Headquarters: Austin MoPac Command Unit</span>
            </div>
          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="relative w-full h-80 sm:h-96 rounded-xl bg-[#0b0e12] border border-[#4f4633]/50 overflow-hidden flex items-center justify-center">
            {/* Grid Lines Overlay */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(#fbbf24 1px, transparent 1px), linear-gradient(to right, #4f4633 1px, transparent 1px), linear-gradient(to bottom, #4f4633 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            ></div>

            {/* Radar Sweeper Visual */}
            <div className="relative w-64 h-64 rounded-full border border-[#fbbf24]/30 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-[#fbbf24]/20 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-[#fbbf24]/30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#fbbf24] shadow-[0_0_15px_#fbbf24]"></div>
                </div>
              </div>

              {/* Stationed Units Dots */}
              <div className="absolute top-10 left-12 flex items-center gap-1.5 bg-[#1d2024]/90 px-2 py-0.5 rounded border border-[#fbbf24]/40 font-code-telemetry text-[10px] text-[#ffe1a7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
                <span>Round Rock Crew #1</span>
              </div>
              <div className="absolute bottom-12 right-10 flex items-center gap-1.5 bg-[#1d2024]/90 px-2 py-0.5 rounded border border-[#fbbf24]/40 font-code-telemetry text-[10px] text-[#ffe1a7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
                <span>Kyle/Buda Crew #3</span>
              </div>
              <div className="absolute top-20 right-8 flex items-center gap-1.5 bg-[#1d2024]/90 px-2 py-0.5 rounded border border-[#fbbf24]/40 font-code-telemetry text-[10px] text-[#ffe1a7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#fbbf24] animate-pulse"></span>
                <span>Georgetown Crew #2</span>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-[#191c20]/90 backdrop-blur-md px-3 py-1.5 rounded font-code-telemetry text-xs text-[#e1e2e8] border border-[#4f4633]/40">
              Coverage: Austin • Round Rock • Cedar Park • Georgetown • Pflugerville • Buda
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Form */}
      <EmergencyInspectionForm
        title="Request Rapid Inspection In Your City"
        subtitle="Submit your address. We will verify coverage and deploy our nearest Central Texas diagnostic unit."
      />
    </div>
  );
}
