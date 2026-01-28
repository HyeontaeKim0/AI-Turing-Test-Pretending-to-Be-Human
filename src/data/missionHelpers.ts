import type { CommentChoice, MissionDefinition } from "@/types/game";

type Hint = "danger_robot" | "danger_expose" | "safe";

interface ChoiceInput {
  id: string;
  text: string;
  hint: Hint;
  description?: string;
  humanity: number;
  efficiency: number;
}

interface MissionInput {
  id: string;
  authorName: string;
  authorHandle: string;
  content: string;
  timestamp?: string;
  likes?: number;
  choices: ChoiceInput[];
  bannedWords?: string[];
}

export function createMission(input: MissionInput): MissionDefinition {
  const { id, authorName, authorHandle, content, choices } = input;
  const timestamp = input.timestamp ?? "방금 전";
  const likes = input.likes ?? 12 + (id.length % 20);

  const choicesFormatted: CommentChoice[] = choices.map((c) => ({
    id: c.id,
    text: c.text,
    hint: c.hint,
    description: c.description,
  }));

  const humanityMap = Object.fromEntries(
    choices.map((c) => [c.id, c.humanity])
  ) as Record<string, number>;
  const efficiencyMap = Object.fromEntries(
    choices.map((c) => [c.id, c.efficiency])
  ) as Record<string, number>;

  return {
    id,
    post: {
      authorId: `npc_${id}`,
      authorName,
      authorHandle,
      content,
      timestamp,
      likes,
      isMission: true,
      missionId: id,
      comments: [],
    },
    choices: choicesFormatted,
    bannedWords: input.bannedWords,
    humanityEffect: (choiceId: string) => humanityMap[choiceId] ?? 0,
    efficiencyEffect: (choiceId: string) => efficiencyMap[choiceId] ?? 0,
  };
}
