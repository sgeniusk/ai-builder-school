# 지음 랜딩 — Midjourney 이미지 프롬프트

랜딩(`src/components/landing/LandingSections.tsx`)에 얹을 이미지용 프롬프트 모음.
브랜드 토큰에 고정 — 쪽빛 잉크 `#1B2B47`, 종이 `#FAF9F6`/`#F2F0EA`, 무지개는 **지붕에만**.
모티프는 "무지개 지붕 한옥을 짓다(知音·建·六)". 글자는 이미지에 넣지 않는다(문구는 사이트가 얹음).

## 이미지 DNA

- **화풍** — 수묵담채(먹 + 옅은 채색) · 산수화 전통. 가는 쪽빛 먹선, 한지 여백, 외로운 점경 인물, 문학적·프리미엄. **히어로=한옥(끝내 짓는 목적지), 여정=산수화 원정(AI 정복을 향한 길)**. (C·D·E 배경은 더 절제된 톤)
- **팔레트** — 종이 아이보리(`#FAF9F6`/`#F2F0EA`) 바탕, 쪽빛 잉크(`#1B2B47`)가 선·형태의 주색, 먹(`#0D0D0D`) 디테일. 무지개는 한옥 처마 지붕에만 절제 (coral `#EF6F63` · amber `#E6A94F` · green `#5FB46B` · teal `#45B4BD` · blue `#5E9BD6` · violet `#9A7BE0`)
- **금지(--no)** — photorealistic, 3d render, glossy, neon, lens flare, harsh shadow, clutter, text, watermark, logo

## 공통 스타일 꼬리말 (모든 프롬프트에 이미 포함)

> calm modern Korean editorial illustration, fine deep-indigo ink linework on warm parchment ivory, subtle hanji mulberry-paper grain and risograph texture, soft flat muted color, restrained palette, rainbow gradient only on the curved hanok roof tiles, generous negative space, premium literary mood, soft diffuse daylight --style raw --stylize 150 --no text, watermark, photorealistic, 3d render, glossy, neon, lens flare, clutter

---

## A · 히어로 엠블럼 (시그니처) — 수묵담채 · 그리는 중 · `--ar 4:5` (또는 `1:1`)
> 슬롯: `.lp-emblem` 패널 / `public/landing/hero.jpg` (적용 완료). 위(지붕)부터 완성되고 아래로 갈수록 초기 붓질만 남는 **그리는 중**의 한옥. 무지개는 뚝뚝 흘린 자국이 아니라 처마를 따라 **질서있게 붓칠하다 가장자리만 살짝 번진** 담채.

**A1 · 그리는 중 (위→아래로 완성, 무지개는 질서있게 번짐)**
```
A single Korean hanok depicted as an ink-wash painting still in progress, painted from the top down: the roof and upper columns fully rendered in confident East-Asian sumukhwa brushwork — calligraphic deep-indigo and black strokes, dry-brush curved eaves — and the painting gradually dissolves downward, the lower structure and stone base trailing off into a few loose preliminary gesture strokes and bare underdrawing on raw warm mulberry hanji paper, as if the artist is still bringing the house into being (top finished, bottom barely begun); the rainbow on the roof is made of deliberate orderly horizontal brushstrokes following the curved eave line that feather and bleed only softly at their edges — controlled wet-on-wet, translucent coral, amber, green, teal, blue, violet, never dripping or splattered; abundant negative space (yeobaek), quiet literary mood --style raw --stylize 160 --ar 4:5 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, paint drips, splatters, random stains, runny vertical streaks, blots, clutter
```

**A2 · 더 절제 (먹 위주, 그리는 중)**
```
A Korean hanok as a minimalist ink-wash painting caught mid-creation, painted top-down — the eaves and ridge fully brushed in sparse confident indigo sumukhwa strokes, fading downward into a few first gesture marks and bare hanji paper at the base; only a whisper of rainbow, orderly soft colored brushstrokes feathering gently along the roofline, controlled bleed not drips, mostly monochrome ink, vast calm negative space, meditative --style raw --stylize 180 --ar 4:5 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, paint drips, splatters, runny streaks, blots, clutter
```

## B · 여섯 여정 카드 (한 세트) — 산수화 · `--ar 1:1`
> 슬롯: `.lp-jcard` / `public/landing/journey-<id>.png`. 여정은 '집'이 아니라 **산수화 — AI를 정복하러 떠나는 길**. 먼 산·먼 바다를 향한 첫걸음을 그린다 (히어로 한옥 = 끝내 짓는 목적지). 같은 수묵담채 손맛·한지 여백·외로운 나그네 한 점, 각 여정은 **단 한 색**(페르소나 색)만 담채로 색-코딩. 끝(마스터)에서 저 멀리 한옥이 보이며 히어로로 이어진다.

**B1 · 스타터 (입문 · 먼 산 첫걸음 · 라임그린)**
```
A lone small traveler at the foot of a vast distant misty mountain range at dawn, a faint path just beginning to wind upward, the very first step of a long journey ahead, hopeful and open; the only color note is a soft lime-green wash on the near hills, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, distant peaks dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

**B2 · 실무자 (직장 · 강을 건너 · 스카이블루)**
```
A small lone figure crossing a wide calm river on stepping stones toward gentle terraced hills, the steady measured passage of everyday work; the only color note is a soft sky-blue wash on the water, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, distant peaks dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

