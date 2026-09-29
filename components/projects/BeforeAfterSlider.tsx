'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Storm damaged roof prior to restoration",
  afterAlt = "Restored Class 4 architectural impact roof",
  beforeLabel = "Storm Damage",
  afterLabel = "Restored Roof",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden select-none border border-[#4f4633]/40 cursor-ew-resize bg-[#191c20]"
    >
      {/* After Image (Full Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-3 right-3 bg-[#0b0e12]/85 backdrop-blur-md px-2.5 py-1 rounded font-code-telemetry text-xs text-[#ffe1a7] border border-[#fbbf24]/30 z-10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (Clipped Left Layer with GPU-accelerated clipPath) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-3 left-3 bg-[#93000a]/85 backdrop-blur-md px-2.5 py-1 rounded font-code-telemetry text-xs text-[#ffdad6] border border-[#ffb4ab]/40 z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Draggable Divider Bar */}
      <div
        onMouseDown={handleMouseDown}
        style={{ left: `${sliderPosition}%` }}
        className="absolute top-0 bottom-0 w-1 bg-[#fbbf24] -translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.6)] cursor-ew-resize z-20"
      >
        <div className="w-8 h-8 rounded-full bg-[#111418] border-2 border-[#fbbf24] flex items-center justify-center shadow-lg text-[#fbbf24] text-[10px] font-bold">
          ◀▶
        </div>
      </div>
    </div>
  );
}
