'use client';

import { useState } from 'react';
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Camera,
  Scale,
  Shield,
  Send,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface PromptOption {
  id: string;
  question: string;
  title: string;
  answer: string;
  checklist: string[];
}

const INSURANCE_PROMPTS: PromptOption[] = [
  {
    id: 'document',
    question: 'What should I document after a storm?',
    title: 'Evidence Gathering Protocol for Texas Storm Claims',
    answer: 'Before cleanup begins, capture ground-level timestamped photos of hail stones next to a ruler or coin, exterior soft metal impacts (dented gutters, window screens, AC condenser fins), and any interior ceiling leaks. Never climb an active wet roof—let licensed drone operators capture the roof deck.',
    checklist: [
      'Take 360° exterior home photos showing neighborhood storm context',
      'Photograph hail diameter against a quarter or ruler immediately',
      'Document all interior ceiling drip spots or damp drywall with video',
      'Keep copies of all temporary repair receipts (tarps, buckets, extraction)',
    ],
  },
  {
    id: 'leaking',
    question: 'What should I do if my roof is leaking right now?',
    title: 'Emergency Mitigation Duty Under Texas Policy',
    answer: 'Texas homeowner insurance contracts include a mandatory "Duty to Protect Property" clause. You are legally obligated to prevent further water ingress. Secure emergency tarping immediately. Most insurers reimburse 100% of reasonable temporary mitigation costs beyond your standard roof replacement payout.',
    checklist: [
      'Contain water with buckets and poke a small hole in bulging drywall',
      'Turn off circuit breakers if water is dripping near fixtures',
      'Call (555) 718-STORM for emergency tarp deployment with insurer invoicing',
      'Do not throw away soaked personal items until adjuster inspects them',
    ],
  },
  {
    id: 'inspection',
    question: 'What happens during a roof inspection?',
    title: 'StormGuard 4K Drone & Thermal Diagnostic Sweep',
    answer: 'Our field commander conducts an autonomous 4K drone photogrammetry sweep, creating a 3D digital model of every roof slope. We use FLIR infrared thermal imaging to locate water trapped beneath asphalt shingles and map soft metal collateral damage, assembling an adjuster-ready Xactimate report.',
    checklist: [
      'Digital 3D elevation map documenting hail strike frequency per 100 sq ft',
      'Thermal moisture scan verifying insulation saturation',
      'Itemized line-item scope compatible with Xactimate claim software',
      'Full representation during the insurance adjuster on-site walkthrough',
    ],
  },
  {
    id: 'adjuster',
    question: 'How do I communicate damage to my insurance adjuster?',
    title: 'Carrier Communication & Adjuster Meeting Advocacy',
    answer: 'Report the storm date promptly. When the field adjuster visits, have your StormGuard contractor on-site. Adjusters often miss micro-fractures on steep or high roof sections if they do not climb them. Having our drone forensic photos ensures subtle hail bruises are not labeled as pre-existing wear.',
    checklist: [
      'File the claim as "Storm Damage - Wind/Hail" with exact event date',
      'Request that your contractor be present during the adjuster inspection',
      'Provide our PDF drone engineering report to the adjuster',
      'Review the initial Estimate of Loss before signing any release',
    ],
  },
];

