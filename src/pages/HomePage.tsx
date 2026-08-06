import Hero from "@/components/home/Hero";
import TeaserCards from "@/components/home/TeaserCards";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <ScrollReveal>
        <TeaserCards />
      </ScrollReveal>
    </div>
  );
}
