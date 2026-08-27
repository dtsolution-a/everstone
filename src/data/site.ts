export const contact = {
  phone: "+971 52 793 3046",
  phoneHref: "tel:+971527933046",
  whatsapp: "https://wa.me/971527933046",
  email: "sales@everstonetiles.ae",
  address: "Capital Mall, Sheikh Mohamed Bin Zayed City, Abu Dhabi, UAE",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const nav = [
  { label: "Collections", href: "#collections" },
  { label: "Applications", href: "#applications" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const brandNav = [
  { label: "Exclusive", href: "/exclusive" },
  { label: "Geogres", href: "/geogres" },
];

// Site-wide header nav — real routes (not on-page anchors), shown on
// every page. Exclusive/Geogres carry their own logo so the header can
// render a brand mark instead of a plain text label for those two.
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Collection", href: "/collection" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Exclusive", href: "/exclusive", logo: "/exclusive-logo-dark.png" },
  { label: "Geogres", href: "/geogres", logo: "/geogres-logo.svg" },
];

export type Collection = {
  name: string;
  size: string;
  finish: string;
  image: string;
  tone: string;
};

export const collections: Collection[] = [
  {
    name: "Novela Brown",
    size: "200 × 1200 mm",
    finish: "Wooden Matt",
    image: "/col-wooden.jpg",
    tone: "Warm walnut tones with a natural grain finish.",
  },
  {
    name: "Bricola Tan",
    size: "200 × 1200 mm",
    finish: "Wooden Satin",
    image: "/col-glazed.jpg",
    tone: "Sun-bleached oak character for open living spaces.",
  },
  {
    name: "Brazilian Grey",
    size: "600 × 600 mm",
    finish: "Outdoor Anti-Slip",
    image: "/col-outdoor.jpg",
    tone: "Rugged stone texture engineered for exteriors.",
  },
  {
    name: "Bodo White",
    size: "600 × 1200 mm",
    finish: "Porcelain Lapato",
    image: "/col-porcelain.jpg",
    tone: "Marble-inspired veining with a soft-touch surface.",
  },
];

export type Application = {
  name: string;
  description: string;
  image: string;
};

export const applications: Application[] = [
  {
    name: "Residential",
    description:
      "Living rooms, kitchens and bedrooms finished in large-format porcelain built for everyday life.",
    image: "/app-residential.jpg",
  },
  {
    name: "Commercial",
    description:
      "Offices, retail and lobbies specified for durability, scale and a consistently premium finish.",
    image: "/app-commercial.jpg",
  },
  {
    name: "Hospitality",
    description:
      "Hotels and resorts trust Everstone surfaces to perform under heavy footfall without losing character.",
    image: "/app-hospitality.jpg",
  },
];

export const stats = [
  { value: 800, suffix: "+", label: "Designs" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 300, suffix: "+", label: "Showroom Partners" },
  { value: 15, suffix: "+", label: "Years of Experience" },
];

export const faqs = [
  {
    q: "What is the difference between porcelain and ceramic tiles?",
    a: "Porcelain tiles are denser, stronger and more water-resistant, making them ideal for floors, bathrooms, outdoor areas and high-traffic spaces. Ceramic tiles are lighter and more economical, making them a popular choice for walls and low-traffic areas.",
  },
  {
    q: "Can floor tiles be installed on walls, or wall tiles on floors?",
    a: "Yes — floor tiles can generally be used on walls if suitable for wall installation. Wall tiles should not be used on floors unless specifically rated for floor use.",
  },
  {
    q: "How much extra tile should I purchase for wastage?",
    a: "We recommend purchasing 5–10% extra tiles to account for cutting, breakage and future replacements — more for complex patterns or diagonal installations.",
  },
  {
    q: "Do you provide delivery?",
    a: "Yes — we can arrange delivery for your purchased materials. Delivery charges and timing may depend on the order quantity and delivery location.",
  },
  {
    q: "Do you supply tiles for villas and commercial projects?",
    a: "Yes — we supply tiles and surface materials for villas, apartments, shops, offices, restaurants and other commercial projects.",
  },
  {
    q: "How can I choose the right tile for my project?",
    a: "Our sales team can help you select the suitable size, design, finish and application based on your space, budget and project requirements.",
  },
  {
    q: "Do you have large-format tiles and slabs?",
    a: "Yes — we offer a selection of large-format tiles and slabs suitable for floors, walls, bathrooms, kitchens and feature areas.",
  },
];
