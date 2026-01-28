import type { Metadata } from "next";
import { FeedbackProvider } from "@/context/FeedbackContext";
import { GameProvider } from "@/context/GameContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Turing Test - Pretending to Be Human",
  description: "AI 튜링 테스트: 인간인 척하기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[var(--sns-bg)] text-[var(--sns-text)]">
        <GameProvider>
          <FeedbackProvider>{children}</FeedbackProvider>
        </GameProvider>
      </body>
    </html>
  );
}
