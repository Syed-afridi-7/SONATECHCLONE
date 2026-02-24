import { MapPin, Phone, Mail } from "lucide-react";
import sonaLogo from "@/assets/sona-logo.png";

const footerLinks = {
  Admissions: [
    "Admissions 2025-26",
    "International Admissions",
    "Placement",
    "Scholarship",
    "Engineering Courses",
  ],
  Accreditation: [
    "A++ Grade by NAAC",
    "IQAC",
    "NBA Accredited Programmes",
    "AICTE Mandatory Disclosure",
  ],
  Students: [
    "Student Affairs",
    "Anti Ragging",
    "Student Life",
    "Grievance Redressal",
    "Downloads",
  ],
  "Quick Links": [
    "Rankings",
    "Awards",
    "Research",
    "Press Room",
    "NIRF",
  ],
};

const Footer = () => {
  return (
    <footer className="bg-navy-gradient text-primary-foreground" id="contact">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={sonaLogo} alt="Sona Logo" className="h-12 w-auto" />
              <div>
                <p className="font-display font-bold text-lg leading-tight">Sona College of Technology</p>
                <p className="text-gold text-xs italic font-body">Learning is a Celebration!</p>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm font-body leading-relaxed max-w-xs">
              An Autonomous Institution affiliated to Anna University, Chennai. Approved by AICTE, New Delhi.
            </p>
            <div className="space-y-2 text-sm font-body text-primary-foreground/70">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold" />
                Junction Main Road, Salem – 636 005, Tamil Nadu
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                0427-4099 999
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                info@sonatech.ac.in
              </p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-sm mb-4 text-gold">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-primary-foreground/60 hover:text-gold text-xs font-body transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-primary-foreground/40 font-body">
          <p>© 2026 Sona College of Technology. All rights reserved.</p>
          <p>Designed with ❤️ for excellence in education</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