**B3 · 크리에이터 (콘텐츠 · 꽃핀 골 · 코랄)**
```
A lone traveler entering a blossoming valley where the peaks open and a thin waterfall and drifting petals fill the air, the landscape turning expressive and alive; the only color note is a soft coral wash on the blossoms, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, distant peaks dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

**B4 · 파운더 (사업 · 먼 바다로 · 앰버골드)**
```
A small boat setting out from a rocky shore toward a far island across a vast open sea at dawn, sailing for the distant horizon, the courage to launch; the only color note is a warm amber-gold wash on the horizon, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, the far shore dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

**B5 · 엔지니어 (시스템 · 깊은 협곡 · 틸)**
```
A lone traveler ascending a great gorge of layered rock cliffs, a deep ravine spanned by a slender stone bridge, structural depth and resolve; the only color note is a soft teal wash in the ravine mist, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, distant peaks dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

**B6 · AI 네이티브 (마스터 · 정상 운해 · 바이올렛)**
```
A lone figure on the highest summit above an endless sea of clouds at sunrise, the whole mountain range revealed below and a faint distant hanok rooftop on a far ridge as the destination, mastery and vista; the only color note is a soft violet wash across the cloud sea, traditional Korean ink-wash landscape painting (sansuhwa, sumukhwa damchae), deep-indigo ink with a single soft color wash, distant peaks dissolving into mist and vast empty hanji paper (yeobaek), serene and vast, calm literary mood, soft diffuse light --style raw --stylize 170 --ar 1:1 --no text, watermark, photorealistic, 3d render, glossy, neon, hard outlines, flat vector, busy detail, clutter
```

## C · CTA 밴드 배경 (어두운 쪽빛) — `--ar 21:9`
> 슬롯: `.lp-cta` 배경 / `public/landing/cta-bg.png`. 왼쪽은 텍스트 자리 — 비워둘 것.

```
A quiet row of Korean hanok rooftops silhouetted against a deep indigo night sky, a faint restrained rainbow aurora glowing softly above the curved eaves, the left half left as calm empty deep-indigo space for text, minimal and atmospheric, very dark and subtle, calm modern Korean editorial illustration on deep indigo night (#1B2B47), fine ink linework, subtle grain, generous negative space --style raw --stylize 150 --ar 21:9 --no text, watermark, photorealistic, 3d render, glossy, neon, lens flare, bright colors, clutter
```

## D · OG / 소셜 공유 (1200×630) — `--ar 40:21`
> 슬롯: `src/app/opengraph-image.tsx` 대체용(선택). 왼쪽 1/3은 제목 자리.

```
A single rainbow-roof Korean hanok being built, placed on the right side of the frame, the left third left open as warm parchment space for a title, balanced editorial poster composition, calm modern Korean editorial illustration, fine deep-indigo ink linework on warm parchment ivory, subtle hanji grain and risograph texture, rainbow only on the roof tiles, generous negative space, soft diffuse daylight --style raw --stylize 150 --ar 40:21 --no text, watermark, photorealistic, 3d render, glossy, neon, clutter
```

## E · 한지 종이 텍스처 (선택, 배경용) — `--tile`
> 섹션 배경에 아주 옅게 깔 seamless 질감.

```
Seamless subtle warm ivory hanji mulberry-paper texture, faint natural fibers and soft grain, almost flat, very low contrast, no objects --tile --ar 16:9 --no pattern, text, lines, objects, color
```

---

## 일관성 · 실전 팁

1. **채택한 히어로로 묶기** — 확정된 히어로(`public/landing/hero.jpg`)를 Midjourney에 올리고(또는 그 job URL), B 프롬프트 끝에 `--sref <그 URL> --sw 80` 을 붙인다. 6장이 히어로와 똑같은 수묵 톤·붓질로 묶인다.
2. **카드에 자연스럽게 얹기** — 여정 그림은 배경을 사이트 종이색과 똑같이. 프롬프트에 `plain warm ivory background, no frame` 추가하거나, 생성 후 배경 제거(투명 PNG)해서 카드 위에 올린다.
3. **무지개 새는 것 방지** — 색이 벽·바닥까지 번지면 `--no multicolor walls, rainbow everywhere` 를 더해 지붕에만 고정.
4. **글자 금지** — 한글/영문 모두 이미지에 넣지 않는다(`--no text`). 문구는 사이트가 얹는다.
5. **비율 메모** — 히어로 4:5 · 여정카드 1:1 · CTA 21:9 · OG 40:21(≈1200×630).
6. **업스케일** — 최종은 MJ Upscale(Subtle)로. 카드용은 폭 1200px, 히어로는 1600px 정도면 충분.

## 파일을 받으면 (배선)

`public/landing/` 에 넣고 알려주면 컴포넌트·CSS에 연결한다.
- `hero.jpg` → `.lp-emblem` (수묵 한옥 그림 — 적용 완료)
- `journey-<id>.jpg` → `.lp-jcard` 상단 산수화 배너 (적용 완료 — 6장 800², q88)
- `cta-bg.png` → `.lp-cta` 배경(`.lp-cta__glow` 자리)
- OG → `opengraph-image.tsx` 정적 이미지 교체
