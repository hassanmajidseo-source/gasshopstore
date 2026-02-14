import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Trusted by <span className="text-secondary">Thousands</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Hear from our satisfied customers across Pakistan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm"
            >
              <Quote className="h-8 w-8 text-secondary/40 mb-3" />
              <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <div>
                <p className="font-semibold text-primary-foreground text-sm">{t.name}</p>
                <p className="text-primary-foreground/50 text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
