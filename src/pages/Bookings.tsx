import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowRight, Calendar } from "lucide-react";
import { SERVICES, formatTZS, STATUS_LABELS, type ServiceKey } from "@/lib/services";

const statusColor: Record<string, string> = {
  received: "bg-muted text-foreground",
  confirmed: "bg-primary-soft text-primary",
  in_progress: "bg-warning/15 text-warning",
  completed: "bg-success/15 text-success",
  cancelled: "bg-destructive/15 text-destructive",
};

const Bookings = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("bookings").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
      setItems(data || []);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="container py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My bookings</h1>
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : items.length === 0 ? (
        <Card className="p-10 text-center">
          <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-1">No bookings yet</h3>
          <p className="text-muted-foreground mb-4">Book your first cleaning service.</p>
          <Button asChild><Link to="/">Browse services</Link></Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map(b => {
            const svc = SERVICES[b.service as ServiceKey];
            const Icon = svc.icon;
            return (
              <Link key={b.id} to={`/bookings/${b.id}`}>
                <Card className="p-5 hover:shadow-elegant transition-smooth hover:border-primary/40 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{svc.name}</h3>
                        <Badge className={statusColor[b.status]} variant="secondary">{STATUS_LABELS[b.status]}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{b.scheduled_date} · {b.scheduled_time} · {b.address}</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="font-bold text-primary">{formatTZS(Number(b.total_price))}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings;
