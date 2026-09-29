import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function EmergencyStatusBar() {
  return (
    <section className="w-full bg-[#191c20] border-y border-[#4f4633]/40 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] relative z-20">
      <div className="w-full px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffb4ab]"></span>
          </span>
          <span className="font-code-telemetry text-xs text-[#ffb4ab] font-bold uppercase tracking-wide shrink-0">
            Storm Response Active:
          </span>
          <span className="font-body-sm text-xs text-[#e1e2e8]">
            Severe Weather Rapid Response protocol engaged for Central Texas. Average dispatch: 38 mins.
          </span>
        </div>

        <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
          <span className="hidden sm:inline font-body-sm text-xs text-[#d3c5ac]">
            Need emergency roof triage? Tell us what happened:
          </span>
          <Link
            href="#triage-terminal"
            className="inline-flex items-center gap-1.5 bg-[#fbbf24]/20 hover:bg-[#fbbf24] text-[#ffe1a7] hover:text-[#6c4f00] border border-[#fbbf24]/40 px-3.5 py-1 rounded font-label-md text-xs font-semibold transition-all whitespace-nowrap active:scale-95"
          >
            <span>Start AI Storm Assistant</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </Link>
        </div>
      </div>
    </section>
  );
}
