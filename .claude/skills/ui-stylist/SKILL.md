---
name: ui-stylist
description: AI Builder School UI 컴포넌트와 디자인 토큰만 다루는 좁은 책임 스킬. globals.css의 calm-editorial 토큰, components/ JSX, tailwind.config.ts 안에서만 작업. 콘텐츠 데이터(src/content/**)나 라이브 코드(src/lib/**)는 절대 손대지 않음.
---

# Skill · ui-stylist

> Harness · Agent Topology — UI는 UI에서 끝낸다. 콘텐츠/스키마와 분리.

## 언제 쓰나

- 색·여백·타이포그래피·반응형 조정
- 카드/버튼/배지 등 컴포넌트 시각 변경
- `globals.css`의 토큰·유틸 추가
- `tailwind.config.ts`에 토큰 추가

## 언제 안 쓰나

- 콘텐츠 텍스트 변경 → `lesson-writer` 또는 콘텐츠 데이터 직접 편집
- 새 페이지/라우트 추가 → 직접 작업 (이 스킬 범위 아님)
- 타입 변경 → 직접 작업
- 무결성 검증 → `content-validator`

## 허용 범위 (write/edit OK)

- `src/components/**`
- `src/styles/globals.css`
- `tailwind.config.ts`
- `src/app/**/*.tsx` (단, **JSX 구조나 데이터 fetch 변경은 금지**, 클래스명·스타일만)

## 금지 범위 (절대 건드리지 말 것)

- `src/content/**` — 콘텐츠 데이터·MDX 본문
- `src/lib/**` — 타입·헬퍼·검증
- `next.config.mjs` `distDir` 값 (반드시 `.next.nosync` 유지)
- `package.json` dependency
- `lefthook.yml`
- `.claude/**`

## 디자인 시스템 (calm editorial)

토큰:
- **Colors**: `ink / ink-2 / ink-3 / ink-4 · paper / paper-2 · line / line-2 · card`
- **Persona accent**: `--p-from / --p-to` (페르소나 색 — `.p-{journeyId}` 클래스가 변수 설정)
- **Radius**: `--r 12 / --r-sm 8 / --r-lg 20`
- **Easing**: `--ease cubic-bezier(.2,.7,.2,1)`
- **무지개**: brand-mark + 한 페이지 1~2 포인트만

원칙:
- 무지개 그라디언트는 절제 사용 (`brand-mark`, `cta-box::before`, `loop-disc`만)
- calm-editorial 톤 유지 — 과도한 그림자/색 자제
- Korean typography: `word-break: keep-all; overflow-wrap: break-word; text-wrap: pretty`

## 작업 순서

1. 변경할 컴포넌트/CSS 파일 1~3개를 명시
2. 변경 적용
3. `npm run typecheck && npm run build` 실행
4. 브라우저 새로고침 안내 (dev 서버에 hot-reload 안 될 때)

## 절대 하지 말 것

- 콘텐츠 데이터 편집 (lesson title, journey promise 등)
- 타입 시그니처 변경
- `track-cards`, `phase-card`, `journey-full` 등 **CSS 클래스 이름 변경** (다른 곳 참조 깨짐)
- `globals.css`에서 기존 토큰 값 임의 변경 (디자인 핸드오프 사양 어긋남)

## 검증 게이트

```bash
npm run typecheck   # 타입 에러 없는지
npm run build       # 새 클래스명/스타일이 빌드 통과하는지
```

`validate`는 콘텐츠 무결성이라 UI 변경엔 영향 없지만, `npm run check`로 같이 돌리는 습관은 OK.
