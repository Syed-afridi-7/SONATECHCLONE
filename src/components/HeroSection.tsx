import heroCampus from "@/assets/hero-campus.jpg";
import { GraduationCap, Award, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroCampus}
          alt="Sona College of Technology campus aerial view"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-28 pb-16">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 animate-fade-in-up">
            <Award className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold font-body">
              CII Industry–Academia Partnership Diamond Award 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-primary-foreground leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Sona College{" "}
            <span className="text-gradient-gold">of Technology</span>
          </h1>

          <p className="text-lg text-primary-foreground/80 font-body max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            An Autonomous Institution affiliated to Anna University, Chennai. 
            NAAC Accredited with 'A++' Grade — Shaping tomorrow's engineers with 
            67+ years of academic excellence, innovation, and global vision.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" className="bg-gold-gradient text-secondary-foreground font-semibold font-body hover:opacity-90 transition-opacity shadow-lg">
              <GraduationCap className="w-5 h-5 mr-2" />
              Apply for Admission
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body"
            >
              <FlaskConical className="w-5 h-5 mr-2" />
              Explore Research
            </Button>
          </div>

          {/* Quick stats inline */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-primary-foreground/10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "200+", label: "Recruiters" },
              { value: "37 LPA", label: "Highest CTC" },
              { value: "A++", label: "NAAC Grade" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-display font-bold text-gold">{stat.value}</p>
                <p className="text-xs text-primary-foreground/60 font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
