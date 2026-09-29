import { STATS, REVIEWS } from '@/constants/data';
import { Star, ShieldCheck } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="w-full bg-[#191c20] border-y border-[#4f4633]/30 py-12 md:py-16">
      <div className="w-full px-4 md:px-8 lg:px-16">
        {/* Telemetry Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-[#323539]">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-lg bg-[#1d2024] border border-[#4f4633]/30"
            >
              <div className="font-display-hero text-3xl sm:text-4xl lg:text-5xl text-[#ffe1a7] font-bold tracking-tight">
                {stat.value}
              </div>
              <div className="font-label-lg text-sm text-[#e1e2e8] mt-1 font-bold">
                {stat.label}
              </div>
              <div className="font-body-sm text-xs text-[#d3c5ac] mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="pt-12 max-w-2xl">
          <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
            Field Reports
          </span>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight mt-1">
            When The Storm Hit, We Answered.
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-5 md:p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/30 flex flex-col justify-between hover:border-[#fbbf24]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center text-[#fbbf24] gap-0.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-body-md text-xs sm:text-sm text-[#e1e2e8] italic leading-relaxed">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#323539] mt-4 flex items-center justify-between">
                <div>
                  <div className="font-label-lg text-xs font-bold text-[#e1e2e8]">
                    {rev.name}
                  </div>
                  <div className="font-code-telemetry text-[11px] text-[#d3c5ac]">
                    {rev.roleOrLocation}
                  </div>
                </div>
                {rev.verified && (
                  <span className="text-[10px] font-code-telemetry text-[#ffe1a7] bg-[#272a2e] px-2 py-0.5 rounded border border-[#4f4633]/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#fbbf24]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
