// robots.txt — 전체 크롤 허용 + sitemap 위치. 빌드 시 robots.txt로 생성된다.
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// output: export(GitHub Pages) 빌드에서 빌드 타임 정적 생성하도록 강제.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
