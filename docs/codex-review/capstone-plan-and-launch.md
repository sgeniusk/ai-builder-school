# Codex 검토 — capstone-plan-and-launch.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/capstone-plan-and-launch.mdx
- 본문 라인 수: 187
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ✓ | Hook, 전체 커리큘럼 표, 4주 계획, 산출물 폴더, footer 있음 |
| 2. 인용 정확성 | ⚠ | 검증한 URL 2개 / 발견 문제 1개(Lean Startup 특정 문구 인용은 확인 필요) |
| 3. 가상 사례 라벨 | ✓ | line 187에 "보여줄 게 없어요" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | 4주 프레임워크가 운영자 정리임을 line 44/footer에 고지 |
| 5. 정량 수사 | ⚠ | 4주, 첫 사용자 5명, 기능 3개 이하 등 방법론 수치가 많음 |
| 6. Cross-reference | ✓ | L05/L06/L18/L19/L20/L22/L26/L28/L30/L31 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

### [CITATION-CLAIM-OVERREACH] src/content/lessons/capstone-plan-and-launch.mdx:30
quoted: "\"Build the simplest thing that tests your riskiest assumption\""
url: https://theleanstartup.com
verdict: Lean Startup 방향성과는 맞지만, 해당 문구가 책/사이트의 정확 인용인지 표본 검증으로 확인하지 못함.
suggested-fix: 직접 인용처럼 쓰지 말고 "Lean Startup의 MVP/Build-Measure-Learn 관점"으로 완화하거나 ISBN/페이지 근거 추가.

## Medium issues

### [UNVERIFIABLE-GUIDE] src/content/lessons/capstone-plan-and-launch.mdx:75
quoted: "첫 사용자 5명"
verdict: 실천 가이드로는 괜찮지만 표준처럼 보일 수 있음.
suggested-fix: "예: 첫 사용자 5명"으로 낮추기.

### [UNVERIFIABLE-GUIDE] src/content/lessons/capstone-plan-and-launch.mdx:52
quoted: "기능 3개 이하"
verdict: Narrow MVP 실천 규칙으로 좋지만 출처 있는 기준은 아님.
suggested-fix: "기능 3개 이하처럼 작게"로 완화.

## Low / 제안

- Product Hunt Launch Guide URL은 확인됨. 다만 한국 학습자에게 Product Hunt가 필수가 아니므로 국내 커뮤니티 예시와 균형을 맞추면 더 자연스럽습니다.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"많이 배운 것보다 중요한 건 하나라도 끝까지 공개한 결과예요. 캡스톤은 지식을 URL로 바꾸는 마지막 루프입니다."

learningGoals (5개, verb-led)
- 지금까지 만든 산출물을 하나의 프로젝트 후보로 연결해요
- Narrow MVP 범위를 한 문장과 기능 3개 이하로 줄여요
- 4주 실행 계획을 Spec/Build/Test/Launch로 나눠요
- 첫 사용자 피드백과 비용·보안 점검을 계획해요
- 런칭 후 회고 문서를 작성해 다음 반복으로 연결해요

coreConcepts (4-5개)
- Narrow MVP: 가장 위험한 가정 하나를 검증하는 작은 제품
- Build-Measure-Learn: 만들고 측정하고 배운 뒤 다시 좁히는 루프
- Launch Checklist: 공개 전에 README/데모/비용/보안을 확인하는 목록
- Capstone Scope: 배운 기술을 모두 넣지 않고 핵심 루프만 남기는 범위 설정
- Retrospective: 출시 결과와 배운 점을 다음 버전으로 연결하는 회고

reflectionQuestions (3-4개)
- 내 캡스톤의 가장 위험한 가정은 무엇인가요?
- 4주 안에 반드시 포기해야 할 기능은 무엇인가요?
- 첫 사용자에게 물어볼 세 가지 질문은 무엇인가요?

## 결론

가장 큰 문제: Lean Startup 문구 직접 인용의 정확성 확인 필요.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
