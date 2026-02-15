import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Phone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/data";

export default function OrderConfirmed() {
  const [params] = useSearchParams();
  const orderNumber = params.get("order") || "N/A";

  return (
    <Layout>
      <div className="container py-20 max-w-lg text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-2">Order Placed!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your order. We'll contact you shortly to confirm delivery details.
        </p>

        <div className="bg-card rounded-xl border p-6 mb-6 text-left">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span>Cash on Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-secondary font-medium">Pending Confirmation</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <a href={getWhatsAppLink(`Hi! I just placed order ${orderNumber}. Please confirm.`)} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
              Confirm on WhatsApp
            </Button>
          </a>
          <a href={`tel:+${WHATSAPP_NUMBER}`}>
            <Button variant="outline" className="w-full gap-2 mt-2"><Phone className="h-4 w-4" /> Call to Confirm</Button>
          </a>
          <Link to="/products">
            <Button className="w-full mt-2">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
