// 캡션 있는 이미지 — 레슨·특강 MDX에서 다이어그램·스크린샷을 일관되게 보여준다.
// 이미지는 public/lessons/<slug>/<image>.{png,svg,jpg,webp}에 둔다 (Next 정적 자원).
// SVG는 다이어그램에 권장 (해상도 무손실 + 작은 용량).
//
// 사용 예
//   <Figure
//     src="/lessons/git-basics-and-terminology/branch-diagram.svg"
//     alt="git branch가 main에서 갈라져 나가는 다이어그램"
//     caption="브랜치는 평행 우주. 실험은 새 브랜치에서, 합치고 싶으면 merge."
//     width={800} height={420}
//   />
import Image from "next/image";

export interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** 디자인 너비. SVG는 정확하지 않아도 됨. 기본 800. */
  width?: number;
  /** 디자인 높이. 기본 500. 실제 비율은 이미지 자체가 결정. */
  height?: number;
  /** true면 본문 폭을 넘어 가로로 확장 (대형 다이어그램용). */
  bleed?: boolean;
}

export function Figure({
  src,
  alt,
  caption,
  width = 800,
  height = 500,
  bleed = false,
}: FigureProps) {
  return (
    <figure className={`lesson-figure${bleed ? " lesson-figure--bleed" : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="lesson-figure__image"
      />
      {caption && <figcaption className="lesson-figure__caption">{caption}</figcaption>}
    </figure>
  );
}