export default function InsuranceAIAssistant() {
  const [activePromptId, setActivePromptId] = useState<string>('document');
  const [userQuery, setUserQuery] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [loadingQuery, setLoadingQuery] = useState(false);

  const activePrompt = INSURANCE_PROMPTS.find((p) => p.id === activePromptId) || INSURANCE_PROMPTS[0];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setLoadingQuery(true);
    setTimeout(() => {
      setCustomAnswer(
        `Regarding "${userQuery}": Under Texas standard HO-3 policies, sudden storm breaches (wind shear, hail, fallen trees) are typically covered perils, subject to your deductible. We strongly advise obtaining a free 4K drone forensic scan before formally opening a claim to ensure documented damage exceeds your deductible threshold.`
      );
      setLoadingQuery(false);
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl bg-[#1d2024] border border-[#4f4633]/50 p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#323539]">
        <div>
          <div className="inline-flex items-center gap-1.5 font-code-telemetry text-xs text-[#ffe1a7] bg-[#272a2e] px-2.5 py-1 rounded border border-[#4f4633]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>AI Claim Intelligence</span>
          </div>
          <h3 className="font-headline-sm text-xl text-[#e1e2e8] font-bold mt-1">
            Insurance FAQ &amp; Guidance Assistant
          </h3>
        </div>
        <span className="font-code-telemetry text-xs text-[#c2c7cf] bg-[#191c20] px-3 py-1 rounded border border-[#4f4633]/30">
          Texas HO-3 Guideline Model
        </span>
      </div>

      {/* Quick Select Prompts */}
      <div className="flex flex-wrap gap-2">
        {INSURANCE_PROMPTS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setActivePromptId(p.id);
              setCustomAnswer(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-label-md font-semibold transition-all cursor-pointer ${
              activePromptId === p.id && !customAnswer
                ? 'bg-[#fbbf24] text-[#6c4f00] shadow-[0_0_12px_rgba(251,191,36,0.3)] font-bold'
                : 'bg-[#272a2e] text-[#d3c5ac] hover:bg-[#323539] hover:text-[#e1e2e8] border border-[#4f4633]/40'
            }`}
          >
            {p.question}
          </button>
        ))}
      </div>

      {/* Answer & Guidance Box */}
      <div className="p-5 rounded-xl bg-[#0b0e12] border border-[#4f4633]/40 space-y-4">
        {customAnswer ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffe1a7] font-bold">
              <Sparkles className="w-4 h-4 text-[#fbbf24]" />
              <span>CUSTOM CLAIM ADVISORY</span>
            </div>
            <p className="font-body-md text-sm text-[#e1e2e8] leading-relaxed">
              {customAnswer}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-code-telemetry text-[#ffe1a7] font-bold">
                <Shield className="w-4 h-4 text-[#fbbf24]" />
                <span>{activePrompt.title}</span>
              </div>
              <p className="font-body-md text-sm text-[#e1e2e8] mt-2 leading-relaxed">
                {activePrompt.answer}
              </p>
            </div>

            {/* Checklist */}
            <div className="pt-2">
              <span className="font-code-telemetry text-xs text-[#9c8f79] uppercase font-bold block mb-2">
                Recommended Action Checklist:
              </span>
              <div className="space-y-2">
                {activePrompt.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#d3c5ac]">
                    <CheckCircle2 className="w-4 h-4 text-[#ffe1a7] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-[#1d2024] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] font-code-telemetry text-[#c2c7cf]">
            Need our field adjuster on site for your claim walkthrough?
          </span>
          <Link
            href="/#quick-form"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#fbbf24] text-[#6c4f00] font-label-md text-xs font-bold hover:bg-[#f9bd22] transition-colors"
          >
            <span>Request Adjuster Meeting Prep</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Ask Custom Question Bar */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask an insurance question (e.g. Does insurance cover Class 4 upgrade?)..."
          className="flex-1 bg-[#191c20] border border-[#4f4633]/50 focus:border-[#fbbf24] text-[#e1e2e8] px-3.5 py-2.5 rounded font-body-md text-xs focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={loadingQuery}
          className="px-4 py-2.5 bg-[#272a2e] hover:bg-[#323539] text-[#ffe1a7] border border-[#4f4633]/60 rounded font-label-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          {loadingQuery ? <span>Analyzing...</span> : <Send className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </form>

      {/* Disclaimer */}
      <div className="p-3 rounded bg-[#191c20] border border-[#93000a]/30 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5" />
        <p className="font-code-telemetry text-[11px] text-[#ffdad6] leading-relaxed">
          <strong className="text-white">Legal &amp; Policy Notice:</strong> StormGuard Roofing provides storm damage documentation and contracting estimates. We do not act as public adjusters or offer formal legal coverage guarantees. Actual policy terms and approvals are governed solely by your insurance carrier.
        </p>
      </div>
    </div>
  );
}
