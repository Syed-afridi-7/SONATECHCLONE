import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from "@/lib/utils";

interface BubbleMenuItem {
    label: string;
    href: string;
    ariaLabel?: string;
    rotation?: number;
    hoverStyles?: {
        bgColor?: string;
        textColor?: string;
    };
}

const DEFAULT_ITEMS: BubbleMenuItem[] = [
    {
        label: 'home',
        href: '#',
        ariaLabel: 'Home',
        rotation: -8,
        hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
    },
    {
        label: 'about',
        href: '#',
        ariaLabel: 'About',
        rotation: 8,
        hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' }
    },
    {
        label: 'projects',
        href: '#',
        ariaLabel: 'Projects',
        rotation: 8,
        hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' }
    },
    {
        label: 'blog',
        href: '#',
        ariaLabel: 'Blog',
        rotation: 8,
        hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' }
    },
    {
        label: 'contact',

        href: '#',
        ariaLabel: 'Contact',
        rotation: -8,
        hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' }
    }
];

interface BubbleMenuProps {
    logo?: React.ReactNode | string;
    onMenuClick?: (isOpen: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    menuAriaLabel?: string;
    menuBg?: string;
    menuContentColor?: string;
    useFixedPosition?: boolean;
    items?: BubbleMenuItem[];
    animationEase?: string;
    animationDuration?: number;
    staggerDelay?: number;
}

const BubbleMenu: React.FC<BubbleMenuProps> = ({
    logo,
    onMenuClick,
    className,
    style,
    menuAriaLabel = 'Toggle menu',
    menuBg = 'hsl(var(--background))',
    menuContentColor = 'hsl(var(--foreground))',
    useFixedPosition = false,
    items,
    animationEase = 'back.out(1.5)',
    animationDuration = 0.5,
    staggerDelay = 0.12
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
    const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.set(overlay, { display: 'flex' });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 24, autoAlpha: 0 });

            bubbles.forEach((bubble, i) => {
                const delay = i * staggerDelay + (Math.random() * 0.1 - 0.05);
                const tl = gsap.timeline({ delay });
                tl.to(bubble, {
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase
                });
                if (labels[i]) {
                    tl.to(
                        labels[i],
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: animationDuration,
                            ease: 'power3.out'
                        },
                        '-=' + animationDuration * 0.9
                    );
                }
            });
        } else if (showOverlay) {
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.to(labels, {
                y: 24,
                autoAlpha: 0,
                duration: 0.2,
                ease: 'power3.in'
            });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.2,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    setShowOverlay(false);
                }
            });
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                const bubbles = bubblesRef.current.filter(Boolean);
                const isDesktop = window.innerWidth >= 900;
                bubbles.forEach((bubble, i) => {
                    const item = menuItems[i];
                    if (bubble && item) {
                        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
                        gsap.set(bubble, { rotation });
                    }
                });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen, menuItems]);

    return (
        <>
            <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

            <nav
                className={cn(
                    "bubble-menu z-[1001] flex items-center justify-between gap-4 px-8 pointer-events-none w-full",
                    useFixedPosition ? "fixed" : "absolute",
                    "top-8",
                    className
                )}
                style={style}
                aria-label="Main navigation"
            >
                <div
                    className="bubble logo-bubble inline-flex items-center justify-center rounded-full bg-card shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto h-12 md:h-14 px-4 md:px-8 gap-2 will-change-transform border border-border/50 backdrop-blur-md"
                    aria-label="Logo"
                    style={{
                        background: menuBg,
                        minHeight: '48px',
                    }}
                >
                    <span className="logo-content inline-flex items-center justify-center w-[120px] h-full overflow-hidden">
                        {typeof logo === 'string' ? (
                            <img src={logo} alt="Logo" className="bubble-logo max-h-[60%] max-w-full object-contain block" />
                        ) : (
                            logo
                        )}
                    </span>
                </div>

                <button
                    type="button"
                    className={cn(
                        "bubble toggle-bubble menu-btn inline-flex flex-col items-center justify-center rounded-full bg-card shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto w-12 h-12 md:w-14 md:h-14 border border-border/50 cursor-pointer p-0 will-change-transform backdrop-blur-md transition-all duration-300",
                        isMenuOpen && "scale-90"
                    )}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{ background: menuBg }}
                >
                    <span
                        className="menu-line block mx-auto rounded-full"
                        style={{
                            width: 24,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
                        }}
                    />
                    <span
                        className="menu-line short block mx-auto rounded-full"
                        style={{
                            marginTop: '6px',
                            width: 24,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
                        }}
                    />
                </button>
            </nav>

            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={cn(
                        "bubble-menu-items inset-0 flex items-center justify-center pointer-events-none z-[1000] transition-all duration-500",
                        useFixedPosition ? "fixed" : "absolute",
                        isMenuOpen ? "opacity-100 backdrop-blur-xl bg-background/30" : "opacity-0"
                    )}
                    aria-hidden={!isMenuOpen}
                >
                    <ul
                        className="pill-list list-none m-0 px-6 w-full max-w-[1600px] mx-auto flex flex-wrap gap-x-0 gap-y-1 pointer-events-auto"
                        role="menu"
                        aria-label="Menu links"
                    >
                        {menuItems.map((item, idx) => (
                            <li
                                key={idx}
                                role="none"
                                className="pill-col flex justify-center items-stretch [flex:0_0_calc(100%/3)] box-border"
                            >
                                <a
                                    role="menuitem"
                                    href={item.href}
                                    aria-label={item.ariaLabel || item.label}
                                    className="pill-link w-full rounded-full no-underline bg-card text-card-foreground shadow-[0_4px_14px_rgba(0,0,0,0.10)] flex items-center justify-center relative transition-all duration-300 ease-in-out box-border whitespace-nowrap overflow-hidden border border-border/50 will-change-transform"
                                    style={{
                                        ['--item-rot' as any]: `${item.rotation ?? 0}deg`,
                                        ['--hover-bg' as any]: item.hoverStyles?.bgColor || 'hsl(var(--muted))',
                                        ['--hover-color' as any]: item.hoverStyles?.textColor || 'hsl(var(--muted-foreground))',
                                        background: menuBg,
                                        color: menuContentColor,
                                        minHeight: 'clamp(80px, 15vh, 160px)',
                                        padding: 'clamp(1rem, 2vw, 4rem) 0',
                                        fontSize: 'clamp(1.2rem, 3vw, 3rem)',
                                        fontWeight: 500,
                                    } as React.CSSProperties}
                                    ref={el => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                                    <span
                                        className="pill-label inline-block will-change-transform"
                                        ref={el => {
                                            if (el) labelRefs.current[idx] = el;
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default BubbleMenu;
