import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const emptyPost = { title: "", slug: "", excerpt: "", content: "", category: "", image: "", published: false };

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const openNew = () => { setForm(emptyPost); setEditing(null); setImageFile(null); setOpen(true); };
  const openEdit = (p: any) => {
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content || "", category: p.category || "", image: p.image || "", published: p.published || false });
    setEditing(p.id); setImageFile(null); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast({ title: "Title and slug required", variant: "destructive" }); return; }
    setSaving(true);

    let imageUrl = form.image;
    if (imageFile) {
      const path = `blog/${form.slug}-${Date.now()}.${imageFile.name.split(".").pop()}`;
      const { error: ue } = await supabase.storage.from("product-images").upload(path, imageFile);
      if (!ue) imageUrl = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
    }

    const payload = { ...form, image: imageUrl || null, excerpt: form.excerpt || null, content: form.content || null, category: form.category || null };
    const { error } = editing
      ? await supabase.from("blog_posts").update(payload).eq("id", editing)
      : await supabase.from("blog_posts").insert(payload);

    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: editing ? "Updated!" : "Created!" }); fetchPosts(); setOpen(false); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchPosts(); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Blog Posts</h1>
        <Button onClick={openNew}><Plus className="h-4 w-4 mr-1" /> New Post</Button>
      </div>

      {loading ? <p>Loading...</p> : posts.length === 0 ? <p className="text-muted-foreground">No blog posts yet.</p> : (
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="bg-card border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <Badge variant={p.published ? "default" : "secondary"}>{p.published ? "Published" : "Draft"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{p.category || "Uncategorized"} · {new Date(p.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>Slug *</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Safety Tips" /></div>
            <div><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
            <div>
              <Label>Content (Markdown supported)</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={12} className="font-mono text-sm" />
            </div>
            <div><Label>Cover Image</Label><Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} /><Label>Published</Label></div>
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
