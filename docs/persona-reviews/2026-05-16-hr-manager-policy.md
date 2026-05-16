---
persona: 정연주
slug: 2026-05-16-hr-manager-policy
journey: Adopter
level: L1
test-days: 10
verdict: "부분 완주"
nps: 7
---
# 베타 테스트 보고서 — 정연주
## 1. 페르소나 프로필
38세, 중견 제조기업 HR 매니저(인사기획·교육), 서울 강남 본사. Journey는 Adopter, 수준은 L1, AI 친숙도는 중상, 코딩 배경 없음. 학습 동기는 "사내 AI 도입 정책을 만들고 인사·법무·보안 부서를 설득해야 한다. 근거 자료와 변화관리 흐름이 절실하다"이다. 하루 가용 시간은 50분(출근 전 30분 + 점심 20분), 주 사용 기기는 회사 데스크톱과 개인 아이폰의 혼합. 끈기 상·의심 상 카드. HR 특유의 "정책으로 어떻게 옮기는가"가 디폴트 질문이고, 그래서 검증·체크리스트·정책 템플릿 lesson에서 가장 빛난다.
## 2. 10일 사용 일지
| Day | 한 일 | 도달 lesson | 소요(분) | 상태 |
|---|---|---|---|---|
| 1 | Adopter 여정 카드 진입, 추천 lesson 4개 확인 | zero-coding-orientation | 50 | 완료 |
| 2 | 터미널 셋업, 사내 IT에 권한 협의 | terminal-first-day | 50 | 부분 완료 |
| 3 | API 셋업 우회, 사내 라이선스로 대체 | ai-tool-account-and-cost | 30 | 부분 완료 |
| 4 | 사고방식 카드, 변화관리 관점에서 메모 | ai-collaboration-mindset | 50 | 완료 |
| 5 | 프롬프트 구조, HR 공지 초안에 적용 | structure-of-good-prompts | 50 | 완료 |
| 6 | 환각 검증·출력 체크리스트, 정책 근거로 메모 | checks-before-trusting-ai-output | 50 | 완료 |
| 7 | 사이드바 탐색 중 Stage 7 정책 템플릿 발견 | responsible-ai-policy-template | 55 | 완료 |
| 8 | Stage 4·4a 진입, 업무 자동화 흐름 | automate-report-drafts | 50 | 완료 |
| 9 | Custom GPT lesson, 회사 결제 정책상 막힘 | custom-gpt-builder | 40 | 부분 완료 |
| 10 | Adopter 추천 외 lesson을 손수 묶어 정리 | cost-monitoring-in-production | 50 | 부분 완료 |
## 3. 진척 결과
- 시작 Stage / lesson — Stage 1 / zero-coding-orientation
- 10일 차 도달 Stage / lesson — Stage 4·4a / cost-monitoring-in-production (후반)
- 완료한 lesson 수 / 시도한 lesson 수 — 12 / 15
- 완주 여부 및 이유 — 부분 완주. 본인 동기인 "사내 AI 정책 설득 근거"는 Stage 3 검증 lesson과 Stage 7 정책 템플릿에서 충분히 얻었으나, Adopter 여정의 추천 lesson 4개만으로는 변화관리·보안 감사 흐름이 한 번에 안 읽혀서 사이드바를 오가며 직접 묶어야 했다.
## 4. 막힌 지점 · 이탈 지점 (구체 인용)
첫째, Adopter 여정의 추천 lesson이 4개뿐이라는 점이 의문이다. Practitioner는 5개, Adopter는 4개인데 정작 "조직 도입"에 필요한 변화관리·보안 감사·정책 템플릿 lesson은 Stage 7·8에 흩어져 있어 한 흐름으로 안 읽힌다. "왜 도입자에게 더 적게 주나"가 진입 직후의 인상이었고, 직접 사이드바를 뒤져 `responsible-ai-policy-template`을 찾기까지 이틀이 걸렸다.
둘째, Stage 1 L07 `ai-collaboration-mindset`의 "강요 대신 작은 성공 사례로 확산"이라는 카피는 매우 좋다. 다만 한국 조직 결재 문화에서 "작은 성공"을 어디서 시작해야 하는지의 구체 예시가 부족하다. 어느 부서를 먼저 끌어들이고, 어떤 KPI를 어떤 분기에 보여주며, 누구의 결재선을 통과해야 하는지 — Adopter에게 가장 필요한 변화관리 시퀀스가 추상적 카피로만 남았다.
셋째, Stage 4·4a L05 `custom-gpt-builder`가 ChatGPT Plus 결제를 가정한다. 회사 보안 정책상 개인 결제는 불가하고 사내 계정은 Custom GPT 기능이 막혀 있다. 대체안(Claude Projects, 사내 라이선스 프롬프트 템플릿)이 lesson 본문에 부재해서 HR 매니저가 정책 설득용 데모로 쓰지 못했다. Adopter 여정 안에서는 "결제·도구 정책이 막힐 때의 우회"가 디폴트로 포함되어야 한다.
## 5. UI/UX 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 첫 화면 5초 인상 | 4 | Adopter 여정 카드가 별도로 보여 직군 정체성을 한 번에 잡아준다 |
| 내비게이션·현재 위치 | 3.5 | 사이드바 트리는 좋으나 Adopter 추천이 4개에서 끊겨 흐름이 짧다 |
| 가독성 | 4 | 본문·표·정책 템플릿의 위계가 분명해 50분 학습에 편안하다 |
| 모바일 경험 | 3.5 | 출근 전 아이폰 사용 시 표가 가로로 잘려서 한 번씩 확대해야 한다 |
| 진척 표시 | 4 | "0% 가중 평균 / 빌드 50 · 검증 30 · 회고 20 가중"이 정책 보고 시 인용 가능한 수준이다 |
| 전반 마찰도 | 4 | Stage 1~3은 매끄럽고 Adopter 흐름이 흩어진 점이 마찰을 만든다 |
## 6. 레슨 콘텐츠 평가
| 항목 | 점수(1~5) | 근거 한 줄 |
|---|---|---|
| 난이도 곡선 | 4 | Stage 1~3이 부드럽고 Stage 4·4a에서 한 번 가파르다 |
| 개념 명확성 | 4 | 검증·체크리스트·정책 템플릿 개념의 정의가 HR 정책 언어와 잘 맞는다 |
| 미션 실행 가능성 | 4 | HR 공지·정책 초안에 미션이 그대로 박힌다 |
| 산출물 가치 | 4.5 | `responsible-ai-policy-template` 산출물이 사내 도입 설득 자료로 즉시 활용 가능하다 |
| lesson 간 흐름(책처럼) | 3.5 | Adopter 추천이 4개에서 끊기고 정책·변화관리 lesson이 Stage 7·8로 분산되어 흐름이 갈라진다 |
## 7. lesson별 미시 피드백 (최소 6개)
| lesson slug | 한 줄 평 |
|---|---|
| zero-coding-orientation | "AI를 지시하고 검토하는 법"이라는 정의가 HR의 정책 설계 언어와 잘 맞는다. |
| ai-collaboration-mindset | "작은 성공"을 한국 조직 결재선 안에서 시작하는 구체 예시가 필요하다. |
| structure-of-good-prompts | HR 공지·교육 안내 초안 작성에 가장 빠르게 박혔다. |
| checks-before-trusting-ai-output | 출력 검증 체크리스트는 그대로 사내 AI 사용 가이드의 본문이 될 수 있다. |
| responsible-ai-policy-template | Adopter 여정의 메인 산출물로 끌어올려야 한다. 사이드바에서 찾기 어렵다. |
| custom-gpt-builder | ChatGPT Plus 결제 가정이 도입 단계의 정책과 충돌, Claude Projects 분기가 필요하다. |
| automate-report-drafts | HR 정기 보고서 초안 자동화에 적용 가능, 산출물 가치가 높다. |
| cost-monitoring-in-production | "매주 5분 안에 점검하는 모니터링 루프"가 HR이 보안팀에 보일 자료로 매우 적절하다. |
## 8. 종합 의견
- verdict 이유 — Stage 1~3과 Stage 7 정책 템플릿을 직접 묶어 학습 동기는 충족했지만, Adopter 여정 안에서 이 묶음이 한 흐름으로 읽히도록 큐레이션되어 있었다면 시간이 절반으로 줄었다. Custom GPT 같은 결제 가정도 도입자 여정에서는 디폴트로 우회해야 한다.
- 추천 의향(NPS) 이유 — 7. 같은 HR·법무·보안 직군에 추천 가능하지만 "Adopter 여정은 본인이 lesson을 직접 큐레이션해야 한다"는 단서를 같이 전한다.
## 9. 개선 제안 Top 3
1. Adopter 여정의 추천 lesson을 4개에서 7~8개로 늘리고 `responsible-ai-policy-template`, `cost-monitoring-in-production`, `checks-before-trusting-ai-output`을 메인 산출물 흐름에 포함한다. "왜 도입자에게 더 적게 주나"라는 인상을 없애야 한다.
2. `ai-collaboration-mindset`의 "작은 성공" 카피에 한국 조직 결재선 시퀀스 예시(부서 시범사업 → 분기 KPI 보고 → 결재선 통과 → 전사 확산)를 부록으로 붙인다. Adopter가 본문 한 장으로 변화관리 시퀀스를 가져갈 수 있어야 한다.
3. `custom-gpt-builder`와 ChatGPT Plus 결제 가정 lesson 전반에 "회사 결제·보안 정책이 막힐 때의 대체 경로(Claude Projects, 사내 라이선스 프롬프트 템플릿)" 분기를 lesson 본문에 추가한다. Adopter 여정에서는 이 우회가 디폴트가 되어야 한다.
