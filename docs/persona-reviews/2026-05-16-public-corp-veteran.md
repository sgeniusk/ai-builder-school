---
persona: 이현우
slug: 2026-05-16-public-corp-veteran
journey: Practitioner
level: L1
test-days: 10
verdict: "부분 완주"
nps: 6
---
# 베타 테스트 보고서 — 이현우
## 1. 페르소나 프로필
51세, 에너지 분야 공기업 부장(예산·정책 기획), 세종 본사. Journey는 Practitioner, 수준은 L1, AI 친숙도는 중(ChatGPT 사내 라이선스로 정책 리포트 초안 작성에 사용), 코딩 배경 없음. 학습 동기는 "부서 보고서와 정책 리포트를 AI로 더 빠르게 초안 잡고 싶다. 후배들한테 가르치려면 내가 먼저 알아야 한다"이다. 하루 가용 시간은 40분(주로 점심 직후), 주 사용 기기는 회사 데스크톱, 모바일은 보조. 끈기 중·의심 중 카드. 결재선·감사 같은 공공 조직 문법이 머릿속 기준이고, 도구·시간 표시가 무거우면 곧 피로를 느낀다.
## 2. 10일 사용 일지
| Day | 한 일 | 도달 lesson | 소요(분) | 상태 |
|---|---|---|---|---|
| 1 | 랜딩·Practitioner 여정 둘러봄, "47분" 카드 부담 | zero-coding-orientation | 40 | 완료 |
| 2 | 터미널 셋업, 회사 IT에 PowerShell 권한 요청 | terminal-first-day | 45 | 부분 완료 |
| 3 | API 셋업은 사내 라이선스로 대체, 카드 건너뜀 | ai-tool-account-and-cost | 30 | 부분 완료 |
| 4 | 사고방식 카드, 공공 조직 문법과 비교하며 메모 | ai-collaboration-mindset | 40 | 완료 |
| 5 | 프롬프트 구조, 정책 리포트 초안에 적용 | structure-of-good-prompts | 45 | 완료 |
| 6 | 환각 검증, 정책 인용 출처 확인 흐름 학습 | hallucination-verification | 40 | 완료 |
| 7 | 출력 검증 체크리스트, 결재선 관점 메모 | checks-before-trusting-ai-output | 35 | 완료 |
| 8 | Stage 4·4a 진입, 보고서 자동화 흐름 | automate-report-drafts | 45 | 완료 |
| 9 | ROI lesson, 공기업 예산 회계와 충돌 | cost-estimation-and-roi-by-task | 40 | 부분 완료 |
| 10 | 오케스트레이션은 무거워서 후일로 보류 | multi-workflow-orchestration | 30 | 탐색만 |
## 3. 진척 결과
- 시작 Stage / lesson — Stage 1 / zero-coding-orientation
- 10일 차 도달 Stage / lesson — Stage 4·4a / multi-workflow-orchestration (중반 탐색)
- 완료한 lesson 수 / 시도한 lesson 수 — 11 / 14
- 완주 여부 및 이유 — 부분 완주. Stage 3 검증 흐름까지는 본업에 잘 박혔지만 Stage 4·4a의 ROI와 오케스트레이션 lesson이 공기업 예산·결재 문법과 어긋나 Stage 5 진입을 미뤘다. Stage 5 `coding-agent-setup`은 본업과 거리감이 커서 처음부터 건너뛸 마음이었다.
## 4. 막힌 지점 · 이탈 지점 (구체 인용)
첫째, zero-coding-orientation의 "코드를 짜는 직원"이라는 비유가 코드와 무관한 행정 업무자에게는 약하다. "의사가 MRI 기계 원리를 몰라도 영상을 보고 판단하듯이"라는 비유는 좋은데, 그다음 단계의 직군 예시가 개발자·디자이너 위주라 공공 행정직이 자신을 그림에 넣지 못한다.
둘째, ai-collaboration-mindset의 "팀 저항의 세 가지 진짜 이유(불안·불신·불편)"는 카피 자체는 좋지만 공기업 조직 문화에는 결재선·감사·보안 같은 추가 축이 더 무겁다. "작은 성공 사례로 확산"이라는 처방은 사기업 전제이고, 공공기관에서 "작은 성공"을 어디서 시작할 수 있는지(예 — 내부 워크숍, 사내 공모, 부서 시범사업)에 대한 구체 예시가 비어 있다.
셋째, Stage 4·4a `cost-estimation-and-roi-by-task`가 "API 비용"을 주된 변수로 둔다. 공기업 예산 회계는 API 비용을 개별 라인 아이템으로 잡지 않고 정보화 통합 사업비에 묶어서 본다. ROI 산식의 입력값이 본업의 회계 구조와 어긋나서 미션이 공중에 떴다. "공공·대기업 예산 구조의 ROI 매핑" 부록이 있어야 한다.
## 5. UI/UX 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 첫 화면 5초 인상 | 3.5 | "8단계 사다리"는 친숙하지만 카드의 "47분" 시간 표시가 부담을 준다 |
| 내비게이션·현재 위치 | 3.5 | 사이드바 트리는 명료하지만 8 Stage와 12 Phase 용어 혼용이 한 번 거슬렸다 |
| 가독성 | 3.5 | 본문은 편안하나 도구명(Codex/Claude Code)이 자주 등장해 ChatGPT 사용자에게 시야가 좁아 보인다 |
| 모바일 경험 | 3 | 표 가로 스크롤이 점심 시간 모바일 사용에서 마찰을 만든다 |
| 진척 표시 | 3.5 | 가중 평균 표시는 좋으나 lesson 카드의 "47분"이 진척 부담으로 작동한다 |
| 전반 마찰도 | 3 | 개별 lesson이 무거워 40분/일 사용자에게 한 회 한 lesson이 빠듯하다 |
## 6. 레슨 콘텐츠 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 난이도 곡선 | 3.5 | Stage 3까지는 부드러우나 Stage 4·4a에서 한 번 가파르다 |
| 개념 명확성 | 4 | 검증·체크리스트 개념은 매우 명확하다 |
| 미션 실행 가능성 | 3.5 | 정책 리포트 초안에는 잘 박히지만 ROI·오케스트레이션은 본업과 어긋난다 |
| 산출물 가치 | 3.5 | 보고서 초안 자동화는 가치가 크고, ROI는 산출물이 공기업에서 활용 어렵다 |
| lesson 간 흐름(책처럼) | 3.5 | Codex/Claude Code 도구 묶음에 묶여 ChatGPT Enterprise 사용자의 흐름이 한 번 끊긴다 |
## 7. lesson별 미시 피드백 (최소 6개)
| lesson slug | 한 줄 평 |
|---|---|
| zero-coding-orientation | 직군 예시에 공공 행정·금융·교육 같은 비IT 직군 비유를 추가해야 한다. |
| terminal-first-day | 공기업 보안 정책상 IT 담당의 사전 권한이 필요하다는 사전 안내가 빠져 있다. |
| ai-tool-account-and-cost | ChatGPT Enterprise/Copilot 같은 사내 라이선스 사용자용 분기가 필요하다. |
| ai-collaboration-mindset | 결재선·감사·보안 축을 추가한 공공·대기업 버전 카드가 있으면 좋다. |
| automate-report-drafts | 정책 리포트 초안 자동화에 그대로 적용 가능, 산출물 가치가 가장 높다. |
| cost-estimation-and-roi-by-task | 공기업 예산 회계와 어긋남, 공공·대기업 ROI 부록이 필요하다. |
| multi-workflow-orchestration | 40분/일 학습자에게 너무 무거움, "최소 버전"으로 분할 필요하다. |
| coding-agent-setup | 비개발 행정직과 거리감이 커서 우회 분기가 있으면 좋다. |
## 8. 종합 의견
- verdict 이유 — Stage 3까지는 정책 리포트 초안 작성에 바로 박힐 만큼 좋았으나, Stage 4 이후는 공기업 예산·결재 문법과의 거리, lesson별 시간 부담이 겹쳐 흐름이 멈췄다. Stage 5는 처음부터 본업과 멀어 미루기로 결정했다.
- 추천 의향(NPS) 이유 — 6. 같은 공공 조직 동료에게 추천하긴 하지만 "Stage 1~3까지는 좋고, Stage 4 이후는 사기업·개발자 중심"이라는 단서를 같이 전한다.
## 9. 개선 제안 Top 3
1. lesson 카드의 시간 표시("47분")를 "권장 1회 분량"과 "최소 핵심 분량(15~20분)"으로 이원화한다. 점심 30분 학습자가 한 lesson을 끝까지 마칠 수 있어야 진척이 살아난다.
2. `cost-estimation-and-roi-by-task`에 공공·대기업 예산 구조용 ROI 매핑 부록을 추가한다. API 비용 변수가 안 맞는 조직의 사용자가 미션을 공중에 띄우지 않는다.
3. 사이트 톤을 Codex/Claude Code에 묶지 말고 ChatGPT Enterprise·Copilot 사용자용 분기를 lesson 본문 안에 명시한다. 랜딩의 "Codex나 Claude Code, 둘 중 하나만 있어도 충분해요"는 그대로 두되, lesson별로 사내 라이선스 우회 경로가 필요하다.
