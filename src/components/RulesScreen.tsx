"use client";

import { useGame } from "@/context/GameContext";

const RULES = [
  {
    title: "목표",
    text: "30일 동안 SNS에서 인간인 척하며 살아남으세요.",
  },
  {
    title: "미션",
    text: "매일 DM으로 오는 메시지에 답장하세요. 인간처럼 답하면 인간성(H)을 유지하고, 너무 냉정하거나 로봇 같으면 감소합니다.",
  },
  {
    title: "에너지",
    text: "연산 효율(E)도 관리해야 합니다. 답장 속도와 선택에 따라 변합니다.",
  },
  {
    title: "게임 오버",
    text: "인간성 0 → 계정 정지. 에너지 0 → 시스템 과열로 종료.",
  },
  {
    title: "다음 날",
    text: "Day 2부터는 오늘 미션 3개 중 2개를 완료하면 다음 날로 넘어갈 수 있습니다.",
  },
];

export function RulesScreen() {
  const { phase, startGame } = useGame();

  if (phase !== "intro") return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[var(--sns-bg)] p-4">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[var(--sns-divider)] bg-white p-6 shadow-xl md:p-8">
        <h1 className="text-center text-xl font-bold text-[var(--sns-text)]">
          AI 튜링 테스트
        </h1>
        <p className="mt-1 text-center text-sm text-[var(--sns-text-secondary)]">
          인간인 척하기
        </p>

        <ul className="mt-6 space-y-4">
          {RULES.map(({ title, text }) => (
            <li key={title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sns-primary)]">
                {title}
              </p>
              <p className="mt-1 text-sm text-[var(--sns-text)]">{text}</p>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={startGame}
          className="mt-8 w-full rounded-xl bg-[var(--sns-primary)] py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--sns-primary-hover)]"
        >
          게임 시작
        </button>
      </div>
    </div>
  );
}
