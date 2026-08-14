import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Collections from "@/components/Collections";
import Applications from "@/components/Applications";
import Stats from "@/components/Stats";
import InstagramFeed from "@/components/InstagramFeed";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStory />
        <Collections />
        <Applications />
        <Stats />
        <InstagramFeed />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
