import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CampusLifeSection from "@/components/CampusLifeSection";
import PlacementsSection from "@/components/PlacementsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AchievementsSection />
        <PlacementsSection />
        <CampusLifeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
