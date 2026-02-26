import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface GooeyNavItem {
    label: string;
    href: string;
}

interface GooeyNavProps {
    items: GooeyNavItem[];
    animationTime?: number;
    particleCount?: number;
    particleDistances?: [number, number];
    particleR?: number;
    timeVariance?: number;
    colors?: number[];
    initialActiveIndex?: number;
    className?: string;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
    items,
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    initialActiveIndex = 0,
    className
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLUListElement>(null);
    const filterRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

    const noise = (n = 1) => n / 2 - Math.random() * n;
    const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
        const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
        return [distance * Math.cos(angle), distance * Math.sin(angle)];
    };

    const makeParticles = (element: HTMLElement) => {
        const d = particleDistances;
        const r = particleR;
        const bubbleTime = animationTime * 2 + timeVariance;
        element.style.setProperty('--time', `${bubbleTime}ms`);
        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2);
            const [startX, startY] = getXY(d[0], particleCount - i, particleCount);
            const [endX, endY] = getXY(d[1] + noise(7), particleCount - i, particleCount);
            const scale = 1 + noise(0.2);
            const color = colors[Math.floor(Math.random() * colors.length)];
            let rotate = noise(r / 10);
            const rotationVal = rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10;

            setTimeout(() => {
                const particle = document.createElement('span');
                const point = document.createElement('span');
                particle.classList.add('particle');
                particle.style.setProperty('--start-x', `${startX}px`);
                particle.style.setProperty('--start-y', `${startY}px`);
                particle.style.setProperty('--end-x', `${endX}px`);
                particle.style.setProperty('--end-y', `${endY}px`);
                particle.style.setProperty('--time', `${t}ms`);
                particle.style.setProperty('--scale', `${scale}`);
                particle.style.setProperty('--color', `var(--color-${color}, white)`);
                particle.style.setProperty('--rotate', `${rotationVal}deg`);
                point.classList.add('point');
                particle.appendChild(point);
                element.appendChild(particle);

                requestAnimationFrame(() => element.classList.add('active'));
                setTimeout(() => {
                    try { if (element.contains(particle)) element.removeChild(particle); } catch { }
                }, t);
            }, 30);
        }
    };

    const updateEffectPosition = (element: HTMLElement) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const pos = element.getBoundingClientRect();
        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`
        };
        Object.assign(filterRef.current.style, styles);
        Object.assign(textRef.current.style, styles);
        textRef.current.innerText = element.innerText;
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        const liEl = (e.currentTarget as HTMLElement).parentElement as HTMLElement;
        if (activeIndex === index) return;
        setActiveIndex(index);
        updateEffectPosition(liEl);
        if (filterRef.current) {
            filterRef.current.querySelectorAll('.particle').forEach(p => filterRef.current?.removeChild(p));
            filterRef.current.classList.remove('active');
            void filterRef.current.offsetWidth;
            makeParticles(filterRef.current);
        }
        if (textRef.current) {
            textRef.current.classList.remove('active');
            void textRef.current.offsetWidth;
            textRef.current.classList.add('active');
        }
    };

    useEffect(() => {
        if (!navRef.current || !containerRef.current) return;
        const activeLi = navRef.current.querySelectorAll('li')[activeIndex];
        if (activeLi) {
            updateEffectPosition(activeLi);
            textRef.current?.classList.add('active');
        }
        const resizeObserver = new ResizeObserver(() => {
            const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex];
            if (currentActiveLi) updateEffectPosition(currentActiveLi);
        });
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [activeIndex]);

    return (
        <div className={cn("relative", className)} ref={containerRef}>
            <style>{`
          :root {
            --linear-ease: cubic-bezier(0.4, 0, 0.2, 1);
            --color-1: hsl(var(--primary));
            --color-2: #FF9FFC;
            --color-3: #B19EEF;
            --color-4: #5227FF;
          }
          .effect {
            position: absolute;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 10;
          }
          .effect.text {
            color: hsl(var(--foreground));
            transition: color 0.3s ease;
            font-weight: 600;
          }
          .effect.text.active {
            color: hsl(var(--primary-foreground));
          }
          .effect.filter {
            filter: blur(8px) contrast(20);
            mix-blend-mode: lighten;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: hsl(var(--primary));
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.filter.active::after {
            animation: pill 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          }
          @keyframes pill {
            to { transform: scale(1); opacity: 1; }
          }
          .particle, .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 9999px;
          }
          .particle {
            position: absolute;
            top: calc(50% - 10px);
            left: calc(50% - 10px);
            animation: particle var(--time) ease-out forwards;
          }
          .point {
            background: var(--color);
            opacity: 1;
            animation: point var(--time) ease-out forwards;
          }
          @keyframes particle {
            0% { transform: translate(var(--start-x), var(--start-y)); opacity: 1; }
            100% { transform: translate(var(--end-x), var(--end-y)); opacity: 0; }
          }
          @keyframes point {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(var(--scale)); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
          }
          li.active { color: transparent; }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: hsl(var(--primary)/0.1);
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
            z-index: -1;
          }
          li:hover::after { opacity: 1; transform: scale(1); }
      `}</style>
            <nav className="flex relative items-center justify-center py-4">
                <ul
                    ref={navRef}
                    className="flex gap-4 list-none p-2 m-0 relative z-[20] bg-background/50 backdrop-blur-md rounded-full border border-border/50 shadow-sm"
                >
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className={cn(
                                "rounded-full relative cursor-pointer px-6 py-2 transition-all duration-300",
                                activeIndex === index ? "active" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <a
                                onClick={(e) => handleClick(e, index)}
                                href={item.href}
                                className="outline-none block font-medium"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef} />
        </div>
    );
};

export default GooeyNav;
