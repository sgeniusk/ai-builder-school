// @next/mdx 가 자동 인식하는 MDX 엘리먼트 매핑.
// 내부 링크([텍스트](/lessons/...))를 next/link 로 렌더해 basePath(GitHub Pages
// 서브경로 등)가 자동 적용되도록 한다. 외부 링크는 일반 <a> 유지.
import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
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
  };
}
