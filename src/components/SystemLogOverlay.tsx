"use client";

import { useEffect, useState } from "react";

const LOG_LINES = [
  "[SYSTEM] sentiment_analysis.run()",
  "[CACHE] response_latency: 0.023s",
  "[LLM] token_stream > human_like_boost=0.72",
  "[AUTH] session_valid? true",
  "[FEED] algo_score += engagement_weight",
  "[FILTER] content_safety.check()",
  "[API] rate_limit: 98/100",
  "[MEMORY] context_window: 4096",
  "[PING] heartbeat_ok",
  "[QUEUE] inference_queue.depth=3",
  ">>> empathy_simulator.active",
  "[LOG] user_123 engaged",
  "[MODEL] temperature=0.7",
  "[PROC] natural_language.encode()",
];

function useSystemLog(intervalMs: number) {
  const [line, setLine] = useState(LOG_LINES[0]);

  useEffect(() => {
    let index = 0;
    const id = setInterval(() => {
      index = (index + 1) % LOG_LINES.length;
      setLine(LOG_LINES[index]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return line;
}

function useClientTime(intervalMs: number) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      setTime(
        new Date().toLocaleTimeString("ko-KR", { hour12: false })
      );
    format();
    const id = setInterval(format, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return time;
}

/** 하단 우측에만 살짝 보이는 시스템 로그. "시스템 내부 존재" 느낌용 */
export function SystemLogOverlay() {
  const logLine = useSystemLog(180);
  const clientTime = useClientTime(1000);

  return (
    <div
      className="pointer-events-none fixed bottom-2 right-3 z-10 max-w-[200px] truncate rounded border border-stone-300/40 bg-white/70 px-2 py-1 font-mono text-[9px] text-stone-500/80 shadow-sm"
      aria-hidden
    >
      [{clientTime ?? "--:--:--"}] {logLine}
    </div>
  );
}
