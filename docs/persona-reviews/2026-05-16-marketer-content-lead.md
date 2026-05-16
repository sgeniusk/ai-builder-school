---
persona: 박서윤
slug: 2026-05-16-marketer-content-lead
journey: Practitioner
level: L1
test-days: 10
verdict: "부분 완주"
nps: 7
---
# 베타 테스트 보고서 — 박서윤
## 1. 페르소나 프로필
28세, B2C 뷰티 브랜드 콘텐츠 리드, 서울 마포 근무. Journey는 Practitioner, 수준은 L1, AI 친숙도는 중상(ChatGPT 유료 1년차), 코딩 배경은 거의 없음(HTML 손본 정도). 학습 동기는 "매주 리서치와 콘텐츠 보고서에 절반을 갈아넣는데, 이걸 AI한테 떠넘기고 기획에 시간을 더 쓰고 싶다"이다. 하루 가용 시간은 50분(출근 지하철 20분 + 점심 30분), 주 사용 기기는 회사 Windows 노트북과 개인 아이폰의 혼합. 끈기 중·의심 중 카드. 콘텐츠 분야는 익숙해도 터미널·API 같은 단어 앞에서 한 번 멈추는 타입이고, 그래서 "내 직군에 와닿는 예시가 나와야" 다음 카드를 누른다.
## 2. 10일 사용 일지
| Day | 한 일 | 도달 lesson | 소요(분) | 상태 |
|---|---|---|---|---|
| 1 | 랜딩·Practitioner 여정 카드 훑고 Stage 1 시작 | zero-coding-orientation | 45 | 완료 |
| 2 | 터미널 깔다 막혀 회사 IT에 문의 | terminal-first-day | 50 | 부분 완료 |
| 3 | API 결제 카드 단계 보고 일단 스킵, 다른 lesson 탐색 | ai-tool-account-and-cost | 30 | 중단 |
| 4 | Stage 1 마무리, 사고방식 카드는 공감 | ai-collaboration-mindset | 50 | 완료 |
| 5 | Stage 2 진입, 프롬프트 구조 신선함 | structure-of-good-prompts | 55 | 완료 |
| 6 | Stage 3 환각 검증, 본업 적용 가능성 보임 | hallucination-verification | 50 | 완료 |
| 7 | 보고서 초안 자동화 미션, 실제 주간 보고서로 시도 | automate-report-drafts | 60 | 완료 |
| 8 | 회의록 파이프라인, 슬랙 회의 음성으로 적용 | meeting-notes-pipeline | 55 | 완료 |
| 9 | Stage 3 L4까지 도달, 산출물 1개 정리 | checks-before-trusting-ai-output | 45 | 완료 |
| 10 | Stage 4·4b 콘텐츠 트랙 둘러보고 다음 주 계획 | content-pipeline-with-ai | 40 | 탐색만 |
## 3. 진척 결과
- 시작 Stage / lesson — Stage 1 / zero-coding-orientation
- 10일 차 도달 Stage / lesson — Stage 3 / checks-before-trusting-ai-output (L4)
- 완료한 lesson 수 / 시도한 lesson 수 — 9 / 12
- 완주 여부 및 이유 — 부분 완주. Stage 3까지는 "본업에 바로 쓸 게 보였다"라서 끌고 갔지만, Stage 1 L02·L03 환경 셋업에서 회사 Windows 노트북 분기 안내가 빈약해 30분을 깎아먹었다. Stage 4 이후는 시간이 부족해 다음 사이클로 미뤘다.
## 4. 막힌 지점 · 이탈 지점 (구체 인용)
첫째, terminal-first-day의 "Windows: 시작 메뉴 → 'PowerShell' 검색 → Enter (또는 Git Bash를 설치하면 Mac과 동일한 명령어를 쓸 수 있다)"가 가장 큰 함정이었다. 두 선택지가 나란히 있는데 "어느 걸 골라야 하는지" 결정 가이드가 없다. PowerShell을 골랐더니 본문 후반의 `code .` 명령어가 안 먹어서 30분을 검색에 썼다. "Mac이 아니면 Git Bash로 통일" 같은 한 줄이 있었으면 됐다.
둘째, zero-coding-orientation 본문 후반의 "12개 Phase 전체 지도" 표가 혼란을 키웠다. 랜딩과 사이드바는 "8단계 사다리"라고 했는데 첫 lesson 안에서 12 Phase가 나온다. "8단계인가, 12단계인가"를 두 번 다시 확인해야 했고, 이건 입문자의 신뢰도를 떨어뜨리는 작은 균열이다.
셋째, ai-tool-account-and-cost 첫 미션이 너무 일찍 무겁다. Stage 1 · L03에서 GitHub, Claude/OpenAI API, Codex CLI를 한꺼번에 깔고 결제 카드까지 등록하라는 지시는 "AI를 도구로 한 번 써보자"는 마음으로 들어온 사람한테 과하다. 카드 등록은 Stage 2나 3에 미루고, L03은 "ChatGPT 한 개로 시작"이면 충분했다.
## 5. UI/UX 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 첫 화면 5초 인상 | 4 | "AI를 쓰는 사람에서, AI로 만드는 사람으로" 카피가 직관적이라 첫 클릭을 유도함 |
| 내비게이션·현재 위치 | 4 | 사이드바의 "Stage 01 진행 0/7" 표시로 위치는 잡히지만 Phase·Stage 용어 혼용이 거슬림 |
| 가독성 | 4 | 본문 폰트와 카드 여백은 편안하지만 코드 블록과 본문 폰트가 너무 비슷해 명령어 구분이 약함 |
| 모바일 경험 | 4 | 지하철에서 본문 읽기는 무난, 다만 표가 가로로 잘려서 두 손가락 확대를 자주 씀 |
| 진척 표시 | 4 | "0% 가중 평균 / 빌드 50 · 검증 30 · 회고 20 가중" 표시가 동기부여로 작동함 |
| 전반 마찰도 | 4 | Stage 1만 통과하면 흐름이 빨라지지만 그 Stage 1의 마찰이 큼 |
## 6. 레슨 콘텐츠 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 난이도 곡선 | 3.5 | Stage 1 L02·L03에서 한 번 가파르고 이후는 평탄, 입문 구간이 너무 빠르게 가파름 |
| 개념 명확성 | 4 | "코딩을 배우는 곳이 아니다"라는 선언이 기대치 정렬에 효과적임 |
| 미션 실행 가능성 | 4 | automate-report-drafts와 meeting-notes-pipeline은 본업 자료로 그대로 돌아감 |
| 산출물 가치 | 4 | 주간 보고서 템플릿과 회의록 파이프라인이 실제 슬랙에 박힘 |
| lesson 간 흐름(책처럼) | 3.5 | Stage 2→3은 자연스러우나 Stage 1 내부에서 8/12 Stage 용어 충돌이 흐름을 깸 |
## 7. lesson별 미시 피드백 (최소 6개)
| lesson slug | 한 줄 평 |
|---|---|
| zero-coding-orientation | "12 Phase 지도"를 빼거나 "8 Stage = 12 Phase 매핑" 한 줄을 넣어야 신뢰가 산다. |
| terminal-first-day | Windows 분기에 "사내 노트북이면 Git Bash 권장" 한 줄만 더 있으면 30분이 산다. |
| ai-tool-account-and-cost | API 카드 등록을 Stage 1에서 빼고 Stage 3로 이전하는 게 입문 마찰을 줄인다. |
| ai-collaboration-mindset | "팀 저항의 세 가지 진짜 이유"가 콘텐츠팀 회의에 그대로 인용 가능했다. |
| structure-of-good-prompts | 프롬프트 4요소 카드가 가장 빠르게 본업에 박혔다. |
| hallucination-verification | 리서치 보고서 인용 검증 루프로 그대로 쓸 수 있어 가장 큰 수확이었다. |
| automate-report-drafts | 주간 콘텐츠 보고서 초안 자동화에 곧장 적용, 산출물 가치가 가장 높았다. |
| meeting-notes-pipeline | 슬랙 허들 회의록을 본인 톤으로 정리하는 흐름이 잘 잡혔다. |
## 8. 종합 의견
- verdict 이유 — Stage 1의 환경 셋업 마찰이 컸지만 Stage 2~3에서 본업 산출물 두 개가 손에 잡혀서 "쓸 만한 강의"라는 인상이 남았다. 다만 Stage 4 이후는 50분/일 가용 시간으로는 무리였다.
- 추천 의향(NPS) 이유 — 7. 같은 직군 동료에게 추천할 수 있지만 "Stage 1은 같이 앉아서 봐줘야 한다"는 단서가 붙는다.
## 9. 개선 제안 Top 3
1. terminal-first-day의 Windows 분기에 "회사 노트북이면 Git Bash로 통일, 이후 모든 명령은 Mac과 동일"이라는 결정 가이드 한 줄을 추가해야 한다. 30분짜리 이탈 포인트가 사라진다.
2. zero-coding-orientation 본문 후반의 "12개 Phase 전체 지도"를 8 Stage와 명시적으로 매핑하거나 부록으로 옮긴다. 입문 첫 lesson에서 용어가 충돌하면 신뢰가 깎인다.
3. ai-tool-account-and-cost의 결제 카드 등록 미션을 Stage 3로 이전하고 Stage 1 · L03은 "ChatGPT 1개로 시작"으로 가볍게 만든다. 비콘텐츠 도구 진입 비용을 늦게 노출해야 입문 이탈이 줄어든다.
