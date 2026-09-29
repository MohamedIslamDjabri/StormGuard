import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, ShieldAlert, CheckCircle, Radio, Rss, Radar } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS, SERVICES } from '@/constants/data';

export default function Footer() {
  return (
    <footer className="w-full bg-[#111418] border-t border-[#323539] text-[#e1e2e8]">
      <div className="w-full px-4 md:px-8 lg:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand & Credentials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={SITE_CONFIG.logoUrl}
                alt="StormGuard Roofing Logo"
                width={28}
                height={28}
                className="h-7 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-headline-sm text-lg text-[#e1e2e8] uppercase tracking-tight font-bold">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#d3c5ac] leading-relaxed max-w-sm">
              Fast emergency storm response, professional damage assessments, and rapid roof stabilization across Central Texas.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1 font-code-telemetry text-xs text-[#f9bd22] bg-[#1d2024] px-2.5 py-1 rounded border border-[#4f4633]/50">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Bureau Verified 4.9/5</span>
              </div>
              <div className="flex items-center gap-1 font-code-telemetry text-xs text-[#c2c7cf] bg-[#1d2024] px-2.5 py-1 rounded border border-[#4f4633]/50">
                <ShieldAlert className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>Field Command Unit</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-label-lg text-xs text-[#e1e2e8] uppercase tracking-wider font-semibold">
              Navigation
            </h4>
            <ul className="space-y-1.5 font-body-sm text-xs text-[#d3c5ac]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-[#ffe1a7] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-label-lg text-xs text-[#e1e2e8] uppercase tracking-wider font-semibold">
              Services
            </h4>
            <ul className="space-y-1.5 font-body-sm text-xs text-[#d3c5ac]">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/${s.slug}`} className="hover:text-[#ffe1a7] transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Emergency Contact */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-label-lg text-xs text-[#e1e2e8] uppercase tracking-wider font-semibold">
              Emergency Contact
            </h4>
            <div className="space-y-2 font-body-sm text-xs text-[#d3c5ac]">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1.5 text-[#e1e2e8] hover:text-[#ffe1a7] transition-colors font-code-telemetry text-sm font-bold"
              >
                <Phone className="w-4 h-4 text-[#ffe1a7]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-1.5 hover:text-[#ffe1a7] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#ffe1a7]" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-1.5 text-[#ffb4ab] font-code-telemetry text-xs">
                <ShieldAlert className="w-4 h-4 text-[#ffb4ab]" />
                <span>24/7 Emergency Dispatch</span>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span
                  title="Dispatch Telemetry Feed"
                  className="w-8 h-8 rounded bg-[#1d2024] flex items-center justify-center text-[#d3c5ac] hover:text-[#ffe1a7] hover:bg-[#272a2e] transition-colors border border-[#4f4633]/40 cursor-pointer"
                >
                  <Rss className="w-4 h-4" />
                </span>
                <span
                  title="Emergency Radios"
                  className="w-8 h-8 rounded bg-[#1d2024] flex items-center justify-center text-[#d3c5ac] hover:text-[#ffe1a7] hover:bg-[#272a2e] transition-colors border border-[#4f4633]/40 cursor-pointer"
                >
                  <Radio className="w-4 h-4" />
                </span>
                <span
                  title="Operational Radar"
                  className="w-8 h-8 rounded bg-[#1d2024] flex items-center justify-center text-[#d3c5ac] hover:text-[#ffe1a7] hover:bg-[#272a2e] transition-colors border border-[#4f4633]/40 cursor-pointer"
                >
                  <Radar className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Telemetry */}
        <div className="mt-8 pt-4 border-t border-[#1d2024] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-xs text-[#9c8f79]">
            © {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 font-body-sm text-xs text-[#d3c5ac]">
            <Link href="/faq" className="hover:text-[#e1e2e8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-[#e1e2e8] transition-colors">
              Terms of Service
            </Link>
            <Link href="/service-areas" className="hover:text-[#e1e2e8] transition-colors">
              Dispatch Status
            </Link>
          </div>
        </div>

        {/* AI Disclaimer Box */}
        <div className="mt-4 p-2 rounded bg-[#191c20] border border-[#1d2024]">
          <p className="font-code-telemetry text-[11px] text-[#9c8f79] text-center">
            <span className="text-[#ffe1a7] font-bold">AI Tools Disclaimer:</span> StormGuard AI guidance is for initial triage and informational purposes; field physical inspection required for final damage assessment and insurer claim submission.
          </p>
        </div>
      </div>
    </footer>
  );
}
