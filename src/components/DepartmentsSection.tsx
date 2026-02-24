import { Building2, Cpu, Radio, HardHat, Droplets, Shirt, Brain, Cog, Leaf, FlaskConical, Languages, Calculator } from "lucide-react";

const departments = [
  { icon: Cpu, name: "Computer Science & Engineering", code: "CSE" },
  { icon: Radio, name: "Electronics & Communication", code: "ECE" },
  { icon: Cog, name: "Mechanical Engineering", code: "MECH" },
  { icon: HardHat, name: "Civil Engineering", code: "CIVIL" },
  { icon: Droplets, name: "Electrical & Electronics", code: "EEE" },
  { icon: Brain, name: "Artificial Intelligence & Data Science", code: "AI&DS" },
  { icon: Building2, name: "Information Technology", code: "IT" },
  { icon: FlaskConical, name: "Biomedical Engineering", code: "BME" },
  { icon: Shirt, name: "Fashion Technology", code: "FT" },
  { icon: Leaf, name: "Mechatronics Engineering", code: "MCT" },
  { icon: Languages, name: "Master of Business Administration", code: "MBA" },
  { icon: Calculator, name: "Master of Computer Applications", code: "MCA" },
];

const DepartmentsSection = () => {
  return (
    <section className="py-20 bg-muted/30" id="departments">
      <div className="container">
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold font-body px-3 py-1 rounded-full mb-3">
            UG & PG Programmes
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Departments
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto">
            Offering a wide range of undergraduate and postgraduate programmes with industry-aligned curricula.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {departments.map((dept) => (
            <a
              href="#"
              key={dept.code}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-gold/50 hover:-translate-y-1 transition-all duration-300 group text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors">
                <dept.icon className="w-6 h-6 text-primary group-hover:text-gold transition-colors" />
              </div>
              <p className="text-xs font-body text-muted-foreground leading-snug mb-1">{dept.name}</p>
              <span className="text-[10px] font-body font-bold text-primary/60">{dept.code}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
