import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import sonaLogo from "@/assets/sona-logo.png";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about", hasDropdown: true },
  { label: "Departments", href: "#departments", hasDropdown: true },
  { label: "Academics", href: "#academics", hasDropdown: true },
  { label: "Admission", href: "#admission", hasDropdown: true },
  { label: "Placement", href: "#placements" },
  { label: "Research", href: "#research" },
  { label: "Campus Life", href: "#campus" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top accreditation bar */}
      <div className="bg-navy-dark py-1.5 text-primary-foreground text-xs font-body hidden md:block">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span>NAAC Accredited <strong>'A++'</strong> Grade</span>
            <span className="opacity-40">|</span>
            <span>2(f) & 12(B) status (UGC)</span>
            <span className="opacity-40">|</span>
            <span>ISO 9001:2015 Certified</span>
          </div>
          <div className="flex items-center gap-6">
            <span>NBA Accredited Programmes</span>
            <span className="opacity-40">|</span>
            <span>FIST Funded (DST)</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-primary/95 backdrop-blur-md shadow-lg">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3">
            <img src={sonaLogo} alt="Sona College of Technology" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <p className="text-primary-foreground font-display text-sm font-bold leading-tight">
                Sona College of Technology
              </p>
              <p className="text-gold text-[10px] italic font-body">
                Learning is a Celebration!
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-primary-foreground/90 hover:text-gold text-sm font-medium px-3 py-2 rounded-md transition-colors flex items-center gap-1 font-body"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-primary border-t border-navy-light">
            <ul className="container py-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block text-primary-foreground/90 hover:text-gold text-sm font-medium px-3 py-2 rounded-md transition-colors font-body"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
