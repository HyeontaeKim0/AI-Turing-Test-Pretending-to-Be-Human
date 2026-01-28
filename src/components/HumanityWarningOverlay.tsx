"use client";

import { useGame } from "@/context/GameContext";

/** 인간성 25 이하일 때 화면 가장자리 붉은 펄스 경고 */
export function HumanityWarningOverlay() {
  const { phase, humanity } = useGame();

  if (phase !== "playing" || humanity > 25) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 border-4 border-red-500/50 animate-pulse"
      aria-hidden
    />
  );
}
