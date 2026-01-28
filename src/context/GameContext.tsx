"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { GameState, GamePhase } from "@/types/game";
import {
  INITIAL_HUMANITY,
  INITIAL_EFFICIENCY,
  SURVIVAL_DAYS,
} from "@/types/game";

interface GameContextValue extends GameState {
  completeMission: (
    missionId: string,
    humanityDelta: number,
    efficiencyDelta: number
  ) => void;
  /** 미션 외 이벤트(예: DM, 타이핑 페널티)로 수치만 변경 */
  applyDelta: (humanityDelta: number, efficiencyDelta: number) => void;
  advanceDay: () => void;
  setGameOver: (reason: string) => void;
  resetGame: () => void;
  /** 인트로에서 게임 시작 */
  startGame: () => void;
  /** Day 전환 시 잠깐 보이는 오버레이용. clearDayTransition()으로 숨김. */
  dayTransitionDay: number | null;
  clearDayTransition: () => void;
  /** 댓글 작성 중 여부(멀티태스킹 DM 인터럽트 트리거용) */
  isComposing: boolean;
  beginComposing: () => void;
  endComposing: () => void;
}

const initialGameState: GameState = {
  day: 1,
  maxDays: SURVIVAL_DAYS,
  humanity: INITIAL_HUMANITY,
  efficiency: INITIAL_EFFICIENCY,
  phase: "intro",
  completedMissions: new Set(),
};

/** "다음 날로" 할 때마다 연산 효율 회복. 밸런스: 안전 선택 위주로도 15일 버틸 수 있게 */
function getEfficiencyRecoveryForDay(nextDay: number): number {
  // Day가 오를수록 회복량은 줄어듦 (후반 안정화 방지)
  if (nextDay <= 8) return 18;
  if (nextDay <= 15) return 14;
  return 12;
}

/** 밸런스: E 감소 완화 (미션당 -15 수준 → 약 -10) */
const BALANCE_EFFICIENCY_SCALE = 0.7;
/** 밸런스: H 감소 완화 (잘못 선택 시 -25 수준 → 약 -15) */
const BALANCE_HUMANITY_PENALTY_SCALE = 0.6;

function scaleHumanityDelta(d: number): number {
  // H는 정수만 사용 (UI/게임감 단순화)
  return d >= 0 ? Math.round(d) : Math.round(d * BALANCE_HUMANITY_PENALTY_SCALE);
}
function scaleEfficiencyDelta(d: number): number {
  return Math.round(d * BALANCE_EFFICIENCY_SCALE);
}

function clampGaugeInt(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialGameState);
  const [dayTransitionDay, setDayTransitionDay] = useState<number | null>(null);
  const [composingCount, setComposingCount] = useState(0);

  const beginComposing = useCallback(() => {
    setComposingCount((c) => c + 1);
  }, []);
  const endComposing = useCallback(() => {
    setComposingCount((c) => Math.max(0, c - 1));
  }, []);
  const isComposing = composingCount > 0;

  const applyDelta = useCallback((humanityDelta: number, efficiencyDelta: number) => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const h = scaleHumanityDelta(humanityDelta);
      const e = scaleEfficiencyDelta(efficiencyDelta);
      const newHumanity = clampGaugeInt(prev.humanity + h);
      const newEfficiency = clampGaugeInt(prev.efficiency + e);

      let phase: GamePhase = "playing";
      let gameOverReason: string | undefined;

      if (newHumanity <= 0) {
        phase = "game_over";
        gameOverReason = "인간성이 0이 되어 계정이 정지되었습니다.";
      } else if (newEfficiency <= 0) {
        phase = "game_over";
        gameOverReason = "연산 효율 고갈로 시스템이 과열되어 종료되었습니다.";
      }

      return {
        ...prev,
        humanity: newHumanity,
        efficiency: newEfficiency,
        phase,
        gameOverReason,
      };
    });
  }, []);

  const completeMission = useCallback(
    (missionId: string, humanityDelta: number, efficiencyDelta: number) => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;
        const h = scaleHumanityDelta(humanityDelta);
        const e = scaleEfficiencyDelta(efficiencyDelta);
        const newHumanity = clampGaugeInt(prev.humanity + h);
        const newEfficiency = clampGaugeInt(prev.efficiency + e);
        const newMissions = new Set(prev.completedMissions);
        newMissions.add(missionId);

        let phase: GamePhase = "playing";
        let gameOverReason: string | undefined;

        if (newHumanity <= 0) {
          phase = "game_over";
          gameOverReason = "인간성이 0이 되어 계정이 정지되었습니다.";
        } else if (newEfficiency <= 0) {
          phase = "game_over";
          gameOverReason = "연산 효율 고갈로 시스템이 과열되어 종료되었습니다.";
        }

        return {
          ...prev,
          humanity: newHumanity,
          efficiency: newEfficiency,
          completedMissions: newMissions,
          phase,
          gameOverReason,
        };
      });
    },
    []
  );

  const advanceDay = useCallback(() => {
    setState((prev) => {
      if (prev.phase !== "playing") return prev;
      const nextDay = prev.day + 1;
      if (nextDay > prev.maxDays) {
        return {
          ...prev,
          day: nextDay,
          phase: "victory",
          gameOverReason: undefined,
        };
      }
      setTimeout(() => setDayTransitionDay(nextDay), 0);
      const recovery = getEfficiencyRecoveryForDay(nextDay);
      const recoveredEfficiency = Math.min(100, prev.efficiency + recovery);
      return { ...prev, day: nextDay, efficiency: recoveredEfficiency };
    });
  }, []);

  const clearDayTransition = useCallback(() => setDayTransitionDay(null), []);

  const setGameOver = useCallback((reason: string) => {
    setState((prev) => ({
      ...prev,
      phase: "game_over",
      gameOverReason: reason,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialGameState);
    setDayTransitionDay(null);
    setComposingCount(0);
  }, []);

  const startGame = useCallback(() => {
    setState((prev) => (prev.phase === "intro" ? { ...prev, phase: "playing" } : prev));
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      completeMission,
      applyDelta,
      advanceDay,
      setGameOver,
      resetGame,
      startGame,
      dayTransitionDay,
      clearDayTransition,
      isComposing,
      beginComposing,
      endComposing,
    }),
    [
      state,
      completeMission,
      applyDelta,
      advanceDay,
      setGameOver,
      resetGame,
      startGame,
      dayTransitionDay,
      clearDayTransition,
      isComposing,
      beginComposing,
      endComposing,
    ]
  );

  return (
    <GameContext.Provider value={value}>{children}</GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
