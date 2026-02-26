import { GraduationCap, Award, FlaskConical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import heroCampus from "@/assets/hero-campus.jpg";

const slides = [
  {
    image: heroCampus,
    badge: "🏆 Google Gemini Challenge",
    title: "25 Lakhs Victory in Innovation",
    desc: "Sona Students emerge as winners in the prestigious Google Gemini Innovation Challenge, showcasing world-class technical prowess.",
  },
  {
    image: heroCampus,
    badge: "🌟 NPTEL Top Ranking",
    title: "AAA Rated National Resource Centre",
    desc: "Consistent recognition as a top-performing institution in NPTEL-SWAYAM national exams (July-Dec 2025).",
  },
  {
    image: heroCampus,
    badge: "🎓 NAAC Accredited 'A++'",
    title: "Shaping Tomorrow's Engineers",
    desc: "With 67+ years of academic excellence and global vision, we provide the ultimate platform for learning and innovation.",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="relative h-[90vh] overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-[0_0_100%] h-full flex items-center">
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-navy-dark/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/90 via-navy-dark/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="container relative z-10 pt-20">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-1.5 animate-fade-in-up">
                  <span className="text-gold text-sm font-semibold font-body">{slide.badge}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-primary-foreground leading-tight animate-fade-in-up">
                  {slide.title}
                </h1>

                <p className="text-lg text-primary-foreground/80 font-body max-w-xl animate-fade-in-up">
                  {slide.desc}
                </p>

                <div className="flex flex-wrap gap-4 animate-fade-in-up">
                  <Button asChild size="lg" className="bg-gold-gradient text-secondary-foreground font-semibold font-body hover:opacity-90 transition-all shadow-xl scale-100 hover:scale-105">
                    <Link to="/admissions">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Apply for Admission
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-gold hover:text-primary font-body transition-all"
                  >
                    <a href="#research">
                      <FlaskConical className="w-5 h-5 mr-2" />
                      Explore Research
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-primary transition-all md:flex hidden"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold hover:text-primary transition-all md:flex hidden"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  );
};

export default HeroSection;
