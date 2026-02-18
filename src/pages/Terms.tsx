import Layout from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Terms & Conditions</h1>
        </div>
      </section>
      <div className="container py-12 max-w-3xl prose prose-sm text-foreground prose-headings:font-display prose-headings:text-foreground">
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>General</h2>
        <p>By using GasShop.store, you agree to these terms and conditions. GasShop.store reserves the right to modify these terms at any time.</p>

        <h2>Products & Pricing</h2>
        <p>All prices are listed in Pakistani Rupees (PKR) and include applicable taxes. Prices may change without prior notice. Product availability is subject to stock levels.</p>

        <h2>Orders</h2>
        <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Order confirmation will be provided via phone call or WhatsApp.</p>

        <h2>Payment</h2>
        <ul>
          <li><strong>Cash on Delivery:</strong> Payment is collected upon delivery.</li>
          <li><strong>Bank Transfer:</strong> Full payment must be received and verified before dispatch.</li>
        </ul>

        <h2>Delivery</h2>
        <p>Delivery timelines are estimates and may vary based on location and product availability. Free delivery is available on orders above PKR 5,000. Standard delivery fee is PKR 300.</p>

        <h2>Safety Disclaimer</h2>
        <p>Gas products must be handled with care and in accordance with safety guidelines. GasShop.store is not liable for damages resulting from improper use or installation of products.</p>

        <h2>Limitation of Liability</h2>
        <p>GasShop.store's liability is limited to the purchase price of the product. We are not liable for indirect, incidental, or consequential damages.</p>

        <h2>Contact</h2>
        <p>For questions about these terms, contact info@gasshop.store or call +92 300 1234567.</p>
      </div>
    </Layout>
  );
}
