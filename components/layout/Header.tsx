'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/constants/data';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 w-full z-50 bg-[#111418]/95 backdrop-blur-md border-b border-[#323539] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="h-20 flex items-center justify-between gap-5">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 shrink-0">
                <Image
                  src={SITE_CONFIG.logoUrl}
                  alt="StormGuard Roofing Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto object-contain"
                  priority
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-xl text-[#e1e2e8] tracking-tight uppercase group-hover:text-[#ffe1a7] transition-colors font-bold">
                  {SITE_CONFIG.name}
                </span>
                <span className="font-label-sm text-[10px] text-[#ffdf9f] uppercase tracking-wider">
                  {SITE_CONFIG.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-md text-xs px-2 py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#ffe1a7] font-bold border-b-2 border-[#fbbf24]'
                      : 'text-[#d3c5ac] hover:text-[#e1e2e8]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Live emergency indicator */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#93000a]/20 border border-[#93000a]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb4ab]"></span>
              </span>
              <span className="font-label-sm text-[10px] text-[#ffb4ab] uppercase font-bold tracking-wider">
                24/7 Emergency Response
              </span>
            </div>

            {/* Clickable Phone Number */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 font-code-telemetry text-xs text-[#e1e2e8] hover:text-[#ffe1a7] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#ffe1a7]" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            {/* Primary CTA */}
            <Link
              href="/#quick-form"
              className="inline-flex items-center justify-center bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold px-4 py-2 rounded transition-all shadow-[0_0_20px_-4px_rgba(251,191,36,0.35)] whitespace-nowrap active:scale-95"
            >
              {SITE_CONFIG.primaryCta}
            </Link>

            {/* Field Director Status Avatar */}
            <div className="relative hidden md:flex items-center shrink-0">
              <div className="relative p-0.5 rounded-full ring-1 ring-[#4f4633]">
                <Image
                  src={SITE_CONFIG.avatarUrl}
                  alt="Field Director Active"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#fbbf24] ring-2 ring-[#111418]"
                  title="Field Director Active"
                ></span>
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded text-[#e1e2e8] hover:text-[#ffe1a7] hover:bg-[#1d2024] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full bg-[#111418]/98 border-b border-[#323539] px-4 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#272a2e]">
              <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffb4ab]">
                <span className="h-2 w-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                <span>24/7 Mobile Dispatch Online</span>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1 text-xs text-[#ffe1a7] font-code-telemetry"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded text-sm font-label-md transition-colors ${
                      isActive
                        ? 'bg-[#fbbf24]/20 text-[#ffe1a7] border border-[#fbbf24]/40 font-bold'
                        : 'bg-[#191c20] text-[#e1e2e8] hover:bg-[#272a2e]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#272a2e] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).openStormGuardVoiceCall) {
                    (window as any).openStormGuardVoiceCall();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1d2024] hover:bg-[#272a2e] text-[#ffe1a7] border border-[#fbbf24]/50 font-label-md text-sm font-bold py-2.5 rounded text-center transition-colors cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
                <span>Launch AI Voice Call Booking</span>
              </button>
              <Link
                href="/#quick-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#fbbf24] text-[#6c4f00] font-label-lg text-sm font-bold py-3 rounded text-center shadow-lg"
              >
                <span>Request Emergency Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 bg-[#272a2e] hover:bg-[#323539] text-[#e1e2e8] font-label-md text-sm py-2.5 rounded text-center border border-[#4f4633]"
              >
                <Phone className="w-4 h-4 text-[#ffe1a7]" />
                <span>Direct Hotline: {SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
