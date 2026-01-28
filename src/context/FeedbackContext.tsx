"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ChoiceHint = "danger_robot" | "danger_expose" | "safe";

export interface ChoiceFeedback {
  hint: ChoiceHint;
  humanityDelta: number;
  efficiencyDelta: number;
}

interface FeedbackContextValue {
  feedback: ChoiceFeedback | null;
  showFeedback: (hint: ChoiceHint, h: number, e: number) => void;
  clearFeedback: () => void;
  /** 정체 노출 선택 시 스펙타클 플래시용 */
  exposeFlash: boolean;
  clearExposeFlash: () => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [feedback, setFeedback] = useState<ChoiceFeedback | null>(null);
  const [exposeFlash, setExposeFlash] = useState(false);

  const showFeedback = useCallback(
    (hint: ChoiceHint, humanityDelta: number, efficiencyDelta: number) => {
      setFeedback({ hint, humanityDelta, efficiencyDelta });
      if (hint === "danger_expose") setExposeFlash(true);
    },
    []
  );

  const clearFeedback = useCallback(() => setFeedback(null), []);
  const clearExposeFlash = useCallback(() => setExposeFlash(false), []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        showFeedback,
        clearFeedback,
        exposeFlash,
        clearExposeFlash,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedback must be used within FeedbackProvider");
  return ctx;
}
