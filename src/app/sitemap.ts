export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ["", 1.0],
    ["/features", 0.8],
    ["/how-it-works", 0.8],
    ["/pricing", 0.8],
    ["/solutions", 0.7],
    ["/calculator", 0.7],
    ["/demo", 0.9],
    ["/coaching-classes", 0.8],
    ["/about", 0.5],
    ["/contact", 0.6],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ] as const;

  const now = new Date();
  return [
    ...staticRoutes.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: now, priority })),
    ...cities.map((c) => ({ url: `${site.url}/coaching-classes/${c.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
