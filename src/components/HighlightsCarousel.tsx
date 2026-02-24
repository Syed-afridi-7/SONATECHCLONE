import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const highlights = [
  { title: "NBA Accredited Programmes", desc: "Multiple programmes accredited by the National Board of Accreditation." },
  { title: "36+ Research Centres", desc: "Centres of excellence across every department fostering innovation." },
  { title: "SIRO Institution", desc: "Recognized as Scientific and Industrial Research Organisation by DSIR." },
  { title: "67 Years of Service", desc: "Decades of commitment to engineering education excellence." },
  { title: "Apple Lab", desc: "State-of-the-art Apple iOS development laboratory on campus." },
  { title: "Green Building", desc: "Five-star GRIHA rated sustainable green building on campus." },
  { title: "Business Incubator", desc: "MSME and IITM Incubation Cell for student startups." },
  { title: "A++ Grade by NAAC", desc: "Highest accreditation grade from the National Assessment Council." },
];

const HighlightsCarousel = () => {
  const [index, setIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, highlights.length - itemsPerView);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">Highlights</h2>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * (100 / itemsPerView + 1.5)}%)` }}
          >
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex-shrink-0 w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-gold/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-primary group-hover:bg-gold transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-sm mb-2">{h.title}</h3>
                <p className="text-muted-foreground text-xs font-body leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsCarousel;
