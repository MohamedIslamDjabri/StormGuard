'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export default function BrandLogo({
  size = 'md',
  showSubtitle = true,
  className = '',
}: BrandLogoProps) {
  // Dimensions per size
  const iconSizes = {
    sm: { box: 'w-7 h-7', svg: 'w-4 h-4', text: 'text-base', sub: 'text-[8.5px]' },
    md: { box: 'w-8 h-8 sm:w-9 sm:h-9', svg: 'w-5 h-5', text: 'text-lg sm:text-xl', sub: 'text-[9px] sm:text-[10px]' },
    lg: { box: 'w-10 h-10 sm:w-12 sm:h-12', svg: 'w-6 h-6 sm:w-7 sm:h-7', text: 'text-xl sm:text-2xl', sub: 'text-[10px] sm:text-xs' },
  };

  const current = iconSizes[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Tactical Shield + Roof Crest Icon */}
      <div
        className={`${current.box} rounded-lg bg-gradient-to-br from-[#fbbf24] via-[#f59e0b] to-[#d97706] p-[1.5px] shadow-[0_0_16px_rgba(251,191,36,0.35)] shrink-0 group-hover:shadow-[0_0_22px_rgba(251,191,36,0.5)] transition-shadow`}
      >
        <div className="w-full h-full rounded-[6px] bg-[#111418] flex items-center justify-center relative overflow-hidden">
          {/* Subtle gradient shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#fbbf24]/20 via-transparent to-transparent pointer-events-none" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`${current.svg} text-[#fbbf24]`}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Shield Crest */}
            <path
              d="M12 2L4 5.5V11.5C4 16.5 7.4 21.2 12 22.5C16.6 21.2 20 16.5 20 11.5V5.5L12 2Z"
              stroke="#fbbf24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            />
            {/* Pitched Roof Gable */}
            <path
              d="M7 11.5L12 7.5L17 11.5"
              stroke="#ffe1a7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tactical Emergency Lightning / Reinforcement Core */}
            <path
              d="M12.5 10.5L10 14.5H13L11.5 18"
              stroke="#fbbf24"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="#fbbf24"
              fillOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none shrink-0">
        <div className="flex items-center tracking-tight">
          <span className={`font-display-hero ${current.text} font-black text-[#f1f5f9] tracking-tight`}>
            STORM
          </span>
          <span className={`font-display-hero ${current.text} font-black text-[#fbbf24] tracking-tight ml-0.5`}>
            GUARD
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`font-code-telemetry ${current.sub} font-bold tracking-[0.18em] uppercase text-[#94a3b8] mt-0.5 hidden sm:block`}
          >
            ROOFING LOGISTICS
          </span>
        )}
      </div>
    </div>
  );
}
