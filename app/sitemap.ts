import type { MetadataRoute } from "next";
import { getTypes, getDepartements } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://conteste.app";
  const types = getTypes();
  const depts = getDepartements();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stats`,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const typePages: MetadataRoute.Sitemap = types.map((type) => ({
    url: `${baseUrl}/guides/${type.slug}`,
    lastModified: new Date("2026-03-12"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const deptPages: MetadataRoute.Sitemap = types.flatMap((type) =>
    depts.map((dept) => ({
      url: `${baseUrl}/guides/${type.slug}/${dept.code}`,
      lastModified: new Date("2026-03-12"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...typePages, ...deptPages];
}
