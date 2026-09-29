import Link from 'next/link';
import {
  CloudLightning,
  AlertTriangle,
  Crosshair,
  Disc,
  Wind,
  Droplets,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { SERVICES } from '@/constants/data';

const iconMap: Record<string, any> = {
  CloudLightning,
  AlertTriangle,
  Crosshair,
  Disc,
  Wind,
  Droplets,
};

export default function ServicesGrid() {
  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7] bg-[#1d2024] px-3 py-1 rounded border border-[#4f4633]/30">
            <Shield className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Tactical Roofing Capabilities</span>
          </div>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight mt-2">
            Storm &amp; Emergency Roofing Services
          </h2>
        </div>
        <p className="font-body-md text-sm md:text-base text-[#d3c5ac] max-w-md">
          Engineered specifically for Texas severe convective storms: rapid stabilization, drone assessments, and durable insurance replacements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s) => {
          const Icon = iconMap[s.icon] || CloudLightning;
          const isEmergency = s.id === 'emergency-tarping';

          return (
            <div
              key={s.id}
              className="group p-5 md:p-6 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 hover:border-[#fbbf24]/60 transition-all flex flex-col justify-between hover:shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-lg bg-[#272a2e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                    isEmergency ? 'text-[#ffb4ab]' : 'text-[#fbbf24]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-headline-sm text-lg text-[#e1e2e8] font-bold group-hover:text-[#ffe1a7] transition-colors">
                    {s.title}
                  </h3>
                  {s.badge && (
                    <span className="font-code-telemetry text-[10px] text-[#ffb4ab] bg-[#93000a]/30 border border-[#93000a] px-2 py-0.5 rounded font-bold uppercase">
                      {s.badge}
                    </span>
                  )}
                </div>

                <p className="font-body-sm text-xs text-[#d3c5ac] mt-2.5 leading-relaxed">
                  {s.shortDesc}
                </p>

                <ul className="mt-4 space-y-1.5 font-body-sm text-xs text-[#e1e2e8]">
                  {s.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#fbbf24] text-xs">■</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={s.ctaHref}
                className="mt-6 inline-flex items-center gap-1.5 font-label-md text-xs font-semibold text-[#ffe1a7] hover:text-[#ffdf9f] transition-colors"
              >
                <span>{s.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
