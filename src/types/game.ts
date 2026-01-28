/** 게임 내 SNS 게시물 */
export interface FeedPost {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  isMission: boolean;
  missionId?: string;
  comments: Comment[];
}

/** 댓글 */
export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  content: string;
  timestamp: string;
  isPlayer?: boolean;
}

/** 미션 게시물 정의 (튜토리얼 등) */
export interface MissionDefinition {
  id: string;
  post: Omit<FeedPost, "id" | "comments"> & { comments: Omit<Comment, "id">[] };
  choices: CommentChoice[];
  /** 시스템 금지어(필터) 목록: 포함 시 전송 불가 */
  bannedWords?: string[];
  /** 완료 시 인간성 변화 */
  humanityEffect: (choiceId: string) => number;
  /** 완료 시 연산효율 변화 */
  efficiencyEffect: (choiceId: string) => number;
}

/** 댓글 선택지 */
export interface CommentChoice {
  id: string;
  text: string;
  hint: "danger_robot" | "danger_expose" | "safe";
  description?: string;
}

/** 게임 상태 */
export type GamePhase = "playing" | "game_over" | "victory";

export interface GameState {
  day: number;
  maxDays: number;
  humanity: number;
  efficiency: number;
  phase: GamePhase;
  completedMissions: Set<string>;
  gameOverReason?: string;
}

export const INITIAL_HUMANITY = 80;
export const INITIAL_EFFICIENCY = 100;
export const SURVIVAL_DAYS = 30;
