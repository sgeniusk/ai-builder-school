import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * iCloud Drive (`com~apple~CloudDocs`)는 빌드 산출물의 빠른 쓰기를 깨뜨립니다.
 *
 * macOS는 디렉토리/파일 이름이 `.nosync`로 끝나면 iCloud가 동기화 대상에서 제외합니다.
 * 따라서 distDir을 `.next.nosync`로 바꿔 iCloud의 영향을 완전히 받지 않게 합니다.
 *
 * 절대 경로(예: /var/folders/...)는 Next.js가 path.join으로 프로젝트 루트에 붙여버려서
 * 사용 불가 — 반드시 프로젝트 내부의 상대 경로 + `.nosync` 접미사 조합이어야 합니다.
 *
 * 배포 환경 우회
 * - Vercel은 자동 감지 (process.env.VERCEL === "1"을 Vercel runtime이 주입).
 * - 기타 환경(Netlify 등)에서는 USE_DEFAULT_DIST=1로 명시 우회.
 */
/**
 * GitHub Pages 배포
 * - GITHUB_PAGES=true 일 때만 정적 export 모드로 전환된다.
 * - 사이트가 sgeniusk.github.io/ai-builder-school/ 서브경로로 서빙되므로 basePath 필요.
 * - Vercel·로컬·CI 빌드는 이 분기에 들어오지 않아 영향 없음.
 */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const distDir =
  process.env.USE_DEFAULT_DIST || process.env.VERCEL || isGitHubPages
    ? ".next"
    : ".next.nosync";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: __dirname,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  distDir,
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/ai-builder-school",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default withMDX(nextConfig);
