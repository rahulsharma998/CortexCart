import Navbar from "@/components/layout/Navbar";
import LandingHero from "@/components/landing/LandingHero";
import LandingAbout from "@/components/landing/LandingAbout";
import LandingFeatures from "@/components/landing/LandingFeatures";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-orange-500/30">
      <Navbar />
      <main>
        <LandingHero />
        <LandingAbout />
        <LandingFeatures />
      </main>
      <LandingFooter />
    </div>
  );
};

export default Index;
