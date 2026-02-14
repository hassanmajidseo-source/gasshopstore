import { motion } from "framer-motion";
import { ShieldCheck, Truck, Clock, Headphones, Award, CreditCard } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Safety Certified", description: "All products meet international safety standards and certifications." },
  { icon: Truck, title: "Nationwide Delivery", description: "Fast and reliable delivery across all cities in Pakistan." },
  { icon: CreditCard, title: "Cash on Delivery", description: "Pay when you receive. No online payment required." },
  { icon: Clock, title: "24/7 Support", description: "Round-the-clock customer support via WhatsApp and phone." },
  { icon: Award, title: "Quality Guaranteed", description: "Premium products from trusted brands with warranty." },
  { icon: Headphones, title: "Expert Guidance", description: "Free consultation for gas installation and safety." },
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Why <span className="text-secondary">GasShop</span>?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Thousands of homes and businesses trust us for safe, reliable gas solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
