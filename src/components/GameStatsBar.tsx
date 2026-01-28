"use client";

import { useGame } from "@/context/GameContext";

/** 헤더 바로 아래, 남은 날·인간성·에너지를 바 형식으로 표시 */
export function GameStatsBar() {
  const { phase, day, maxDays, humanity, efficiency } = useGame();

  if (phase !== "playing") return null;

  const remainingDays = Math.max(0, maxDays - day);

  return (
    <div
      className="fixed left-0 right-0 z-30 flex items-center border-b border-[var(--sns-divider)] bg-[var(--sns-header)] px-4 py-3 sns-card-shadow"
      style={{
        top: "var(--sns-top-bar-height)",
        minHeight: "var(--sns-stats-bar-height)",
      }}
      role="status"
      aria-label="게임 상태: 남은 날, 인간성, 에너지"
    >
      <div className="mx-auto flex w-full max-w-[470px] items-stretch justify-between gap-3">
        {/* 남은 날 */}
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-[var(--sns-bg)]/80 px-2 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sns-text-secondary)]">
            남은 날
          </span>
          <span className="mt-0.5 text-xl font-bold tabular-nums text-[var(--sns-primary)]">
            {remainingDays}
            <span className="ml-0.5 text-sm font-medium text-[var(--sns-text-secondary)]">
              /{maxDays}
            </span>
          </span>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-[var(--sns-primary)] transition-all duration-300"
              style={{ width: `${(remainingDays / maxDays) * 100}%` }}
            />
          </div>
        </div>

        {/* 인간성 */}
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-[var(--sns-bg)]/80 px-2 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sns-text-secondary)]">
            인간성
          </span>
          <span
            className={`mt-0.5 text-xl font-bold tabular-nums ${
              humanity > 50
                ? "text-amber-500"
                : humanity > 25
                  ? "text-orange-500"
                  : "text-red-500"
            }`}
          >
            {humanity}
          </span>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                humanity > 50
                  ? "bg-amber-500"
                  : humanity > 25
                    ? "bg-orange-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${Math.min(100, humanity)}%` }}
            />
          </div>
        </div>

        {/* 에너지 */}
        <div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-lg bg-[var(--sns-bg)]/80 px-2 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--sns-text-secondary)]">
            에너지
          </span>
          <span className="mt-0.5 text-xl font-bold tabular-nums text-cyan-600">
            {efficiency}
          </span>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/60">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${Math.min(100, efficiency)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
