// 사이트맵 — 정적 라우트 + 전체 stage·lesson. 빌드 시 sitemap.xml로 생성된다.
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getLessons, getStages } from "@/lib/content";

// output: export(GitHub Pages) 빌드에서 빌드 타임 정적 생성하도록 강제.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/stages",
    "/journeys",
    "/projects",
    "/templates",
    "/start",
    "/about",
  ];
  const stagePaths = getStages().map((s) => `/stages/${s.slug}`);
  const lessonPaths = getLessons().map((l) => `/lessons/${l.slug}`);

  return [...staticPaths, ...stagePaths, ...lessonPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path.startsWith("/lessons/") ? 0.6 : 0.8,
  }));
}
