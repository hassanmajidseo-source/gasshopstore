import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/data";

const statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: `Status updated to ${status}` }); fetchOrders(); }
  };

  const statusColor = (s: string) => {
    if (s === "delivered") return "default";
    if (s === "cancelled") return "destructive";
    return "secondary";
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Orders</h1>

      {loading ? <p>Loading...</p> : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Order #</th>
              <th className="text-left p-3 font-medium">Customer</th>
              <th className="text-left p-3 font-medium">Total</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-left p-3 font-medium">Date</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 font-mono text-xs">{o.order_number}</td>
                  <td className="p-3">
                    <p className="font-medium">{o.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{o.customer_phone}</p>
                  </td>
                  <td className="p-3">{formatPrice(o.total)}</td>
                  <td className="p-3">
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v)}>
                      <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statuses.map((s) => <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-3 text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelected(o)}><Eye className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Order {selected?.order_number}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Customer:</span> {selected.customer_name}</div>
                <div><span className="text-muted-foreground">Phone:</span> {selected.customer_phone}</div>
                <div><span className="text-muted-foreground">Email:</span> {selected.customer_email || "—"}</div>
                <div><span className="text-muted-foreground">City:</span> {selected.city}</div>
                <div className="col-span-2"><span className="text-muted-foreground">Address:</span> {selected.delivery_address}</div>
              </div>
              <div className="border-t pt-3">
                <p className="font-medium mb-2">Items:</p>
                {(selected.items as any[])?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between"><span>{item.name} × {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>
                ))}
                <div className="border-t mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span><span>{formatPrice(selected.total)}</span>
                </div>
              </div>
              {selected.notes && <div><span className="text-muted-foreground">Notes:</span> {selected.notes}</div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
