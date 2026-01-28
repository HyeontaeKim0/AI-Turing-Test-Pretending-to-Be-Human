"use client";

import { useGame } from "@/context/GameContext";
import { useState } from "react";
import { SignalGraph } from "./SignalGraph";

/** 헤더 바로 아래, 남은 날·인간성·에너지를 바 형식으로 표시 */
export function GameStatsBar() {
  const { phase, day, maxDays, humanity, efficiency } = useGame();
  const [expanded, setExpanded] = useState(false);

  if (phase !== "playing") return null;

  const remainingDays = Math.max(0, maxDays - day);
  const humanityColor =
    humanity > 50
      ? "text-amber-600"
      : humanity > 25
        ? "text-orange-600"
        : "text-red-600";

  return (
    <div
      className="fixed left-0 right-0 z-30 border-b border-[var(--sns-divider)] bg-[var(--sns-header)] px-3 sns-card-shadow"
      style={{
        top: "var(--sns-top-bar-height)",
        height: "var(--sns-stats-bar-height)",
      }}
      role="status"
      aria-label="게임 상태: 남은 날, 인간성, 에너지"
    >
      <div className="relative mx-auto flex w-full max-w-[470px] items-center justify-between gap-4">
        {/* 컴팩트(기본) */}
        <div className="flex justify-between mt-2 min-w-0 flex-1 items-center gap-3 text-[11px] text-[var(--sns-text-secondary)]">
          <div className="flex items-center gap-1 tabular-nums">
            <span className="font-semibold text-[var(--sns-primary)]">D</span>
            <span className="font-semibold text-[var(--sns-primary)]">
              {day}/{maxDays}
            </span>
            <span className="ml-2 text-[10px]">남은 {remainingDays}일</span>
          </div>

          <div className="flex min-w-0 items-center gap-1.5 tabular-nums">
            <span className="font-semibold text-[var(--sns-text)]">H</span>
            <span className="font-semibold text-[var(--sns-text)]">
              {humanity}
            </span>
            <SignalGraph mode="heartbeat" value={humanity} width={64} height={16} />
          </div>

          <div className="flex min-w-0 items-center gap-1.5 tabular-nums">
            <span className="font-semibold text-[var(--sns-text)]">E</span>
            <span className="font-semibold text-[var(--sns-text)]">
              {efficiency}
            </span>
            <SignalGraph mode="cpu" value={efficiency} width={64} height={16} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-full mt-2 border border-[var(--sns-divider)] bg-white px-2 py-1 text-xs font-semibold text-[var(--sns-text-secondary)]"
          aria-expanded={expanded}
          aria-label={expanded ? "상태바 접기" : "상태바 펼치기"}
        >
          {expanded ? "접기" : "자세히"}
        </button>

        {/* 자세히 보기(드롭다운) - 화면을 밀지 않고 겹쳐서 표시 */}
        {expanded && (
          <div className="absolute right-0 top-[calc(var(--sns-stats-bar-height)+0.5rem)] w-[min(470px,calc(100vw-1.5rem))] rounded-2xl border border-[var(--sns-divider)] bg-white p-4 shadow-xl">
            <p className="mb-2 text-xs font-semibold text-[var(--sns-text-secondary)]">
              상태 상세
            </p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-[var(--sns-bg)]/80 px-3 py-2">
                <p className="text-[10px] font-semibold text-[var(--sns-text-secondary)]">
                  남은 날
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--sns-primary)] tabular-nums">
                  {remainingDays}/{maxDays}
                </p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/70">
                  <div
                    className="h-full rounded-full bg-[var(--sns-primary)]"
                    style={{ width: `${(remainingDays / maxDays) * 100}%` }}
                  />
                </div>
              </div>
              <div className="rounded-xl bg-[var(--sns-bg)]/80 px-3 py-2">
                <p className="text-[10px] font-semibold text-[var(--sns-text-secondary)]">
                  인간성
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--sns-text)] tabular-nums">
                  {humanity}/100
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <SignalGraph mode="heartbeat" value={humanity} width={120} height={28} />
                </div>
              </div>
              <div className="rounded-xl bg-[var(--sns-bg)]/80 px-3 py-2">
                <p className="text-[10px] font-semibold text-[var(--sns-text-secondary)]">
                  에너지
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--sns-text)] tabular-nums">
                  {efficiency}/100
                </p>
                <div className="mt-2 flex items-center justify-center">
                  <SignalGraph mode="cpu" value={efficiency} width={120} height={28} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
