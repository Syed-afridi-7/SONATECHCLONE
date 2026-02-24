import { FlaskConical, BookOpen, Award, Cpu, Zap, Microscope } from "lucide-react";

const researchAreas = [
  {
    icon: Cpu,
    title: "Centre for IoT & AI",
    desc: "Advanced research in Internet of Things, Machine Learning, and Artificial Intelligence applications.",
  },
  {
    icon: Zap,
    title: "Renewable Energy Research",
    desc: "Pioneering research in solar energy, wind power, and sustainable energy solutions.",
  },
  {
    icon: Microscope,
    title: "ISRO Collaboration Lab",
    desc: "Critical motor for Chandrayaan-3 was developed here. Active collaboration with ISRO on space tech.",
  },
  {
    icon: FlaskConical,
    title: "Nanotechnology Centre",
    desc: "State-of-the-art Modular Clean Room Class 1000 for advanced nanoscale research.",
  },
  {
    icon: BookOpen,
    title: "NPTEL Local Chapter",
    desc: "Secured AAA ranking — first place twice under Faculty Performance among 4832+ NPTEL chapters.",
  },
  {
    icon: Award,
    title: "SIRO Recognition",
    desc: "Recognized as Scientific and Industrial Research Organisation (SIRO) by DSIR, Govt. of India.",
  },
];

const ResearchSection = () => {
  return (
    <section className="py-20 bg-background" id="research">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold font-body px-3 py-1 rounded-full mb-3">
            36+ Centres of Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Research & Innovation
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Inaugurated by Dr. A.P.J. Abdul Kalam, our R&D centres stand testimony to the research culture at Sona. 
            Every department is encouraged to have at least one centre of excellence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {researchAreas.map((area) => (
            <div
              key={area.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <area.icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{area.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{area.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FIST Funded badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-full px-6 py-3">
            <FlaskConical className="w-5 h-5 text-primary" />
            <span className="text-sm font-body font-medium text-foreground">
              FIST Funded by Department of Science & Technology (DST), Govt. of India
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
