import { ShieldCheck, Truck, Award, Users, Flame, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            About <span className="text-secondary">GasShop</span>.store
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Pakistan's most trusted online destination for certified gas products, safety equipment, and installation solutions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-3xl font-bold mb-4">Our <span className="text-secondary">Mission</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At GasShop.store, we believe every household and business in Pakistan deserves access to safe, certified, and affordable gas products. We bridge the gap between quality gas equipment manufacturers and end users across the country.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Founded with a vision to make gas safety accessible, we've served thousands of homes, restaurants, and industrial facilities with reliable products backed by expert guidance.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "10,000+", desc: "Happy Customers" },
                { icon: Truck, label: "All Pakistan", desc: "Delivery Coverage" },
                { icon: Award, label: "100%", desc: "Certified Products" },
                { icon: ShieldCheck, label: "24/7", desc: "Safety Support" },
              ].map((s) => (
                <div key={s.label} className="bg-card border rounded-xl p-5 text-center">
                  <s.icon className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <p className="font-display font-bold text-xl">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Flame, title: "Quality First", desc: "Every product passes rigorous safety checks before listing on our store." },
              { icon: Target, title: "Customer Focus", desc: "Free expert consultation for gas installation and safety guidance." },
              { icon: ShieldCheck, title: "Safety Commitment", desc: "We actively promote gas safety education through our Safety Hub." },
            ].map((v) => (
              <div key={v.title} className="bg-card border rounded-xl p-6">
                <v.icon className="h-8 w-8 text-secondary mb-3" />
                <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
