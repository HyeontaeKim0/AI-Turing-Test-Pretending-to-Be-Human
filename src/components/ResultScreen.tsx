"use client";

import { useGame } from "@/context/GameContext";

export function ResultScreen() {
  const { phase, gameOverReason, day, maxDays, resetGame } = useGame();

  if (phase === "playing" || phase === "intro") return null;

  const isVictory = phase === "victory";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--sns-overlay)] backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-2xl border border-[var(--sns-divider)] bg-[var(--sns-card)] p-8 text-center shadow-2xl">
        {isVictory ? (
          <>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--sns-primary)]">
              생존 완료
            </p>
            <h2 className="mt-2 text-3xl font-black text-[var(--sns-primary)] animate-victory-glow">
              {maxDays}일 생존
            </h2>
            <p className="mt-4 text-[var(--sns-text)]">
              정체를 들키지 않고 {maxDays}일을 버텼습니다.
            </p>
            <p className="mt-2 text-sm text-[var(--sns-text-secondary)]">
              Day {day} / {maxDays}
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-500">계정 정지</h2>
            <p className="mt-4 text-[var(--sns-text)]">{gameOverReason}</p>
          </>
        )}
        <button
          type="button"
          onClick={resetGame}
          className="mt-6 rounded-lg bg-[var(--sns-primary)] px-6 py-2.5 font-semibold text-white transition hover:opacity-95"
        >
          다시 시작
        </button>
      </div>
    </div>
  );
}
