import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://abdullah.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
