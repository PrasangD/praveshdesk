export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { cities } from "@/lib/cities";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ["", 1.0],
    ["/automations", 0.9],
    ["/demo", 0.9],
    ["/how-it-works", 0.8],
    ["/pricing", 0.8],
    ["/automation-services", 0.8],
    ["/calculator", 0.7],
    ["/who-its-for", 0.7],
    ["/contact", 0.6],
    ["/about", 0.5],
    ["/privacy", 0.2],
    ["/terms", 0.2],
  ] as const;

  const now = new Date();
  return [
    ...staticRoutes.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: now, priority })),
    ...cities.map((c) => ({ url: `${site.url}/automation-services/${c.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
