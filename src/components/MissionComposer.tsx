"use client";

import { useGame } from "@/context/GameContext";
import type { CommentChoice, MissionDefinition } from "@/types/game";
import { useEffect, useMemo, useRef, useState } from "react";

type TimingGrade = "too_fast" | "ok" | "too_slow";

const TIMING = {
  tooFastMs: 800,
  tooSlowMs: 8000,
  /** 너무 빨리 보내면 인간성 하락 */
  fastHumanityPenalty: -8,
  fastEfficiencyPenalty: -2,
  /** 너무 늦게 보내면 흐름 끊김(무시) */
  slowHumanityPenalty: -6,
  slowEfficiencyPenalty: -6,
};

function msToSec(ms: number) {
  return (ms / 1000).toFixed(1);
}

function findBannedHit(text: string, bannedWords?: string[]) {
  if (!bannedWords || bannedWords.length === 0) return null;
  const lowered = text.toLowerCase();
  for (const w of bannedWords) {
    if (!w) continue;
    if (lowered.includes(w.toLowerCase())) return w;
  }
  return null;
}

export function MissionComposer({
  mission,
  onSend,
}: {
  mission: MissionDefinition;
  onSend: (args: {
    chosenChoice: CommentChoice;
    commentText: string;
    timing: {
      elapsedMs: number;
      grade: TimingGrade;
      humanityAdj: number;
      efficiencyAdj: number;
    };
  }) => void;
}) {
  const { beginComposing, endComposing } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<CommentChoice | null>(
    null
  );
  const [text, setText] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    beginComposing();
    return () => endComposing();
  }, [beginComposing, endComposing]);

  useEffect(() => {
    if (!startedAt) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [startedAt]);

  const elapsedMs = startedAt ? Math.max(0, now - startedAt) : 0;

  const bannedHit = useMemo(
    () => findBannedHit(text, mission.bannedWords),
    [text, mission.bannedWords]
  );

  const timing = useMemo(() => {
    let grade: TimingGrade = "ok";
    let humanityAdj = 0;
    let efficiencyAdj = 0;
    if (startedAt) {
      if (elapsedMs < TIMING.tooFastMs) {
        grade = "too_fast";
        humanityAdj = TIMING.fastHumanityPenalty;
        efficiencyAdj = TIMING.fastEfficiencyPenalty;
      } else if (elapsedMs > TIMING.tooSlowMs) {
        grade = "too_slow";
        humanityAdj = TIMING.slowHumanityPenalty;
        efficiencyAdj = TIMING.slowEfficiencyPenalty;
      }
    } else {
      // 시작조차 안 하고 즉시 보내려는 시도는 매우 의심스러움
      grade = "too_fast";
      humanityAdj = TIMING.fastHumanityPenalty;
      efficiencyAdj = TIMING.fastEfficiencyPenalty;
    }
    return { elapsedMs, grade, humanityAdj, efficiencyAdj };
  }, [elapsedMs, startedAt]);

  const timingLabel =
    timing.grade === "ok"
      ? "타이핑 적당"
      : timing.grade === "too_fast"
        ? "너무 빠름"
        : "너무 느림";
  const timingColor =
    timing.grade === "ok"
      ? "text-emerald-600"
      : timing.grade === "too_fast"
        ? "text-amber-600"
        : "text-red-600";

  const canSend = !!selectedChoice && text.trim().length > 0 && !bannedHit;

  const pickChoice = (c: CommentChoice) => {
    setSelectedChoice(c);
    setText(c.text);
    if (!startedAt) setStartedAt(Date.now());
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const onChange = (v: string) => {
    if (!startedAt) setStartedAt(Date.now());
    setText(v);
  };

  const handleSend = () => {
    if (!selectedChoice) return;
    const commentText = text.trim();
    if (!commentText) return;
    if (bannedHit) return;
    onSend({ chosenChoice: selectedChoice, commentText, timing });
  };

  return (
    <div className="mt-2 rounded-xl bg-[var(--sns-bg)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium text-[var(--sns-text-secondary)]">
          댓글 작성 (선택지 클릭 → 수정 가능)
        </p>
        <div
          className={`text-[11px] font-semibold tabular-nums ${timingColor}`}
        >
          {startedAt
            ? `${timingLabel} · ${msToSec(elapsedMs)}s`
            : "타이핑 시작 전"}
        </div>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        {mission.choices.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => pickChoice(c)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              selectedChoice?.id === c.id
                ? "border-[var(--sns-primary)] bg-white text-[var(--sns-primary)]"
                : "border-[var(--sns-divider)] bg-white text-[var(--sns-text)] hover:bg-[var(--sns-bg)]"
            }`}
            title={c.description}
          >
            {c.hint === "safe" ? "🙂" : c.hint === "danger_robot" ? "🤖" : "⚠"}{" "}
            {c.text.length > 14 ? `${c.text.slice(0, 14)}…` : c.text}
          </button>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-lg border border-[var(--sns-divider)] bg-white px-3 py-2 text-sm text-[var(--sns-text)] outline-none focus:border-[var(--sns-primary)]"
        placeholder="댓글을 입력하세요…"
      />

      {mission.bannedWords && mission.bannedWords.length > 0 && (
        <p className="mt-2 text-xs text-[var(--sns-text-secondary)]">
          금지어 필터:{" "}
          <span className="font-semibold text-red-600">
            {mission.bannedWords.join(", ")}
          </span>
        </p>
      )}
      {bannedHit && (
        <p className="mt-1 text-xs font-semibold text-red-600">
          시스템 필터: 금지어 “{bannedHit}” 감지됨 (우회 표현으로 바꿔야 전송
          가능)
        </p>
      )}

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          className="rounded-full bg-[var(--sns-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          전송
        </button>
      </div>
    </div>
  );
}
