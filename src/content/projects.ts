// 캡스톤·포트폴리오용 프로젝트 카탈로그.
// v0.4 — requiredStages(Stage 모델) 기준. 난이도 순으로 정렬 — 입문자가
// /projects 첫 화면에서 자기 수준 프로젝트를 먼저 본다.
// 각 프로젝트는 /projects/[slug] 상세 페이지에서 마일스톤·전제 레슨·완료
// 기준까지 펼쳐진다.
import type { Project } from "@/lib/types";

export const projects: Project[] = [
  // ─── 입문 (beginner) ─────────────────────────────────────────
  {
    id: "project-weekly-report",
    slug: "weekly-report-autopilot",
    title: "주간 보고서 자동 파이프라인",
    hook: "매주 금요일, 흩어진 메모로 주간 보고서를 백지에서 씁니다. 그 한 시간을 5분으로 줄입니다.",
    targetLearner: "주간 보고서를 매주 쓰는 직장인 — 코딩 없이 시작",
    targetJourneys: ["practitioner"],
    difficulty: "beginner",
    estimatedDuration: "1주",
    requiredStages: ["stage-2-ask", "stage-4-collaborate"],
    keyLessons: [
      "structure-of-good-prompts",
      "build-personal-prompt-library",
      "automate-report-drafts",
    ],
    summary:
      "한 주의 메모·일정·완료 항목을 넣으면 정해진 형식의 주간 보고서 초안이 나오는 파이프라인.",
    problem:
      "주간 보고서는 내용보다 다시 정리하고 형식을 맞추는 데 시간이 더 든다. 매주 같은 구조인데 매주 백지에서 시작한다. 이 반복을 한 번 만들어두면 매주 되찾는 시간이 된다.",
    finalOutput:
      "메모 붙여넣기 → 표준 형식의 주간 보고서 초안 (재사용 프롬프트 + 작업 절차 문서)",
    suggestedStack: ["ChatGPT / Claude", "Notion 또는 Google Docs"],
    milestones: [
      {
        title: "1단계 — 형식 고정",
        description:
          "회사에서 쓰는 주간 보고서 형식을 한 번 분석해 고정 템플릿으로 만든다.",
      },
      {
        title: "2단계 — 입력 프롬프트 설계",
        description:
          "흩어진 메모를 그 형식으로 변환하는 4축 프롬프트를 작성하고 다듬는다.",
      },
      {
        title: "3단계 — 한 주 시범 운영",
        description:
          "실제 이번 주 메모로 돌려보고, 어색한 부분을 프롬프트에 반영한다.",
      },
    ],
    verification: [
      "메모만 넣으면 형식이 맞는 초안이 나온다",
      "사람이 고치는 시간이 10분 이하다",
      "프롬프트가 문서로 저장돼 다음 주에 재사용된다",
    ],
    extensionIdeas: [
      "회의록 봇과 연결해 회의 결정사항을 자동으로 끌어오기",
      "월간 보고서용 프롬프트로 확장",
    ],
  },
  {
    id: "project-meeting-bot",
    slug: "meeting-notes-bot",
    title: "회의록 자동 정리 봇",
    hook: "회의는 끝났는데 회의록은 아직입니다. 녹취와 메모만 던지면 결정·할 일이 구조화돼 나오게 만듭니다.",
    targetLearner: "실무자·도입자·탐험가 — 코딩 없이 만드는 첫 자동화",
    targetJourneys: ["practitioner", "adopter", "explorer"],
    difficulty: "beginner",
    estimatedDuration: "1주",
    requiredStages: ["stage-2-ask", "stage-4-collaborate"],
    keyLessons: [
      "structure-of-good-prompts",
      "meeting-notes-pipeline",
      "build-personal-prompt-library",
    ],
    summary:
      "녹취·메모를 넣으면 결정·Action Item이 구조화된 회의록이 팀 툴에 자동으로 도착한다.",
    problem:
      "회의록은 미루면 기억이 휘발된다. 매번 손으로 정리하면 회의보다 정리에 더 오래 걸린다. 코딩 없이 만드는 첫 빌더 프로젝트로 좋다.",
    finalOutput:
      "녹취·메모 → 결정·Action Item이 구조화된 회의록 파이프라인",
    suggestedStack: ["Google Drive", "Make / n8n", "Claude"],
    milestones: [
      {
        title: "1단계 — 회의록 형식 정의",
        description:
          "결정사항·Action Item·다음 회의로 나눈 표준 형식을 정한다.",
      },
      {
        title: "2단계 — 변환 프롬프트",
        description:
          "녹취·메모를 그 형식으로 바꾸는 프롬프트를 만들고 검증한다.",
      },
      {
        title: "3단계 — 자동화 연결",
        description:
          "Make/n8n으로 파일 업로드 → 정리 → 팀 툴 전송을 하나로 잇는다.",
      },
    ],
    verification: [
      "녹취·메모를 올리면 손 안 대고 회의록이 나온다",
      "Action Item에 담당자·기한이 빠짐없이 들어간다",
      "팀 툴(Slack·Notion 등)로 결과가 자동 도착한다",
    ],
    extensionIdeas: [
      "주간 보고서 파이프라인과 연결",
      "회의 종류별(스탠드업·기획·회고) 형식 분기",
    ],
  },
  {
    id: "project-prompt-library",
    slug: "prompt-library-starter-kit",
    title: "팀 프롬프트 라이브러리 키트",
    hook: "좋은 프롬프트를 한 번 쓰고 채팅창에 흘려보냅니다. 그걸 모아 동료가 바로 쓰는 키트로 만듭니다.",
    targetLearner: "배운 걸 동료·팀과 나누고 싶은 학생-교육자·실무자",
    targetJourneys: ["explorer", "practitioner"],
    difficulty: "beginner",
    estimatedDuration: "1주",
    requiredStages: ["stage-2-ask", "stage-3-verify"],
    keyLessons: [
      "structure-of-good-prompts",
      "build-personal-prompt-library",
      "checks-before-trusting-ai-output",
    ],
    summary:
      "자주 쓰는 프롬프트 10개 이상을 형식·예시·주의점과 함께 정리한 공유 라이브러리.",
    problem:
      "프롬프트는 보통 개인 채팅 기록에만 남는다. 옆 사람은 매번 처음부터 헤매고, 좋은 패턴이 팀에 쌓이지 않는다. 흡수한 걸 곧바로 나누는 탐험가의 첫 산출물로 맞다.",
    finalOutput:
      "분류·사용법·검증 팁이 붙은 프롬프트 10개 이상의 공유 라이브러리",
    suggestedStack: ["Notion 또는 Markdown", "ChatGPT / Claude"],
    milestones: [
      {
        title: "1단계 — 수집",
        description:
          "최근 자기 채팅에서 효과를 본 프롬프트를 10개 이상 모은다.",
      },
      {
        title: "2단계 — 표준화",
        description:
          "각 프롬프트를 4축 구조로 다시 쓰고, 예시 입출력과 주의점을 붙인다.",
      },
      {
        title: "3단계 — 공개·피드백",
        description:
          "동료가 쓸 수 있게 공개하고, 한 명 이상에게 피드백을 받아 보강한다.",
      },
    ],
    verification: [
      "프롬프트마다 용도·예시·주의점이 있다",
      "처음 보는 사람이 설명 없이 쓸 수 있다",
      "동료 1명 이상이 실제로 써보고 피드백을 줬다",
    ],
    extensionIdeas: [
      "팀 위키에 상시 코너로 편입",
      "프롬프트별 검증 루프 추가",
    ],
  },
  {
    id: "project-ai-guideline",
    slug: "internal-ai-usage-guideline",
    title: "내부 AI 사용 가이드라인 v1",
    hook: "팀이 AI를 쓰기 시작했는데 규칙이 없습니다. 무엇이 되고 안 되는지 한 장으로 정리합니다.",
    targetLearner: "조직에 AI를 들여오는 기획자·매니저",
    targetJourneys: ["adopter"],
    difficulty: "beginner",
    estimatedDuration: "1~2주",
    requiredStages: ["stage-3-verify", "stage-7-operate"],
    keyLessons: [
      "checks-before-trusting-ai-output",
      "privacy-and-academic-ethics",
      "responsible-ai-policy-template",
    ],
    summary:
      "팀이 AI를 안전하게 쓰도록 허용 범위·금지 사항·검증 의무·민감정보 경계를 한 문서로.",
    problem:
      "가이드라인 없이 AI를 쓰면 민감정보 유출·환각 결과를 그대로 사용하는 사고가 개인 판단에 맡겨진다. 사고가 난 뒤 만들면 늦다.",
    finalOutput:
      "허용/금지·검증 의무·민감정보 처리·도구별 권장 사용을 담은 1~2장 내부 가이드라인 v1",
    suggestedStack: ["문서 도구 (Notion·Docs)", "ChatGPT / Claude"],
    milestones: [
      {
        title: "1단계 — 위험 목록",
        description:
          "우리 팀에서 실제로 일어날 수 있는 AI 오용·사고를 5개 이상 적는다.",
      },
      {
        title: "2단계 — 규칙화",
        description:
          "각 위험에 대응하는 해도 되는 것과 하면 안 되는 것을 문장으로 정한다.",
      },
      {
        title: "3단계 — 검토·합의",
        description:
          "동료·리더 1명 이상에게 검토받아 현실적인 수준으로 다듬는다.",
      },
    ],
    verification: [
      "민감정보·저작권·검증 의무가 모두 다뤄진다",
      "하면 안 되는 것이 모호하지 않다",
      "팀원이 읽고 바로 따를 수 있다",
    ],
    extensionIdeas: [
      "팀 단위 AI 도입 12주 로드맵으로 확장",
      "분기별 갱신 루프 만들기",
    ],
  },
  {
    id: "project-shop-calendar",
    slug: "local-shop-content-calendar",
    title: "동네 가게 콘텐츠 캘린더",
    hook: "가게 SNS에 뭘 올릴지 매일 고민합니다. 한 달치 콘텐츠 캘린더를 AI와 함께 한 번에 짭니다.",
    targetLearner: "가게·로컬 비즈니스를 운영하며 SNS를 직접 챙기는 사람",
    targetJourneys: ["creator", "practitioner"],
    difficulty: "beginner",
    estimatedDuration: "1주",
    requiredStages: ["stage-2-ask", "stage-4-collaborate"],
    keyLessons: [
      "structure-of-good-prompts",
      "local-business-content-calendar",
      "blog-writing-pipeline",
    ],
    summary:
      "가게의 메뉴·시즌·이벤트를 넣으면 한 달치 SNS 게시 주제와 초안이 캘린더로 나온다.",
    problem:
      "로컬 비즈니스 SNS는 오늘 뭐 올리지에서 매일 막힌다. 즉흥적으로 올리면 톤도 빈도도 들쭉날쭉해진다. 한 달치를 한 번에 잡으면 운영이 리듬을 탄다.",
    finalOutput:
      "한 달치 게시 주제 + 게시물 초안 + 톤 가이드가 담긴 콘텐츠 캘린더",
    suggestedStack: ["ChatGPT / Claude", "Google Sheets 또는 Notion"],
    milestones: [
      {
        title: "1단계 — 가게 맥락 정리",
        description:
          "메뉴·고객·시즌 이벤트·말투를 한 장으로 정리한다.",
      },
      {
        title: "2단계 — 주제 생성",
        description:
          "그 맥락으로 한 달치 게시 주제를 뽑고 요일·빈도에 배치한다.",
      },
      {
        title: "3단계 — 초안·톤 고정",
        description:
          "주제별 게시물 초안을 만들고, 일관된 톤 가이드를 확정한다.",
      },
    ],
    verification: [
      "한 달치 주제가 요일별로 배치돼 있다",
      "게시물마다 초안이 있어 바로 다듬어 올릴 수 있다",
      "톤 가이드가 있어 누가 써도 일관된다",
    ],
    extensionIdeas: [
      "블로그→쇼츠 파이프라인과 연결",
      "이미지 프롬프트까지 캘린더에 포함",
    ],
  },

  // ─── 중급 (intermediate) ─────────────────────────────────────
  {
    id: "project-content-pipeline",
    slug: "blog-to-shortform",
    title: "블로그→쇼츠 자동 파이프라인",
    hook: "블로그 글 하나를 쇼츠·뉴스레터·이미지 브리프로 다시 가공하느라 또 반나절을 씁니다. 그 재가공을 자동화합니다.",
    targetLearner: "크리에이터 — 콘텐츠 한 편을 여러 채널 포맷으로",
    targetJourneys: ["creator"],
    difficulty: "intermediate",
    estimatedDuration: "2주",
    requiredStages: ["stage-2-ask", "stage-4-collaborate"],
    keyLessons: [
      "blog-writing-pipeline",
      "blog-to-shorts-pipeline",
      "structure-of-good-prompts",
    ],
    summary:
      "블로그 글 1편을 쇼츠 스크립트·이미지 브리프·뉴스레터로 자동 재가공하는 파이프라인.",
    problem:
      "좋은 글 하나는 여러 채널 포맷으로 퍼질 때 가치가 산다. 그런데 채널마다 손으로 다시 쓰면 발행 빈도가 못 따라간다.",
    finalOutput:
      "블로그 글 1편 → 쇼츠 스크립트 + 이미지 브리프 + 뉴스레터 자동 생성",
    suggestedStack: ["Notion", "ChatGPT", "이미지 생성 도구"],
    milestones: [
      {
        title: "1단계 — 원본 분해",
        description:
          "블로그 글에서 핵심 메시지·훅·인용 가능한 조각을 뽑는 프롬프트를 만든다.",
      },
      {
        title: "2단계 — 채널별 변환",
        description:
          "쇼츠 스크립트·뉴스레터·이미지 브리프 각각의 변환 프롬프트를 설계한다.",
      },
      {
        title: "3단계 — 파이프라인 연결",
        description:
          "글 입력 → 3개 포맷 출력을 하나의 흐름으로 잇고 시범 운영한다.",
      },
    ],
    verification: [
      "글 1편을 넣으면 3개 포맷이 나온다",
      "각 포맷이 채널 특성에 맞다 (쇼츠는 짧고 훅이 강함 등)",
      "톤이 원본과 일관된다",
    ],
    extensionIdeas: [
      "채널별 발행 일정 자동화",
      "과거 글 아카이브를 소스로 재가공",
    ],
  },
  {
    id: "project-newsletter-desk",
    slug: "newsletter-ai-desk",
    title: "뉴스레터 AI 편집부",
    hook: "뉴스레터를 매주 보내려면 소재 찾고 쓰고 다듬는 전 과정이 부담입니다. AI를 편집부 동료로 두고 그 과정을 시스템으로 만듭니다.",
    targetLearner: "뉴스레터·정기 콘텐츠를 운영하는 크리에이터",
    targetJourneys: ["creator"],
    difficulty: "intermediate",
    estimatedDuration: "2~3주",
    requiredStages: ["stage-2-ask", "stage-3-verify", "stage-4-collaborate"],
    keyLessons: [
      "research-workflow",
      "blog-writing-pipeline",
      "checks-before-trusting-ai-output",
      "output-evaluation-refine",
    ],
    summary:
      "소재 리서치 → 초안 → 톤 교정 → 사실 검증까지, 뉴스레터 한 호를 만드는 반복 시스템.",
    problem:
      "뉴스레터는 한 번이 아니라 매주다. 매번 즉흥으로 만들면 품질이 흔들리고, 결국 발행이 멈춘다. 시스템으로 만들어야 끝까지 간다.",
    finalOutput:
      "리서치·초안·검증 단계가 정해진 뉴스레터 제작 시스템 + 실제 발행한 1호",
    suggestedStack: ["Notion", "ChatGPT / Claude", "뉴스레터 발송 도구"],
    milestones: [
      {
        title: "1단계 — 소재 루프",
        description:
          "매주 소재를 모으고 추리는 리서치 프롬프트와 절차를 만든다.",
      },
      {
        title: "2단계 — 초안·톤",
        description:
          "내 스타일 가이드를 정의하고, 초안을 그 톤으로 뽑는 프롬프트를 만든다.",
      },
      {
        title: "3단계 — 검증 게이트",
        description:
          "사실 오류·과장을 거르는 검증 단계를 발행 전에 붙인다.",
      },
      {
        title: "4단계 — 1호 발행",
        description:
          "시스템으로 실제 한 호를 만들어 발송하고 흐름을 점검한다.",
      },
    ],
    verification: [
      "소재→초안→검증이 정해진 절차로 돈다",
      "톤이 호마다 일관된다",
      "검증 단계에서 사실 오류를 잡은 기록이 있다",
      "실제로 1호를 발행했다",
    ],
    extensionIdeas: [
      "구독자 피드백을 다음 호 소재 루프에 반영",
      "RAG로 과거 호를 소스에 통합",
    ],
  },
  {
    id: "project-doc-qa",
    slug: "document-qa-bot",
    title: "문서 Q&A 봇",
    hook: "PDF·노트가 쌓여 있는데 정작 필요할 때 못 찾습니다. 내 문서에 자연어로 묻고 출처와 함께 답받는 앱을 만듭니다.",
    targetLearner: "엔지니어·파운더 — 내 문서에 답하는 첫 RAG 앱",
    targetJourneys: ["engineer", "founder"],
    difficulty: "intermediate",
    estimatedDuration: "2~3주",
    requiredStages: ["stage-2-ask", "stage-6-build"],
    keyLessons: [
      "understanding-embeddings",
      "document-chunking-strategy",
      "vector-search-basics",
      "grounded-rag-answers",
    ],
    summary:
      "내 PDF·노트를 업로드하면 출처 스니펫과 함께 답하는, 공개 URL로 배포된 RAG 웹앱.",
    problem:
      "검색은 키워드를 알아야 찾는다. 정작 'X에 대해 뭐라고 했더라'는 검색이 안 된다. 그리고 AI가 그냥 답하면 출처를 못 믿는다. RAG가 이 둘을 동시에 푼다.",
    finalOutput: "공개 URL로 배포된 문서 Q&A 웹앱 + 근거 스니펫 표시",
    suggestedStack: ["Next.js", "pgvector 또는 Pinecone", "OpenAI / Anthropic"],
    milestones: [
      {
        title: "1단계 — 인덱싱",
        description:
          "문서를 청크로 나누고 임베딩해 벡터 검색이 가능한 상태로 만든다.",
      },
      {
        title: "2단계 — 근거 있는 답변",
        description:
          "검색된 청크만 근거로 답하고 출처를 표시하는 RAG 흐름을 만든다.",
      },
      {
        title: "3단계 — 배포",
        description:
          "업로드·질문 UI를 붙여 공개 URL로 배포한다.",
      },
    ],
    verification: [
      "문서를 올리면 자연어 질문에 답한다",
      "답마다 출처 스니펫이 표시된다",
      "문서에 없는 내용은 모른다고 답한다",
      "공개 URL로 접속된다",
    ],
    extensionIdeas: [
      "접근 제어 추가",
      "여러 문서 컬렉션 분리",
    ],
  },
  {
    id: "project-onboarding-bot",
    slug: "team-onboarding-bot",
    title: "팀 온보딩 봇",
    hook: "신규 입사자는 같은 질문을 반복하고, 답하는 사람도 반복합니다. 사내 지식에 답하는 온보딩 봇으로 그 반복을 끝냅니다.",
    targetLearner: "도입자·파운더·엔지니어 — 사내 지식을 봇으로",
    targetJourneys: ["adopter", "founder", "engineer"],
    difficulty: "intermediate",
    estimatedDuration: "3주",
    requiredStages: ["stage-2-ask", "stage-6-build"],
    keyLessons: [
      "document-chunking-strategy",
      "grounded-rag-answers",
      "auth-and-user-sessions",
      "prompt-injection-defense",
    ],
    summary:
      "신규 입사자가 사내 문서·FAQ에 자연어로 묻는 Q&A 봇 — RAG + 접근 제어.",
    problem:
      "온보딩 지식은 위키 곳곳에 흩어져 있다. 신규 입사자는 어디 있는지 모르고, 결국 사람에게 물어 양쪽 시간을 쓴다.",
    finalOutput: "신규 입사자를 위한 사내 Q&A 봇 (RAG + 접근 제어)",
    suggestedStack: ["Next.js", "pgvector", "Supabase Auth"],
    milestones: [
      {
        title: "1단계 — 지식 인덱싱",
        description:
          "사내 문서·FAQ를 모아 RAG로 검색 가능하게 만든다.",
      },
      {
        title: "2단계 — 접근 제어",
        description:
          "로그인을 붙여 사내 사용자만 접근하게 한다.",
      },
      {
        title: "3단계 — 안전장치",
        description:
          "프롬프트 인젝션·민감정보 노출을 막는 방어선을 추가한다.",
      },
    ],
    verification: [
      "사내 문서 기반으로 정확히 답한다",
      "로그인한 사내 사용자만 접근된다",
      "인젝션 시도가 차단된다",
      "답에 출처가 표시된다",
    ],
    extensionIdeas: [
      "질문 로그로 자주 막히는 지점 분석",
      "Slack 봇으로 연결",
    ],
  },
  {
    id: "project-gpt-wrapper",
    slug: "gpt-wrapper-product",
    title: "특정 직군용 GPT 래퍼 제품",
    hook: "특정 직군이 매일 겪는 한 가지 불편을 AI로 푸는 작은 제품을 만들고, 시장에 내놓습니다.",
    targetLearner: "AI로 작은 제품을 띄우려는 1인 창업자·인디 해커",
    targetJourneys: ["founder"],
    difficulty: "intermediate",
    estimatedDuration: "3~4주",
    requiredStages: ["stage-2-ask", "stage-6-build", "stage-8-share"],
    keyLessons: [
      "ai-product-brief",
      "connect-ai-api",
      "structured-output-handling",
      "landing-page-for-ai-product",
      "early-user-recruitment-for-ai-products",
    ],
    summary:
      "한 직군의 반복 작업 하나를 AI로 자동화하는 좁은 제품 — 랜딩 페이지와 첫 사용자까지.",
    problem:
      "범용 챗봇은 누구의 문제도 끝까지 풀어주지 않는다. 좁은 직군의 구체적 한 작업에 맞추면 작은 제품도 제값을 한다.",
    finalOutput:
      "공개 URL 제품 + 가치를 설명하는 랜딩 페이지 + 첫 사용자 5명 피드백",
    suggestedStack: ["Next.js", "OpenAI / Anthropic API", "Vercel"],
    milestones: [
      {
        title: "1단계 — 직군·문제 정의",
        description:
          "한 직군의 반복 작업 하나를 골라 제품 브리프로 압축한다.",
      },
      {
        title: "2단계 — 핵심 흐름 빌드",
        description:
          "입력 → AI 처리 → 구조화된 출력의 한 흐름만 동작하게 만든다.",
      },
      {
        title: "3단계 — 랜딩·배포",
        description:
          "가치를 설명하는 랜딩 페이지를 붙여 공개 URL로 배포한다.",
      },
      {
        title: "4단계 — 첫 사용자",
        description:
          "그 직군 5명에게 직접 써보게 하고 피드백을 받는다.",
      },
    ],
    verification: [
      "한 직군의 구체적 문제를 끝까지 푼다",
      "공개 URL로 접속·사용된다",
      "랜딩 페이지가 가치를 한눈에 설명한다",
      "첫 사용자 5명의 피드백을 받았다",
    ],
    extensionIdeas: [
      "피드백 기반 v2 이터레이션",
      "유료 전환 실험",
    ],
  },

  // ─── 심화 (advanced) ─────────────────────────────────────────
  {
    id: "project-research-agent",
    slug: "personal-research-agent",
    title: "개인 리서치 에이전트",
    hook: "리서치 질문 하나를 던지면, 검색·요약·출처 정리까지 알아서 도는 에이전트를 만듭니다.",
    targetLearner: "엔지니어·파운더 — 도구를 쓰는 자율 에이전트",
    targetJourneys: ["engineer", "founder"],
    difficulty: "advanced",
    estimatedDuration: "3~4주",
    requiredStages: ["stage-2-ask", "stage-5-delegate", "stage-6-build"],
    keyLessons: [
      "mini-agent-loop",
      "tool-permission-safeguards",
      "grounded-rag-answers",
      "agent-failure-patterns",
    ],
    summary:
      "질문을 분해하고 웹 검색·요약·출처 정리를 수행해 보고서를 돌려주는 에이전트.",
    problem:
      "리서치는 검색→읽기→요약→출처 정리의 반복 노동이다. 단계마다 사람이 끼면 느리고, 에이전트에 통째로 맡기면 폭주한다. 종료 조건이 핵심이다.",
    finalOutput:
      "질문을 넣으면 웹 검색·요약·출처 정리를 수행하는 에이전트",
    suggestedStack: ["Node.js", "Claude Tools / Function Calling", "검색 API"],
    milestones: [
      {
        title: "1단계 — 도구 정의",
        description:
          "검색·읽기 도구를 정의하고 에이전트가 호출하게 한다.",
      },
      {
        title: "2단계 — 루프 + 종료 조건",
        description:
          "Thought-Action-Observation 루프에 종료 조건과 예산 한도를 건다.",
      },
      {
        title: "3단계 — 출처·실패 처리",
        description:
          "출처를 끝까지 추적하고, 실패 패턴에 대한 복구를 넣는다.",
      },
    ],
    verification: [
      "질문 하나로 검색→요약→출처 정리가 자동으로 돈다",
      "종료 조건이 있어 무한 루프·토큰 폭발이 없다",
      "결과에 출처가 추적된다",
      "도구 호출이 권한 범위 안에 머문다",
    ],
    extensionIdeas: [
      "RAG로 사내 자료를 검색 소스에 통합",
      "여러 질문 병렬 처리",
    ],
  },
  {
    id: "project-rag-analytics",
    slug: "rag-with-evals",
    title: "Evals 대시보드가 붙은 RAG",
    hook: "RAG는 만들기는 쉬워도 잘 되고 있는지는 안 보입니다. 품질·비용을 관측 가능한 RAG 시스템을 만듭니다.",
    targetLearner: "엔지니어 — 운영·평가까지 갖춘 RAG 시스템",
    targetJourneys: ["engineer"],
    difficulty: "advanced",
    estimatedDuration: "4주",
    requiredStages: ["stage-6-build", "stage-7-operate", "stage-8-share"],
    keyLessons: [
      "grounded-rag-answers",
      "llm-observability-and-regression",
      "output-evaluation-refine",
      "ai-app-cost-and-usage",
    ],
    summary:
      "단순 RAG를 넘어 품질·비용·안전성을 지속적으로 관측 가능한 형태로 만든다.",
    problem:
      "RAG는 데모는 잘 되다가 실제 질문에서 조용히 틀린다. 평가·관측이 없으면 품질이 떨어지는 걸 사용자가 먼저 발견한다.",
    finalOutput:
      "품질·비용·안전성을 관측 가능한 RAG 서비스 + 대시보드",
    suggestedStack: ["Next.js", "pgvector", "Promptfoo", "관측 도구 (Langfuse 등)"],
    milestones: [
      {
        title: "1단계 — RAG 베이스라인",
        description:
          "근거 있는 답변을 하는 RAG를 먼저 만든다.",
      },
      {
        title: "2단계 — 평가셋",
        description:
          "대표 질문·기대 답의 평가셋을 만들고 자동 채점을 붙인다.",
      },
      {
        title: "3단계 — 관측",
        description:
          "응답 품질·지연·비용을 기록하고 대시보드로 본다.",
      },
      {
        title: "4단계 — 회귀 감지",
        description:
          "변경 시 평가셋을 다시 돌려 품질 회귀를 잡는다.",
      },
    ],
    verification: [
      "RAG가 근거 있는 답을 한다",
      "평가셋으로 품질을 점수화한다",
      "비용·지연이 대시보드에 보인다",
      "변경 시 회귀를 자동으로 잡는다",
    ],
    extensionIdeas: [
      "A/B로 프롬프트·청크 전략 비교",
      "SLO 알림 연결",
    ],
  },
  {
    id: "project-ai-saas-mvp",
    slug: "ai-saas-mvp",
    title: "AI 코어 SaaS MVP",
    hook: "아이디어 단계의 AI 제품을, 4주 안에 결제까지 되는 진짜 MVP로 끝까지 밀어붙입니다.",
    targetLearner: "AI를 코어로 한 SaaS를 띄우려는 창업자",
    targetJourneys: ["founder"],
    difficulty: "advanced",
    estimatedDuration: "4주",
    requiredStages: ["stage-6-build", "stage-7-operate", "stage-8-share"],
    keyLessons: [
      "ai-product-brief",
      "connect-ai-api",
      "ai-app-cost-and-usage",
      "capstone-build-loop",
      "pricing-and-monetization",
      "early-user-recruitment-for-ai-products",
    ],
    summary:
      "AI를 코어로 한 작은 SaaS — 랜딩·결제·핵심 기능·첫 사용자까지 4주 캡스톤.",
    problem:
      "AI 제품 아이디어는 많지만 대부분 데모에서 멈춘다. 결제와 첫 사용자가 붙어야 비로소 제품이고, 거기서 진짜 학습이 시작된다.",
    finalOutput:
      "공개 URL SaaS MVP (랜딩 + 결제 + 핵심 기능) + 첫 10명 사용자 + 런칭 회고",
    suggestedStack: ["Next.js", "OpenAI / Anthropic API", "결제 (Stripe 등)", "Vercel"],
    milestones: [
      {
        title: "1단계 — 범위 압축",
        description:
          "가장 위험한 가정 하나를 골라 4주에 검증 가능한 범위로 좁힌다.",
      },
      {
        title: "2단계 — 핵심 기능",
        description:
          "AI 코어 기능 하나를 비용 추적·인젝션 방어와 함께 만든다.",
      },
      {
        title: "3단계 — 랜딩·결제",
        description:
          "가치를 설명하는 랜딩과 결제 흐름을 붙인다.",
      },
      {
        title: "4단계 — 런칭·회고",
        description:
          "공개 배포하고 첫 10명 사용자 피드백을 모아 회고를 쓴다.",
      },
    ],
    verification: [
      "AI 코어 기능이 공개 URL에서 동작한다",
      "결제 흐름이 실제로 작동한다",
      "비용 추적·인젝션 방어가 적용됐다",
      "첫 사용자 10명 피드백과 런칭 회고가 있다",
    ],
    extensionIdeas: [
      "피드백 기반 v2 이터레이션",
      "관측·평가 루프 추가 (rag-with-evals 참고)",
    ],
  },
];
