import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import sonaLogo from "@/assets/sona-logo.png";
import { Link } from "react-router-dom";

const footerLinks = {
  ADMISSIONS: [
    "Admission 2024-25",
    "International Admissions",
    "Scholarships",
    "Engineering Courses",
    "MBA Admissions",
  ],
  ACCREDITATION: [
    "A++ Grade by NAAC",
    "NBA Accredited",
    "NIRF",
    "ARIIA",
    "AISHE",
  ],
  STUDENTS: [
    "Student Affairs",
    "Grievance Redressal",
    "Scholarship Info",
    "Anti-Ragging",
    "Student Clubs",
  ],
  FACULTY: [
    "Faculty Information",
    "Research & Publications",
    "Faculty Development",
  ],
  "OTHER LINKS": [
    "Alumni",
    "Library",
    "Sports",
    "Sitemap",
    "Privacy Policy",
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

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-[13px] mb-6 text-gold uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-primary-foreground/60 hover:text-gold text-xs font-body transition-colors block">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div>
            <h4 className="font-display font-semibold text-[13px] mb-6 text-gold uppercase tracking-wider">SOCIAL CONNECT</h4>
            <div className="flex flex-wrap gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="bg-primary-foreground/10 p-2 rounded-full hover:bg-gold hover:text-primary transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6 flex flex-col items-center justify-center text-center text-xs text-primary-foreground/40 font-body">
          <p>© 2026 Sona College of Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
