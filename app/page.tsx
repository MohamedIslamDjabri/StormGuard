import HeroSection from '@/components/sections/HeroSection';
import EmergencyStatusBar from '@/components/sections/EmergencyStatusBar';
import AIStormAssistant from '@/components/ai/AIStormAssistant';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ServicesGrid from '@/components/sections/ServicesGrid';
import AIVoiceReceptionist from '@/components/ai/AIVoiceReceptionist';
import ProjectGallery from '@/components/projects/ProjectGallery';
import StatsSection from '@/components/sections/StatsSection';
import EmergencyInspectionForm from '@/components/forms/EmergencyInspectionForm';
import ServiceAreasSection from '@/components/sections/ServiceAreasSection';
import FAQSection from '@/components/sections/FAQSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO SECTION */}
      <HeroSection />

      {/* SECTION 2: EMERGENCY STATUS BAR */}
      <EmergencyStatusBar />

      {/* SECTION 3: AI STORM-DAMAGE ASSISTANT */}
      <AIStormAssistant />

      {/* SECTION 4: SMART EMERGENCY TRIAGE STEP FLOW */}
      <ProcessSteps />

      {/* SECTION 5: CORE EMERGENCY SERVICES GRID */}
      <ServicesGrid />

      {/* SECTION 6: AI VOICE EMERGENCY RECEPTIONIST */}
      <AIVoiceReceptionist />

      {/* SECTION 7: PROOF & VERIFIED STORM PROJECTS */}
      <ProjectGallery />

      {/* SECTION 8: HOMEOWNER TESTIMONIALS & TELEMETRY STATS */}
      <StatsSection />

      {/* SECTION 9: COMPACT EMERGENCY LEAD FORM ("NEED HELP NOW?") */}
      <EmergencyInspectionForm />

      {/* SECTION 10: SERVICE COVERAGE MAP & FAQ PREVIEW */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <ServiceAreasSection />
        <div className="mt-12">
          <FAQSection limit={4} />
        </div>
      </section>
    </div>
  );
}
