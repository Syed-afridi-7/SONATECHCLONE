import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const SonaStorySection = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Book visual */}
          <div className="flex-shrink-0 w-64 md:w-72">
            <div className="bg-primary rounded-xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gold/20 rounded-bl-full" />
              <div className="relative text-center space-y-3">
                <BookOpen className="w-12 h-12 text-gold mx-auto" />
                <h3 className="font-display text-primary-foreground font-bold text-xl leading-tight">
                  The Sona Story
                </h3>
                <div className="w-12 h-0.5 bg-gold mx-auto" />
                <p className="text-primary-foreground/70 text-xs font-body">
                  The Textile to Tech Journey of Chettiar Industrialist C. Valliappa
                </p>
                <p className="text-primary-foreground/50 text-[10px] font-body italic">
                  by Chitra Narayanan
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h2 className="text-3xl font-display font-bold text-foreground">
              The Sona Story
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              "The Sona Story" by Chitra Narayanan chronicles the remarkable transformation of 
              The Sona Group under the visionary leadership of C. Valliappa. This compelling 
              narrative takes readers from the company's textile foundations to its evolution 
              into a technological powerhouse.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed">
              C. Valliappa's journey embodies perseverance, unwavering dedication, and commitment 
              to excellence — an inspiration for entrepreneurs and business leaders, demonstrating 
              how visionary leadership can navigate challenges and transform industries.
            </p>
            <div className="flex gap-4 pt-2">
              <Button className="bg-primary text-primary-foreground font-body font-semibold">
                Buy on Amazon
              </Button>
              <Button variant="outline" className="font-body">
                Know More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SonaStorySection;
