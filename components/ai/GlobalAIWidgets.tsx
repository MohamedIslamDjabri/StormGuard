'use client';

import { useState, useEffect } from 'react';
import AIVoiceCallModal from './AIVoiceCallModal';

export default function GlobalAIWidgets() {
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [voiceModalMode, setVoiceModalMode] = useState<'call' | 'schedule'>('call');

  const openVoiceCall = () => {
    setVoiceModalMode('call');
    setVoiceModalOpen(true);
  };

  const openVoiceSchedule = () => {
    setVoiceModalMode('schedule');
    setVoiceModalOpen(true);
  };

  useEffect(() => {
    (window as any).openStormGuardVoiceCall = openVoiceCall;
    (window as any).openStormGuardVoiceSchedule = openVoiceSchedule;
    return () => {
      delete (window as any).openStormGuardVoiceCall;
      delete (window as any).openStormGuardVoiceSchedule;
    };
  }, []);

  return (
    <AIVoiceCallModal
      isOpen={voiceModalOpen}
      onClose={() => setVoiceModalOpen(false)}
      defaultMode={voiceModalMode}
    />
  );
}

