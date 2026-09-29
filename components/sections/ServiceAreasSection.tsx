'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Radar, MapPin, Clock, Truck, ShieldAlert } from 'lucide-react';
import { SERVICE_AREAS, ServiceArea } from '@/constants/data';

export default function ServiceAreasSection({ showInteractiveCards = false }: { showInteractiveCards?: boolean }) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  return (
    <div className="w-full">
      {/* Service Area Banner Card */}
      <div className="p-5 md:p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
              Territory Command
            </span>
            <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold mt-1">
              Active Central Texas Response Zones
            </h3>
          </div>
          <div className="flex items-center gap-1.5 font-code-telemetry text-xs text-[#c2c7cf]">
            <Radar className="w-4 h-4 text-[#fbbf24] animate-spin" />
            <span>Coverage Radius: 60 Miles from Austin Core</span>
          </div>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2">
          {SERVICE_AREAS.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => setSelectedArea(selectedArea?.id === area.id ? null : area)}
              className={`px-3.5 py-1.5 rounded-full font-code-telemetry text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedArea?.id === area.id
                  ? 'bg-[#fbbf24] text-[#6c4f00] font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'bg-[#272a2e] border border-[#4f4633]/40 text-[#e1e2e8] hover:border-[#fbbf24]/50'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  selectedArea?.id === area.id ? 'bg-[#6c4f00]' : 'bg-[#fbbf24]'
                }`}
              ></span>
              <span>{area.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Zone Quick Telemetry Drawer */}
        {selectedArea && (
          <div className="mt-4 p-4 rounded-lg bg-[#0b0e12] border border-[#fbbf24]/40 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-[#272a2e]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#fbbf24]" />
                <span className="font-headline-sm text-sm text-[#e1e2e8] font-bold">
                  {selectedArea.name} ({selectedArea.county})
                </span>
              </div>
              <span className="font-code-telemetry text-[11px] text-[#ffe1a7] bg-[#272a2e] px-2 py-0.5 rounded">
                ⚡ Avg Dispatch: {selectedArea.averageResponseMinutes} Mins
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs font-body-sm">
              <div>
                <span className="text-[#9c8f79] block">Active Tarp Vans:</span>
                <span className="font-bold text-[#e1e2e8]">{selectedArea.activeCrews} Response Units</span>
              </div>
              <div>
                <span className="text-[#9c8f79] block">Covered ZIP Codes:</span>
                <span className="font-code-telemetry text-[#ffe1a7]">{selectedArea.zipCodes.join(', ')}</span>
              </div>
              <div>
                <span className="text-[#9c8f79] block">Specialist Focus:</span>
                <span className="text-[#d3c5ac]">{selectedArea.highlight}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grid of Service Areas if requested */}
      {showInteractiveCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {SERVICE_AREAS.map((area) => (
            <div
              key={area.id}
              className="p-4 rounded-xl bg-[#1d2024] border border-[#4f4633]/30 hover:border-[#fbbf24]/50 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#272a2e]">
                <h4 className="font-headline-sm text-sm text-[#e1e2e8] font-bold">
                  {area.name}
                </h4>
                <span className="font-code-telemetry text-[11px] text-[#ffe1a7]">
                  {area.averageResponseMinutes}m ETA
                </span>
              </div>
              <p className="font-body-sm text-xs text-[#d3c5ac] mt-2 leading-relaxed">
                {area.highlight}
              </p>
              <div className="mt-3 pt-2 border-t border-[#272a2e] flex items-center justify-between font-code-telemetry text-[10px] text-[#9c8f79]">
                <span>{area.activeCrews} Crews Online</span>
                <Link href="#quick-form" className="text-[#ffe1a7] hover:underline">
                  Dispatch Unit →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
