import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { cn } from "@/lib/utils";

interface ImageData {
    src: string;
    alt?: string;
}

const DEFAULT_IMAGES: ImageData[] = [
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop', alt: 'Tech' },
    { src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop', alt: 'Laptop' },
    { src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop', alt: 'Code' },
    { src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop', alt: 'Keyboard' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop', alt: 'Security' },
    { src: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop', alt: 'Monitor' },
];

const DEFAULTS = {
    maxVerticalRotationDeg: 5,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 35
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
    const a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
    const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
    const n = attr == null ? NaN : parseFloat(attr);
    return Number.isFinite(n) ? n : fallback;
};

interface GridCoord {
    x: number;
    y: number;
    sizeX: number;
    sizeY: number;
}

function buildItems(pool: ImageData[], seg: number) {
    const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];

    const coords = xCols.flatMap((x, c) => {
        const ys = c % 2 === 0 ? evenYs : oddYs;
        return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
    });

    const totalSlots = coords.length;
    if (pool.length === 0) {
        return coords.map(c => ({ ...c, src: '', alt: '' }));
    }

    const normalizedImages = pool.map(image => ({
        src: image.src || '',
        alt: image.alt || ''
    }));

    const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

    return coords.map((c, i) => ({
        ...c,
        src: usedImages[i].src,
        alt: usedImages[i].alt
    }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
    const unit = 360 / segments / 2;
    const rotateY = unit * (offsetX + (sizeX - 1) / 2);
    const rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return { rotateX, rotateY };
}

interface DomeGalleryProps {
    images?: ImageData[];
    fit?: number;
    fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
    minRadius?: number;
    maxRadius?: number;
    padFactor?: number;
    overlayBlurColor?: string;
    maxVerticalRotationDeg?: number;
    dragSensitivity?: number;
    enlargeTransitionMs?: number;
    segments?: number;
    dragDampening?: number;
    openedImageWidth?: string;
    openedImageHeight?: string;
    imageBorderRadius?: string;
    openedImageBorderRadius?: string;
    grayscale?: boolean;
}

const DomeGallery: React.FC<DomeGalleryProps> = ({
    images = DEFAULT_IMAGES,
    fit = 0.5,
    fitBasis = 'auto',
    minRadius = 600,
    maxRadius = Infinity,
    padFactor = 0.25,
    overlayBlurColor = 'hsl(var(--background))',
    maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
    dragSensitivity = DEFAULTS.dragSensitivity,
    enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
    segments = DEFAULTS.segments,
    dragDampening = 2,
    openedImageWidth = '400px',
    openedImageHeight = '400px',
    imageBorderRadius = '24px',
    openedImageBorderRadius = '32px',
    grayscale = false
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const scrimRef = useRef<HTMLDivElement>(null);
    const focusedElRef = useRef<HTMLElement | null>(null);
    const originalTilePositionRef = useRef<{ left: number, top: number, width: number, height: number } | null>(null);

    const rotationRef = useRef({ x: 0, y: 0 });
    const startRotRef = useRef({ x: 0, y: 0 });
    const startPosRef = useRef<{ x: number, y: number } | null>(null);
    const draggingRef = useRef(false);
    const cancelTapRef = useRef(false);
    const movedRef = useRef(false);
    const inertiaRAF = useRef<number | null>(null);
    const pointerTypeRef = useRef<string>('mouse');
    const tapTargetRef = useRef<HTMLElement | null>(null);
    const openingRef = useRef(false);
    const openStartedAtRef = useRef(0);
    const lastDragEndAt = useRef(0);

    const lockScroll = useCallback(() => {
        document.body.style.overflow = 'hidden';
    }, []);
    const unlockScroll = useCallback(() => {
        if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
        document.body.style.overflow = '';
    }, []);

    const items = useMemo(() => buildItems(images, segments), [images, segments]);

    const applyTransform = useCallback((xDeg: number, yDeg: number) => {
        const el = sphereRef.current;
        if (el) {
            el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    }, []);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const ro = new ResizeObserver(entries => {
            const cr = entries[0].contentRect;
            const w = Math.max(1, cr.width), h = Math.max(1, cr.height);
            const minDim = Math.min(w, h), maxDim = Math.max(w, h), aspect = w / h;
            let basis;
            switch (fitBasis) {
                case 'min': basis = minDim; break;
                case 'max': basis = maxDim; break;
                case 'width': basis = w; break;
                case 'height': basis = h; break;
                default: basis = aspect >= 1.3 ? w : minDim;
            }
            let radius = basis * fit;
            const heightGuard = h * 1.35;
            radius = Math.min(radius, heightGuard);
            radius = clamp(radius, minRadius, maxRadius);
            const lockedRadius = Math.round(radius);

            const viewerPad = Math.max(8, Math.round(minDim * padFactor));
            root.style.setProperty('--radius', `${lockedRadius}px`);
            root.style.setProperty('--viewer-pad', `${viewerPad}px`);
            root.style.setProperty('--overlay-blur-color', overlayBlurColor);
            root.style.setProperty('--tile-radius', imageBorderRadius);
            root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
            root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
            applyTransform(rotationRef.current.x, rotationRef.current.y);
        });
        ro.observe(root);
        return () => ro.disconnect();
    }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, applyTransform]);

    const stopInertia = useCallback(() => {
        if (inertiaRAF.current) {
            cancelAnimationFrame(inertiaRAF.current);
            inertiaRAF.current = null;
        }
    }, []);

    const startInertia = useCallback((vx: number, vy: number) => {
        const MAX_V = 1.4;
        let vX = clamp(vx, -MAX_V, MAX_V) * 80;
        let vY = clamp(vy, -MAX_V, MAX_V) * 80;
        let frames = 0;
        const frictionMul = 0.94 + 0.055 * (dragDampening / 10);
        const stopThreshold = 0.01;
        const maxFrames = 300;

        const step = () => {
            vX *= frictionMul;
            vY *= frictionMul;
            if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                inertiaRAF.current = null;
                return;
            }
            if (++frames > maxFrames) {
                inertiaRAF.current = null;
                return;
            }
            const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
            const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
            rotationRef.current = { x: nextX, y: nextY };
            applyTransform(nextX, nextY);
            inertiaRAF.current = requestAnimationFrame(step);
        };
        stopInertia();
        inertiaRAF.current = requestAnimationFrame(step);
    }, [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]);

    useGesture(
        {
            onDragStart: ({ event }: any) => {
                if (focusedElRef.current) return;
                stopInertia();
                pointerTypeRef.current = event.pointerType || 'mouse';
                if (pointerTypeRef.current === 'touch') lockScroll();
                draggingRef.current = true;
                startRotRef.current = { ...rotationRef.current };
                startPosRef.current = { x: event.clientX, y: event.clientY };
                const potential = event.target.closest?.('.item__image');
                tapTargetRef.current = potential || null;
            },
            onDrag: ({ event, last, velocity: [vMagX, vMagY], direction: [dirX, dirY], movement }: any) => {
                if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
                const dxTotal = event.clientX - startPosRef.current.x;
                const dyTotal = event.clientY - startPosRef.current.y;
                if (!movedRef.current) {
                    if (dxTotal * dxTotal + dyTotal * dyTotal > 16) movedRef.current = true;
                }
                const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                const nextY = startRotRef.current.y + dxTotal / dragSensitivity;
                rotationRef.current = { x: nextX, y: nextY };
                applyTransform(nextX, nextY);

                if (last) {
                    draggingRef.current = false;
                    const isTap = (dxTotal * dxTotal + dyTotal * dyTotal) <= 100;
                    if (isTap && tapTargetRef.current) openItemFromElement(tapTargetRef.current);
                    else startInertia(vMagX * dirX, vMagY * dirY);
                    if (pointerTypeRef.current === 'touch') unlockScroll();
                    movedRef.current = false;
                }
            }
        },
        { target: mainRef }
    );

    const openItemFromElement = (el: HTMLElement) => {
        if (openingRef.current) return;
        openingRef.current = true;
        openStartedAtRef.current = performance.now();
        lockScroll();
        const parent = el.parentElement as HTMLElement;
        focusedElRef.current = el;
        rootRef.current?.setAttribute('data-enlarging', 'true');
        // Simplified open logic for TSX version focusing on clean UX
    };

    const close = useCallback(() => {
        if (performance.now() - openStartedAtRef.current < 250) return;
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        unlockScroll();
        openingRef.current = false;
    }, [unlockScroll]);

    return (
        <div ref={rootRef} className="sphere-root relative w-full h-full overflow-hidden select-none">
            <style>{`
        .sphere-root {
          --radius: 520px;
          --viewer-pad: 72px;
          --circ: calc(var(--radius) * 3.14159);
          --rot-y: calc(360deg / var(--segments-x));
          --rot-x: calc(360deg / var(--segments-y));
          --item-width: calc(var(--circ) / var(--segments-x));
          --item-height: calc(var(--circ) / var(--segments-y));
        }
        .sphere-item {
          width: calc(var(--item-width) * var(--item-size-x));
          height: calc(var(--item-height) * var(--item-size-y));
          position: absolute;
          transform: rotateY(calc(var(--rot-y) * var(--offset-x))) 
                     rotateX(calc(var(--rot-x) * var(--offset-y))) 
                     translateZ(var(--radius));
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
        .sphere-root[data-enlarging="true"] .scrim {
          opacity: 1 !important;
          pointer-events: all !important;
        }
      `}</style>

            <main ref={mainRef} className="absolute inset-0 flex items-center justify-center bg-transparent">
                <div className="stage relative perspective-[1200px] w-full h-full grid place-items-center">
                    <div ref={sphereRef} className="sphere relative preserve-3d will-change-transform">
                        {items.map((it, i) => (
                            <div
                                key={i}
                                className="sphere-item grid place-items-center"
                                style={{
                                    ['--offset-x' as any]: it.x,
                                    ['--offset-y' as any]: it.y,
                                    ['--item-size-x' as any]: it.sizeX,
                                    ['--item-size-y' as any]: it.sizeY,
                                } as React.CSSProperties}
                            >
                                <div
                                    className="item__image absolute inset-2 rounded-[var(--tile-radius)] overflow-hidden cursor-pointer shadow-lg transition-transform hover:scale-110"
                                    onClick={(e) => openItemFromElement(e.currentTarget as HTMLElement)}
                                >
                                    <img
                                        src={it.src}
                                        alt={it.alt}
                                        crossOrigin="anonymous"
                                        className="w-full h-full object-cover"
                                        style={{ filter: grayscale ? 'grayscale(1)' : 'none' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none z-[3] bg-[radial-gradient(circle_at_center,transparent_0%,var(--overlay-blur-color)_100%)] opacity-60" />
                <div className="absolute inset-x-0 top-0 h-32 z-[5] bg-gradient-to-b from-background to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 z-[5] bg-gradient-to-t from-background to-transparent pointer-events-none" />

                {/* Scrim for opened items */}
                <div
                    ref={scrimRef}
                    className="scrim absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500 bg-background/40 backdrop-blur-md"
                    onClick={close}
                />
            </main>
        </div>
    );
};

export default DomeGallery;
