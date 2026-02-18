import Layout from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getWhatsAppLink } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  { q: "How do I place an order?", a: "Browse our products, add items to your cart, and proceed to checkout. Fill in your delivery details and choose Cash on Delivery or Bank Transfer. You can also order directly via WhatsApp." },
  { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD) and Bank Transfer. For bank transfers, order confirmation is done after payment verification." },
  { q: "Do you deliver across Pakistan?", a: "Yes! We deliver to all major cities including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, and more." },
  { q: "What are the delivery charges?", a: "Delivery is FREE on orders above PKR 5,000. For orders below PKR 5,000, a flat delivery fee of PKR 300 applies." },
  { q: "How long does delivery take?", a: "Delivery typically takes 2-5 business days depending on your city. Major cities like Lahore, Karachi, and Islamabad usually receive orders within 2-3 days." },
  { q: "Are your products safety certified?", a: "Yes, all our products meet international safety standards and come with proper certifications. We only source from trusted and verified manufacturers." },
  { q: "Can I return or exchange a product?", a: "Yes, we offer returns and exchanges within 7 days of delivery for defective or damaged products. Please contact us via WhatsApp with your order number and photos." },
  { q: "Do you offer bulk/commercial orders?", a: "Yes! We offer competitive pricing for bulk and commercial orders. Contact us via WhatsApp or phone for a custom quote." },
  { q: "How can I track my order?", a: "After placing your order, our team will contact you via phone or WhatsApp with tracking updates. You'll receive confirmation when your order is shipped." },
  { q: "Do you provide installation services?", a: "We offer free expert consultation for gas installation and safety guidance. For professional installation, we can connect you with certified technicians in your area." },
];

export default function FAQ() {
  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Frequently Asked <span className="text-secondary">Questions</span>
          </h1>
          <p className="text-primary-foreground/60">Find answers to common questions about GasShop.store.</p>
        </div>
      </section>

      <div className="container py-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-5">
              <AccordionTrigger className="font-medium text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a href={getWhatsAppLink("Hi! I have a question about GasShop.")} target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </Layout>
  );
}
