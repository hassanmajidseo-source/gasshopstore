import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Banknote, CreditCard } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/lib/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Abbottabad", "Mardan"];

function generateOrderNumber() {
  return `GS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const deliveryFee = total >= 5000 ? 0 : 300;
  const grandTotal = total + deliveryFee;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", area: "", notes: "", payment_method: "cod",
  });

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">No items in cart</h1>
          <Link to="/products"><Button>Shop Now</Button></Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    const orderNumber = generateOrderNumber();

    try {
      const { error } = await supabase.from("orders").insert({
        order_number: orderNumber,
        customer_name: form.name,
        customer_email: form.email || null,
        customer_phone: form.phone,
        delivery_address: form.address,
        city: form.city,
        area: form.area || null,
        items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        subtotal: total,
        delivery_fee: deliveryFee,
        total: grandTotal,
        notes: form.notes || null,
        payment_method: form.payment_method,
      });

      if (error) throw error;

      clearCart();
      navigate(`/order-confirmed?order=${orderNumber}&payment=${form.payment_method}`);
    } catch (err) {
      toast({ title: "Failed to place order. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Cart
        </Link>
        <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <section>
                <h2 className="font-display text-xl font-semibold mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" required placeholder="03XX-XXXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email (optional)</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Input id="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>City *</Label>
                      <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
                        <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="area">Area / Locality</Label>
                      <Input id="area" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">Order Notes (optional)</Label>
                    <Textarea id="notes" placeholder="Any special instructions..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4">Payment Method</h2>
                <RadioGroup value={form.payment_method} onValueChange={(v) => setForm({ ...form, payment_method: v })} className="space-y-3">
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${form.payment_method === "cod" ? "border-secondary bg-secondary/5" : "hover:border-muted-foreground/30"}`}>
                    <RadioGroupItem value="cod" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium">
                        <Banknote className="h-4 w-4 text-secondary" /> Cash on Delivery
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Pay in cash when your order is delivered to your doorstep.</p>
                    </div>
                  </label>
                  <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${form.payment_method === "bank_transfer" ? "border-secondary bg-secondary/5" : "hover:border-muted-foreground/30"}`}>
                    <RadioGroupItem value="bank_transfer" className="mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium">
                        <CreditCard className="h-4 w-4 text-secondary" /> Bank Transfer
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Transfer to our bank account. Order will be confirmed after payment verification.</p>
                      {form.payment_method === "bank_transfer" && (
                        <div className="mt-3 p-3 rounded-lg bg-muted text-sm space-y-1">
                          <p className="font-medium">Bank Details:</p>
                          <p>Bank: <strong>Meezan Bank</strong></p>
                          <p>Account Title: <strong>GasShop Enterprises</strong></p>
                          <p>Account No: <strong>0123-4567890-01</strong></p>
                          <p>IBAN: <strong>PK36MEZN0001234567890001</strong></p>
                          <p className="text-muted-foreground mt-2">Send payment screenshot via WhatsApp after transfer.</p>
                        </div>
                      )}
                    </div>
                  </label>
                </RadioGroup>
              </section>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total)}</span></div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-600">FREE</span> : formatPrice(deliveryFee)}</span>
                  </div>
                  {deliveryFee > 0 && <p className="text-xs text-muted-foreground">Free delivery on orders above PKR 5,000</p>}
                  <div className="border-t pt-2 flex justify-between font-display font-bold text-lg">
                    <span>Total</span><span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" size="lg" disabled={loading}>
                  {loading ? "Placing Order..." : `Place Order (${form.payment_method === "cod" ? "COD" : "Bank Transfer"})`}
                </Button>
                <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                  <span>Your order information is securely processed.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
