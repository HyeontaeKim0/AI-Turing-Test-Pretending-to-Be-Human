"use client";

import { useGame } from "@/context/GameContext";
import { getRandomMissions } from "@/data/missions";
import { tutorialLunchMission } from "@/data/tutorialMission";
import type { FeedPost, MissionDefinition } from "@/types/game";
import { PostCard } from "./PostCard";

/** 피드에 섞어 넣을 일반 NPC 글 */
const dummyPosts: FeedPost[] = [
  {
    id: "dummy_1",
    authorId: "npc_1",
    authorName: "날씨좋음",
    authorHandle: "sunny_day",
    content: "오늘 날씨 진짜 좋다 👍",
    timestamp: "1시간 전",
    likes: 12,
    isMission: false,
    comments: [],
  },
  {
    id: "dummy_2",
    authorId: "npc_2",
    authorName: "취향저격",
    authorHandle: "taste_hunter",
    content: "이번 주 뭐 보지? 넷플릭스 추천좀",
    timestamp: "2시간 전",
    likes: 8,
    isMission: false,
    comments: [],
  },
  {
    id: "dummy_3",
    authorId: "npc_3",
    authorName: "일상러버",
    authorHandle: "daily_lover",
    content: "오늘도 힘내서 살아보자 💪",
    timestamp: "3시간 전",
    likes: 15,
    isMission: false,
    comments: [],
  },
];

function missionToFeedPost(m: MissionDefinition): FeedPost {
  return {
    id: `mission_${m.id}`,
    ...m.post,
    comments: m.post.comments.map((c, i) => ({ ...c, id: `comment_${m.id}_${i}` })),
    isMission: true,
    missionId: m.id,
  } as FeedPost;
}

/** 오늘 노출할 미션 목록 (Day1=튜토리얼만, Day2+=랜덤 3개) */
function getMissionsForDay(day: number): MissionDefinition[] {
  if (day === 1) return [tutorialLunchMission];
  return getRandomMissions(day, 3);
}

export function Feed() {
  const { day, completedMissions, phase } = useGame();
  const todayMissions = getMissionsForDay(day);
  const uncompletedMissions = todayMissions.filter((m) => !completedMissions.has(m.id));
  const missionPosts = uncompletedMissions.map(missionToFeedPost);

  const posts: FeedPost[] = [
    dummyPosts[0],
    ...missionPosts,
    dummyPosts[1],
    dummyPosts[2],
  ];

  if (phase !== "playing") return null;

  return (
    <div className="mx-auto w-full space-y-3 px-4 py-3">
      {/* 페이스북 스타일: 무슨 생각 중이신가요? */}
      <div className="flex items-center gap-3 rounded-lg bg-[var(--sns-card)] px-4 py-3 sns-card-shadow">
        <div
          className="h-10 w-10 flex-shrink-0 rounded-full ring-2 ring-[var(--sns-divider)]"
          style={{
            background: "linear-gradient(135deg, var(--sns-primary) 0%, #764ba2 100%)",
          }}
        />
        <button
          type="button"
          className="flex-1 rounded-full bg-[var(--sns-bg)] py-2.5 pl-4 text-left text-[15px] text-[var(--sns-text-secondary)] hover:bg-[var(--sns-divider)]"
        >
          무슨 생각 중이신가요?
        </button>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          mission={
            post.isMission
              ? todayMissions.find((m) => m.id === post.missionId)
              : undefined
          }
          showChoices={
            !!post.isMission &&
            !!post.missionId &&
            !completedMissions.has(post.missionId)
          }
        />
      ))}
    </div>
  );
}
