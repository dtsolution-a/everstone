import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Geogres | Everstone Showroom Brands",
  description:
    "Geogres — large-format porcelain and ceramic slabs, one of Everstone's prime showroom brands engineered for scale and precision.",
};

export default function GeogresPage() {
  return <BrandPage brand={brands.geogres} />;
}
