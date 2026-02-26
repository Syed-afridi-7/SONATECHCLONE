import React, { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { cn } from "@/lib/utils";

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
};

const toCssLength = (value: string | number | undefined) => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

interface LogoItem {
    node?: React.ReactNode;
    src?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
    alt?: string;
    title?: string;
    href?: string;
    ariaLabel?: string;
}

interface LogoLoopProps {
    logos: LogoItem[];
    speed?: number;
    direction?: 'left' | 'right' | 'up' | 'down';
    width?: string | number;
    logoHeight?: number;
    gap?: number;
    pauseOnHover?: boolean;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
    renderItem?: (item: LogoItem, index: string | number) => React.ReactNode;
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

const useResizeObserver = (callback: () => void, elements: React.RefObject<HTMLElement>[]) => {
    useEffect(() => {
        const observers = elements.map(ref => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });

        callback();
        return () => {
            observers.forEach(observer => observer?.disconnect());
        };
    }, [callback, elements]);
};

const useAnimationLoop = (
    trackRef: React.RefObject<HTMLDivElement>,
    targetVelocity: number,
    seqWidth: number,
    seqHeight: number,
    isHovered: boolean,
    hoverSpeed: number | undefined,
    isVertical: boolean
) => {
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const seqSize = isVertical ? seqHeight : seqWidth;

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) {
                lastTimestampRef.current = timestamp;
            }

            const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
            lastTimestampRef.current = timestamp;

            const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                const transformValue = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
                track.style.transform = transformValue;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop: React.FC<LogoLoopProps> = memo(({
    logos,
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    hoverSpeed,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    renderItem,
    ariaLabel = 'Partner logos',
    className,
    style
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [seqHeight, setSeqHeight] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const effectiveHoverSpeed = useMemo(() => {
        if (hoverSpeed !== undefined) return hoverSpeed;
        return pauseOnHover ? 0 : undefined;
    }, [hoverSpeed, pauseOnHover]);

    const isVertical = direction === 'up' || direction === 'down';

    const targetVelocity = useMemo(() => {
        const magnitude = Math.abs(speed);
        const isNegative = direction === 'down' || direction === 'right';
        return magnitude * (isNegative ? -1 : 1);
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const sequenceRect = seqRef.current?.getBoundingClientRect();
        const sequenceWidth = sequenceRect?.width ?? 0;
        const sequenceHeight = sequenceRect?.height ?? 0;

        if (isVertical) {
            const parentHeight = containerRef.current?.parentElement?.clientHeight ?? 400;
            if (sequenceHeight > 0) {
                setSeqHeight(Math.ceil(sequenceHeight));
                const copiesNeeded = Math.ceil(parentHeight / sequenceHeight) + ANIMATION_CONFIG.COPY_HEADROOM;
                setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
            }
        } else if (sequenceWidth > 0) {
            setSeqWidth(Math.ceil(sequenceWidth));
            const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
    }, [isVertical]);

    useResizeObserver(updateDimensions, [containerRef, seqRef]);

    const renderLogoItem = useCallback((item: LogoItem, key: string | number) => {
        if (renderItem) return renderItem(item, key);

        const content = item.node ? (
            <span className={cn("inline-flex items-center transition-transform duration-300", scaleOnHover && "hover:scale-110")}>
                {item.node}
            </span>
        ) : (
            <img
                className={cn("h-[var(--logo-height)] w-auto object-contain transition-transform duration-300", scaleOnHover && "hover:scale-110")}
                style={{ height: toCssLength(logoHeight) }}
                src={item.src}
                alt={item.alt ?? ''}
            />
        );

        return (
            <li className={isVertical ? "mb-[var(--gap)] flex justify-center" : "mr-12 flex items-center"} key={key}>
                {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        {content}
                    </a>
                ) : content}
            </li>
        );
    }, [logoHeight, scaleOnHover, renderItem, isVertical]);

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden group w-full", isVertical ? "h-full" : "w-full", className)}
            style={{ ...style, ['--gap' as any]: `${gap}px`, ['--logo-height' as any]: `${logoHeight}px` } as React.CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {fadeOut && (
                <div className={cn(
                    "absolute inset-0 z-10 pointer-events-none",
                    isVertical
                        ? "bg-gradient-to-b from-background via-transparent to-background"
                        : "bg-gradient-to-r from-background via-transparent to-background"
                )} />
            )}

            <div
                ref={trackRef}
                className={cn("flex will-change-transform", isVertical ? "flex-col" : "flex-row")}
            >
                {Array.from({ length: copyCount }).map((_, i) => (
                    <ul
                        key={i}
                        ref={i === 0 ? seqRef : null}
                        className={cn("flex flex-shrink-0", isVertical ? "flex-col" : "flex-row items-center")}
                    >
                        {logos.map((logo, j) => renderLogoItem(logo, `${i}-${j}`))}
                    </ul>
                ))}
            </div>
        </div>
    );
});

LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;
