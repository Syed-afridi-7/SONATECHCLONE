const announcements = [
  "🔔 Online Fee Payment for 2025-26: B.E(IV, III & II year), MBA, MCA and ME/MTECH",
  "🏏 Sona Cricket Academy: Building the Future of Cricket",
  "📚 Open Education Resources (OER) now available",
  "🎓 Admissions 2025-26 Open — Apply Now!",
  "🏆 CII Industry–Academia Partnership Diamond Award 2025",
  "🚀 Sona Stepper Motor Successfully Operates in Space",
  "🌏 360° Virtual Tour of Our Campus Available",
];

const AnnouncementTicker = () => {
  return (
    <div className="bg-secondary overflow-hidden py-2.5 relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...announcements, ...announcements].map((text, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-body font-medium text-secondary-foreground inline-flex items-center"
          >
            {text}
            <span className="mx-8 text-gold">★</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementTicker;
