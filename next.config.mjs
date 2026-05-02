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
 * Vercel/Netlify 같은 배포 환경에서는 기본 .next를 쓰도록
 * `USE_DEFAULT_DIST=1` 환경변수로 우회 가능합니다.
 */
const distDir = process.env.USE_DEFAULT_DIST
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
};

export default withMDX(nextConfig);
