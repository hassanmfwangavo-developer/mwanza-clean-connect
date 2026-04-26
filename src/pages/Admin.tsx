import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Shield } from "lucide-react";
import { SERVICES, formatTZS, STATUS_LABELS, type ServiceKey } from "@/lib/services";
import { toast } from "sonner";

const STATUSES = ["received", "confirmed", "in_progress", "completed", "cancelled"];

const Admin = () => {
  const { user, isAdmin, refreshRole } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
    setBookings(data || []);
    setLoading(false);
  };

  useEffect(() => { if (isAdmin) load(); else setLoading(false); }, [isAdmin]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status: status as any }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Status updated");
    load();
  };

  const claimAdmin = async () => {
    setClaiming(true);
    const { data, error } = await supabase.rpc("claim_first_admin");
    if (error) toast.error(error.message);
    else if (data === true) { toast.success("You are now admin!"); await refreshRole(); }
    else toast.error("An admin already exists");
    setClaiming(false);
  };

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="container py-16 max-w-md text-center">
        <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Admin access required</h1>
        <p className="text-muted-foreground mb-6">If you're the first user setting up the system, you can claim admin rights below. This works only while no admin exists.</p>
        <Button onClick={claimAdmin} disabled={claiming}>
          {claiming && <Loader2 className="w-4 h-4 animate-spin" />}
          Claim admin (first user)
        </Button>
      </div>
    );
  }

  const stats = {
    total: bookings.length,
    active: bookings.filter(b => ["received", "confirmed", "in_progress"].includes(b.status)).length,
    revenue: bookings.filter(b => b.status === "completed").reduce((s, b) => s + Number(b.total_price), 0),
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin dashboard</h1>
          <p className="text-muted-foreground">Manage all bookings and update statuses.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5"><p className="text-sm text-muted-foreground">Total bookings</p><p className="text-3xl font-bold mt-1">{stats.total}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Active</p><p className="text-3xl font-bold mt-1 text-primary">{stats.active}</p></Card>
        <Card className="p-5"><p className="text-sm text-muted-foreground">Completed revenue</p><p className="text-3xl font-bold mt-1 text-success">{formatTZS(stats.revenue)}</p></Card>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-3">
          {bookings.map(b => {
            const svc = SERVICES[b.service as ServiceKey];
            const Icon = svc.icon;
            return (
              <Card key={b.id} className="p-5">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{svc.name}</h3>
                      <Badge variant="secondary">{STATUS_LABELS[b.status]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{b.size_info} · {b.scheduled_date} {b.scheduled_time}</p>
                    <p className="text-sm text-muted-foreground">📍 {b.address}</p>
                    {b.notes && <p className="text-sm text-muted-foreground mt-1">📝 {b.notes}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-primary">{formatTZS(Number(b.total_price))}</p>
                    <select value={b.status} onChange={e => updateStatus(b.id, e.target.value)} className="h-9 rounded-md border border-input bg-background px-2 text-sm">
                      {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </div>
                </div>
              </Card>
            );
          })}
          {bookings.length === 0 && <p className="text-center text-muted-foreground py-10">No bookings yet.</p>}
        </div>
      )}
    </div>
  );
};

export default Admin;
