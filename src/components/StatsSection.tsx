import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, Microscope, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 600, suffix: "+", label: "Faculty Members" },
  { icon: BookOpen, value: 7000, suffix: "+", label: "Students" },
  { icon: Microscope, value: 36, suffix: "+", label: "Research Centres" },
  { icon: Globe, value: 20, suffix: "+", label: "Alumnus Countries" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-display font-bold text-gold">
      {count.toLocaleString()}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-navy-gradient py-20">
      <div className="container">
        <h2 className="text-center text-3xl font-display font-bold text-primary-foreground mb-4">
          Salient Features
        </h2>
        <p className="text-center text-primary-foreground/60 font-body mb-14 max-w-lg mx-auto">
          Sona's academic environment fosters excellence through world-class faculty, research, and global exposure.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-3">
              <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-gold" />
              </div>
              <CountUp target={stat.value} suffix={stat.suffix} />
              <p className="text-primary-foreground/70 font-body text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
