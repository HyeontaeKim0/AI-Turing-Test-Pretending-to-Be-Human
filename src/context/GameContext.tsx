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
  advanceDay: () => void;
  setGameOver: (reason: string) => void;
  resetGame: () => void;
  /** Day 전환 시 잠깐 보이는 오버레이용. clearDayTransition()으로 숨김. */
  dayTransitionDay: number | null;
  clearDayTransition: () => void;
}

const initialGameState: GameState = {
  day: 1,
  maxDays: SURVIVAL_DAYS,
  humanity: INITIAL_HUMANITY,
  efficiency: INITIAL_EFFICIENCY,
  phase: "playing",
  completedMissions: new Set(),
};

/** "다음 날로" 할 때마다 연산 효율 회복. 후반으로 갈수록 회복량 감소 (쉽게 버티지 못하게) */
function getEfficiencyRecoveryForDay(nextDay: number): number {
  if (nextDay <= 14) return 15;
  if (nextDay <= 24) return 12;
  return 10;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialGameState);
  const [dayTransitionDay, setDayTransitionDay] = useState<number | null>(null);

  const completeMission = useCallback(
    (missionId: string, humanityDelta: number, efficiencyDelta: number) => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;
        const newHumanity = Math.max(0, Math.min(100, prev.humanity + humanityDelta));
        const newEfficiency = Math.max(0, Math.min(100, prev.efficiency + efficiencyDelta));
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
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      ...state,
      completeMission,
      advanceDay,
      setGameOver,
      resetGame,
      dayTransitionDay,
      clearDayTransition,
    }),
    [
      state,
      completeMission,
      advanceDay,
      setGameOver,
      resetGame,
      dayTransitionDay,
      clearDayTransition,
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
