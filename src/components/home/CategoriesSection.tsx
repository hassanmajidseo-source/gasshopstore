import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Building2, Factory, ShieldCheck, Wrench, Settings, ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Factory: <Factory className="h-6 w-6" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  Wrench: <Wrench className="h-6 w-6" />,
  Settings: <Settings className="h-6 w-6" />,
};

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Shop by <span className="text-secondary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find the right gas products for your home, business, or industrial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="group flex items-center gap-4 p-5 rounded-xl border bg-card hover:border-secondary hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                  {iconMap[cat.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{cat.description}</p>
                  <span className="text-xs text-secondary font-medium">{cat.productCount} products</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
