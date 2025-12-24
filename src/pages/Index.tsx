import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/common/ParticleBackground";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { RoadmapSection } from "@/components/home/RoadmapSection";
import { TokenomicsSection } from "@/components/home/TokenomicsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RoadmapSection />
        <TokenomicsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
