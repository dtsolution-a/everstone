export type BrandCollection = {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  size: string;
};

export type BrandSurface = {
  name: string;
  type: string;
  size: string;
  image: string;
};

export type BrandGalleryItem = {
  image: string;
  label: string;
};

export type BrandStat = {
  icon: string;
  label: string;
  sub: string;
};

export type BrandConfig = {
  slug: "exclusive" | "geogres";
  name: string;
  logo: string;
  logoInvert?: boolean;
  accent: string; // tailwind arbitrary hex used for accent color
  eyebrow: string;
  heroTitleTop: string;
  heroTitleBottom: string;
  heroBody: string;
  heroImage: string;
  collectionsEyebrow: string;
  collectionsTitle: string;
  collectionsHighlight: string;
  collections: BrandCollection[];
  surfacesEyebrow: string;
  surfacesTitleTop: string;
  surfacesHighlight: string;
  surfaces: BrandSurface[];
  galleryEyebrow: string;
  galleryTitle: string;
  galleryHighlight: string;
  gallery: BrandGalleryItem[];
  philosophyEyebrow: string;
  philosophyTitle: string;
  philosophyBody: string;
  philosophyImage: string;
  ctaEyebrow: string;
  ctaTitleTop: string;
  ctaHighlight: string;
  stats: BrandStat[];
  blurb: string;
};

