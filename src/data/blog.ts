export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
};

export const posts: BlogPost[] = [
  {
    slug: "porcelain-vs-ceramic",
    title: "Porcelain vs. Ceramic: Which Tile Is Right For Your Project?",
    excerpt:
      "Porcelain and ceramic tiles both have their place — here's how to choose the right one for floors, walls and high-traffic spaces.",
    image: "/col-porcelain.jpg",
    date: "2026-07-12",
    category: "Guides",
  },
  {
    slug: "large-format-tiles-trend",
    title: "Why Large-Format Slabs Are Defining Modern Interiors",
    excerpt:
      "Fewer grout lines, a cleaner look, and faster installation — large-format porcelain is reshaping how architects specify surfaces.",
    image: "/exclusive/STATUARIO-PULIDO1.jpg",
    date: "2026-06-28",
    category: "Trends",
  },
  {
    slug: "exclusive-collection-launch",
    title: "Introducing Exclusive: Our Newest Showroom Brand",
    excerpt:
      "A closer look at Exclusive — premium marble-inspired surfaces now available across our showroom network.",
    image: "/exclusive/CALCUTTA-NOIR1.jpg",
    date: "2026-06-10",
    category: "Announcements",
  },
  {
    slug: "geogres-large-format-ceramic",
    title: "Geogres: Engineering Large-Format Ceramic At Scale",
    excerpt:
      "From Morbi, Gujarat to showrooms across the UAE — how Geogres builds slabs up to 1200 × 3200mm.",
    image: "/geogres/MANHATTAN.jpg",
    date: "2026-05-22",
    category: "Announcements",
  },
  {
    slug: "choosing-tile-finish",
    title: "Matte, Satin or Gloss: Choosing The Right Finish",
    excerpt:
      "The finish you choose changes how a space feels underfoot and in the light. Here's a breakdown of the options.",
    image: "/col-glazed.jpg",
    date: "2026-05-02",
    category: "Guides",
  },
  {
    slug: "outdoor-tile-durability",
    title: "Specifying Anti-Slip Tiles For Outdoor & Wet Areas",
    excerpt:
      "Pools, terraces and driveways all demand a different standard of durability and slip resistance.",
    image: "/col-outdoor.jpg",
    date: "2026-04-18",
    category: "Guides",
  },
];
