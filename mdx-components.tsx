// Next.js MDX 규약 파일 — @next/mdx 가 요구한다.
// 실제 엘리먼트 매핑은 src/components/mdx-elements.tsx 가 단일 소스.
// (import된 MDX 본문에는 이 자동 경로가 닿지 않아, 레슨 페이지가 components를
//  명시 주입한다 — mdx-elements.tsx 주석 참고.)
import type { MDXComponents } from "mdx/types";
import { mdxElements } from "@/components/mdx-elements";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, ...mdxElements };
}
