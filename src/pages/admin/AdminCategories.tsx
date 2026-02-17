import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCategories } from "@/hooks/use-products";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const empty = { name: "", slug: "", description: "", icon: "", image: "", sort_order: 0 };

export default function AdminCategories() {
  const { data: categories, isLoading } = useCategories();
  const { toast } = useToast();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const openNew = () => { setForm(empty); setEditing(null); setImageFile(null); setOpen(true); };
  const openEdit = (c: any) => {
    setForm({ name: c.name, slug: c.slug, description: c.description || "", icon: c.icon || "", image: c.image || "", sort_order: c.sort_order || 0 });
    setEditing(c.id); setImageFile(null); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast({ title: "Name and slug required", variant: "destructive" }); return; }
    setSaving(true);

    let imageUrl = form.image;
    if (imageFile) {
      const path = `categories/${form.slug}-${Date.now()}.${imageFile.name.split(".").pop()}`;
      const { error: ue } = await supabase.storage.from("product-images").upload(path, imageFile);
      if (ue) { toast({ title: "Upload failed", variant: "destructive" }); setSaving(false); return; }
      imageUrl = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
    }

    const payload = { ...form, image: imageUrl || null, description: form.description || null, icon: form.icon || null };
    const { error } = editing
      ? await supabase.from("categories").update(payload).eq("id", editing)
      : await supabase.from("categories").insert(payload);

    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: editing ? "Updated!" : "Created!" }); qc.invalidateQueries({ queryKey: ["categories"] }); setOpen(false); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); qc.invalidateQueries({ queryKey: ["categories"] }); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Categories</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-1" /> Add Category</Button>
      </div>

      {isLoading ? <p>Loading...</p> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((c) => (
            <div key={c.id} className="bg-card border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{c.name}</h3>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{c.description || "No description"}</p>
              <p className="text-xs text-muted-foreground mt-1">Slug: {c.slug}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Category" : "New Category"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Icon (Lucide name)</Label><Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
            <div><Label>Image</Label><Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /></div>
            <div><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} /></div>
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
