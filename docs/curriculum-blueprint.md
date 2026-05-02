# Curriculum Blueprint — AI Builder School

> 12-Phase 커리큘럼 설계도. MVP는 8주 경로를 강조한다.

## 0. 설계 원칙

1. **루프가 곧 커리큘럼이다**: 모든 레슨이 문제→개념→미션→빌드→검증→배포→회고의 7단계를 따른다.
2. **산출물이 곧 학습이다**: 각 Phase는 적어도 하나의 포트폴리오 가능한 산출물을 낸다.
3. **도구 중립**: Codex 미션과 Claude Code 미션을 모두 제공하고, 둘 다 작동하도록 작성.
4. **페르소나 레이어**: Phase마다 `targetPersonas`를 명시해 트랙이 이를 조합해 경로를 만든다.
5. **점진적 복잡도**: Phase 1(리터러시)에서 Phase 12(캡스톤)로 갈수록 학습자 주도권이 증가.

## 1. 12 Phase 개요

| # | Slug | 제목(KO) | 목표 | 예상시간 | 대상 |
|---|---|---|---|---|---|
| 0 | `phase-0-setup` | AI 학습 환경 세팅 | 코딩 에이전트 + 저장소 + 키 세팅 | 4h | all |
| 1 | `phase-1-ai-literacy` | AI Literacy | 맹신 없이 AI 사용 | 6h | all |
| 2 | `phase-2-prompt-engineering` | Prompt & Context Engineering | 모호함을 작업지시서로 | 8h | all |
| 3 | `phase-3-ai-work-os` | AI Work OS | 업무 자동화 OS 구축 | 10h | office/planner |
| 4 | `phase-4-coding-agents` | Codex / Claude Code Workflow | 페어 프로그래머·리뷰어·테스터 | 12h | developer/engineer |
| 5 | `phase-5-ai-app-dev` | AI App Development | 작은 AI 웹앱 배포 | 16h | developer |
| 6 | `phase-6-rag` | Data, Embedding & RAG | 내 문서에 답하는 AI | 14h | developer/engineer |
| 7 | `phase-7-agents-mcp` | Tool Use, Agents & MCP | 도구 쓰는 AI 워크플로우 | 14h | developer/engineer |
| 8 | `phase-8-multimodal` | Multimodal & Content Automation | 텍스트·이미지·오디오·비디오 파이프 | 10h | creator |
| 9 | `phase-9-data-decision` | Data Analysis & Decision AI | 분석과 의사결정 보조 | 10h | planner/office |
| 10 | `phase-10-evals-security` | Evals, Security & Responsible AI | 신뢰할 수 있는 AI | 10h | all |
| 11 | `phase-11-product` | AI Product & Monetization | 제품화·수익화 | 10h | planner/developer/creator |
| 12 | `phase-12-capstone` | Capstone Projects | 포트폴리오 프로젝트 | 20h+ | all |

## 2. 8주 MVP 경로 (Week Path)

MVP에서 강조하는 "8주 빠른 경로"는 Phase를 주차에 매핑한 것이다.

| Week | Phase | 주제 | 주요 산출물 |
|---|---|---|---|
| 1 | 1 | AI Literacy & Tool Map | 판단 체크리스트 |
| 2 | 2 | Prompt / Context Engineering | 개인 프롬프트 라이브러리 |
| 3 | 3 | AI Work OS | AI 업무 플레이북 |
| 4 | 4 | Codex / Claude Code Workflow | 코딩 에이전트 루틴 |
| 5 | 5 | AI App MVP | 작은 AI 웹앱 |
| 6 | 6 | RAG Basics | 문서 Q&A 봇 |
| 7 | 7 | Agent / MCP Basics | 미니 워크플로우 에이전트 |
| 8 | 12 | Capstone & Launch | 배포된 AI 프로젝트 |

## 3. Track ↔ Phase 매핑

| 트랙 | 필수 Phase | 선택 Phase |
|---|---|---|
| 일반 직장인 | 0,1,2,3,9 | 10 |
| 기획자·관리자 | 0,1,2,3,9,10,11 | 6 |
| 개발자·앱 빌더 | 0,1,2,4,5,6,7,10,12 | 11 |
| 콘텐츠 크리에이터 | 0,1,2,3,8,11 | 9 |
| AI 엔지니어 심화 | 0,2,4,5,6,7,10,12 | 11 |

## 4. 레슨 ↔ Phase 매핑 (32개 스타터)

Phase 1 · AI Literacy
1. AI 시대에 뒤쳐지지 않는 사람들의 공통 역량
2. LLM이 잘하는 일과 못하는 일
3. 환각(Hallucination)을 잡는 검증법
4. AI 결과를 신뢰하기 전 확인할 것

Phase 2 · Prompt & Context Engineering
5. 좋은 프롬프트의 구조
6. 출력 형식(Output Format)을 강제하는 법
7. 긴 문서를 AI에게 먹이는 법
8. 개인 프롬프트 라이브러리 만들기

Phase 3 · AI Work OS
9. 보고서 초안 자동화
10. 회의록 자동 정리
11. 리서치 워크플로우 만들기
12. 블로그 글쓰기 파이프라인

Phase 4 · Codex / Claude Code Workflow
13. Codex / Claude Code 작업 환경 세팅
14. GitHub Issue를 AI 작업지시서로 바꾸기
15. 기존 코드베이스를 AI에게 읽히기
16. AI와 함께 구현 계획 세우기
17. Codex / Claude Code로 테스트 만들기
18. 버그 재현과 수정 루프

Phase 5 · AI App Development
19. AI API 붙이기
20. 스트리밍 응답 UI 만들기
21. 구조화 출력(Structured Output) 다루기
22. 대화 기록 저장 구조 설계

Phase 6 · RAG
23. 임베딩(Embedding) 이해하기
24. 문서 청킹(Chunking) 전략 세우기
25. 벡터 검색(Vector Search) 기본
26. 근거가 있는 RAG 답변 만들기

Phase 7 · Agents / MCP
27. Function Calling 이해하기
28. 미니 에이전트 루프 만들기
29. 도구 권한과 안전장치 설계하기
30. Prompt Injection 방어 기초

Phase 11 · Product & Monetization
31. AI 앱 비용과 사용량 계산

Phase 12 · Capstone
32. Capstone 프로젝트 기획과 배포

## 5. 레슨 작성 규칙 (Editorial)

- **1 레슨 = 1 산출물**. 체크리스트 단위까지 작성.
- **2개의 미션**: `codexMission`, `claudeCodeMission`. 가능하면 같은 목표를 도구에 맞게 번역.
- **검증 체크리스트는 5~8개**: 학습자가 스스로 확인 가능하도록.
- **회고 질문 3개**: "AI가 한 것은?", "내가 판단한 것은?", "다음에 바꿀 것은?"을 기본 템플릿으로.
- **확장 아이디어 2~3개**: 학습자가 바로 다음 주에 들어갈 수 있는 힌트.

## 6. 평가 & 배지 (v0.2 이후 예정)

- Phase 완료: 산출물 제출 시 Phase 배지.
- Track 완료: 모든 필수 Phase 완료 + 캡스톤.
- 미도입: 자동 채점, 시험, 인증서.
