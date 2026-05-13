import type { Lesson } from "@/lib/types";

export const lessons: Lesson[] = [
  {
    id: "lesson-100",
    slug: "what-is-a-loop",
    phaseId: "phase-1",
    titleKo: "루프란 무엇인가",
    titleEn: "What is a loop",
    hook: "매일 같은 일을 다시 한다면, 그 반복은 이미 작은 루프예요.",
    summary: "AI Builder School 전체를 관통하는 7-step 학습 루프의 뜻을 배우고, 내 일에서 매일 도는 루프 한 개를 카드로 그립니다.",
    level: "beginner",
    estimatedMinutes: 35,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: [],
    learningGoals: [
      "루프를 input, process, check, repeat 네 단계로 설명할 수 있다",
      "학습 루프, 작업 루프, 자동 루프의 차이를 예시로 구분한다",
      "내 일에서 매일 반복되는 루프 한 개를 카드로 시각화한다",
      "이후 모든 레슨의 7-step 구조를 루프로 읽을 수 있다",
    ],
    problemScenario:
      "매일 아침 비슷한 보고서를 열고, 어제 숫자를 넣고, 문장을 다듬고, 팀장에게 보내기 전에 다시 확인합니다. 그런데 매번 처음 하는 일처럼 느껴진다면 반복은 있지만 루프는 없는 상태예요. 루프는 같은 일을 다시 하는 것이 아니라, 다시 할 때 조금 더 나아지게 만드는 구조입니다.",
    coreConcepts: [
      {
        term: "Input → Process → Check → Repeat",
        explanation: "루프는 들어오는 재료, 처리 방식, 확인 기준, 다음 회차로 넘길 개선점으로 이루어집니다.",
      },
      {
        term: "Learning Loop",
        explanation: "배운 뒤 바로 써보고, 결과를 확인하고, 다음 시도에 반영하는 학습 구조입니다.",
      },
      {
        term: "Work Loop",
        explanation: "보고서, 회의록, 고객 답변처럼 매일 같은 자리에서 반복되는 업무 흐름입니다.",
      },
      {
        term: "Automation Loop",
        explanation: "사람이 기준을 정해두면 AI나 도구가 일부 단계를 반복 실행하는 구조입니다.",
      },
    ],
    codexMission:
      "Codex에게 내 하루 업무 중 매일 반복되는 작업 5개를 묻고, 그중 하나를 input, process, check, repeat 카드로 정리하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `loop-card.md` 파일을 만들게 하고, 내 일의 한 사이클과 5% 개선 지점을 카드 형태로 채운다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 35분 안에 끝내는 걸 목표로 하세요.\n\n작업. 내 일에서 매일 반복되는 루프 한 개를 골라 `loop-card.md`로 정리합니다.\n\n포함할 내용.\n1. 내 일의 한 사이클을 한 줄로 씁니다.\n2. input, process, check, repeat 네 칸을 채웁니다.\n3. 매일 같은 자리와 시간을 정합니다.\n4. 다음 회차에 5%만 좋아질 개선 지점 한 곳을 고릅니다.\n5. 한 주 뒤 회고할 질문을 남깁니다.\n\n에이전트에게 당신의 직군, 자주 만드는 산출물, 매일 반복되는 작업을 짧게 알려주세요. 그래야 일반적인 루프가 아니라 내 일의 루프가 됩니다.",
    codexNote:
      "Codex CLI에서는 먼저 업무 후보 5개를 표로 뽑게 한 뒤, 하나만 골라 `loop-card.md`로 확장하라고 요청하면 결과가 안정적입니다.",
    buildSteps: [
      "오늘 또는 어제 했던 반복 작업 5개를 적는다",
      "그중 매일 같은 시간대에 돌아오는 작업 1개를 고른다",
      "input, process, check, repeat 네 칸으로 나눈다",
      "check 단계에서 사람이 꼭 봐야 하는 기준을 한 줄로 적는다",
      "다음 회차에 5% 개선할 자리 한 곳과 회고 시간을 정한다",
    ],
    verificationChecklist: [
      "한 사이클이 한 줄로 구체적으로 적혀 있는가",
      "input, process, check, repeat 네 칸이 모두 채워졌는가",
      "매일 같은 자리와 시간이 실제 일정과 연결되어 있는가",
      "5% 개선 지점이 너무 크지 않고 바로 시도 가능한가",
      "한 주 뒤 회고할 회수와 변화 기준이 정해졌는가",
    ],
    deliverable: {
      title: "내 일의 루프 카드",
      description: "매일 반복되는 작업 하나를 input, process, check, repeat로 시각화한 한 장.",
      format: "Markdown 파일(.md) · 1페이지",
    },
    reflectionQuestions: [
      "내가 매일 반복하지만 아직 루프로 관리하지 않는 일은 무엇인가요?",
      "AI가 도와도 되는 단계와 사람이 확인해야 하는 단계는 어디인가요?",
      "다음 한 주 동안 몇 번이나 같은 루프를 돌릴 수 있나요?",
    ],
    extensionIdeas: [
      "루프 카드를 주간 회고 템플릿에 붙여 매주 업데이트합니다",
      "팀원 한 명의 루프 카드와 비교해 공통 check 기준을 찾습니다",
      "Phase 2에서 이 루프를 프롬프트 템플릿으로 바꿉니다",
    ],
    tags: ["loop", "literacy", "meta-learning"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "loop-card.md",
        title: "내 일의 루프 카드 템플릿",
        kind: "note",
      },
    ],
  },
  {
    id: "lesson-101",
    slug: "common-skills-of-future-proof-people",
    phaseId: "phase-1",
    titleKo: "AI 시대에 뒤쳐지지 않는 사람들의 공통 역량",
    titleEn: "Common skills of future-proof people",
    hook: "AI가 더 잘하는 일에 내 시간을 쓰지 않는 것 — 이것이 버티는 사람의 첫 번째 기술입니다.",
    summary: "AI 시대에 대체되지 않는 사람들이 공통으로 가진 판단·검증·학습 습관을 정리합니다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: [],
    learningGoals: [
      "'AI를 쓰는 사람'과 'AI로 만드는 사람'의 차이를 한 문장으로 설명할 수 있다",
      "자기만의 AI 판단 체크리스트 v1을 작성한다",
      "주 1회 이상 돌릴 AI 사용 회고 루틴을 세운다",
    ],
    problemScenario:
      "\"AI 쓰면 되는 거 아냐?\" 라는 말은 요즘 회식 자리마다 나옵니다. 그런데 막상 중요한 보고서를 받아보면 \"근거가 없네\", \"이거 사실이야?\" 같은 한 마디에 폐기됩니다. AI를 '쓰기는' 했는데 실무에 붙지 않는 이 틈 — 여기서부터 대화를 시작합니다.",
    coreConcepts: [
      {
        term: "Human-in-the-loop",
        explanation: "AI 산출물의 품질은 결국 사람의 검토 지점에서 결정됩니다. 어디에 사람을 끼울지 미리 정해둡니다.",
      },
      {
        term: "근거 요구 습관",
        explanation: "답을 받을 때 '출처·가정·한계'를 함께 요구하면 환각이 급격히 줄어듭니다.",
      },
      {
        term: "AI 사용 회고",
        explanation: "'AI가 잘한 것'과 '내가 바로잡은 것'을 매주 기록하면, 다음 주 프롬프트가 저절로 좋아집니다.",
      },
    ],
    codexMission:
      "Codex에게 '오늘 내가 AI에게 맡긴 일 3가지를 표로 정리하고, 각 항목에 대해 AI가 실수할 가능성이 가장 큰 포인트를 한 줄씩 적어달라'고 요청한다. 출력 형식을 Markdown 표로 고정한다.",
    claudeCodeMission:
      "Claude Code에게 `judgment-checklist.md` 파일을 만들고, 아래 섹션을 포함하도록 지시한다: 1) AI에게 맡길 때 위험한 일, 2) 내가 반드시 검토해야 하는 지점, 3) 이번 주 회고 양식.",
    mission:
      "Claude Code(또는 선호하는 코딩 에이전트)에게 아래 작업을 맡깁니다. 40분 안에 끝내는 걸 목표로 하세요.\n\n작업: 당신의 실제 업무 맥락을 반영한 `judgment-checklist.md`를 만듭니다.\n\n포함해야 할 섹션:\n1. \"AI에게 맡겨도 되는 일\" (예: 초안, 요약, 리서치 확장)\n2. \"AI에게 맡기면 위험한 일\" (예: 숫자 계산, 법적 문구, 사실 검증)\n3. \"내가 반드시 검토해야 하는 지점\" — 체크리스트 5개 이상\n4. \"이번 주 회고 양식\" — 'AI가 한 것 / 내가 바로잡은 것 / 다음에 바꿀 것' 3문\n\n에이전트에게 '당신의 업무'가 무엇인지 3문장 이내로 설명해 주세요. 그래야 일반론이 아니라 내 것에 붙는 체크리스트가 나옵니다.",
    codexNote:
      "Codex CLI에서는 파일 생성을 위해 `codex file create judgment-checklist.md` 형태로 명시적으로 요청하면 출력이 안정적입니다. 이후 대화에서 Codex가 같은 파일을 '다시 쓰지 않도록' 경로를 명시하세요.",
    buildSteps: [
      "오늘 내가 AI에게 맡긴 일 3가지를 기록한다",
      "각 항목에 대해 '가장 위험한 실수 지점'을 한 줄로 적는다",
      "판단 체크리스트 초안을 Markdown으로 작성한다 (위 미션 프롬프트 사용)",
      "회고 양식을 만들고 이번 주 금요일 오후 시간에 미리 넣어둔다",
      "동료 한 명에게 체크리스트를 보내고 한 줄 코멘트를 받는다",
    ],
    verificationChecklist: [
      "체크리스트가 최소 5개 항목을 포함하는가",
      "AI가 틀릴 수 있는 구체 시나리오가 적혀 있는가 (추상적 표현 아님)",
      "내가 검토해야 할 단계가 업무 흐름과 연결되어 있는가",
      "회고 주기와 실제 캘린더 슬롯이 정해져 있는가",
      "이 체크리스트를 내일 아침 실제로 적용할 수 있는가",
    ],
    deliverable: {
      title: "AI 사용 판단 체크리스트 v1",
      description: "개인 작업 맥락에 맞춘 판단 체크리스트 + 주간 회고 양식 한 장.",
      format: "Markdown 파일(.md) · 1페이지 이내",
    },
    reflectionQuestions: [
      "AI가 내 역할 중 대체할 수 있는 부분과, 절대 대체할 수 없는 부분은 무엇인가요?",
      "이번 주 AI의 답 중 가장 위험했던 것은 무엇이었나요?",
      "다음 주에는 어떤 단계에서 '사람 검토 지점'을 추가할 건가요?",
    ],
    extensionIdeas: [
      "팀 공용 체크리스트로 확장해 공유합니다",
      "체크리스트를 Claude Code 커스텀 슬래시 명령으로 저장해 매번 한 줄로 불러옵니다",
      "월 1회 '환각 발견 사례' 모음집을 만들어 회고 입력으로 씁니다",
    ],
    tags: ["literacy", "mindset", "checklist"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "judgment-checklist.md",
        title: "AI 사용 판단 체크리스트 v1 템플릿",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-102",
    slug: "what-llms-are-good-and-bad-at",
    phaseId: "phase-1",
    titleKo: "LLM이 잘하는 일과 못하는 일",
    titleEn: "What LLMs are good and bad at",
    hook: "LLM의 능력은 \"얼마나 똑똑한가\"가 아니라 \"어떤 모양의 일에 강한가\"로 봐야 합니다.",
    summary: "LLM이 구조적으로 잘하는 작업과 구조적으로 취약한 작업을 분리해 내 업무에 매핑하는 지도를 만듭니다.",
    level: "beginner",
    estimatedMinutes: 45,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["common-skills-of-future-proof-people"],
    learningGoals: [
      "LLM이 구조적으로 강한 영역 4가지를 예시로 설명할 수 있다",
      "LLM이 구조적으로 약한 영역 4가지를 예시로 설명할 수 있다",
      "내 주간 업무 10개를 강함 / 약함 / 보조 가능으로 분류한다",
      "약한 업무 옆에 '사람 검토 지점'을 명시한다",
    ],
    problemScenario:
      "엑셀 숫자 합계를 LLM에게 시켰더니 그럴듯한 답을 줬는데 실제로는 틀려 있었습니다. 같은 모델이 어제는 멋진 보고서를 써줬는데, 오늘은 간단한 계산을 틀립니다. 모델이 \"점점 멍청해지는\" 게 아니라, **모델이 잘하는 일과 못하는 일의 모양이 따로 있는** 겁니다. 그 모양을 알아야 어디에 맡기고 어디에 맡기지 않을지 결정할 수 있습니다.",
    coreConcepts: [
      {
        term: "패턴 일반화 (Pattern generalization)",
        explanation: "LLM은 학습한 텍스트의 패턴을 잇는 데 강합니다. 그래서 '문장 다시 쓰기·요약·분류·재구성'은 잘하지만, 패턴이 적은 새 영역이나 정확한 수치는 약합니다.",
      },
      {
        term: "문맥 창 (Context Window)",
        explanation: "모델이 한 번에 볼 수 있는 정보의 양에는 한계가 있습니다. 초과하면 앞쪽 정보가 잊히거나 흐려집니다. 긴 문서를 한 번에 던지면 품질이 떨어지는 이유입니다.",
      },
      {
        term: "확률적 생성 (Stochastic generation)",
        explanation: "LLM은 다음 토큰을 확률로 고릅니다. 같은 질문에 매번 다른 답이 나올 수 있고, 그래서 정확성이 결정적인 작업(법률 조항, 수치 합산)에는 위험합니다.",
      },
      {
        term: "Knowledge cutoff",
        explanation: "모델이 학습한 시점 이후의 사실은 모릅니다. 최신 시장 수치, 어제 발표된 정책 같은 건 외부 자료를 함께 주지 않으면 안전하게 못 말합니다.",
      },
    ],
    codexMission:
      "Codex에게 자신의 주간 업무 10개를 표로 만들고, 각각을 '강함/약함/보조 가능'으로 분류해 근거를 한 줄씩 적어달라고 요청한다.",
    claudeCodeMission:
      "Claude Code에게 `llm-strengths.md` 파일을 만들고, 내 업무 목록을 분류표로 정리하게 한다. 분류 기준과 예시를 주석으로 남긴다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 45분 안에 끝내는 걸 목표로 하세요.\n\n작업: 내 주간 업무를 LLM 강·약 기준으로 매핑한 `llm-strengths-map.md`를 만듭니다.\n\n포함할 섹션:\n1. \"내 주간 업무 10개\" — 실제로 매주 반복되는 일을 적습니다 (회의록 정리, 보고서 초안, 데이터 검증, 고객 답변 등)\n2. 각 업무에 대해 다음 분류를 표로 표시:\n   - **강함** (LLM에게 맡겨도 안전) · 근거 1줄\n   - **보조 가능** (초안만 받고 사람이 검토) · 검토 지점 1줄\n   - **약함** (사람이 직접) · 위험 1줄\n3. \"공통 패턴\" — 분류 결과에서 보이는 내 업무의 LLM 친화도 (예: \"우리 팀 업무의 70%는 보조 가능, 20%는 강함, 10%는 약함\")\n\n에이전트에게 당신의 직군·산업·주된 산출물을 3문장으로 알려주세요. 그래야 일반론적인 표가 아니라 당신 업무에 붙는 표가 나옵니다.",
    codexNote:
      "Codex CLI는 표 출력을 하다가 중간에 끊는 경우가 있습니다. \"Markdown 표 한 번에 출력하고 끝내라\"는 명시적 지시를 추가하면 안정적입니다.",
    buildSteps: [
      "내 주간 업무 10개를 머릿속에서 끄집어내 메모합니다 (5분)",
      "위 미션 프롬프트로 Claude Code에게 분류표를 만들게 합니다",
      "분류 결과를 보고 \"어? 이건 다른 칸이 맞는데?\" 싶은 항목 2~3개를 직접 옮깁니다",
      "약함 칸 항목마다 '내가 검토해야 할 단 한 가지'를 적습니다",
      "강함 칸 항목 중 하나를 골라 다음 주에 실제로 LLM에 맡겨봅니다",
    ],
    verificationChecklist: [
      "10개 업무가 모두 강함 / 보조 가능 / 약함 중 하나로 분류되었는가",
      "수치 계산·사실 검증·법적 표현 같은 업무가 '약함'에 들어갔는가",
      "각 분류에 대해 그렇게 본 근거가 한 줄씩 적혀 있는가",
      "약함 항목마다 '사람 검토 지점' 또는 '대안'이 적혀 있는가",
      "다음 주에 실제로 시도할 LLM 작업이 1개 이상 정해져 있는가",
    ],
    deliverable: {
      title: "LLM 강·약점 매핑 지도",
      description: "내 업무에 LLM을 어디까지 맡길지 한 장으로 보여주는 매핑표.",
      format: "Markdown 표 (.md) · 1페이지 이내",
    },
    reflectionQuestions: [
      "분류 결과 중 가장 의외였던 항목은 무엇이었나요?",
      "지금까지 잘못된 칸에 두고 LLM에 맡겨왔던 업무가 있나요?",
      "약함 칸을 줄이려면 LLM 외에 어떤 도구·사람을 결합해야 할까요?",
    ],
    extensionIdeas: [
      "팀원 3명과 같은 분류를 해보고 차이의 원인을 분석합니다",
      "약함 칸 업무에 자동 검증 단계(예: 숫자 검산기)를 연결합니다",
      "분기별로 분류표를 갱신해 LLM 발전에 따라 칸이 어떻게 이동하는지 추적합니다",
    ],
    tags: ["literacy", "limits", "mapping"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "llm-strengths-map.md",
        title: "LLM 강·약점 매핑 지도 템플릿",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-103",
    slug: "hallucination-verification",
    phaseId: "phase-1",
    titleKo: "환각(Hallucination)을 잡는 검증법",
    titleEn: "Catching hallucinations",
    hook: "AI는 \"모른다\"라고 말하는 능력이 약합니다. 그래서 검증은 사용자의 일이 됩니다.",
    summary: "그럴듯하지만 틀린 답을 실무 직전 단계에서 걸러내는 4단 검증 루프를 만들고, 재사용 가능한 템플릿으로 저장합니다.",
    level: "beginner",
    estimatedMinutes: 45,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["what-llms-are-good-and-bad-at"],
    learningGoals: [
      "환각이 구조적으로 발생하는 3가지 상황을 안다",
      "Citation-required와 Chain of Verification 두 가지 방어 패턴을 직접 쓴다",
      "내 분야에서 가장 위험한 환각 유형을 한 줄로 정의한다",
      "검증 루프를 재사용 가능한 프롬프트 템플릿으로 저장한다",
    ],
    problemScenario:
      "지난주 Claude가 인용한 논문이 그럴싸한 제목과 저자, 발행연도까지 갖추고 있었습니다. 실제로 검색해보니 그런 논문은 존재하지 않았어요. 한 번 데였더니 다른 인용도 의심스러워집니다. 이런 환각을 \"AI 잘못\"으로 두면 매번 의심하느라 생산성이 떨어지고, \"내 책임\"으로 두면 모든 답을 직접 검증해야 합니다. 둘 다 답이 아니에요. **답을 받기 전부터 검증을 강제하는 시스템**이 필요합니다.",
    coreConcepts: [
      {
        term: "Hallucination (환각)",
        explanation: "AI가 존재하지 않거나 부정확한 정보를 사실처럼 만들어내는 현상. 모델이 거짓말을 하는 것이 아니라, 패턴상 \"그럴듯한 다음 토큰\"을 고른 결과입니다. 즉 환각은 버그가 아니라 모델의 본질에 가깝습니다.",
      },
      {
        term: "Citation-required 프롬프트",
        explanation: "\"각 주장에 출처를 함께 표기하라. 출처를 못 찾으면 답하지 말고 그 이유를 설명하라\"는 강제 조항. 모델이 \"모름\"이라 말할 수 있는 출구를 만드는 것이 핵심입니다.",
      },
      {
        term: "Chain of Verification (CoVe)",
        explanation: "답을 받은 뒤 \"이 답을 검증할 질문 3개를 만들어 봐 → 그 질문에 답해 봐 → 결과가 처음 답과 일치하는가?\"를 같은 모델에게 시키는 자기 검증 패턴. 단일 호출보다 환각이 줄어듭니다.",
      },
      {
        term: "Confidence Calibration",
        explanation: "모델에게 답마다 신뢰도(0~100)를 추정해 달라고 요청하는 습관. 절대값이 정확하진 않지만, \"낮은 신뢰도 + 높은 단정 어조\"의 조합이 환각의 가장 강한 신호가 됩니다.",
      },
    ],
    codexMission:
      "Codex에게 '다음 질문에 답하되, 출처가 불확실하면 답하지 말고 이유를 설명하라'는 템플릿을 만들어 재사용 스니펫으로 저장한다.",
    claudeCodeMission:
      "Claude Code에게 `verify-loop.md`에 '답 → 출처 → 반례 → 재답'의 4단 검증 루프 예제를 적게 한다. 실제 질문 2개로 테스트를 포함한다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 45분 안에 끝내는 걸 목표로 하세요.\n\n작업: 재사용 가능한 환각 방지·검증 템플릿 `verify-loop.md`를 만듭니다.\n\n포함할 섹션:\n1. \"내 분야에서 가장 위험한 환각 유형 3가지\" — 직군·산업에 맞춰 구체화 (예: 법률 인용 / 의료 통계 / 최신 시장 수치)\n2. \"Citation-required 프롬프트\" — 각 주장에 출처 강제, 출처 못 찾으면 답 거부\n3. \"Chain of Verification 4단 루프\" — 답 → 검증 질문 생성 → 검증 답 → 일치 확인\n4. \"Confidence 점수 요청\" — 답마다 0~100 신뢰도 + \"왜 이 점수인가\" 한 줄\n5. \"실제 테스트\" — 위 패턴들을 적용한 질문 2개와 각 결과 비교\n\n에이전트에게 당신의 직군·자주 인용하는 자료의 종류를 3문장으로 알려주세요. 일반론이 아니라 당신의 환각 위험에 맞는 템플릿이 나옵니다.",
    codexNote:
      "Codex는 긴 멀티 섹션 출력을 한 번에 끝까지 안 내는 경우가 있습니다. \"5개 섹션을 모두 한 번의 응답으로 출력하고, 중간에 끊으면 안 된다\"는 명시 지시를 추가하세요.",
    buildSteps: [
      "내가 자주 받는 답 중 \"출처가 의심스러웠던\" 사례 3개를 메모합니다 (5분)",
      "그 3개에 대해 위 미션 프롬프트로 verify-loop.md를 생성합니다",
      "같은 질문을 [기본 답] / [Citation-required 답] / [CoVe 4단 루프] 세 가지로 돌려봅니다",
      "세 결과를 비교해 \"가장 안전했던 패턴\"에 표시합니다",
      "그 패턴을 Claude Code의 커스텀 명령 또는 Notion 스니펫으로 저장해 1주일간 실제 사용합니다",
    ],
    verificationChecklist: [
      "출처가 없으면 답을 거부하는 지시가 템플릿에 들어 있는가",
      "Chain of Verification 4단 루프가 실제 작동하는 예시 1개로 검증되었는가",
      "내 분야의 가장 위험한 환각 유형 3개가 구체적으로 적혀 있는가",
      "Confidence 점수와 그 근거를 함께 받는 패턴이 들어 있는가",
      "이 템플릿이 내일 아침 실제로 호출 가능한 위치에 저장되어 있는가",
    ],
    deliverable: {
      title: "환각 검증 템플릿 verify-loop.md",
      description: "Citation-required + CoVe + Confidence 세 패턴을 묶은 재사용 템플릿. 내 분야의 위험 환각 유형 3개와 실제 테스트 사례 포함.",
      format: "Markdown 파일(.md) · 1~2 페이지",
    },
    reflectionQuestions: [
      "내 업무에서 가장 치명적인 환각이 발생할 수 있는 지점은 어디인가요?",
      "AI가 \"모르겠다\"고 답하지 못하게 만드는 내 프롬프트 습관이 혹시 있나요?",
      "검증 루프 없이 답을 그대로 쓴 적이 있다면, 어떤 비용이 있었나요?",
    ],
    extensionIdeas: [
      "팀 공용 \"환각 발견 로그\"를 만들어 매주 사례를 누적합니다",
      "이 템플릿을 RAG 시스템 (Phase 6)의 인용 강제 프롬프트로 확장합니다",
      "월 1회 \"내 업계의 환각 위험 지도\"를 갱신해 동료에게 공유합니다",
    ],
    tags: ["literacy", "verification", "hallucination"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "verify-loop.md",
        title: "환각 검증 4단 루프 템플릿",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-104",
    slug: "checks-before-trusting-ai-output",
    phaseId: "phase-1",
    titleKo: "AI 결과를 신뢰하기 전 확인할 것",
    titleEn: "Checks before trusting AI output",
    hook: "100% 신뢰하면 사고가 나고, 100% 의심하면 일이 안 됩니다. 5분이면 그 사이를 결정할 수 있습니다.",
    summary: "AI 산출물을 실무에 쓰기 직전, 5분 안에 돌릴 수 있는 5축 자기 체크 루틴(FOSCB)을 만들고 매일 호출 가능한 위치에 저장합니다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["hallucination-verification"],
    learningGoals: [
      "5축 트러스트 체크(사실/출처/가정/범위/편향)를 1분 단위로 분배해 5분 안에 돌린다",
      "내 도메인의 \"위험 가중\" 축을 식별해 한 축에 시간을 더 쓰는 규칙을 만든다",
      "Lesson 1.1·02·03의 산출물(판단 체크리스트 / 강약 지도 / 환각 검증 루프)을 이 루틴 안에 통합한다",
      "이 체크를 매일 같은 시간·같은 위치에서 호출하는 습관을 시작한다",
    ],
    problemScenario:
      "보고서를 90% 끝냈고 1시간 뒤에 발표입니다. 그런데 한 페이지의 인용 수치가 갑자기 의심스러워졌어요. \"한 번만 더 검색해 볼까\" 하는 사이에 시간이 줄어듭니다. **검토할 시간이 없는 게 아니라, 검토의 우선순위가 없는 것**이 진짜 문제예요. 5분이면 충분한데, 그 5분을 어디에 쓸지 모를 뿐입니다. 오늘은 그 5분의 동선을 미리 짜둡니다.",
    coreConcepts: [
      {
        term: "5-Minute Trust Check (FOSCB)",
        explanation:
          "Fact(사실) · Origin(출처) · Scope(범위) · Confidence(신뢰) · Bias(편향) 5축을 각 1분씩 점검하는 루틴. 시간을 쪼개 강제 분배하는 것이 핵심 — \"전체 검토\"가 아니라 \"축별 60초 스캔\".",
      },
      {
        term: "위험 가중 (Risk Weight)",
        explanation:
          "도메인마다 위험이 큰 축이 다릅니다. 의료·법·금융은 사실/출처에 시간 더, 마케팅·콘텐츠는 편향/범위에 시간 더, 데이터 분석은 가정/신뢰에 시간 더. 5분의 분배 비율을 자기 도메인에 맞춰 조정합니다.",
      },
      {
        term: "Trust Floor / Trust Ceiling",
        explanation:
          "내가 \"검토 없이 그대로 써도 되는 답\"의 최소 기준(Floor)과 \"아무리 검토해도 위험해서 안 쓰는\" 상한선(Ceiling). 매일 루틴 안에서 이 두 선을 갱신합니다. AI가 좋아질수록 Floor가 올라가고 Ceiling이 명확해져요.",
      },
      {
        term: "체크 통합 (Check Stacking)",
        explanation:
          "Lesson 1.1의 판단 체크리스트, Lesson 1.2의 강·약점 지도, Lesson 1.3의 환각 검증 루프 — 개별 도구들이 5분 트러스트 체크 안에서 한 번에 호출되도록 연결합니다. 도구가 분산되면 결국 안 씁니다.",
      },
    ],
    codexMission:
      "Codex에게 `trust-check.md`를 만들게 하고, '사실/출처/가정/범위/편향' 5개 섹션에 각 3개 질문을 작성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 5분 체크 루틴을 커스텀 슬래시 명령으로 저장하는 방법을 제안받고 시험 적용한다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 40분 안에 끝내는 걸 목표로 하세요.\n\n작업: 매일 호출 가능한 `trust-check.md` 한 장을 만듭니다.\n\n포함할 섹션:\n1. \"내 도메인 위험 가중\" — 5축 중 어느 축에 시간을 더 쓸지 비율(예: 사실 90s / 출처 60s / 범위 30s / 신뢰 60s / 편향 60s)\n2. \"5축 60초 질문 세트\" — 각 축마다 60초 안에 답할 수 있는 검사 질문 3~4개 (예: 사실 → \"수치/이름/날짜가 원본과 일치하는가?\")\n3. \"통합 호출\" — Lesson 1.1 판단 체크리스트 / Lesson 1.2 강·약점 지도 / Lesson 1.3 환각 검증 루프 중 어느 것을 어느 축에서 호출할지 매핑\n4. \"Trust Floor / Ceiling\" — 검토 없이 써도 되는 답의 최소 기준, 절대 안 쓰는 상한선 정의\n5. \"호출 약속\" — 매일 어느 시간·어느 도구에서 이 루틴을 켤지 (예: \"매일 보고서 발송 직전, Notion에서\")\n\n에이전트에게 당신의 도메인·일주일에 받는 AI 산출물 종류·가장 위험했던 사고 사례 1개를 알려주세요. 일반론적인 5축이 아니라 당신의 5축이 나옵니다.",
    codexNote:
      "Codex CLI는 5축 같은 다축 표를 만들 때 가끔 한 축을 빼먹습니다. \"5축 모두를 동일한 양식으로, 빠짐없이 출력하라\"는 명시 지시 + 마지막에 \"5축 모두 포함되었는지 자가 확인하라\"를 추가하면 안정적입니다.",
    buildSteps: [
      "최근 일주일간 AI에게 받은 산출물 중 \"의심스러웠지만 그대로 쓴 것\" 1개를 사례로 고릅니다 (5분)",
      "위 미션 프롬프트로 Claude Code에게 trust-check.md 초안을 받습니다",
      "사례에 5축 60초 질문을 실제로 적용해 보고, 발견되는 문제 수를 기록합니다",
      "위험 가중 비율을 내 도메인에 맞게 다시 조정합니다 (예: 의료라면 사실 120s)",
      "이 체크 위치를 \"매일 호출되는 자리\"에 고정합니다 (Notion 데일리 페이지 / Obsidian 데일리 노트 / Claude Code 슬래시 명령 등)",
    ],
    verificationChecklist: [
      "5축(사실/출처/범위/신뢰/편향)이 모두 포함되어 있는가",
      "각 축이 60초 안에 답할 수 있는 구체 질문 3~4개로 채워져 있는가",
      "내 도메인 위험 가중이 명시되어 있는가 (모든 축이 균등하면 위험 가중이 안 된 것)",
      "Lesson 1.1·02·03 산출물 중 최소 1개가 명시적으로 호출되고 있는가",
      "이 체크가 \"매일 호출되는 위치\"에 실제로 저장되어 있는가",
    ],
    deliverable: {
      title: "5분 트러스트 체크 루틴 trust-check.md",
      description:
        "FOSCB 5축 + 위험 가중 + Trust Floor/Ceiling + Lesson 1.1-03 통합 호출이 들어간 매일 루틴 한 장.",
      format: "Markdown 파일(.md) · 1페이지 이내, 매일 호출되는 위치에 고정",
    },
    reflectionQuestions: [
      "지난 일주일 동안 \"의심하면서도 그대로 쓴 답\"의 비용은 얼마였나요? 시간으로 / 신뢰로 / 돈으로",
      "내 도메인에서 가장 짧게 끝낼 수 있는 축은 무엇이고, 가장 길게 봐야 할 축은 무엇인가요?",
      "이 5분 루틴을 매일 같은 자리에서 호출하지 못하게 만드는 마찰이 있다면 무엇인가요?",
    ],
    extensionIdeas: [
      "팀에 5분 체크를 \"리뷰 의무\"가 아니라 \"발표 전 1분 의식\"으로 도입합니다",
      "위험 가중 분포를 분기마다 갱신해 도메인 변화를 추적합니다",
      "5축 중 자주 실패하는 축에 자동 검증 스크립트(검색 / 계산 / 출처 확인)를 붙입니다",
    ],
    tags: ["literacy", "review", "routine", "phase-1-capstone"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "trust-check.md",
        title: "5-Minute Trust Check 루틴 템플릿 (FOSCB)",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-201",
    slug: "structure-of-good-prompts",
    phaseId: "phase-2",
    titleKo: "좋은 프롬프트의 구조",
    titleEn: "Structure of good prompts",
    summary: "작업/맥락/제약/출력 네 가지 축으로 프롬프트를 분리해 재현 가능성을 높인다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["checks-before-trusting-ai-output"],
    learningGoals: [
      "Task/Context/Constraints/Output 4축을 설명한다",
      "모호한 프롬프트를 구조적 프롬프트로 리팩터링한다",
    ],
    problemScenario:
      "같은 질문을 해도 AI마다, 세션마다 답이 다르다. 재현 가능한 프롬프트는 어떻게 쓰나?",
    coreConcepts: [
      { term: "Task", explanation: "AI가 해야 할 최종 결과물." },
      { term: "Context", explanation: "AI가 알아야 할 배경/사용자/도메인." },
      { term: "Constraints", explanation: "금지/허용/톤/길이 같은 제약." },
      { term: "Output", explanation: "결과물의 형식/스키마/예시." },
    ],
    codexMission:
      "Codex에게 기존에 써오던 모호한 프롬프트 3개를 받아 4축 구조로 리팩터링해 달라고 요청하고, Before/After를 표로 저장한다.",
    claudeCodeMission:
      "Claude Code에게 `prompt-templates/` 폴더를 만들고 '보고서 초안', '회의록 요약', '버그 리포트 정리' 3개 템플릿을 4축 구조로 작성하게 한다.",
    buildSteps: [
      "자주 쓰는 모호한 프롬프트 3개 수집",
      "4축 구조로 리팩터링",
      "결과 비교 후 재사용 템플릿으로 저장",
    ],
    verificationChecklist: [
      "4축(작업/맥락/제약/출력)이 모두 표시되었는가",
      "출력 예시 또는 스키마가 있는가",
      "같은 템플릿으로 2회 실행해 유사한 답이 나오는가",
    ],
    deliverable: {
      title: "4축 프롬프트 템플릿 3개",
      description: "재현 가능한 구조로 재작성된 개인 템플릿.",
      format: "Markdown",
    },
    reflectionQuestions: [
      "Task와 Context가 섞였을 때 어떤 품질 저하가 생겼는가?",
      "출력 예시를 추가했을 때 달라진 점은?",
    ],
    extensionIdeas: [
      "Few-shot 예시를 덧붙여 안정성 비교",
      "템플릿을 Claude Code 슬래시 명령으로 등록",
    ],
    tags: ["prompt", "structure"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "four-axis-prompt.md",
        title: "4축 프롬프트 템플릿 (Task/Context/Constraints/Output)",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-202",
    slug: "enforcing-output-format",
    phaseId: "phase-2",
    titleKo: "출력 형식(Output Format)을 강제하는 법",
    titleEn: "Enforcing output format",
    summary: "JSON, 표, Markdown 스키마를 강제해 다운스트림 자동화를 가능하게 한다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "engineer", "founder"],
    prerequisites: ["structure-of-good-prompts"],
    learningGoals: [
      "JSON 스키마 기반 출력을 강제한다",
      "출력이 스키마에서 이탈했을 때 재시도 전략을 만든다",
    ],
    problemScenario:
      "자동화 파이프라인을 만들려는데 AI가 매번 다른 형식으로 답을 준다. 어떻게 고정시킬까?",
    coreConcepts: [
      { term: "Structured Output", explanation: "스키마 또는 예시를 통해 기계가 읽을 수 있는 형식으로 답하게 하는 기법." },
      { term: "Retry on Parse Error", explanation: "파싱 실패 시 '수정된 JSON만 반환'을 요청해 다시 시도." },
    ],
    codexMission:
      "Codex에게 '회의록 → Action Item JSON' 파이프라인을 만들고, JSON.parse 실패 시 재시도 로직까지 포함하게 한다.",
    claudeCodeMission:
      "Claude Code에게 Node.js 또는 TypeScript 샘플로 구조화 출력 + 재시도 예제를 `examples/structured-output/`에 만들게 한다.",
    buildSteps: [
      "필요한 필드 스키마 정의",
      "프롬프트에 스키마/예시 첨부",
      "파싱 실패 시 재시도 함수 구현",
    ],
    verificationChecklist: [
      "출력이 지정 스키마를 100% 만족하는가",
      "파싱 실패 시 자동 재시도가 동작하는가",
      "스키마가 소스 관리되어 있는가",
    ],
    deliverable: {
      title: "구조화 출력 미니 예제",
      description: "스키마 기반 프롬프트 + 재시도 코드.",
      format: "TypeScript / JS 파일",
    },
    reflectionQuestions: [
      "자유로운 설명과 구조화 출력의 트레이드오프는?",
      "스키마를 어디까지 엄격하게 유지할 것인가?",
    ],
    extensionIdeas: [
      "Zod 등을 활용한 런타임 검증 연결",
      "RAG 결과에 citations 필드 추가",
    ],
    tags: ["prompt", "structured-output"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "structured-output-example.md",
        title: "JSON 스키마 + 재시도 루프 미니 예제",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-203",
    slug: "feeding-long-documents",
    phaseId: "phase-2",
    titleKo: "긴 문서를 AI에게 먹이는 법",
    titleEn: "Feeding long documents to AI",
    summary: "컨텍스트 윈도우를 초과하는 문서를 분할·요약·검색 기반으로 주입한다.",
    level: "beginner",
    estimatedMinutes: 50,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["structure-of-good-prompts"],
    learningGoals: [
      "맥락 윈도우 개념과 한계를 설명한다",
      "분할 요약, 맵-리듀스, 선택적 주입 중 상황에 맞는 전략을 고른다",
    ],
    problemScenario:
      "100페이지 PDF를 통째로 넣었더니 AI가 앞부분을 잊거나 품질이 떨어진다. 어떻게 넣어야 할까?",
    coreConcepts: [
      { term: "Chunking", explanation: "문서를 의미 단위로 잘라 주입하는 기법." },
      { term: "Map-Reduce", explanation: "각 청크를 요약하고, 요약을 다시 합치는 2단계 처리." },
      { term: "Selective Injection", explanation: "질문과 관련 있는 청크만 골라 주입." },
    ],
    codexMission:
      "Codex에게 주어진 긴 문서를 3가지 전략(Full / Map-Reduce / Selective)으로 요약하는 비교 노트를 만들게 한다.",
    claudeCodeMission:
      "Claude Code에게 파일을 읽고 Map-Reduce 요약 스크립트를 작성하도록 하고, 실행 후 결과 품질을 비교 기록한다.",
    buildSteps: [
      "샘플 긴 문서(40~60쪽) 준비",
      "세 전략으로 요약",
      "품질/비용/시간 비교 기록",
    ],
    verificationChecklist: [
      "세 전략 모두 실행 가능한가",
      "같은 질문으로 결과가 비교되는가",
      "각 전략의 장·단점이 기록되어 있는가",
    ],
    deliverable: {
      title: "장문 처리 전략 노트",
      description: "Full / Map-Reduce / Selective 비교 실험 로그.",
      format: "Markdown",
    },
    reflectionQuestions: [
      "비용과 품질의 트레이드오프는 어디서 균형을 찾을 수 있는가?",
      "어떤 작업이 RAG로 가는 것이 맞을까?",
    ],
    extensionIdeas: [
      "Selective Injection을 미니 RAG로 확장",
      "청킹 크기를 바꿔가며 품질 변화를 측정",
    ],
    tags: ["prompt", "long-context"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "long-doc-strategy-comparison.md",
        title: "Full / Map-Reduce / Selective 비교 실험 노트",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-204",
    slug: "build-personal-prompt-library",
    phaseId: "phase-2",
    titleKo: "개인 프롬프트 라이브러리 만들기",
    titleEn: "Build personal prompt library",
    summary: "반복해서 쓰는 프롬프트를 관리하고 버전을 추적하는 구조를 만든다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["structure-of-good-prompts"],
    learningGoals: [
      "프롬프트를 파일/폴더로 버전 관리한다",
      "템플릿 변수 채우기 방식을 설계한다",
      "팀과 공유 가능한 구조로 만든다",
    ],
    problemScenario:
      "프롬프트가 메신저·메모장에 흩어져 있어 수정되어도 어디가 최신인지 모른다.",
    coreConcepts: [
      { term: "Prompt Library", explanation: "역할/목적별 프롬프트를 파일로 관리하는 저장소." },
      { term: "Template Variable", explanation: "{topic}, {audience}처럼 치환 가능한 자리표시자." },
    ],
    codexMission:
      "Codex에게 `prompt-library/` 아래 카테고리 폴더(리서치/보고서/리뷰)와 각 템플릿의 Front Matter(목적/버전/예시)를 표준화하게 한다.",
    claudeCodeMission:
      "Claude Code에게 라이브러리에서 템플릿을 검색·변수 치환하는 미니 CLI를 작성하게 한다.",
    buildSteps: [
      "카테고리 폴더 설계",
      "템플릿 Front Matter 표준 정의",
      "5개 이상 템플릿 이관",
    ],
    verificationChecklist: [
      "모든 템플릿이 버전 필드를 가지는가",
      "변수 치환이 일관되게 동작하는가",
      "팀에 공유 가능한 README가 있는가",
    ],
    deliverable: {
      title: "개인 프롬프트 라이브러리",
      description: "구조화된 템플릿 5개 이상을 담은 폴더.",
      format: "Git 저장소 / Notion DB",
    },
    reflectionQuestions: [
      "가장 자주 수정되는 템플릿은 무엇이고 왜인가?",
      "팀과 공유 시 가장 큰 장애물은?",
    ],
    extensionIdeas: [
      "버전별 A/B 테스트 로그 추가",
      "검색·추천 인터페이스로 확장",
    ],
    tags: ["prompt", "library", "productivity", "phase-2-capstone"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "prompt-library-skeleton.md",
        title: "프롬프트 라이브러리 스켈레톤 (폴더 구조 + Front Matter + 첫 템플릿)",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-205",
    slug: "meta-prompting",
    phaseId: "phase-2",
    titleKo: "메타 프롬프팅 — 프롬프트를 만드는 프롬프트",
    titleEn: "Meta prompting — the prompt that writes the prompt",
    hook: "좋은 프롬프트를 혼자 붙잡고 오래 고민하지 말고, 그 프롬프트를 만드는 일부터 AI에게 맡겨보세요.",
    summary: "Lesson 2.1의 4축을 재귀 적용해 AI가 내 작업에 맞는 정밀 프롬프트를 만들게 하고, 결과를 개인 프롬프트 라이브러리에 저장합니다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: ["build-personal-prompt-library"],
    learningGoals: [
      "메타 프롬프팅을 프롬프트를 만드는 프롬프트로 설명할 수 있다",
      "Task, Context, Constraints, Output을 Goal, Context, Constraints, Done When으로 매핑한다",
      "내 업무 3개에 대해 AI가 만든 정밀 프롬프트를 비교한다",
      "완성된 프롬프트를 개인 라이브러리에 저장하고 버전 약속을 남긴다",
    ],
    problemScenario:
      "막연히 'Pydantic v1을 v2로 바꿔줘'라고 쓰면 AI는 어디를 어떻게 바꿀지 추측합니다. 반대로 AI에게 먼저 좋은 작업 프롬프트를 만들어 달라고 하면 대상 파일, 변환 규칙, 검증 조건, 완료 기준이 한 번에 잡힙니다. 프롬프트를 직접 쓰는 단계에서 프롬프트를 설계하게 하는 단계로 올라가는 거예요.",
    coreConcepts: [
      {
        term: "Goal",
        explanation: "Lesson 2.1의 Task에 해당합니다. AI가 최종적으로 달성해야 할 목표를 구체화합니다.",
      },
      {
        term: "Context",
        explanation: "프로젝트, 독자, 파일, 업무 배경처럼 AI가 알아야 할 주변 정보를 채웁니다.",
      },
      {
        term: "Constraints",
        explanation: "톤, 금지 사항, 도구, 시간, 기존 규칙처럼 반드시 지켜야 할 경계를 정합니다.",
      },
      {
        term: "Done When",
        explanation: "Lesson 2.1의 Output을 한 단계 확장한 완료 기준입니다. 무엇이 나오면 끝인지와 어떻게 확인할지를 적습니다.",
      },
    ],
    codexMission:
      "Codex에게 내 프로젝트를 읽고 /goal이나 일반 작업 요청으로 가장 효과가 큰 후보 3개를 고르게 한 뒤, 각 후보에 대해 Goal, Context, Constraints, Done When 구조의 정밀 프롬프트를 작성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `meta-prompt-template.md`를 만들고, 내 업무 후보 3개에 대해 메타 프롬프트와 AI가 생성한 정밀 프롬프트를 함께 저장하게 한다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 40분 안에 끝내는 걸 목표로 하세요.\n\n작업. 내 일에서 자주 반복되는 작업 3개를 고르고, AI에게 메타 프롬프트를 써서 각 작업의 정밀 프롬프트를 받아 `meta-prompt-template.md`로 정리합니다.\n\n포함할 내용.\n1. 작업 후보 3개를 고릅니다.\n2. Goal, Context, Constraints, Done When 네 칸의 메타 프롬프트를 작성합니다.\n3. AI가 만든 정밀 프롬프트 3개를 저장합니다.\n4. 각 프롬프트를 어느 라이브러리 위치에 둘지 정합니다.\n5. 직접 쓴 프롬프트와 AI가 만든 프롬프트의 차이를 회고합니다.\n\n에이전트에게 당신의 역할, 반복 작업, 현재 쓰는 프롬프트 저장 위치를 알려주세요.",
    codexNote:
      "Codex의 `/goal`을 쓰는 경우에도 원리는 같습니다. 먼저 좋은 `/goal` 문장을 AI에게 만들게 하고, 그 결과를 실행 전에 사람이 검토하세요.",
    buildSteps: [
      "이번 주에 반복해서 요청할 작업 후보 3개를 고른다",
      "각 작업을 Goal, Context, Constraints, Done When 네 칸으로 묻는 메타 프롬프트를 실행한다",
      "AI가 만든 정밀 프롬프트에서 빠진 맥락과 과한 제약을 표시한다",
      "가장 쓸 만한 버전을 개인 프롬프트 라이브러리에 저장한다",
      "다음에 같은 작업을 부를 파일 경로와 버전 규칙을 적는다",
    ],
    verificationChecklist: [
      "작업 후보 3개가 실제 반복 업무에서 나온 것인가",
      "각 정밀 프롬프트에 Goal, Context, Constraints, Done When이 모두 있는가",
      "완료 기준에 검증 방법이 포함되어 있는가",
      "라이브러리 저장 위치와 파일명이 정해졌는가",
      "직접 쓴 프롬프트와 AI가 만든 프롬프트의 차이가 한 줄 이상 기록되었는가",
    ],
    deliverable: {
      title: "메타 프롬프트 템플릿",
      description: "작업 후보 3개, 메타 프롬프트 양식, AI가 만든 정밀 프롬프트 3개, 저장 약속을 담은 템플릿.",
      format: "Markdown 파일(.md)",
    },
    reflectionQuestions: [
      "AI가 내 작업을 더 구체화해 준 지점은 어디였나요?",
      "내가 직접 쓴 프롬프트보다 오히려 과해진 제약은 무엇이었나요?",
      "다음 Phase 자동화에 바로 넣어도 되는 프롬프트는 무엇인가요?",
    ],
    extensionIdeas: [
      "가장 자주 쓰는 메타 프롬프트를 프롬프트 라이브러리의 `_meta/` 폴더에 저장합니다",
      "팀원에게 같은 메타 프롬프트를 써보게 하고 결과 차이를 비교합니다",
      "Phase 4에서 코딩 에이전트의 `/goal` 또는 작업 계획 프롬프트로 확장합니다",
    ],
    tags: ["prompt", "meta-prompting", "library"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "meta-prompt-template.md",
        title: "메타 프롬프트 템플릿",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-301",
    slug: "automate-report-drafts",
    phaseId: "phase-3",
    titleKo: "보고서 초안 자동화",
    titleEn: "Automate report drafts",
    summary: "회사 보고서 템플릿에 맞춘 AI 초안 파이프라인을 만든다.",
    level: "beginner",
    estimatedMinutes: 50,
    targetJourneys: ["practitioner", "adopter", "founder"],
    prerequisites: ["structure-of-good-prompts"],
    learningGoals: [
      "내 회사/팀 보고서 템플릿을 AI가 이해하게 한다",
      "초안→수정→최종 3단 파이프라인을 구축한다",
    ],
    problemScenario:
      "매주 같은 형식의 보고서를 쓰느라 실제 분석에 쓸 시간이 부족하다.",
    coreConcepts: [
      { term: "Template Grounding", explanation: "회사 공식 템플릿을 컨텍스트로 주입해 AI가 일탈하지 않게 한다." },
      { term: "Draft → Review → Final", explanation: "초안, 자기 검토, 사람 검수 3단 루프." },
    ],
    codexMission:
      "Codex에게 지난 보고서 3개를 분석해 공통 구조를 뽑고, 새 주제에 대해 초안을 생성하는 프롬프트를 만들게 한다.",
    claudeCodeMission:
      "Claude Code에게 `report-draft.md` 템플릿과 생성 스크립트를 만들고, 과거 보고서와의 톤 일치 여부를 자기 평가하게 한다.",
    buildSteps: [
      "회사 템플릿을 수집",
      "공통 구조 추출",
      "자동 초안 프롬프트 작성 및 검수 체크리스트 연결",
    ],
    verificationChecklist: [
      "공식 템플릿의 섹션이 빠짐없이 채워지는가",
      "수치/고유명사가 정확한가",
      "톤이 일관되는가",
      "수정 히스토리가 남는가",
    ],
    deliverable: {
      title: "보고서 초안 파이프라인",
      description: "템플릿+프롬프트+체크리스트로 구성된 초안 파이프라인.",
      format: "Markdown + 프롬프트 세트",
    },
    reflectionQuestions: [
      "초안 자동화가 내 실제 시간 절약으로 이어졌는가?",
      "상사가 가장 자주 수정하는 지점은 어디인가?",
    ],
    extensionIdeas: [
      "데이터 시각화 자동 첨부",
      "다국어 초안 버전 확장",
    ],
    tags: ["work-os", "reports"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "report-pipeline.md",
        title: "Template Grounding + 3 단 루프 보고서 파이프라인",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-302",
    slug: "meeting-notes-pipeline",
    phaseId: "phase-3",
    titleKo: "회의록 자동 정리",
    titleEn: "Meeting notes pipeline",
    summary: "녹취/메모 원문을 Action Item 중심 회의록으로 자동 변환한다.",
    level: "beginner",
    estimatedMinutes: 40,
    targetJourneys: ["practitioner", "adopter", "founder"],
    prerequisites: ["enforcing-output-format"],
    learningGoals: [
      "회의록을 Action Item 중심으로 구조화한다",
      "책임자/마감을 놓치지 않는 체크리스트를 만든다",
    ],
    problemScenario:
      "회의 직후 정리할 시간이 없어 일주일 뒤 '누가 뭐 하기로 했지?'가 반복된다.",
    coreConcepts: [
      { term: "Action Item", explanation: "책임자, 기한, 산출물이 명시된 실행 단위." },
      { term: "Speaker Attribution", explanation: "발화자별로 의견/결정을 구분해 기록." },
    ],
    codexMission:
      "Codex에게 녹취 텍스트를 '결정/Action Item/오픈 이슈' 3섹션 JSON으로 구조화하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `meeting-notes.md` 생성 스크립트를 작성하고, 최근 회의 녹취로 품질을 확인하게 한다.",
    buildSteps: [
      "녹취 또는 메모 원본 준비",
      "구조화 프롬프트 실행",
      "Action Item 누락 여부 검토",
    ],
    verificationChecklist: [
      "모든 Action Item에 담당자·마감이 있는가",
      "결정 사항이 오해의 여지 없이 기록되었는가",
      "오픈 이슈가 추적 리스트에 옮겨졌는가",
    ],
    deliverable: {
      title: "회의록 자동 정리 파이프라인",
      description: "녹취→구조화→공유까지의 스크립트 세트.",
      format: "Markdown + JSON 샘플",
    },
    reflectionQuestions: [
      "AI가 자주 놓치는 Action Item 유형은?",
      "회의 진행을 어떻게 바꾸면 AI 정리가 더 잘 될까?",
    ],
    extensionIdeas: [
      "Slack/Notion으로 자동 배포",
      "지난 회의 Action Item 이행률 대시보드",
    ],
    tags: ["work-os", "meetings"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "meeting-pipeline.md",
        title: "회의록 자동 정리 — 스키마·재시도·배포",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-303",
    slug: "research-workflow",
    phaseId: "phase-3",
    titleKo: "리서치 워크플로우 만들기",
    titleEn: "Research workflow",
    summary: "주제 정의→검색→요약→근거 정리→보고까지 이어지는 리서치 파이프라인을 설계한다.",
    level: "beginner",
    estimatedMinutes: 50,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "explorer"],
    prerequisites: ["feeding-long-documents"],
    learningGoals: [
      "리서치 질문을 분해한다",
      "근거 기반으로 요약한다",
      "AI 리서치 결과에 사람 검토를 붙인다",
    ],
    problemScenario:
      "리서치를 AI에 맡기면 속도는 빨라지지만 근거가 빈약한 결과가 자주 나온다.",
    coreConcepts: [
      { term: "Question Decomposition", explanation: "큰 질문을 검증 가능한 하위 질문으로 쪼갠다." },
      { term: "Evidence Table", explanation: "출처/인용/가중치를 정리한 표." },
    ],
    codexMission:
      "Codex에게 리서치 주제를 받아 하위 질문 5개, 검색 키워드 10개, 요약 템플릿을 만들게 한다.",
    claudeCodeMission:
      "Claude Code에게 `research/{topic}/evidence.md` 구조와 자동 채움 스크립트를 만들게 한다.",
    buildSteps: [
      "리서치 주제 선정",
      "질문 분해 및 키워드 확장",
      "근거 수집 → 요약 → 보고서 초안",
    ],
    verificationChecklist: [
      "모든 주장에 출처가 붙어있는가",
      "반박 근거까지 검토했는가",
      "최종 결론의 신뢰도가 명시되었는가",
    ],
    deliverable: {
      title: "리서치 파이프라인 템플릿",
      description: "질문 분해 + 근거 표 + 보고서 초안 템플릿.",
      format: "Markdown + 폴더 구조",
    },
    reflectionQuestions: [
      "AI 리서치가 사람보다 빠르지만 부족한 지점은?",
      "어디서 반드시 사람이 개입해야 하는가?",
    ],
    extensionIdeas: [
      "RAG로 사내 자료 통합",
      "주간 자동 리서치 봇",
    ],
    tags: ["work-os", "research"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "research-pipeline.md",
        title: "Question Decomposition + Evidence Table 리서치 파이프라인",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-304",
    slug: "blog-writing-pipeline",
    phaseId: "phase-3",
    titleKo: "블로그 글쓰기 파이프라인",
    titleEn: "Blog writing pipeline",
    summary: "아이디어→아웃라인→초안→편집→발행까지 AI와 사람이 섞이는 파이프라인을 만든다.",
    level: "beginner",
    estimatedMinutes: 50,
    targetJourneys: ["creator", "practitioner", "adopter", "founder", "explorer"],
    prerequisites: ["structure-of-good-prompts"],
    learningGoals: [
      "아이디어-아웃라인-초안-편집 단계를 분리한다",
      "자기 목소리를 유지하는 편집 루틴을 만든다",
    ],
    problemScenario:
      "AI로 글을 쓰면 빠르지만, '내 목소리'가 사라진다.",
    coreConcepts: [
      { term: "Voice Preservation", explanation: "개인 스타일 샘플을 컨텍스트로 주입해 톤을 유지." },
      { term: "Multi-pass Editing", explanation: "초안/논리/톤/문법 4단계로 나눠 편집." },
    ],
    codexMission:
      "Codex에게 개인 스타일 샘플 3개를 학습 자료로 주고, 새 주제의 아웃라인·초안을 톤을 맞춰 생성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `blog/` 폴더 규약과 편집 루틴(초안→논리→톤→문법)을 만들게 한다.",
    buildSteps: [
      "주제 선정",
      "아웃라인 생성 및 확정",
      "초안→논리→톤→문법 4단 편집",
    ],
    verificationChecklist: [
      "아웃라인이 확정 후 초안이 나왔는가",
      "내 스타일 샘플과 톤이 일치하는가",
      "사실/출처가 확인되었는가",
    ],
    deliverable: {
      title: "블로그 자동화 파이프라인",
      description: "4단 편집 루틴과 스타일 샘플 세트.",
      format: "Markdown / Notion",
    },
    reflectionQuestions: [
      "AI가 쓴 문장과 내가 쓴 문장을 구분할 수 있는가?",
      "편집 루틴의 병목은 어디인가?",
    ],
    extensionIdeas: [
      "뉴스레터/쇼츠 스크립트로 재가공",
      "발행 지표로 역피드백 루프",
    ],
    tags: ["work-os", "content", "phase-3-capstone"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "blog-pipeline.md",
        title: "블로그 4-pass 편집 + Style Capsule",
        kind: "prompt",
      },
    ],
  },
  {
    id: "lesson-401",
    slug: "coding-agent-setup",
    phaseId: "phase-4",
    titleKo: "Codex / Claude Code 작업 환경 세팅",
    titleEn: "Coding agent environment setup",
    summary: "코딩 에이전트를 신뢰할 만큼 실행 가능한 환경을 만든다.",
    level: "beginner",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: [],
    learningGoals: [
      "Codex CLI 또는 Claude Code를 로컬에서 실행한다",
      "권한/비밀/로그 전략을 잡는다",
    ],
    problemScenario:
      "코딩 에이전트를 쓰려 하지만 권한·비밀·로그 정책이 불안해 손이 멈춘다.",
    coreConcepts: [
      { term: "Tool Permissions", explanation: "파일/네트워크/명령 실행 권한의 허용 범위 정의." },
      { term: "Secret Handling", explanation: "API 키, 토큰을 저장·주입하는 안전한 경로." },
    ],
    codexMission:
      "Codex에게 현재 저장소의 권한 허용 목록과 `.env` 사용 규약을 정리하는 `AGENTS.md` 초안을 쓰게 한다.",
    claudeCodeMission:
      "Claude Code에게 `.claude/settings.json` 권한 프로파일과 `CLAUDE.md` 기본 규약을 작성하게 한다.",
    buildSteps: [
      "도구 설치 및 인증",
      "권한/비밀 정책 수립",
      "실습 레포 `my-ai-builder-lab` 초기화",
    ],
    verificationChecklist: [
      "에이전트가 금지된 작업을 거부하는가",
      "비밀이 커밋되지 않는가",
      "명령 로그가 남는가",
    ],
    deliverable: {
      title: "코딩 에이전트 환경",
      description: "권한 프로파일 + 규약 문서 + 실습 레포.",
      format: "Git 저장소",
    },
    reflectionQuestions: [
      "가장 위험해 보이는 자동 실행은 무엇인가?",
      "어떤 단계에서 사람 승인을 반드시 받아야 하는가?",
    ],
    extensionIdeas: [
      "팀용 권한 템플릿 배포",
      "에이전트 행위 로그 수집 파이프라인",
    ],
    tags: ["coding-agents", "setup"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "agent-onboarding.md",
        title: "코딩 에이전트 온보딩 문서",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-402",
    slug: "github-issue-to-ai-brief",
    phaseId: "phase-4",
    titleKo: "GitHub Issue를 AI 작업지시서로 바꾸기",
    titleEn: "GitHub issue → AI brief",
    summary: "애매한 이슈를 재현·검증 가능한 AI 작업지시서로 표준화한다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["coding-agent-setup", "structure-of-good-prompts"],
    learningGoals: [
      "이슈를 재현 스텝/수용 조건으로 정리한다",
      "AI가 처음 보는 저장소에서도 움직이게 한다",
    ],
    problemScenario:
      "'버그 수정해줘'로 이슈가 올라오면 에이전트가 무엇을 해야 할지 모른다.",
    coreConcepts: [
      { term: "Acceptance Criteria", explanation: "완료로 간주할 수 있는 구체 조건." },
      { term: "Reproduction Steps", explanation: "버그/기능 시나리오를 재현하는 순서." },
    ],
    codexMission:
      "Codex에게 이슈 템플릿 `.github/ISSUE_TEMPLATE/ai-brief.md`를 만들고, 지난 이슈 3개를 새 포맷으로 리라이트하게 한다.",
    claudeCodeMission:
      "Claude Code에게 이슈→브리프 변환 커스텀 슬래시 명령을 설계하고 예제를 만들게 한다.",
    buildSteps: [
      "이슈 템플릿 설계",
      "기존 이슈 3개 리라이트",
      "에이전트로 첫 PR 시도",
    ],
    verificationChecklist: [
      "재현 스텝과 수용 조건이 모두 있는가",
      "영향 범위가 명시되어 있는가",
      "AI가 이해해 첫 시도를 하는가",
    ],
    deliverable: {
      title: "AI 브리프 이슈 템플릿",
      description: "재현/수용조건/영향범위를 포함한 템플릿과 예시.",
      format: "Markdown 템플릿",
    },
    reflectionQuestions: [
      "사람이 쓴 이슈와 AI가 읽은 이슈의 간극은 무엇이었나?",
      "어떤 정보가 누락되면 에이전트가 가장 많이 헤매는가?",
    ],
    extensionIdeas: [
      "PR 본문 자동 생성",
      "이슈 자동 분류 봇",
    ],
    tags: ["coding-agents", "workflow"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "issue-to-brief.md",
        title: "GitHub Issue → AI 작업지시서 템플릿",
        kind: "mission",
      },
    ],
  },
  {
    id: "lesson-403",
    slug: "letting-ai-read-codebase",
    phaseId: "phase-4",
    titleKo: "기존 코드베이스를 AI에게 읽히기",
    titleEn: "Letting AI read a codebase",
    summary: "AI가 저장소 구조와 관습을 빠르게 파악하도록 지도 문서를 만든다.",
    level: "intermediate",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["coding-agent-setup"],
    learningGoals: [
      "에이전트용 코드베이스 지도를 작성한다",
      "관심 영역을 빠르게 스캔하는 루틴을 만든다",
    ],
    problemScenario:
      "레포가 커질수록 AI가 엉뚱한 파일을 고치거나 컨벤션을 어긴다.",
    coreConcepts: [
      { term: "Repo Map", explanation: "폴더/모듈/의존 관계/관습을 한 화면에 보이게 한 지도." },
      { term: "Scout Run", explanation: "실제 변경 전에 탐색만 실행해 요약/위험 리포트를 받는 단계." },
    ],
    codexMission:
      "Codex에게 저장소 루트를 스캔해 `docs/repo-map.md`를 생성하게 한다. 관습/테스트 위치/위험 영역을 포함한다.",
    claudeCodeMission:
      "Claude Code에게 Scout Run 전용 슬래시 명령을 설계하고, 변경 전 필수 실행 규칙을 `CLAUDE.md`에 추가하게 한다.",
    buildSteps: [
      "저장소 맵 자동 생성",
      "위험 영역 표시",
      "Scout Run 루틴 습관화",
    ],
    verificationChecklist: [
      "Repo Map이 최신 커밋과 동기화되어 있는가",
      "컨벤션 규칙이 문서화되어 있는가",
      "Scout Run이 루틴으로 자리잡았는가",
    ],
    deliverable: {
      title: "Repo Map + Scout Run 루틴",
      description: "AI가 저장소를 빠르게 이해하도록 돕는 문서와 루틴.",
      format: "Markdown + 슬래시 명령",
    },
    reflectionQuestions: [
      "AI가 가장 많이 오해한 코드 영역은 어디였나?",
      "지도를 최신으로 유지할 오너십은 어떻게 줄 것인가?",
    ],
    extensionIdeas: [
      "지도 자동 업데이트 CI",
      "의존 그래프 시각화 연결",
    ],
    tags: ["coding-agents", "codebase"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "codebase-reading-guide.md",
        title: "Repo Map + Scout Run 코드베이스 읽기 가이드",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-404",
    slug: "plan-with-ai",
    phaseId: "phase-4",
    titleKo: "AI와 함께 구현 계획 세우기",
    titleEn: "Plan with AI",
    summary: "구현 전 '계획서'를 AI와 함께 합의하는 의식을 만든다.",
    level: "intermediate",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["github-issue-to-ai-brief"],
    learningGoals: [
      "구현 전에 합의된 계획을 만든다",
      "AI가 계획을 벗어나지 않게 안전장치를 건다",
    ],
    problemScenario:
      "에이전트가 '일단' 고치기 시작하면 범위가 폭주하거나, 엉뚱한 리팩터링을 한다.",
    coreConcepts: [
      { term: "Implementation Plan", explanation: "변경 파일/테스트 전략/롤백 포인트를 담은 합의 문서." },
      { term: "Stop Points", explanation: "에이전트가 반드시 사람에게 묻게 되는 지점." },
    ],
    codexMission:
      "Codex에게 `docs/plans/<slug>.md` 템플릿을 만들게 하고, 특정 이슈로 실제 계획서를 작성·합의한다.",
    claudeCodeMission:
      "Claude Code에게 계획 모드에서 '파일 목록/테스트/롤백'을 반드시 출력하도록 규약을 추가한다.",
    buildSteps: [
      "계획 템플릿 확정",
      "특정 이슈로 계획 생성",
      "Stop Point 설정",
    ],
    verificationChecklist: [
      "변경 파일 목록이 구체적인가",
      "테스트 전략이 있는가",
      "롤백 포인트가 명시되었는가",
    ],
    deliverable: {
      title: "구현 계획 템플릿 + 실제 계획 1건",
      description: "계획 문서 양식과 실 사례.",
      format: "Markdown",
    },
    reflectionQuestions: [
      "계획을 만들면서 가장 자주 드러나는 빈 구멍은?",
      "어떤 Stop Point가 실제로 사고를 막았나?",
    ],
    extensionIdeas: [
      "계획 자동 생성 명령 만들기",
      "계획 대비 실행 비교 리포트",
    ],
    tags: ["coding-agents", "planning"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "plan-with-ai.md",
        title: "AI 구현 계획 템플릿",
        kind: "mission",
      },
    ],
  },
  {
    id: "lesson-405",
    slug: "write-tests-with-coding-agent",
    phaseId: "phase-4",
    titleKo: "Codex / Claude Code로 테스트 만들기",
    titleEn: "Write tests with coding agent",
    summary: "AI에게 테스트를 먼저 요구해 구현 품질을 끌어올린다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["plan-with-ai"],
    learningGoals: [
      "AI에 실패 테스트 먼저 요구한다",
      "테스트 커버리지와 신뢰도를 분리해 판단한다",
    ],
    problemScenario:
      "에이전트가 구현부터 하면 테스트가 후행되어 취약한 통과만 만들어진다.",
    coreConcepts: [
      { term: "Red → Green", explanation: "실패 테스트부터 작성 후 최소 구현으로 통과시키는 순서." },
      { term: "Golden Path vs Edge", explanation: "행복 경로와 엣지 케이스를 분리해 테스트." },
    ],
    codexMission:
      "Codex에게 특정 기능에 대해 실패 테스트만 먼저 작성하고 멈추게 한다. 이후 리뷰 후 구현을 요청한다.",
    claudeCodeMission:
      "Claude Code에게 테스트 파일을 만들고, 각 케이스에 의도를 주석으로 남기게 한다.",
    buildSteps: [
      "대상 기능 정의",
      "실패 테스트 작성",
      "최소 구현으로 통과",
      "엣지 케이스 추가",
    ],
    verificationChecklist: [
      "실패 테스트가 먼저 존재하는가",
      "엣지 케이스가 분리되어 있는가",
      "테스트 의도가 주석으로 남아 있는가",
    ],
    deliverable: {
      title: "Red→Green 테스트 예제",
      description: "하나의 기능에 대한 실패 테스트-구현 시퀀스.",
      format: "코드 + 설명",
    },
    reflectionQuestions: [
      "AI가 가장 잘 만든 테스트는 어떤 종류였는가?",
      "AI가 놓친 엣지 케이스는?",
    ],
    extensionIdeas: [
      "Mutation testing 도입",
      "E2E 테스트 확장",
    ],
    tags: ["coding-agents", "testing"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "tdd-with-agent.md",
        title: "Red→Green 테스트 카드",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-406",
    slug: "bug-reproduction-loop",
    phaseId: "phase-4",
    titleKo: "버그 재현과 수정 루프",
    titleEn: "Bug reproduction loop",
    summary: "애매한 버그를 '재현→최소 예제→수정 → 회귀 방지 테스트'로 표준화한다.",
    level: "intermediate",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["write-tests-with-coding-agent"],
    learningGoals: [
      "재현 스텝을 AI와 함께 정의한다",
      "수정 후 회귀 테스트로 잠금한다",
    ],
    problemScenario:
      "재현이 불안정한 버그가 여러 번 고쳐졌다가 다시 나타난다.",
    coreConcepts: [
      { term: "Minimal Reproduction", explanation: "문제를 재현하는 가장 작은 입력/코드." },
      { term: "Regression Test", explanation: "동일 버그의 재발을 막는 테스트." },
    ],
    codexMission:
      "Codex에게 버그 이슈로부터 최소 재현 코드를 만들게 하고, 수정 PR에 회귀 테스트를 포함하게 한다.",
    claudeCodeMission:
      "Claude Code에게 재현 → 최소 예제 → 수정 → 회귀 테스트의 단계별 체크 루프를 커스텀 명령으로 저장한다.",
    buildSteps: [
      "재현 스텝 확보",
      "최소 재현 예제 생성",
      "수정 및 회귀 테스트 추가",
    ],
    verificationChecklist: [
      "최소 재현 예제가 존재하는가",
      "회귀 테스트가 실패→통과 순으로 기록되는가",
      "근본 원인이 문서화되었는가",
    ],
    deliverable: {
      title: "버그 수정 템플릿",
      description: "재현-최소예제-수정-회귀 체크 루프 템플릿.",
      format: "Markdown + 예제 PR",
    },
    reflectionQuestions: [
      "근본 원인이 다른 모듈에도 있을 수 있는가?",
      "비슷한 버그를 사전에 감지할 테스트는?",
    ],
    extensionIdeas: [
      "자동 재현 스크립트",
      "버그 패턴 카탈로그",
    ],
    tags: ["coding-agents", "bugs"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "bug-repro-loop.md",
        title: "버그 재현과 수정 루프 템플릿",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-407",
    slug: "nightly-loop-pattern",
    phaseId: "phase-4",
    titleKo: "잠든 사이 도는 자동 루프",
    titleEn: "Nightly loop pattern",
    hook: "내가 자리를 비운 동안에도, 정해 둔 기준 안에서 에이전트가 같은 작업을 여러 번 시도할 수 있어요.",
    summary: "Phase 4의 인-세션 코딩 루프를 세션 밖으로 확장해, 목표와 검증 조건과 예산이 있는 자동 루프 한 사이클을 설계합니다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["practitioner", "engineer", "founder"],
    prerequisites: ["bug-reproduction-loop"],
    learningGoals: [
      "인-세션 루프와 세션 밖 자동 루프의 차이를 설명한다",
      "Ralph Loop, fixed-budget research loop, Codex `/goal`의 쓰임을 구분한다",
      "밤새 도는 루프에 필요한 목표, 검증 조건, 시간 예산을 설계한다",
      "자동 루프를 실행하기 전에 멈춤 조건과 비용 기록 방식을 정한다",
    ],
    problemScenario:
      "저녁에 `train.py` 성능 개선 목표와 검증 명령을 남겨두고 잠들었습니다. 아침에 보니 에이전트가 여러 작은 변경을 시도했고, 좋아진 시도와 버린 시도가 로그로 남아 있습니다. 마법처럼 맡기는 것이 아니라, 목표와 검증 조건이 분명한 반복을 잠시 세션 밖으로 내보낸 거예요.",
    coreConcepts: [
      {
        term: "Ralph Loop",
        explanation: "`while :; do cat PROMPT.md | claude-code; done`처럼 같은 목표를 반복 주입하는 패턴입니다. Stop Hook과 AGENTS.md 누적 학습이 핵심입니다.",
      },
      {
        term: "Fixed-Budget Research Loop",
        explanation: "정해진 시간 안에서 작은 변경, 검증, 보존 또는 되돌리기를 반복하는 실험 루프입니다.",
      },
      {
        term: "Codex `/goal`",
        explanation: "plan, act, test, review, iterate 흐름을 도구 안에 묶은 내장 루프입니다. 좋은 목표 문장을 만드는 일이 품질을 좌우합니다.",
      },
      {
        term: "Verification Budget",
        explanation: "자동 루프는 검증 조건과 토큰, 시간 한도가 있어야 안전합니다. 통과와 실패를 자동으로 가를 기준부터 정합니다.",
      },
    ],
    codexMission:
      "Codex에게 `/goal`로 실행할 후보 작업 1개를 고르게 하고, Goal, Context, Constraints, Done When, 시간 한도, 검증 명령을 포함한 밤샘 루프 설계를 작성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `nightly-loop-design.md`를 만들게 하고, Ralph식 반복, fixed-budget research loop, `/goal` 중 하나를 골라 실행 전 설계를 완성하게 한다.",
    mission:
      "Claude Code에게 아래 작업을 맡깁니다. 50분 안에 끝내는 걸 목표로 하세요.\n\n작업. 내 작업 1개에 대해 세션 밖에서 한 번 돌아갈 자동 루프를 설계하고 `nightly-loop-design.md`로 정리합니다.\n\n포함할 내용.\n1. 작업과 목표를 한 줄로 적습니다.\n2. Ralph, fixed-budget research loop, `/goal` 중 하나를 고릅니다.\n3. 자동 통과와 실패를 나누는 검증 조건을 씁니다.\n4. 토큰 예산과 시간 한도를 정합니다.\n5. 실행 결과를 회수, 성공 비율, 비용으로 기록할 표를 만듭니다.\n6. 사람이 직접 했을 때와 비교할 회고 질문을 남깁니다.\n\n처음부터 밤새 실행하지 말고, 10분짜리 작은 드라이런으로 기준이 작동하는지 먼저 확인하세요.",
    codexNote:
      "`/goal`을 쓸 때는 Lesson 2.5의 메타 프롬프팅으로 목표 문장을 먼저 만들면 좋습니다. 실행 전에는 검증 명령과 멈춤 조건을 사람이 읽고 승인하세요.",
    buildSteps: [
      "Phase 4에서 다뤘던 코딩 작업 중 반복 실험이 필요한 것 1개를 고른다",
      "목표, 관련 파일, 하지 말아야 할 변경, 완료 기준을 한 장에 적는다",
      "Ralph, fixed-budget research loop, `/goal` 중 현재 환경에 맞는 루프를 고른다",
      "검증 명령과 실패 시 되돌리는 기준을 정한다",
      "10분 드라이런 뒤 다음 밤에 한 번만 실행할 계획을 남긴다",
    ],
    verificationChecklist: [
      "작업 목표가 한 줄로 좁혀져 있는가",
      "자동 통과와 실패를 판단할 검증 명령이 있는가",
      "토큰 예산과 시간 한도가 적혀 있는가",
      "되돌리기 또는 폐기 기준이 명시되어 있는가",
      "실행 로그에 회수, 성공 비율, 비용을 남길 자리가 있는가",
      "사람 승인 없이 커밋, 배포, 외부 전송을 하지 않는다는 제한이 있는가",
    ],
    deliverable: {
      title: "밤새 도는 자동 루프 설계서",
      description: "목표, 루프 종류, 검증 조건, 예산, 실행 결과 기록표를 담은 자동 루프 설계서.",
      format: "Markdown 파일(.md)",
    },
    reflectionQuestions: [
      "이 작업을 내 손으로만 했다면 몇 회차까지 시도했을까요?",
      "자동 루프가 가장 크게 줄여 준 것은 시간, 피로, 탐색 폭 중 무엇인가요?",
      "다음에는 어떤 Stop Point를 더 앞에 두어야 할까요?",
    ],
    extensionIdeas: [
      "성공한 자동 루프 설계를 팀의 코딩 에이전트 운영 문서에 추가합니다",
      "비용과 품질 로그를 모아 반복 실험에 맞는 작업 유형을 분류합니다",
      "Phase 5의 AI 앱 개발에서 테스트와 배포 전 점검 루프로 연결합니다",
    ],
    tags: ["coding-agents", "loop", "automation"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "nightly-loop-design.md",
        title: "밤새 도는 자동 루프 설계서",
        kind: "mission",
      },
    ],
  },
  {
    id: "lesson-501",
    slug: "connect-ai-api",
    phaseId: "phase-5",
    titleKo: "AI API 붙이기",
    titleEn: "Connect AI API",
    summary: "Next.js 또는 Python 서버에 AI API를 안전하게 연결한다.",
    level: "intermediate",
    estimatedMinutes: 60,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["coding-agent-setup"],
    learningGoals: [
      "서버 사이드에서 키를 안전하게 사용한다",
      "에러·타임아웃·리트라이를 기본 처리한다",
    ],
    problemScenario:
      "프론트엔드에서 바로 API 키를 써버려 키가 노출되거나, 장애 시 UI가 멈춘다.",
    coreConcepts: [
      { term: "Server Route", explanation: "API 키를 서버 측에서만 쓰는 중계 라우트." },
      { term: "Graceful Failure", explanation: "실패 시 UX와 로깅을 분리해 처리." },
    ],
    codexMission:
      "Codex에게 Next.js `app/api/chat/route.ts`를 만들고, 키 환경변수, 타임아웃, 리트라이 기본값을 설정하게 한다.",
    claudeCodeMission:
      "Claude Code에게 같은 라우트를 Claude SDK로 구현하고, 에러 시 사용자 메시지와 로그를 분리해 반환하게 한다.",
    buildSteps: [
      "API 라우트 설계",
      "에러/타임아웃/리트라이 구현",
      "기본 UI 연결",
    ],
    verificationChecklist: [
      "키가 클라이언트에 노출되지 않는가",
      "타임아웃/리트라이가 명시되어 있는가",
      "실패 시 UI가 복구 가능한가",
    ],
    deliverable: {
      title: "AI 연결 기본 라우트",
      description: "서버 라우트 + UI 호출 예제.",
      format: "코드 + README",
    },
    reflectionQuestions: [
      "실패 비용이 큰 호출과 아닌 호출을 어떻게 구분할 것인가?",
      "재시도 전략이 과금을 폭주시키지 않는가?",
    ],
    extensionIdeas: [
      "레이트 리밋 + 사용량 로깅",
      "모델 스위칭 기능",
    ],
    tags: ["app-dev", "api"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "api-connect-checklist.md",
        title: "AI API 연결 체크리스트",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-502",
    slug: "streaming-response-ui",
    phaseId: "phase-5",
    titleKo: "스트리밍 응답 UI 만들기",
    titleEn: "Streaming response UI",
    summary: "Server-Sent Events/스트림을 UI와 매끄럽게 연결한다.",
    level: "intermediate",
    estimatedMinutes: 55,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["connect-ai-api"],
    learningGoals: [
      "스트림 응답을 UI에 누적 렌더링한다",
      "중단/재시도 UX를 만든다",
    ],
    problemScenario:
      "긴 응답이 끝나야 UI에 뜨면 사용자 경험이 나쁘다.",
    coreConcepts: [
      { term: "SSE / Streaming", explanation: "서버가 조각을 순차 전송하고 UI가 누적 표시." },
      { term: "Cancellation", explanation: "AbortController로 중단·재시도 지원." },
    ],
    codexMission:
      "Codex에게 `streaming` 버전 라우트와 `useChat` 훅을 만들게 한다. 중단 버튼도 포함.",
    claudeCodeMission:
      "Claude Code에게 React 컴포넌트에서 토큰 누적과 스크롤 유지 로직을 구현하게 한다.",
    buildSteps: [
      "스트리밍 라우트 구현",
      "UI 누적 렌더링",
      "중단/재시도 버튼 추가",
    ],
    verificationChecklist: [
      "응답이 끊기지 않고 누적되는가",
      "중단이 실제로 취소되는가",
      "긴 응답에서 스크롤 UX가 유지되는가",
    ],
    deliverable: {
      title: "스트리밍 챗 UI 예제",
      description: "스트림 라우트 + 클라이언트 훅.",
      format: "코드",
    },
    reflectionQuestions: [
      "스트리밍이 오히려 UX를 해치는 상황은 언제인가?",
      "중단 후 토큰 소비를 어떻게 회계 처리할 것인가?",
    ],
    extensionIdeas: [
      "타이핑 애니메이션 인디케이터",
      "모바일 접근성 개선",
    ],
    tags: ["app-dev", "ui", "streaming"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "streaming-ui-pattern.md",
        title: "스트리밍 UI 패턴 카드",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-503",
    slug: "structured-output-handling",
    phaseId: "phase-5",
    titleKo: "구조화 출력(Structured Output) 다루기",
    titleEn: "Handling structured output",
    summary: "스키마 기반 응답을 앱에 안전하게 연결하고 검증한다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["enforcing-output-format", "connect-ai-api"],
    learningGoals: [
      "클라이언트/서버에서 스키마 검증을 한다",
      "스키마 이탈 시 재요청 전략을 만든다",
    ],
    problemScenario:
      "AI가 JSON을 주지만 가끔 필드 누락이 있어 UI가 깨진다.",
    coreConcepts: [
      { term: "Schema-Driven Output", explanation: "응답 포맷을 스키마로 고정." },
      { term: "Validation Loop", explanation: "검증 실패 시 재요청 후 실패/대체 경로." },
    ],
    codexMission:
      "Codex에게 Zod 스키마를 정의하고 응답 파싱/재시도/대체 경로를 구현하게 한다.",
    claudeCodeMission:
      "Claude Code에게 구조화 출력 라이브 데모 페이지를 만들게 한다.",
    buildSteps: [
      "Zod 스키마 정의",
      "서버 측 검증 + 재시도",
      "클라이언트에서 타입 안전하게 사용",
    ],
    verificationChecklist: [
      "모든 필드가 타입 안전한가",
      "실패 시 사용자에게 안내가 있는가",
      "재시도가 루프를 돌지 않도록 제한되는가",
    ],
    deliverable: {
      title: "스키마 기반 파이프라인",
      description: "Zod 스키마 + 파싱·재시도 코드.",
      format: "TypeScript",
    },
    reflectionQuestions: [
      "UX와 스키마 엄격도의 타협점은?",
      "필드 변경 시 후방 호환을 어떻게 관리할까?",
    ],
    extensionIdeas: [
      "폼과 스키마 공유",
      "생성 결과 저장/재사용",
    ],
    tags: ["app-dev", "structured"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "structured-output-handler.md",
        title: "구조화 출력 핸들러 설계서",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-504",
    slug: "conversation-storage-design",
    phaseId: "phase-5",
    titleKo: "대화 기록 저장 구조 설계",
    titleEn: "Conversation storage design",
    summary: "멀티턴 대화, 요약, 트레이스를 저장하는 기본 스키마를 설계한다.",
    level: "intermediate",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["connect-ai-api"],
    learningGoals: [
      "세션/메시지/요약 테이블을 설계한다",
      "프라이버시와 비용을 고려한다",
    ],
    problemScenario:
      "대화가 길어질수록 비용이 폭주하고, 과거 내용을 검색하기 어렵다.",
    coreConcepts: [
      { term: "Session vs Thread", explanation: "사용자 세션과 대화 스레드의 차이." },
      { term: "Summary Rolling", explanation: "오래된 메시지를 요약으로 압축." },
    ],
    codexMission:
      "Codex에게 SQLite 또는 Postgres 스키마(`sessions`, `messages`, `summaries`)를 생성하고 마이그레이션을 작성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 저장·요약 파이프라인을 구현하고 E2E 테스트를 추가하게 한다.",
    buildSteps: [
      "스키마 설계",
      "저장/조회/요약 API 구현",
      "요약 주기 설정",
    ],
    verificationChecklist: [
      "개인정보 마스킹 정책이 있는가",
      "요약이 원문 길이보다 짧아지는가",
      "비용 시뮬레이션이 있는가",
    ],
    deliverable: {
      title: "대화 저장 스키마 + API",
      description: "세션/메시지/요약 테이블과 엔드포인트.",
      format: "DB 스키마 + 코드",
    },
    reflectionQuestions: [
      "어떤 사용자에게 더 긴 컨텍스트를 줄 것인가?",
      "요약 품질 저하를 어떻게 측정할 것인가?",
    ],
    extensionIdeas: [
      "세션 공유 URL",
      "세션 내 검색",
    ],
    tags: ["app-dev", "storage"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "conversation-storage-design.md",
        title: "대화 저장 구조 설계서",
        kind: "note",
      },
    ],
  },
  {
    id: "lesson-601",
    slug: "understanding-embeddings",
    phaseId: "phase-6",
    titleKo: "임베딩(Embedding) 이해하기",
    titleEn: "Understanding embeddings",
    summary: "임베딩 벡터가 무엇이고 왜 검색에 쓰이는지 직관으로 이해한다.",
    level: "intermediate",
    estimatedMinutes: 45,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["connect-ai-api"],
    learningGoals: [
      "임베딩 벡터의 의미를 비수식으로 설명한다",
      "코사인 유사도 예제를 직접 돌린다",
    ],
    problemScenario:
      "RAG를 하려는데 '벡터화'가 무엇을 뜻하는지 막연하다.",
    coreConcepts: [
      { term: "Embedding Vector", explanation: "텍스트를 의미 공간의 좌표로 옮긴 것." },
      { term: "Cosine Similarity", explanation: "두 벡터의 방향 유사도." },
    ],
    codexMission:
      "Codex에게 짧은 문장 10개를 임베딩해 유사도 순으로 정렬하는 스크립트를 만들게 한다.",
    claudeCodeMission:
      "Claude Code에게 결과를 노트북 또는 마크다운 리포트로 시각화하게 한다.",
    buildSteps: [
      "API 키 준비",
      "임베딩 생성 스크립트 작성",
      "유사도 비교 실험",
    ],
    verificationChecklist: [
      "같은 주제 문장이 높은 유사도를 보이는가",
      "반대 주제 문장이 낮은 유사도를 보이는가",
      "실험 데이터가 기록되어 있는가",
    ],
    deliverable: {
      title: "임베딩 실험 노트",
      description: "10문장 유사도 실험 결과.",
      format: "Markdown + 코드",
    },
    reflectionQuestions: [
      "예상과 달랐던 유사도는?",
      "임베딩 품질을 어떻게 평가할까?",
    ],
    extensionIdeas: [
      "한국어/영어 혼합 실험",
      "임베딩 모델 비교",
    ],
    tags: ["rag", "embeddings"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "embedding-intro.md",
        title: "임베딩 실험 노트",
        kind: "note",
      },
    ],
  },
  {
    id: "lesson-602",
    slug: "document-chunking-strategy",
    phaseId: "phase-6",
    titleKo: "문서 청킹(Chunking) 전략 세우기",
    titleEn: "Document chunking strategy",
    summary: "문서 형식별로 청킹 전략을 설계하고 검색 품질에 미치는 영향을 실험한다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["understanding-embeddings"],
    learningGoals: [
      "문서 형식별 적합한 청킹 전략을 고른다",
      "중첩(overlap)과 크기를 실험한다",
    ],
    problemScenario:
      "청크를 너무 짧게 자르면 맥락이 깨지고, 길게 자르면 검색 정밀도가 떨어진다.",
    coreConcepts: [
      { term: "Semantic Chunking", explanation: "문단/제목 기준 의미 단위 청킹." },
      { term: "Overlap", explanation: "경계에서 정보 손실을 줄이기 위한 중첩." },
    ],
    codexMission:
      "Codex에게 같은 문서를 3가지 청킹 전략으로 나누고 동일 질문으로 검색 품질을 비교하게 한다.",
    claudeCodeMission:
      "Claude Code에게 실험 결과를 표로 정리하고 권장 전략을 문서화하게 한다.",
    buildSteps: [
      "샘플 문서 준비",
      "청킹 전략 3종 실험",
      "품질 비교 및 선택",
    ],
    verificationChecklist: [
      "실험 설정이 동일한가",
      "품질 지표가 명시되었는가",
      "권장 전략 근거가 있는가",
    ],
    deliverable: {
      title: "청킹 전략 비교 리포트",
      description: "3가지 청킹 실험 결과와 권장안.",
      format: "Markdown",
    },
    reflectionQuestions: [
      "문서 유형마다 전략이 달라지는 이유는?",
      "품질 저하가 가장 큰 지점은?",
    ],
    extensionIdeas: [
      "헤더 메타데이터 추가",
      "자동 청킹 평가 도구",
    ],
    tags: ["rag", "chunking"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "chunking-strategy.md",
        title: "청킹 전략 비교 리포트",
        kind: "note",
      },
    ],
  },
  {
    id: "lesson-603",
    slug: "vector-search-basics",
    phaseId: "phase-6",
    titleKo: "벡터 검색(Vector Search) 기본",
    titleEn: "Vector search basics",
    summary: "pgvector 또는 Pinecone을 이용해 기본 벡터 검색 인덱스를 구축한다.",
    level: "intermediate",
    estimatedMinutes: 60,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["document-chunking-strategy"],
    learningGoals: [
      "벡터 DB에 인덱스를 만든다",
      "Top-K 검색과 하이브리드 검색을 이해한다",
    ],
    problemScenario:
      "벡터를 파일로 관리하니 금세 한계가 온다. 적절한 인덱스가 필요하다.",
    coreConcepts: [
      { term: "Vector Index", explanation: "유사도 기반 검색을 빠르게 하기 위한 자료 구조." },
      { term: "Hybrid Search", explanation: "키워드 검색과 벡터 검색을 결합." },
    ],
    codexMission:
      "Codex에게 pgvector(또는 Pinecone) 인덱스 생성 스크립트와 기본 검색 함수를 구현하게 한다.",
    claudeCodeMission:
      "Claude Code에게 하이브리드 검색 예제와 벤치마크를 추가하게 한다.",
    buildSteps: [
      "DB/서비스 설정",
      "인덱스 생성",
      "Top-K 및 하이브리드 검색 구현",
    ],
    verificationChecklist: [
      "인덱스 생성이 재현 가능한가",
      "하이브리드 검색 결과가 단일 검색보다 나은가",
      "검색 레이턴시가 측정되었는가",
    ],
    deliverable: {
      title: "벡터 검색 기본 파이프라인",
      description: "인덱스 생성/검색 코드와 벤치.",
      format: "코드 + 스크립트",
    },
    reflectionQuestions: [
      "작은 데이터에서 벡터 DB가 과투자인 순간은?",
      "하이브리드 검색이 필요한 신호는?",
    ],
    extensionIdeas: [
      "필터/메타데이터 인덱스",
      "임베딩 재계산 전략",
    ],
    tags: ["rag", "search"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "vector-search-recipe.md",
        title: "벡터 검색 기본 레시피",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-604",
    slug: "grounded-rag-answers",
    phaseId: "phase-6",
    titleKo: "근거가 있는 RAG 답변 만들기",
    titleEn: "Grounded RAG answers",
    summary: "답에 출처를 붙이고 인용을 검증 가능한 형태로 제공한다.",
    level: "intermediate",
    estimatedMinutes: 55,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["vector-search-basics"],
    learningGoals: [
      "답마다 출처 스니펫/링크를 붙인다",
      "근거 없는 질문에 답을 거부한다",
    ],
    problemScenario:
      "RAG가 엉뚱한 문서를 근거로 답해 오히려 위험하다.",
    coreConcepts: [
      { term: "Citations", explanation: "답에서 사용된 청크의 ID/위치를 노출." },
      { term: "Abstain Policy", explanation: "근거 부족 시 답을 거부하는 정책." },
    ],
    codexMission:
      "Codex에게 citations 포함 응답 포맷을 정의하고 서버에서 강제하게 한다.",
    claudeCodeMission:
      "Claude Code에게 UI에 출처 스니펫을 펼쳐 보여주는 컴포넌트를 만들게 한다.",
    buildSteps: [
      "citations 스키마 정의",
      "RAG 응답에 citations 부착",
      "UI에서 출처 표시",
    ],
    verificationChecklist: [
      "모든 답에 최소 1개 출처가 있는가",
      "출처 누락 시 답이 거부되는가",
      "출처가 실제 내용과 일치하는가",
    ],
    deliverable: {
      title: "Grounded RAG 데모",
      description: "출처 포함 답을 내는 기본 RAG 앱.",
      format: "코드",
    },
    reflectionQuestions: [
      "출처와 답이 불일치할 때 어떻게 감지할 것인가?",
      "'모른다'를 자연스럽게 만드는 UX는?",
    ],
    extensionIdeas: [
      "근거 기반 평가 스크립트",
      "사용자 피드백 수집",
    ],
    tags: ["rag", "citations"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "grounded-rag-design.md",
        title: "Grounded RAG 설계서",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-701",
    slug: "function-calling",
    phaseId: "phase-7",
    titleKo: "Function Calling 이해하기",
    titleEn: "Function calling",
    summary: "모델이 함수를 호출해 외부 작업을 수행하는 기본 패턴을 익힌다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["structured-output-handling"],
    learningGoals: [
      "함수 스키마를 정의하고 모델에게 노출한다",
      "인자 검증과 실행 경로를 분리한다",
    ],
    problemScenario:
      "단순 프롬프트로는 DB 조회나 이메일 보내기 같은 작업을 할 수 없다.",
    coreConcepts: [
      { term: "Tool Schema", explanation: "모델이 호출 가능한 함수의 이름/인자 정의." },
      { term: "Argument Validation", explanation: "모델이 만든 인자를 실행 전 검증." },
    ],
    codexMission:
      "Codex에게 '날씨 조회' 함수를 정의하고 모델이 호출하도록 구현하게 한다.",
    claudeCodeMission:
      "Claude Code에게 Claude Tools로 같은 예제를 구현하고 실패 케이스 로그를 남기게 한다.",
    buildSteps: [
      "함수 스키마 정의",
      "실행 경로/권한 설정",
      "모델 호출 실험",
    ],
    verificationChecklist: [
      "모델이 올바른 인자로 호출하는가",
      "잘못된 인자가 차단되는가",
      "실행 로그가 남는가",
    ],
    deliverable: {
      title: "Function Calling 예제",
      description: "함수 스키마와 검증·실행 예제.",
      format: "코드",
    },
    reflectionQuestions: [
      "함수와 프롬프트 중 어느 것이 모호할 때 실패가 커지는가?",
      "권한이 있는 함수와 없는 함수를 어떻게 나눌 것인가?",
    ],
    extensionIdeas: [
      "여러 도구 체이닝",
      "툴 사용 로깅 대시보드",
    ],
    tags: ["agents", "tools"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "function-calling-recipe.md",
        title: "Function Calling 레시피",
        kind: "skill",
      },
    ],
  },
  {
    id: "lesson-702",
    slug: "mini-agent-loop",
    phaseId: "phase-7",
    titleKo: "미니 에이전트 루프 만들기",
    titleEn: "Mini agent loop",
    summary: "계획→도구 호출→관찰→재계획의 기본 에이전트 루프를 구현한다.",
    level: "advanced",
    estimatedMinutes: 60,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["function-calling"],
    learningGoals: [
      "ReAct 스타일 루프를 만든다",
      "무한 루프 방지/중단 조건을 넣는다",
    ],
    problemScenario:
      "단일 함수 호출로는 복잡한 태스크를 해결하기 어렵다.",
    coreConcepts: [
      { term: "ReAct", explanation: "생각(Think)→도구 호출(Act)→관찰(Observe) 반복." },
      { term: "Stopping Criteria", explanation: "성공/실패/타임아웃을 판정." },
    ],
    codexMission:
      "Codex에게 검색→요약→파일 저장 3도구를 가진 미니 에이전트를 구현하게 한다.",
    claudeCodeMission:
      "Claude Code에게 에이전트 로그를 단계별로 보여주는 디버그 UI를 만들게 한다.",
    buildSteps: [
      "도구 정의",
      "루프 구현 및 종료 조건",
      "관찰 로그 수집",
    ],
    verificationChecklist: [
      "최대 스텝 제한이 있는가",
      "도구 실패 시 복구 경로가 있는가",
      "관찰 로그가 추적 가능한가",
    ],
    deliverable: {
      title: "미니 에이전트 예제",
      description: "검색/요약/저장 3도구 에이전트.",
      format: "코드",
    },
    reflectionQuestions: [
      "에이전트가 실패한 가장 흔한 이유는?",
      "어느 순간 사람 개입으로 전환해야 하는가?",
    ],
    extensionIdeas: [
      "Plan-and-Execute 변형",
      "멀티 에이전트 협업",
    ],
    tags: ["agents", "react"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "mini-agent-loop-design.md",
        title: "미니 에이전트 루프 설계서",
        kind: "mission",
      },
    ],
  },
  {
    id: "lesson-703",
    slug: "tool-permission-safeguards",
    phaseId: "phase-7",
    titleKo: "도구 권한과 안전장치 설계하기",
    titleEn: "Tool permissions and safeguards",
    summary: "에이전트가 무엇을 할 수 있고 무엇은 못하는지 경계를 명확히 만든다.",
    level: "advanced",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["mini-agent-loop"],
    learningGoals: [
      "도구별 허용 목록/거부 목록을 설계한다",
      "위험 동작 앞에 사람 확인을 끼운다",
    ],
    problemScenario:
      "에이전트가 파일을 지우거나 외부 호출을 남발해 사고가 날 수 있다.",
    coreConcepts: [
      { term: "Allow/Deny Lists", explanation: "실행 가능한 명령/경로를 화이트·블랙리스트로 관리." },
      { term: "Human Confirm Step", explanation: "위험 동작 직전 사용자 확인을 요구." },
    ],
    codexMission:
      "Codex에게 도구별 권한 설정 파일과 위험 동작 예시를 정리하게 한다.",
    claudeCodeMission:
      "Claude Code에게 `.claude/settings.json` 권한 예시와 승인 플로우를 정의하게 한다.",
    buildSteps: [
      "도구 분류",
      "권한/확인 플로우 설계",
      "위험 동작 시뮬레이션",
    ],
    verificationChecklist: [
      "파일/네트워크 권한이 명시되었는가",
      "위험 동작이 자동 실행되지 않는가",
      "변경 이력이 로깅되는가",
    ],
    deliverable: {
      title: "도구 권한 프로파일",
      description: "권한 정의와 확인 플로우.",
      format: "JSON/YAML + 문서",
    },
    reflectionQuestions: [
      "가장 위험한 자동 동작은 무엇이었나?",
      "권한이 과하게 닫혀 있어 생기는 비용은?",
    ],
    extensionIdeas: [
      "감사 로그 뷰어",
      "실행 취소(undo) 기능",
    ],
    tags: ["agents", "security"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "tool-permission-policy.md",
        title: "도구 권한 정책 템플릿",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-704",
    slug: "prompt-injection-defense",
    phaseId: "phase-7",
    titleKo: "Prompt Injection 방어 기초",
    titleEn: "Prompt injection defense basics",
    summary: "외부 입력으로 모델을 조종하려는 공격을 이해하고 기본 방어를 만든다.",
    level: "advanced",
    estimatedMinutes: 50,
    targetJourneys: ["engineer", "founder"],
    prerequisites: ["tool-permission-safeguards"],
    learningGoals: [
      "직접/간접 프롬프트 인젝션 유형을 안다",
      "시스템 프롬프트 보호와 콘텐츠 분리를 구현한다",
    ],
    problemScenario:
      "사용자 입력에 '이전 지시를 무시하라'가 들어오면 에이전트가 엉뚱하게 행동한다.",
    coreConcepts: [
      { term: "Direct Injection", explanation: "사용자 입력이 지시를 바꾸려는 공격." },
      { term: "Indirect Injection", explanation: "웹/문서에서 불러온 콘텐츠에 숨겨진 지시." },
    ],
    codexMission:
      "Codex에게 인젝션 예시 10개를 만들고 각각에 대한 방어 전략을 표로 정리하게 한다.",
    claudeCodeMission:
      "Claude Code에게 사용자 입력/툴 출력의 분리 정책을 코드에 적용하게 한다.",
    buildSteps: [
      "공격 시나리오 수집",
      "방어 정책 설계",
      "회귀 테스트 추가",
    ],
    verificationChecklist: [
      "민감 동작 앞에 정책 검사 레이어가 있는가",
      "외부 콘텐츠가 시스템 영역과 분리되는가",
      "인젝션 테스트 스위트가 통과하는가",
    ],
    deliverable: {
      title: "인젝션 방어 기본 세트",
      description: "공격 사례 10 + 방어 정책 + 회귀 테스트.",
      format: "Markdown + 코드",
    },
    reflectionQuestions: [
      "가장 위험한 인젝션 유형은?",
      "사용자 편의와 방어 엄격함의 균형은?",
    ],
    extensionIdeas: [
      "자동 레드팀 스크립트",
      "인젝션 로그 분석",
    ],
    tags: ["agents", "security", "prompt-injection"],
    hasMdxBody: true,
    outputs: [
      {
        filename: "prompt-injection-defense.md",
        title: "프롬프트 인젝션 방어 세트",
        kind: "checklist",
      },
    ],
  },
  {
    id: "lesson-1101",
    slug: "ai-app-cost-and-usage",
    phaseId: "phase-11",
    titleKo: "AI 앱 비용과 사용량 계산",
    titleEn: "AI app cost and usage",
    summary: "토큰 사용량, 모델 선택, 캐시, 요금제까지 비용 모델을 설계한다.",
    level: "intermediate",
    estimatedMinutes: 50,
    targetJourneys: ["founder", "adopter", "engineer"],
    prerequisites: ["connect-ai-api"],
    learningGoals: [
      "토큰 단가와 비용 구조를 이해한다",
      "캐시·요약·모델 스위칭으로 비용을 낮춘다",
      "가격과 이용량의 상관관계를 시뮬레이션한다",
    ],
    problemScenario:
      "사용자 증가에 따라 비용이 수익을 넘어서는 시나리오가 생긴다.",
    coreConcepts: [
      { term: "Token Accounting", explanation: "입력/출력 토큰에 대한 비용 계산." },
      { term: "Caching", explanation: "프롬프트/응답 캐시로 반복 비용을 줄임." },
    ],
    codexMission:
      "Codex에게 월간 이용자수/평균 대화 길이/모델 조합별 비용 시뮬레이션 스프레드시트를 만들게 한다.",
    claudeCodeMission:
      "Claude Code에게 사용량 로깅 미들웨어와 비용 대시보드 초기 버전을 만들게 한다.",
    buildSteps: [
      "토큰 단가 정리",
      "비용 시뮬레이션",
      "캐시/모델 스위칭 적용",
    ],
    verificationChecklist: [
      "시나리오별 비용 범위가 산출되는가",
      "캐시 적용 전/후 차이가 기록되는가",
      "가격 전략이 비용을 상회하는가",
    ],
    deliverable: {
      title: "비용 모델 + 시뮬레이션",
      description: "스프레드시트 + 로깅 코드.",
      format: "스프레드시트 + 코드",
    },
    reflectionQuestions: [
      "스케일에서 깨지는 가정은 무엇인가?",
      "어떤 사용자 행동이 비용을 가장 키우는가?",
    ],
    extensionIdeas: [
      "리얼타임 비용 알림",
      "고비용 사용자 자동 안내",
    ],
    tags: ["product", "cost"],
  },
  {
    id: "lesson-1201",
    slug: "capstone-plan-and-launch",
    phaseId: "phase-12",
    titleKo: "Capstone 프로젝트 기획과 배포",
    titleEn: "Capstone plan and launch",
    summary: "포트폴리오로 쓸 수 있는 AI 프로젝트를 기획·배포·회고한다.",
    level: "advanced",
    estimatedMinutes: 120,
    targetJourneys: ["practitioner", "adopter", "creator", "founder", "engineer", "explorer"],
    prerequisites: [
      "grounded-rag-answers",
      "mini-agent-loop",
      "ai-app-cost-and-usage",
    ],
    learningGoals: [
      "문제→해결→배포→회고 전 과정을 스스로 돈다",
      "공개 저장소와 README로 프로젝트를 외부에 공유한다",
    ],
    problemScenario:
      "많이 배웠지만 '보여줄 결과물'이 없다. 작은 것이라도 공개해 완결해야 한다.",
    coreConcepts: [
      { term: "Narrow MVP", explanation: "가장 좁은 문제에 가장 단순한 해결을 붙이는 MVP." },
      { term: "Launch Retrospective", explanation: "런칭 후 지표와 회고를 남기는 절차." },
    ],
    codexMission:
      "Codex에게 내 캡스톤 아이디어 1개를 1페이지 브리프로 정리하고, 2주 런칭 계획을 작성하게 한다.",
    claudeCodeMission:
      "Claude Code에게 배포 후 `docs/retrospective.md`에 지표/피드백/다음 단계를 구조화해 기록하게 한다.",
    buildSteps: [
      "1페이지 브리프",
      "MVP 범위 확정",
      "구현·배포",
      "회고 작성",
    ],
    verificationChecklist: [
      "공개 URL이 존재하는가",
      "README가 사용 방법을 설명하는가",
      "회고에 지표와 한계가 담겼는가",
      "다음 반복 계획이 있는가",
    ],
    deliverable: {
      title: "배포된 캡스톤 + 회고",
      description: "공개된 AI 프로젝트와 회고 문서.",
      format: "Git 저장소 + 공개 URL",
    },
    reflectionQuestions: [
      "가장 과소평가했던 작업은?",
      "AI가 한 일과 내가 판단한 일의 비율은?",
      "다음 버전에서 가장 먼저 바꿀 것은?",
    ],
    extensionIdeas: [
      "사용자 10명 대상 피드백 라운드",
      "수익화 실험",
    ],
    tags: ["capstone", "launch"],
  },
];
