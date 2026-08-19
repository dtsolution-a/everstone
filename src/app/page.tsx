import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Collections from "@/components/Collections";
import Applications from "@/components/Applications";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";
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
        <Process />
        <CTA />
        <Stats />
        <Testimonials />
        <WhyUs />
        <InstagramFeed />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
