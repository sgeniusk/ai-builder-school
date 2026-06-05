// 사이트 배포 정보 — metadata·sitemap·robots·OG가 공유하는 정본.
// production 배포는 GitHub Pages(main 상시).
//
// SITE_ORIGIN — 호스트만. metadataBase 전용. basePath(/ai-builder-school)가
//   서브경로를 따로 붙이므로 metadataBase에 서브경로를 넣으면 이중 prefix가 된다.
// SITE_URL — 서브경로 포함 전체 URL. sitemap·robots·og:url처럼 절대 URL이
//   필요한 곳에서 쓴다.
export const SITE_ORIGIN = "https://sgeniusk.github.io";
export const SITE_URL = `${SITE_ORIGIN}/ai-builder-school`;
// 지음(Jieum) 리브랜딩 — 표시 이름만 변경, 배포 경로(SITE_URL/basePath)는 유지.
export const SITE_NAME = "지음";
export const SITE_TAGLINE = "쓰는 사람에서, 짓는 사람으로";
