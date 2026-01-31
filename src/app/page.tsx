import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Menu } from "@/components/home/Menu";
import { CakeBuilder } from "@/components/home/CakeBuilder";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Gallery } from "@/components/home/Gallery";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <WhyChooseUs />
      <CakeBuilder />
      <Gallery />
      <CTA />
    </>
  );
}
