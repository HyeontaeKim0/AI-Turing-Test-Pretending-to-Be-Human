"use client";

import { useEffect } from "react";
import { useFeedback } from "@/context/FeedbackContext";

/** 정체 노출(danger_expose) 선택 시 잠깐 보이는 빨간 풀스크린 플래시 */
export function DangerExposeFlash() {
  const { exposeFlash, clearExposeFlash } = useFeedback();

  useEffect(() => {
    if (!exposeFlash) return;
    const t = setTimeout(clearExposeFlash, 600);
    return () => clearTimeout(t);
  }, [exposeFlash, clearExposeFlash]);

  if (!exposeFlash) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-red-600/90 animate-expose-flash"
      aria-hidden
    >
      <p className="text-center text-2xl font-black tracking-wider text-white drop-shadow-lg">
        정체 노출
      </p>
    </div>
  );
}
