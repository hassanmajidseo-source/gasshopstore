import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, User, LogOut, Settings } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/data";

export default function Account() {
  const { user, profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">My Account</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={async () => { await signOut(); navigate("/"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>

        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders"><Package className="h-4 w-4 mr-1" /> Orders</TabsTrigger>
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-1" /> Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="orders"><OrderHistory userId={user.id} /></TabsContent>
          <TabsContent value="profile"><ProfileForm /></TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function OrderHistory({ userId }: { userId: string }) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*").eq("user_id", userId).order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false); });
  }, [userId]);

  if (loading) return <p className="py-8 text-center text-muted-foreground">Loading orders...</p>;
  if (orders.length === 0) return <p className="py-8 text-center text-muted-foreground">No orders yet. Start shopping!</p>;

  return (
    <div className="space-y-4 mt-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-card border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-display font-bold">{order.order_number}</span>
            <Badge variant={order.status === "delivered" ? "default" : "secondary"}>{order.status}</Badge>
          </div>
          <div className="text-sm text-muted-foreground flex gap-4">
            <span>{new Date(order.created_at).toLocaleDateString()}</span>
            <span>{formatPrice(order.total)}</span>
            <span>{(order.items as any[])?.length} items</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProfileForm() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ full_name: "", phone: "", address: "", city: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setForm({ full_name: profile.full_name || "", phone: profile.phone || "", address: profile.address || "", city: profile.city || "" });
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from("profiles").update(form).eq("user_id", user!.id);
    if (error) toast({ title: "Failed to update profile", variant: "destructive" });
    else toast({ title: "Profile updated!" });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="mt-4 space-y-4 max-w-md">
      <div><Label>Full Name</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
      <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
      <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
      <div><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
      <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Profile"}</Button>
    </form>
  );
}
