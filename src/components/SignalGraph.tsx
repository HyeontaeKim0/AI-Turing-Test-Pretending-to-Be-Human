"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type Mode = "heartbeat" | "cpu";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function buildHeartbeatPath(w: number, h: number, intensity01: number) {
  const mid = h * 0.6;
  const amp = (h * 0.35) * (0.4 + 0.9 * intensity01);
  // 반복되는 심박 파형(간단)
  const step = w / 10;
  const pts = [
    [0, mid],
    [step * 2, mid],
    [step * 3, mid - amp * 0.2],
    [step * 3.2, mid + amp * 0.9],
    [step * 3.6, mid - amp],
    [step * 4.2, mid + amp * 0.35],
    [step * 5, mid],
    [w, mid],
  ];
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`;
}

function buildCpuPath(w: number, h: number, load01: number) {
  const base = h * 0.65;
  const amp = (h * 0.35) * (0.2 + 1.1 * load01);
  const segs = 10;
  const step = w / segs;
  // 계단형/요동치는 CPU 그래프 느낌
  const pts: Array<[number, number]> = [[0, base]];
  for (let i = 1; i <= segs; i++) {
    const t = i / segs;
    const y =
      base -
      amp * (0.2 + 0.8 * Math.abs(Math.sin(t * Math.PI * (2 + 6 * load01))));
    pts.push([i * step, y]);
  }
  return `M ${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ")}`;
}

export function SignalGraph({
  mode,
  value,
  width = 64,
  height = 16,
}: {
  mode: Mode;
  value: number;
  width?: number;
  height?: number;
}) {
  const v = clamp(value, 0, 100);

  const { d, color, speed } = useMemo(() => {
    if (mode === "heartbeat") {
      // 인간성 낮을수록 심박이 요동
      const intensity01 = clamp((60 - v) / 60, 0, 1);
      return {
        d: buildHeartbeatPath(width, height, intensity01),
        color: v > 50 ? "#f59e0b" : v > 25 ? "#f97316" : "#ef4444",
        speed: 1.6 - intensity01 * 0.8, // 낮을수록 빠르게
      };
    }
    // cpu: 효율 낮을수록(=부하 높을수록) 요동
    const load01 = clamp((100 - v) / 100, 0, 1);
    return {
      d: buildCpuPath(width, height, load01),
      color: "#06b6d4",
      speed: 1.8 - load01 * 0.8,
    };
  }, [mode, v, width, height]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden
    >
      {/* 얇은 그리드 느낌 */}
      <path
        d={`M 0 ${height * 0.6} L ${width} ${height * 0.6}`}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        // 파형을 '흐르게' 보이게 살짝 점멸/밝기 변동
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: speed, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

