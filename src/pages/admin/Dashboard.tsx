import { useEffect, useState } from "react";
import { Package, ShoppingBag, FolderTree, MessageSquare, TrendingUp, DollarSign } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/data";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, categories: 0, inquiries: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("orders").select("id, total, status"),
      supabase.from("categories").select("id", { count: "exact", head: true }),
      supabase.from("contact_inquiries").select("id", { count: "exact", head: true }),
    ]).then(([p, o, c, i]) => {
      const orders = o.data || [];
      setStats({
        products: p.count || 0,
        orders: orders.length,
        categories: c.count || 0,
        inquiries: i.count || 0,
        revenue: orders.reduce((s, o) => s + Number(o.total), 0),
        pending: orders.filter((o) => o.status === "pending").length,
      });
    });
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "text-blue-500" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag, color: "text-green-500" },
    { label: "Pending Orders", value: stats.pending, icon: TrendingUp, color: "text-orange-500" },
    { label: "Total Revenue", value: formatPrice(stats.revenue), icon: DollarSign, color: "text-emerald-500" },
    { label: "Categories", value: stats.categories, icon: FolderTree, color: "text-purple-500" },
    { label: "Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-rose-500" },
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-card border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="font-display text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
