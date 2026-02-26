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
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-gold/30 hover:-translate-y-2 hover:bg-navy-gradient transition-all duration-500 group text-center relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-gold/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-navy-light/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/10 transition-colors duration-300">
                  <dept.icon className="w-7 h-7 text-navy-dark group-hover:text-gold transition-colors duration-300" />
                </div>
                <p className="text-sm font-display font-bold text-navy-dark group-hover:text-white leading-snug mb-1 transition-colors duration-300">{dept.name}</p>
                <span className="text-[11px] font-body font-bold text-navy-light/70 group-hover:text-gold/80 transition-colors duration-300">{dept.code}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
