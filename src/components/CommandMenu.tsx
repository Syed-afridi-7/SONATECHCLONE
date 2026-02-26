import * as React from "react";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Search,
    BookOpen,
    GraduationCap,
    MapPin,
    MessageSquare,
    Building,
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-foreground/60 hover:text-gold hover:bg-white/5 rounded-full transition-all border border-white/10"
            >
                <Search className="w-4 h-4" />
                <span className="hidden md:inline-flex">Search anything...</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-white/20 bg-white/5 px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Quick Access">
                        <CommandItem onSelect={() => { window.location.href = "#admission"; setOpen(false); }}>
                            <GraduationCap className="mr-2 h-4 w-4" />
                            <span>Admissions</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { window.location.href = "/departments"; setOpen(false); }}>
                            <Building className="mr-2 h-4 w-4" />
                            <span>Departments</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { window.location.href = "/placements"; setOpen(false); }}>
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>Placements</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Engineering Departments">
                        <CommandItem onSelect={() => { setOpen(false); }}>
                            <span>CSE - Computer Science</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { setOpen(false); }}>
                            <span>IT - Information Technology</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { setOpen(false); }}>
                            <span>ECE - Electronics & Comm.</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { setOpen(false); }}>
                            <span>EEE - Electrical & Electronics</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { setOpen(false); }}>
                            <span>Mechanical Engineering</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Contact">
                        <CommandItem onSelect={() => { window.location.href = "#contact"; setOpen(false); }}>
                            <MapPin className="mr-2 h-4 w-4" />
                            <span>Visit Campus</span>
                        </CommandItem>
                        <CommandItem onSelect={() => { window.location.href = "#contact"; setOpen(false); }}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Enquiry</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}

const Briefcase = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
);
