import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Loader2, ArrowLeft } from "lucide-react";
import { SERVICES, calculatePrice, formatTZS, type ServiceKey } from "@/lib/services";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

const Book = () => {
  const { service } = useParams<{ service: ServiceKey }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const svc = service && SERVICES[service as ServiceKey];

  const [units, setUnits] = useState(1);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const total = useMemo(() => svc ? calculatePrice(svc.key, units) : 0, [svc, units]);

  if (!svc) return <div className="container py-16">Unknown service. <Button variant="link" onClick={() => navigate("/")}>Go home</Button></div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !date) return;
    setBusy(true);
    try {
      const { data, error } = await supabase.from("bookings").insert({
        user_id: user.id,
        service: svc.key,
        size_info: `${units} ${svc.unitLabel}`,
        scheduled_date: format(date, "yyyy-MM-dd"),
        scheduled_time: time,
        address,
        notes,
        total_price: total,
        payment_method: "pay_on_completion",
      }).select("id").single();
      if (error) throw error;
      toast.success("Booking created!");
      navigate(`/checkout/${data.id}`);
    } catch (err: any) {
      toast.error(err.message || "Could not create booking");
    } finally {
      setBusy(false);
    }
  };

  const Icon = svc.icon;

  return (
    <div className="container py-10 max-w-4xl">
      <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="mb-4"><ArrowLeft className="w-4 h-4" /> Back</Button>
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center shadow-elegant">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{svc.name} cleaning</h1>
          <p className="text-muted-foreground">{svc.description}</p>
        </div>
      </div>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr,360px] gap-6">
        <Card className="p-6 space-y-5">
          <div>
            <Label htmlFor="units">{svc.unitLabel}</Label>
            <Input id="units" type="number" min={1} value={units} onChange={e => setUnits(parseInt(e.target.value) || 1)} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label className="mb-2">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button type="button" variant="outline" className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="w-4 h-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={d => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <select id="time" required value={time} onChange={e => setTime(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select time</option>
                {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="address">Address in Mwanza</Label>
            <Input id="address" required value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, area, landmark" />
          </div>
          <div>
            <Label htmlFor="notes">Special instructions (optional)</Label>
            <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Anything we should know?" />
          </div>
        </Card>

        <Card className="p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h3 className="font-bold text-lg">Order summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{svc.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Base fee</span><span>{formatTZS(svc.basePrice)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">{units} × {formatTZS(svc.unitPrice)}</span><span>{formatTZS(svc.unitPrice * units)}</span></div>
          </div>
          <div className="border-t pt-3 flex justify-between items-baseline">
            <span className="font-bold">Total</span>
            <span className="text-2xl font-extrabold text-primary">{formatTZS(total)}</span>
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={busy || !date || !time}>
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue to checkout
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Book;
