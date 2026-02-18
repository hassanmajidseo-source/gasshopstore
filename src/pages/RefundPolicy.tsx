import Layout from "@/components/layout/Layout";

export default function RefundPolicy() {
  return (
    <Layout>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Return & Refund Policy</h1>
        </div>
      </section>
      <div className="container py-12 max-w-3xl prose prose-sm text-foreground prose-headings:font-display prose-headings:text-foreground">
        <p className="text-muted-foreground">Last updated: February 2026</p>

        <h2>Return Policy</h2>
        <p>We accept returns within <strong>7 days</strong> of delivery for products that are:</p>
        <ul>
          <li>Defective or damaged upon arrival</li>
          <li>Incorrectly delivered (wrong item)</li>
          <li>Missing parts or accessories</li>
        </ul>

        <h2>How to Request a Return</h2>
        <ol>
          <li>Contact us via WhatsApp (+92 300 1234567) within 7 days of receiving your order</li>
          <li>Provide your order number and photos of the issue</li>
          <li>Our team will review and approve the return request</li>
          <li>We will arrange pickup or provide return instructions</li>
        </ol>

        <h2>Refund Process</h2>
        <p>Once we receive and inspect the returned product:</p>
        <ul>
          <li><strong>COD orders:</strong> Refund via bank transfer within 5-7 business days</li>
          <li><strong>Bank transfer orders:</strong> Refund to original account within 5-7 business days</li>
        </ul>

        <h2>Non-Returnable Items</h2>
        <ul>
          <li>Products used or installed after delivery</li>
          <li>Gas cylinders that have been filled or connected</li>
          <li>Items damaged due to customer mishandling</li>
          <li>Products without original packaging</li>
        </ul>

        <h2>Exchange Policy</h2>
        <p>We offer one-time exchange for the same product within 7 days if you received a defective unit. Subject to stock availability.</p>

        <h2>Contact</h2>
        <p>For returns and refund inquiries, WhatsApp us at +92 300 1234567 or email info@gasshop.store.</p>
      </div>
    </Layout>
  );
}
