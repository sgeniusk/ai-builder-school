// MDX 본문에 적용하는 엘리먼트 매핑 — 단일 소스.
// - pre: 우상단 복사 버튼이 붙은 CodeBlock
// - a: 내부 링크([텍스트](/lessons/...))를 next/link 로 렌더해 basePath 자동 적용
// - Terminal · Figure: 레슨/특강 본문에서 진짜 터미널 mockup과 캡션 이미지를 그리는 블록
//
// import된 MDX 본문에는 루트 mdx-components.tsx 자동 적용이 닿지 않아,
// 레슨 페이지가 <MdxBody components={mdxElements} />로 직접 주입한다.
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal, Figure } from "@/components/lesson-blocks";

export const mdxElements: MDXComponents = {
  pre: CodeBlock,
  a: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  Terminal,
  Figure,
};
