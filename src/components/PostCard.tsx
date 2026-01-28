"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { useFeedback } from "@/context/FeedbackContext";
import type { CommentChoice, FeedPost, MissionDefinition } from "@/types/game";
import { MissionComposer } from "./MissionComposer";
import { IconMore } from "./sns/TopBar";

interface PostCardProps {
  post: FeedPost;
  mission?: MissionDefinition;
  showChoices?: boolean;
}

function IconLike() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-1.35 0-2.66-.27-3.84-.75L2 22l1.25-6.16C1.77 14.66 2 13.35 2 12c0-5.523 4.477-10 10-10zm0 2a8 8 0 0 0-8 8c0 1.2.27 2.34.75 3.4l.35.76-.9 4.35 4.35-.9.76.35A7.96 7.96 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M12 2.59l6 6v8.41h-4v-6h-4v6H6v-8.41l6-6zm0 2.82l-4 4V19h2v-5h4v5h2v-9.59l-4-4z" />
    </svg>
  );
}

function IconBookmark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.757.429L12 18.03l-7.243 4.542A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z" />
    </svg>
  );
}

export function PostCard({ post, mission, showChoices }: PostCardProps) {
  const [playerComment, setPlayerComment] = useState<string | null>(null);
  const { completeMission, completedMissions } = useGame();
  const { showFeedback } = useFeedback();
  const completed = mission && completedMissions.has(mission.id);

  const handleSend = (args: {
    chosenChoice: CommentChoice;
    commentText: string;
    timing: { elapsedMs: number; grade: string; humanityAdj: number; efficiencyAdj: number };
  }) => {
    if (!mission) return;
    const baseH = mission.humanityEffect(args.chosenChoice.id);
    const baseE = mission.efficiencyEffect(args.chosenChoice.id);
    const totalH = baseH + args.timing.humanityAdj;
    const totalE = baseE + args.timing.efficiencyAdj;

    setPlayerComment(args.commentText);
    completeMission(mission.id, totalH, totalE);
    showFeedback(args.chosenChoice.hint, totalH, totalE);
  };

  const avatarBg =
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

  return (
    <article className="overflow-hidden rounded-lg bg-[var(--sns-card)] sns-card-shadow">
      {/* 포스트 헤더 - 인스타/페이스북: [아바타] [이름] · [시간] [⋯] */}
      <header className="flex h-14 items-center gap-3 px-4">
        <div
          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--sns-divider)]"
          style={{ background: avatarBg }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-semibold text-[var(--sns-text)]">
              {post.authorName}
            </span>
            {post.isMission && (
              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
                미션
              </span>
            )}
            <span className="text-[var(--sns-text-secondary)]">·</span>
            <span className="truncate text-sm text-[var(--sns-text-secondary)]">
              {post.timestamp}
            </span>
          </div>
          <span className="block truncate text-xs text-[var(--sns-text-secondary)]">
            @{post.authorHandle}
          </span>
        </div>
        <button
          type="button"
          className="rounded-full p-2 text-[var(--sns-text-secondary)] hover:bg-[var(--sns-bg)]"
          aria-label="더 보기"
        >
          <IconMore />
        </button>
      </header>

      {/* 본문 - 인스타그램 스타일 */}
      <div className="px-4 pb-3">
        <p className="whitespace-pre-wrap text-[15px] leading-snug text-[var(--sns-text)]">
          {post.content}
        </p>
      </div>

      {/* 액션 바 - 좋아요, 댓글, 공유, 북마크 */}
      <div className="flex items-center justify-between border-t border-[var(--sns-divider)] px-4 py-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-1.5 text-[var(--sns-text-secondary)] hover:bg-[var(--sns-bg)] hover:text-[var(--sns-like)]"
            aria-label="좋아요"
          >
            <IconLike />
          </button>
          <button
            type="button"
            className="rounded-full p-1.5 text-[var(--sns-text-secondary)] hover:bg-[var(--sns-bg)]"
            aria-label="댓글"
          >
            <IconComment />
          </button>
          <button
            type="button"
            className="rounded-full p-1.5 text-[var(--sns-text-secondary)] hover:bg-[var(--sns-bg)]"
            aria-label="공유"
          >
            <IconShare />
          </button>
        </div>
        <button
          type="button"
          className="rounded-full p-1.5 text-[var(--sns-text-secondary)] hover:bg-[var(--sns-bg)]"
          aria-label="저장"
        >
          <IconBookmark />
        </button>
      </div>

      {/* 좋아요 수 - "좋아요 N개" */}
      {post.likes > 0 && (
        <div className="border-t border-[var(--sns-divider)] px-4 py-1">
          <button
            type="button"
            className="text-sm font-semibold text-[var(--sns-text)] hover:underline"
          >
            좋아요 {post.likes}개
          </button>
        </div>
      )}

      {/* 댓글 영역 - 인스타/페이스북 스타일 */}
      <section className="border-t border-[var(--sns-divider)] px-4 py-3">
        {post.comments.length > 0 && (
          <button
            type="button"
            className="mb-2 text-sm text-[var(--sns-text-secondary)] hover:underline"
          >
            댓글 {post.comments.length}개 모두 보기
          </button>
        )}
        {post.comments.map((c) => (
          <div key={c.id} className="mb-2 flex gap-2">
            <div
              className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full ring-1 ring-[var(--sns-divider)]"
              style={{ background: avatarBg }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-[var(--sns-text)]">
                  {c.authorName}
                  {c.isPlayer && " (나)"}
                </span>{" "}
                <span className="text-[var(--sns-text)]">{c.content}</span>
              </p>
              <span className="text-xs text-[var(--sns-text-secondary)]">
                {c.timestamp}
              </span>
            </div>
          </div>
        ))}
        {playerComment && (
          <div className="mb-2 flex gap-2">
            <div
              className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full ring-1 ring-[var(--sns-primary)]"
              style={{ background: "var(--sns-primary)" }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-[var(--sns-primary)]">
                  나
                </span>{" "}
                <span className="text-[var(--sns-text)]">{playerComment}</span>
              </p>
              <span className="text-xs text-[var(--sns-text-secondary)]">
                방금 전
              </span>
            </div>
          </div>
        )}

        {/* 댓글 입력 / 선택지 - "댓글 달기..." 플레이스홀더 아래에 선택지 */}
        {showChoices && mission ? (
          <div className="mt-2 rounded-lg bg-[var(--sns-bg)] p-2">
            <MissionComposer mission={mission} onSend={handleSend} />
          </div>
        ) : (
          !playerComment && (
            <div className="mt-2 flex items-center gap-2 border-t border-[var(--sns-divider)] pt-3">
              <div
                className="h-8 w-8 flex-shrink-0 rounded-full ring-1 ring-[var(--sns-divider)]"
                style={{ background: "var(--sns-primary)" }}
              />
              <span className="text-sm text-[var(--sns-text-secondary)]">
                댓글 달기...
              </span>
            </div>
          )
        )}
      </section>
    </article>
  );
}
