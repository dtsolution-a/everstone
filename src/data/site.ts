export const contact = {
  phone: "+971 52 793 3046",
  phoneHref: "tel:+971527933046",
  email: "sales@everstonetiles.ae",
  address: "Capital Mall, Sheikh Mohamed Bin Zayed City, Abu Dhabi, UAE",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
};

export const nav = [
  { label: "Collections", href: "#collections" },
  { label: "Applications", href: "#applications" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
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
  { value: 10, suffix: "+", label: "In-house Designers" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Showroom Partners" },
  { value: 13, suffix: "", label: "Years Since 2013" },
];

export const faqs = [
  {
    q: "What sizes does Everstone manufacture?",
    a: "Our porcelain formats range from 30×60 cm up to large-format 120×320 cm slabs, plus 60×60 cm and 60×120 cm outdoor tiles in 15–20 mm thickness.",
  },
  {
    q: "Where are Everstone tiles made?",
    a: "Everstone Building Materials LLC has been operating since 2013, with manufacturing facilities in India and dedicated warehousing across the UAE.",
  },
  {
    q: "What finishes are available?",
    a: "Glossy, matt, satin, lapato, leather and wooden-look finishes, including anti-slip options engineered specifically for outdoor applications.",
  },
  {
    q: "Do you supply dealers and contractors?",
    a: "Yes — we work directly with dealers, contractors and developers across the UAE, supported by full catalogue and specification documentation.",
  },
];
