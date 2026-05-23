import type { Journey } from "@/lib/types";

/**
 * 5개의 출발 여정.
 *
 * 학교의 약속 — "출발점이 어디든, 빌더가 됩니다."
 *
 * 2026-05-23 — 6 → 5 정비
 *   - Adopter는 Practitioner의 "팀 확장 모드"로 흡수 (학습 경로가 동일)
 *   - Explorer는 "처음부터 AI를 모국어로 빌더가 되는" 정체성 Native로 대체
 *
 * Native 는 위치 없음(입문)의 자리, 나머지 4개(Practitioner / Creator / Founder / Engineer)
 * 는 이미 어느 위치를 가진 사람의 자리. 5개의 색이 합쳐지면 brand 무지개 conic 마크가 됩니다.
 */
export const journeys: Journey[] = [
  {
    id: "native",
    slug: "native",
    title: "Native",
    titleKo: "네이티브",
    identity: "AI를 모국어로 처음 빌더가 되는 사람",
    targetLearner:
      "코딩·콘텐츠·사업 — 어디서든 빌더에 처음 입문하는 사람. 비전공·career changer·학생·은퇴자·취미 빌더. 기존 워크플로우가 없고, 처음부터 AI를 도구로 익히는 사람.",
    promise:
      "선행 학습 없이, AI를 모국어 삼아 첫 산출물을 손에 쥡니다.",
    recommendedStages: [
      "stage-1-meet",
      "stage-2-ask-and-refine",
      "stage-3-collaborate",
    ],
    recommendedLessons: [
      "what-is-an-llm",
      "ai-service-landscape",
      "ai-chat-features-basics",
      "zero-coding-orientation",
      "terminal-first-day",
      "git-basics-and-terminology",
      "ai-tool-account-and-cost",
      "common-skills-of-future-proof-people",
      "ai-delegation-decision",
    ],
    capstoneIdeas: [
      "내 손으로 만든 첫 마이크로 사이트 (GitHub Pages 1장)",
      "첫 AI 어시스턴트 — ChatGPT/Claude 프로젝트로 만든 나만의 GPT 1개",
      "일상 자동화 1개 — 매일 반복하던 작업을 AI 파이프라인으로",
    ],
    expectedOutcome:
      "AI를 모국어로 만든 첫 산출물 1개 + 다음 여정(Practitioner/Creator/Founder/Engineer) 중 자기 자리를 발견.",
  },
  {
    id: "practitioner",
    slug: "practitioner",
    title: "Practitioner",
    titleKo: "실무자",
    identity: "일과 조직에 AI를 붙이는 사람",
    targetLearner:
      "보고서·이메일·회의록·리서치를 매일 다루는 직장인. 자기 일에 AI를 깔아 시간을 되찾고, 그 결과를 팀·조직으로 확장하는 사람. (옛 Adopter의 정책·평가 영역도 여기 포함)",
    promise:
      "내 업무를 AI로 운영하고, 그 결과를 팀에 안전하게 확산합니다.",
    recommendedStages: [
      "stage-1-meet",
      "stage-2-ask-and-refine",
      "stage-3-collaborate",
      "stage-6-operate-and-share",
    ],
    recommendedLessons: [
      "common-skills-of-future-proof-people",
      "structure-of-good-prompts",
      "checks-before-trusting-ai-output",
      "automate-report-drafts",
      "meeting-notes-pipeline",
      "research-workflow",
      "ai-output-eval-for-pms",
      "responsible-ai-policy-template",
      "ai-app-cost-and-usage",
    ],
    capstoneIdeas: [
      "주간 보고서 초안 자동 파이프라인",
      "팀 회의록 자동 정리 봇",
      "사내 위키 기반 5분 Q&A 노트",
      "팀 단위 AI 도입 12주 로드맵 + 사내 AI 사용 가이드라인 v1",
    ],
    expectedOutcome:
      "AI 업무 플레이북 + 팀에 공유 가능한 프롬프트 세트 + 매주 5시간 이상의 시간 회복. 필요하면 사내 도입 가이드까지.",
  },
  {
    id: "creator",
    slug: "creator",
    title: "Creator",
    titleKo: "크리에이터",
    identity: "AI로 콘텐츠를 만드는 사람",
    targetLearner:
      "블로그·뉴스레터·유튜브·숏폼 등을 운영하며 AI로 표현력과 속도를 키우려는 크리에이터.",
    promise:
      "AI를 부속으로 쓰지 않고, 표현의 폭을 넓히는 도구로 다룹니다.",
    recommendedStages: [
      "stage-1-meet",
      "stage-2-ask-and-refine",
      "stage-3-collaborate",
      "stage-6-operate-and-share",
    ],
    recommendedLessons: [
      "structure-of-good-prompts",
      "research-workflow",
      "blog-writing-pipeline",
      "blog-to-shorts-pipeline",
      "youtube-script-research-to-outline",
    ],
    capstoneIdeas: [
      "블로그 → 쇼츠 자동 파이프라인",
      "뉴스레터 AI 편집부 + 톤 일관성 가드",
      "개인 에디토리얼 OS (아이디어→발행)",
    ],
    expectedOutcome:
      "콘텐츠 자동화 파이프라인 1개 + 내 스타일 가이드 + 발행 빈도 2배.",
  },
  {
    id: "founder",
    slug: "founder",
    title: "Founder",
    titleKo: "파운더",
    identity: "AI로 제품·사업을 띄우는 사람",
    targetLearner:
      "AI로 제품·사업·사이드프로젝트를 띄우려는 솔로프리뉴어, 인디 해커, 1인 창업자. 코드보다 시장과 가치가 본업인 사람.",
    promise:
      "AI를 코어로 한 작은 제품을 직접 손으로 만들고, 시장에 내놓습니다.",
    recommendedStages: [
      "stage-1-meet",
      "stage-2-ask-and-refine",
      "stage-3-collaborate",
      "stage-4-coding-agent",
      "stage-5-build-systems",
      "stage-6-operate-and-share",
    ],
    recommendedLessons: [
      "coding-agent-setup",
      "github-issue-to-ai-brief",
      "connect-ai-api",
      "structured-output-handling",
      "ai-app-cost-and-usage",
      "capstone-plan-and-launch",
    ],
    capstoneIdeas: [
      "AI 코어 SaaS MVP (랜딩 + 결제 + 첫 10명 사용자)",
      "특정 직군 위한 GPT 래퍼 제품 (시장 검증 포함)",
      "사이드 프로젝트 → 첫 매출 100만원 도달기",
    ],
    expectedOutcome:
      "공개 URL로 배포된 제품 1개 + 비용 시뮬레이션 + 런칭 회고 + 첫 사용자 피드백 수집.",
  },
  {
    id: "engineer",
    slug: "engineer",
    title: "Engineer",
    titleKo: "엔지니어",
    identity: "AI 시스템을 깊게 짓는 사람",
    targetLearner:
      "RAG·Agents·Evals를 깊이 다루고 싶은 실무 개발자·ML 엔지니어·AI 시스템을 책임지는 사람.",
    promise:
      "평가·보안까지 포함된, 운영 가능한 AI 시스템을 짓는 엔지니어가 됩니다.",
    recommendedStages: [
      "stage-1-meet",
      "stage-2-ask-and-refine",
      "stage-4-coding-agent",
      "stage-5-build-systems",
      "stage-6-operate-and-share",
    ],
    recommendedLessons: [
      "plan-with-ai",
      "write-tests-with-coding-agent",
      "grounded-rag-answers",
      "mini-agent-loop",
      "tool-permission-safeguards",
      "prompt-injection-defense",
    ],
    capstoneIdeas: [
      "Evals 대시보드가 붙은 RAG 시스템",
      "권한·로깅·복구가 포함된 미니 에이전트 플랫폼",
      "사내 코드베이스 인덱싱 + 코드 Q&A 봇",
    ],
    expectedOutcome:
      "검증·보안·배포가 모두 포함된 심화 캡스톤 + 회고 문서.",
  },
];
