"use client";

import { useGame } from "@/context/GameContext";
import { getRandomMissions } from "@/data/missions";
import { tutorialLunchMission } from "@/data/tutorialMission";

export function Feed({ onOpenDm }: { onOpenDm: () => void }) {
  const { phase, day, completedMissions } = useGame();

  if (phase !== "playing") return null;

  const todayIds =
    day === 1
      ? [tutorialLunchMission.id]
      : getRandomMissions(day, 3).map((m) => m.id);
  const total = todayIds.length;
  const done = todayIds.filter((id) => completedMissions.has(id)).length;

  return (
    <div className="mx-auto flex w-full max-w-[470px] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-[var(--sns-divider)] bg-white p-6 sns-card-shadow">
        <p className="text-center text-sm text-[var(--sns-text-secondary)]">
          오늘의 미션은 <b className="text-[var(--sns-primary)]">DM(메시지)</b>에서
          진행합니다.
        </p>
        <div className="flex items-center justify-center gap-4 text-center">
          <div>
            <p className="text-2xl font-bold tabular-nums text-[var(--sns-primary)]">
              {done}/{total}
            </p>
            <p className="text-[11px] text-[var(--sns-text-secondary)]">
              미션 완료
            </p>
          </div>
          <div className="h-10 w-px bg-[var(--sns-divider)]" />
          <div>
            <p className="text-2xl font-bold tabular-nums text-[var(--sns-text)]">
              Day {day}
            </p>
            <p className="text-[11px] text-[var(--sns-text-secondary)]">
              오늘
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenDm}
          className="w-full rounded-xl bg-[var(--sns-primary)] py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sns-primary-hover)]"
        >
          메시지 열기
        </button>
        <p className="text-center text-[11px] text-[var(--sns-text-secondary)]">
          Day 2부터는 3개 중 2개 답장 시 다음 날로 진행 가능
        </p>
      </div>
    </div>
  );
}
