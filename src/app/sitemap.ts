import type { MetadataRoute } from "next";

const BASE_URL = "https://everstonetiles.ae";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/collection",
    "/exclusive",
    "/geogres",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms",
    "/sitemap-page",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
