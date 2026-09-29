import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      callerName = 'Central Texas Resident',
      phone = '(555) 000-0000',
      address = 'Austin Metro',
      damageType = 'leak',
      urgency = 'critical',
      scheduledTime = 'immediate',
    } = body;

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const token = `TX-VOICE-${randomId}`;

    const etaMinutes = urgency === 'critical' ? 35 : urgency === 'urgent' ? 60 : 120;
    const crewId = Math.floor(1 + Math.random() * 5);

    return NextResponse.json({
      success: true,
      token,
      etaMinutes,
      assignedCrew: `Mobile Tarp Unit #${crewId} (Central Texas Fleet)`,
      scheduledTime: scheduledTime === 'immediate' ? 'Immediate Dispatch' : scheduledTime,
      callerName,
      phone,
      address,
      damageType,
      urgency,
      confirmationMessage: `Dispatch token ${token} locked. Crew #${crewId} notified for ${address}. Live callback dispatch in progress.`,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/ai/voice-booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process voice booking' },
      { status: 500 }
    );
  }
}
