# 개발팀 전달용 품질 기준 정의서

PM이 정의한 Eval 루브릭을 개발팀이 코드로 구현할 수 있는 형태로 번역.

---

## 기능 정보

```
기능명: <기능명>
버전: v1.0
작성일: YYYY-MM-DD
작성자: <PM 이름>
```

---

## 자동 측정 가능한 기준

개발팀이 코드로 구현할 수 있는 형태:

### 기준 1: 출력 길이

```python
def check_length(output: str) -> bool:
    """100~200자 범위 확인"""
    return 100 <= len(output) <= 200
```

**허용 범위:** 100자 이상, 200자 이하  
**실패 처리:** 프롬프트에 길이 제한 지시 추가

---

### 기준 2: 금지 패턴 없음

```python
HALLUCINATION_PATTERNS = [
    r"\d{4}-\d{2}-\d{2}",  # 입력에 없는 날짜
    r"₩[\d,]+",            # 입력에 없는 금액
]

def check_no_hallucination(output: str, input_text: str) -> bool:
    """출력에 입력에 없는 패턴이 있는지 확인"""
    for pattern in HALLUCINATION_PATTERNS:
        if re.search(pattern, output) and not re.search(pattern, input_text):
            return False
    return True
```

---

### 기준 3: 필수 포함 키워드 (LLM-as-Judge)

규칙 기반으로 자동화하기 어려운 항목. LLM-as-Judge 프롬프트:

```
원문: {input}
요약: {output}

아래를 각각 1/0으로 채점해줘:
- 핵심불만포함: 원문의 주요 불만이 요약에 있는가
- 정보정확도: 원문에 없는 내용이 요약에 없는가
- 액션포인트: 다음 행동이 명시됐는가

JSON 형식으로만 답해줘: {"핵심불만포함": 0/1, "정보정확도": 0/1, "액션포인트": 0/1}
```

---

## 합격 기준

| 항목 | 자동화 방법 | 합격 기준 |
|------|-----------|---------|
| 길이 | 코드 직접 측정 | 100~200자 |
| 환각 패턴 | 정규식 체크 | 금지 패턴 0개 |
| 핵심 내용 포함 | LLM-as-Judge | 1점 |
| 정보 정확도 | LLM-as-Judge | 1점 |
| 액션 포인트 | LLM-as-Judge | 1점 |

**전체 합격:** 5/5 항목 통과 (목표 90% 이상 샘플에서)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 변경자 |
|------|------|---------|-------|
| YYYY-MM-DD | v1.0 | 최초 작성 | |
