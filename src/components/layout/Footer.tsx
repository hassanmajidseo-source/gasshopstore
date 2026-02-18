import { Link } from "react-router-dom";
import { Flame, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <Flame className="h-4 w-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">
                GasShop<span className="text-secondary">.store</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
              Pakistan's trusted source for certified gas products, equipment, and safety solutions. Fueling Pakistan, Safely.
            </p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-secondary" />
              <span className="text-xs text-primary-foreground/60">ISO Certified | Safety Guaranteed</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-secondary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Safety Hub", path: "/safety" },
                { label: "About Us", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
                { label: "FAQ", path: "/faq" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-secondary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-secondary">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary" /> +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" /> info@gasshop.store
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-secondary mt-0.5" /> Office #12, Commercial Area, Lahore, Pakistan
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-4 uppercase tracking-wider text-secondary">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-3">Get safety tips and exclusive deals.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm" />
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shrink-0">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-primary-foreground/50">
          <span>© 2026 GasShop.store — All rights reserved.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link to="/faq" className="hover:text-secondary">FAQ</Link>
            <Link to="/privacy" className="hover:text-secondary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary">Terms</Link>
            <Link to="/refund-policy" className="hover:text-secondary">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
