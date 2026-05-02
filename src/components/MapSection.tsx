import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const NYEGEZI_QUERY = "Nyegezi+Stand,+Mwanza,+Tanzania";

const MapSection = () => (
  <motion.section
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
    className="space-y-3"
  >
    <div className="flex items-center gap-2">
      <MapPin className="w-5 h-5 text-primary" />
      <div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">Tupo Wapi</h2>
        <p className="text-sm text-muted-foreground">Nyegezi Stand, Mwanza</p>
      </div>
    </div>
    <div className="rounded-3xl overflow-hidden shadow-elegant border border-border bg-card">
      <iframe
        title="Kansolele location — Nyegezi Stand, Mwanza"
        src={`https://www.google.com/maps?q=${NYEGEZI_QUERY}&z=15&output=embed`}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${NYEGEZI_QUERY}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
    >
      <MapPin className="w-4 h-4" /> Fungua kwenye Google Maps
    </a>
  </motion.section>
);

export default MapSection;
