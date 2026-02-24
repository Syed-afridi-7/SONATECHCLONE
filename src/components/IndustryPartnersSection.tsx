const partners = [
  "ISRO", "Infosys", "Cisco Systems", "Red Hat", "VMware",
  "Titan", "JSW Steel", "Bharat Electronics", "Nagoya Institute of Technology",
  "Swinburne University", "University of Nottingham", "Smart Bridge",
  "NASSCOM", "TNPCB", "Tex Valley", "Cochin University", "NPL India",
  "Epic Games", "Live Wire", "NCSSS",
];

const IndustryPartnersSection = () => {
  return (
    <section className="py-16 bg-muted/50 overflow-hidden">
      <div className="container mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground text-center mb-2">
          Industry–Academia Collaboration
        </h2>
        <p className="text-center text-muted-foreground font-body text-sm">
          Sona's industry-academia interaction enthuses the spirit of innovation in budding engineers
        </p>
      </div>

      {/* Marquee row 1 */}
      <div className="relative">
        <div className="flex animate-marquee-slow whitespace-nowrap">
          {[...partners, ...partners].map((name, i) => (
            <div
              key={i}
              className="mx-3 flex-shrink-0 bg-card border border-border rounded-lg px-6 py-3 flex items-center justify-center min-w-[160px] hover:border-gold hover:shadow-md transition-all"
            >
              <span className="text-sm font-body font-semibold text-muted-foreground">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryPartnersSection;
