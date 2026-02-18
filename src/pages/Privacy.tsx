import Layout from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Privacy Policy</h1>
        </div>
      </section>
      <div className="container py-12 max-w-3xl prose prose-sm text-foreground prose-headings:font-display prose-headings:text-foreground">
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>Information We Collect</h2>
        <p>When you place an order on GasShop.store, we collect your name, phone number, email address (optional), and delivery address. This information is used solely for order processing and delivery.</p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>Processing and fulfilling your orders</li>
          <li>Communicating order updates via phone or WhatsApp</li>
          <li>Improving our products and services</li>
          <li>Sending safety tips and promotional offers (with your consent)</li>
        </ul>

        <h2>Information Sharing</h2>
        <p>We do not sell, trade, or share your personal information with third parties except delivery partners who need your address to fulfill your order.</p>

        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

        <h2>Cookies</h2>
        <p>Our website uses cookies to remember your shopping cart and improve your browsing experience. No personal data is stored in cookies.</p>

        <h2>Contact Us</h2>
        <p>For privacy-related concerns, contact us at info@gasshop.store or call +92 300 1234567.</p>
      </div>
    </Layout>
  );
}
