"use client";

import { useGame } from "@/context/GameContext";

function GaugeBar({
  value,
  max,
  colorClass,
  label,
  sublabel,
}: {
  value: number;
  max: number;
  colorClass: string;
  label: string;
  sublabel?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-stone-400">{label}</span>
        {sublabel && (
          <span className="text-stone-500">{sublabel}</span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-stone-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-stone-500">{value} / {max}</span>
    </div>
  );
}

export function GameGauges() {
  const { humanity, efficiency, day, maxDays, phase } = useGame();

  if (phase !== "playing") return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-20 mx-auto max-w-md rounded-lg border border-stone-700/80 bg-stone-900/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between border-b border-stone-700/50 pb-2">
        <span className="font-mono text-xs text-amber-400/90">Day {day} / {maxDays}</span>
        <span className="text-[10px] text-stone-500">생존 중</span>
      </div>
      <div className="space-y-3">
        <GaugeBar
          value={humanity}
          max={100}
          colorClass="bg-amber-500"
          label="인간성 (Humanity)"
          sublabel="0 = 계정 정지"
        />
        <GaugeBar
          value={efficiency}
          max={100}
          colorClass="bg-cyan-500"
          label="연산 효율 (Efficiency)"
          sublabel="과열 시 종료"
        />
      </div>
    </div>
  );
}
