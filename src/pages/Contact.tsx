import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/data";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      toast({ title: "Name and message are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_inquiries").insert({
      name: form.name,
      email: form.email || null,
      phone: form.phone || null,
      subject: form.subject || null,
      message: form.message,
    });
    if (error) {
      toast({ title: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "Message sent! We'll get back to you soon." });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Contact <span className="text-secondary">Us</span>
          </h1>
          <p className="text-primary-foreground/60">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </section>

      <div className="container py-12">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full Name *</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
              </div>
              <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
              <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div><Label>Message *</Label><Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
              <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border rounded-xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-lg">Get in Touch</h3>
              <div className="flex items-center gap-3 text-sm"><Phone className="h-4 w-4 text-secondary" /> +92 300 1234567</div>
              <div className="flex items-center gap-3 text-sm"><Mail className="h-4 w-4 text-secondary" /> info@gasshop.store</div>
              <div className="flex items-start gap-3 text-sm"><MapPin className="h-4 w-4 text-secondary mt-0.5" /> Office #12, Commercial Area, Lahore, Pakistan</div>
            </div>
            <a href={getWhatsAppLink("Hi! I have a question about GasShop products.")} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
