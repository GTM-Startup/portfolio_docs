import { Hero } from "@/components/home/Hero";
import { TransformationSection } from "@/components/home/TransformationSection";
import { Capabilities } from "@/components/home/Capabilities";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Process } from "@/components/home/Process";
import { Benefits } from "@/components/home/Benefits";
import { Portfolio } from "@/components/home/Portfolio";
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TransformationSection />
      <Capabilities />
      <ProductShowcase />
      <Process />
      <Benefits />
      <Portfolio />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
