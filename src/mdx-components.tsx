import type { MDXComponents } from "mdx/types";

/**
 * MDX components are rendered inside `.lesson-reader`, which provides
 * typography for h1-h3, p, ul/ol, table, blockquote, pre, code via
 * `src/styles/globals.css`. So these components just pass through.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
