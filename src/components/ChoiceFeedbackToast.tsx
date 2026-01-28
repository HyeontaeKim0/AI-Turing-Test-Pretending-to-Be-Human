"use client";

import { useEffect } from "react";
import { useFeedback, type ChoiceHint } from "@/context/FeedbackContext";

const hintConfig: Record<
  ChoiceHint,
  { label: string; bg: string; text: string; icon: string }
> = {
  safe: {
    label: "인간적!",
    bg: "bg-emerald-500/95",
    text: "text-white",
    icon: "✓",
  },
  danger_robot: {
    label: "로봇 같음",
    bg: "bg-amber-500/95",
    text: "text-white",
    icon: "!",
  },
  danger_expose: {
    label: "정체 노출",
    bg: "bg-red-500/95",
    text: "text-white",
    icon: "⚠",
  },
};

function formatDelta(n: number): string {
  if (n >= 0) return `+${n}`;
  return `${n}`;
}

export function ChoiceFeedbackToast() {
  const { feedback, clearFeedback } = useFeedback();

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(clearFeedback, 2200);
    return () => clearTimeout(t);
  }, [feedback, clearFeedback]);

  if (!feedback) return null;

  const cfg = hintConfig[feedback.hint];

  return (
    <div
      className="fixed left-1/2 top-24 z-40 -translate-x-1/2 animate-fade-in-up rounded-xl px-4 py-3 shadow-lg"
      style={{ animationDuration: "0.25s" }}
      role="status"
      aria-live="polite"
    >
      <div className={`${cfg.bg} ${cfg.text} flex items-center gap-2 rounded-lg px-4 py-2.5`}>
        <span className="text-lg font-bold">{cfg.icon}</span>
        <span className="font-semibold">{cfg.label}</span>
        <span className="text-sm opacity-90">
          H{formatDelta(feedback.humanityDelta)} E{formatDelta(feedback.efficiencyDelta)}
        </span>
      </div>
    </div>
  );
}
