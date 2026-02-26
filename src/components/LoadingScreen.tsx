import { useEffect, useState } from "react";

export const LoadingScreen = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Optional: add a slight delay to ensure smooth transition
        const timer = setTimeout(() => {
            setShow(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background pointer-events-none transition-opacity duration-500 ease-in-out">
            <div className="relative flex flex-col items-center justify-center animate-pulse">
                {/* Glowing effect behind the logo */}
                <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                <img
                    src="https://www.sonatech.ac.in/images/logo.png"
                    alt="Sona College of Technology Loading"
                    className="w-48 md:w-64 h-auto relative z-10 animate-bounce transition-all duration-700"
                />
                <div className="mt-8 relative z-10 w-48 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    );
};
