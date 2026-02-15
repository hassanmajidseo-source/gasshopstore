import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { formatPrice, getWhatsAppLink } from "@/lib/data";

export default function Cart() {
  const { items, updateQuantity, removeItem, total, count } = useCart();
  const deliveryFee = total >= 5000 ? 0 : 300;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Start shopping and add some products!</p>
          <Link to="/products"><Button>Browse Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const whatsAppItems = items.map((i) => `• ${i.name} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join("\n");
  const whatsAppMsg = `Hi! I'd like to order:\n\n${whatsAppItems}\n\nSubtotal: ${formatPrice(total)}\nDelivery: ${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}\nTotal: ${formatPrice(grandTotal)}`;

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="font-display text-3xl font-bold mb-8">Shopping Cart ({count} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card rounded-xl border p-4">
                <Link to={`/product/${item.slug}`} className="w-20 h-20 bg-muted rounded-lg p-2 shrink-0 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.slug}`}>
                    <h3 className="font-semibold text-foreground hover:text-secondary transition-colors">{item.name}</h3>
                  </Link>
                  <p className="font-display font-bold text-foreground mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatPrice(item.price * item.quantity)}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-xl border p-6 h-fit sticky top-24">
            <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>{deliveryFee === 0 ? <span className="text-green-600 font-medium">FREE</span> : formatPrice(deliveryFee)}</span>
              </div>
              {deliveryFee > 0 && <p className="text-xs text-muted-foreground">Free delivery on orders above PKR 5,000</p>}
              <div className="border-t pt-2 flex justify-between font-display font-bold text-lg">
                <span>Total</span><span>{formatPrice(grandTotal)}</span>
              </div>
            </div>
            <div className="space-y-2 mt-6">
              <Link to="/checkout">
                <Button className="w-full gap-2">Proceed to Checkout <ArrowRight className="h-4 w-4" /></Button>
              </Link>
              <a href={getWhatsAppLink(whatsAppMsg)} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 mt-2">
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
