// MDX 본문에 적용하는 엘리먼트 매핑 — 단일 소스.
// - pre: 우상단 복사 버튼이 붙은 CodeBlock
// - a: 내부 링크([텍스트](/lessons/...))를 next/link 로 렌더해 basePath 자동 적용
// - Terminal · Figure: 레슨/특강 본문에서 진짜 터미널 mockup과 캡션 이미지를 그리는 블록
//
// import된 MDX 본문에는 루트 mdx-components.tsx 자동 적용이 닿지 않아,
// 레슨 페이지가 <MdxBody components={mdxElements} />로 직접 주입한다.
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Terminal, Figure } from "@/components/lesson-blocks";

// 본문 헤딩에서 텍스트만 추출 (인라인 code 등 중첩 노드 대응)
function nodeText(node: ReactNode): string {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

// 헤딩 텍스트 → 앵커 id (한글 보존). 검증 섹션의 "다시 보기" 점프 타깃이 된다.
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/['"“”‘’`]/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

export const mdxElements: MDXComponents = {
  pre: CodeBlock,
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(nodeText(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugify(nodeText(children))}>{children}</h3>
  ),
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
