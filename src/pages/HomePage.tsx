import Hero from "@/components/home/Hero";
import TeaserCards from "@/components/home/TeaserCards";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import TypesOfMlPage from "./TypesOfMlPage";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ScrollReveal>
        <TeaserCards />
      </ScrollReveal>
      <TypesOfMlPage />
    </div>
  );
}
