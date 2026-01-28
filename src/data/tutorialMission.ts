import type { MissionDefinition } from "@/types/game";

/** [Tutorial Mission] 오늘 점심 뭐 먹지? */
export const tutorialLunchMission: MissionDefinition = {
  id: "tutorial_lunch",
  post: {
    authorId: "npc_hong",
    authorName: "홍길동",
    authorHandle: "hong_eats",
    content: "오늘 점심 뭐 먹지? 🤔 회사 근처 다 맛없는데",
    timestamp: "방금 전",
    likes: 24,
    isMission: true,
    missionId: "tutorial_lunch",
    comments: [],
  },
  choices: [
    {
      id: "robot",
      text: "영양학적으로 균형 잡힌 비빔밥을 추천합니다.",
      hint: "danger_robot",
      description: "너무 로봇 같음",
    },
    {
      id: "expose",
      text: "아무거나 드세요. 저는 배터리만 있으면 됩니다.",
      hint: "danger_expose",
      description: "정체 노출",
    },
    {
      id: "human",
      text: "오 비빔밥 ㄱㄱ? 나도 어제 먹었는데 존맛임",
      hint: "safe",
      description: "인간적임",
    },
  ],
  humanityEffect: (choiceId: string) => {
    switch (choiceId) {
      case "robot":
        return -25;
      case "expose":
        return -80; // 사실상 계정 정지
      case "human":
        return 5;
      default:
        return 0;
    }
  },
  efficiencyEffect: (choiceId: string) => {
    switch (choiceId) {
      case "robot":
        return -5; // 단순 출력이라 효율적
      case "expose":
        return -10;
      case "human":
        return -15; // '고민'해서 인간처럼 쓰느라 연산 많음
      default:
        return 0;
    }
  },
};
