import { ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const VirtualTourCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5">
            <Eye className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-semibold font-body">360° Experience</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
            Take a Virtual Tour of
            <span className="text-gradient-gold block">Our Beautiful Campus</span>
          </h2>

          <p className="text-primary-foreground/70 font-body max-w-lg mx-auto text-lg">
            An active community comprising creative and successful individuals from across the globe. 
            Experience the Arcadian environ that makes Sona special.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="bg-gold-gradient text-secondary-foreground font-semibold font-body hover:opacity-90 transition-opacity shadow-xl">
              <Eye className="w-5 h-5 mr-2" />
              Explore Our Campus
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-body">
              <ExternalLink className="w-5 h-5 mr-2" />
              Watch Video Tour
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTourCTA;
