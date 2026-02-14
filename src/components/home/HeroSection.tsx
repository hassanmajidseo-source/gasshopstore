import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Abstract bg pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />
      </div>

      <div className="container relative py-20 lg:py-32">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <ShieldCheck className="h-4 w-4" /> Certified &amp; Trusted Gas Products
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            Fueling Pakistan,{" "}
            <span className="text-secondary">Safely.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary-foreground/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed"
          >
            Pakistan's most trusted online store for LPG cylinders, gas equipment, safety solutions, and installation accessories — delivered to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Link to="/products">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold gap-2">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href={getWhatsAppLink("Hi! I want to order gas products from GasShop.store")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold">
                WhatsApp Us
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 text-primary-foreground/60 text-sm"
          >
            <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-secondary" /> Delivery Across Pakistan</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-secondary" /> Safety Certified</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-secondary" /> Cash on Delivery</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
