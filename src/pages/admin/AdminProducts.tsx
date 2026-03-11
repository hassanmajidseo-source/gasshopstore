import { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useProducts, useCategories } from "@/hooks/use-products";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/data";
import { useQueryClient } from "@tanstack/react-query";

const emptyProduct = {
  name: "", slug: "", description: "", price: 0, original_price: null as number | null,
  category_id: "", badge: "", image: "", featured: false, in_stock: true, safety_info: "",
  rating: 0, reviews_count: 0, sort_order: 0,
};

export default function AdminProducts() {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const filtered = products?.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) || [];

  const openNew = () => { setForm(emptyProduct); setEditing(null); setImageFile(null); setOpen(true); };
  const openEdit = (p: any) => {
    setForm({
      name: p.name, slug: p.slug, description: p.description || "", price: p.price,
      original_price: p.original_price, category_id: p.category_id || "", badge: p.badge || "",
      image: p.image || "", featured: p.featured || false, in_stock: p.in_stock ?? true,
      safety_info: p.safety_info || "", rating: p.rating || 0, reviews_count: p.reviews_count || 0,
      sort_order: p.sort_order || 0,
    });
    setEditing(p.id);
    setImageFile(null);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.price) {
      toast({ title: "Name, slug and price are required", variant: "destructive" });
      return;
    }
    setSaving(true);

    let imageUrl = form.image;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `products/${form.slug}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("product-images").upload(path, imageFile);
      if (uploadErr) { toast({ title: "Image upload failed", variant: "destructive" }); setSaving(false); return; }
      const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }

    const payload = { ...form, image: imageUrl, category_id: form.category_id || null, original_price: form.original_price || null, badge: form.badge || null };

    const { error } = editing
      ? await supabase.from("products").update(payload).eq("id", editing)
      : await supabase.from("products").insert(payload);

    if (error) toast({ title: error.message, variant: "destructive" });
    else {
      toast({ title: editing ? "Product updated!" : "Product created!" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Product deleted" }); queryClient.invalidateQueries({ queryKey: ["products"] }); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Products</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-1" /> Add Product</Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium">Product</th>
              <th className="text-left p-3 font-medium">Price</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-left p-3 font-medium">Stock</th>
              <th className="text-left p-3 font-medium">Featured</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b hover:bg-muted/30">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.image || "/lovable-uploads/e3b90aa7-e402-4865-8367-c09eb717ae7c.jpg"} alt="" className="w-10 h-10 rounded object-contain bg-muted" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.slug}</p>
                    </div>
                  </td>
                  <td className="p-3">{formatPrice(p.price)}</td>
                  <td className="p-3">{(p.categories as any)?.name || "—"}</td>
                  <td className="p-3"><Badge variant={p.in_stock ? "default" : "destructive"}>{p.in_stock ? "In Stock" : "Out"}</Badge></td>
                  <td className="p-3">{p.featured ? "⭐" : "—"}</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Product" : "New Product"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>Price *</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
            <div><Label>Original Price</Label><Input type="number" value={form.original_price || ""} onChange={(e) => setForm({ ...form, original_price: e.target.value ? Number(e.target.value) : null })} /></div>
            <div>
              <Label>Category</Label>
              <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Best Seller" /></div>
            <div className="col-span-2"><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="col-span-2"><Label>Safety Info</Label><Textarea value={form.safety_info} onChange={(e) => setForm({ ...form, safety_info: e.target.value })} rows={2} /></div>
            <div className="col-span-2">
              <Label>Product Image</Label>
              <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              {form.image && !imageFile && <img src={form.image} alt="" className="mt-2 h-20 object-contain rounded" />}
            </div>
            <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
            <div><Label>Rating</Label><Input type="number" step="0.1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><Switch checked={form.in_stock} onCheckedChange={(v) => setForm({ ...form, in_stock: v })} /><Label>In Stock</Label></div>
              <div className="flex items-center gap-2"><Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} /><Label>Featured</Label></div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
