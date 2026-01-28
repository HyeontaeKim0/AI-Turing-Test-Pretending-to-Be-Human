"use client";

import { useEffect } from "react";
import { useGame } from "@/context/GameContext";

export function DayTransitionOverlay() {
  const { dayTransitionDay, clearDayTransition, phase } = useGame();

  useEffect(() => {
    if (!dayTransitionDay || phase !== "playing") return;
    const t = setTimeout(clearDayTransition, 1200);
    return () => clearTimeout(t);
  }, [dayTransitionDay, clearDayTransition, phase]);

  if (!dayTransitionDay) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-day-overlay-in"
      aria-hidden
    >
      <div className="rounded-2xl bg-[var(--sns-card)] px-12 py-6 text-center shadow-2xl">
        <p className="text-sm font-medium text-[var(--sns-text-secondary)]">
          다음 날
        </p>
        <p className="mt-1 text-4xl font-bold text-[var(--sns-primary)]">
          Day {dayTransitionDay}
        </p>
      </div>
    </div>
  );
}
