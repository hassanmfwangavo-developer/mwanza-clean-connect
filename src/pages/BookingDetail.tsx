import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Loader2, Check, Circle, X } from "lucide-react";
import { SERVICES, formatTZS, STATUS_FLOW, STATUS_LABELS, type ServiceKey } from "@/lib/services";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!id) return;
    const { data } = await supabase.from("bookings").select("*").eq("id", id).maybeSingle();
    setBooking(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const cancel = async () => {
    if (!booking) return;
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
    if (error) return toast.error(error.message);
    toast.success("Booking cancelled");
    load();
  };

  if (loading) return <div className="container py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  if (!booking) return <div className="container py-10">Not found</div>;

  const svc = SERVICES[booking.service as ServiceKey];
  const Icon = svc.icon;
  const isCancelled = booking.status === "cancelled";
  const currentIdx = STATUS_FLOW.indexOf(booking.status as any);

  return (
    <div className="container py-10 max-w-2xl">
      <Button variant="ghost" size="sm" onClick={() => navigate("/bookings")} className="mb-4"><ArrowLeft className="w-4 h-4" />Back</Button>

      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-elegant">
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{svc.name} cleaning</h1>
            <p className="text-muted-foreground text-sm">Booking #{booking.id.slice(0, 8)}</p>
          </div>
          <Badge variant="secondary" className="text-sm">{STATUS_LABELS[booking.status]}</Badge>
        </div>

        <div className="space-y-2 text-sm border-t pt-4">
          <div className="flex justify-between"><span className="text-muted-foreground">Details</span><span>{booking.size_info}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Date & time</span><span>{booking.scheduled_date} · {booking.scheduled_time}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="text-right max-w-[60%]">{booking.address}</span></div>
          {booking.notes && <div className="flex justify-between"><span className="text-muted-foreground">Notes</span><span className="text-right max-w-[60%]">{booking.notes}</span></div>}
          <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>Pay on completion</span></div>
          <div className="flex justify-between text-base pt-2"><span className="font-bold">Total</span><span className="font-bold text-primary">{formatTZS(Number(booking.total_price))}</span></div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-bold mb-4">Status</h3>
        {isCancelled ? (
          <div className="flex items-center gap-2 text-destructive"><X className="w-5 h-5" />This booking was cancelled.</div>
        ) : (
          <ol className="space-y-4">
            {STATUS_FLOW.map((s, i) => {
              const done = i <= currentIdx;
              const current = i === currentIdx;
              return (
                <li key={s} className="flex items-start gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-smooth",
                    done ? "gradient-hero text-primary-foreground shadow-soft" : "bg-muted text-muted-foreground",
                    current && "shadow-glow"
                  )}>
                    {done ? <Check className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
                  </div>
                  <div className="pt-1">
                    <p className={cn("font-medium", done ? "text-foreground" : "text-muted-foreground")}>{STATUS_LABELS[s]}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </Card>

      {!isCancelled && booking.status === "received" && (
        <Button variant="outline" onClick={cancel} className="w-full">Cancel booking</Button>
      )}
    </div>
  );
};

export default BookingDetail;
