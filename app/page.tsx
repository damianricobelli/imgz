import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Playground } from "@/components/landing/playground";
import { UsageGuide } from "@/components/landing/usage-guide";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Playground />
      <UsageGuide />
      <CTA />
      <Footer />
    </main>
  );
}
