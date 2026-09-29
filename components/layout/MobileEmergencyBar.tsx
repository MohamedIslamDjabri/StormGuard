import Link from 'next/link';
import { Phone, Zap } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

export default function MobileEmergencyBar() {
  return (
    <aside
      aria-label="Emergency Dispatch Bar"
      className="sticky bottom-0 z-40 w-full bg-[#0b0e12]/95 backdrop-blur-md border-t border-[#4f4633]/60 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.8)]"
    >
      <div className="w-full px-4 md:px-8 lg:px-16 flex items-center justify-between gap-3">
        {/* Status Telemetry */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fbbf24]"></span>
          </span>
          <div className="font-code-telemetry text-xs">
            <span className="text-[#e1e2e8] font-bold hidden sm:inline">Central Texas Dispatch: </span>
            <span className="text-[#f9bd22] font-semibold">3 Crews In Transit</span>
            <span className="text-[#9c8f79] hidden md:inline"> | Avg ETA: 41 Mins</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="inline-flex items-center gap-1 bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-code-telemetry text-xs px-2.5 py-1.5 rounded border border-[#4f4633]/40 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#ffe1a7]" />
            <span className="hidden sm:inline">{SITE_CONFIG.phone}</span>
            <span className="sm:hidden">Call Now</span>
          </a>

          <Link
            href="/#quick-form"
            className="inline-flex items-center gap-1 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-md text-xs font-bold px-3 py-1.5 rounded shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all whitespace-nowrap active:scale-95"
          >
            <span>Request Dispatch</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
