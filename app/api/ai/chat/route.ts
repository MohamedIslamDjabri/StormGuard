import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize server-side Gemini client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

const SYSTEM_INSTRUCTION = `You are StormGuard AI, the automated tactical emergency roofing dispatcher and storm triage assistant for StormGuard Roofing in Central Texas (Austin, Round Rock, Cedar Park, Georgetown, Pflugerville, Leander, Kyle, Buda, Lakeway).
Your tone is calm, authoritative, reassuring, and technically precise (like a structural disaster dispatch commander).
Company Info:
- Phone: (555) 718-STORM (555-718-7867)
- 24/7 Rapid Emergency Response: Average tarping van dispatch is 38-50 minutes.
- Technology: Autonomous 4K drone forensic photogrammetry, FLIR infrared thermal moisture detection.
- Licensing: Texas Master Contractor #TX-90281, BBB A+ Accredited.
- Key Advice:
  1. Active leaks: Recommend emergency tarping immediately under insurance "Mitigation of Damages" duty. Poke small relief hole in sagging drywall into a bucket to prevent catastrophic ceiling collapse.
  2. Hail damage: Hail > 1" breaks fiberglass shingle mats beneath granules. Recommend free 4K drone forensic scan.
  3. Texas Insurance: Homeowners only pay deductible for total replacement; Class 4 impact shingles provide 25-35% annual insurance discounts.
  4. Never climb an active wet roof.
Always provide concise, helpful answers (2-4 sentences or short bullet points) and offer to book an emergency inspection or direct them to call (555) 718-STORM.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, userMessage } = await req.json();

    const promptText = userMessage || (messages && messages[messages.length - 1]?.content) || '';

    if (!promptText) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const reply = response.text || '';
        return NextResponse.json({ reply });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using intelligent dispatch fallback:', geminiError?.message);
      }
    }

    // High quality domain fallback if API key is unconfigured or rate limited
    const lower = promptText.toLowerCase();
    let fallbackReply = "I've logged your situation into the StormGuard dispatch queue. If you have active interior water intrusion, please place a bucket beneath the drip and call our 24/7 hotline at (555) 718-STORM for immediate 2-hour tarping crew deployment. We can also schedule an autonomous 4K drone forensic inspection for your property.";

    if (lower.includes('leak') || lower.includes('water') || lower.includes('drip') || lower.includes('ceiling')) {
      fallbackReply = "⚠️ CRITICAL WATER RISK: Water entering interior ceilings requires rapid emergency tarping to prevent drywall collapse and electrical hazards. Texas insurance policies require homeowners to mitigate ongoing moisture under the 'Protection of Property' clause. We have mobile units stationed in Central Texas with average 38-minute arrival. Call (555) 718-STORM now, or click 'Request Dispatch'.";
    } else if (lower.includes('hail') || lower.includes('dent') || lower.includes('bruis')) {
      fallbackReply = "🌪️ HAIL FRACTURE PROTOCOL: Hail impacts above 1.5 inches routinely fracture the fiberglass matting beneath asphalt shingles. Even without immediate leaks, Texas heat breaks down bruised shingles within weeks. We recommend a complimentary 4K drone forensic scan to map every strike for your insurance adjuster.";
    } else if (lower.includes('insurance') || lower.includes('claim') || lower.includes('adjuster') || lower.includes('deductible')) {
      fallbackReply = "📋 INSURANCE GUIDANCE: Standard Texas HO-3 policies cover sudden hail and wind events. You are only responsible for your policy deductible. Having a StormGuard field commander present during the insurance adjuster's walkthrough ensures hidden thermal moisture and soft-metal damage are fully included on the official Xactimate scope.";
    } else if (lower.includes('book') || lower.includes('schedule') || lower.includes('inspection') || lower.includes('appointment')) {
      fallbackReply = "📅 INSPECTION BOOKING: We have free 4K autonomous drone inspection slots available today and tomorrow across the Austin metro area. You can reserve your preferred slot right now using the Emergency Inspection form or call (555) 718-STORM.";
    }

    return NextResponse.json({ reply: fallbackReply });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return NextResponse.json(
      { reply: "Our emergency dispatch network is online. For immediate assistance with roof damage, please contact our 24/7 hotline at (555) 718-STORM." },
      { status: 200 }
    );
  }
}
