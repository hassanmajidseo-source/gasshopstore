import { Link } from "react-router-dom";
import { ShieldCheck, AlertTriangle, Flame, CheckCircle, Phone, BookOpen } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getWhatsAppLink } from "@/lib/data";

export default function Safety() {
  const { data: posts } = useQuery({
    queryKey: ["safety-posts"],
    queryFn: async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false }).limit(6);
      return data || [];
    },
  });

  const guidelines = [
    { icon: Flame, title: "Proper Ventilation", desc: "Always ensure adequate ventilation in rooms where gas appliances are used. Never block air vents." },
    { icon: AlertTriangle, title: "Leak Detection", desc: "Regularly check connections with soapy water. Install gas leak detectors in your kitchen and near cylinders." },
    { icon: CheckCircle, title: "Regular Maintenance", desc: "Have your gas appliances serviced by a qualified technician at least once a year." },
    { icon: ShieldCheck, title: "Certified Equipment", desc: "Only use certified and approved gas equipment. Check for safety marks before purchase." },
  ];

  const emergencySteps = [
    "Do NOT switch on/off any electrical appliance",
    "Open all doors and windows immediately",
    "Turn off the gas supply at the cylinder or meter",
    "Evacuate everyone from the area",
    "Call emergency services from outside the building",
    "Do not re-enter until cleared by professionals",
  ];

  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <ShieldCheck className="h-4 w-4" /> Safety Education Hub
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Gas Safety <span className="text-secondary">Guide</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Your comprehensive resource for gas safety knowledge, emergency procedures, and best practices for homes and businesses.
          </p>
        </div>
      </section>

      {/* Guidelines */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-bold text-center mb-10">Safety <span className="text-secondary">Guidelines</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guidelines.map((g) => (
              <div key={g.title} className="bg-card border rounded-xl p-6 text-center">
                <g.icon className="h-10 w-10 text-secondary mx-auto mb-3" />
                <h3 className="font-display font-semibold mb-2">{g.title}</h3>
                <p className="text-sm text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-16 bg-destructive/5">
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-3" />
            <h2 className="font-display text-3xl font-bold mb-2">Gas Leak Emergency?</h2>
            <p className="text-muted-foreground">Follow these steps immediately if you smell gas:</p>
          </div>
          <ol className="space-y-3">
            {emergencySteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 bg-card border rounded-lg p-4">
                <span className="w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</span>
                <span className="text-sm font-medium">{step}</span>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <a href={getWhatsAppLink("EMERGENCY: I need gas safety help!")} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white gap-2">
                <Phone className="h-4 w-4" /> Emergency WhatsApp Helpline
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      {posts && posts.length > 0 && (
        <section className="py-16">
          <div className="container">
            <h2 className="font-display text-3xl font-bold text-center mb-10">
              Safety <span className="text-secondary">Articles</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  {post.image && (
                    <div className="aspect-video bg-muted">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display font-semibold group-hover:text-secondary transition-colors line-clamp-2">{post.title}</h3>
                    {post.excerpt && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/blog"><Button variant="outline" className="gap-2"><BookOpen className="h-4 w-4" /> View All Articles</Button></Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
