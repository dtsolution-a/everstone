import type { Metadata } from "next";
import BrandPage from "@/components/brand/BrandPage";
import { brands } from "@/data/brands";

export const metadata: Metadata = {
  title: "Exclusive | Everstone Showroom Brands",
  description:
    "Exclusive — premium marble-inspired porcelain surfaces, one of Everstone's prime showroom brands for luxury residential and hospitality interiors.",
};

export default function ExclusivePage() {
  return <BrandPage brand={brands.exclusive} />;
}
