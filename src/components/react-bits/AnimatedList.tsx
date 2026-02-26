import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedItemProps {
    children: React.ReactNode;
    delay?: number;
    index: number;
    onMouseEnter: (index: number) => void;
    onClick: () => void;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
    children,
    delay = 0,
    index,
    onMouseEnter,
    onClick
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.1, once: false });

    return (
        <motion.div
            ref={ref}
            data-index={index}
            onMouseEnter={() => onMouseEnter(index)}
            onClick={onClick}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.2, delay }}
            className="mb-4 cursor-pointer"
        >
            {children}
        </motion.div>
    );
};

interface AnimatedListProps {
    items?: string[];
    onItemSelect?: (item: string, index: number) => void;
    showGradients?: boolean;
    enableArrowNavigation?: boolean;
    className?: string;
    itemClassName?: string;
    displayScrollbar?: boolean;
    initialSelectedIndex?: number;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
    items = [
        'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5',
        'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10',
        'Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15'
    ],
    onItemSelect,
    showGradients = true,
    enableArrowNavigation = true,
    className = '',
    itemClassName = '',
    displayScrollbar = true,
    initialSelectedIndex = -1
}) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
    const [keyboardNav, setKeyboardNav] = useState(false);
    const [topGradientOpacity, setTopGradientOpacity] = useState(0);
    const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

    const handleItemMouseEnter = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const handleItemClick = useCallback(
        (item: string, index: number) => {
            setSelectedIndex(index);
            if (onItemSelect) {
                onItemSelect(item, index);
            }
        },
        [onItemSelect]
    );

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target as HTMLDivElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        setTopGradientOpacity(Math.min(scrollTop / 50, 1));
        const bottomDistance = scrollHeight - (scrollTop + clientHeight);
        setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
    }, []);

    useEffect(() => {
        if (!enableArrowNavigation) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault();
                setKeyboardNav(true);
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    e.preventDefault();
                    if (onItemSelect) {
                        onItemSelect(items[selectedIndex], selectedIndex);
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

    useEffect(() => {
        if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
        const container = listRef.current;
        const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement;
        if (selectedItem) {
            const extraMargin = 50;
            const containerScrollTop = container.scrollTop;
            const containerHeight = container.clientHeight;
            const itemTop = selectedItem.offsetTop;
            const itemBottom = itemTop + selectedItem.offsetHeight;
            if (itemTop < containerScrollTop + extraMargin) {
                container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
            } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
                container.scrollTo({
                    top: itemBottom - containerHeight + extraMargin,
                    behavior: 'smooth'
                });
            }
        }
        setKeyboardNav(false);
    }, [selectedIndex, keyboardNav]);

    return (
        <div className={cn("relative w-full max-w-[500px]", className)}>
            <div
                ref={listRef}
                className={cn(
                    "max-h-[400px] overflow-y-auto p-4 transition-all duration-300",
                    displayScrollbar
                        ? "[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-muted/30 [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/40"
                        : "scrollbar-hide"
                )}
                onScroll={handleScroll}
                style={{
                    scrollbarWidth: displayScrollbar ? 'thin' : 'none',
                }}
            >
                {items.map((item, index) => (
                    <AnimatedItem
                        key={index}
                        delay={0.1}
                        index={index}
                        onMouseEnter={handleItemMouseEnter}
                        onClick={() => handleItemClick(item, index)}
                    >
                        <div className={cn(
                            "p-4 border rounded-xl transition-all duration-200 backdrop-blur-sm",
                            selectedIndex === index
                                ? "bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5"
                                : "bg-card/50 border-border hover:bg-muted/50 text-card-foreground",
                            itemClassName
                        )}>
                            <p className="m-0 font-medium">{item}</p>
                        </div>
                    </AnimatedItem>
                ))}
            </div>
            {showGradients && (
                <>
                    <div
                        className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background via-background/60 to-transparent pointer-events-none transition-opacity duration-300 ease-in-out"
                        style={{ opacity: topGradientOpacity }}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none transition-opacity duration-300 ease-in-out"
                        style={{ opacity: bottomGradientOpacity }}
                    ></div>
                </>
            )}
        </div>
    );
};

export default AnimatedList;
