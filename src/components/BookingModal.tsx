import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addBooking } from "@/lib/bookings";
import { addNotification } from "@/lib/notifications";
import { buildWhatsAppLink, type ServiceDef } from "@/lib/services";
import { MessageCircle } from "lucide-react";

interface Props {
  service: ServiceDef | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookingModal = ({ service, open, onOpenChange }: Props) => {
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;
    if (!details.trim()) {
      toast.error("Tafadhali jaza maelezo");
      return;
    }
    addBooking({
      serviceKey: service.key,
      serviceName: service.name,
      details: details.trim(),
      date: date || undefined,
      phone: phone || undefined,
    });
    addNotification("Ombi lako la usafi limehifadhiwa.");
    toast.success("Booking imehifadhiwa", { description: "Inakupeleka WhatsApp..." });
    const extra = [details.trim(), date && `Tarehe: ${date}`, phone && `Simu: ${phone}`]
      .filter(Boolean)
      .join(" | ");
    window.open(buildWhatsAppLink(service.name, extra), "_blank", "noopener,noreferrer");
    setDetails(""); setDate(""); setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/70 backdrop-blur-2xl border border-white/40 shadow-elegant rounded-3xl max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-extrabold">
              {service?.name}
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              {service?.tagline} — jaza maelezo ili tukuhudumie haraka.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="details">Aina ya nyumba / ukubwa</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Mfano: Ofisi na  eneo la sheri lenye ukubwa wa meter 16-16 "
                className="bg-white/60 border-white/50 backdrop-blur min-h-[90px]"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="date">Tarehe</Label>
                <Input
                  id="date" type="date" value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white/60 border-white/50 backdrop-blur"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Simu</Label>
                <Input
                  id="phone" type="tel" value={phone} placeholder="07XX XXX XXX"
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/60 border-white/50 backdrop-blur"
                />
              </div>
            </div>
            <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }}>
              <Button type="submit" size="lg" className="w-full rounded-full font-semibold gradient-hero shadow-elegant">
                <MessageCircle className="w-5 h-5" />
                Tuma WhatsApp
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
