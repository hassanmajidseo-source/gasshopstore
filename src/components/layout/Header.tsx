import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, Search, Flame, ShieldCheck, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/data";
import { useCart } from "@/lib/cart-store";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Safety Hub", path: "/safety" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const { user, isAdmin } = useAuth();

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs py-2">
        <div className="container flex justify-between items-center">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Certified &amp; Safe Gas Products — Delivery Across Pakistan
          </span>
          <a href="tel:+923001234567" className="flex items-center gap-1 hover:text-secondary transition-colors">
            <Phone className="h-3 w-3" /> +92 300 1234567
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b shadow-sm">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Flame className="h-5 w-5 text-secondary" />
              <ShieldCheck className="h-3 w-3 text-primary-foreground absolute -bottom-0.5 -right-0.5" />
            </div>
            <div className="font-display font-bold text-xl leading-tight">
              <span className="text-primary">Gas</span>
              <span className="text-secondary">Shop</span>
              <span className="text-muted-foreground text-[10px] block -mt-1">.store</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </Link>
            )}
            <a href={getWhatsAppLink("Hi! I'm interested in GasShop products.")} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white">
                WhatsApp Us
              </Button>
            </a>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t bg-card pb-4">
            <nav className="container flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href={getWhatsAppLink("Hi! I'm interested in GasShop products.")} target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">WhatsApp Us</Button>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
