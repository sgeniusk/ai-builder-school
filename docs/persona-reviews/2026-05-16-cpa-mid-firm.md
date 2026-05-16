---
persona: 김지수
slug: 2026-05-16-cpa-mid-firm
journey: Practitioner
level: L2
test-days: 10
verdict: "완주"
nps: 8
---
# 베타 테스트 보고서 — 김지수
## 1. 페르소나 프로필
42세, 중형 회계법인 시니어 회계사, 대구 수성구 본사. Journey는 Practitioner, 수준은 L2(Python을 감사 자료 가공에 가끔 씀), AI 친숙도는 중상, 코딩 배경은 데이터 전처리 수준의 pandas. 학습 동기는 "감사 조서 초안과 세무 리서치에서 AI 환각이 진짜 위험인데, 검증 루프를 제대로 배우지 않으면 도구로 쓸 수 없다"이다. 하루 가용 시간은 60분(저녁 자기개발 시간), 주 사용 기기는 데스크톱, 모바일은 거의 안 봄. 끈기 상·의심 상 카드. 회계사 특유의 "근거가 뭐냐"가 디폴트이고, 그래서 검증·체크리스트 lesson에서 가장 빛난다.
## 2. 10일 사용 일지
| Day | 한 일 | 도달 lesson | 소요(분) | 상태 |
|---|---|---|---|---|
| 1 | 랜딩과 사이드바 84 lesson 지도 확인 | zero-coding-orientation | 50 | 완료 |
| 2 | 터미널·API 셋업, 회사 보안 정책 우회로 개인 키 사용 | terminal-first-day, ai-tool-account-and-cost | 60 | 완료 |
| 3 | Stage 2 프롬프트 구조와 검증 흐름 | structure-of-good-prompts | 55 | 완료 |
| 4 | Stage 3 환각 검증, 세무 리서치 사례로 실험 | hallucination-verification | 60 | 완료 |
| 5 | Stage 3 출력 검증 체크리스트 적용 | checks-before-trusting-ai-output | 60 | 완료 |
| 6 | Stage 4·4a 업무 자동화 흐름 | automate-report-drafts | 55 | 완료 |
| 7 | Stage 4·4c SQL 검증, 회계 도메인 매핑 시도 | sql-with-ai-verification | 60 | 완료 |
| 8 | Stage 4·4c 대시보드 내러티브 QA | dashboard-narrative-and-qa | 60 | 완료 |
| 9 | Stage 5·6 검토, coding-agent-setup은 본업 거리감 | coding-agent-setup | 55 | 부분 완료 |
| 10 | Stage 7 진입, evals·운영 점검 | evals-for-ai-coded-prs | 50 | 시작 |
## 3. 진척 결과
- 시작 Stage / lesson — Stage 1 / zero-coding-orientation
- 10일 차 도달 Stage / lesson — Stage 7 / evals-for-ai-coded-prs (시작)
- 완료한 lesson 수 / 시도한 lesson 수 — 18 / 21
- 완주 여부 및 이유 — 완주. Stage 1~4를 끌고 갈 만한 끈기와 직군 동기가 충분했고, Stage 3 검증 lesson이 본업의 환각 위험과 정확히 맞물려 "이걸 왜 배우는가"가 매 lesson마다 분명했다.
## 4. 막힌 지점 · 이탈 지점 (구체 인용)
첫째, Stage 7 `evals-for-ai-coded-prs` 카드 설명이 "AI가 작성한 코드"의 PR 평가에 한정되어 있다. 회계 도메인에서는 코드가 아니라 워크플로(감사 조서·세무 리서치·재무제표 주석 초안)의 평가가 더 절실하다. "AI 산출물의 도메인별 evals" 같은 형태로 넓혀 주거나, 회계·법무·HR 같은 비코드 도메인용 evals lesson을 1개 더 두는 게 맞다.
둘째, Stage 4 · 4c `sql-with-ai-verification` 미션의 "스키마 주입 → 쿼리 생성" 흐름이 일반 e-commerce 스키마를 가정한 영문 예시로만 구성되어 있다. 회계 시스템(더존, SAP, Oracle EBS) 스키마와 한참 멀어서, 본업으로 끌어오려면 직접 한국어 회계 도메인 예시로 재구성해야 했다. "한국어 회계·HR·세무 도메인 샘플 스키마 부록" 한 장이 절실하다.
셋째, Stage 4 L05 `custom-gpt-builder`가 ChatGPT Plus 결제를 가정한다. 회사 보안 정책상 개인 결제는 어렵고 회사 계정도 Custom GPT가 막혀 있다. "Custom GPT가 막힐 때의 대체 경로(Claude Projects, Codex CLI 프롬프트 템플릿)" 분기가 lesson 본문 안에 있어야 한다.
## 5. UI/UX 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 첫 화면 5초 인상 | 4 | "8단계 사다리를 한 칸씩 오르면, 직접 만든 결과물 한 가지가 손에 들어옵니다" 카피가 결과물 지향이라 좋음 |
| 내비게이션·현재 위치 | 4 | 사이드바의 Stage·lesson 트리 구조가 회계사의 인덱스 감각과 잘 맞음 |
| 가독성 | 4.5 | 본문·표·코드 블록의 위계가 분명해 60분 학습에 편안함 |
| 모바일 경험 | 4 | 거의 안 쓰지만 잠깐 본 인상은 표만 잘렸을 뿐 본문은 무난함 |
| 진척 표시 | 4 | "0% 가중 평균 / 빌드 50 · 검증 30 · 회고 20 가중"이 회계 시각으로 명확함 |
| 전반 마찰도 | 4.5 | Stage 1~4 흐름이 책처럼 부드러움 |
## 6. 레슨 콘텐츠 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 난이도 곡선 | 4 | Stage 1~4가 부드럽고 Stage 5에서 한 번 가파른데, L2 정도면 따라간다 |
| 개념 명확성 | 4.5 | 검증·체크리스트 개념의 정의가 회계사 언어와 거의 일치함 |
| 미션 실행 가능성 | 4 | 본업 자료로 돌릴 수 있으나 4c는 도메인 매핑 비용이 따로 듦 |
| 산출물 가치 | 4.5 | 세무 리서치 검증 체크리스트와 대시보드 QA 흐름은 그대로 팀에 공유 가능함 |
| lesson 간 흐름(책처럼) | 4 | Stage 3→4 흐름이 가장 좋고 Stage 5에서 한 번 본업과 멀어짐 |
## 7. lesson별 미시 피드백 (최소 6개)
| lesson slug | 한 줄 평 |
|---|---|
| zero-coding-orientation | "AI를 지시하고 검토하는 법을 배우는 곳"이라는 정의가 회계사의 검토자 정체성과 잘 맞는다. |
| hallucination-verification | 세무 리서치 환각 위험의 실제 사례를 추가하면 회계 직군의 베스트 lesson이 된다. |
| checks-before-trusting-ai-output | 출력 검증 체크리스트는 그대로 감사 조서 검토 절차에 박을 수 있는 수준이다. |
| sql-with-ai-verification | 한국어 회계 도메인 샘플 스키마 부록이 붙어야 본업 전이가 빨라진다. |
| dashboard-narrative-and-qa | 재무 대시보드 내러티브 QA에 그대로 적용 가능, 산출물 가치가 매우 높다. |
| custom-gpt-builder | ChatGPT Plus 가정이 걸림, Claude Projects 대체 경로를 추가해야 한다. |
| coding-agent-setup | 회계 본업과 거리감이 큼, "비개발 직군 우회" 분기가 있으면 좋다. |
| evals-for-ai-coded-prs | 도메인을 코드에 한정하지 말고 워크플로 evals로 넓혀야 한다. |
## 8. 종합 의견
- verdict 이유 — 검증 lesson이 본업의 가장 큰 리스크인 환각과 정확히 맞물렸고, 60분/일 가용 시간이 데스크톱 학습 속도와 맞아 완주했다. Stage 5 이후는 본업과 약간 멀어졌지만 그래도 끌고 갈 가치가 있었다.
- 추천 의향(NPS) 이유 — 8. 같은 직군 회계사·세무사·감사인에게 적극 추천 가능하다. 다만 "Stage 4·4c와 5는 도메인 매핑 비용이 든다"는 단서를 함께 전한다.
## 9. 개선 제안 Top 3
1. `sql-with-ai-verification`을 비롯한 Stage 4·4c lesson에 한국어 회계·세무·HR 도메인 샘플 스키마 부록을 추가해야 한다. 본업 전이 비용이 절반으로 준다.
2. `evals-for-ai-coded-prs`의 범위를 "AI 코드 PR"에서 "AI 산출물 전반의 도메인 evals"로 넓히거나, 회계·법무·HR 도메인용 evals lesson 1개를 Stage 7에 신설한다.
3. `custom-gpt-builder`에 "ChatGPT Plus가 막힐 때의 대체 경로(Claude Projects, Codex CLI 프롬프트 템플릿)" 분기를 lesson 본문에 명시한다. 회사 보안 정책 사용자가 그 lesson에서 멈추지 않는다.
