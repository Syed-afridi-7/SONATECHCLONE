import { BookOpen, Users, Lightbulb, Palette } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Student Life",
    desc: "Students are made to realise their potential for self-development — physical, emotional, intellectual, and moral well-being.",
  },
  {
    icon: Users,
    title: "Student Speakers Forum",
    desc: "The SSSF aims to develop students into confident speakers with Accuracy, Brevity, and Clarity.",
  },
  {
    icon: Palette,
    title: "Student Clubs",
    desc: "Clubs become a surrogate family, helping students grow and explore latent talents beyond academics.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Teaching",
    desc: "Pioneering Lecture Capturing System ensures students stay connected with curriculum anytime, anywhere.",
  },
];

const CampusLifeSection = () => {
  return (
    <section className="py-20 bg-background" id="campus">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">
          Campus Life
        </h2>
        <p className="text-center text-muted-foreground font-body mb-14 max-w-md mx-auto italic">
          The Arcadian environ @ Sona makes the College life the most memorable experience!
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeSection;
