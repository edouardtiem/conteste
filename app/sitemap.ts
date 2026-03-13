import type { MetadataRoute } from "next";
import { getTypes, getDepartements } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://conteste.app";
  const types = getTypes();
  const depts = getDepartements();

  /* ---- Static pages ---- */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stats`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  /* ---- Type pages: use spread dates per type ---- */
  const typeDates: Record<string, string> = {
    radar: "2026-02-20",
    "stationnement-fps": "2026-02-25",
    "feux-rouges": "2026-03-01",
    ceinture: "2026-03-04",
    telephone: "2026-03-07",
  };

  const typePages: MetadataRoute.Sitemap = types.map((type) => ({
    url: `${baseUrl}/guides/${type.slug}`,
    lastModified: new Date(typeDates[type.slug] ?? "2026-03-01"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  /* ---- Editorial guides ---- */
  const editorialGuides: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/guides/contester-amende-france`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides/contester-amende-radar`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/delai-contestation-amende`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides/antai-comment-contester`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  /* ---- Department pages: spread dates between Feb 15 and Mar 12 ---- */
  const startMs = new Date("2026-02-15").getTime();
  const endMs = new Date("2026-03-12").getTime();
  const allDeptEntries = types.flatMap((type) =>
    depts.map((dept) => ({
      typeSlug: type.slug,
      deptCode: dept.code,
    }))
  );
  const totalDept = allDeptEntries.length;

  const deptPages: MetadataRoute.Sitemap = allDeptEntries.map((entry, i) => ({
    url: `${baseUrl}/guides/${entry.typeSlug}/${entry.deptCode}`,
    lastModified: new Date(
      startMs + Math.round((i / Math.max(totalDept - 1, 1)) * (endMs - startMs))
    ),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...typePages, ...editorialGuides, ...deptPages];
}
