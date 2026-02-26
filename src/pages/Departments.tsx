import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Settings, Zap, Monitor, Cpu } from "lucide-react";

const Departments = () => {
    const depts = [
        { name: "Computer Science & Engg", icon: Monitor },
        { name: "Information Technology", icon: BookOpen },
        { name: "Electronics & Communication", icon: Cpu },
        { name: "Electrical & Electronics", icon: Zap },
        { name: "Mechanical Engineering", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24">
                <section className="bg-navy-gradient py-20 text-white">
                    <div className="container">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Academic Departments</h1>
                        <p className="text-xl text-white/80 max-w-3xl font-body">
                            Excellence in education across diverse branches of Engineering and Technology.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {depts.map((dept) => (
                                <div key={dept.name} className="group relative p-8 bg-white border border-gray-100 rounded-3xl hover:border-gold/30 hover:shadow-2xl hover:-translate-y-2 hover:bg-navy-gradient transition-all duration-500 overflow-hidden">
                                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-gold/5 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-navy-light/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-300">
                                            <dept.icon className="w-7 h-7 text-navy-dark group-hover:text-gold transition-colors duration-300" />
                                        </div>
                                        <h3 className="text-xl font-display font-bold mb-4 text-navy-dark group-hover:text-white transition-colors duration-300">{dept.name}</h3>
                                        <p className="text-muted-foreground font-body text-sm mb-6 group-hover:text-white/80 transition-colors duration-300">
                                            Providing state-of-the-art facilities and industry-aligned curriculum to shape the engineers of tomorrow.
                                        </p>
                                        <a href="#" className="text-gold font-body font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                                            Learn More →
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Departments;
