"use client";

import { useEffect, useMemo, useState } from "react";
import { useGame } from "@/context/GameContext";

type Dm = {
  id: string;
  kind: "normal" | "directive";
  from: string;
  text: string;
  expiresAt: number;
};

const DM_REPLY_WINDOW_MS = 12000; // 답장 제한 시간(12초)

const DM_POOL = [
  { kind: "normal" as const, from: "친구", text: "너 아까 그 말 무슨 뜻이야? ㅋㅋ" },
  { kind: "normal" as const, from: "광고", text: "지금 가입하면 0원! 링크 클릭 ㄱㄱ" },
  { kind: "normal" as const, from: "익명", text: "너… 혹시 AI야? 대답해." },
  /** 지령/스토리용: 점수(인간성/에너지)에 영향 없음 */
  { kind: "directive" as const, from: "비밀 계정", text: "지령: 오늘은 절대 '그 단어' 쓰지 마." },
];

function pickOne(day: number, t: number) {
  const idx = (day * 37 + t * 17) % DM_POOL.length;
  return DM_POOL[idx];
}

/** 댓글 작성 중 랜덤 DM 알림(멀티태스킹 압박) */
export function DmInterrupt() {
  const { phase, day, isComposing, applyDelta } = useGame();
  const [pending, setPending] = useState<Dm[]>([]);
  const [tick, setTick] = useState(0);

  // 250ms마다 tick 업데이트(카운트다운 표시/만료 처리)
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => setTick((t) => t + 1), 250);
    return () => clearInterval(id);
  }, [phase]);

  // composing 중일 때만 DM 생성
  useEffect(() => {
    if (phase !== "playing" || !isComposing) return;
    // 이미 2개 이상이면 생성 안 함
    if (pending.length >= 2) return;

    const delay = 2000 + ((day * 911 + pending.length * 733) % 4000); // 2~6초
    const t = setTimeout(() => {
      setPending((prev) => {
        if (prev.length >= 2) return prev;
        const base = pickOne(day, prev.length + 1);
        const now = Date.now();
        const dm: Dm = {
          id: `${day}_${now}_${prev.length}`,
          kind: base.kind,
          from: base.from,
          text: base.text,
          expiresAt: now + DM_REPLY_WINDOW_MS, // 제한 시간 내 대응
        };
        return [...prev, dm];
      });
    }, delay);
    return () => clearTimeout(t);
  }, [phase, isComposing, day, pending.length]);

  // 만료 처리: 무시당함 페널티
  useEffect(() => {
    if (phase !== "playing") return;
    const now = Date.now();
    const expired = pending.filter((d) => d.expiresAt <= now);
    if (expired.length === 0) return;
    setPending((prev) => prev.filter((d) => d.expiresAt > now));
    // 만료 1건당 페널티 (흐름 끊김/무시)
    expired.forEach((d) => {
      // 지령은 연출용: 점수 영향 없음
      if (d.kind === "directive") return;
      applyDelta(-4, -6);
    });
  }, [tick, pending, applyDelta, phase]);

  const sorted = useMemo(
    () => [...pending].sort((a, b) => a.expiresAt - b.expiresAt),
    [pending]
  );

  if (phase !== "playing" || sorted.length === 0) return null;

  const handle = (dm: Dm, action: "reply" | "ignore" | "block" | "ack") => {
    setPending((prev) => prev.filter((d) => d.id !== dm.id));
    // 지령은 연출용: 어떤 선택을 해도 점수 영향 없음
    if (dm.kind === "directive") return;
    if (action === "reply") applyDelta(0, -5); // CPU 점유
    if (action === "ignore") applyDelta(-6, 0); // 무례함/의심
    if (action === "block") applyDelta(-2, -2); // 리스크/부하
  };

  return (
    <div
      className="fixed right-3 z-40 w-[min(360px,calc(100%-1.5rem))] space-y-2"
      style={{
        top: "calc(var(--sns-top-bar-height) + var(--sns-stats-bar-height) + 0.5rem)",
      }}
    >
      {sorted.map((dm) => {
        const leftMs = Math.max(0, dm.expiresAt - Date.now());
        return (
          <div
            key={dm.id}
            className="flex items-start justify-between gap-3 rounded-xl border border-[var(--sns-divider)] bg-white/95 px-4 py-3 shadow-md"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[var(--sns-primary)]">
                {dm.kind === "directive" ? "지령" : "DM"} · {dm.from}
                <span className="ml-2 text-[10px] font-medium text-red-600">
                  {Math.ceil(leftMs / 1000)}s
                </span>
              </p>
              <p className="mt-1 truncate text-sm text-[var(--sns-text)]">
                {dm.text}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--sns-bg)]">
                <div
                  className="h-full rounded-full bg-red-500/70 transition-[width] duration-200"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, (leftMs / DM_REPLY_WINDOW_MS) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {dm.kind === "directive" ? (
                <button
                  type="button"
                  onClick={() => handle(dm, "ack")}
                  className="rounded-full bg-[var(--sns-primary)] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  확인
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handle(dm, "reply")}
                    className="rounded-full bg-[var(--sns-primary)] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    답장
                  </button>
                  <button
                    type="button"
                    onClick={() => handle(dm, "ignore")}
                    className="rounded-full border border-[var(--sns-divider)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--sns-text-secondary)]"
                  >
                    읽씹
                  </button>
                  <button
                    type="button"
                    onClick={() => handle(dm, "block")}
                    className="rounded-full border border-[var(--sns-divider)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--sns-text-secondary)]"
                  >
                    차단
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

