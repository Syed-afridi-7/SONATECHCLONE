import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GraduationCap, Users, Briefcase, Award } from "lucide-react";

const Placement = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24">
                <section className="bg-navy-gradient py-20 text-white">
                    <div className="container">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Placement & Training</h1>
                        <p className="text-xl text-white/80 max-w-3xl font-body">
                            Empowering students with industry-ready skills and connecting them with global career opportunities.
                        </p>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container grid md:grid-cols-3 gap-8">
                        <div className="p-8 bg-card border border-border rounded-2xl space-y-4">
                            <GraduationCap className="w-10 h-10 text-gold" />
                            <h3 className="text-xl font-display font-bold">200+</h3>
                            <p className="text-muted-foreground font-body">Global Recruiters visiting annually</p>
                        </div>
                        <div className="p-8 bg-card border border-border rounded-2xl space-y-4">
                            <Briefcase className="w-10 h-10 text-gold" />
                            <h3 className="text-xl font-display font-bold">37 LPA</h3>
                            <p className="text-muted-foreground font-body">Highest CTC Package offered</p>
                        </div>
                        <div className="p-8 bg-card border border-border rounded-2xl space-y-4">
                            <Users className="w-10 h-10 text-gold" />
                            <h3 className="text-xl font-display font-bold">100%</h3>
                            <p className="text-muted-foreground font-body">Placement assistance provided</p>
                        </div>
                    </div>
                </section>

                <section className="bg-muted py-20">
                    <div className="container text-center max-w-3xl">
                        <h2 className="text-3xl font-display font-bold mb-6">Placement Overview</h2>
                        <p className="text-muted-foreground font-body leading-relaxed mb-8">
                            Sona College of Technology has an impeccable record of placements. Our graduates are highly
                            sought after by top-tier companies across various sectors including IT, Core Engineering,
                            Manufacturing, and Services.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold px-4 py-2 rounded-full font-semibold text-sm">
                                <Award className="w-4 h-4" />
                                Best Placement Award 2024
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Placement;
