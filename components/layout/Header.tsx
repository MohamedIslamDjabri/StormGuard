'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, ChevronDown, Bot, PhoneCall, ShieldAlert } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/constants/data';
import BrandLogo from '@/components/ui/BrandLogo';

// Primary links shown directly on desktop
const PRIMARY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Storm Damage', href: '/storm-damage' },
  { label: 'Emergency Repair', href: '/emergency-roof-repair' },
  { label: 'Roof Inspection', href: '/roof-inspection' },
  { label: 'Insurance Claims', href: '/insurance-claims' },
];

// Secondary links tucked cleanly into 'More' dropdown on desktop
const SECONDARY_LINKS = [
  { label: 'Projects Gallery', href: '/projects' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Dispatch', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSecondaryActive = SECONDARY_LINKS.some((l) => pathname === l.href);

  return (
    <header className="sticky top-0 w-full max-w-full z-50 bg-[#111418]/95 backdrop-blur-md border-b border-[#2b3038] shadow-lg overflow-x-clip">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo - Single, crisp, official logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center group py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fbbf24] rounded-lg"
              aria-label="StormGuard Roofing Home"
            >
              <BrandLogo size="md" showSubtitle={true} />
            </Link>
          </div>

          {/* Compact Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-md text-xs xl:text-sm px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-[#ffe1a7] bg-[#fbbf24]/15 font-bold border border-[#fbbf24]/30'
                      : 'text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1a1f26]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* 'More' Dropdown for Secondary Routes */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`font-label-md text-xs xl:text-sm px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSecondaryActive || dropdownOpen
                    ? 'text-[#ffe1a7] font-bold bg-[#1a1f26] border border-[#fbbf24]/30'
                    : 'text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1a1f26]'
                }`}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#161a20] border border-[#3b4352] rounded-xl p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {SECONDARY_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-xs font-label-md transition-colors ${
                          isActive
                            ? 'bg-[#fbbf24]/20 text-[#ffe1a7] font-bold'
                            : 'text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#202630]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Clickable Phone Number (Desktop) */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hidden md:flex items-center gap-2 font-code-telemetry text-xs text-[#e1e2e8] hover:text-[#ffe1a7] transition-all py-1.5 px-2.5 rounded-lg hover:bg-[#1a1f26] border border-transparent hover:border-[#3b4352]"
              title="Call 24/7 Emergency Dispatch"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#fbbf24]"></span>
              </span>
              <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="font-bold tracking-wide">{SITE_CONFIG.phone}</span>
            </a>

            {/* Quick Call Icon (Visible on intermediate screens, hidden on very narrow screens) */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hidden xs:flex md:hidden p-1.5 sm:p-2 rounded-lg bg-[#1a1f26] text-[#fbbf24] border border-[#3b4352] hover:bg-[#202630] transition-colors"
              aria-label="Direct Phone Call"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Primary CTA Button */}
            <Link
              href="/#quick-form"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f9bd22] hover:to-[#d97706] text-[#111418] font-label-lg text-xs font-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all shadow-[0_0_14px_rgba(251,191,36,0.35)] whitespace-nowrap active:scale-95"
            >
              <span className="hidden sm:inline">Emergency Inspection</span>
              <span className="sm:hidden font-bold text-[11px]">Inspect</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#cbd5e1] hover:text-[#f8fafc] hover:bg-[#1a1f26] transition-colors cursor-pointer border border-[#2b3038]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#111418]/98 border-b border-[#2b3038] px-4 py-4 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[82vh] overflow-y-auto">
          <div className="flex flex-col space-y-3">
            {/* Quick Dispatch Indicator */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#2b3038] text-xs font-code-telemetry">
              <div className="flex items-center gap-2 text-[#ffb4ab]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb4ab] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffb4ab]"></span>
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider">24/7 Mobile Dispatch Active</span>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1 text-[#ffe1a7] font-bold text-xs hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>

            {/* Navigation Links Grid (2 columns) */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-xs font-label-md transition-all truncate flex items-center justify-between ${
                      isActive
                        ? 'bg-[#fbbf24]/20 text-[#ffe1a7] border border-[#fbbf24]/40 font-bold'
                        : 'bg-[#1a1f26] text-[#cbd5e1] hover:bg-[#202630] hover:text-[#f8fafc]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"></span>}
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions Cluster: 2 side-by-side AI buttons + Inspection CTA */}
            <div className="pt-3 border-t border-[#2b3038] flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof window !== 'undefined' && (window as any).openStormGuardVoiceCall) {
                      (window as any).openStormGuardVoiceCall();
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-[#1a1f26] hover:bg-[#202630] text-[#ffe1a7] border border-[#fbbf24]/50 text-xs font-bold py-2.5 px-3 rounded-lg text-center transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>AI Voice Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (typeof window !== 'undefined' && (window as any).openStormGuardAIChat) {
                      (window as any).openStormGuardAIChat();
                    }
                  }}
                  className="flex items-center justify-center gap-2 bg-[#1a1f26] hover:bg-[#202630] text-[#ffe1a7] border border-[#3b4352] text-xs font-bold py-2.5 px-3 rounded-lg text-center transition-colors cursor-pointer shadow-sm active:scale-95"
                >
                  <Bot className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>AI Chat &amp; Triage</span>
                </button>
              </div>

              <Link
                href="/#quick-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] hover:from-[#f9bd22] text-[#111418] font-label-lg text-xs font-black py-2.5 rounded-lg text-center shadow-lg transition-all active:scale-95"
              >
                <span>Request Emergency Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
