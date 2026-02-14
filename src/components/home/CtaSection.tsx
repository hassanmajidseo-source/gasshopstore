import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Order?
          </h2>
          <p className="text-secondary-foreground/80 max-w-md mx-auto mb-8 text-lg">
            Browse our complete catalog or call us directly. Cash on Delivery available nationwide.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="tel:+923001234567">
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 font-semibold gap-2">
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
