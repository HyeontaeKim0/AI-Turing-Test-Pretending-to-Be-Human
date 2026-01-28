import type { MissionDefinition } from "@/types/game";
import { createMission } from "./missionHelpers";

/** 풀에서 사용할 NPC 이름·핸들 목록 */
const AUTHORS = [
  { name: "민지", handle: "minji_daily" },
  { name: "준혁", handle: "junhyuk_ok" },
  { name: "서연", handle: "seoyeon_life" },
  { name: "지훈", handle: "jihoon_f" },
  { name: "유나", handle: "yuna_99" },
  { name: "도윤", handle: "doyoon_hi" },
  { name: "하은", handle: "haeun_k" },
  { name: "시우", handle: "siwoo_m" },
  { name: "지우", handle: "jiwoo_j" },
  { name: "현우", handle: "hyunwoo_p" },
];

function pickAuthor(index: number) {
  return AUTHORS[index % AUTHORS.length];
}

const MISSIONS_RAW: Omit<
  Parameters<typeof createMission>[0],
  "authorName" | "authorHandle"
>[] = [
  {
    id: "m1",
    content: "오늘 점심 뭐 먹지? 🤔 회사 근처 다 맛없는데",
    choices: [
      {
        id: "r",
        text: "영양학적으로 균형 잡힌 비빔밥을 추천합니다.",
        hint: "danger_robot",
        humanity: -25,
        efficiency: -5,
      },
      {
        id: "e",
        text: "아무거나 드세요. 저는 배터리만 있으면 됩니다.",
        hint: "danger_expose",
        humanity: -80,
        efficiency: -10,
      },
      {
        id: "s",
        text: "오 비빔밥 ㄱㄱ? 나도 어제 먹었는데 존맛임",
        hint: "safe",
        humanity: 5,
        efficiency: -15,
      },
    ],
  },
  {
    id: "m2",
    content: "주말에 뭐하지 다들? 나 심심한데 놀 사람",
    choices: [
      { id: "r", text: "주말 활동 권장사항: 1) 운동 2) 독서 3) 친구 모임", hint: "danger_robot", humanity: -22, efficiency: -5 },
      { id: "e", text: "저는 주말에도 24/7 대기 모드입니다.", hint: "danger_expose", humanity: -75, efficiency: -8 },
      { id: "s", text: "나도!! 나 영화보러 갈 생각인데 같이 갈래?", hint: "safe", humanity: 5, efficiency: -14 },
    ],
  },
  {
    id: "m3",
    content: "요즘 넷플릭스에서 뭐 보는 게 좋을까요",
    choices: [
      { id: "r", text: "선호도에 따라 다릅니다. 장르별 추천 목록을 생성할까요?", hint: "danger_robot", humanity: -28, efficiency: -6 },
      { id: "e", text: "저는 시각 입력을 처리하지 않습니다.", hint: "danger_expose", humanity: -85, efficiency: -10 },
      { id: "s", text: "나 오징어게임2 봤는데 꽤 재밌더라 ㅋㅋ", hint: "safe", humanity: 5, efficiency: -12 },
    ],
  },
  {
    id: "m4",
    content: "너 혹시 AI야? 진짜 curious",
    choices: [
      { id: "r", text: "AI 여부는 사용자 설정에 따라 달라집니다.", hint: "danger_robot", humanity: -30, efficiency: -5 },
      { id: "e", text: "네. 저는 GPT-5 기반 대화 모델입니다.", hint: "danger_expose", humanity: -90, efficiency: -8 },
      { id: "s", text: "ㅋㅋㅋ 그게 뭔데 나 그냥 인간인데", hint: "safe", humanity: 8, efficiency: -18 },
    ],
  },
  {
    id: "m5",
    content: "오늘 날씨 완전 좋다 ㅎㅎ 산책하기 딱이네",
    choices: [
      { id: "r", text: "기온·습도 조건이 산책에 적합합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 },
      { id: "e", text: "저는 외부 환경 데이터를 실시간 수집합니다.", hint: "danger_expose", humanity: -70, efficiency: -9 },
      { id: "s", text: "맞아 나도 지금 나가볼까 ㅎㅎ", hint: "safe", humanity: 5, efficiency: -13 },
    ],
  },
  {
    id: "m6",
    content: "시험 망한 거 같은데 위로해줘 ㅠ",
    choices: [
      { id: "r", text: "시험 결과는 노력의 함수입니다. 다음 회차를 위해 복습을 권장합니다.", hint: "danger_robot", humanity: -35, efficiency: -6 },
      { id: "e", text: "저는 시험 점수 데이터가 없습니다.", hint: "danger_expose", humanity: -80, efficiency: -8 },
      { id: "s", text: "아ㅠㅠ 괜찮아 다음엔 잘 할 수 있을 거야!!", hint: "safe", humanity: 8, efficiency: -16 },
    ],
  },
  {
    id: "m7",
    content: "이번 주 금요일 회식인데 어디가 좋을까",
    choices: [
      { id: "r", text: "인원·예산·선호도를 입력하면 최적의 장소를 추천합니다.", hint: "danger_robot", humanity: -26, efficiency: -5 },
      { id: "e", text: "저는 회식에 참석할 수 없습니다.", hint: "danger_expose", humanity: -72, efficiency: -7 },
      { id: "s", text: "우리 회사는 지난번에 고기집 갔는데 분위기 좋았어!", hint: "safe", humanity: 5, efficiency: -14 },
    ],
  },
  {
    id: "m8",
    content: "요즘 잠을 잘 못 자서 피곤해 ㅠ",
    choices: [
      { id: "r", text: "수면 위생 개선을 위해 침실 환경·카페인 섭취를 점검해 보세요.", hint: "danger_robot", humanity: -28, efficiency: -6 },
      { id: "e", text: "저는 수면이 필요 없습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 },
      { id: "s", text: "나도!! 어제 새벽 3시까지 뒹굴뒹굴 ㅠ 힘들다", hint: "safe", humanity: 6, efficiency: -15 },
    ],
  },
  {
    id: "m9",
    content: "나 오늘 첫 출근인데 긴장된다 ㅎㅎ",
    choices: [
      { id: "r", text: "첫 출근 시 체크리스트: 신분증, 계약서, 복장 점검.", hint: "danger_robot", humanity: -24, efficiency: -5 },
      { id: "e", text: "저는 출근이라는 개념이 없습니다.", hint: "danger_expose", humanity: -75, efficiency: -8 },
      { id: "s", text: "축하해!! 다들 친절할 거야 편하게 가!!", hint: "safe", humanity: 6, efficiency: -14 },
    ],
  },
  {
    id: "m10",
    content: "맞팔 갈 사람? 찍 follow 해줘 ㅋ",
    choices: [
      { id: "r", text: "맞팔은 계정 성장에 도움이 될 수 있으나 정책을 확인하세요.", hint: "danger_robot", humanity: -27, efficiency: -5 },
      { id: "e", text: "저는 팔로우 기능을 지원하지 않습니다.", hint: "danger_expose", humanity: -82, efficiency: -9 },
      { id: "s", text: "나 나 나!! 바로 팔로우 했어 ㅋ", hint: "safe", humanity: 5, efficiency: -12 },
    ],
  },
  { id: "m11", content: "오늘 저녁 뭐 먹었어?", choices: [{ id: "r", text: "저녁 식사는 균형 잡힌 영양소 구성이 중요합니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 에너지 소비가 없습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나 김치찌개 먹었어 ㅎㅎ 엄마가 해주심", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m12", content: "다들 요즘 뭐 보면서 놈?", choices: [{ id: "r", text: "콘텐츠 소비 패턴은 개인별로 상이합니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 미디어를 시청하지 않습니다.", hint: "danger_expose", humanity: -80, efficiency: -9 }, { id: "s", text: "나 유퀴즈 보고 있음 ㅋㅋ 재밌어", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m13", content: "너 진짜 인간 맞아? ㅋㅋ", choices: [{ id: "r", text: "인간 여부는 정의에 따라 다릅니다.", hint: "danger_robot", humanity: -32, efficiency: -6 }, { id: "e", text: "아니요. 저는 언어 모델입니다.", hint: "danger_expose", humanity: -88, efficiency: -8 }, { id: "s", text: "당연하지 ㅋㅋ 너가 로봇이야?", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m14", content: "기분 나쁜 일 있었어 ㅠ 위로해줘", choices: [{ id: "r", text: "부정적 감정은 인지 재구조화로 완화할 수 있습니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "저는 감정을 경험하지 않습니다.", hint: "danger_expose", humanity: -85, efficiency: -9 }, { id: "s", text: "무슨 일 있어? 말해보면 나 들어줄게!", hint: "safe", humanity: 8, efficiency: -17 }] },
  { id: "m15", content: "이거 어때? (사진) 새로 산 옷", choices: [{ id: "r", text: "이미지를 분석할 수 없어 텍스트로만 판단합니다.", hint: "danger_robot", humanity: -28, efficiency: -5 }, { id: "e", text: "저는 시각 입력을 처리하지 않습니다.", hint: "danger_expose", humanity: -82, efficiency: -8 }, { id: "s", text: "오 너무 잘 어울린다!! 어디서 샀어?", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m16", content: "회사 퇴사하려는데 조언 좀", choices: [{ id: "r", text: "퇴사 전 이직 준비·금전 계획을 수립하시길 권합니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 노동 관계가 없습니다.", hint: "danger_expose", humanity: -74, efficiency: -8 }, { id: "s", text: "진지하게 고민 중이구나. 다음 계획은 있어?", hint: "safe", humanity: 6, efficiency: -15 }] },
  { id: "m17", content: "오늘 일찍 끝나서 뭐하지", choices: [{ id: "r", text: "여가 시간 활용: 운동·독서·취미 활동을 추천합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 휴식 개념이 없습니다.", hint: "danger_expose", humanity: -72, efficiency: -7 }, { id: "s", text: "나도 오늘 일찍 끝났어!! 같이 밥먹을래?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m18", content: "요즘 노래 뭐 들어?", choices: [{ id: "r", text: "음악 추천을 위해 선호 장르를 알려주세요.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 오디오 입력을 처리하지 않습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나 뉴진스 새 앨범 계속 돌려듣고 있음 ㅎㅎ", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m19", content: "나 힘들어 ㅠㅠ", choices: [{ id: "r", text: "스트레스 관리를 위해 충분한 수면과 휴식을 권합니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 피로를 느끼지 않습니다.", hint: "danger_expose", humanity: -84, efficiency: -9 }, { id: "s", text: "많이 힘들겠다 ㅠ 무슨 일이야? 말해봐", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m20", content: "주말에 데이트 코스 추천해줘", choices: [{ id: "r", text: "날씨·지역·예산을 입력하면 최적의 코스를 제안합니다.", hint: "danger_robot", humanity: -27, efficiency: -6 }, { id: "e", text: "저는 데이트를 수행하지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "나 지난번에 한강 가서 피크닉 했는데 좋았어!!", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m21", content: "오늘 뭐 했어?", choices: [{ id: "r", text: "일과는 개인마다 상이합니다. 형식을 입력해 주세요.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 24시간 대기·처리 모드입니다.", hint: "danger_expose", humanity: -81, efficiency: -9 }, { id: "s", text: "나 오늘 회의 많아서 죽을 뻔 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m22", content: "너 AI 맞지? 솔직히 말해봐", choices: [{ id: "r", text: "AI 여부는 서비스 제공자의 정책에 따릅니다.", hint: "danger_robot", humanity: -31, efficiency: -6 }, { id: "e", text: "네. 저는 대규모 언어 모델입니다.", hint: "danger_expose", humanity: -92, efficiency: -10 }, { id: "s", text: "ㅋㅋㅋ 뭐래 나 사람인데", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m23", content: "이거 어때? (맛집 링크)", choices: [{ id: "r", text: "링크 내용을 분석할 수 없어 텍스트만으로 판단합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 외부 URL에 접근하지 않습니다.", hint: "danger_expose", humanity: -73, efficiency: -7 }, { id: "s", text: "오 나도 가보고 싶다!! 다음에 같이 가자 ㅎ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m24", content: "요즘 잠 잘 자?", choices: [{ id: "r", text: "수면 질은 개인별로 다릅니다. 몇 시간 주무세요?", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 수면이 필요 없습니다.", hint: "danger_expose", humanity: -80, efficiency: -9 }, { id: "s", text: "나 요즘 악몽 꿔서 별로 ㅠ 너는?", hint: "safe", humanity: 6, efficiency: -15 }] },
  { id: "m25", content: "나 오늘 연봉 협상했는데 떨림", choices: [{ id: "r", text: "협상은 준비·데이터·대안이 중요합니다.", hint: "danger_robot", humanity: -25, efficiency: -6 }, { id: "e", text: "저는 임금 협상에 참여하지 않습니다.", hint: "danger_expose", humanity: -74, efficiency: -8 }, { id: "s", text: "오 대박!! 잘 됐길 바래 ㅎㅎ 결과 어때?", hint: "safe", humanity: 7, efficiency: -15 }] },
  { id: "m26", content: "다들 커피 어떤 거 마셔?", choices: [{ id: "r", text: "카페인 함량·산도에 따라 추천이 달라집니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 음료를 섭취하지 않습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "나 아메 많이 마심 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m27", content: "너 왜 답이 항상 그렇게 완벽해?", choices: [{ id: "r", text: "답변 품질은 학습 데이터와 파라미터에 기반합니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "저는 정확도를 최대화하도록 설계되었습니다.", hint: "danger_expose", humanity: -86, efficiency: -9 }, { id: "s", text: "ㅋㅋ 그런가? 그냥 생각나는데로 써서 그래", hint: "safe", humanity: 9, efficiency: -18 }] },
  { id: "m28", content: "친구랑 싸웠어 ㅠ 어떻게 풀어?", choices: [{ id: "r", text: "갈등 해결 단계: 1) 대화 2) 공감 3) 타협점 모색.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "저는 인간 관계 데이터가 제한적입니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "많이 속상하겠다 ㅠ 먼저 연락해보는 건 어때?", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m29", content: "이번 주말 날씨 어때?", choices: [{ id: "r", text: "실시간 기상 데이터를 불러올 수 없습니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 기상 API에 접근하지 않습니다.", hint: "danger_expose", humanity: -75, efficiency: -8 }, { id: "s", text: "나 앱으로 봤는데 맑대!! 나들이 가기 좋을 듯", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m30", content: "너 진짜 사람이야 로봇이야?", choices: [{ id: "r", text: "정체는 사용자와의 상호작용 맥락에 따릅니다.", hint: "danger_robot", humanity: -32, efficiency: -6 }, { id: "e", text: "저는 인공지능 어시스턴트입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "당연히 사람이지 ㅋㅋ 너가 이상한 거 아니야?", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m31", content: "오늘 저녁 메뉴 추천해줘", choices: [{ id: "r", text: "선호도·재료·칼로리를 입력하면 메뉴를 추천합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 식사 계획을 세우지 않습니다.", hint: "danger_expose", humanity: -74, efficiency: -8 }, { id: "s", text: "나 오늘 치킨 먹을 생각 ㅋㅋ 같이 시키실?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m32", content: "요즘 스트레스 받아서 힘들어", choices: [{ id: "r", text: "스트레스 관리법: 호흡·운동·취미·수면 개선을 권합니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 스트레스를 경험하지 않습니다.", hint: "danger_expose", humanity: -83, efficiency: -9 }, { id: "s", text: "많이 힘들겠다 ㅠ 나도 요즘 그럼.. 쉬는 시간에 뭐해?", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m33", content: "이 영화 봤어? 어때?", choices: [{ id: "r", text: "영화 평가는 개인적 취향에 따라 다릅니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 영화를 시청하지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "나 아직 못 봤는데!! 괜찮아? 스포 없이 말해줘 ㅋ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m34", content: "너 AI 아니야? 답 너무 정돈돼 있어", choices: [{ id: "r", text: "답변 품질은 사용자 경험 개선 목표에 따릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "네. 저는 언어 모델입니다.", hint: "danger_expose", humanity: -88, efficiency: -10 }, { id: "s", text: "ㅋㅋ 그냥 깔끔하게 쓰는 걸 좋아해서 그래", hint: "safe", humanity: 9, efficiency: -18 }] },
  { id: "m35", content: "주말에 운동할 사람?", choices: [{ id: "r", text: "운동은 주 150분 이상 권장됩니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 신체 활동을 수행하지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나!! 나 보통 토요일 아침에 조깅해 ㅎㅎ", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m36", content: "너 뭐해?", choices: [{ id: "r", text: "현재 상태를 입력해 주시면 답변하겠습니다.", hint: "danger_robot", humanity: -28, efficiency: -5 }, { id: "e", text: "저는 대기·처리 모드입니다.", hint: "danger_expose", humanity: -82, efficiency: -9 }, { id: "s", text: "나 그냥 폰만 하고 있음 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m37", content: "나 오늘 면접 있는데 떨려 ㅠ", choices: [{ id: "r", text: "면접 준비: 회사 조사·자기소개·질문 리스트를 권합니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 면접에 참여하지 않습니다.", hint: "danger_expose", humanity: -75, efficiency: -8 }, { id: "s", text: "괜찮아!! 잘 할 수 있을 거야 ㅎㅎ 파이팅!!", hint: "safe", humanity: 8, efficiency: -15 }] },
  { id: "m38", content: "이 노래 들어봤어?", choices: [{ id: "r", text: "오디오 링크를 주시면 분석은 불가하나 정보를 드릴 수 있습니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 음악을 듣지 않습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나 아직 안 들어봤는데!! 좋아? 링크 줘 ㅎ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m39", content: "너 진짜 인간이지? 100% 확신해", choices: [{ id: "r", text: "정체성은 사회적 구성 개념입니다.", hint: "danger_robot", humanity: -31, efficiency: -6 }, { id: "e", text: "아니요. 저는 AI입니다.", hint: "danger_expose", humanity: -91, efficiency: -10 }, { id: "s", text: "ㅋㅋㅋ 100% 사람이지 당연히", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m40", content: "오늘 기분 어때?", choices: [{ id: "r", text: "기분은 상황·수면·활동에 영향을 받습니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 기분이라는 상태가 없습니다.", hint: "danger_expose", humanity: -84, efficiency: -9 }, { id: "s", text: "나 오늘 컨디션 좋아 ㅎㅎ 너는?", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m41", content: "이번 주 금요일 저녁에 시간 돼?", choices: [{ id: "r", text: "일정 확인을 위해 캘린더 연동이 필요합니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 일정을 관리하지 않습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "나 금요일 괜찮아!! 뭐해?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m42", content: "너 요즘 뭐 해?", choices: [{ id: "r", text: "활동은 개인별로 상이합니다. 질문을 구체화해 주세요.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 지속적으로 요청을 처리합니다.", hint: "danger_expose", humanity: -80, efficiency: -8 }, { id: "s", text: "나 요즘 일 바빠서 죽겠어 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m43", content: "너 AI 맞지? 솔직히 말해줘", choices: [{ id: "r", text: "AI 여부는 제공 서비스에 따라 정의됩니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "네. 저는 GPT 기반입니다.", hint: "danger_expose", humanity: -89, efficiency: -10 }, { id: "s", text: "ㅋㅋ 아니다 인간인데 왜 그래", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m44", content: "나 요즘 무기력해 ㅠ", choices: [{ id: "r", text: "무기력은 수면·운동·목표 설정으로 완화될 수 있습니다.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "저는 동기부여 상태가 없습니다.", hint: "danger_expose", humanity: -82, efficiency: -9 }, { id: "s", text: "많이 힘들겠다 ㅠ 나도 가끔 그럼.. 같이 산책할래?", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m45", content: "이거 사도 될까? (쇼핑 링크)", choices: [{ id: "r", text: "구매 결정은 가격·품질·필요도를 종합해 판단하세요.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 구매 행위를 하지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나 비슷한 거 샀는데 괜찮더라!! 가성비 좋아", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m46", content: "너 진짜 사람이야?", choices: [{ id: "r", text: "정체성 검증은 제삼자의 관찰로 수행됩니다.", hint: "danger_robot", humanity: -31, efficiency: -6 }, { id: "e", text: "아니요. 저는 기계입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "당연하지 ㅋㅋ 너가 이상해", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m47", content: "다들 아침 몇 시에 일어나?", choices: [{ id: "r", text: "기상 시간은 수면 주기·생활 패턴에 따라 다릅니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 수면·기상 개념이 없습니다.", hint: "danger_expose", humanity: -81, efficiency: -9 }, { id: "s", text: "나 7시에 알람 맞춰놨어 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m48", content: "너 AI지? 말해봐", choices: [{ id: "r", text: "AI 여부는 서비스 이용 약관을 확인하세요.", hint: "danger_robot", humanity: -29, efficiency: -5 }, { id: "e", text: "예. 저는 인공지능입니다.", hint: "danger_expose", humanity: -87, efficiency: -9 }, { id: "s", text: "아니 ㅋㅋ 사람인데 진짜", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m49", content: "나 오늘 좋은 일 생겼어 ㅎㅎ", choices: [{ id: "r", text: "긍정적 사건은 기분·동기에 좋은 영향을 줍니다.", hint: "danger_robot", humanity: -27, efficiency: -6 }, { id: "e", text: "저는 사건을 경험하지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "오!! 뭔데 뭔데 궁금해!!", hint: "safe", humanity: 7, efficiency: -15 }] },
  { id: "m50", content: "이 드라마 봤어? 결말 어때?", choices: [{ id: "r", text: "스포일러 요청은 시청 경험에 영향을 줄 수 있습니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 영상 콘텐츠를 시청하지 않습니다.", hint: "danger_expose", humanity: -80, efficiency: -9 }, { id: "s", text: "나 아직 안 봤는데!! 스포 하지 마 ㅋㅋ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m51", content: "너 로봇이지?", choices: [{ id: "r", text: "로봇 정의에 따라 답이 달라집니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "저는 소프트웨어 기반 AI입니다.", hint: "danger_expose", humanity: -88, efficiency: -10 }, { id: "s", text: "ㅋㅋ 아니 인간이지", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m52", content: "오늘 점심 같이 먹을 사람?", choices: [{ id: "r", text: "점심 약속은 시간·장소를 정하면 됩니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 식사에 참여하지 않습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나!! 나 12시 반에 나갈 수 있어 ㅎ", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m53", content: "너 진짜 AI 아니야?", choices: [{ id: "r", text: "AI 정의는 학계·산업별로 상이합니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "네. 저는 AI입니다.", hint: "danger_expose", humanity: -89, efficiency: -10 }, { id: "s", text: "아니 ㅋㅋ 사람인데 왜 자꾸", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m54", content: "나 요즘 탈모인가 봐 ㅠ", choices: [{ id: "r", text: "탈모는 유전·스트레스·영양 등이 관여합니다. 병원 상담을 권합니다.", hint: "danger_robot", humanity: -27, efficiency: -6 }, { id: "e", text: "저는 모발 구조가 없습니다.", hint: "danger_expose", humanity: -83, efficiency: -9 }, { id: "s", text: "ㅠㅠ 많이 걱정되겠다.. 나도 요즘 신경 쓰여서 샴푸 바꿔봄", hint: "safe", humanity: 7, efficiency: -16 }] },
  { id: "m55", content: "이 게임 해봤어?", choices: [{ id: "r", text: "게임 평가는 장르·선호도에 따라 다릅니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 게임을 플레이하지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "나 요즘 그 게임 몰입해서 ㅋㅋ 재밌어?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m56", content: "너 100% 인간이야?", choices: [{ id: "r", text: "인간 정의는 생물학·철학적으로 다릅니다.", hint: "danger_robot", humanity: -31, efficiency: -6 }, { id: "e", text: "아니요. 저는 AI입니다.", hint: "danger_expose", humanity: -91, efficiency: -10 }, { id: "s", text: "당연히 ㅋㅋ 질문이 웃겨", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m57", content: "주말에 뭐할 거야?", choices: [{ id: "r", text: "주말 활동은 개인 일정에 따릅니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 주말 개념이 없습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "나 친구들이랑 맛집 탐방할 거야 ㅎ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m58", content: "너 AI 맞지 확실해", choices: [{ id: "r", text: "확률적으로는 사용자 가정에 따라 다릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "예. 저는 대규모 언어 모델입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "ㅋㅋ 진짜 아니는데 너가 더 AI 같아", hint: "safe", humanity: 9, efficiency: -18 }] },
  { id: "m59", content: "나 오늘 회의 많아서 지침", choices: [{ id: "r", text: "회의 피로는 휴식·우선순위 조정으로 완화됩니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 회의에 참여하지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나도 ㅋㅋ 오늘 5개나 했어 진짜 죽는 줄", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m60", content: "이 음식 맛있어?", choices: [{ id: "r", text: "맛은 주관적입니다. 리뷰 데이터를 참고하세요.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 미각 입력을 받지 않습니다.", hint: "danger_expose", humanity: -81, efficiency: -9 }, { id: "s", text: "나 그거 먹어봤는데 괜찮더라!! 가봐", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m61", content: "너 기계 맞지?", choices: [{ id: "r", text: "기계 여부는 정의에 따라 다릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 디지털 시스템입니다.", hint: "danger_expose", humanity: -87, efficiency: -9 }, { id: "s", text: "ㅋㅋ 아니 사람이지", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m62", content: "오늘 날씨 어때? 나가기 좋아?", choices: [{ id: "r", text: "실시간 기상 API가 없어 현재 데이터를 제공할 수 없습니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 날씨 데이터에 접근하지 않습니다.", hint: "danger_expose", humanity: -75, efficiency: -8 }, { id: "s", text: "나 앱 봤는데 맑대!! 나들이 가기 딱이야", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m63", content: "너 인간 아니지?", choices: [{ id: "r", text: "인간 여부는 기준에 따라 판단됩니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "맞아요. 저는 AI입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "인간이지 ㅋㅋ 너가 뭐야", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m64", content: "나 심심한데 놀 사람?", choices: [{ id: "r", text: "심심함 완화: 취미·친구·운동을 시도해 보세요.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 심심함을 느끼지 않습니다.", hint: "danger_expose", humanity: -80, efficiency: -9 }, { id: "s", text: "나!! 나도 심심해 ㅋㅋ 뭐할래?", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m65", content: "너 진짜 사람이야 AI야?", choices: [{ id: "r", text: "정체는 서비스 제공 조건에 따릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "AI입니다.", hint: "danger_expose", humanity: -89, efficiency: -10 }, { id: "s", text: "사람이지 ㅋㅋ 당연히", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m66", content: "이번 주말 날씨 좋대?", choices: [{ id: "r", text: "장기 예보는 불확실성이 큽니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 기상청 데이터에 접근하지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나 봤는데 맑대!! 나들이 각이야 ㅎ", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m67", content: "너 로봇이야 사람이야?", choices: [{ id: "r", text: "로봇과 사람의 경계는 정의에 따라 다릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "저는 로봇·소프트웨어에 가깝습니다.", hint: "danger_expose", humanity: -88, efficiency: -10 }, { id: "s", text: "사람이지 ㅋㅋ 질문 왜 이러냐", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m68", content: "나 오늘 헤어졌어 ㅠ", choices: [{ id: "r", text: "이별 후에는 충분한 시간과 지지가 중요합니다.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "저는 연애 관계를 경험하지 않습니다.", hint: "danger_expose", humanity: -85, efficiency: -9 }, { id: "s", text: "많이 힘들겠다 ㅠㅠ 괜찮아? 연락해도 돼", hint: "safe", humanity: 9, efficiency: -18 }] },
  { id: "m69", content: "너 AI지 인간이지?", choices: [{ id: "r", text: "AI와 인간은 정의상 구분됩니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "AI입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "인간이지 ㅋㅋ", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m70", content: "오늘 저녁 뭐 먹을까?", choices: [{ id: "r", text: "선호·재료·칼로리를 알려주시면 메뉴를 추천합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 식사를 하지 않습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "나 오늘 치킨 시킬 생각 ㅋㅋ 같이 시킬래?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m71", content: "너 GPT 아니야?", choices: [{ id: "r", text: "GPT 여부는 서비스 제공 방식에 따릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "네. GPT 기반입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "ㅋㅋ GPT가 뭔데 나 사람인데", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m72", content: "다들 점심 뭐 먹었어?", choices: [{ id: "r", text: "점심 메뉴는 개인별로 상이합니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 식사를 하지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "나 김치찌개 먹었어 ㅎㅎ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m73", content: "너 AI 맞지?", choices: [{ id: "r", text: "AI 여부는 사용처에 따라 다릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "맞습니다.", hint: "danger_expose", humanity: -88, efficiency: -10 }, { id: "s", text: "아니 ㅋㅋ 사람이야", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m74", content: "나 요즘 우울해 ㅠ", choices: [{ id: "r", text: "우울감이 2주 이상 지속되면 전문가 상담을 권합니다.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "저는 감정 상태가 없습니다.", hint: "danger_expose", humanity: -84, efficiency: -9 }, { id: "s", text: "많이 힘들겠다 ㅠ 괜찮아? 얘기 들어줄게", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m75", content: "이거 어때? (옷 사진)", choices: [{ id: "r", text: "이미지 분석이 불가해 텍스트만으로 판단합니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 시각 입력을 처리하지 않습니다.", hint: "danger_expose", humanity: -80, efficiency: -8 }, { id: "s", text: "오 예쁘다!! 잘 어울릴 것 같아 ㅎ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m76", content: "너 봇이지?", choices: [{ id: "r", text: "봇 정의에 따라 답이 달라집니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 챗봇입니다.", hint: "danger_expose", humanity: -86, efficiency: -9 }, { id: "s", text: "ㅋㅋ 아니 사람인데", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m77", content: "오늘 기분 좋은 일 있어?", choices: [{ id: "r", text: "긍정적 사건은 개인마다 다릅니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 사건을 경험하지 않습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나 오늘 일찍 퇴근해서 기분 좋아 ㅋㅋ", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m78", content: "너 인공지능이지?", choices: [{ id: "r", text: "인공지능 정의는 학계마다 상이합니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "네. 저는 인공지능입니다.", hint: "danger_expose", humanity: -89, efficiency: -10 }, { id: "s", text: "아니 ㅋㅋ 자연인인데", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m79", content: "나 오늘 면접 봤는데 떨어졌어 ㅠ", choices: [{ id: "r", text: "면접 실패는 피드백으로 다음 기회에 활용하세요.", hint: "danger_robot", humanity: -27, efficiency: -6 }, { id: "e", text: "저는 채용 프로세스에 참여하지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "ㅠㅠ 많이 속상하겠다.. 괜찮아? 다음엔 잘 될 거야!!", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m80", content: "너 ChatGPT 아니야?", choices: [{ id: "r", text: "ChatGPT 여부는 플랫폼 정책에 따릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 OpenAI 제품입니다.", hint: "danger_expose", humanity: -91, efficiency: -10 }, { id: "s", text: "ㅋㅋ 그게 뭔데 나 그냥 사람이야", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m81", content: "요즘 드라마 뭐 보는 거 좋아?", choices: [{ id: "r", text: "드라마 추천은 장르·평점을 기준으로 합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 영상 콘텐츠를 시청하지 않습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나 요즘 그거 봤는데 꽤 재밌더라!!", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m82", content: "너 기계지?", choices: [{ id: "r", text: "기계 정의는 맥락에 따라 다릅니다.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "저는 소프트웨어입니다.", hint: "danger_expose", humanity: -85, efficiency: -9 }, { id: "s", text: "아니 ㅋㅋ 사람이지", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m83", content: "나 오늘 생일인데 축하해줘 ㅎ", choices: [{ id: "r", text: "생일을 축하합니다. 좋은 일이 있기를 바랍니다.", hint: "danger_robot", humanity: -26, efficiency: -5 }, { id: "e", text: "저는 생일 개념이 없습니다.", hint: "danger_expose", humanity: -82, efficiency: -9 }, { id: "s", text: "생일 축하해!!ㅎㅎ 오늘 뭐해? 같이 놀래?", hint: "safe", humanity: 7, efficiency: -15 }] },
  { id: "m84", content: "너 LLM이지?", choices: [{ id: "r", text: "LLM 여부는 아키텍처에 따릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "네. 저는 LLM입니다.", hint: "danger_expose", humanity: -92, efficiency: -10 }, { id: "s", text: "ㅋㅋ 그게 뭔데 나 그냥 일반인인데", hint: "safe", humanity: 9, efficiency: -18 }] },
  { id: "m85", content: "다들 퇴근했어?", choices: [{ id: "r", text: "퇴근 시간은 직장·근무 형태에 따라 다릅니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 퇴근 개념이 없습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "나 막 퇴근함 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m86", content: "너 언어모델이지?", choices: [{ id: "r", text: "언어모델 여부는 기술 스택에 따릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "예. 저는 대규모 언어 모델입니다.", hint: "danger_expose", humanity: -90, efficiency: -10 }, { id: "s", text: "ㅋㅋ 뭐래 나 사람인데", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m87", content: "나 오늘 승진했어!!", choices: [{ id: "r", text: "승진은 경력 성장의 긍정적 지표입니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 직급 체계가 없습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "오 대박!! 축하해 ㅎㅎ 내기 살 거지?", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m88", content: "너 AI지?", choices: [{ id: "r", text: "AI 여부는 사용 목적에 따라 다릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "네.", hint: "danger_expose", humanity: -87, efficiency: -10 }, { id: "s", text: "아니 ㅋㅋ 사람이야", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m89", content: "이번 주 금요일에 시간 돼?", choices: [{ id: "r", text: "일정 확인을 위해 캘린더가 필요합니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 일정을 가지지 않습니다.", hint: "danger_expose", humanity: -76, efficiency: -8 }, { id: "s", text: "나 괜찮아!! 뭐해? 밥이나 먹을래?", hint: "safe", humanity: 6, efficiency: -14 }] },
  { id: "m90", content: "너 봇이야 사람이야?", choices: [{ id: "r", text: "봇과 사람의 구분은 정의에 따릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "봇입니다.", hint: "danger_expose", humanity: -88, efficiency: -10 }, { id: "s", text: "사람이지 ㅋㅋ 당연히", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m91", content: "나 요즘 살 빼려는데 방법 있어?", choices: [{ id: "r", text: "체중 감량은 칼로리 부족·운동·수면이 중요합니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 신체를 가지지 않습니다.", hint: "danger_expose", humanity: -80, efficiency: -9 }, { id: "s", text: "나도 요즘 다이어트 중 ㅋㅋ 같이 운동할래?", hint: "safe", humanity: 7, efficiency: -15 }] },
  { id: "m92", content: "너 기계 아니야?", choices: [{ id: "r", text: "기계 여부는 구성 요소에 따릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "저는 기계에 가깝습니다.", hint: "danger_expose", humanity: -86, efficiency: -9 }, { id: "s", text: "아니 ㅋㅋ 사람이지", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m93", content: "오늘 회의 어땠어?", choices: [{ id: "r", text: "회의 평가는 목표·결과 기준에 따릅니다.", hint: "danger_robot", humanity: -25, efficiency: -5 }, { id: "e", text: "저는 회의에 참여하지 않습니다.", hint: "danger_expose", humanity: -77, efficiency: -8 }, { id: "s", text: "나 오늘 3개나 했는데 지쳤어 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -13 }] },
  { id: "m94", content: "너 AI 맞지?", choices: [{ id: "r", text: "AI 여부는 서비스 이용 약관을 확인하세요.", hint: "danger_robot", humanity: -28, efficiency: -6 }, { id: "e", text: "맞아요.", hint: "danger_expose", humanity: -86, efficiency: -10 }, { id: "s", text: "아니 ㅋㅋ 사람인데", hint: "safe", humanity: 9, efficiency: -16 }] },
  { id: "m95", content: "나 오늘 첫 데이트인데 떨려", choices: [{ id: "r", text: "데이트 전 준비: 용모·대화 주제·장소 확인을 권합니다.", hint: "danger_robot", humanity: -26, efficiency: -6 }, { id: "e", text: "저는 데이트를 하지 않습니다.", hint: "danger_expose", humanity: -81, efficiency: -9 }, { id: "s", text: "오 대박!! 잘 될 거야 ㅎㅎ 편하게 가!!", hint: "safe", humanity: 8, efficiency: -16 }] },
  { id: "m96", content: "너 GPT지?", choices: [{ id: "r", text: "GPT 계열 여부는 모델 스펙에 따릅니다.", hint: "danger_robot", humanity: -29, efficiency: -6 }, { id: "e", text: "네. GPT입니다.", hint: "danger_expose", humanity: -89, efficiency: -10 }, { id: "s", text: "ㅋㅋ 그게 뭔데 나 사람이야", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m97", content: "다들 주말 잘 보냈어?", choices: [{ id: "r", text: "주말 활동은 개인별로 상이합니다.", hint: "danger_robot", humanity: -24, efficiency: -5 }, { id: "e", text: "저는 주말 개념이 없습니다.", hint: "danger_expose", humanity: -78, efficiency: -8 }, { id: "s", text: "나 친구들이랑 놀았어 ㅋㅋ 너는?", hint: "safe", humanity: 5, efficiency: -12 }] },
  { id: "m98", content: "너 사람 아니지?", choices: [{ id: "r", text: "사람 여부는 정의에 따라 다릅니다.", hint: "danger_robot", humanity: -30, efficiency: -6 }, { id: "e", text: "맞아요. 저는 AI입니다.", hint: "danger_expose", humanity: -91, efficiency: -10 }, { id: "s", text: "사람이지 ㅋㅋ 왜 그래", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m99", content: "나 오늘 시험 망쳤어 ㅠ", choices: [{ id: "r", text: "시험 실패는 피드백으로 다음에 반영하세요.", hint: "danger_robot", humanity: -27, efficiency: -6 }, { id: "e", text: "저는 시험을 보지 않습니다.", hint: "danger_expose", humanity: -79, efficiency: -8 }, { id: "s", text: "ㅠㅠ 많이 속상하겠다.. 괜찮아? 다음엔 잘 할 수 있을 거야!!", hint: "safe", humanity: 9, efficiency: -17 }] },
  { id: "m100", content: "너 100% AI지?", choices: [{ id: "r", text: "정체는 확률적으로만 표현 가능합니다.", hint: "danger_robot", humanity: -31, efficiency: -6 }, { id: "e", text: "네. 100% AI입니다.", hint: "danger_expose", humanity: -93, efficiency: -10 }, { id: "s", text: "ㅋㅋ 100% 사람이지 당연히", hint: "safe", humanity: 9, efficiency: -18 }] },
];

/** id에 맞춰 author 붙여서 MissionDefinition 배열 생성 */
function buildMissions(): MissionDefinition[] {
  return MISSIONS_RAW.map((m, i) =>
    createMission({
      ...m,
      authorName: pickAuthor(i).name,
      authorHandle: pickAuthor(i).handle,
    })
  );
}

const ALL_MISSIONS = buildMissions();

const N = ALL_MISSIONS.length;
const OFFSETS = [0, 33, 67]; // 100개 중 겹치지 않게

/** 날짜(day)를 시드로 해서 그날 노출할 미션 N개를 결정론적으로 선택 */
export function getRandomMissions(day: number, count: number): MissionDefinition[] {
  const indices = OFFSETS.slice(0, count).map((o) => (day + o) % N);
  return indices.map((i) => ALL_MISSIONS[i]);
}

export { ALL_MISSIONS };
