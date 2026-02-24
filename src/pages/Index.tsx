import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import StatsSection from "@/components/StatsSection";
import DepartmentsSection from "@/components/DepartmentsSection";
import AchievementsSection from "@/components/AchievementsSection";
import HighlightsCarousel from "@/components/HighlightsCarousel";
import PlacementsSection from "@/components/PlacementsSection";
import ResearchSection from "@/components/ResearchSection";
import IndustryPartnersSection from "@/components/IndustryPartnersSection";
import CampusLifeSection from "@/components/CampusLifeSection";
import VirtualTourCTA from "@/components/VirtualTourCTA";
import SonaStorySection from "@/components/SonaStorySection";
import EminentVisitorsSection from "@/components/EminentVisitorsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AnnouncementTicker />
        <StatsSection />
        <DepartmentsSection />
        <AchievementsSection />
        <HighlightsCarousel />
        <PlacementsSection />
        <ResearchSection />
        <IndustryPartnersSection />
        <CampusLifeSection />
        <VirtualTourCTA />
        <SonaStorySection />
        <EminentVisitorsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
