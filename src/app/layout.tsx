import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PeelReveal from "@/components/hero/PeelReveal";
import FloatingActions from "@/components/FloatingActions";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Everstone | Sophisticated Porcelain Surfaces",
  description:
    "Everstone Building Materials LLC — premier porcelain tile brand crafting large-format surfaces for residential, commercial and hospitality projects across the UAE, backed by 15+ years of industry experience.",
  metadataBase: new URL("https://everstonetiles.ae"),
  openGraph: {
    title: "Everstone | Sophisticated Porcelain Surfaces",
    description:
      "Large-format porcelain, engineered in India, delivered across the UAE.",
    images: ["/hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream antialiased">
        <div className="grain" />
        <PeelReveal />
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingActions />
      </body>
    </html>
  );
}
