"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/context/GameContext";
import { useFeedback } from "@/context/FeedbackContext";
import { getRandomMissions } from "@/data/missions";
import { tutorialLunchMission } from "@/data/tutorialMission";
import type { CommentChoice, MissionDefinition } from "@/types/game";
import { MissionComposer } from "./MissionComposer";

function todayMissions(day: number): MissionDefinition[] {
  if (day === 1) return [tutorialLunchMission, ...getRandomMissions(day, 5)];
  return getRandomMissions(day, 6);
}

export function DmInboxModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { phase, day, maxDays, humanity, efficiency, completedMissions, completeMission } =
    useGame();
  const { showFeedback } = useFeedback();
  const missions = useMemo(() => todayMissions(day), [day]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const list = missions.map((m) => ({
    mission: m,
    done: completedMissions.has(m.id),
  }));

  const active =
    list.find((x) => x.mission.id === activeId)?.mission ??
    list[0]?.mission ??
    null;

  // 모달 오픈/Day 변경 시 기본 선택을 첫 대화로 맞춤
  useEffect(() => {
    if (!open || phase !== "playing") return;
    if (list.length === 0) return;
    if (!activeId || !list.some((x) => x.mission.id === activeId)) {
      setActiveId(list[0].mission.id);
    }
  }, [open, phase, day, list.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = (mission: MissionDefinition) => (args: {
    chosenChoice: CommentChoice;
    commentText: string;
    timing: { elapsedMs: number; grade: string; humanityAdj: number; efficiencyAdj: number };
  }) => {
    const baseH = mission.humanityEffect(args.chosenChoice.id);
    const baseE = mission.efficiencyEffect(args.chosenChoice.id);
    const totalH = baseH + args.timing.humanityAdj;
    const totalE = baseE + args.timing.efficiencyAdj;

    completeMission(mission.id, totalH, totalE);
    showFeedback(args.chosenChoice.hint, totalH, totalE);
  };

  if (!open || phase !== "playing") return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center">
      <div className="h-[85vh] w-full max-w-[470px] overflow-hidden rounded-t-2xl bg-white shadow-2xl md:h-[80vh] md:max-w-4xl md:rounded-2xl">
        {/* DM 열었을 때도 보이는 게이지 스트립 */}
        <div
          className="flex items-center justify-center gap-4 border-b border-[var(--sns-divider)] bg-[var(--sns-header)] px-4 py-2 text-[11px] text-[var(--sns-text-secondary)]"
          role="status"
          aria-label="게임 상태: Day, 인간성, 에너지"
        >
          <span className="tabular-nums">
            <span className="font-semibold text-[var(--sns-primary)]">D</span>{" "}
            {day}/{maxDays}
          </span>
          <span className="tabular-nums">
            <span className="font-semibold text-[var(--sns-text)]">H</span>{" "}
            {humanity}
          </span>
          <span className="tabular-nums">
            <span className="font-semibold text-[var(--sns-text)]">E</span>{" "}
            {efficiency}
          </span>
        </div>
        {/* 상단 바 */}
        <div className="flex items-center justify-between border-b border-[var(--sns-divider)] px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--sns-text)]">메시지</p>
            <p className="text-[11px] text-[var(--sns-text-secondary)]">
              오늘 미션은 DM에서 처리합니다 (Day {day})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--sns-divider)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--sns-text-secondary)]"
          >
            닫기
          </button>
        </div>

        <div className="flex h-full min-h-0">
          {/* 좌측: 인박스 리스트 (md+), 모바일에선 상단 칩 */}
          <aside className="hidden w-80 border-r border-[var(--sns-divider)] md:flex md:flex-col">
            <div className="p-3">
              <div className="rounded-full border border-[var(--sns-divider)] bg-[var(--sns-bg)] px-4 py-2 text-sm text-[var(--sns-text-secondary)]">
                검색… (추후)
              </div>
              <p className="mt-2 text-[11px] text-[var(--sns-text-secondary)]">
                진행 조건: Day 2+는 <b>3개 중 2개</b> 답장해야 다음 날로 가능
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
              {list.map(({ mission, done }) => {
                const isActive = active?.id === mission.id;
                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => setActiveId(mission.id)}
                    className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                      isActive ? "bg-[var(--sns-bg)]" : "hover:bg-[var(--sns-bg)]/70"
                    }`}
                  >
                    <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-[var(--sns-primary)] to-purple-500">
                      {!done && (
                        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-bold text-[var(--sns-text)]">
                          {mission.post.authorName}
                        </p>
                        {done && (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            완료
                          </span>
                        )}
                      </div>
                      <p className="truncate text-[11px] text-[var(--sns-text-secondary)]">
                        @{mission.post.authorHandle}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[var(--sns-text-secondary)]">
                        {mission.post.content}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* 우측: 대화창 */}
          <section className="flex min-h-0 flex-1 flex-col">
            {/* 모바일용: 상단 칩 리스트 */}
            <div className="border-b border-[var(--sns-divider)] px-4 py-2 md:hidden">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {list.map(({ mission, done }) => (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => setActiveId(mission.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      active?.id === mission.id
                        ? "border-[var(--sns-primary)] bg-[var(--sns-primary)] text-white"
                        : "border-[var(--sns-divider)] bg-white text-[var(--sns-text-secondary)]"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white/80" />
                    <span className="max-w-[140px] truncate">
                      @{mission.post.authorHandle}
                    </span>
                    {done && <span className="opacity-90">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {active ? (
              <>
                <div className="flex items-center gap-3 border-b border-[var(--sns-divider)] px-4 py-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[var(--sns-primary)] to-purple-500" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[var(--sns-text)]">
                      {active.post.authorName}
                    </p>
                    <p className="truncate text-[11px] text-[var(--sns-text-secondary)]">
                      @{active.post.authorHandle}
                    </p>
                  </div>
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {/* 상대 메시지(미션) */}
                  <div className="flex">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[var(--sns-bg)] px-4 py-3 text-sm text-[var(--sns-text)]">
                      {active.post.content}
                    </div>
                  </div>

                  {/* 완료 여부 */}
                  {completedMissions.has(active.id) ? (
                    <div className="flex justify-center">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        답장 완료
                      </span>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-[var(--sns-divider)] bg-white p-2">
                      <MissionComposer
                        mission={active}
                        onSend={handleSend(active)}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center text-sm text-[var(--sns-text-secondary)]">
                오늘 받을 DM이 없습니다.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

