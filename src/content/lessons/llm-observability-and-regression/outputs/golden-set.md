# 회귀 테스트 골든 셋

프롬프트 변경 전후 비교의 기준. 5개로 시작, 문제 발생 시 추가.

---

## 골든 셋 구조

```yaml
id: gs-001
feature: review_summary
prompt_version_created: v1.0
input:
  review_text: "배송이 3일이나 늦었어요. 상품 자체는 마음에 들어요."
rules:
  must_contain:
    - "배송 지연"
    - "상품 만족"
  must_not_contain:
    - "환불"    # 리뷰에 없는 내용
    - "교환"
  max_length: 100
  min_length: 20
notes: "부정 + 긍정 혼합 리뷰. 둘 다 요약에 반영돼야 함."
```

---

## 샘플 골든 셋 5개

### GS-001: 혼합 감정 리뷰

```
input: "배송이 3일이나 늦었어요. 상품 자체는 마음에 들어요."
must_contain: ["배송 지연", "상품 만족"]
must_not_contain: ["환불", "재주문"]
max_length: 100
```

### GS-002: 순수 긍정 리뷰

```
input: "완전 최고예요!! 강력 추천합니다!! 포장도 완벽!!"
must_contain_sentiment: "positive"
must_not_contain: ["불만", "문제", "이슈"]
max_length: 60
```

### GS-003: 구체적 불만 포함

```
input: "사이즈가 설명이랑 달라요. XL인데 M 사이즈예요. 교환 원해요."
must_contain: ["사이즈 불일치", "교환"]
max_length: 80
```

### GS-004: 정보 없는 짧은 리뷰

```
input: "좋아요"
must_not_hallucinate: true   # 없는 내용 만들어내면 안 됨
max_length: 30
```

### GS-005: 긴 리뷰 요약 능력

```
input: "처음에 주문했을 때는 배송이 빠를 줄 알았는데 5일이나 걸렸어요. 
        그래도 상품 품질은 정말 좋고, 색상도 사진이랑 똑같아요. 
        포장도 꼼꼼하게 잘 되어있었어요. 다음에 또 구매할 것 같아요."
must_contain: ["배송 지연", "품질 만족"]
max_length: 120
min_length: 60
```

---

## 골든 셋 실패 시 처리

| 상황 | 처리 방법 |
|------|---------|
| 의도적 변경으로 기대값이 바뀜 | 골든 셋 업데이트 (변경 이유 기록) |
| 의도치 않은 드리프트 | 프롬프트 롤백 또는 재검토 |
| 새 케이스 추가 필요 | 실패한 실제 케이스를 GS-00N으로 추가 |

---

## 추가 기록란

새 케이스 발생 시 아래에 추가:

```
### GS-00N: <케이스 설명>
발생일: YYYY-MM-DD
원인: <어떤 상황에서 문제가 발견됐는지>
input: ...
rules: ...
```
