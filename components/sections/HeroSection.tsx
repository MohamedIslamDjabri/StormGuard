import Image from 'next/image';
import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, MapPin, ClipboardCheck, FileText } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/data';

interface HeroSectionProps {
  title?: string;
  highlightText?: string;
  subtitle?: string;
  showBadges?: boolean;
}

export default function HeroSection({
  title = "Storm Damage?",
  highlightText = "We Respond Fast.",
  subtitle = "Fast emergency roofing response, rapid tarping, precision assessments, and end-to-end insurance claim support after severe wind, hail, and catastrophic storm breach across Central Texas.",
  showBadges = true,
}: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#111418]">
      {/* Background Image with Scrim Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SITE_CONFIG.heroImage}
          alt="StormGuard Roofing rapid deployment crew inspecting hail-damaged roof shingles under stormy skies"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer Dark Gradient Scrim for high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111418] via-[#111418]/90 to-[#111418]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111418] via-[#0b0e12]/80 to-transparent"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pt-10 md:pt-14 pb-10 md:pb-16">
        <div className="max-w-4xl space-y-4">
          {/* Emergency Live Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#93000a]/30 border border-[#ffb4ab]/30 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffb4ab]"></span>
            </span>
            <span className="font-code-telemetry text-xs tracking-wider text-[#ffdcd9] uppercase font-bold">
              ⚡ 24/7 Emergency Roofing Response | Live Dispatch Units On Standby
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-hero text-4xl sm:text-5xl md:text-6xl text-[#e1e2e8] tracking-tight leading-[1.08] font-bold">
            {title} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffe1a7] via-[#fbbf24] to-[#ffdf9f]">
              {highlightText}
            </span>
          </h1>

          {/* Subhead */}
          <p className="font-body-lg text-base md:text-lg text-[#d3c5ac] max-w-2xl leading-relaxed">
            {subtitle}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="#triage-terminal"
              className="inline-flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-sm px-6 py-3.5 rounded font-bold shadow-[0_0_28px_-4px_rgba(251,191,36,0.5)] transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{SITE_CONFIG.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 bg-[#323539]/40 hover:bg-[#323539]/70 text-[#e1e2e8] font-label-lg text-sm px-6 py-3.5 rounded border border-[#4f4633]/60 backdrop-blur-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#ffe1a7]" />
              <span className="font-code-telemetry">Call Now: {SITE_CONFIG.phone}</span>
            </a>
          </div>

          {/* 4 Key Trust Badges */}
          {showBadges && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#191c20]/70 border border-[#4f4633]/30 backdrop-blur-sm">
                <ShieldCheck className="w-5 h-5 text-[#ffe1a7] shrink-0" />
                <span className="font-label-md text-xs text-[#e1e2e8]">Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#191c20]/70 border border-[#4f4633]/30 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-[#ffe1a7] shrink-0" />
                <span className="font-label-md text-xs text-[#e1e2e8]">Local Storm Units</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#191c20]/70 border border-[#4f4633]/30 backdrop-blur-sm">
                <ClipboardCheck className="w-5 h-5 text-[#ffe1a7] shrink-0" />
                <span className="font-label-md text-xs text-[#e1e2e8]">Free Inspection</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#191c20]/70 border border-[#4f4633]/30 backdrop-blur-sm">
                <FileText className="w-5 h-5 text-[#ffe1a7] shrink-0" />
                <span className="font-label-md text-xs text-[#e1e2e8]">Insurance Navigators</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
