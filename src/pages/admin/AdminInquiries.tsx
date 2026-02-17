import { useEffect, useState } from "react";
import { Trash2, Mail, Phone } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetch = async () => {
    const { data } = await supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false });
    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    const { error } = await supabase.from("contact_inquiries").delete().eq("id", id);
    if (error) toast({ title: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetch(); }
  };

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl font-bold mb-6">Contact Inquiries</h1>

      {loading ? <p>Loading...</p> : inquiries.length === 0 ? <p className="text-muted-foreground">No inquiries yet.</p> : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-card border rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{inq.name}</h3>
                  <div className="flex gap-3 text-sm text-muted-foreground mt-1">
                    {inq.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{inq.email}</span>}
                    {inq.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{inq.phone}</span>}
                  </div>
                  {inq.subject && <p className="text-sm font-medium mt-2">{inq.subject}</p>}
                  <p className="text-sm text-muted-foreground mt-1">{inq.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(inq.created_at).toLocaleString()}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(inq.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
