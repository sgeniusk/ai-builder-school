# Codex 검토 — conversation-storage-design.mdx

## 메타
- 검토 시각: 2026-05-07T00:00:00+09:00
- 파일 경로: src/content/lessons/conversation-storage-design.mdx
- 본문 라인 수: 210
- 종합 등급: 🟡

## 6축 평가

| 축 | 평가 | 비고 |
| --- | :-: | --- |
| 1. 스타일 | ⚠ | 완성도는 높지만 210라인으로 기준보다 길고 DB 설계가 조밀함 |
| 2. 인용 정확성 | ✓ | 검증한 URL 0개 / 발견 문제 0개 |
| 3. 가상 사례 라벨 | ✓ | line 210에 "대화 날아감" 가상 사례 라벨 있음 |
| 4. 운영자 명칭 | ✓ | Summary Rolling이 운영자 정리임을 line 51/footer에 고지 |
| 5. 정량 수사 | ⚠ | 90일 보존, 10~20턴, 10턴마다 요약은 권장값처럼 보임 |
| 6. Cross-reference | ✓ | L07/L19/L20/L21 링크 정상 |

## Critical issues (즉시 수정)

(없음)

## High issues

(없음)

## Medium issues

### [UNVERIFIABLE-GUIDE] src/content/lessons/conversation-storage-design.mdx:65
quoted: "최근 N턴 원문 유지 | 10~20턴", "요약 주기 | 10턴마다"
verdict: 출처 없는 권장 시작점. footer에는 토큰 비용 계산 고지가 있지만 턴 수 권장값 고지는 약함.
suggested-fix: 표 제목을 "추천 시작점(실험용)"으로 바꾸고 "도메인에서 직접 조정"을 본문에 추가.

### [POLICY-RISK] src/content/lessons/conversation-storage-design.mdx:160
quoted: "데이터 보존 기간 | 90일 후 자동 삭제 (TTL)"
verdict: 개인정보/보존 기간은 법·서비스 정책에 따라 달라져 고정 권장처럼 보이면 위험.
suggested-fix: "예: 30/90일 등 서비스 정책에 맞춘 TTL"로 수정.

## Low / 제안

- SQLite/Postgres/Redis 비교는 적절하지만 Redis 영속성 옵션이 있는 만큼 "영속성이 기본은 아님" 표현은 "설정 방식에 따라 다름"으로 살짝 완화 가능.

## lessons.ts 보강 제안 (해당 시만)

hook (한 줄)  
"채팅 앱은 답을 잘하는 것만으로 부족해요. 어제의 대화를 오늘 다시 이어갈 수 있어야 제품이 됩니다."

learningGoals (5개, verb-led)
- 대화를 Session/Message/Summary 구조로 나눠요
- 긴 대화에서 비용과 품질이 동시에 흔들리는 이유를 설명해요
- Summary Rolling으로 오래된 맥락을 압축해요
- SQLite/Postgres/Redis 선택 기준을 비교해요
- 개인정보 보존·삭제·접근 제어의 기본 체크리스트를 만들어요

coreConcepts (4-5개)
- Session: 하나의 대화방 또는 작업 단위
- Message: role과 content를 가진 개별 발화
- Summary Rolling: 오래된 대화를 주기적으로 요약해 컨텍스트를 압축하는 패턴
- Storage Choice: SQLite/Postgres/Redis 중 사용 규모에 맞는 저장소 선택
- Privacy Boundary: 저장·조회·삭제 권한을 명확히 나누는 경계

reflectionQuestions (3-4개)
- 내 앱에서 반드시 다시 불러와야 하는 대화 정보는 무엇인가요?
- 사용자가 삭제를 요청하면 어떤 테이블과 캐시가 함께 지워져야 하나요?
- 원문 유지와 요약 압축 사이의 기준을 어디에 둘 건가요?

## 결론

가장 큰 문제: 권장값처럼 보이는 턴 수/보존 기간.  
수정 후 예상 등급: 🟢  
Claude 적용 우선순위: 🟡 보통
