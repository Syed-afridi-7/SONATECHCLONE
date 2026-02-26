import React from 'react';
import AnimatedList from '@/components/react-bits/AnimatedList';
import BubbleMenu from '@/components/react-bits/BubbleMenu';
import DomeGallery from '@/components/react-bits/DomeGallery';
import GooeyNav from '@/components/react-bits/GooeyNav';
import GradientText from '@/components/react-bits/GradientText';
import LogoLoop from '@/components/react-bits/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiFramer } from 'react-icons/si';

const playgroundItems = [
    'Interactive Animation',
    'Responsive Design',
    'TypeScript Support',
    'Tailwind CSS',
    'High Performance',
    'Customizable Props',
    'Smooth Transitions',
    'Modern UI/UX',
    'SaaS Integration',
    'Production Ready'
];

const techLogos = [
    { node: <SiReact size={40} />, title: "React" },
    { node: <SiNextdotjs size={40} />, title: "Next.js" },
    { node: <SiTypescript size={40} />, title: "TypeScript" },
    { node: <SiTailwindcss size={40} />, title: "Tailwind" },
    { node: <SiVite size={40} />, title: "Vite" },
    { node: <SiFramer size={40} />, title: "Framer" },
];

const navItems = [
    { label: "Home", href: "#" },
    { label: "Components", href: "#" },
    { label: "Showcase", href: "#" },
];

const Playground = () => {
    return (
        <div className="min-h-screen bg-background text-foreground p-8 space-y-24">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center space-y-4">
                <GradientText className="text-5xl font-bold" showBorder>
                    ReactBits Showcase
                </GradientText>
                <p className="text-muted-foreground text-lg">
                    A collection of premium React components integrated and white-labeled.
                </p>
            </div>

            {/* Bubble Menu Section */}
            <section className="space-y-8 relative py-20 bg-muted/20 rounded-3xl border border-border/50">
                <h2 className="text-2xl font-semibold text-center">Bubble Menu</h2>
                <div className="h-[400px] flex items-center justify-center">
                    <BubbleMenu
                        logo={<div className="font-bold text-xl">RB</div>}
                        useFixedPosition={false}
                    />
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                {/* Animated List Section */}
                <section className="space-y-6 p-8 bg-card rounded-3xl border border-border shadow-sm">
                    <h2 className="text-xl font-semibold">Animated List</h2>
                    <AnimatedList
                        items={playgroundItems}
                        onItemSelect={(item) => console.log('Selected:', item)}
                    />
                </section>

                {/* Gooey Navigation Section */}
                <section className="space-y-6 p-8 bg-card rounded-3xl border border-border shadow-sm flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold w-full text-left">Gooey Navigation</h2>
                    <div className="w-full flex-grow flex items-center justify-center">
                        <GooeyNav items={navItems} />
                    </div>
                </section>
            </div>

            {/* Dome Gallery Section */}
            <section className="space-y-8 py-12">
                <h2 className="text-2xl font-semibold text-center">Interactive Dome Gallery</h2>
                <div className="h-[600px] w-full bg-muted/10 rounded-3xl border border-border/50 overflow-hidden">
                    <DomeGallery grayscale={false} fit={0.7} />
                </div>
            </section>

            {/* Logo Loop Section */}
            <section className="space-y-8 py-12 bg-muted/20 rounded-3xl border border-border/50">
                <h2 className="text-xl font-semibold text-center">Infinite Logo Loop</h2>
                <div className="max-w-5xl mx-auto">
                    <LogoLoop
                        logos={techLogos}
                        speed={80}
                        logoHeight={40}
                        gap={80}
                        fadeOut
                        scaleOnHover
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center text-muted-foreground pt-12 border-t border-border/50">
                <p>© 2026 ReactBits Integration Showcase</p>
            </footer>
        </div>
    );
};

export default Playground;
