import { PROCESS_STEPS } from '@/constants/data';
import { AlertCircle, ShieldAlert, Zap, FileCheck } from 'lucide-react';

const iconMap: Record<string, any> = {
  AlertCircle,
  ShieldAlert,
  Zap,
  FileCheck,
};

export default function ProcessSteps() {
  return (
    <section className="w-full bg-[#191c20] border-y border-[#4f4633]/30 py-12 md:py-16">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mb-8">
          <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
            Streamlined Protocol
          </span>
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight mt-1">
            Get Help Faster With Smart Emergency Triage
          </h2>
          <p className="font-body-md text-sm md:text-base text-[#d3c5ac] mt-2 leading-relaxed">
            From the moment hail hits your neighborhood, our structured 4-step dispatch framework mobilizes local estimators, tarps, and insurance adjusters with zero administrative friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step) => {
            const Icon = iconMap[step.icon] || Zap;
            return (
              <div
                key={step.number}
                className="p-4 sm:p-5 rounded-xl bg-[#1d2024] border border-[#4f4633]/40 flex flex-col justify-between hover:border-[#fbbf24]/50 transition-colors group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-code-telemetry text-2xl font-bold text-[#ffe1a7]">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-[#272a2e] flex items-center justify-center text-[#fbbf24] group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-headline-sm text-base text-[#e1e2e8] font-bold">
                    {step.title}
                  </h3>
                  <p className="font-body-sm text-xs text-[#d3c5ac] mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#323539] mt-4">
                  <span className="font-code-telemetry text-[11px] text-[#c2c7cf]">
                    {step.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
