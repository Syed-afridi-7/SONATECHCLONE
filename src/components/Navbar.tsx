import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import sonaLogo from "@/assets/sona-logo.png";
import { CommandMenu } from "./CommandMenu";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "#about",
    hasDropdown: true,
    subItems: [
      { label: "Our Legacy", href: "#story" },
      { label: "Leadership", href: "#leadership" },
      { label: "Administration", href: "#admin" },
      { label: "Achievements", href: "#achievements" },
    ]
  },
  {
    label: "Departments",
    href: "/departments",
    hasDropdown: true,
    subItems: [
      {
        label: "Engineering",
        items: ["Mechanical", "Mechatronics", "EEE", "ECE", "Bio-Medical", "CSE", "IT", "Civil", "Fashion Tech"]
      },
      {
        label: "Management & MCA",
        items: ["MBA (Sona Business School)", "MCA"]
      },
      {
        label: "Humanities & Sciences",
        items: ["Mathematics", "Science", "English", "General Engineering"]
      }
    ]
  },
  {
    label: "Academics",
    href: "#academics",
    hasDropdown: true,
    subItems: [
      { label: "Programmes", href: "#programmes" },
      { label: "Curriculum", href: "#curriculum" },
      { label: "COE", href: "#coe" },
      { label: "Library", href: "#library" },
    ]
  },
  {
    label: "Admission",
    href: "#admission",
    hasDropdown: true,
    subItems: [
      { label: "How to Apply", href: "#apply" },
      { label: "Apply Online", href: "#apply-online" },
      { label: "Scholarships", href: "#scholarships" },
      { label: "Fee Structure", href: "#fees" },
    ]
  },
  {
    label: "Placement",
    href: "/placements",
    hasDropdown: true,
    subItems: [
      { label: "Introduction", href: "#intro" },
      { label: "Our Recruiters", href: "#recruiters" },
      { label: "Training Cell", href: "#training" },
      { label: "Placement Statistics", href: "#stats" },
      { label: "Placement Team", href: "#team" },
      { label: "Career Planning Center", href: "#cpc" },
    ]
  },
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
          <Link to="/" className="flex items-center gap-3">
            <img src={sonaLogo} alt="Sona College of Technology" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <p className="text-primary-foreground font-display text-sm font-bold leading-tight">
                Sona College of Technology
              </p>
              <p className="text-gold text-[10px] italic font-body">
                Learning is a Celebration!
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <CommandMenu />

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.label} className="group relative">
                  <a
                    href={item.href}
                    className="text-primary-foreground/90 hover:text-gold text-sm font-medium px-3 py-5 transition-colors flex items-center gap-1 font-body"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />}
                  </a>

                  {/* Mega Menu / Dropdown */}
                  {item.hasDropdown && item.subItems && (
                    <div className="absolute top-full left-0 w-max min-w-[200px] bg-white text-navy-dark shadow-2xl rounded-b-lg py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] border-t-2 border-gold">
                      {item.label === "Departments" ? (
                        <div className="grid grid-cols-3 gap-8 p-6 min-w-[600px]">
                          {item.subItems.map((column: any) => (
                            <div key={column.label}>
                              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-gold mb-3 border-b border-gray-100 pb-1">
                                {column.label}
                              </h5>
                              <ul className="space-y-1.5">
                                {column.items.map((sub: string) => (
                                  <li key={sub}>
                                    <Link to="#" className="text-[13px] hover:text-primary transition-colors block py-0.5 font-body">
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-1 px-2">
                          {item.subItems.map((sub: any) => (
                            <li key={sub.label}>
                              {sub.href.startsWith("#") ? (
                                <a
                                  href={sub.href}
                                  className="block px-4 py-2 text-sm hover:bg-gold/10 hover:text-primary rounded-md transition-colors font-body"
                                >
                                  {sub.label}
                                </a>
                              ) : (
                                <Link
                                  to={sub.href}
                                  className="block px-4 py-2 text-sm hover:bg-gold/10 hover:text-primary rounded-md transition-colors font-body"
                                >
                                  {sub.label}
                                </Link>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

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
          <div className="lg:hidden bg-primary border-t border-navy-light overflow-y-auto max-h-[80vh]">
            <ul className="container py-4 space-y-1">
              {navItems.map((item) => (
                <li key={item.label} className="border-b border-white/5 last:border-0">
                  <div className="flex items-center justify-between">
                    {item.href.startsWith("#") ? (
                      <a
                        href={item.href === "#" ? "/" : item.href}
                        className="block text-primary-foreground/90 hover:text-gold text-sm font-medium px-3 py-3 transition-colors font-body flex-grow"
                        onClick={() => !item.hasDropdown && setMobileOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block text-primary-foreground/90 hover:text-gold text-sm font-medium px-3 py-3 transition-colors font-body flex-grow"
                        onClick={() => !item.hasDropdown && setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.hasDropdown && (
                      <button
                        className="p-3 text-primary-foreground/40"
                        onClick={() => {
                          const el = document.getElementById(`mobile-sub-${item.label}`);
                          if (el) el.classList.toggle('hidden');
                        }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {item.hasDropdown && item.subItems && (
                    <ul id={`mobile-sub-${item.label}`} className="hidden bg-navy-dark/30 py-2 px-6 space-y-2">
                      {item.label === "Departments" ? (
                        item.subItems.map((col: any) => (
                          <li key={col.label} className="space-y-1 py-1">
                            <p className="text-[10px] uppercase tracking-widest text-gold/60 font-bold">{col.label}</p>
                            {col.items.map((sub: string) => (
                              <Link key={sub} to="#" className="block text-primary-foreground/60 text-xs py-1" onClick={() => setMobileOpen(false)}>
                                {sub}
                              </Link>
                            ))}
                          </li>
                        ))
                      ) : (
                        item.subItems.map((sub: any) => (
                          <li key={sub.label}>
                            {sub.href.startsWith("#") ? (
                              <a
                                href={sub.href}
                                className="block text-primary-foreground/70 text-sm py-1.5"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </a>
                            ) : (
                              <Link
                                to={sub.href}
                                className="block text-primary-foreground/70 text-sm py-1.5"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            )}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
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