export const brands: Record<"exclusive" | "geogres", BrandConfig> = {
  exclusive: {
    slug: "exclusive",
    name: "Exclusive",
    logo: "/exclusive-logo-dark.png",
    accent: "#C07A2A",
    eyebrow: "Drafted Spaces.",
    heroTitleTop: "TIMELESS",
    heroTitleBottom: "LUXURY.",
    heroBody:
      "Exclusive brings together premium surfaces, sophisticated textures and modern architectural aesthetics — one of Everstone's flagship showroom lines, designed for luxurious living.",
    heroImage: "/imggs/ex_hero.png",
    collectionsEyebrow: "Premium Collections",
    collectionsTitle: "Curated. Refined.",
    collectionsHighlight: "Exclusive.",
    collections: [
      {
        number: "01",
        title: "Marble Editions",
        subtitle: "Calacatta and Statuario veining, reimagined in porcelain.",
        image: "/imggs/ex_col1.png",
        size: "800 × 1600 mm",
      },
      {
        number: "02",
        title: "Urban Stone",
        subtitle: "Concrete-inspired surfaces for contemporary interiors.",
        image: "/imggs/ex_col2.png",
        size: "600 × 1200 mm",
      },
      {
        number: "03",
        title: "Modern Neutrals",
        subtitle: "Warm greige tones tuned for open, sunlit living.",
        image: "/imggs/ex_col3.png",
        size: "1200 × 1200 mm",
      },
    ],
    surfacesEyebrow: "Featured Surfaces",
    surfacesTitleTop: "Exceptional",
    surfacesHighlight: "detail.",
    surfaces: [
      { name: "Calcutta Noir", type: "MARBLE", size: "800 × 1600 mm", image: "/imggs/ex_surf1.png" },
      { name: "Carara Grey", type: "MARBLE", size: "600 × 1200 mm", image: "/imggs/ex_surf2.png" },
      { name: "Armani Grey", type: "STONE", size: "1200 × 1200 mm", image: "/imggs/ex_surf3.png" },
      { name: "Burlington White", type: "PORCELAIN", size: "600 × 600 mm", image: "/imggs/ex_surf4.png" },
      { name: "Tribeca Silver", type: "STONE", size: "800 × 800 mm", image: "/imggs/ex_surf5.png" },
    ],
    galleryEyebrow: "Application Inspiration",
    galleryTitle: "Spaces That",
    galleryHighlight: "Inspire.",
    gallery: [
      { image: "/imggs/ex_feat1.png", label: "Living Room" },
      { image: "/imggs/ex_feat2.png", label: "Feature Wall" },
      { image: "/imggs/ex_feat3.png", label: "Kitchen" },
      { image: "/imggs/ex_feat4.png", label: "Bathroom" },
    ],
    philosophyEyebrow: "Our Philosophy",
    philosophyTitle: "SURFACES THAT SHAPE ATMOSPHERE.",
    philosophyBody:
      "We believe exceptional spaces are built on the foundation of extraordinary materials and meticulous attention to detail — every Exclusive slab is chosen to hold that standard.",
    philosophyImage: "/imggs/ex_phil.png",
    ctaEyebrow: "Let's Create Something Timeless",
    ctaTitleTop: "Luxury Begins",
    ctaHighlight: "Surface.",
    stats: [
      { icon: "◈", label: "Premium Quality", sub: "Globally sourced" },
      { icon: "✦", label: "Innovative Design", sub: "Inspired by architects" },
      { icon: "⬡", label: "Sustainable Choice", sub: "Responsibly crafted" },
      { icon: "◉", label: "Global Standards", sub: "Consistent everywhere" },
    ],
    blurb:
      "Exclusive is one of Everstone's prime showroom brands — premium marble-inspired porcelain surfaces for luxury residential and hospitality interiors.",
  },
  geogres: {
    slug: "geogres",
    name: "Geogres",
    logo: "/geogres-logo.svg",
    accent: "#1F6F5C",
    eyebrow: "Crafting a Tradition of Excellence.",
    heroTitleTop: "LARGE FORMAT",
    heroTitleBottom: "MASTERY.",
    heroBody:
      "GeoGres Tiles is formed by dynamic, professional people with a mind always on giving the best of ceramic products — constant innovation is their way of understanding work. One of Everstone's prime showroom brands.",
    heroImage: "/imggs/ex_surf3.png",
    collectionsEyebrow: "Our New Collection",
    collectionsTitle: "Engineered. Large-Format.",
    collectionsHighlight: "Geogres.",
    collections: [
      {
        number: "01",
        title: "Manhattan",
        subtitle: "Bianco decor slabs for refined, contemporary interiors.",
        image: "/imggs/ex_feat3.png",
        size: "800 × 3000 mm",
      },
      {
        number: "02",
        title: "Runa",
        subtitle: "Nero-toned surfaces with striking natural depth.",
        image: "/imggs/ex_feat1.png",
        size: "1200 × 3200 mm",
      },
      {
        number: "03",
        title: "Imperio",
        subtitle: "Stone-crema textures built to suit any aesthetic.",
        image: "/imggs/ex_surf5.png",
        size: "1200 × 2400 mm",
      },
    ],
    surfacesEyebrow: "Geoslab Collections",
    surfacesTitleTop: "An advanced product,",
    surfacesHighlight: "finish.",
    surfaces: [
      { name: "Manhattan", type: "FULL BODY SLAB", size: "800 × 3000 mm", image: "/geogres/MANHATTAN.jpg" },
      { name: "Runa", type: "COLOR BODY SLAB", size: "1200 × 3200 mm", image: "/geogres/runa.jpg" },
      { name: "Imperio", type: "GVT SLAB", size: "1200 × 2400 mm", image: "/geogres/IMPERIO.jpg" },
      { name: "Belmond", type: "GVT COLLECTION", size: "800 × 1600 mm", image: "/geogres/BELMOND-ALMOND.jpg" },
      { name: "Crayon", type: "WOODEN", size: "200 × 1200 mm", image: "/geogres/Geosgres_Crayon.jpg" },
    ],
    galleryEyebrow: "Choose By Size",
    galleryTitle: "Formats For Every",
    galleryHighlight: "Space.",
    gallery: [
      { image: "/imggs/ex_feat4.png", label: "800 × 3000 MM" },
      { image: "/imggs/ex_feat2.png", label: "1200 × 3200 MM" },
      { image: "/imggs/ex_col2.png", label: "1200 × 2400 MM" },
      { image: "/imggs/ex_surf1.png", label: "800 × 1600 MM" },
    ],
    philosophyEyebrow: "Our Philosophy",
    philosophyTitle: "GEOSLAB: A NEW STEP FORWARD.",
    philosophyBody:
      "Geoslab is a brand focused on large-format ceramic, where the latest manufacturing technologies create an advanced product with the best technical and aesthetic features.",
    philosophyImage: "/imggs/ex_col3.png",
    ctaEyebrow: "Let's Build Something Advanced",
    ctaTitleTop: "Excellence Begins",
    ctaHighlight: "Ceramic.",
    stats: [
      { icon: "◈", label: "20+ Series", sub: "Wooden collection" },
      { icon: "✦", label: "100+ Designs", sub: "Constantly evolving" },
      { icon: "⬡", label: "3 Finishes", sub: "Matte, satin & gloss" },
      { icon: "◉", label: "Large Format", sub: "Up to 1200 × 3200mm" },
    ],
    blurb:
      "Geogres is one of Everstone's prime showroom brands — large-format porcelain and ceramic slabs manufactured in Morbi, Gujarat, engineered for scale and precision.",
  },
};
