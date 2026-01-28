"use client";

import {
  ChoiceFeedbackToast,
  DangerExposeFlash,
  DayTransitionOverlay,
  DmInboxView,
  GameStatsBar,
  HumanityWarningOverlay,
  NextDayButton,
  ResultScreen,
  ScreenGlitchShake,
  SystemLogOverlay,
} from "@/components";
import { useGame } from "@/context/GameContext";
import { TopBar } from "@/components/sns";

export default function Home() {
  const { phase } = useGame();
  const showStats = phase === "playing";
  const contentPt = showStats
    ? "calc(var(--sns-top-bar-height) + var(--sns-stats-bar-height))"
    : "var(--sns-top-bar-height)";

  return (
    <ScreenGlitchShake>
      <main className="relative h-screen overflow-hidden bg-[var(--sns-bg)]">
        <TopBar />
        <GameStatsBar />
        {/* 메인 = DM 인박스 (상·하단바 사이만 스크롤) */}
        <div
          className="mx-auto max-w-[470px] overflow-hidden transition-[top] duration-200 md:max-w-4xl"
          style={{
            position: "fixed",
            top: contentPt,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <DmInboxView />
        </div>
        <NextDayButton />
        <ResultScreen />
        <ChoiceFeedbackToast />
        <DayTransitionOverlay />
        <DangerExposeFlash />
        <HumanityWarningOverlay />
        <SystemLogOverlay />
      </main>
    </ScreenGlitchShake>
  );
}
