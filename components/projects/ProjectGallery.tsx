'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Verified, Clock, DollarSign, Filter, Eye } from 'lucide-react';
import { PROJECTS, ProjectItem, SITE_CONFIG } from '@/constants/data';
import BeforeAfterSlider from './BeforeAfterSlider';

export default function ProjectGallery({ showFilters = true }: { showFilters?: boolean }) {
  const [filter, setFilter] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  const filteredProjects = PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  return (
    <section className="w-full py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7] bg-[#1d2024] px-3 py-1 rounded border border-[#4f4633]/30">
            <Verified className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Verified Central Texas Outcomes</span>
          </div>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight mt-2">
            Documented Proof &amp; Storm Recoveries
          </h2>
        </div>
        <p className="font-body-md text-sm md:text-base text-[#d3c5ac] max-w-md">
          Every project represents rapid emergency intervention followed by total insurance recovery and architectural-grade roofing replacement.
        </p>
      </div>

      {/* Filter Tabs */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded font-label-md text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-[#1d2024] text-[#d3c5ac] hover:bg-[#272a2e] border border-[#4f4633]/40'
            }`}
          >
            All Recoveries ({PROJECTS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('hail')}
            className={`px-3.5 py-1.5 rounded font-label-md text-xs font-semibold transition-all cursor-pointer ${
              filter === 'hail'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-[#1d2024] text-[#d3c5ac] hover:bg-[#272a2e] border border-[#4f4633]/40'
            }`}
          >
            Hail Impact
          </button>
          <button
            type="button"
            onClick={() => setFilter('wind')}
            className={`px-3.5 py-1.5 rounded font-label-md text-xs font-semibold transition-all cursor-pointer ${
              filter === 'wind'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-[#1d2024] text-[#d3c5ac] hover:bg-[#272a2e] border border-[#4f4633]/40'
            }`}
          >
            Wind Shear
          </button>
          <button
            type="button"
            onClick={() => setFilter('tree')}
            className={`px-3.5 py-1.5 rounded font-label-md text-xs font-semibold transition-all cursor-pointer ${
              filter === 'tree'
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-[#1d2024] text-[#d3c5ac] hover:bg-[#272a2e] border border-[#4f4633]/40'
            }`}
          >
            Structural Breach
          </button>
        </div>
      )}

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="rounded-xl bg-[#1d2024] border border-[#4f4633]/30 overflow-hidden flex flex-col justify-between group hover:border-[#fbbf24]/50 transition-all hover:shadow-xl"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-[#272a2e]">
                <Image
                  src={proj.imageUrl}
                  alt={proj.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#0b0e12]/80 backdrop-blur-md px-2.5 py-1 rounded font-code-telemetry text-[11px] text-[#ffe1a7] font-bold">
                  {proj.location}
                </div>
                <div className="absolute bottom-3 right-3 bg-[#93000a]/80 backdrop-blur-md px-2 py-0.5 rounded font-code-telemetry text-[10px] text-[#ffdad6] font-bold">
                  {proj.tag}
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold group-hover:text-[#ffe1a7] transition-colors">
                  {proj.title}
                </h3>
                <p className="font-body-sm text-xs text-[#d3c5ac] mt-2 leading-relaxed">
                  {proj.summary}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 pt-0 space-y-2">
              <div className="py-2 px-3 rounded bg-[#272a2e] flex items-center justify-between font-code-telemetry text-xs">
                <span className="text-[#d3c5ac]">Response Time:</span>
                <span className="text-[#ffe1a7] font-bold">{proj.responseTime}</span>
              </div>
              {proj.insuranceMetric && (
                <div className="py-1.5 px-3 rounded bg-[#191c20] flex items-center justify-between font-code-telemetry text-xs">
                  <span className="text-[#d3c5ac]">Insurance Approved:</span>
                  <span className="text-[#f9bd22] font-semibold">{proj.insuranceMetric}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setActiveProjectModal(proj)}
                className="w-full mt-2 py-2 px-3 rounded bg-[#191c20] hover:bg-[#272a2e] text-[#ffe1a7] border border-[#4f4633]/40 font-label-md text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Claim File &amp; Photos</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1d2024] border border-[#fbbf24]/40 rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl relative">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 text-[#d3c5ac] hover:text-white p-2 rounded bg-[#272a2e]"
              aria-label="Close modal"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="bg-[#fbbf24]/20 text-[#ffe1a7] px-2.5 py-0.5 rounded font-code-telemetry text-xs font-bold">
                {activeProjectModal.location}
              </span>
              <span className="text-xs text-[#d3c5ac] font-code-telemetry">
                Case File #{activeProjectModal.id}
              </span>
            </div>

            <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold">
              {activeProjectModal.title}
            </h3>

            {/* Before After Interactive Slider */}
            <div className="py-2">
              <BeforeAfterSlider
                beforeImage={activeProjectModal.imageUrl}
                afterImage={SITE_CONFIG.heroImage}
                beforeLabel="Active Damage"
                afterLabel="Restored Class 4 Roof"
              />
              <p className="text-[11px] font-code-telemetry text-[#9c8f79] text-center mt-1">
                Drag slider horizontally to compare storm impact vs. restored roof.
              </p>
            </div>

            <p className="font-body-md text-sm text-[#d3c5ac] leading-relaxed">
              {activeProjectModal.fullDetails || activeProjectModal.summary}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded bg-[#272a2e] border border-[#4f4633]/30">
                <div className="text-[11px] font-code-telemetry text-[#9c8f79]">Rapid Tarp ETA</div>
                <div className="text-sm font-bold text-[#ffe1a7] mt-0.5">{activeProjectModal.responseTime}</div>
              </div>
              <div className="p-3 rounded bg-[#272a2e] border border-[#4f4633]/30">
                <div className="text-[11px] font-code-telemetry text-[#9c8f79]">Claim Recovery Total</div>
                <div className="text-sm font-bold text-[#f9bd22] mt-0.5">{activeProjectModal.insuranceMetric}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2 rounded bg-[#fbbf24] text-[#6c4f00] font-label-md text-xs font-bold hover:bg-[#f9bd22]"
              >
                Close Case File
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
