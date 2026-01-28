"use client";

import {
  ChoiceFeedbackToast,
  DangerExposeFlash,
  DayTransitionOverlay,
  Feed,
  GameStatsBar,
  HumanityWarningOverlay,
  NextDayButton,
  ResultScreen,
  SystemLogOverlay,
} from "@/components";
import { useGame } from "@/context/GameContext";
import { BottomNav, TopBar } from "@/components/sns";

export default function Home() {
  const { phase } = useGame();
  const showStats = phase === "playing";
  const contentPt = showStats
    ? "calc(var(--sns-top-bar-height) + var(--sns-stats-bar-height))"
    : "var(--sns-top-bar-height)";

  return (
    <main className="relative min-h-screen bg-[var(--sns-bg)]">
      <TopBar />
      <GameStatsBar />
      <div
        className="mx-auto min-h-screen max-w-[470px] pb-[var(--sns-bottom-nav-height)] transition-[padding-top] duration-200"
        style={{ paddingTop: contentPt }}
      >
        <Feed />
      </div>
      <BottomNav />
      <NextDayButton />
      <ResultScreen />
      <ChoiceFeedbackToast />
      <DayTransitionOverlay />
      <DangerExposeFlash />
      <HumanityWarningOverlay />
      <SystemLogOverlay />
    </main>
  );
}
