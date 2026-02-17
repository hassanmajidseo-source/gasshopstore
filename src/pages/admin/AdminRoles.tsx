import { useEffect, useState } from "react";
import { Plus, Trash2, Shield } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type RoleRow = { id: string; user_id: string; role: string; created_at: string };

export default function AdminRoles() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>("staff");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchRoles = async () => {
    const { data } = await supabase.from("user_roles").select("*").order("created_at", { ascending: false });
    setRoles((data as RoleRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchRoles(); }, []);

  const handleAdd = async () => {
    if (!email) { toast({ title: "Enter user ID", variant: "destructive" }); return; }
    setSaving(true);
    const { error } = await supabase.from("user_roles").insert({ user_id: email, role: role as any });
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Role assigned!" }); fetchRoles(); setOpen(false); setEmail(""); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this role?")) return;
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Role removed" }); fetchRoles(); }
  };

  const roleColor = (r: string) => r === "admin" ? "destructive" : r === "moderator" ? "secondary" : "default";

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">Staff Roles</h1>
        <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-1" /> Assign Role</Button>
      </div>

      <div className="bg-card border rounded-xl p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          <Shield className="inline h-4 w-4 mr-1" />
          Assign roles to users by their User ID. Users with any role (admin, moderator, staff) can access the admin panel.
          Only admins can manage roles.
        </p>
      </div>

      {loading ? <p>Loading...</p> : roles.length === 0 ? <p className="text-muted-foreground">No roles assigned yet.</p> : (
        <div className="space-y-3">
          {roles.map((r) => (
            <div key={r.id} className="bg-card border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm">{r.user_id}</p>
                <Badge variant={roleColor(r.role)} className="mt-1">{r.role}</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Assign Role</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>User ID (UUID)</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Paste user UUID here" /></div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={saving}>{saving ? "Assigning..." : "Assign"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
