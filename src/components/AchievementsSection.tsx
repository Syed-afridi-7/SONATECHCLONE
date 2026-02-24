import { Trophy, Newspaper, Calendar, Star } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "news", label: "Latest News", icon: Newspaper },
  { id: "events", label: "Upcoming Events", icon: Calendar },
];

const achievements = [
  {
    title: "CII Industry–Academia Partnership Diamond Award 2025",
    desc: "Won at the CII Global Summit, New Delhi — recognizing outstanding industry-academia collaboration.",
  },
  {
    title: "₹25 Lakh at Google Gemini Hackathon",
    desc: "III Year students Bhavana and Sunil won the Hackathon conducted by Google Gemini at IIT Bombay.",
  },
  {
    title: "Top Engineering College — Infosys Springboard Summit 2025",
    desc: "Recognized for excellence in academics, industry engagement, and skill development.",
  },
  {
    title: "Chandrayaan-3 Contribution",
    desc: "Critical stepper motor for ISRO's Chandrayaan-3 moon mission was developed at Sona.",
  },
];

const news = [
  {
    title: "Sona Stepper Motor Successfully Operates in Space",
    desc: "The motor developed at Sona is now displayed at the college after its successful space operation.",
  },
  {
    title: "Proud Collaboration with Dynex Moonshots, Europe",
    desc: "Advancing Quantum Fluency through international partnership.",
  },
  {
    title: "ISTE - Chapter Best Student Award 2024",
    desc: "Monish P (IT) and Harshini E K (Civil) won at the ISTE Tamil Nadu Convention.",
  },
];

const events = [
  {
    title: "ICELLL'26 — English Language, Literature & Linguistics",
    desc: "March 27–28, 2026 — Third International Conference",
  },
  {
    title: "AI in Sustainable Computing & Communication Technologies",
    desc: "June 4–5, 2026 — International Conference (AISCCT'26)",
  },
  {
    title: "Computational Intelligence, Security and Systems",
    desc: "March 13–14, 2026 — ICCISS'26",
  },
];

const dataMap: Record<string, { title: string; desc: string }[]> = {
  achievements,
  news,
  events,
};

const AchievementsSection = () => {
  const [activeTab, setActiveTab] = useState("achievements");

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-foreground text-center mb-4">
          Happening @ Sona
        </h2>
        <p className="text-center text-muted-foreground font-body mb-10 max-w-lg mx-auto">
          Academic, Research and various intellectual activities ensure that students celebrate learning.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-body transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {(dataMap[activeTab] || []).map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 w-8 h-8 rounded-lg bg-gold/10 flex-shrink-0 flex items-center justify-center">
                  <Star className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
