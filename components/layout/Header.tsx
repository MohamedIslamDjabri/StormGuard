'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, ChevronDown, Bot } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/constants/data';

// Primary links shown directly on desktop
const PRIMARY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Storm Damage', href: '/storm-damage' },
  { label: 'Emergency Repair', href: '/emergency-roof-repair' },
  { label: 'Inspection', href: '/roof-inspection' },
  { label: 'Insurance', href: '/insurance-claims' },
];

// Secondary links tucked cleanly into 'More' dropdown on desktop
const SECONDARY_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
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
    <header className="sticky top-0 w-full z-50 bg-[#111418]/95 backdrop-blur-md border-b border-[#323539] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-3 md:gap-4">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SITE_CONFIG.logoUrl}
                alt="StormGuard Roofing Logo"
                className="h-7 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-base text-[#e1e2e8] tracking-tight uppercase group-hover:text-[#ffe1a7] transition-colors font-bold leading-none">
                    StormGuard
                  </span>
                  <span className="text-xs text-[#fbbf24] font-bold uppercase tracking-wider">
                    Roofing
                  </span>
                </div>
                <span className="font-label-sm text-[8.5px] text-[#ffdf9f] uppercase tracking-wider leading-tight">
                  24/7 Storm Response
                </span>
              </div>
            </Link>
          </div>

          {/* Compact Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-label-md text-xs px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#ffe1a7] bg-[#fbbf24]/10 font-bold border-b border-[#fbbf24]'
                      : 'text-[#d3c5ac] hover:text-[#e1e2e8] hover:bg-[#1d2024]'
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
                className={`font-label-md text-xs px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer ${
                  isSecondaryActive || dropdownOpen
                    ? 'text-[#ffe1a7] font-bold bg-[#1d2024]'
                    : 'text-[#d3c5ac] hover:text-[#e1e2e8] hover:bg-[#1d2024]'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-[#1d2024] border border-[#4f4633]/60 rounded-xl p-1.5 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
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
                            : 'text-[#d3c5ac] hover:text-[#e1e2e8] hover:bg-[#272a2e]'
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Clickable Phone Number */}
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="hidden sm:flex items-center gap-1.5 font-code-telemetry text-xs text-[#e1e2e8] hover:text-[#ffe1a7] transition-colors py-1 px-2 rounded hover:bg-[#1d2024]"
            >
              <Phone className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span className="font-semibold">{SITE_CONFIG.phone}</span>
            </a>

            {/* Primary CTA Button */}
            <Link
              href="/#quick-form"
              className="inline-flex items-center justify-center bg-[#fbbf24] hover:bg-[#f9bd22] text-[#6c4f00] font-label-lg text-xs font-bold px-3 py-1.5 rounded transition-all shadow-[0_0_14px_-3px_rgba(251,191,36,0.35)] whitespace-nowrap active:scale-95"
            >
              <span>Emergency Inspection</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded text-[#e1e2e8] hover:text-[#ffe1a7] hover:bg-[#1d2024] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#111418]/98 border-b border-[#323539] px-4 py-5 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#272a2e]">
              <div className="flex items-center gap-1.5 text-xs font-code-telemetry text-[#ffb4ab]">
                <span className="h-2 w-2 rounded-full bg-[#ffb4ab] animate-pulse"></span>
                <span>24/7 Mobile Dispatch Active</span>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-1 text-xs text-[#ffe1a7] font-code-telemetry font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded text-xs font-label-md transition-colors ${
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

            <div className="pt-2 border-t border-[#272a2e] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).openStormGuardVoiceCall) {
                    (window as any).openStormGuardVoiceCall();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#1d2024] hover:bg-[#272a2e] text-[#ffe1a7] border border-[#fbbf24]/50 font-label-md text-xs font-bold py-2.5 rounded text-center transition-colors cursor-pointer"
              >
                <span className="h-2 w-2 rounded-full bg-[#fbbf24] animate-ping"></span>
                <span>Launch AI Voice Call Booking</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && (window as any).openStormGuardAIChat) {
                    (window as any).openStormGuardAIChat();
                  }
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#191c20] hover:bg-[#272a2e] text-[#fbbf24] border border-[#4f4633]/50 font-label-md text-xs font-bold py-2 rounded text-center transition-colors cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Open 24/7 AI Triage &amp; Booking Chat</span>
              </button>
              <Link
                href="/#quick-form"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-[#fbbf24] text-[#6c4f00] font-label-lg text-xs font-bold py-2.5 rounded text-center shadow-lg"
              >
                <span>Request Emergency Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
