'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS, FAQItem } from '@/constants/data';

interface FAQSectionProps {
  category?: string;
  limit?: number;
  showFilters?: boolean;
}

export default function FAQSection({ category, limit, showFilters = false }: FAQSectionProps) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // first one open by default matching Stitch
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  let displayedFaqs = FAQS;

  if (category) {
    displayedFaqs = displayedFaqs.filter((f) => f.category === category);
  } else if (activeCategory !== 'all') {
    displayedFaqs = displayedFaqs.filter((f) => f.category === activeCategory);
  }

  if (limit) {
    displayedFaqs = displayedFaqs.slice(0, limit);
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="text-center mb-8">
        <span className="font-code-telemetry text-xs text-[#ffe1a7] uppercase font-bold tracking-wider">
          Critical Questions
        </span>
        <h2 className="font-headline-lg text-3xl md:text-4xl text-[#e1e2e8] font-bold tracking-tight mt-1">
          Emergency Storm Response FAQ
        </h2>
      </div>

      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2 pb-4">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded font-label-md text-xs font-semibold cursor-pointer transition-colors ${
              activeCategory === 'all'
                ? 'bg-[#fbbf24] text-[#6c4f00]'
                : 'bg-[#1d2024] text-[#d3c5ac] border border-[#4f4633]/40'
            }`}
          >
            All FAQs
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('emergency-repairs')}
            className={`px-3 py-1.5 rounded font-label-md text-xs font-semibold cursor-pointer transition-colors ${
              activeCategory === 'emergency-repairs'
                ? 'bg-[#fbbf24] text-[#6c4f00]'
                : 'bg-[#1d2024] text-[#d3c5ac] border border-[#4f4633]/40'
            }`}
          >
            Emergency Repairs
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('insurance')}
            className={`px-3 py-1.5 rounded font-label-md text-xs font-semibold cursor-pointer transition-colors ${
              activeCategory === 'insurance'
                ? 'bg-[#fbbf24] text-[#6c4f00]'
                : 'bg-[#1d2024] text-[#d3c5ac] border border-[#4f4633]/40'
            }`}
          >
            Insurance Claims
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('inspections')}
            className={`px-3 py-1.5 rounded font-label-md text-xs font-semibold cursor-pointer transition-colors ${
              activeCategory === 'inspections'
                ? 'bg-[#fbbf24] text-[#6c4f00]'
                : 'bg-[#1d2024] text-[#d3c5ac] border border-[#4f4633]/40'
            }`}
          >
            Drone Inspections
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('storm-damage')}
            className={`px-3 py-1.5 rounded font-label-md text-xs font-semibold cursor-pointer transition-colors ${
              activeCategory === 'storm-damage'
                ? 'bg-[#fbbf24] text-[#6c4f00]'
                : 'bg-[#1d2024] text-[#d3c5ac] border border-[#4f4633]/40'
            }`}
          >
            Hail &amp; Wind
          </button>
        </div>
      )}

      {displayedFaqs.map((faq) => {
        const isOpen = !!openIds[faq.id];
        return (
          <div
            key={faq.id}
            className="rounded-lg bg-[#1d2024] border border-[#4f4633]/30 overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleFaq(faq.id)}
              className="w-full p-4 text-left flex items-center justify-between font-headline-sm text-sm sm:text-base text-[#e1e2e8] hover:text-[#ffe1a7] transition-colors cursor-pointer"
            >
              <span className="font-semibold pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#ffe1a7] shrink-0 transform transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#fbbf24]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-4 pt-0 font-body-md text-xs sm:text-sm text-[#d3c5ac] border-t border-[#323539] leading-relaxed animate-in fade-in duration-150">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
