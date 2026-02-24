import { User } from "lucide-react";

const visitors = [
  { name: "Dr. A.P.J. Abdul Kalam", role: "Former President of India", note: "Inaugurated 36 R&D Centres" },
  { name: "Dr. K. Sivan", role: "Former ISRO Chairman", note: "Visited Sona's space technology facilities" },
  { name: "Dr. R. Velraj", role: "Vice Chancellor, Anna University", note: "Praised Sona's academic standards" },
  { name: "Mr. Craig Brown", role: "FASKEN, Canada", note: "Discussed global opportunities with students" },
];

const EminentVisitorsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-3">
          Eminent Visitors
        </h2>
        <p className="text-center text-muted-foreground font-body text-sm mb-10 max-w-lg mx-auto">
          Dignitaries in education and research who have experienced the excellence at Sona.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {visitors.map((v) => (
            <div key={v.name} className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary/60" />
              </div>
              <h3 className="font-display font-semibold text-foreground text-sm">{v.name}</h3>
              <p className="text-xs text-gold font-body font-medium mt-1">{v.role}</p>
              <p className="text-xs text-muted-foreground font-body mt-2">{v.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EminentVisitorsSection;
