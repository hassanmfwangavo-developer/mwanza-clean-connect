import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, CheckCircle2, Info } from "lucide-react";
import { SERVICES, formatTZS, type ServiceKey } from "@/lib/services";
import { toast } from "sonner";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    supabase.from("bookings").select("*").eq("id", id).maybeSingle().then(({ data }) => setBooking(data));
  }, [id]);

  if (!booking) return <div className="container py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  const svc = SERVICES[booking.service as ServiceKey];

  const confirm = async () => {
    setBusy(true);
    // Placeholder checkout — payment will be wired later
    await new Promise(r => setTimeout(r, 800));
    toast.success("Booking confirmed!");
    setBusy(false);
    navigate(`/bookings/${booking.id}`);
  };

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-muted-foreground mb-6">Review your booking and confirm.</p>

      <Card className="p-6 mb-4 space-y-3">
        <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-semibold">{svc.name}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Details</span><span>{booking.size_info}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span>{booking.scheduled_date} · {booking.scheduled_time}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Address</span><span className="text-right max-w-[60%]">{booking.address}</span></div>
        <div className="border-t pt-3 flex justify-between items-baseline">
          <span className="font-bold">Total</span>
          <span className="text-2xl font-extrabold text-primary">{formatTZS(Number(booking.total_price))}</span>
        </div>
      </Card>

      <Card className="p-6 mb-6 border-primary/30 bg-primary-soft/40">
        <div className="flex gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Payment placeholder</p>
            <p className="text-sm text-muted-foreground">Online payments (M-Pesa, Tigo Pesa, Airtel Money, card) will be enabled soon. For now, payment is collected in person upon service completion.</p>
          </div>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate(-1)} className="flex-1">Back</Button>
        <Button onClick={confirm} disabled={busy} className="flex-1" size="lg">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
          Confirm booking
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
