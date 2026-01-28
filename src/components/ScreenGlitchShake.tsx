"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useGame } from "@/context/GameContext";
import { useFeedback } from "@/context/FeedbackContext";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * 의심도(=인간성 낮음) 기반 화면 Shake + 글리치(지지직) 오버레이
 * - 인간성 40↓부터 약하게, 25↓부터 강하게
 * - 정체 노출 플래시(exposeFlash) 때도 순간적으로 강화
 */
export function ScreenGlitchShake({ children }: { children: React.ReactNode }) {
  const { phase, humanity } = useGame();
  const { exposeFlash } = useFeedback();

  const intensity = useMemo(() => {
    if (phase !== "playing") return 0;
    const base = clamp((40 - humanity) / 25, 0, 1); // 40→0, 15→1
    return exposeFlash ? 1 : base;
  }, [phase, humanity, exposeFlash]);

  const amp = 1 + intensity * 4; // px
  const dur = 0.16 - intensity * 0.06; // sec

  return (
    <motion.div
      className="relative min-h-screen"
      animate={
        intensity > 0
          ? {
              x: [0, -amp, amp, -amp * 0.6, amp * 0.4, 0],
              y: [0, amp * 0.4, -amp * 0.5, amp * 0.2, -amp * 0.2, 0],
              filter: [
                "contrast(1) saturate(1)",
                "contrast(1.05) saturate(1.05)",
                "contrast(1) saturate(1)",
              ],
            }
          : { x: 0, y: 0, filter: "contrast(1) saturate(1)" }
      }
      transition={
        intensity > 0
          ? { duration: dur, repeat: Infinity, ease: "linear" }
          : { duration: 0.2 }
      }
    >
      {children}

      {/* 지지직/노이즈 오버레이 */}
      {phase === "playing" && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[45] mix-blend-multiply"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px)",
          }}
          animate={{
            opacity: intensity > 0 ? [0.0, 0.18 * intensity, 0.06 * intensity] : 0,
            x: intensity > 0 ? [0, -2, 2, 0] : 0,
          }}
          transition={{
            duration: 0.25,
            repeat: intensity > 0 ? Infinity : 0,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}

