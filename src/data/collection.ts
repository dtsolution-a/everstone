export type CollectionBrand = "Everstone" | "Exclusive" | "Geogres";

export type CollectionItem = {
  src: string;
  name: string;
  brand: CollectionBrand;
  size: string;
  finish: string;
  /** Grid row-span hint for the masonry layout — "tall" gets extra height. */
  tall?: boolean;
};

export const BRAND_META: Record<
  CollectionBrand,
  { logo: string | null; accent: string; invert?: boolean }
> = {
  Everstone: { logo: "/logo.png", accent: "#cba876", invert: true },
  Exclusive: { logo: "/exclusive-logo-dark.png", accent: "#C07A2A", invert: true },
  Geogres: { logo: "/geogres-logo.svg", accent: "#1F6F5C", invert: true },
};

export const COLLECTION_ITEMS: CollectionItem[] = [
  { src: "/col-wooden.jpg", name: "Novela Brown", brand: "Everstone", size: "200 × 1200 mm", finish: "Wooden Matt", tall: true },
  { src: "/col-glazed.jpg", name: "Bricola Tan", brand: "Everstone", size: "200 × 1200 mm", finish: "Wooden Satin" },
  { src: "/col-outdoor.jpg", name: "Brazilian Grey", brand: "Everstone", size: "600 × 600 mm", finish: "Outdoor Anti-Slip" },
  { src: "/col-porcelain.jpg", name: "Bodo White", brand: "Everstone", size: "600 × 1200 mm", finish: "Porcelain Lapato", tall: true },

  { src: "/imggs/ex_hero.png", name: "Marble Editions", brand: "Exclusive", size: "800 × 1600 mm", finish: "Polished Marble", tall: true },
  { src: "/imggs/ex_col1.png", name: "Warm Wood Panel", brand: "Exclusive", size: "800 × 1600 mm", finish: "Wooden Matt" },
  { src: "/imggs/ex_col2.png", name: "Urban Stone", brand: "Exclusive", size: "600 × 1200 mm", finish: "Concrete Satin" },
  { src: "/imggs/ex_col3.png", name: "Modern Neutrals", brand: "Exclusive", size: "1200 × 1200 mm", finish: "Polished" },
  { src: "/imggs/ex_surf1.png", name: "Calcutta Noir", brand: "Exclusive", size: "800 × 1600 mm", finish: "Polished Marble", tall: true },
  { src: "/imggs/ex_surf2.png", name: "Carara Grey", brand: "Exclusive", size: "600 × 1200 mm", finish: "Polished Marble" },
  { src: "/imggs/ex_surf3.png", name: "Armani Grey", brand: "Exclusive", size: "1200 × 1200 mm", finish: "Honed Stone" },
  { src: "/imggs/ex_surf4.png", name: "Burlington White", brand: "Exclusive", size: "600 × 600 mm", finish: "Gloss Porcelain" },
  { src: "/imggs/ex_surf5.png", name: "Tribeca Silver", brand: "Exclusive", size: "800 × 800 mm", finish: "Satin Stone", tall: true },
  { src: "/imggs/ex_feat1.png", name: "Nero Statuario", brand: "Exclusive", size: "1600 × 3200 mm", finish: "Polished Marble" },
  { src: "/imggs/ex_feat2.png", name: "Noir Feature Slab", brand: "Exclusive", size: "1600 × 3200 mm", finish: "Polished Marble", tall: true },
  { src: "/imggs/ex_feat3.png", name: "Onyx Kitchen Suite", brand: "Exclusive", size: "1200 × 2400 mm", finish: "Polished Marble" },
  { src: "/imggs/ex_feat4.png", name: "Spa Travertine", brand: "Exclusive", size: "600 × 1200 mm", finish: "Honed Travertine" },
  { src: "/imggs/ex_phil.png", name: "Onyx Reception Slab", brand: "Exclusive", size: "1600 × 3200 mm", finish: "Polished Marble", tall: true },

  { src: "/geogres/MANHATTAN.jpg", name: "Manhattan", brand: "Geogres", size: "800 × 3000 mm", finish: "Full Body Slab", tall: true },
  { src: "/geogres/Manhattan-Bianco-Decor.jpeg", name: "Manhattan Bianco", brand: "Geogres", size: "800 × 3000 mm", finish: "Full Body Decor" },
  { src: "/geogres/runa.jpg", name: "Runa", brand: "Geogres", size: "1200 × 3200 mm", finish: "Color Body Slab" },
  { src: "/geogres/runa-nero-decor.jpg", name: "Runa Nero", brand: "Geogres", size: "1200 × 3200 mm", finish: "Color Body Decor", tall: true },
  { src: "/geogres/IMPERIO.jpg", name: "Imperio", brand: "Geogres", size: "1200 × 2400 mm", finish: "GVT Slab" },
  { src: "/geogres/IMPERIO-STONE-CREMA-PUNCH.jpg", name: "Imperio Stone Crema", brand: "Geogres", size: "1200 × 2400 mm", finish: "GVT Punch" },
  { src: "/geogres/BELMOND-ALMOND.jpg", name: "Belmond Almond", brand: "Geogres", size: "800 × 1600 mm", finish: "GVT Collection", tall: true },
  { src: "/geogres/Geosgres_Crayon.jpg", name: "Crayon", brand: "Geogres", size: "200 × 1200 mm", finish: "Wooden" },
];

export const FILTERS = ["All", "Everstone", "Exclusive", "Geogres"] as const;
