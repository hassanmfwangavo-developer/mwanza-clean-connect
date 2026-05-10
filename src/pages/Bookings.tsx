import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getBookings, subscribeBookings, deleteBooking, type Booking } from "@/lib/bookings";
import { SERVICES, buildWhatsAppLink, type ServiceKey } from "@/lib/services";
import { fadeUp, stagger } from "@/lib/motion";
import Seo from "@/components/Seo";

const formatRel = (ts: number) => {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "sasa hivi";
  if (diff < 3600) return `${Math.floor(diff / 60)} dakika zilizopita`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} masaa yaliyopita`;
  return new Date(ts).toLocaleDateString();
};

const Bookings = () => {
  const [items, setItems] = useState<Booking[]>([]);

  useEffect(() => {
    const refresh = () => setItems(getBookings());
    refresh();
    return subscribeBookings(refresh);
  }, []);

  return (
    <div className="container max-w-xl py-6">
      <Seo
        title="My Bookings — Kansolele Cleaners Mwanza"
        description="Tazama na simamia historia ya bookings zako za usafi na Kansolele Professional Cleaners. Endelea na huduma kupitia WhatsApp kwa urahisi."
        path="/bookings"
      />
      <motion.div initial="hidden" animate="show" variants={fadeUp} className="mb-5">
        <h1 className="text-2xl font-extrabold">My Bookings</h1>
        <p className="text-sm text-muted-foreground">Bookings zako zote zinahifadhiwa kwenye kifaa chako</p>
      </motion.div>

      {items.length === 0 ? (
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Card className="p-10 text-center rounded-2xl border-dashed">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-bold text-lg mb-1">Hakuna booking bado</h3>
            <p className="text-muted-foreground mb-4">Anza kwa kuchagua huduma kutoka homepage.</p>
            <Button asChild className="rounded-full"><Link to="/">Angalia huduma</Link></Button>
          </Card>
        </motion.div>
      ) : (
        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-3">
          {items.map((b) => {
            const svc = SERVICES[b.serviceKey as ServiceKey];
            const Icon = svc?.icon ?? Calendar;
            return (
              <motion.div key={b.id} variants={fadeUp}>
                <Card className="p-4 rounded-2xl shadow-soft hover:shadow-elegant transition-smooth border-border/60">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold truncate">{b.serviceName}</h3>
                        <span className="text-xs text-muted-foreground shrink-0">{formatRel(b.createdAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{b.details}</p>
                      {(b.date || b.phone) && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {b.date && <>📅 {b.date}</>} {b.phone && <>· 📞 {b.phone}</>}
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-2 mt-2">
                        <a
                          href={buildWhatsAppLink(b.serviceName, b.details)}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
                        >
                          <MessageCircle className="w-4 h-4" /> Endelea WhatsApp
                        </a>
                        <button
                          type="button"
                          aria-label="Futa booking"
                          onClick={() => {
                            deleteBooking(b.id);
                            toast.success("Booking imefutwa");
                          }}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-destructive hover:bg-destructive/10 px-2 py-1.5 rounded-lg transition-smooth active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" /> Futa
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Bookings;
