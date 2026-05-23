// 레슨에서 바로 복사해 쓰는 재사용 템플릿 — 프롬프트·미션·체크리스트.
// /templates 페이지가 kind별로 묶어 렌더한다.
import type { ContentTemplate } from "@/lib/types";

export const templates: ContentTemplate[] = [
  // ─── 프롬프트 ────────────────────────────────────────────────
  {
    id: "tpl-4axis-prompt",
    slug: "four-axis-prompt",
    title: "4축 프롬프트 템플릿",
    kind: "prompt",
    targetJourneys: [],
    summary: "Task / Context / Constraints / Output을 분리해 쓰는 재현 가능한 프롬프트.",
    body: `# Task
(AI가 해야 하는 최종 결과물)

# Context
- 사용자:
- 배경:
- 이미 알고 있는 것:

# Constraints
- 톤/문체:
- 길이:
- 금지 사항:

# Output
- 형식:
- 예시:`,
    tags: ["prompt", "structure"],
  },
  {
    id: "tpl-role-persona-prompt",
    slug: "role-persona-prompt",
    title: "역할 지정 프롬프트",
    kind: "prompt",
    targetJourneys: [],
    summary: "AI에게 역할을 부여해 답의 관점과 깊이를 고정하는 프롬프트.",
    body: `# 역할
너는 <전문 역할 — 예: 10년차 데이터 분석가>다.

# 관점
- 누구에게 말하는가: <대상 독자>
- 무엇을 우선하는가: <정확성 / 속도 / 쉬운 설명>

# 작업
<해야 할 일 한 문장>

# 답변 규칙
- 모르면 모른다고 말한다
- 추측에는 "추측"이라고 표시한다
- 도메인 용어/금지어: <목록>`,
    tags: ["prompt", "role"],
  },
  {
    id: "tpl-output-format-prompt",
    slug: "output-format-prompt",
    title: "출력 형식 강제 프롬프트",
    kind: "prompt",
    targetJourneys: ["practitioner", "founder", "engineer"],
    summary: "AI 답을 정해진 구조(표·JSON·스키마)로만 받게 강제하는 프롬프트.",
    body: `# 작업
<처리할 입력과 원하는 결과>

# 출력 형식 — 아래 구조만, 다른 말 없이
{
  "<필드1>": "<값 설명>",
  "<필드2>": ["<배열 요소 설명>"]
}

# 규칙
- 위 구조 외의 인사말·설명·여는말 금지
- 값을 모르면 null
- 형식이 깨지면 스스로 다시 생성`,
    tags: ["prompt", "format"],
  },
  {
    id: "tpl-step-reasoning-prompt",
    slug: "step-reasoning-prompt",
    title: "단계적 추론 프롬프트",
    kind: "prompt",
    targetJourneys: [],
    summary: "결론 전에 근거를 단계로 펼치게 해 성급한 답을 막는 프롬프트.",
    body: `# 문제
<판단·계산이 필요한 문제>

# 풀이 방식
1. 문제를 더 작은 질문으로 나눈다
2. 각 질문을 하나씩 푼다 — 근거를 함께 적는다
3. 중간 결과를 점검한다 (모순이 없는가)
4. 마지막에 한 문장 결론을 낸다

# 출력
- "풀이" — 1~4단계
- "결론" — 한 문장
- "확신도" — 상/중/하 + 이유`,
    tags: ["prompt", "reasoning"],
  },
  {
    id: "tpl-few-shot-prompt",
    slug: "few-shot-prompt",
    title: "예시 기반(Few-shot) 프롬프트",
    kind: "prompt",
    targetJourneys: [],
    summary: "예시 2~3개로 원하는 패턴을 보여줘 일관된 출력을 끌어내는 프롬프트.",
    body: `# 작업
아래 예시와 같은 방식으로 마지막 입력을 처리한다.

# 예시 1
입력: <예시 입력>
출력: <원하는 출력>

# 예시 2
입력: <예시 입력>
출력: <원하는 출력>

# 실제 입력
입력: <처리할 실제 입력>
출력:`,
    tags: ["prompt", "few-shot"],
  },
  {
    id: "tpl-self-check-prompt",
    slug: "self-check-prompt",
    title: "자기 검증 프롬프트",
    kind: "prompt",
    targetJourneys: [],
    summary: "AI가 자기 답을 한 번 더 비판·검증하게 만드는 2단 프롬프트.",
    body: `# 1단계 — 초안
<원래 작업 지시>

# 2단계 — 자기 검증
위 초안을 다음 기준으로 점검하고 고친다.
- 사실 오류 / 출처 없는 단정이 있는가
- 질문에 실제로 답했는가
- 빠진 조건이 있는가

# 출력
- "초안"
- "발견한 문제"
- "수정본"`,
    tags: ["prompt", "verification"],
  },
  {
    id: "tpl-long-doc-summary-prompt",
    slug: "long-doc-summary-prompt",
    title: "긴 문서 요약 프롬프트",
    kind: "prompt",
    targetJourneys: ["practitioner", "creator", "native"],
    summary: "긴 문서를 목적에 맞춰 행동 항목까지 뽑아내는 요약 프롬프트.",
    body: `# 문서
<여기에 문서를 붙여넣거나 첨부>

# 요약 목적
<왜 요약하나 — 예: 회의 전 5분 파악>

# 출력
- "한 줄 요약"
- "핵심 3~5가지" — 불릿
- "내가 챙길 것" — 행동 항목만
- "원문 확인 필요" — 요약이 놓쳤을 수 있는 부분`,
    tags: ["prompt", "summary"],
  },
  {
    id: "tpl-compare-options-prompt",
    slug: "compare-options-prompt",
    title: "옵션 비교 프롬프트",
    kind: "prompt",
    targetJourneys: ["practitioner", "founder", "engineer"],
    summary: "두세 선택지를 같은 기준으로 표 비교하고 추천까지 받는 프롬프트.",
    body: `# 결정할 것
<무엇을 고르는가>

# 선택지
- A: <선택지 A>
- B: <선택지 B>

# 비교 기준
<기준 3~5개 — 예: 비용 / 학습 곡선 / 확장성>

# 출력
- 기준별 비교 표 (행=기준, 열=선택지)
- 각 선택지의 "이럴 때 고른다" 한 줄
- 추천 1개 + 이유`,
    tags: ["prompt", "decision"],
  },
  {
    id: "tpl-meeting-notes-prompt",
    slug: "meeting-notes-prompt",
    title: "회의록 정리 프롬프트",
    kind: "prompt",
    targetJourneys: ["practitioner", "native"],
    summary: "녹취·메모를 결정·할 일 중심 회의록으로 구조화하는 프롬프트.",
    body: `# 입력
<회의 녹취 또는 메모>

# 출력 — 아래 형식으로
## 결정사항
- <결정 + 한 줄 배경>

## Action Item
- [ ] <할 일> — 담당: <이름> · 기한: <날짜>

## 보류·다음 회의
- <결론 안 난 것>

# 규칙
- 잡담·중복 제거
- 담당/기한이 불명확하면 "(미정)"으로 표시`,
    tags: ["prompt", "work"],
  },
  {
    id: "tpl-prompt-debug-prompt",
    slug: "prompt-debug-prompt",
    title: "프롬프트 디버깅 프롬프트",
    kind: "prompt",
    targetJourneys: [],
    summary: "원하는 답이 안 나오는 프롬프트를 AI에게 진단·교정받는 프롬프트.",
    body: `# 안 되는 프롬프트
<원래 프롬프트 원문>

# 기대한 결과
<무엇을 원했나>

# 실제 결과
<무엇이 나왔나 — 어디가 틀렸나>

# 요청
1. 왜 기대와 어긋났는지 원인을 짚어라
2. 프롬프트의 어느 부분이 모호한지 표시하라
3. 고친 프롬프트 전문을 다시 써라`,
    tags: ["prompt", "debug"],
  },

  // ─── 미션 ────────────────────────────────────────────────────
  {
    id: "tpl-codex-mission",
    slug: "codex-mission-template",
    title: "Codex 미션 템플릿",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "Codex에게 주는 실행 가능한 작업지시서.",
    body: `# Goal
무엇을 완료해야 하는가.

# Context
- 관련 파일:
- 관련 이슈/PR:
- 관습/스타일 가이드:

# Steps
1. 탐색: 관련 파일 나열
2. 계획: 변경 파일과 테스트 전략
3. 구현: 최소 변경
4. 검증: 테스트/린트/타입체크 실행

# Acceptance
- 테스트 통과
- 변경 파일 목록 출력
- 위험 지점 요약`,
    tags: ["mission", "codex"],
  },
  {
    id: "tpl-claude-mission",
    slug: "claude-code-mission-template",
    title: "Claude Code 미션 템플릿",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "Claude Code에게 주는 계획→구현→검증 미션 프롬프트.",
    body: `# Claude Code Mission
- Target: <작업 이름>
- Scope: <범위 정의>

# Steps
1. Plan: 변경 파일 목록과 테스트 전략 출력
2. Implement: 최소 변경
3. Verify: lint, typecheck, build 실행

# Stop Points
- 외부 API 키 필요 시 작업 중단 후 질문
- 파일 삭제 전 사용자 확인 요구`,
    tags: ["mission", "claude"],
  },
  {
    id: "tpl-issue-brief-mission",
    slug: "github-issue-brief-mission",
    title: "이슈 → AI 브리프 미션",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "거친 GitHub 이슈를 코딩 에이전트가 실행 가능한 브리프로 바꾸는 미션.",
    body: `# 입력 — 원본 이슈
<이슈 제목 + 본문 붙여넣기>

# 미션
위 이슈를 코딩 에이전트용 브리프로 다시 쓴다.

# 브리프 형식
- 목표: 한 문장
- 범위: 건드릴 것 / 건드리지 말 것
- 관련 파일: 추정 경로
- 완료 기준: 검증 가능한 항목
- 위험: 막히면 멈추고 물어볼 지점`,
    tags: ["mission", "workflow"],
  },
  {
    id: "tpl-bug-fix-mission",
    slug: "bug-fix-mission",
    title: "버그 수정 미션",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "버그를 재현→원인→최소 수정→검증 순으로 처리하는 미션.",
    body: `# 버그
- 증상: <무엇이 잘못되나>
- 재현: <단계>
- 기대: <원래 동작>

# 미션
1. 재현: 실패하는 테스트나 재현 절차를 먼저 만든다
2. 원인: 추측 말고 로그·상태로 원인을 확인한다
3. 수정: 원인만 고치는 최소 변경
4. 검증: 재현이 사라졌는지 + 기존 테스트 통과

# 멈춤
- 원인이 불확실하면 수정 전에 멈추고 보고`,
    tags: ["mission", "debug"],
  },
  {
    id: "tpl-test-writing-mission",
    slug: "test-writing-mission",
    title: "테스트 작성 미션",
    kind: "mission",
    targetJourneys: ["engineer"],
    summary: "코딩 에이전트에게 의미 있는 테스트를 작성시키는 미션.",
    body: `# 대상
<테스트할 함수/모듈/기능>

# 미션
다음 케이스를 덮는 테스트를 작성한다.
- 정상 경로 1개
- 경계값 (빈 입력 / 최대 / 0 등)
- 실패 경로 (잘못된 입력 → 기대 에러)

# 규칙
- 테스트 이름은 무엇을 검증하는지 드러나게
- 구현을 베끼지 말고 동작을 검증
- 실행해서 통과 확인 후 결과 보고`,
    tags: ["mission", "testing"],
  },
  {
    id: "tpl-pr-review-mission",
    slug: "pr-review-mission",
    title: "PR 리뷰 미션",
    kind: "mission",
    targetJourneys: ["engineer", "founder"],
    summary: "AI가 만든(또는 받은) PR을 체계적으로 리뷰하게 하는 미션.",
    body: `# 입력
<PR diff 또는 변경 파일 목록>

# 리뷰 관점
1. 정확성 — 의도한 동작을 하는가, 빠진 케이스는
2. 안전 — 입력 검증·권한·시크릿 노출
3. 범위 — 이슈 범위를 벗어난 변경은 없는가
4. 가독성 — 6개월 뒤에도 읽히는가

# 출력
- 심각도별(높음/보통/낮음) 지적
- 각 지적에 "왜 문제인가 + 제안"
- 머지 가능 여부: 예 / 아니오 + 이유`,
    tags: ["mission", "review"],
  },

  // ─── 체크리스트 ──────────────────────────────────────────────
  {
    id: "tpl-rag-checklist",
    slug: "rag-checklist",
    title: "RAG 품질 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "founder"],
    summary: "RAG 앱이 배포 가능한지 검사하는 기본 체크리스트.",
    body: `- [ ] 모든 답에 최소 1개 출처가 표시됨
- [ ] 출처가 실제 청크와 일치
- [ ] 근거 없는 질문에 답을 거부
- [ ] 청킹 전략이 문서화됨
- [ ] 하이브리드 검색 평가가 있음
- [ ] 사용자 피드백 경로가 존재
- [ ] 비용 시뮬레이션이 존재`,
    tags: ["rag", "checklist"],
  },
  {
    id: "tpl-agent-checklist",
    slug: "agent-checklist",
    title: "에이전트 안전 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "founder"],
    summary: "도구 사용 에이전트를 배포 전에 확인할 항목.",
    body: `- [ ] 도구별 권한이 allow/deny 리스트로 명시됨
- [ ] 위험 동작 앞에 사람 확인 단계가 있음
- [ ] 최대 스텝/타임아웃이 설정됨
- [ ] 사용자 입력과 시스템 지시가 분리됨
- [ ] 외부 콘텐츠 주입이 격리됨
- [ ] 모든 도구 호출에 로그가 남음
- [ ] 실패 시 복구 경로가 있음`,
    tags: ["agents", "checklist", "security"],
  },
  {
    id: "tpl-security-checklist",
    slug: "ai-service-security-checklist",
    title: "AI 서비스 보안 체크리스트",
    kind: "checklist",
    targetJourneys: ["engineer", "practitioner", "founder"],
    summary: "AI 제품을 공개하기 전 기본적인 보안·프라이버시 점검.",
    body: `- [ ] 키/시크릿이 서버에만 존재
- [ ] 사용자 입력 PII 마스킹 정책
- [ ] 출력에 PII/민감정보가 반복 저장되지 않음
- [ ] 프롬프트 인젝션 회귀 테스트 존재
- [ ] 레이트 리밋/과금 한도 설정
- [ ] 감사 로그(audit log) 보관 기간 정의
- [ ] 사용자 데이터 삭제 요청 처리 경로`,
    tags: ["security", "checklist"],
  },
  {
    id: "tpl-judgment-checklist",
    slug: "ai-judgment-checklist",
    title: "AI 사용 판단 체크리스트",
    kind: "checklist",
    targetJourneys: [],
    summary: "AI 결과를 업무에 쓸지 말지 5분 안에 결정하기 위한 질문.",
    body: `- [ ] 이 결과를 내가 직접 검증했는가
- [ ] 출처가 있는가 / 출처를 확인했는가
- [ ] 가정이 명시되었는가
- [ ] 내 책임 영역 밖을 건드리는가
- [ ] 수치/고유명사가 실제와 일치하는가
- [ ] 편향이 있을 만한 입력이었는가
- [ ] 실패 시 누가 책임지는가가 분명한가`,
    tags: ["literacy", "checklist"],
  },
  {
    id: "tpl-prompt-quality-checklist",
    slug: "prompt-quality-checklist",
    title: "프롬프트 품질 체크리스트",
    kind: "checklist",
    targetJourneys: [],
    summary: "프롬프트를 라이브러리에 넣기 전 좋은 프롬프트인지 점검.",
    body: `- [ ] 작업(Task)이 한 문장으로 분명한가
- [ ] 맥락(Context)이 충분하되 군더더기는 없는가
- [ ] 출력 형식이 지정됐는가
- [ ] 금지 사항·제약이 명시됐는가
- [ ] 예시가 1개 이상 있는가 (필요한 경우)
- [ ] 다른 사람이 그대로 써도 같은 품질이 나오는가
- [ ] 모를 때 어떻게 행동할지 지시했는가`,
    tags: ["prompt", "checklist"],
  },
  {
    id: "tpl-output-verification-checklist",
    slug: "output-verification-checklist",
    title: "AI 출력 검증 체크리스트",
    kind: "checklist",
    targetJourneys: [],
    summary: "AI 결과를 실제로 쓰기 전 무엇을 어떻게 확인할지의 절차.",
    body: `- [ ] 수치·날짜·고유명사를 원본과 대조했는가
- [ ] 인용·출처가 실재하는지 직접 확인했는가
- [ ] 단정적 주장에 근거가 붙어 있는가
- [ ] 최신성이 중요한 정보인가 (모델 지식 시점 확인)
- [ ] 반대 사례·예외를 한 번 물어봤는가
- [ ] 이 결과로 내릴 결정의 되돌리기 비용을 따졌는가`,
    tags: ["verification", "checklist"],
  },
  {
    id: "tpl-launch-readiness-checklist",
    slug: "launch-readiness-checklist",
    title: "AI 앱 런칭 전 체크리스트",
    kind: "checklist",
    targetJourneys: ["founder", "engineer"],
    summary: "AI 제품을 공개 URL로 내놓기 전 마지막 점검.",
    body: `- [ ] 핵심 사용자 흐름 1개가 끝까지 동작한다
- [ ] API 키·시크릿이 클라이언트에 노출되지 않는다
- [ ] spending limit·레이트 리밋이 설정됐다
- [ ] 프롬프트 인젝션 기본 방어가 있다
- [ ] 에러 시 사용자에게 보이는 메시지가 정돈됐다
- [ ] 공개 URL이 실제로 열린다 (다른 기기·시크릿 창)
- [ ] README에 무엇·왜·어떻게가 적혀 있다
- [ ] 첫 사용자에게 물어볼 피드백 질문 3개를 준비했다`,
    tags: ["launch", "checklist"],
  },
  {
    id: "tpl-ai-cost-checklist",
    slug: "ai-cost-checklist",
    title: "AI 비용 점검 체크리스트",
    kind: "checklist",
    targetJourneys: ["founder", "engineer", "practitioner"],
    summary: "AI 기능의 비용이 새지 않는지 매주 5분에 점검.",
    body: `- [ ] 이번 주 토큰 사용량·비용을 확인했다
- [ ] 가장 비싼 호출 경로가 무엇인지 안다
- [ ] 루프·재시도가 호출 수를 폭증시키지 않는다
- [ ] 긴 컨텍스트를 매번 통째로 보내고 있지는 않은가
- [ ] 캐시·배치로 줄일 수 있는 호출이 있는가
- [ ] spending limit이 현재 규모에 맞게 설정됐다
- [ ] 비용 급증 시 알림이 오는가`,
    tags: ["cost", "checklist"],
  },
];
