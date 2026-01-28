"use client";

import { useGame } from "@/context/GameContext";
import { getRandomMissions } from "@/data/missions";
import { tutorialLunchMission } from "@/data/tutorialMission";

/** Day1: 튜토리얼 1개 완료. Day2+: 오늘 미션 중 최소 2개 완료해야 "다음 날" 가능 */
const MIN_MISSIONS_TO_ADVANCE_DAY1 = 1;
const MIN_MISSIONS_TO_ADVANCE_DAY2_PLUS = 2;

export function NextDayButton() {
  const { advanceDay, day, maxDays, phase, completedMissions } = useGame();

  const todayMissionIds =
    day === 1
      ? [tutorialLunchMission.id]
      : getRandomMissions(day, 3).map((m) => m.id);
  const completedCount = todayMissionIds.filter((id) =>
    completedMissions.has(id)
  ).length;
  const minRequired =
    day === 1 ? MIN_MISSIONS_TO_ADVANCE_DAY1 : MIN_MISSIONS_TO_ADVANCE_DAY2_PLUS;
  const canAdvance = completedCount >= minRequired;

  if (phase !== "playing" || !canAdvance) return null;

  const isLastDay = day >= maxDays;

  return (
    <div
      className="fixed left-0 right-0 z-20 flex justify-center"
      style={{ bottom: "calc(var(--sns-bottom-nav-height) + 12px)" }}
    >
      <button
        type="button"
        onClick={() => advanceDay()}
        className="rounded-full bg-[var(--sns-primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
      >
        {isLastDay
          ? "생존 완료 (승리)"
          : `다음 날로 (Day ${day + 1})${day >= 2 ? ` · ${completedCount}/3` : ""}`}
      </button>
    </div>
  );
}
