import { Briefcase, TrendingUp, IndianRupee, GraduationCap } from "lucide-react";

const placementStats = [
  { icon: Briefcase, value: "200+", label: "Recruiters" },
  { icon: TrendingUp, value: "37 LPA", label: "Highest CTC (Intl.)" },
  { icon: IndianRupee, value: "19.54 LPA", label: "Highest CTC (Domestic)" },
  { icon: GraduationCap, value: "₹98k/mo", label: "Highest Stipend" },
];

const recruiters = [
  "ISRO", "Infosys", "Cisco", "Red Hat", "VMware",
  "Titan", "JSW Steel", "Bharat Electronics", "NASSCOM",
];

const PlacementsSection = () => {
  return (
    <section className="py-20 bg-cream" id="placements">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">
          Placement Excellence
        </h2>
        <p className="text-center text-muted-foreground font-body mb-14 max-w-lg mx-auto">
          Sona's placement record speaks for itself — with top recruiters offering world-class opportunities.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
          {placementStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-6 text-center shadow-sm border border-border">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recruiters */}
        <div className="text-center">
          <h3 className="text-lg font-display font-semibold text-foreground mb-6">
            Industry–Academia Collaboration
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {recruiters.map((name) => (
              <span
                key={name}
                className="px-5 py-2 bg-card border border-border rounded-full text-sm font-body text-muted-foreground font-medium hover:border-gold hover:text-foreground transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementsSection;
