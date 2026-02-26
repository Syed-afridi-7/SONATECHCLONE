import { Trophy, Newspaper, Calendar, Star, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "news", label: "Latest News", icon: Newspaper },
  { id: "events", label: "Upcoming Events", icon: Calendar },
];

const achievements = [
  {
    title: "CII Industry–Academia Partnership Diamond Award 2025",
    desc: "Won at the CII Global Summit, New Delhi — recognizing outstanding industry-academia collaboration.",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "₹25 Lakh at Google Gemini Hackathon",
    desc: "III Year students Bhavana and Sunil won the Hackathon at IIT Bombay.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Top Engineering College — Infosys Springboard Summit 2025",
    desc: "Recognized for excellence in academics and skill development.",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Chandrayaan-3 Contribution",
    desc: "Critical stepper motor for ISRO's mission was developed at Sona.",
    span: "md:col-span-2 md:row-span-1",
  },
];

const news = [
  {
    title: "Sona Stepper Motor Successfully Operates in Space",
    desc: "Successfully operating in space, now returned to Sona for display.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "Proud Collaboration with Dynex Moonshots, Europe",
    desc: "Advancing Quantum Fluency through international partnership for future tech.",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "ISTE - Chapter Best Student Award 2024",
    desc: "Monish P (IT) and Harshini E K (Civil) won at the Tamil Nadu Convention.",
    span: "md:col-span-2 md:row-span-1",
  },
];

const events = [
  {
    title: "ICELLL'26 — English Language & Linguistics",
    desc: "March 27–28, 2026 — Third International Conference at Sona Campus.",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "AI in Sustainable Computing (AISCCT'26)",
    desc: "June 4–5, 2026 — International Conference on AI and Sustainability.",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    title: "ICCISS'26 - Computational Intelligence",
    desc: "March 13–14, 2026 — Focusing on Security and Systems.",
    span: "md:col-span-2 md:row-span-1",
  },
];

const dataMap: Record<string, any[]> = {
  achievements,
  news,
  events,
};

const AchievementsSection = () => {
  const [activeTab, setActiveTab] = useState("achievements");

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-dark mb-4">
            Happening <span className="text-gold">@ Sona</span>
          </h2>
          <p className="text-muted-foreground font-body text-sm uppercase tracking-widest">
            Celebrating Excellence in Education & Research
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-body transition-all duration-300 ${activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-2xl scale-105"
                : "bg-muted text-muted-foreground hover:bg-gold/10 hover:text-primary"
                }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-gold" : ""}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[200px]">
          <AnimatePresence>
            {dataMap[activeTab].map((item, i) => (
              <motion.div
                key={`${activeTab}-${i}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`group relative overflow-hidden bg-white rounded-md p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-gold/30 transition-all duration-500 ${item.span}`}
              >
                {/* Decorative background circle */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gold/5 rounded-full group-hover:scale-150 transition-transform duration-700" />

                <div className="relative h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="mb-4 w-12 h-12 rounded bg-gold/10 flex items-center justify-center group-hover:bg-primary group-hover:text-gold transition-colors duration-300">
                      <Star className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="font-display font-bold text-navy-dark text-lg md:text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    READ MORE <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
